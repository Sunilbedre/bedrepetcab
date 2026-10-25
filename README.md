# Global Pet Cab Dubai

## Work locally (see your changes on localhost)

**You:** tell Cursor what to change.  
**Cursor:** edits `src/` and runs the dev server.  
**You:** open **http://localhost:3010** in Cursor (**Forwarded Ports → 3010**).

Edits in `src/` show up automatically when you save (hot reload).

### First time on your Mac (once)

```bash
cd ~/finalglobalpetcab
git pull origin main
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

Then keep **http://localhost:3010** open. After that, usually only `git pull` + `npm run dev` if you work on your machine.

### Deploy to live site

After you approve changes, Cursor pushes to GitHub → auto-deploy to **globalpetcab.ae** (see [DEPLOYMENT.md](DEPLOYMENT.md)).
