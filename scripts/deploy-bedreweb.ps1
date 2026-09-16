# LEGACY — deploys to OLD server (bedreweb.com on 147.93.109.71).
# Current live site: https://globalpetcab.ae on 217.21.85.101 (see DEPLOYMENT.md).
# Run from project root in PowerShell:
#   .\scripts\deploy-bedreweb.ps1

$ErrorActionPreference = "Stop"

$SSH_HOST = "147.93.109.71"
$SSH_PORT = 65002
$SSH_USER = "u172903565"
$SSH_PASS = Read-Host "SSH password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SSH_PASS)
$PlainPass = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$HOSTKEY = "ssh-ed25519 255 SHA256:zZ2Y6Dqt4T9xa/K2mR/J3u4T+gtHB63cOUUhrWVfq4w"
$REMOTE_DIR = "domains/bedreweb.com/nodejs"
$APP_NAME = "global-pet-cab"

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

Write-Host "Uploading to Hostinger..." -ForegroundColor Cyan
$plink = Get-Command plink -ErrorAction SilentlyContinue
$pscp = Get-Command pscp -ErrorAction SilentlyContinue
if (-not $plink -or -not $pscp) {
  throw "Install PuTTY (plink + pscp) or upload $archive manually via Hostinger File Manager."
}

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
Write-Host "Next in Hostinger hPanel -> Websites -> bedreweb.com -> Node.js:" -ForegroundColor Yellow
Write-Host "  Application root: $REMOTE_DIR/app"
Write-Host "  Startup file:     server.js"
Write-Host "  Node version:     20.x"
Write-Host "  Run command:      node server.js"
Write-Host ""
Write-Host "Point bedreweb.com domain to this Node app, then open https://bedreweb.com"
