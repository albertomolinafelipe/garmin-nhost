from __future__ import annotations

import base64
import json
from pathlib import Path

from app.garmin_client import _materialize_tokens


def _secret(payload: dict[str, str]) -> str:
    return base64.b64encode(json.dumps(payload).encode()).decode()


def test_materializes_tokens_when_cache_empty(tmp_path: Path) -> None:
    secret = _secret(
        {"oauth1_token.json": "one", "oauth2_token.json": "two"}
    )
    _materialize_tokens(tmp_path, secret)
    assert (tmp_path / "oauth1_token.json").read_text() == "one"
    assert (tmp_path / "oauth2_token.json").read_text() == "two"


def test_skips_when_cache_already_present(tmp_path: Path) -> None:
    (tmp_path / "oauth2_token.json").write_text("live")
    _materialize_tokens(tmp_path, _secret({"oauth2_token.json": "seed"}))
    # Existing (possibly-refreshed) token is not overwritten.
    assert (tmp_path / "oauth2_token.json").read_text() == "live"


def test_noop_without_secret(tmp_path: Path) -> None:
    _materialize_tokens(tmp_path, None)
    assert list(tmp_path.iterdir()) == []


def test_path_traversal_keys_are_flattened(tmp_path: Path) -> None:
    _materialize_tokens(tmp_path, _secret({"../evil.json": "x"}))
    assert (tmp_path / "evil.json").exists()
    assert not (tmp_path.parent / "evil.json").exists()
