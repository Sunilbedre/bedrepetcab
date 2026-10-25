#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/.next/server/app/index.html"

if [[ ! -f "$HTML" ]]; then
  echo "Missing $HTML — run: git pull origin main" >&2
  exit 1
fi

if grep -q "IPATA Member" "$HTML" && grep -q "IATA-Compliant Handling" "$HTML"; then
  echo "Trust badges: OK (IPATA + IATA build)"
  exit 0
fi

echo "Trust badges: OLD build still on disk." >&2
echo "Run:" >&2
echo "  cd ~/finalglobalpetcab && git fetch origin && git reset --hard origin/main" >&2
exit 1
