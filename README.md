# Global Pet Cab Dubai — globalpetcab.ae

Live Hostinger website in this repo (`server.js` + `.next`).

### Mac (Terminal / zsh) — copy all lines

```bash
cd ~/finalglobalpetcab
git pull origin main
npm ci --omit=dev
npx prisma generate
npm run local
```

Open **http://localhost:3010**

### Windows (PowerShell)

```powershell
cd $HOME\finalglobalpetcab
git pull origin main
npm ci --omit=dev
npx prisma generate
$env:PORT=3010; npm start
```

Open **http://localhost:3010**

**Changes:** tell Cursor what to edit → push to `main` → Hostinger deploys.
