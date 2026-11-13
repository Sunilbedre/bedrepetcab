import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page hero: the single photo + illustration hero is replaced by a banner slider (public/banners/home-1..5.jpg).
 * Slides change by themselves with CSS only (works without JS); public/gpc-home-banners.js adds dots, arrows, swipe and pause.
 * The trust bar that overlaps the bottom of the hero is kept. Rewritten in the browser chunk and the server page, which must match.
 * Idempotent: the whole hero function body is rebuilt on every run, so copy changes below simply re-run.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const SERVER_PAGE = path.join(ROOT, 'server', 'app', 'page.js');
const CLIENT_DIR = path.join(ROOT, 'static', 'chunks', 'app');
const SCRIPT_SRC = '/gpc-home-banners.js?v=1';

const SLIDES = [
  { img: '/banners/home-1.jpg', alt: 'A Dubai pet parent with a golden retriever and a cat next to a travel crate, with the Dubai skyline behind',
    kicker: 'UAE PET MOBILITY & RELOCATION', h1: true, title: 'Pet Relocation in the UAE, Made Simple From Start to Safe Arrival',
    text: 'One team for your pet’s whole journey: paperwork, crate, flights and door-to-door travel, in the UAE and to 40+ countries.',
    cta: ['Get a Free Quote', '/get-a-quote'], cta2: ['Chat on WhatsApp', 'https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai', true] },
  { img: '/banners/home-2.jpg', alt: 'A Global Pet Cab driver greeting a woman and her golden retriever at the van door',
    kicker: 'UAE PET TAXI', title: 'Safe, comfortable rides for your pet across the UAE',
    text: 'Vet visits, grooming, hotels and airports. See your price before you book.',
    cta: ['Book a Pet Taxi', '/book-pet-taxi'], cta2: ['Pet taxi details', '/dubai-pet-taxi'] },
  { img: '/banners/home-3.jpg', alt: 'A golden retriever with a suitcase, passport and travel crate, ready to leave Dubai',
    kicker: 'RELOCATION FROM THE UAE', title: 'Moving your pet out of the UAE?',
    text: 'Export permits, an IATA-approved crate, flights and delivery, all handled for you.',
    cta: ['Start your export quote', '/book-pet-relocation-from-dubai'], cta2: ['How it works', '/international-pet-relocation/from-dubai'] },
  { img: '/banners/home-4.jpg', alt: 'A golden retriever looking out of a plane window at the Dubai skyline and Palm Jumeirah',
    kicker: 'RELOCATION INTO THE UAE', title: 'Bringing your pet to the UAE?',
    text: 'Import permit, health checks and a smooth arrival in the UAE, with one team beside you.',
    cta: ['Start your import quote', '/book-pet-relocation-to-dubai'], cta2: ['How it works', '/international-pet-relocation/to-dubai'] },
  { img: '/banners/home-5.jpg', alt: 'A woman walking her golden retriever up into a Global Pet Cab van',
    kicker: 'AIRPORT & CITY TRANSFERS', title: 'Door to door, from your home to the airport',
    text: 'DXB, DWC, Sharjah, Abu Dhabi and everyday city rides in a pet-friendly van.',
    cta: ['Check the price', '/book-pet-taxi?ride=airport'], cta2: ['Pet taxi details', '/dubai-pet-taxi'] },
];

