from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "order", "is_published", "updated_at")
    list_filter = ("status", "is_published")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "tags")
    ordering = ("order", "-created_at")
