from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI

# Directly importing the routers
from backend.routers.blog_post import router as blog_router
from backend.routers.users import router as user_router

api = NinjaAPI()

# Adding the routers to the Ninja API
api.add_router("/blogs/", blog_router)
api.add_router("/users/", user_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),  # Mount the Ninja API at the "/api/" path
]
