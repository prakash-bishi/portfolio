"""
Seeds the initial 6 real projects, as provided directly by the project
owner (not invented). Summaries are deliberately minimal, honest
restatements of each title — no fabricated outcomes, metrics, or
deployment status. Status is left blank wherever it wasn't actually
confirmed; fill in real status/links/fuller descriptions via Django
admin, not by editing this migration.
"""

from django.db import migrations


def seed_projects(apps, schema_editor):
    Project = apps.get_model("projects", "Project")

    projects = [
        {
            "title": "Yoga Pose Estimation using YOLOv8",
            "slug": "yoga-pose-estimation-yolov8",
            "summary": "Pose estimation for yoga postures using YOLOv8.",
            "tags": "YOLOv8, Computer Vision, Pose Estimation",
            "status": "",
            "order": 1,
        },
        {
            "title": "Water Lily Detection in Ponds/Lakes using YOLOv8",
            "slug": "water-lily-detection-yolov8",
            "summary": "Detecting water lilies in ponds and lakes using YOLOv8.",
            "tags": "YOLOv8, Object Detection, Computer Vision",
            "status": "",
            "order": 2,
        },
        {
            "title": "Fish & Shrimp Detection using YOLOv8",
            "slug": "fish-shrimp-detection-yolov8",
            "summary": "Detecting fish and shrimp using YOLOv8.",
            "tags": "YOLOv8, Object Detection, Computer Vision",
            "status": "",
            "order": 3,
        },
        {
            "title": "Image Annotation Tool",
            "slug": "image-annotation-tool",
            "summary": "A tool for annotating images for computer vision datasets.",
            "tags": "Image Annotation, Computer Vision",
            "status": "",
            "order": 4,
        },
        {
            "title": "Django-based Video Processing Web Application",
            "slug": "django-video-processing-web-app",
            "summary": "A Django-based web application for processing video.",
            "tags": "Django, Video Processing, Web Development",
            "status": "",
            "order": 5,
        },
        {
            "title": "Personal Portfolio + AI Platform",
            "slug": "personal-portfolio-ai-platform",
            "summary": (
                "This personal portfolio and AI/data & computer vision "
                "platform — the site you're looking at right now, currently "
                "in development."
            ),
            "tags": "Next.js, Django, Portfolio",
            "status": "in_development",
            "external_url": "https://github.com/prakash-bishi/portfolio",
            "order": 6,
        },
    ]

    for data in projects:
        Project.objects.update_or_create(slug=data["slug"], defaults=data)


def remove_seeded_projects(apps, schema_editor):
    Project = apps.get_model("projects", "Project")
    slugs = [
        "yoga-pose-estimation-yolov8",
        "water-lily-detection-yolov8",
        "fish-shrimp-detection-yolov8",
        "image-annotation-tool",
        "django-video-processing-web-app",
        "personal-portfolio-ai-platform",
    ]
    Project.objects.filter(slug__in=slugs).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_projects, remove_seeded_projects),
    ]
