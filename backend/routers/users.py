from typing import List

from django.shortcuts import get_object_or_404
from backend.schema.blog_posts import BlogPostSchema
from backend.models.users import User
from ninja import Router
from backend.schema.users import UserCreateSchema, UserSchema, UserUpdateSchema
from ninja_jwt.authentication import JWTAuth

router = Router()


@router.post("/", response=UserSchema)
def create_user(request, payload: UserCreateSchema):
    user = User.objects.create_user(**payload.dict())
    return user


@router.get("/{user_id}/", response=UserSchema)
def get_user(request, user_id: int):
    return get_object_or_404(User, id=user_id)


@router.put("/{user_id}/", response=UserSchema)
def update_user(request, user_id: int, payload: UserUpdateSchema):
    user = get_object_or_404(User, id=user_id)
    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(user, attr, value)
    user.save()
    return user


@router.delete("/{user_id}/", response={204: None})
def delete_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return 204


@router.get("/", response=List[UserSchema])
def list_users(request):
    return list(User.objects.all())

#  Additional non crud method/endpointss
@router.get("/{user_id}/posts", response=List[BlogPostSchema])
def get_posts(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    return list(user.blog_posts.all())

# from ninja_jwt.authentication import JWTAuth


@router.get("/me", tags=['Auth'], auth=JWTAuth())
def get_current_user(request):
    # The user is already authenticated by JWTAuth
    user = request.auth
    return {"id": user.id, "username": user.username, "email": user.email}

