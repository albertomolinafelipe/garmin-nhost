"""Garmin authentication with a persistent garth token cache."""

from __future__ import annotations

import logging
from pathlib import Path

from garminconnect import Garmin

from .main import Settings

log = logging.getLogger(__name__)
_client: Garmin | None = None


class GarminAuthError(RuntimeError):
    """Garmin authentication could not be established."""


def get_client(settings: Settings) -> Garmin:
    """Return a process-cached, logged-in Garmin client."""
    global _client
    if _client is not None:
        return _client

    token_dir = Path(settings.garth_dir)
    token_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
    token_dir.chmod(0o700)
    client = Garmin()
    try:
        client.login(str(token_dir))
        log.info("Garmin session resumed from token cache")
    except Exception:  # noqa: BLE001 -- garminconnect exposes several auth errors
        if not settings.garmin_email or not settings.garmin_password:
            raise GarminAuthError(
                "No usable Garmin token cache and GARMIN_EMAIL/GARMIN_PASSWORD are unset"
            ) from None
        log.info("Garmin token cache unavailable; performing credential login")
        client = Garmin(settings.garmin_email, settings.garmin_password)
        client.login()
        client.garth.dump(str(token_dir))

    _client = client
    return client


def reset_client() -> None:
    """Clear the process cache, primarily for tests and auth recovery."""
    global _client
    _client = None
