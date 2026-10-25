# Global Pet Cab Dubai — globalpetcab.ae

Live Hostinger website in this repo (`server.js` + `.next`).

```powershell
git clone https://github.com/Sunilbedre/finalglobalpetcab.git
cd finalglobalpetcab
npm ci --omit=dev
npx prisma generate
$env:PORT=3010
npm start
```

→ **http://localhost:3010** (same as the live site)

**Changes:** ask Cursor to edit → push to `main` → Hostinger deploys. See [WORKING.md](WORKING.md).
