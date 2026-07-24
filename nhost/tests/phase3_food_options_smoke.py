#!/usr/bin/env python3
"""Verify the tracked food_options view through Hasura GraphQL."""

import json
import os
import urllib.error
import urllib.request

ENDPOINT = os.environ.get("HASURA_GRAPHQL_ENDPOINT", "http://localhost:8080/v1/graphql")
SECRET = os.environ["HASURA_GRAPHQL_ADMIN_SECRET"]


def graphql(query: str) -> dict:
    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps({"query": query}).encode(),
        headers={"Content-Type": "application/json", "x-hasura-admin-secret": SECRET},
    )
    try:
        with urllib.request.urlopen(request) as response:
            return json.load(response)
    except (urllib.error.URLError, json.JSONDecodeError) as error:
        raise RuntimeError(f"GraphQL request failed: {error}") from error


def require(condition: object, context: object) -> None:
    if not condition:
        raise RuntimeError(f"Phase 3 smoke assertion failed: {context}")


inserted = graphql("""mutation {
  insert_activities(objects: [
    {garmin_activity_id: 9000000000301, food_during: ["banana", "", "gel"], food_after: ["rice", "banana"]},
    {garmin_activity_id: 9000000000302, food_during: null, food_after: ["gel", "  "]}
  ]) { affected_rows }
}""")
require(not inserted.get("errors"), inserted)
result = graphql("query { food_options(order_by: {value: asc}) { value } }")
require(not result.get("errors"), result)
values = [row["value"] for row in result["data"]["food_options"]]
require(values == sorted(set(values)), values)
require({"banana", "gel", "rice"} <= set(values), values)
require("" not in values and "  " not in values, values)
cleanup = graphql(
    "mutation { delete_activities(where: {garmin_activity_id: {_in: [9000000000301, 9000000000302]}}) { affected_rows } }"
)
require(not cleanup.get("errors"), cleanup)
print("phase3 food_options smoke: PASS")
