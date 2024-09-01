from django.test import TestCase
from django.urls import reverse
from ninja import TestClient
from backend.models.users import User
from backend.schema.users import UserCreateSchema, UserUpdateSchema
from backend.urls import urls as api

# Create a test client for the Ninja API
client = TestClient(api)


class UserCRUDIntegrationTest(TestCase):

    def setUp(self):
        # Set up a test user
        self.user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpassword"
        )

    def test_create_user(self):
        # Test creating a new user
        payload = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword",
        }
        response = client.post("/users/", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 2)  # One existing user plus one new user
        created_user = User.objects.get(username="newuser")
        self.assertEqual(created_user.email, "newuser@example.com")

    def test_get_user(self):
        # Test retrieving an existing user by ID
        response = client.get(f"/users/{self.user.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["username"], self.user.username)
        self.assertEqual(response.json()["email"], self.user.email)

    def test_update_user(self):
        # Test updating an existing user
        update_payload = {"username": "updateduser", "email": "updateduser@example.com"}
        response = client.put(f"/users/{self.user.id}/", json=update_payload)
        self.assertEqual(response.status_code, 200)
        updated_user = User.objects.get(id=self.user.id)
        self.assertEqual(updated_user.username, "updateduser")
        self.assertEqual(updated_user.email, "updateduser@example.com")

    def test_delete_user(self):
        # Test deleting an existing user
        response = client.delete(f"/users/{self.user.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            User.objects.count(), 0
        )  # Should be no users left after deletion

    def test_list_users(self):
        # Test listing all users
        User.objects.create_user(
            username="anotheruser",
            email="anotheruser@example.com",
            password="anotherpassword",
        )
        response = client.get("/users/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)  # Should return two users

    def test_get_posts(self):
        # Test retrieving posts for a user
        # Assuming the User model has a related name 'blog_posts' for posts
        post = self.user.blog_posts.create(title="Test Post", content="Test content")
        response = client.get(f"/users/{self.user.id}/posts")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["title"], post.title)

    def tearDown(self):
        # Clean up after each test
        User.objects.all().delete()
