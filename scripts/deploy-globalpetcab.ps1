# Deploy Global Pet Cab to globalpetcab.ae (live .next build — no npm run build)
# Run from repo root in PowerShell:
#   .\scripts\deploy-globalpetcab.ps1

$ErrorActionPreference = "Stop"

$SSH_HOST = "217.21.85.101"
$SSH_PORT = 65002
$SSH_USER = "u432886921"
$HOSTKEY = "ssh-ed25519 255 SHA256:cFixqEv+gHRuB/Gm0dNRZsCJKqts3O6fcI5z8Ceb70U"
$REMOTE_DIR = "domains/globalpetcab.ae/hbuilds/manual-deploy"
$LIVE_URL = "https://globalpetcab.ae"

$SSH_PASS = Read-Host "SSH password for $SSH_USER" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SSH_PASS)
$PlainPass = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

$stage = Join-Path $env:TEMP "gpc-deploy"
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null

Write-Host "Staging deploy files (server.js + .next)..." -ForegroundColor Cyan
Copy-Item server.js, app.js, package.json, package-lock.json $stage
Copy-Item -Recurse .next, public, prisma, scripts $stage
Copy-Item .env.production.example (Join-Path $stage ".env")

$archive = Join-Path $env:TEMP "gpc-deploy.zip"
if (Test-Path $archive) { Remove-Item $archive -Force }
Compress-Archive -Path "$stage\*" -DestinationPath $archive

$plink = Get-Command plink -ErrorAction SilentlyContinue
$pscp = Get-Command pscp -ErrorAction SilentlyContinue
if (-not $plink -or -not $pscp) {
  throw "Install PuTTY (plink + pscp). Archive ready at $archive — upload via File Manager if needed."
}

Write-Host "Uploading to Hostinger..." -ForegroundColor Cyan
& plink -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" "mkdir -p $REMOTE_DIR"
& pscp -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass $archive "${SSH_USER}@${SSH_HOST}:$REMOTE_DIR/deploy.zip"

$remoteCmd = "cd $REMOTE_DIR && rm -rf app && mkdir -p app && unzip -o deploy.zip -d app && cd app && npm ci --omit=dev && npx prisma generate && (npx prisma db push || true) && (node scripts/seed.js || true)"
& plink -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" $remoteCmd

Write-Host ""
Write-Host "Upload complete." -ForegroundColor Green
Write-Host "hPanel -> Websites -> globalpetcab.ae -> Node.js -> Restart app (root: $REMOTE_DIR/app, start: npm start)" -ForegroundColor Yellow
Write-Host "Then open $LIVE_URL and hard refresh (Ctrl+Shift+R)" -ForegroundColor Green
