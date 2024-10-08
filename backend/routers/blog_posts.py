from typing import List, Optional

from django.shortcuts import get_object_or_404
from ninja import Router

from backend.models.blog_posts import BlogPost
from backend.models.users import User
from backend.schema.blog_posts import (BlogPostCreateSchema, BlogPostSchema,
                                       BlogPostUpdateSchema)

router = Router()


@router.post("/", response=BlogPostSchema)
def create_blog_post(request, payload: BlogPostCreateSchema) -> BlogPost:
    user = get_object_or_404(User, id=payload.author_id)
    return BlogPost.objects.create(**payload.dict())


@router.get("/{blog_post_id}/", response=BlogPostSchema)
def get_blog_post(request, blog_post_id: int) -> BlogPost:
    return get_object_or_404(BlogPost, id=blog_post_id)


@router.put("/{blog_post_id}/", response=BlogPostSchema)
def update_blog_post(request, blog_post_id: int, payload: BlogPostUpdateSchema):
    blog_post = get_object_or_404(BlogPost, id=blog_post_id)
    if not blog_post.can_update(request.user):
        return {"error": "You do not have permission to update this post"}, 403
    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(blog_post, attr, value)
    blog_post.save()
    return blog_post


@router.delete("/{blog_post_id}/", response={204: None})
def delete_blog_post(request, blog_post_id: int):
    blog_post = get_object_or_404(BlogPost, id=blog_post_id)
    if not blog_post.can_update(request.user):
        return {"error": "You do not have permission to delete this post"}, 403
    blog_post.delete()
    return 204


@router.get("/", response=List[BlogPostSchema])
def list_blog_posts(request, order_by: Optional[str] = None):
    if order_by is None:
        order_by = "-created_at"
    queryset: QuerySet = BlogPost.objects.all()

    # If order_by is provided, split by commas and order the queryset accordingly
    if order_by:
        # order_fields = order_by.split(',')
        queryset = queryset.order_by(order_by)

    return list(queryset)
