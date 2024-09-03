from logging import getLogger

from django.contrib import admin

from backend.models import User

logger = getLogger(__name__)


@admin.action(description="Publish selected posts")
def do_something(modeladmin, request, queryset):
    # Use the manager's publish method
    logger.info("Doing something")


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "is_staff", "is_superuser"]
    actions = [do_something]


# admin.site.register(User)
