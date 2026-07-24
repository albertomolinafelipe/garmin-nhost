# garmin-nhost

Nhost-based successor to `garmin-dash`. This phase provides an empty Postgres +
Hasura project, a Vite dashboard shell, and an `ondra` health-check service.

## Prerequisites

Nix with flakes enabled and a running Docker daemon. Do not install Python packages
globally on NixOS; the dev shell creates `.venv` and installs ondra's pinned dev
requirements there.

## Run locally

```sh
cp .env.example .env
cp .secrets.example .secrets
# Replace every placeholder secret in both local files before starting. Keep the
# Hasura admin-secret values identical.
nix develop
nhost up
```

The CLI prints the local Hasura console URL when startup completes. Stop the stack
cleanly with `nhost down`. The Nhost CLI is pinned through `flake.lock`; this
scaffold was authored for `nhost v1.42.1`.

Dashboard development:

```sh
cd dashboard
npm ci
npm run dev
```

Ondra development and health smoke:

```sh
uvicorn app.main:app --app-dir ondra --reload
curl --fail http://127.0.0.1:8000/healthz

# Container alternative
docker build -t garmin-ondra:dev ondra
docker run --rm -p 8000:8000 garmin-ondra:dev
```

`ONDRA_URL` is deployment configuration: it must be the URL that Hasura can reach.
Remote-schema registration and local custom-service wiring arrive in Phase 4.
