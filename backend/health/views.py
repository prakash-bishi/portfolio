from django.conf import settings
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):
    """Basic liveness + database-connectivity check.

    Returns 200 with status "ok" when the app is up and the database is
    reachable. Returns 503 if the database check fails, so this can be
    used directly as a Docker/orchestrator health check target.
    """
    db_ok = True
    db_error = None
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except Exception as exc:  # noqa: BLE001 - deliberately broad for a health check
        db_ok = False
        db_error = str(exc)

    payload = {
        "status": "ok" if db_ok else "error",
        "database": "ok" if db_ok else "unreachable",
    }
    # Never leak internal exception details to callers outside local debug.
    if db_error and not db_ok and settings.DEBUG:
        payload["detail"] = db_error

    return Response(payload, status=200 if db_ok else 503)
