import markdown
from django.db import models
from django.utils.text import slugify
from .users import User
from django.contrib import admin

# class BlogPost(models.Model):
class BlogPost(models.Model):
    
    title: models.CharField = models.CharField(max_length=255)
    content: models.TextField = models.TextField()
    author: models.ForeignKey = models.ForeignKey(
        # TODO: Double check that this is correct directionally.  We dont want the cascade
        # to go from the delete post -> delete author just the other way around
        User,
        on_delete=models.CASCADE,
        related_name="blog_posts",
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    def can_update(self, user: User) -> bool:
        return self.author == user

    def render_content(self) -> str:
        """
        Renders the markdown content to HTML.
        """
        return markdown.markdown(self.content)

    def save(self, *args, **kwargs):
        # Example of additional processing, such as slug generation if needed
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        indexes = [
            models.Index(fields=["title", "content"]),  # Makes content searchable
        ]
        # app_label = "backend"
