'use strict';
/*
 * Site settings panel (tracking tags and code snippets) served straight from server.js, before Next.js sees the request.
 *
 *   /qwedsa                 login + panel (the path is not linked from the site; override with GPC_ADMIN_PATH)
 *   /qwedsa/api/*           json api used by the panel
 *
 * Saved settings take effect immediately: every html page is passed through inject() on its way out, so Google Tag Manager,
 * GA4, Google Ads, Meta Pixel, TikTok, Microsoft Clarity, site-verification tags and custom code can be changed without a deploy.
 *
 * Environment (all optional):
 *   GPC_ADMIN_PATH            panel path                         (default /qwedsa)
 *   GPC_SETTINGS_FILE         where settings are saved           (default <app>/data/site-settings.json)
 *   GPC_ADMIN_USER            login name                         (default below)
 *   GPC_ADMIN_PASSWORD_HASH   scrypt$<salt>$<hash>, replaces the built-in one
 *   GPC_SESSION_SECRET        signs the login cookie             (default derived from the password hash)
 * A password changed inside the panel is saved in the settings file and wins over the built-in one.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PANEL = ('/' + String(process.env.GPC_ADMIN_PATH || 'qwedsa').replace(/^\/+|\/+$/g, '')).toLowerCase();
const SETTINGS_FILE = process.env.GPC_SETTINGS_FILE || path.join(__dirname, 'data', 'site-settings.json');
const DEFAULT_USER = process.env.GPC_ADMIN_USER || 'gpcadmin';
const DEFAULT_HASH = process.env.GPC_ADMIN_PASSWORD_HASH || 'scrypt$4e4e897d4f931c3b9b07cc2d8da5967c$6f3354d5257d536a7996ee41b7bfd805e5a881456f2a3e58b9971ecbb0f2672e26b2ef2feb959759fd4a4c1df297dd2d01e1a98efb5477a2b64543c98e29146a';
const SESSION_HOURS = 8;
const MAX_BODY = 200 * 1024;

/* ---------------------------------------------------------------- settings */

const DEFAULTS = {
  enabled: true,
  gtmId: 'GTM-5ZTZ6W2C',
  ga4Id: '',
  adsId: '',
  metaPixelId: '',
  tiktokPixelId: '',
  clarityId: '',
  googleVerification: '',
  bingVerification: '',
  facebookVerification: '',
  customHead: '',
  customBodyEnd: '',
};

const RULES = {
  gtmId: [/^GTM-[A-Z0-9]{4,10}$/, 'Google Tag Manager ID looks like GTM-ABC1234'],
  ga4Id: [/^G-[A-Z0-9]{6,14}$/, 'GA4 measurement ID looks like G-ABC123XYZ4'],
  adsId: [/^AW-\d{6,12}$/, 'Google Ads ID looks like AW-123456789'],
  metaPixelId: [/^\d{8,20}$/, 'Meta Pixel ID is a number of 8 to 20 digits'],
  tiktokPixelId: [/^[A-Z0-9]{10,30}$/i, 'TikTok Pixel ID looks like C1ABCDEF2GHIJ3KLMNOP'],
  clarityId: [/^[a-z0-9]{8,14}$/i, 'Microsoft Clarity project ID looks like abcd1234ef'],
  googleVerification: [/^[A-Za-z0-9_-]{10,100}$/, 'Paste only the content value of the verification tag'],
  bingVerification: [/^[A-Za-z0-9_-]{10,100}$/, 'Paste only the content value of the verification tag'],
  facebookVerification: [/^[A-Za-z0-9_-]{10,100}$/, 'Paste only the content value of the verification tag'],
};

