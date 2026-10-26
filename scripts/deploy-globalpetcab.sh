#!/usr/bin/env bash
# Deploy trust-badge / live build to Hostinger (globalpetcab.ae)
# Usage: bash scripts/deploy-globalpetcab.sh
# Optional: export GPC_SSH_PASSWORD='your-hostinger-ssh-password'
set -euo pipefail

SSH_HOST="217.21.85.101"
SSH_PORT="65002"
SSH_USER="u432886921"
REMOTE_DIR="domains/globalpetcab.ae/hbuilds/manual-deploy"
LIVE_URL="https://globalpetcab.ae"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ZIP="$(bash "$ROOT/scripts/pack-deploy.sh" | tail -1)"

SSH_BASE=(ssh -o StrictHostKeyChecking=accept-new -p "$SSH_PORT")
SCP_BASE=(scp -o StrictHostKeyChecking=accept-new -P "$SSH_PORT")

run_ssh() {
  if [[ -n "${GPC_SSH_PASSWORD:-}" ]] && command -v sshpass >/dev/null 2>&1; then
    sshpass -p "$GPC_SSH_PASSWORD" "${SSH_BASE[@]}" "${SSH_USER}@${SSH_HOST}" "$@"
  else
    "${SSH_BASE[@]}" "${SSH_USER}@${SSH_HOST}" "$@"
  fi
}

run_scp() {
  local src=$1 dest=$2
  if [[ -n "${GPC_SSH_PASSWORD:-}" ]] && command -v sshpass >/dev/null 2>&1; then
    sshpass -p "$GPC_SSH_PASSWORD" "${SCP_BASE[@]}" "$src" "${SSH_USER}@${SSH_HOST}:$dest"
  else
    "${SCP_BASE[@]}" "$src" "${SSH_USER}@${SSH_HOST}:$dest"
  fi
}

echo "Uploading to Hostinger..."
run_ssh "mkdir -p $REMOTE_DIR"
run_scp "$ZIP" "$REMOTE_DIR/deploy.zip"

echo "Installing on server..."
run_ssh "cd $REMOTE_DIR && rm -rf app && mkdir -p app && unzip -o deploy.zip -d app && cd app && npm ci --omit=dev && npx prisma generate && (npx prisma db push || true) && (node scripts/seed.js || true)"

echo ""
echo "Done. In Hostinger hPanel:"
echo "  Websites → globalpetcab.ae → Node.js → set app root to:"
echo "  $REMOTE_DIR/app"
echo "  Start command: npm start   (or: node server.js)"
echo "  Click Restart, then open $LIVE_URL"
echo ""
echo "Verify: curl -sL $LIVE_URL | grep -o 'IPATA Member' | head -1"
