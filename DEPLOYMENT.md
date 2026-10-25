# Deployment — globalpetcab.ae

## Live site not showing GitHub changes?

**GitHub `main` is updated first.** Hostinger does **not** auto-update until you redeploy.

1. Push is already on: `https://github.com/Sunilbedre/finalglobalpetcab` → branch **`main`**
2. Hostinger hPanel → **Websites** → **globalpetcab.ae** → **Deployments** (or Git)
3. **Pull / Redeploy** from `main` (or click **Deploy**)
4. Start command must be: **`npm start`** or **`node server.js`** (not `next build` — this repo ships the built `.next` folder)
5. Hard refresh: **Ctrl+Shift+R** on https://globalpetcab.ae

## Check live site from terminal

```bash
curl -sL https://globalpetcab.ae/ | grep -o 'IPATA Member' | head -1
```

If this prints nothing, production is still on the old build → redeploy in hPanel.

## Manual SSH deploy (fallback)

```powershell
.\scripts\deploy-globalpetcab.ps1
```

## Local Mac verify

```bash
cd ~/finalglobalpetcab
git fetch origin && git reset --hard origin/main
bash scripts/verify-trust-badges.sh
npm run local
```

Open http://localhost:3010 — **Cmd+Shift+R**
