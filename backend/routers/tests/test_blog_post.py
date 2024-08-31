import pytest

from backend.models import BlogPost, User


@pytest.mark.django_db
def test_create_blog_post(client):
    user = User.objects.create_user(username="testuser", password="testpass")
    client.login(username="testuser", password="testpass")

    response = client.post(
        "/api/blog_posts/",
        {
            "title": "New Blog Post",
            "content": "This is a new blog post.",
            "author_id": user.id,
        },
    )

    assert response.status_code == 201
    assert BlogPost.objects.count() == 1


@pytest.mark.django_db
def test_get_blog_post(client):
    user = User.objects.create_user(username="testuser", password="testpass")
    blog_post = BlogPost.objects.create(
        title="Test Blog Post", content="This is a test post.", author=user
    )

    response = client.get(f"/api/blog_posts/{blog_post.id}/")
    assert response.status_code == 200
    assert response.json()["title"] == blog_post.title


@pytest.mark.django_db
def test_update_blog_post(client):
    user = User.objects.create_user(username="testuser", password="testpass")
    client.login(username="testuser", password="testpass")

    blog_post = BlogPost.objects.create(
        title="Test Blog Post", content="This is a test post.", author=user
    )

    response = client.put(
        f"/api/blog_posts/{blog_post.id}/",
        {"title": "Updated Blog Post", "content": blog_post.content},
        content_type="application/json",
    )

    assert response.status_code == 200
    blog_post.refresh_from_db()
    assert blog_post.title == "Updated Blog Post"


@pytest.mark.django_db
def test_delete_blog_post(client):
    user = User.objects.create_user(username="testuser", password="testpass")
    client.login(username="testuser", password="testpass")

    blog_post = BlogPost.objects.create(
        title="Test Blog Post", content="This is a test post.", author=user
    )

    response = client.delete(f"/api/blog_posts/{blog_post.id}/")
    assert response.status_code == 204
    assert BlogPost.objects.count() == 0
