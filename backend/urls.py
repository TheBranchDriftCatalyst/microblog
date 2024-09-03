from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController, NinjaJWTSlidingController

# Directly importing the routers
from backend.routers.blog_posts import router as blog_router
from backend.routers.users import router as user_router

api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)
api.register_controllers(NinjaJWTSlidingController)


# TODO: maybe change this from urls -> api.py

api.add_router("/blogs/", blog_router)
api.add_router("/users/", user_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),  # Mount the Ninja API at the "/api/" path
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
