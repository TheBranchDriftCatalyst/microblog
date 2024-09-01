from django.contrib import admin
from backend.models import BlogPost


@admin.action(description="Publish selected posts")
def publish_selected_posts(modeladmin, request, queryset):
    # Use the manager's publish method
    queryset.model.objects.publish_posts()


@admin.register(BlogPost)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        "title", "author", "created_at", "updated_at"
    ]
    actions = [publish_selected_posts]
