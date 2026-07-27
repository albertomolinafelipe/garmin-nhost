#!/usr/bin/env bash
# Log in to Garmin locally and push the resulting garth tokens to the deployed
# ondra as the GARTH_TOKENS_B64 cloud secret. Run from the repo root.
#
#   ./seed-garth-tokens.sh
#
# Re-execs itself inside `nix develop` so node (nhost CLI) and the .venv garth
# install are on PATH.
set -euo pipefail

cd "$(dirname "$0")"

# 1. Enter the nix dev shell exactly once.
if [[ -z "${SEED_GARTH_IN_NIX:-}" ]]; then
	exec nix develop --command env SEED_GARTH_IN_NIX=1 bash "$0" "$@"
fi

# 2. Load .env so the nhost CLI picks up project config.
set -a
# shellcheck disable=SC1091
source .env
set +a

TOKEN_DIR="$(mktemp -d)"
trap 'rm -rf "$TOKEN_DIR"' EXIT

# 3. Interactive Garmin login (may prompt for MFA), dumped to a temp dir.
read -rp "Garmin email: " GARMIN_EMAIL
read -rsp "Garmin password: " GARMIN_PASSWORD
echo
export GARMIN_EMAIL GARMIN_PASSWORD TOKEN_DIR

python - <<'PY'
import os
import garth

garth.login(os.environ["GARMIN_EMAIL"], os.environ["GARMIN_PASSWORD"])
garth.save(os.environ["TOKEN_DIR"])
print("Garmin login OK; tokens dumped.")
PY

# 4. Package the two token files into the base64 JSON blob ondra expects
#    (see ondra/app/garmin_client.py:_materialize_tokens).
BLOB="$(
	python - <<'PY'
import base64, json, os, pathlib
d = pathlib.Path(os.environ["TOKEN_DIR"])
payload = {name: (d / name).read_text()
           for name in ("oauth1_token.json", "oauth2_token.json")}
print(base64.b64encode(json.dumps(payload).encode()).decode())
PY
)"

# 5. Push to the linked cloud project (create, or update if it already exists).
if npx @nhost/cli@latest secrets create GARTH_TOKENS_B64 "$BLOB" 2>/dev/null; then
	echo "Created GARTH_TOKENS_B64 secret."
else
	npx @nhost/cli@latest secrets update GARTH_TOKENS_B64 "$BLOB"
	echo "Updated GARTH_TOKENS_B64 secret."
fi

echo "Done. Redeploy/restart ondra to pick up the new tokens."
