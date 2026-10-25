#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d "$ROOT/src/app" ]]; then
  echo "error: missing src/app — git pull origin main" >&2
  exit 1
fi

if [[ ! -d "$ROOT/node_modules" ]]; then
  npm install
fi

npx prisma generate
export PORT=3010
echo "Dev server (hot reload): http://localhost:3010"
echo "Edit files in src/ — save — browser refreshes."
exec npx next dev -p 3010
