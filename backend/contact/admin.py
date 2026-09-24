from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "created_at",
        "email_notification_sent",
        "is_reviewed",
    )
    list_filter = ("is_reviewed", "email_notification_sent")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at", "email_notification_sent")
    ordering = ("-created_at",)
