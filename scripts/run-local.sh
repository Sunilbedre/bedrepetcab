#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "$ROOT/server.js" ]]; then
  echo "error: server.js not found. Run from finalglobalpetcab repo root." >&2
  exit 1
fi
if [[ ! -f "$ROOT/.next/BUILD_ID" ]]; then
  echo "error: missing .next build. Run: git pull origin main" >&2
  exit 1
fi

export PORT="${PORT:-3010}"
export HOSTNAME="${HOSTNAME:-127.0.0.1}"
echo "Starting Global Pet Cab at http://localhost:${PORT} (from ${ROOT})"
exec node server.js
