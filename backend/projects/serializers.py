from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    status_display = serializers.CharField(
        source="get_status_display", read_only=True
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "summary",
            "tags",
            "status",
            "status_display",
            "external_url",
        ]

    def get_tags(self, obj):
        return obj.tag_list()