/* ---- jsx text builders (client and server builds use different runtime call styles) ---- */
function builders(J, JS) {
  const q = (v) => JSON.stringify(v);
  const props = (o) => Object.entries(o).map(([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k)}:${typeof v === 'string' ? q(v) : v && v.__raw ? v.__raw : v}`).join(',');
  const node = (tag, p, kids) => {
    if (kids === undefined) return `${J}(${q(tag)},{${props(p)}})`;
    if (Array.isArray(kids)) return `${JS}(${q(tag)},{${props(p)},children:[${kids.join(',')}]})`;
    return `${J}(${q(tag)},{${props(p)},children:${q(kids)}})`;
  };
  return node;
}

function heroExpr(node, bar) {
  const slides = SLIDES.map((s, i) => node('div', { className: 'gpc-hb-slide' + (i === 0 ? ' on0' : '') }, [
    node('img', { className: 'gpc-hb-img', src: s.img, alt: s.alt, width: '1800', height: '600', loading: i === 0 ? 'eager' : 'lazy', decoding: 'async', ...(i === 0 ? { fetchPriority: 'high' } : {}) }),
    node('div', { className: 'gpc-hb-shade', 'aria-hidden': 'true' }),
    node('div', { className: 'gpc-hb-wrap' }, [
      node('div', { className: 'gpc-hb-copy' }, [
        node('span', { className: 'gpc-hb-kicker' }, s.kicker),
        node(s.h1 ? 'h1' : 'h2', { className: 'gpc-hb-title font-heading' }, s.title),
        node('p', { className: 'gpc-hb-text' }, s.text),
        node('div', { className: 'gpc-hb-btns' }, [
          node('a', { className: 'gpc-hb-btn pri', href: s.cta[1] }, s.cta[0]),
          node('a', { className: 'gpc-hb-btn sec', href: s.cta2[1], ...(s.cta2[2] ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }, s.cta2[0]),
        ]),
      ]),
    ]),
  ]));
  const ui = node('div', { className: 'gpc-hb-ui' }, [
    node('button', { type: 'button', className: 'gpc-hb-arrow prev', 'data-dir': 'prev', 'aria-label': 'Previous banner' }, '‹'),
    node('div', { className: 'gpc-hb-dots' }, SLIDES.map((s, i) => node('button', { type: 'button', className: 'gpc-hb-dot', 'data-i': String(i), 'aria-label': 'Show banner ' + (i + 1) }))),
    node('button', { type: 'button', className: 'gpc-hb-arrow next', 'data-dir': 'next', 'aria-label': 'Next banner' }, '›'),
  ]);
  const stage = node('div', { className: 'gpc-hb-stage', 'data-gpc-hb': '1', role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Global Pet Cab' }, [...slides, ui]);
  // colour options for the client (scripts/patch-home-themes.mjs): the inline script sets the chosen theme before the page paints
  const EARLY = "try{var t=new URLSearchParams(location.search).get('theme')||localStorage.getItem('gpcTheme');if(/^(a|b|c|d|e)$/.test(t||''))document.body.setAttribute('data-gpc-theme',t)}catch(e){}";
  const early = node('script', { dangerouslySetInnerHTML: { __raw: '{__html:' + JSON.stringify(EARLY) + '}' } });
  return node('section', { className: 'gpc-hb font-body' }, [stage, bar, node('script', { src: SCRIPT_SRC, defer: true })]);
}

/* ---- locate the hero function's returned expression ---- */
function endOfCall(s, from) {
  let depth = 0, str = null;
  for (let i = from; i < s.length; i++) {
    const c = s[i];
    if (str) { if (c === '\\') i++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '(') depth++;
    else if (c === ')') { depth--; if (depth === 0 && s[i + 1] !== '(') return i + 1; }
  }
  throw new Error('unbalanced');
}

function patchFile(file) {
  let s = fs.readFileSync(file, 'utf8');
  const marks = ['"section",{className:"relative overflow-hidden bg-[#052D49] text-white pt-12', '"section",{className:"gpc-hb font-body"'];
  let at = -1;
  for (const m of marks) { at = s.indexOf(m); if (at !== -1) break; }
  if (at === -1) throw new Error('patch-home-banners: hero not found in ' + file);
  // start of the call: `(0,s.jsxs)(` or `s.jsxs(`
  let start = s.lastIndexOf('(0,s.jsxs)', at);
  let J, JS;
  if (start !== -1 && start === at - '(0,s.jsxs)('.length) { J = '(0,s.jsx)'; JS = '(0,s.jsxs)'; }
  else { start = s.lastIndexOf('s.jsxs', at); J = 's.jsx'; JS = 's.jsxs'; if (start !== at - 's.jsxs('.length) throw new Error('patch-home-banners: unexpected call shape in ' + file); }
  const end = endOfCall(s, start);
  const old = s.slice(start, end);

  // keep the trust bar that overlaps the hero (the original wrapper, reused as it is)
  const barKey = '"relative z-30 translate-y-1/2 -mt-6 sm:-mt-8"';
  const bk = old.indexOf(barKey);
  if (bk === -1) throw new Error('patch-home-banners: trust bar wrapper not found in ' + file);
  const bs = Math.max(old.lastIndexOf('(0,s.jsx)("div"', bk), old.lastIndexOf('s.jsx("div"', bk));
  const bar = old.slice(bs, endOfCall(old, bs));

  const next = heroExpr(builders(J, JS), bar);
  if (next === old) return false;
  s = s.slice(0, start) + next + s.slice(end);
  fs.writeFileSync(file, s);
  return true;
}

const clientFile = fs.readdirSync(CLIENT_DIR).filter((n) => /^page-.*\.js$/.test(n)).map((n) => path.join(CLIENT_DIR, n)).find((f) => fs.readFileSync(f, 'utf8').includes('1011:function(e,t,a)'));
if (!clientFile) throw new Error('patch-home-banners: home client chunk not found');
const done = [];
if (patchFile(clientFile)) done.push('browser chunk');
if (patchFile(SERVER_PAGE)) done.push('server page');

/* ---- css ---- */
const CSS_START = '/*gpc-home-banners*/';
const CSS_END = '/*end-gpc-home-banners*/';
const H = '.gpc-hb';
const delays = [0, 6, 12, 18, 24];
const CSS = [
  CSS_START,
  `${H}{position:relative;background:transparent;color:#fff}`,
  // the trust bar overlaps the bottom of the banner and now sits in normal flow (it used to hang half-way out of the old hero)
  `html body ${H}>div.relative.z-30{transform:none!important;margin-top:-3rem!important;margin-left:auto!important;margin-right:auto!important;max-width:80rem;padding:0 1rem}`,
  '@media (min-width:640px){' + `html body ${H}>div.relative.z-30{padding:0 1.5rem}}`,
  '@media (min-width:1024px){' + `html body ${H}>div.relative.z-30{padding:0 2rem}}`,
  `html body ${H}+section#dubai-taxi-calculator.gpc-home-picker{padding-top:2.5rem!important}`,
  `${H}-stage{position:relative;overflow:hidden;aspect-ratio:3/1;min-height:25rem;background:#052d49}`,
  `${H}-slide{position:absolute;inset:0;opacity:0;visibility:hidden;animation:gpc-hb-fade 30s infinite}`,
  ...delays.map((d, i) => `${H}-slide:nth-child(${i + 1}){animation-delay:${d}s}`),
  `${H}-slide.on0{opacity:1;visibility:visible}`,
  `${H}-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:78% 50%}`,
  `${H}-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,23,38,.86) 0%,rgba(4,26,44,.5) 38%,rgba(5,45,73,0) 64%)}`,
  `${H}-wrap{position:relative;z-index:2;height:100%;max-width:80rem;margin:0 auto;padding:0 1rem;display:flex;align-items:center}`,
  '@media (min-width:640px){' + `${H}-wrap{padding:0 1.5rem}}`,
  '@media (min-width:1024px){' + `${H}-wrap{padding:0 2rem}}`,
  `${H}-copy{max-width:34rem;display:flex;flex-direction:column;align-items:flex-start;gap:.9rem;padding:2rem 0 4rem}`,
  `${H}-kicker{font-size:.78rem;font-weight:800;letter-spacing:.16em;color:#7ed7f0}`,
  `${H}-title{margin:0;font-weight:900;line-height:1.1;letter-spacing:-.02em;font-size:clamp(1.65rem,3.1vw,2.9rem);text-wrap:balance}`,
  `${H}-text{margin:0;font-size:clamp(.95rem,1.15vw,1.1rem);line-height:1.6;color:rgba(255,255,255,.92);text-wrap:pretty}`,
  `${H}-btns{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:.4rem}`,
  `${H}-btn{display:inline-flex;align-items:center;justify-content:center;padding:.85rem 1.6rem;border-radius:999px;font-weight:800;font-size:.95rem;text-decoration:none;white-space:nowrap;transition:transform .2s,background .2s,box-shadow .2s}`,
  `${H}-btn.pri{background:#c2410c;color:#fff;box-shadow:0 16px 34px -16px rgba(234,88,12,.8)}`,
  `${H}-btn.pri:hover{background:#ea580c;transform:translateY(-2px)}`,
  `${H}-btn.sec{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.45);backdrop-filter:blur(6px)}`,
  `${H}-btn.sec:hover{background:rgba(255,255,255,.22)}`,
  // dots + arrows
  `${H}-ui{position:absolute;left:0;right:0;bottom:3.6rem;z-index:5;display:flex;align-items:center;justify-content:center;gap:.9rem;pointer-events:none}`,
  `${H}-dots{display:flex;gap:.45rem;pointer-events:auto}`,
  `${H}-dot{width:.6rem;height:.6rem;padding:0;border:0;border-radius:999px;background:rgba(255,255,255,.45);cursor:pointer;animation:gpc-hb-dot 30s infinite;transition:width .3s,background .3s}`,
  ...delays.map((d, i) => `${H}-dot:nth-child(${i + 1}){animation-delay:${d}s}`),
  `${H}-dot:first-child{width:1.6rem;background:#fff}`,
  `${H}-arrow{display:none;pointer-events:auto;width:2.6rem;height:2.6rem;border:0;border-radius:999px;background:rgba(255,255,255,.16);color:#fff;font-size:1.7rem;line-height:1;cursor:pointer;backdrop-filter:blur(6px);transition:background .2s}`,
  `${H}-arrow:hover{background:rgba(255,255,255,.34)}`,
  '@media (min-width:768px){' + `${H}-arrow{display:block}${H}-arrow.prev{margin-right:auto;margin-left:1.5rem}${H}-arrow.next{margin-left:auto;margin-right:1.5rem}}`,
  // script mode: the dots / arrows drive the slides
  `${H}-stage[data-js] ${H}-slide{animation:none;opacity:0;visibility:hidden;transition:opacity .7s ease,visibility .7s}`,
  `${H}-stage[data-js] ${H}-slide.on{opacity:1;visibility:visible}`,
  `${H}-stage[data-js] ${H}-dot{animation:none;width:.6rem;background:rgba(255,255,255,.45)}`,
  `${H}-stage[data-js] ${H}-dot.on{width:1.6rem;background:#fff}`,
  '@keyframes gpc-hb-fade{0%,17%{opacity:1;visibility:visible}21%,97%{opacity:0;visibility:hidden}100%{opacity:1;visibility:visible}}',
  '@keyframes gpc-hb-dot{0%,19.5%{width:1.6rem;background:#fff}20%,100%{width:.6rem;background:rgba(255,255,255,.45)}}',
  // phones: one tall portrait photo (public/banners/home-mobile.webp) fills every slide; the text sits over its open sky at the top
  '@media (max-width:767px){',
  `${H}-stage{aspect-ratio:auto;height:44rem;min-height:0}`,
  `${H}-slide{display:flex;flex-direction:column;background:#0b2a6e url(/banners/home-mobile.webp) center bottom/cover no-repeat}`,
  `${H}-img{display:none}`,
  `${H}-shade{display:block}`,
  `${H}-wrap{flex:1;align-items:flex-start;position:relative;z-index:2}`,
  `${H}-copy{padding:2.4rem 0 6rem;gap:.65rem;align-items:center;text-align:center;margin:0 auto}`,
  `${H}-title{font-size:1.65rem}`,
  `${H}-text{font-size:.95rem;line-height:1.5}`,
  `${H}-ui{bottom:3.7rem}`,
  `${H}-btns{gap:.55rem;justify-content:center}`,
  `${H}-btn{padding:.7rem 1.15rem;font-size:.88rem}`,
  '}',
  '@media (prefers-reduced-motion:reduce){' + `${H}-slide,${H}-dot{animation:none!important}${H}-slide:first-child{opacity:1;visibility:visible}}`,
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
done.push('css');
console.log('home banners: ' + done.join(', '));
