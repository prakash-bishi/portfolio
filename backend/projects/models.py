from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    """A single project shown on the public /projects page.

    Fields are intentionally simple (no Postgres-specific types like
    ArrayField) so this model also works against the sqlite fallback
    used for quick local runs without Docker (see config/settings.py).
    """

    class Status(models.TextChoices):
        IN_DEVELOPMENT = "in_development", "In development"
        PROTOTYPE = "prototype", "Prototype"
        RESEARCH = "research", "Research"
        COMPLETED = "completed", "Completed"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    summary = models.TextField(
        help_text="A short, honest description. Avoid overstating results "
        "or status — see RULES.md's Truth Rule.",
    )
    tags = models.CharField(
        max_length=300,
        blank=True,
        help_text="Comma-separated, e.g. 'YOLOv8, Computer Vision'",
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        blank=True,
        help_text="Leave blank if genuinely unsure — don't guess.",
    )
    external_url = models.URLField(blank=True)
    order = models.IntegerField(
        default=0, help_text="Lower numbers appear first."
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def tag_list(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]
