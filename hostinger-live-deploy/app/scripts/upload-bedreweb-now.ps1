# One-click upload to bedreweb.com — run in PowerShell from project root:
#   .\scripts\upload-bedreweb-now.ps1

$ErrorActionPreference = "Stop"

$SSH_HOST = "147.93.109.71"
$SSH_PORT = 65002
$SSH_USER = "u172903565"
$HOSTKEY = "ssh-ed25519 255 SHA256:zZ2Y6Dqt4T9xa/K2mR/J3u4T+gtHB63cOUUhrWVfq4w"
$REMOTE_DIR = "domains/bedreweb.com/nodejs"
$PLINK = "C:\Users\admin\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.2_Microsoft.Winget.Source_8wekyb3d8bbwe\plink.exe"

if (-not (Test-Path $PLINK)) {
  $PLINK = (Get-Command plink -ErrorAction SilentlyContinue).Source
}
if (-not $PLINK) { throw "plink.exe not found. Install PuTTY." }

$SSH_PASS = Read-Host "SSH password for $SSH_USER" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($SSH_PASS)
$PlainPass = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Building..." -ForegroundColor Cyan
npm run build | Out-Host
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

$stage = Join-Path $env:TEMP "gpc-deploy"
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null

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

Write-Host "Creating remote folder..." -ForegroundColor Cyan
& $PLINK -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" "mkdir -p $REMOTE_DIR/app"

Write-Host "Uploading $([math]::Round((Get-Item $archive).Length / 1MB, 1)) MB (may take 1-2 min)..." -ForegroundColor Cyan
$p = Start-Process -FilePath $PLINK -ArgumentList @(
  "-batch", "-hostkey", $HOSTKEY, "-P", $SSH_PORT, "-pw", $PlainPass,
  "${SSH_USER}@${SSH_HOST}", "cat > $REMOTE_DIR/deploy.zip"
) -RedirectStandardInput $archive -Wait -PassThru -NoNewWindow
if ($p.ExitCode -ne 0) { throw "Upload failed (exit $($p.ExitCode))" }

Write-Host "Extracting on server..." -ForegroundColor Cyan
$remoteCmd = @"
cd $REMOTE_DIR && rm -rf app && mkdir app && unzip -o deploy.zip -d app && cd app && rm -rf node_modules && npm install && export DATABASE_URL='file:./prisma/dev.db' && npx prisma generate && npx prisma db push && node scripts/seed.js || true && mkdir -p tmp && touch tmp/restart.txt && ls -la | head
"@
& $PLINK -batch -hostkey $HOSTKEY -P $SSH_PORT -pw $PlainPass "${SSH_USER}@${SSH_HOST}" $remoteCmd

Write-Host ""
Write-Host "FILES UPLOADED to $REMOTE_DIR/app" -ForegroundColor Green
Write-Host ""
Write-Host "Now in Hostinger hPanel:" -ForegroundColor Yellow
Write-Host "  Websites -> bedreweb.com -> Advanced -> Node.js"
Write-Host "  App root:     $REMOTE_DIR/app"
Write-Host "  Startup file: server.js"
Write-Host "  Node:         20.x"
Write-Host "  Click Create / Restart"
Write-Host ""
Write-Host "Then open https://bedreweb.com"
