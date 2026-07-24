import pytest

from app.main import Settings


def test_settings_fail_fast_without_remote_schema_secret(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("ONDRA_REMOTE_SCHEMA_SECRET", raising=False)

    with pytest.raises(RuntimeError, match="ONDRA_REMOTE_SCHEMA_SECRET"):
        Settings.from_environment()
