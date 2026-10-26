#!/usr/bin/env bash
# Build deploy.zip from committed live app (server.js + .next). No npm run build.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

node "$ROOT/scripts/patch-trust-badges.mjs"
node "$ROOT/scripts/patch-taxi-hero-form.mjs"
node "$ROOT/scripts/patch-places-google.mjs"
node "$ROOT/scripts/patch-taxi-faq.mjs"
node "$ROOT/scripts/patch-international-split.mjs"
node "$ROOT/scripts/patch-site-menu.mjs"
node "$ROOT/scripts/patch-site-fixes.mjs"
node "$ROOT/scripts/patch-home-hero.mjs"
node "$ROOT/scripts/patch-home-services.mjs"
node "$ROOT/scripts/patch-how-it-works-fixes.mjs"
node "$ROOT/scripts/patch-why-us-fixes.mjs"
node "$ROOT/scripts/patch-destinations-fixes.mjs"
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
