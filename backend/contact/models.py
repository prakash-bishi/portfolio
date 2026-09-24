from django.db import models


class ContactMessage(models.Model):
    """A message submitted through the public contact form.

    Stored regardless of whether the notification email succeeds — the
    database is the durable record; email is a best-effort notification
    on top of it (see views.py). Honeypot submissions are never saved
    here at all, they're silently dropped before reaching this model.
    """

    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    email_notification_sent = models.BooleanField(
        default=False,
        help_text="Whether the Resend notification email succeeded. "
        "False doesn't mean the message was lost — it's still saved "
        "here regardless.",
    )
    is_reviewed = models.BooleanField(
        default=False, help_text="Mark once you've read/responded to this."
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.created_at:%Y-%m-%d}"
