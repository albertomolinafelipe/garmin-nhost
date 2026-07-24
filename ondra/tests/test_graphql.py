from fastapi.testclient import TestClient

from app.main import SECRET_HEADER, Settings, create_app, schema

SETTINGS = Settings(
    remote_schema_secret="correct-secret",
    hasura_graphql_url="http://hasura.test/v1/graphql",
    hasura_admin_secret="admin-secret",
)
MUTATION = """
mutation Sync($days: Int, $maxActivities: Int) {
  syncActivities(days: $days, maxActivities: $maxActivities) {
    activities_created
    activities_updated
    sleep_created
    sleep_updated
    streams_written
    activities_failed
    errors
  }
}
"""
EXPECTED_RESULT = {
    "activities_created": 0,
    "activities_updated": 0,
    "sleep_created": 0,
    "sleep_updated": 0,
    "streams_written": 0,
    "activities_failed": 0,
    "errors": [],
}


def test_graphql_rejects_missing_or_wrong_secret() -> None:
    client = TestClient(create_app(SETTINGS))

    assert client.post("/graphql", json={"query": MUTATION}).status_code == 401
    assert (
        client.post(
            "/graphql",
            headers={SECRET_HEADER: "wrong-secret"},
            json={"query": MUTATION},
        ).status_code
        == 401
    )


def test_graphql_accepts_secret_and_returns_stub_shape() -> None:
    response = TestClient(create_app(SETTINGS)).post(
        "/graphql",
        headers={SECRET_HEADER: SETTINGS.remote_schema_secret},
        json={"query": MUTATION},
    )

    assert response.status_code == 200
    assert response.json() == {"data": {"syncActivities": EXPECTED_RESULT}}


def test_sync_result_schema_is_frozen() -> None:
    schema_text = schema.as_str()
    sync_result_definition = schema_text.split("type SyncResult {", 1)[1].split("}", 1)[
        0
    ]
    field_names = {
        line.strip().split(":", 1)[0]
        for line in sync_result_definition.splitlines()
        if ":" in line
    }
    assert field_names == set(EXPECTED_RESULT)
    assert "fits_downloaded" not in schema_text
    assert "fits_missing" not in schema_text


def test_out_of_bounds_arguments_are_graphql_errors() -> None:
    client = TestClient(create_app(SETTINGS))
    for variables in (
        {"days": 0},
        {"days": 32},
        {"maxActivities": -1},
        {"maxActivities": 101},
    ):
        response = client.post(
            "/graphql",
            headers={SECRET_HEADER: SETTINGS.remote_schema_secret},
            json={"query": MUTATION, "variables": variables},
        )
        assert response.status_code == 200
        assert response.json()["data"] is None
        assert response.json()["errors"]
