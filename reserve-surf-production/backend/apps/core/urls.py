"""
Core app URLs.
"""

from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    # Add core functionality endpoints here
    # Example: path("health/", views.HealthCheckView.as_view(), name="health"),
]