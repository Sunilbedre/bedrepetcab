#!/usr/bin/env bash
# Quick check: is localhost serving Hostinger .next (~230KB) or old next dev (~153KB)?
set -euo pipefail
PORT="${PORT:-3010}"
URL="http://localhost:${PORT}/"

bytes="$(curl -fsSL "$URL" | wc -c | tr -d ' ')"
if [[ "$bytes" -lt 200000 ]]; then
  echo "WRONG SERVER: homepage is ${bytes} bytes (expected ~230000)." >&2
  echo "You are likely on 'next dev' / old src/. Run: npm run dev" >&2
  exit 1
fi

if ! curl -fsSL "$URL" | grep -q 'IPATA Member'; then
  echo "Homepage size OK (${bytes} bytes) but missing IPATA Member in HTML." >&2
  exit 1
fi

echo "OK: Hostinger preview on :${PORT} (${bytes} bytes, IPATA badges in HTML)."
