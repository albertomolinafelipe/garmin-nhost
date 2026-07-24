import hmac
import os
from dataclasses import dataclass
from typing import Annotated

import strawberry
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from strawberry.fastapi import GraphQLRouter
from strawberry.schema.config import StrawberryConfig

DEFAULT_DAYS = 7
MAX_DAYS = 31
DEFAULT_MAX_ACTIVITIES = 20
MAX_ACTIVITIES = 100
SECRET_HEADER = "X-Ondra-Secret"


@dataclass(frozen=True)
class Settings:
    remote_schema_secret: str
    hasura_graphql_url: str
    hasura_admin_secret: str

    @classmethod
    def from_environment(cls) -> "Settings":
        values = {
            "remote_schema_secret": os.environ.get("ONDRA_REMOTE_SCHEMA_SECRET", ""),
            "hasura_graphql_url": os.environ.get("HASURA_GRAPHQL_URL", ""),
            "hasura_admin_secret": os.environ.get(
                "ONDRA_HASURA_GRAPHQL_ADMIN_SECRET", ""
            ),
        }
        missing = [name for name, value in values.items() if not value]
        if missing:
            env_names = {
                "remote_schema_secret": "ONDRA_REMOTE_SCHEMA_SECRET",
                "hasura_graphql_url": "HASURA_GRAPHQL_URL",
                "hasura_admin_secret": "ONDRA_HASURA_GRAPHQL_ADMIN_SECRET",
            }
            missing_names = ", ".join(env_names[name] for name in missing)
            raise RuntimeError(
                f"Missing required environment variables: {missing_names}"
            )
        return cls(**values)


@strawberry.type
@dataclass
class SyncResult:
    activities_created: int = strawberry.field(name="activities_created")
    activities_updated: int = strawberry.field(name="activities_updated")
    sleep_created: int = strawberry.field(name="sleep_created")
    sleep_updated: int = strawberry.field(name="sleep_updated")
    streams_written: int = strawberry.field(name="streams_written")
    activities_failed: int = strawberry.field(name="activities_failed")
    errors: list[str] = strawberry.field(name="errors")


@strawberry.type
class Query:
    @strawberry.field(description="Service readiness marker.")
    def service(self) -> str:
        return "ondra"


@strawberry.type
class Mutation:
    @strawberry.mutation(
        name="syncActivities",
        description=(
            "Run one bounded sync. Omitted arguments use small defaults; values outside "
            "their documented positive bounds are rejected."
        ),
    )
    def sync_activities(
        self,
        days: int = DEFAULT_DAYS,
        max_activities: Annotated[
            int, strawberry.argument(name="maxActivities")
        ] = DEFAULT_MAX_ACTIVITIES,
    ) -> SyncResult:
        """Return the Phase 4 stub after validating bounded-work arguments."""
        if not 1 <= days <= MAX_DAYS:
            raise ValueError(f"days must be between 1 and {MAX_DAYS}")
        if not 1 <= max_activities <= MAX_ACTIVITIES:
            raise ValueError(f"maxActivities must be between 1 and {MAX_ACTIVITIES}")
        return SyncResult(
            activities_created=0,
            activities_updated=0,
            sleep_created=0,
            sleep_updated=0,
            streams_written=0,
            activities_failed=0,
            errors=[],
        )


schema = strawberry.Schema(
    query=Query, mutation=Mutation, config=StrawberryConfig(auto_camel_case=False)
)


def create_app(settings: Settings | None = None) -> FastAPI:
    resolved_settings = settings or Settings.from_environment()
    application = FastAPI(title="ondra")

    @application.middleware("http")
    async def verify_remote_schema_secret(request: Request, call_next):  # type: ignore[no-untyped-def]
        if request.url.path.rstrip("/") == "/graphql":
            supplied_secret = request.headers.get(SECRET_HEADER, "")
            if not hmac.compare_digest(
                supplied_secret, resolved_settings.remote_schema_secret
            ):
                return JSONResponse(status_code=401, content={"detail": "Unauthorized"})
        return await call_next(request)

    @application.get("/healthz", include_in_schema=False)
    def healthz() -> dict[str, str]:
        return {"status": "ok"}

    application.include_router(GraphQLRouter(schema), prefix="/graphql")
    return application


app = create_app()