let cache = null;
function readFile() {
  try { return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')); } catch (e) { return {}; }
}
function mtime() { try { return fs.statSync(SETTINGS_FILE).mtimeMs; } catch (e) { return 0; } }
function load() {
  const mt = mtime();
  if (cache && cache.mt === mt) return cache; // re-read when the file changes (saved by the panel, restored or edited by hand)
  const f = readFile();
  const s = Object.assign({}, DEFAULTS);
  for (const k of Object.keys(DEFAULTS)) if (f.settings && f.settings[k] !== undefined) s[k] = f.settings[k];
  cache = { settings: s, auth: f.auth || null, updatedAt: f.updatedAt || null, mt };
  return cache;
}
function persist(settings, auth) {
  const dir = path.dirname(SETTINGS_FILE);
  fs.mkdirSync(dir, { recursive: true });
  const body = JSON.stringify({ settings, auth: auth || null, updatedAt: new Date().toISOString() }, null, 2);
  if (fs.existsSync(SETTINGS_FILE)) { try { fs.copyFileSync(SETTINGS_FILE, SETTINGS_FILE + '.bak'); } catch (e) { /* ignore */ } }
  const tmp = SETTINGS_FILE + '.tmp';
  fs.writeFileSync(tmp, body, { mode: 0o600 });
  fs.renameSync(tmp, SETTINGS_FILE);
  cache = null;
}
function validate(input) {
  const out = {}; const errors = {};
  out.enabled = input.enabled !== false;
  for (const k of Object.keys(RULES)) {
    const v = String(input[k] == null ? '' : input[k]).trim();
    if (v && !RULES[k][0].test(v)) errors[k] = RULES[k][1];
    out[k] = v;
  }
  for (const k of ['customHead', 'customBodyEnd']) {
    const v = String(input[k] == null ? '' : input[k]);
    if (v.length > 20000) errors[k] = 'Too long (20,000 characters maximum)';
    out[k] = v;
  }
  return { out, errors };
}

/* ---------------------------------------------------------------- html snippets */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function snippets(s) {
  const head = []; const bodyEnd = [];
  if (!s.enabled) return { head: '', bodyEnd: '' };
  if (s.gtmId) {
    head.push(`<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtmId}');</script><!-- End Google Tag Manager -->`);
    bodyEnd.push(`<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${s.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->`);
  }
  const gtagIds = [s.ga4Id, s.adsId].filter(Boolean);
  if (gtagIds.length) {
    head.push(`<!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${gtagIds.map((i) => `gtag('config','${i}');`).join('')}</script>`);
  }
  if (s.metaPixelId) {
    head.push(`<!-- Meta Pixel --><script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${s.metaPixelId}');fbq('track','PageView');</script>`);
    bodyEnd.push(`<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${s.metaPixelId}&ev=PageView&noscript=1"/></noscript>`);
  }
  if (s.tiktokPixelId) {
    head.push(`<!-- TikTok Pixel --><script>!function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${s.tiktokPixelId}');ttq.page();}(window, document, 'ttq');</script>`);
  }
  if (s.clarityId) {
    head.push(`<!-- Microsoft Clarity --><script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${s.clarityId}");</script>`);
  }
  const metas = [];
  if (s.googleVerification) metas.push(`<meta name="google-site-verification" content="${esc(s.googleVerification)}"/>`);
  if (s.bingVerification) metas.push(`<meta name="msvalidate.01" content="${esc(s.bingVerification)}"/>`);
  if (s.facebookVerification) metas.push(`<meta name="facebook-domain-verification" content="${esc(s.facebookVerification)}"/>`);
  const headHtml = metas.join('') + head.join('') + (s.customHead || '');
  const bodyHtml = bodyEnd.join('') + (s.customBodyEnd || '');
  return { head: headHtml, bodyEnd: bodyHtml };
}

function inject(html) {
  const { head, bodyEnd } = snippets(load().settings);
  if (head) {
    const m = /<head(\s[^>]*)?>/i.exec(html);
    if (m) html = html.slice(0, m.index + m[0].length) + head + html.slice(m.index + m[0].length);
  }
  if (bodyEnd) {
    const i = html.toLowerCase().lastIndexOf('</body>');
    if (i >= 0) html = html.slice(0, i) + bodyEnd + html.slice(i);
  }
  return html;
}

/* ---------------------------------------------------------------- auth */

function verifyPassword(password, stored) {
  try {
    const [scheme, salt, hash] = String(stored).split('$');
    if (scheme !== 'scrypt' || !salt || !hash) return false;
    const calc = crypto.scryptSync(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
    const want = Buffer.from(hash, 'hex');
    return want.length === calc.length && crypto.timingSafeEqual(calc, want);
  } catch (e) { return false; }
}
function makeHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return `scrypt$${salt}$${crypto.scryptSync(String(password), salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex')}`;
}
const creds = () => { const a = load().auth; return a && a.user && a.hash ? a : { user: DEFAULT_USER, hash: DEFAULT_HASH }; };
const secret = () => process.env.GPC_SESSION_SECRET || crypto.createHash('sha256').update('gpc-session|' + creds().hash).digest('hex');
const b64 = (b) => Buffer.from(b).toString('base64url');
const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
function makeCookie(user) {
  const payload = b64(JSON.stringify({ u: user, exp: Date.now() + SESSION_HOURS * 3600 * 1000 }));
  return payload + '.' + sign(payload);
}
function readSession(req) {
  const raw = String(req.headers.cookie || '').split(/;\s*/).find((c) => c.startsWith('gpc_admin='));
  if (!raw) return null;
  const val = raw.slice('gpc_admin='.length);
  const [payload, sig] = val.split('.');
  if (!payload || !sig) return null;
  const want = sign(payload);
  if (sig.length !== want.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return null;
  try {
    const d = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!d.exp || d.exp < Date.now() || d.u !== creds().user) return null;
    return d;
  } catch (e) { return null; }
}
const isHttps = (req) => !!(req.socket && req.socket.encrypted) || String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
function cookieHeader(req, value, maxAge) {
  return `gpc_admin=${value}; Path=${PANEL}; HttpOnly; SameSite=Strict; Max-Age=${maxAge}` + (isHttps(req) ? '; Secure' : '');
}

const attempts = new Map(); // ip -> {n, until}
const clientIp = (req) => String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || (req.socket && req.socket.remoteAddress) || '?';
function locked(ip) { const a = attempts.get(ip); return a && a.until > Date.now(); }
function fail(ip) {
  const a = attempts.get(ip) || { n: 0, until: 0 };
  a.n += 1; if (a.n >= 5) { a.until = Date.now() + 15 * 60 * 1000; a.n = 0; }
  attempts.set(ip, a);
}

/* ---------------------------------------------------------------- http helpers */

function send(res, status, body, type, extra) {
  const buf = Buffer.from(body);
  res.writeHead(status, Object.assign({
    'Content-Type': type || 'application/json; charset=utf-8',
    'Content-Length': buf.length,
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  }, extra || {}));
  res.end(buf);
}
const json = (res, status, obj, extra) => send(res, status, JSON.stringify(obj), 'application/json; charset=utf-8', extra);
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { reject(new Error('bad json')); } });
    req.on('error', reject);
  });
}
function sameOrigin(req) {
  const o = req.headers.origin; if (!o) return true;
  try { return new URL(o).host === req.headers.host; } catch (e) { return false; }
}

