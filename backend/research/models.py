from django.db import models


class Publication(models.Model):
    """A paper, thesis, or preprint, managed entirely through Django
    admin — there is no seed data for this model (unlike projects.Project)
    because no real publication details existed yet when this app was
    built. See docs/DECISIONS.md.
    """

    class PublicationType(models.TextChoices):
        PAPER = "paper", "Paper"
        THESIS = "thesis", "Thesis"
        PREPRINT = "preprint", "Preprint"

    title = models.CharField(max_length=300)
    authors = models.CharField(
        max_length=300,
        default="Prakash Bishi",
        help_text="Comma-separated if more than one author.",
    )
    venue = models.CharField(
        max_length=300,
        blank=True,
        help_text="Journal, conference, or institution (for a thesis).",
    )
    year = models.PositiveIntegerField(blank=True, null=True)
    publication_type = models.CharField(
        max_length=20, choices=PublicationType.choices
    )
    summary = models.TextField(
        blank=True,
        help_text="Optional abstract or short description. Leave blank "
        "if you'd rather just link out — don't overstate results.",
    )
    external_url = models.URLField(
        blank=True, help_text="Link to the paper/thesis/PDF if available."
    )
    order = models.IntegerField(
        default=0, help_text="Lower numbers appear first."
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-year", "-created_at"]

    def __str__(self):
        return self.title
