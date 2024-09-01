from rest_framework.permissions import BasePermission


class UserIsAuthor(BasePermission):
    """
    Custom permission to only allow authors of a post to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is authenticated and is the author of the post
        return obj.author == request.user
