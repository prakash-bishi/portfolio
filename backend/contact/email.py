"""
Sends a notification email via Resend when a contact form message
arrives. See docs/DECISIONS.md for why Resend was chosen and the
resend.dev-domain / recipient constraint this depends on.

Email sending failure never blocks or loses the submission — the
message is always saved to the database first (see views.py); this
module is a best-effort notification on top of that durable record.
"""

import logging

from django.conf import settings

logger = logging.getLogger(__name__)


def send_contact_notification(contact_message) -> bool:
    """Returns True if the notification email was sent successfully."""
    api_key = getattr(settings, "RESEND_API_KEY", "")
    recipient = getattr(settings, "CONTACT_RECIPIENT_EMAIL", "")
    from_email = getattr(
        settings, "RESEND_FROM_EMAIL", "onboarding@resend.dev"
    )

    if not api_key or not recipient:
        logger.warning(
            "Contact notification skipped: RESEND_API_KEY or "
            "CONTACT_RECIPIENT_EMAIL is not configured."
        )
        return False

    try:
        import resend

        resend.api_key = api_key
        resend.Emails.send(
            {
                "from": f"Portfolio Contact Form <{from_email}>",
                "to": [recipient],
                "reply_to": contact_message.email,
                "subject": f"New contact form message from {contact_message.name}",
                "text": (
                    f"Name: {contact_message.name}\n"
                    f"Email: {contact_message.email}\n\n"
                    f"{contact_message.message}"
                ),
            }
        )
        return True
    except Exception:
        # Never let an email-provider failure surface as a 500 to the
        # visitor — the message is already saved. Log it so it's
        # visible to whoever's checking backend logs.
        logger.exception("Failed to send contact notification email")
        return False
