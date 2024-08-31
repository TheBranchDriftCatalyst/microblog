# backend/management/commands/seed.py

from django.core.management.base import BaseCommand
from backend.models import BlogPost
from .create_admin import Command as create_admin_command
# NOTE: if you try to do this in a migration the set_password method will not be available

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")

        # Create a sample user
        user = create_admin_command.handle()

        # Create sample blog posts
        BlogPost.objects.get_or_create(
            title="First Blog Post",
            content="This is the content of the first blog post.",
            author=user,
        )

        BlogPost.objects.get_or_create(
            title="Second Blog Post",
            content="This is the content of the second blog post.",
            author=user,
        )

        self.stdout.write(self.style.SUCCESS("Database successfully seeded!"))
