import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Footer: new contact email (info@globalpetcab.ae) and a refreshed look (CSS only, applies to the shared footer on every page).
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const changed = [];

/* ---------- email ---------- */
const OLD = 'dubai@globalpetcab.ae';
const NEW = 'info@globalpetcab.ae';
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'cache') walk(p, out); }
    else if (/\.(html|rsc|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks', 'app'))]) {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes(OLD)) continue;
  fs.writeFileSync(f, s.split(OLD).join(NEW));
  changed.push('email: ' + path.relative(ROOT, f));
}

/* ---------- copyright line ---------- */
const COPY_NEW = 'Global Pet Cab. All rights reserved.';
const COPY_OLDS = ['&', '&amp;', '\\u0026'].map((amp) => `Global Pet Cab Dubai (globalpetcab.ae). All rights reserved. Registered UAE Pet Transport ${amp} Relocation Logistics.`);
for (const f of [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks', 'app'))]) {
  const s = fs.readFileSync(f, 'utf8');
  if (!COPY_OLDS.some((o) => s.includes(o))) continue;
  let n = s;
  for (const o of COPY_OLDS) n = n.split(o).join(COPY_NEW);
  fs.writeFileSync(f, n);
  changed.push('copyright: ' + path.relative(ROOT, f));
}

/* ---------- look ---------- */
const CSS_START = '/*gpc-footer*/';
const CSS_END = '/*end-gpc-footer*/';
const F = 'footer.bg-navy';
const MAIN = `${F}>div.max-w-7xl`;
const CSS = [
  CSS_START,
  `${F}{position:relative;background:radial-gradient(60rem 26rem at 10% -6%,rgba(20,184,166,.18),transparent 60%),radial-gradient(46rem 24rem at 100% 8%,rgba(14,115,150,.26),transparent 60%),linear-gradient(180deg,#052d49 0%,#031f33 100%)}`,
  `${F}::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;z-index:2;background:linear-gradient(90deg,#14b8a6,#38bdf8 45%,#c2410c)}`,
  // link columns
  `${MAIN}>div:nth-child(1){border-bottom:1px solid rgba(255,255,255,.1)!important;padding-bottom:3rem}`,
  `${F} h3{position:relative;height:auto!important;padding-bottom:.85rem;margin-bottom:1.1rem;color:#7ee0f5!important;letter-spacing:.16em}`,
  `${F} h3::after{content:"";position:absolute;left:0;bottom:0;width:2.25rem;height:3px;border-radius:99px;background:linear-gradient(90deg,#14b8a6,#38bdf8)}`,
  `${F} ul{display:flex;flex-direction:column;gap:.7rem}`,
  `${F} ul>li{margin:0!important}`,
  `${F} ul a{display:inline-flex;align-items:center;color:rgba(255,255,255,.74);font-size:.9375rem;line-height:1.35;transition:color .2s ease,transform .25s cubic-bezier(.16,1,.3,1)}`,
  `${F} ul a::before{content:"";display:inline-block;width:0;height:2px;margin-right:0;border-radius:2px;background:#38bdf8;transition:width .25s cubic-bezier(.16,1,.3,1),margin .25s cubic-bezier(.16,1,.3,1)}`,
  `${F} ul a:hover{color:#fff;transform:translateX(2px)}`,
  `${F} ul a:hover::before{width:.9rem;margin-right:.5rem}`,
  // brand column
  `${MAIN}>div:nth-child(1)>div:first-child>p{color:rgba(255,255,255,.72)!important;line-height:1.8}`,
  `${MAIN}>div:nth-child(1)>div:first-child a:first-child{display:inline-flex}`,
  // logo: it was shown 32px tall inside a small chip; give it a proper size on a white card
  `${MAIN}>div:nth-child(1)>div:first-child>a:first-child{height:auto!important;margin-bottom:.25rem}`,
  `${MAIN}>div:nth-child(1)>div:first-child>a:first-child>span{height:auto!important;padding:.7rem 1.15rem!important;border-radius:1.1rem!important;box-shadow:0 14px 30px -18px rgba(0,0,0,.6)}`,
  `${MAIN}>div:nth-child(1)>div:first-child>a:first-child img{height:3.6rem!important;width:auto!important;max-width:none!important}`,
  // third trust badge (IPATA), after IATA and MOCCAE; a pseudo element so it shows on every prerendered page without touching their markup
  // the three badges sit in one even row of equal tiles (icon above the label) instead of wrapping into a ragged column
  `${MAIN}>div:nth-child(1)>div:first-child>div.flex-wrap{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:.5rem;max-width:20rem}`,
  `${MAIN}>div:nth-child(1)>div:first-child>div.flex-wrap>*,${MAIN}>div:nth-child(1)>div:first-child>div.flex-wrap::after{display:flex!important;flex-direction:column;align-items:center;justify-content:flex-start;gap:.4rem;height:auto!important;min-height:4.4rem;padding:.7rem .35rem!important;border-radius:1rem!important;background-color:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:.72rem!important;font-weight:700;line-height:1.2;text-align:center;color:#fff}`,
  `${MAIN}>div:nth-child(1)>div:first-child>div.flex-wrap>* svg{width:1.15rem!important;height:1.15rem!important}`,
  `${MAIN}>div:nth-child(1)>div:first-child>div.flex-wrap::after{content:"IPATA Member";padding-top:2.15rem!important;background:rgba(255,255,255,.07) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fbbf24' stroke='%23fbbf24' stroke-width='1.5' stroke-linejoin='round'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E") no-repeat center .7rem/1.15rem}`,
  // contact row: three glass cards
  `${MAIN}>div:nth-child(2){border-bottom:none!important;padding:2.25rem 0 1.5rem!important;gap:1rem!important}`,
  `${MAIN}>div:nth-child(2)>*{display:flex;align-items:center;gap:.9rem;padding:.9rem 1.15rem;border-radius:1.1rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.88);transition:background .25s ease,border-color .25s ease,transform .25s cubic-bezier(.16,1,.3,1)}`,
  `${MAIN}>div:nth-child(2)>a:hover{background:rgba(56,189,248,.1);border-color:rgba(56,189,248,.45);transform:translateY(-2px)}`,
  `${MAIN}>div:nth-child(2) svg{box-sizing:content-box;flex:none;width:1.15rem!important;height:1.15rem!important;padding:.6rem;border-radius:999px;background:rgba(56,189,248,.14);color:#7ee0f5!important}`,
  // bottom bar
  `${MAIN}>div:nth-child(3){border-top:1px solid rgba(255,255,255,.1)!important;margin-top:.5rem;color:rgba(255,255,255,.55)!important;font-size:.875rem}`,
  `${MAIN}>div:nth-child(3) a{color:rgba(255,255,255,.65);transition:color .2s ease}`,
  `${MAIN}>div:nth-child(3) a:hover{color:#fff}`,
  CSS_END,
].join('\n');

const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
changed.push('css');
console.log('footer:\n  ' + changed.join('\n  '));
