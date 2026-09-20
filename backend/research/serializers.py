from rest_framework import serializers

from .models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    publication_type_display = serializers.CharField(
        source="get_publication_type_display", read_only=True
    )

    class Meta:
        model = Publication
        fields = [
            "id",
            "title",
            "authors",
            "venue",
            "year",
            "publication_type",
            "publication_type_display",
            "summary",
            "external_url",
        ]
