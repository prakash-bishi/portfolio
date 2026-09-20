from rest_framework import viewsets

from .models import Publication
from .serializers import PublicationSerializer


class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only: publications are managed through Django admin."""

    serializer_class = PublicationSerializer

    def get_queryset(self):
        return Publication.objects.filter(is_published=True)
