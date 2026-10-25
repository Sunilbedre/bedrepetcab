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

bash "$ROOT/scripts/verify-trust-badges.sh"

export PORT="${PORT:-3010}"
export HOSTNAME="${HOSTNAME:-127.0.0.1}"
echo "Starting Global Pet Cab at http://localhost:${PORT} (from ${ROOT})"
echo "Tip: stop any old server first (Ctrl+C), or: pkill -f 'node server.js'"
exec node server.js
