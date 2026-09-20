from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Publication


class PublicationModelTests(APITestCase):
    def test_default_author_is_prakash_bishi(self):
        pub = Publication.objects.create(
            title="A Paper", publication_type=Publication.PublicationType.PAPER
        )
        self.assertEqual(pub.authors, "Prakash Bishi")

    def test_string_representation_is_title(self):
        pub = Publication.objects.create(
            title="My Thesis", publication_type=Publication.PublicationType.THESIS
        )
        self.assertEqual(str(pub), "My Thesis")


class PublicationAPITests(APITestCase):
    def setUp(self):
        self.published = Publication.objects.create(
            title="Published Paper",
            publication_type=Publication.PublicationType.PAPER,
            year=2025,
            is_published=True,
            order=1,
        )
        self.unpublished = Publication.objects.create(
            title="Draft Paper",
            publication_type=Publication.PublicationType.PAPER,
            is_published=False,
            order=2,
        )

    def test_list_only_returns_published_publications(self):
        url = reverse("publication-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [p["title"] for p in response.data]
        self.assertIn("Published Paper", titles)
        self.assertNotIn("Draft Paper", titles)

    def test_list_returns_empty_array_when_nothing_published(self):
        Publication.objects.all().delete()
        url = reverse("publication-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_serializer_includes_publication_type_display(self):
        url = reverse("publication-detail", kwargs={"pk": self.published.pk})
        response = self.client.get(url)

        self.assertEqual(response.data["publication_type"], "paper")
        self.assertEqual(response.data["publication_type_display"], "Paper")

    def test_detail_returns_404_for_unpublished_publication(self):
        url = reverse("publication-detail", kwargs={"pk": self.unpublished.pk})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
