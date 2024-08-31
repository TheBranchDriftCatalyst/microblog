# backend/management/commands/seed.py

from django.core.management.base import BaseCommand
from backend.models import User

# Create the initial admin user

class Command(BaseCommand):
    help = "Seed the database with initial data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Creating admin user...")

        # Create a sample user
        user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "djdanielsh@gmail.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            user.set_password("turbopookipanda")
            user.save()
            self.stdout.write(f"Created user: {user.username} - {user.email}")
        else:
            self.stdout.write(f"User {user.username} already exists")
