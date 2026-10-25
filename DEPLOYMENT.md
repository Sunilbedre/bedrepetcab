# Deploy to Hostinger — globalpetcab.ae

Changes are on GitHub **`main`**. To put them on **https://globalpetcab.ae**, deploy once (pick one method).

---

## Method A — Deploy from your Mac (recommended)

You need your **Hostinger SSH password** (hPanel → **Advanced** → **SSH Access**).

```bash
cd ~/finalglobalpetcab
git pull origin main
bash scripts/deploy-globalpetcab.sh
```

Enter SSH password when prompted.

Then in **hPanel**:

1. **Websites** → **globalpetcab.ae** → **Node.js**
2. Application root: `domains/globalpetcab.ae/hbuilds/manual-deploy/app`
3. Start command: **`npm start`**
4. **Restart** the app

Check live:

```bash
curl -sL https://globalpetcab.ae/ | grep -o 'IPATA Member' | head -1
```

---

## Method B — Windows PowerShell

```powershell
cd $HOME\finalglobalpetcab
git pull origin main
.\scripts\deploy-globalpetcab.ps1
```

Same hPanel restart steps as above.

---

## Method C — GitHub only (if Git deploy is already set up)

hPanel → **Deployments** → **Redeploy** branch **`main`**

**Important:** Build command must be **empty** or **skip** (this repo already contains `.next`).  
Start command: **`npm start`** or **`node server.js`**.

---

## Local preview before deploy

```bash
npm run local
```

Open http://localhost:3010
