import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /get-a-quote uses the same two-step service picker as the home page (photo + "Choose Your Pet Transport or Relocation Service",
 * then the matching form) instead of the old four-card wizard.
 * The picker module is copied from the already patched home page (patch-home-services.mjs must run first), with a small change:
 * ?service=… (links from elsewhere) opens straight at step 2.
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const HOME_CLIENT_DIR = path.join(ROOT, 'static', 'chunks', 'app');
const HOME_SERVER = path.join(ROOT, 'server', 'app', 'page.js');
const Q_SERVER = path.join(ROOT, 'server', 'app', 'get-a-quote', 'page.js');
const Q_MANIFEST = path.join(ROOT, 'server', 'app', 'get-a-quote', 'page_client-reference-manifest.js');
const Q_CLIENT_DIR = path.join(ROOT, 'static', 'chunks', 'app', 'get-a-quote');
const VERSION = 'gpcQuoteV1';
const changed = [];

const must = (s, from, to, label) => {
  if (!s.includes(from)) throw new Error(`patch-quote-picker: ${label} not found`);
  return s.replace(from, () => to);
};

/* the home picker's component text (client and server builds differ only in module wrapper and imports) */
function homeModule(file, startMark, endMark) {
  const s = fs.readFileSync(file, 'utf8');
  const a = s.indexOf(startMark);
  const b = s.indexOf(endMark, a);
  if (a === -1 || b === -1) throw new Error('patch-quote-picker: home picker module not found (run patch-home-services first)');
  return s.slice(a, b);
}
function adapt(text, newId, startHead) {
  let t = text;
  t = t.replace(/^\d+/, String(newId));
  t = must(t, 'let gpcV="gpcPickerV2"', `let gpcV="${VERSION}"`, 'version');
  t = must(t, 'function c(){let[t,a]=(0,i.useState)("taxi"),[u,d]=(0,i.useState)(1),', 'function c(P){let gS=P&&P.initialService?String(P.initialService):"",[t,a]=(0,i.useState)(/international|relocation|export|import|from|to/.test(gS)?"from":"taxi"),[u,d]=(0,i.useState)(gS?2:1),', 'component head');
  t = must(t, 'className:"pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white gpc-home-picker"', 'className:"gpc-home-picker gpc-quote-picker"', 'section class');
  return t;
}

/* ---------- client chunk of the page ---------- */
{
  const file = fs.readdirSync(Q_CLIENT_DIR).filter((n) => /^page-.*\.js$/.test(n)).map((n) => path.join(Q_CLIENT_DIR, n))[0];
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes(VERSION)) {
    const homeFile = fs.readdirSync(HOME_CLIENT_DIR).filter((n) => /^page-.*\.js$/.test(n)).map((n) => path.join(HOME_CLIENT_DIR, n)).find((f) => fs.readFileSync(f, 'utf8').includes('1011:function(e,t,a){'));
    if (!homeFile) throw new Error('patch-quote-picker: home chunk not found');
    const mod = homeModule(homeFile, '1011:function(e,t,a){', '}}},function(e){e.O(0,[') + '}}';
    const a = s.indexOf('4176:function(e,t,a){');
    const b = s.indexOf(',2633:function(e,t,a){', a);
    if (a === -1 || b === -1) throw new Error('patch-quote-picker: wizard module boundaries not found');
    s = s.slice(0, a) + adapt(mod, 4176) + s.slice(b);
    s = must(s, 'e.O(0,[878,960,971,117,744],', 'e.O(0,[878,960,971,117,744,50,879],', 'chunk bootstrap');
    fs.writeFileSync(file, s);
    changed.push('client chunk');
  }
}

/* ---------- server bundle ---------- */
{
  let s = fs.readFileSync(Q_SERVER, 'utf8');
  if (!s.includes(VERSION)) {
    const mod = homeModule(HOME_SERVER, '7627:(e,t,a)=>{', '},1733:(e,t,a)=>{') + '}';
    const a = s.indexOf('8148:(e,t,a)=>{');
    const m = /\},(\d+):\(e,t,a\)=>\{/g;
    m.lastIndex = a + 20;
    const nx = m.exec(s);
    if (a === -1 || !nx) throw new Error('patch-quote-picker: wizard SSR module boundaries not found');
    s = s.slice(0, a) + adapt(mod, 8148) + s.slice(nx.index + 1);
    s = must(s, 't.X(0,[276,342,481,322,98],()=>a(1743))', 't.X(0,[276,342,481,322,98,262,916],()=>a(1743))', 'chunk loader');
    fs.writeFileSync(Q_SERVER, s);
    changed.push('server bundle');
  }
}

/* ---------- client reference manifest: the picker needs the two form chunks ---------- */
{
  let s = fs.readFileSync(Q_MANIFEST, 'utf8');
  const key = 'ChauffurBookingWizard.tsx":{"id":4176,"name":"*","chunks":[';
  const i = s.indexOf(key);
  if (i === -1) throw new Error('patch-quote-picker: manifest entry not found');
  const end = s.indexOf(']', i);
  if (!s.slice(i, end).includes('static/chunks/50-')) {
    const extra = ',"50","static/chunks/50-13a8cbaeec2f91ec.js","879","static/chunks/879-1c4eb1423b71f4ad.js"';
    s = s.slice(0, end) + extra + s.slice(end);
    fs.writeFileSync(Q_MANIFEST, s);
    changed.push('manifest');
  }
}

/* ---------- css ---------- */
const CSS_START = '/*gpc-quote-picker*/';
const CSS_END = '/*end-gpc-quote-picker*/';
const CSS = [
  CSS_START,
  '.gpc-quote-picker{padding:0!important;background:transparent!important;border:0!important}',
  // the id rule that clears the home hero (padding-top:140px on #dubai-taxi-calculator) outranks the class above
  'section#dubai-taxi-calculator.gpc-quote-picker{padding-top:0!important;padding-bottom:0!important}',
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
console.log('quote picker:\n  ' + changed.join('\n  '));
