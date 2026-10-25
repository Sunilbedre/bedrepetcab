# Global Pet Cab — one workflow

## Mac (zsh)

```bash
cd ~/finalglobalpetcab
git pull origin main
npm ci --omit=dev
npx prisma generate
npm run local
```

Browser: **http://localhost:3010**

Do **not** use `$env:PORT` on Mac (that is Windows). Do **not** paste `PORT=3010` on the same line as `cd` without a newline.

## Windows

```powershell
cd $HOME\finalglobalpetcab
git pull origin main
npm ci --omit=dev
npx prisma generate
$env:PORT=3010; npm start
```

## Change the site

Describe changes in Cursor → we push to GitHub `main` → Hostinger updates **globalpetcab.ae**.
