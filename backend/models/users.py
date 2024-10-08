import django
import django.contrib
from django.contrib import admin
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from backend.managers.users import UsersManager


class User(AbstractBaseUser, PermissionsMixin):

    class Meta:
        app_label = "backend"

    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(max_length=150, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    # avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    avatar = models.URLField(blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UsersManager()

    def __str__(self):
        return self.email


# class UserCredentials(models.Model):
#     # TODO: probably get deeper into integration when we get to the ninja-jwt implementation
#     user: models.OneToOneField = models.OneToOneField(
#         User, on_delete=models.CASCADE, related_name="credentials"
#     )
#     password_hash: models.CharField = models.CharField(max_length=128)

#     def __str__(self) -> str:
#         return f"Credentials for {self.user.username}"
