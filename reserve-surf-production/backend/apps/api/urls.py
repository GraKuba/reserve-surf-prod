"""
API URLs for Reserve Surf Production.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = "api"

# Create router for ViewSets
router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    # Add specific API endpoints here
    path("users/", include("apps.users.urls")),
    path("core/", include("apps.core.urls")),
]