async function api(req, res, route) {
  const method = req.method;
  if (route === '/me' && method === 'GET') {
    const s = readSession(req);
    return json(res, 200, { ok: !!s, user: s ? s.u : null });
  }
  // everything that changes something needs the same origin and the custom header
  if (method !== 'GET' && (!sameOrigin(req) || req.headers['x-requested-with'] !== 'gpc-admin')) return json(res, 403, { error: 'Blocked' });

  if (route === '/login' && method === 'POST') {
    const ip = clientIp(req);
    if (locked(ip)) return json(res, 429, { error: 'Too many attempts. Try again in 15 minutes.' });
    let b; try { b = await readBody(req); } catch (e) { return json(res, 400, { error: 'Bad request' }); }
    const c = creds();
    const userOk = String(b.username || '').toLowerCase() === String(c.user).toLowerCase();
    const passOk = verifyPassword(b.password || '', c.hash);
    if (!(userOk && passOk)) {
      fail(ip);
      await new Promise((r) => setTimeout(r, 500));
      return json(res, 401, { error: 'Wrong username or password' });
    }
    attempts.delete(ip);
    return json(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader(req, makeCookie(c.user), SESSION_HOURS * 3600) });
  }
  if (route === '/logout' && method === 'POST') return json(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader(req, '', 0) });

  const sess = readSession(req);
  if (!sess) return json(res, 401, { error: 'Please log in' });

  if (route === '/settings' && method === 'GET') {
    const l = load();
    return json(res, 200, { settings: l.settings, updatedAt: l.updatedAt, user: sess.u, file: path.basename(SETTINGS_FILE) });
  }
  if (route === '/settings' && method === 'PUT') {
    let b; try { b = await readBody(req); } catch (e) { return json(res, 400, { error: 'Bad request' }); }
    const { out, errors } = validate(b || {});
    if (Object.keys(errors).length) return json(res, 422, { error: 'Please fix the highlighted fields', errors });
    try { persist(out, load().auth); } catch (e) { return json(res, 500, { error: 'Could not save: ' + (e && e.code || 'write error') + '. Check that the settings folder is writable.' }); }
    return json(res, 200, { ok: true, settings: out, updatedAt: load().updatedAt });
  }
  if (route === '/preview' && method === 'POST') {
    let b; try { b = await readBody(req); } catch (e) { return json(res, 400, { error: 'Bad request' }); }
    const { out, errors } = validate(b || {});
    if (Object.keys(errors).length) return json(res, 422, { error: 'Please fix the highlighted fields', errors });
    return json(res, 200, snippets(out));
  }
  if (route === '/password' && method === 'POST') {
    let b; try { b = await readBody(req); } catch (e) { return json(res, 400, { error: 'Bad request' }); }
    const c = creds();
    if (!verifyPassword(b.current || '', c.hash)) return json(res, 403, { error: 'Current password is wrong' });
    const np = String(b.next || '');
    const nu = String(b.username || c.user).trim();
    if (np.length < 10) return json(res, 422, { error: 'New password must be at least 10 characters' });
    if (!/^[A-Za-z0-9_.-]{3,32}$/.test(nu)) return json(res, 422, { error: 'Username: 3 to 32 letters, numbers, dot, dash or underscore' });
    try { persist(load().settings, { user: nu, hash: makeHash(np) }); } catch (e) { return json(res, 500, { error: 'Could not save the new password' }); }
    return json(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader(req, '', 0) });
  }
  return json(res, 404, { error: 'Not found' });
}

