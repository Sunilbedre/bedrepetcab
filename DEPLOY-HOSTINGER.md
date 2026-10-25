# Why globalpetcab.ae is still on the old site

GitHub **has** the new build (IPATA badges in `.next`). **Hostinger was never updated** because automatic deploy is blocked.

Every deploy workflow failed with:

**`Add GitHub secret HOSTINGER_SSH_PASSWORD`**

Until that secret exists, pushes to `main` do **not** upload files to Hostinger.

---

## One-time fix (about 2 minutes)

### 1. Add the GitHub secret

1. Open: https://github.com/Sunilbedre/finalglobalpetcab/settings/secrets/actions  
2. **New repository secret**  
   - Name: `HOSTINGER_SSH_PASSWORD`  
   - Value: your **Hostinger SSH password** (hPanel → **Advanced → SSH Access**)

### 2. Re-run deploy

1. Open: https://github.com/Sunilbedre/finalglobalpetcab/actions/workflows/deploy-hostinger.yml  
2. **Run workflow** → branch **main** → Run  
3. Wait until the job is green.

### 3. Restart Node on Hostinger

1. hPanel → **Websites** → **globalpetcab.ae** → **Node.js**  
2. Application root: `domains/globalpetcab.ae/hbuilds/manual-deploy/app`  
3. Start command: `npm start` (or `node server.js`)  
4. **Restart**

### 4. Confirm live site

Homepage should include **IPATA Member** (not only “Verified Google” in the trust bar).

---

## Manual deploy (if you prefer not to use GitHub)

On a machine that has your SSH password:

```bash
export GPC_SSH_PASSWORD='your-hostinger-ssh-password'
bash scripts/deploy-globalpetcab.sh
```

Then restart the Node app in hPanel (step 3 above).

---

## Local vs live

| | Local (`npm run dev`) | Live (globalpetcab.ae) |
|--|------------------------|-------------------------|
| After `git pull` | Can show **new** badges | **Old** until deploy + restart |
| Files used | `.next` in repo | Same zip uploaded to Hostinger |
