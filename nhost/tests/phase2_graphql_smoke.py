#!/usr/bin/env python3
"""Live Phase 2 authorization, schema, CRUD, and CHECK-constraint smoke test."""

import json
import os
import urllib.error
import urllib.request
from typing import cast

ENDPOINT = os.environ.get("HASURA_GRAPHQL_ENDPOINT", "http://localhost:1337/v1/graphql")
secret_from_env = os.environ.get("HASURA_GRAPHQL_ADMIN_SECRET")
if not secret_from_env:
    raise SystemExit("HASURA_GRAPHQL_ADMIN_SECRET is required")
SECRET = cast(str, secret_from_env)


def require(condition: object, context: object) -> None:
    if not condition:
        raise RuntimeError(f"Phase 2 smoke assertion failed: {context}")


def graphql(query: str, *, admin: bool) -> dict:
    headers = {"Content-Type": "application/json"}
    if admin:
        headers["x-hasura-admin-secret"] = SECRET
    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps({"query": query}).encode(),
        headers=headers,
    )
    try:
        with urllib.request.urlopen(request) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        return json.load(error)


for anonymous_query in (
    "query { activities { id } }",
    "query { __schema { queryType { name } } }",
):
    result = graphql(anonymous_query, admin=False)
    require(result.get("errors"), result)
    require(not result.get("data"), result)

introspection = graphql(
    "query { __schema { types { name fields { name } } } }", admin=True
)
require(not introspection.get("errors"), introspection)
types = {
    item["name"]: {field["name"] for field in item.get("fields") or []}
    for item in introspection["data"]["__schema"]["types"]
}
expected = {
    "activities": {
        "id",
        "garmin_activity_id",
        "start_lat",
        "start_lng",
        "activity_streams",
    },
    "activity_streams": {"id", "activity_id", "payload", "activity"},
    "sleep": {"id", "calendar_date"},
    "exercises": {"id", "name", "categories"},
}
for type_name, fields in expected.items():
    actual_fields = types.get(type_name, set())
    require(fields <= actual_fields, f"{type_name}: {actual_fields}")

created = graphql(
    """mutation {
      insert_activities_one(object: {garmin_activity_id: 9000000000101, feeling: null}) { id }
      insert_sleep_one(object: {calendar_date: "2099-01-01"}) { id }
      insert_exercises_one(object: {name: "Phase 2 Smoke", categories: []}) { id }
    }""",
    admin=True,
)
require(not created.get("errors"), created)
activity_id = created["data"]["insert_activities_one"]["id"]

stream = graphql(
    f"""mutation {{
      insert_activity_streams_one(object: {{activity_id: {activity_id}, payload: {{}}}}) {{ id }}
    }}""",
    admin=True,
)
require(not stream.get("errors"), stream)

invalid = graphql(
    "mutation { insert_activities_one(object: {garmin_activity_id: 9000000000102, feeling: 6}) { id } }",
    admin=True,
)
require(invalid.get("errors"), invalid)

cleanup = graphql(
    """mutation {
      delete_activities(where: {garmin_activity_id: {_in: [9000000000101, 9000000000102]}}) { affected_rows }
      delete_sleep(where: {calendar_date: {_eq: "2099-01-01"}}) { affected_rows }
      delete_exercises(where: {name: {_eq: "Phase 2 Smoke"}}) { affected_rows }
    }""",
    admin=True,
)
require(not cleanup.get("errors"), cleanup)
print("phase2 GraphQL smoke: PASS")
