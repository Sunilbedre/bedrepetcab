#!/usr/bin/env bash
# Run the Hostinger / live site build locally (server.js + .next) — NOT old src/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f "$ROOT/server.js" ]] || [[ ! -f "$ROOT/.next/BUILD_ID" ]]; then
  echo "error: missing Hostinger build. Run: git pull origin main" >&2
  exit 1
fi

bash "$ROOT/scripts/verify-trust-badges.sh" || true

export PORT="${PORT:-3010}"
export HOSTNAME="0.0.0.0"

# Stop old next dev if it is still running (it serves ~153KB "src/" site — wrong)
if pgrep -f "next dev -p ${PORT}" >/dev/null 2>&1; then
  echo "Stopping next dev on port ${PORT} (old src/ preview)…" >&2
  pkill -f "next dev -p ${PORT}" 2>/dev/null || true
  sleep 1
fi

echo "Hostinger live copy: http://localhost:${PORT}"
echo "(This is the real site files from .next — not the old src/ folder.)"
exec node server.js
