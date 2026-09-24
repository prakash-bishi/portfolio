from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .email import send_contact_notification
from .serializers import ContactMessageSerializer


class ContactThrottle(AnonRateThrottle):
    scope = "contact"


class ContactView(APIView):
    """POST-only. Validates, checks the honeypot, saves the message,
    and best-effort sends a notification email. Rate-limited per IP via
    ContactThrottle (see REST_FRAMEWORK.DEFAULT_THROTTLE_RATES in
    settings.py).
    """

    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Honeypot: real visitors never fill this field (hidden via CSS
        # on the frontend). If it's non-empty, silently pretend success
        # without saving or emailing — don't tip off the bot that it
        # was caught, and don't clutter the database with spam.
        if serializer.validated_data.get("website"):
            return Response({"status": "ok"}, status=201)

        contact_message = serializer.save()
        email_sent = send_contact_notification(contact_message)
        if email_sent:
            contact_message.email_notification_sent = True
            contact_message.save(update_fields=["email_notification_sent"])

        return Response({"status": "ok"}, status=201)
