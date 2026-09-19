from rest_framework import viewsets

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only: projects are managed through Django admin, not the API."""

    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Project.objects.filter(is_published=True)
