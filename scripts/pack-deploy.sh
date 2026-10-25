#!/usr/bin/env bash
# Build deploy.zip from committed live app (server.js + .next). No npm run build.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

bash "$ROOT/scripts/verify-trust-badges.sh"

STAGE="${TMPDIR:-/tmp}/gpc-deploy-stage"
OUT="${TMPDIR:-/tmp}/gpc-deploy.zip"
rm -rf "$STAGE" "$OUT"
mkdir -p "$STAGE"

cp server.js app.js package.json package-lock.json "$STAGE/"
cp -r .next public prisma scripts "$STAGE/"
cp .env.production.example "$STAGE/.env"

(cd "$STAGE" && zip -rq "$OUT" .)
echo "Created $OUT ($(du -h "$OUT" | cut -f1))"
echo "$OUT"
