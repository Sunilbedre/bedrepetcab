# Deploy Global Pet Cab to globalpetcab.ae (Hostinger hbuilds)
# Preferred: push to GitHub main — Hostinger auto-deploys from hPanel Git integration.
# Manual fallback: run from project root in PowerShell:
#   .\scripts\deploy-globalpetcab.ps1

$ErrorActionPreference = "Stop"

$SSH_HOST = "217.21.85.101"
$SSH_PORT = 65002
$SSH_USER = "u432886921"
$HOSTKEY = "ssh-ed25519 255 SHA256:cFixqEv+gHRuB/Gm0dNRZsCJKqts3O6fcI5z8Ceb70U"
$REMOTE_DIR = "domains/globalpetcab.ae/hbuilds/manual-deploy"
$LIVE_URL = "https://globalpetcab.ae"

Write-Host "NOTE: Hostinger hbuilds usually deploys from GitHub on push." -ForegroundColor Yellow
Write-Host "      Prefer: git push origin main, then redeploy in hPanel if needed." -ForegroundColor Yellow
Write-Host ""

$SSH_PASS = Read-Host "SSH password for $SSH_USER" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SSH_PASS)
$PlainPass = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

$stage = Join-Path $env:TEMP "gpc-deploy"
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null

Write-Host "Staging deploy files..." -ForegroundColor Cyan
Copy-Item -Recurse ".next\standalone\*" $stage
New-Item -ItemType Directory -Path (Join-Path $stage ".next") -Force | Out-Null
Copy-Item -Recurse ".next\static" (Join-Path $stage ".next\static")
Copy-Item -Recurse "public" (Join-Path $stage "public")
Copy-Item -Recurse "prisma" (Join-Path $stage "prisma")
Copy-Item -Recurse "scripts" (Join-Path $stage "scripts")
Copy-Item "package.json" $stage
Copy-Item "package-lock.json" $stage
Copy-Item ".env.production.example" (Join-Path $stage ".env")

$archive = Join-Path $env:TEMP "gpc-deploy.zip"
if (Test-Path $archive) { Remove-Item $archive -Force }
Compress-Archive -Path "$stage\*" -DestinationPath $archive

$plink = Get-Command plink -ErrorAction SilentlyContinue
$pscp = Get-Command pscp -ErrorAction SilentlyContinue
if (-not $plink -or -not $pscp) {
  throw "Install PuTTY (plink + pscp) or upload $archive manually via Hostinger File Manager."
}

Write-Host "Uploading to Hostinger..." -ForegroundColor Cyan
& plink -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" "mkdir -p $REMOTE_DIR"
& pscp -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass $archive "${SSH_USER}@${SSH_HOST}:$REMOTE_DIR/deploy.zip"

Write-Host "Installing on server..." -ForegroundColor Cyan
$remoteCmd = @"
cd $REMOTE_DIR && \
rm -rf app && mkdir -p app && \
unzip -o deploy.zip -d app && \
cd app && \
npm ci --omit=dev && \
npx prisma generate && \
npx prisma db push && \
node scripts/seed.js || true
"@ -replace "`r`n", " "

& plink -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" $remoteCmd

Write-Host ""
Write-Host "Upload complete." -ForegroundColor Green
Write-Host "Restart the Node app in hPanel -> Websites -> globalpetcab.ae -> Node.js" -ForegroundColor Yellow
Write-Host "Then open $LIVE_URL" -ForegroundColor Green
