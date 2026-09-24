from unittest.mock import patch

from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .email import send_contact_notification
from .models import ContactMessage


class ContactMessageModelTests(APITestCase):
    def test_string_representation_includes_name_and_email(self):
        msg = ContactMessage.objects.create(
            name="Jane Doe", email="jane@example.com", message="Hello"
        )
        self.assertIn("Jane Doe", str(msg))
        self.assertIn("jane@example.com", str(msg))


class ContactViewTests(APITestCase):
    def setUp(self):
        cache.clear()  # throttle counters live in cache — isolate tests

    @patch("contact.views.send_contact_notification")
    def test_valid_submission_saves_message_and_returns_201(self, mock_send):
        mock_send.return_value = True
        url = reverse("contact")
        response = self.client.post(
            url,
            {
                "name": "Jane Doe",
                "email": "jane@example.com",
                "message": "Interested in working together.",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        saved = ContactMessage.objects.first()
        self.assertEqual(saved.name, "Jane Doe")
        self.assertTrue(saved.email_notification_sent)
        mock_send.assert_called_once()

    @patch("contact.views.send_contact_notification")
    def test_email_failure_does_not_lose_the_message(self, mock_send):
        mock_send.return_value = False
        url = reverse("contact")
        response = self.client.post(
            url,
            {"name": "Jane Doe", "email": "jane@example.com", "message": "Hi"},
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertFalse(ContactMessage.objects.first().email_notification_sent)

    @patch("contact.views.send_contact_notification")
    def test_honeypot_filled_silently_succeeds_without_saving_or_emailing(
        self, mock_send
    ):
        url = reverse("contact")
        response = self.client.post(
            url,
            {
                "name": "Bot",
                "email": "bot@example.com",
                "message": "spam",
                "website": "http://spam.example.com",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 0)
        mock_send.assert_not_called()

    def test_missing_required_fields_returns_400(self):
        url = reverse("contact")
        response = self.client.post(url, {"name": "", "email": "", "message": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_email_format_returns_400(self):
        url = reverse("contact")
        response = self.client.post(
            url,
            {"name": "Jane", "email": "not-an-email", "message": "Hi"},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_message_over_5000_characters_returns_400(self):
        url = reverse("contact")
        response = self.client.post(
            url,
            {"name": "Jane", "email": "jane@example.com", "message": "x" * 5001},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch("contact.views.send_contact_notification", return_value=True)
    def test_sixth_submission_within_an_hour_is_throttled(self, mock_send):
        url = reverse("contact")
        payload = {"name": "Jane", "email": "jane@example.com", "message": "Hi"}

        for _ in range(5):
            response = self.client.post(url, payload)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        sixth_response = self.client.post(url, payload)
        self.assertEqual(
            sixth_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS
        )


class SendContactNotificationTests(APITestCase):
    def test_returns_false_when_not_configured(self):
        msg = ContactMessage(
            name="Jane", email="jane@example.com", message="Hi"
        )
        with self.settings(RESEND_API_KEY="", CONTACT_RECIPIENT_EMAIL=""):
            self.assertFalse(send_contact_notification(msg))

    @patch("resend.Emails.send")
    def test_returns_true_on_successful_send(self, mock_resend_send):
        mock_resend_send.return_value = {"id": "test-id"}
        msg = ContactMessage(
            name="Jane", email="jane@example.com", message="Hi"
        )
        with self.settings(
            RESEND_API_KEY="re_test_key",
            CONTACT_RECIPIENT_EMAIL="owner@example.com",
        ):
            self.assertTrue(send_contact_notification(msg))

    @patch("resend.Emails.send", side_effect=Exception("network error"))
    def test_returns_false_and_does_not_raise_on_resend_exception(
        self, mock_resend_send
    ):
        msg = ContactMessage(
            name="Jane", email="jane@example.com", message="Hi"
        )
        with self.settings(
            RESEND_API_KEY="re_test_key",
            CONTACT_RECIPIENT_EMAIL="owner@example.com",
        ):
            self.assertFalse(send_contact_notification(msg))
