from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    # Honeypot field. Real visitors never see or fill this (hidden via
    # CSS on the frontend) — bots that auto-fill every field usually do.
    # write_only + not saved on the model itself.
    website = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message", "website"]

    def validate_name(self, value):
        stripped = value.strip()
        if not stripped:
            raise serializers.ValidationError("Name is required.")
        return stripped

    def validate_message(self, value):
        stripped = value.strip()
        if not stripped:
            raise serializers.ValidationError("Message is required.")
        if len(stripped) > 5000:
            raise serializers.ValidationError(
                "Message is too long (max 5000 characters)."
            )
        return stripped

    def create(self, validated_data):
        # Never persist the honeypot value onto the model.
        validated_data.pop("website", None)
        return ContactMessage.objects.create(**validated_data)
