# Site settings panel (`/qwedsa`)

Manage Google Tag Manager, GA4, Google Ads, Meta Pixel, TikTok, Microsoft Clarity, site-verification tags and custom code
without a deploy. Saved changes are applied to every page immediately.

- Panel: `https://globalpetcab.ae/qwedsa` (not linked anywhere on the site, `noindex`)
- Code: `admin-panel.js`, hooked into `server.js` (it runs before Next.js sees a request)
- Settings are saved in `data/site-settings.json` (git-ignored, so a deploy never overwrites them)

## Environment variables (Hostinger → Environment variables), all optional

| Variable | Purpose |
|---|---|
| `GPC_SETTINGS_FILE` | Full path of the settings file. **Recommended:** a folder outside the app folder, e.g. `/home/<user>/gpc-data/site-settings.json`, so settings survive any redeploy |
| `GPC_ADMIN_PATH` | Panel path, default `qwedsa` |
| `GPC_ADMIN_USER` | Login name before the first change inside the panel (default `gpcadmin`) |
| `GPC_ADMIN_PASSWORD_HASH` | Replaces the built-in password. Format `scrypt$<salt>$<hash>` |
| `GPC_SESSION_SECRET` | Signs the login cookie (default: derived from the password hash) |

A login name / password changed inside the panel is stored in the settings file and wins over the built-in one.

## How tags reach the page

`server.js` passes every html response through `inject()`: scripts go right after `<head>`, noscript fallbacks and custom
end-of-body code go before `</body>`. API, `_next`, images and the panel itself are never touched. The html is requested
uncompressed from the inner server (the host's proxy compresses it again).

## Security notes

- Passwords are stored as scrypt hashes. Five wrong attempts lock an address for 15 minutes.
- The session cookie is `HttpOnly`, `SameSite=Strict`, `Secure` on https, valid 8 hours.
- Changes need the same origin and an `X-Requested-With` header (basic CSRF protection).
- Custom code is added exactly as typed. Only paste code from a source you trust.
