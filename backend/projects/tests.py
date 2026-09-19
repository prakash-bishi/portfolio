from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Project


class ProjectModelTests(APITestCase):
    def test_slug_auto_generated_from_title(self):
        project = Project.objects.create(
            title="Test Project Name", summary="A test project."
        )
        self.assertEqual(project.slug, "test-project-name")

    def test_tag_list_splits_and_strips_comma_separated_tags(self):
        project = Project.objects.create(
            title="Tagged Project",
            summary="Has tags.",
            tags="YOLOv8,  Computer Vision , Object Detection",
        )
        self.assertEqual(
            project.tag_list(), ["YOLOv8", "Computer Vision", "Object Detection"]
        )

    def test_tag_list_empty_when_no_tags(self):
        project = Project.objects.create(title="No Tags", summary="None.")
        self.assertEqual(project.tag_list(), [])


class ProjectAPITests(APITestCase):
    def setUp(self):
        self.published = Project.objects.create(
            title="Published Project",
            summary="Visible.",
            is_published=True,
            order=1,
        )
        self.unpublished = Project.objects.create(
            title="Draft Project",
            summary="Hidden.",
            is_published=False,
            order=2,
        )

    def test_list_only_returns_published_projects(self):
        url = reverse("project-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [p["title"] for p in response.data]
        self.assertIn("Published Project", titles)
        self.assertNotIn("Draft Project", titles)

    def test_detail_lookup_by_slug_for_published_project(self):
        url = reverse("project-detail", kwargs={"slug": self.published.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Published Project")

    def test_detail_lookup_returns_404_for_unpublished_project(self):
        url = reverse("project-detail", kwargs={"slug": self.unpublished.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_detail_lookup_returns_404_for_unknown_slug(self):
        url = reverse("project-detail", kwargs={"slug": "does-not-exist"})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_serializer_includes_tag_list_and_status_display(self):
        project = Project.objects.create(
            title="Detailed Project",
            summary="Has everything.",
            tags="Django, Python",
            status="in_development",
        )
        url = reverse("project-detail", kwargs={"slug": project.slug})
        response = self.client.get(url)

        self.assertEqual(response.data["tags"], ["Django", "Python"])
        self.assertEqual(response.data["status_display"], "In development")