/* ---------------------------------------------------------------- request hook (called from server.js) */

function handle(req, res) {
  const url = String(req.url || '').split('?')[0];
  const lower = url.toLowerCase();
  if (lower === PANEL || lower === PANEL + '/') {
    if (req.method !== 'GET' && req.method !== 'HEAD') { send(res, 405, 'Method not allowed', 'text/plain'); return true; }
    send(res, 200, PAGE.replace('__BASE__', PANEL), 'text/html; charset=utf-8', {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
    });
    return true;
  }
  if (lower.startsWith(PANEL + '/api/')) {
    api(req, res, lower.slice((PANEL + '/api').length)).catch(() => { try { json(res, 500, { error: 'Server error' }); } catch (e) { /* ignore */ } });
    return true;
  }
  return false;
}

/* wraps res so html documents get the saved snippets; anything else streams through untouched */
function attach(req, res) {
  if (req.method !== 'GET') return;
  const url = String(req.url || '').split('?')[0];
  if (/^\/(_next|api)\//i.test(url) || url.toLowerCase().startsWith(PANEL) || /\.[a-z0-9]{2,5}$/i.test(url)) return;
  const accept = String(req.headers.accept || '');
  if (accept && !/text\/html|\*\/\*/.test(accept)) return;
  if (req.headers.rsc || req.headers['next-router-prefetch']) return;
  delete req.headers['accept-encoding']; // so the html reaches us uncompressed (the host compresses it again)

  const origWriteHead = res.writeHead, origWrite = res.write, origEnd = res.end;
  let pending = null, mode = null; const chunks = [];
  const toBuf = (c, enc) => {
    if (Buffer.isBuffer(c)) return c;
    if (c instanceof Uint8Array) return Buffer.from(c.buffer, c.byteOffset, c.byteLength); // Next streams pages as Uint8Array chunks
    return Buffer.from(String(c), typeof enc === 'string' ? enc : 'utf8');
  };
  const restore = () => { res.writeHead = origWriteHead; res.write = origWrite; res.end = origEnd; };
  const ctypeOf = () => {
    if (pending && pending.headers) { for (const k of Object.keys(pending.headers)) if (k.toLowerCase() === 'content-type') return String(pending.headers[k]); }
    return String(res.getHeader('content-type') || '');
  };
  const decide = () => {
    if (mode) return mode;
    const ok = /text\/html/i.test(ctypeOf()) && !res.getHeader('content-encoding') && !(pending && pending.headers && Object.keys(pending.headers).some((k) => k.toLowerCase() === 'content-encoding'));
    mode = ok ? 'buf' : 'pass';
    if (mode === 'pass') { restore(); if (pending) origWriteHead.apply(res, pending.args); }
    return mode;
  };
  res.writeHead = function (status, a, b) {
    const headers = typeof a === 'object' && a ? a : (typeof b === 'object' && b ? b : null);
    pending = { args: Array.prototype.slice.call(arguments), headers, status };
    res.statusCode = status;
    if (headers) { for (const k of Object.keys(headers)) { try { res.setHeader(k, headers[k]); } catch (e) { /* ignore */ } } }
    return res;
  };
  res.write = function (chunk, enc, cb) {
    if (decide() === 'pass') return origWrite.apply(res, arguments);
    chunks.push(toBuf(chunk, enc));
    const f = typeof enc === 'function' ? enc : cb; if (typeof f === 'function') f();
    return true;
  };
  res.end = function (chunk, enc, cb) {
    if (decide() === 'pass') return origEnd.apply(res, arguments);
    if (chunk && typeof chunk !== 'function') chunks.push(toBuf(chunk, enc));
    let body = Buffer.concat(chunks).toString('utf8');
    try { body = inject(body); } catch (e) { /* keep the page as it was */ }
    restore();
    res.removeHeader('content-length');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    if (pending) origWriteHead.call(res, pending.status);
    return origEnd.call(res, body);
  };
}

/* ---------------------------------------------------------------- the panel page */

const PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Site settings</title>
<style>
:root{--ink:#0f172a;--mut:#64748b;--line:#e2e8f0;--bg:#f1f5f9;--card:#fff;--brand:#0e7396;--brand-d:#0a5a75;--ok:#047857;--err:#b91c1c}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:var(--bg)}
a{color:var(--brand)}h1,h2,h3{margin:0;line-height:1.2}
.top{background:#0b2235;color:#fff;padding:.9rem 1rem;display:flex;align-items:center;gap:1rem;position:sticky;top:0;z-index:5}
.top b{font-size:1.05rem}.top .sp{flex:1}.top button{background:rgba(255,255,255,.12);color:#fff;border:0;border-radius:8px;padding:.5rem .9rem;font:inherit;cursor:pointer}
.wrap{max-width:860px;margin:0 auto;padding:1.25rem 1rem 6rem}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:1.25rem;margin:0 0 1rem}
.card h2{font-size:1.05rem;margin-bottom:.25rem}.card p.d{margin:.1rem 0 1rem;color:var(--mut);font-size:.9rem}
.row{display:grid;gap:.4rem;margin:0 0 .9rem}.row label{font-weight:600;font-size:.9rem}.row small{color:var(--mut)}
input[type=text],input[type=password],textarea{width:100%;padding:.65rem .75rem;border:1.5px solid var(--line);border-radius:10px;font:inherit;background:#fff}
input:focus,textarea:focus{outline:2px solid rgba(14,115,150,.25);border-color:var(--brand)}
textarea{min-height:120px;font:13px/1.45 ui-monospace,Consolas,monospace}
.bad{border-color:var(--err)!important}.msg{color:var(--err);font-size:.85rem}
.sw{display:flex;align-items:center;gap:.6rem;font-weight:600}.sw input{width:1.15rem;height:1.15rem}
.btn{background:var(--brand);color:#fff;border:0;border-radius:10px;padding:.7rem 1.2rem;font:inherit;font-weight:700;cursor:pointer}
.btn:hover{background:var(--brand-d)}.btn.g{background:#e2e8f0;color:var(--ink)}.btn:disabled{opacity:.6;cursor:wait}
.bar{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid var(--line);padding:.7rem 1rem;display:flex;gap:.6rem;justify-content:center;align-items:center;z-index:6;flex-wrap:wrap}
.toast{position:fixed;left:50%;transform:translateX(-50%);bottom:4.6rem;background:#065f46;color:#fff;padding:.6rem 1rem;border-radius:10px;z-index:7;display:none}
.toast.err{background:#991b1b}
.login{max-width:380px;margin:12vh auto;padding:0 1rem}.login .card{padding:1.6rem}
.grid2{display:grid;gap:0 1rem}@media(min-width:700px){.grid2{grid-template-columns:1fr 1fr}}
pre{background:#0f172a;color:#e2e8f0;padding:.8rem;border-radius:10px;overflow:auto;font-size:12px;white-space:pre-wrap;word-break:break-all;max-height:260px}
.modal{position:fixed;inset:0;background:rgba(15,23,42,.6);display:none;align-items:flex-start;justify-content:center;padding:4vh 1rem;z-index:20;overflow:auto}
.modal .box{background:#fff;border-radius:14px;max-width:820px;width:100%;padding:1.2rem}
.hint{background:#fffbeb;border:1px solid #fde68a;color:#78350f;border-radius:10px;padding:.6rem .8rem;font-size:.88rem;margin:0 0 1rem}
.meta{color:var(--mut);font-size:.85rem}
</style></head><body>
<div id="app"></div>
<div class="toast" id="toast"></div>
<script>
(function(){
var BASE='__BASE__',API=BASE+'/api',app=document.getElementById('app'),S=null,user='';
function $(s,r){return (r||document).querySelector(s)}
function h(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML}
function call(m,p,b){return fetch(API+p,{method:m,credentials:'same-origin',headers:{'Content-Type':'application/json','X-Requested-With':'gpc-admin'},body:b?JSON.stringify(b):undefined}).then(function(r){return r.json().then(function(j){return {s:r.status,j:j}})})}
function toast(t,bad){var e=$('#toast');e.textContent=t;e.className='toast'+(bad?' err':'');e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(function(){e.style.display='none'},3500)}

function loginView(msg){
  app.innerHTML='<div class="login"><div class="card"><h1 style="font-size:1.3rem;margin-bottom:.3rem">Site settings</h1><p class="d" style="color:#64748b;margin:0 0 1rem">Sign in to manage tracking and code snippets.</p>'+
  '<form id="lf"><div class="row"><label for="u">Username</label><input type="text" id="u" autocomplete="username" autocapitalize="off" required></div>'+
  '<div class="row"><label for="p">Password</label><input type="password" id="p" autocomplete="current-password" required></div>'+
  '<div class="msg" id="lm">'+(msg?h(msg):'')+'</div><button class="btn" style="width:100%;margin-top:.6rem">Sign in</button></form></div></div>';
  $('#lf').onsubmit=function(e){e.preventDefault();var b=$('#lf button');b.disabled=true;
    call('POST','/login',{username:$('#u').value,password:$('#p').value}).then(function(r){b.disabled=false;if(r.s===200)boot();else $('#lm').textContent=r.j.error||'Sign in failed'})};
  $('#u').focus();
}

var FIELDS=[
 ['Google Tag Manager','gtmId','Container ID, e.g. GTM-ABC1234','Loads your whole tag set. If you manage GA4, Ads or the Meta Pixel inside Tag Manager, leave those below empty so events are not counted twice.'],
 ['Google Analytics 4','ga4Id','Measurement ID, e.g. G-ABC123XYZ4','Only if GA4 is not already set up inside Tag Manager.'],
 ['Google Ads','adsId','Ads ID, e.g. AW-123456789','Base tag for conversion tracking and remarketing.'],
 ['Meta (Facebook) Pixel','metaPixelId','Pixel ID, digits only','Tracks page views. Add events (Lead, Contact) in Events Manager or Tag Manager.'],
 ['TikTok Pixel','tiktokPixelId','Pixel ID',''],
 ['Microsoft Clarity','clarityId','Project ID, e.g. abcd1234ef','Free heatmaps and session recordings.']
];
var VER=[['Google Search Console','googleVerification','content value of the google-site-verification tag'],['Bing Webmaster','bingVerification','content value of the msvalidate.01 tag'],['Meta domain verification','facebookVerification','content value of the facebook-domain-verification tag']];

function dashView(){
  var s=S.settings,html='<div class="top"><b>Site settings</b><span class="meta" style="color:#94a3b8">signed in as '+h(user)+'</span><span class="sp"></span><button id="lo">Sign out</button></div><div class="wrap">';
  html+='<div class="card"><div class="sw"><input type="checkbox" id="enabled"'+(s.enabled?' checked':'')+'><label for="enabled">Tracking is on for the whole website</label></div><p class="d" style="margin:.4rem 0 0">Switch off to stop every tag below at once. Saving applies instantly, no deploy needed.</p>'+(S.updatedAt?'<p class="meta" style="margin:.4rem 0 0">Last saved '+h(new Date(S.updatedAt).toLocaleString())+'</p>':'')+'</div>';
  html+='<div class="card"><h2>Tracking tags</h2><p class="d">Paste only the ID. Leave a field empty to keep that tag off.</p>';
  FIELDS.forEach(function(f){html+='<div class="row"><label for="'+f[1]+'">'+f[0]+'</label><input type="text" id="'+f[1]+'" value="'+h(s[f[1]]||'').replace(/"/g,'&quot;')+'" placeholder="'+f[2]+'" autocomplete="off" spellcheck="false"><small>'+f[3]+'</small><div class="msg" data-e="'+f[1]+'"></div></div>'});
  html+='</div><div class="card"><h2>Site verification</h2><p class="d">For Search Console, Bing and Meta. Paste the content value only, not the whole tag.</p><div class="grid2">';
  VER.forEach(function(f){html+='<div class="row"><label for="'+f[1]+'">'+f[0]+'</label><input type="text" id="'+f[1]+'" value="'+h(s[f[1]]||'').replace(/"/g,'&quot;')+'" placeholder="'+f[2]+'" autocomplete="off" spellcheck="false"><div class="msg" data-e="'+f[1]+'"></div></div>'});
  html+='</div></div><div class="card"><h2>Custom code</h2><p class="d">Any other snippet (chat widget, another pixel). It is added exactly as typed, so only paste code from a source you trust.</p>'+
  '<div class="row"><label for="customHead">In the head (top of every page)</label><textarea id="customHead" spellcheck="false" placeholder="&lt;script&gt;...&lt;/script&gt;">'+h(s.customHead||'')+'</textarea><div class="msg" data-e="customHead"></div></div>'+
  '<div class="row"><label for="customBodyEnd">At the end of the body</label><textarea id="customBodyEnd" spellcheck="false" placeholder="&lt;script&gt;...&lt;/script&gt;">'+h(s.customBodyEnd||'')+'</textarea><div class="msg" data-e="customBodyEnd"></div></div></div>';
  html+='<div class="card"><h2>Account</h2><p class="d">Change the login name or password. You will be signed out afterwards.</p><div class="grid2"><div class="row"><label for="cu">Login name</label><input type="text" id="cu" value="'+h(user)+'" autocomplete="off"></div><div class="row"><label for="cc">Current password</label><input type="password" id="cc" autocomplete="current-password"></div></div><div class="row"><label for="cn">New password (10+ characters)</label><input type="password" id="cn" autocomplete="new-password"></div><button class="btn g" id="cp">Change login</button></div>';
  html+='<p class="meta">Settings are stored in the file <b>'+h(S.file)+'</b> on the server. Keep a copy using Download backup.</p></div>';
  html+='<div class="bar"><button class="btn g" id="pv">Preview code</button><button class="btn g" id="bk">Download backup</button><button class="btn" id="sv">Save changes</button></div><div class="modal" id="md"><div class="box"><div style="display:flex;align-items:center;margin-bottom:.6rem"><h2 style="flex:1">Code added to every page</h2><button class="btn g" id="mc">Close</button></div><div id="mb"></div></div></div>';
  app.innerHTML=html;
  $('#lo').onclick=function(){call('POST','/logout').then(function(){loginView()})};
  $('#sv').onclick=save;$('#pv').onclick=preview;$('#bk').onclick=backup;$('#cp').onclick=changePw;$('#mc').onclick=function(){$('#md').style.display='none'};
}
function collect(){var o={enabled:$('#enabled').checked};FIELDS.concat(VER).forEach(function(f){o[f[1]]=$('#'+f[1]).value.trim()});o.customHead=$('#customHead').value;o.customBodyEnd=$('#customBodyEnd').value;return o}
function showErrors(errs){[].forEach.call(document.querySelectorAll('[data-e]'),function(e){var k=e.getAttribute('data-e'),i=document.getElementById(k);e.textContent=errs&&errs[k]||'';if(i)i.classList.toggle('bad',!!(errs&&errs[k]))});var first=errs&&Object.keys(errs)[0];if(first){var el=document.getElementById(first);if(el)el.scrollIntoView({block:'center'})}}
function save(){var b=$('#sv');b.disabled=true;call('PUT','/settings',collect()).then(function(r){b.disabled=false;if(r.s===200){S.settings=r.j.settings;S.updatedAt=r.j.updatedAt;showErrors(null);toast('Saved. Live on the website now.')}else if(r.s===401){loginView('Please sign in again')}else{showErrors(r.j.errors);toast(r.j.error||'Could not save',true)}})}
function preview(){call('POST','/preview',collect()).then(function(r){if(r.s!==200){showErrors(r.j.errors);toast(r.j.error||'Fix the fields first',true);return}showErrors(null);var j=r.j;$('#mb').innerHTML='<h3 style="margin:.4rem 0">Top of the head</h3><pre>'+h(j.head||'(nothing)')+'</pre><h3 style="margin:.8rem 0 .4rem">End of the body</h3><pre>'+h(j.bodyEnd||'(nothing)')+'</pre>';$('#md').style.display='flex'})}
function backup(){var blob=new Blob([JSON.stringify({settings:collect(),exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='site-settings-backup.json';document.body.appendChild(a);a.click();a.remove()}
function changePw(){call('POST','/password',{username:$('#cu').value,current:$('#cc').value,next:$('#cn').value}).then(function(r){if(r.s===200){loginView('Login changed. Please sign in with the new details.')}else toast(r.j.error||'Could not change',true)})}
function boot(){call('GET','/me').then(function(r){if(!r.j.ok)return loginView();user=r.j.user;call('GET','/settings').then(function(x){if(x.s!==200)return loginView();S=x.j;user=x.j.user;dashView()})})}
boot();
})();
</script></body></html>`;

module.exports = { handle, attach, inject, snippets, PANEL, _internals: { validate, makeHash, verifyPassword } };
