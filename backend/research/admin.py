from django.contrib import admin

from .models import Publication


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "publication_type",
        "year",
        "order",
        "is_published",
        "updated_at",
    )
    list_filter = ("publication_type", "is_published")
    search_fields = ("title", "authors", "venue", "summary")
    ordering = ("order", "-year", "-created_at")
