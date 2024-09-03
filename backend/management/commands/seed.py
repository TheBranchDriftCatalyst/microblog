import random

import factory
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from backend.models import BlogPost

from .create_admin import Command as create_admin_command

User = get_user_model()


class BlogPostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = BlogPost

    title = factory.Faker("sentence")
    content = factory.Faker("paragraph")


class Command(BaseCommand):
    help = "Seed the database with initial data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--num-users",
            type=int,
            default=20,
            help="Number of regular users to create",
        )
        parser.add_argument(
            "--max-posts-per-user",
            type=int,
            default=20,
            help="Max number of posts per user",
        )

    def handle(self, *args, **kwargs):
        num_users = kwargs["num_users"]
        max_posts_per_user = kwargs["max_posts_per_user"]

        self.stdout.write("Seeding data...")

        # Step 1: Create admin user
        admin_user = create_admin_command().handle()
        self.stdout.write(f"Admin user '{admin_user.username}' created or retrieved.")

        # Step 2: Create posts for admin user
        BlogPost.objects.get_or_create(
            title="Admin Blog Post 1",
            content="This is the content of the admin's first blog post.",
            author=admin_user,
        )

        BlogPost.objects.get_or_create(
            title="Admin Blog Post 2",
            content="This is the content of the admin's second blog post.",
            author=admin_user,
        )

        self.stdout.write("Admin posts created.")

        # Step 3: Create Regular Users + Associated Posts
        for _ in range(num_users):
            user = User.objects.create_user(
                username=f"user_{random.randint(1000, 9999)}",
                email=f"user_{random.randint(1000, 9999)}@example.com",
                password="password123",
            )
            self.stdout.write(f"Regular user '{user.username}' created.")

            # Create a random number of posts for each user
            num_posts = random.randint(1, max_posts_per_user)
            for _ in range(num_posts):
                BlogPostFactory(author=user)

            self.stdout.write(f"{num_posts} posts created for user '{user.username}'.")

        self.stdout.write(self.style.SUCCESS("Database successfully seeded!"))
