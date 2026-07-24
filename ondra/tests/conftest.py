import os

os.environ.setdefault("ONDRA_REMOTE_SCHEMA_SECRET", "test-remote-schema-secret")
os.environ.setdefault("ONDRA_HASURA_GRAPHQL_ADMIN_SECRET", "test-admin-secret")
os.environ.setdefault("HASURA_GRAPHQL_URL", "http://hasura.test/v1/graphql")
