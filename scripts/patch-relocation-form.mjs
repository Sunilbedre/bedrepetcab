import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Relocation quote form (international page + destination pages):
 *  - the "Select Services Required" tick list is removed (the team confirms services on the quote)
 *  - separate Phone number and WhatsApp number fields (WhatsApp falls back to the phone number)
 *  - "Additional Requirements / Flight Preferences" is now "Remark"
 *  - city suggestions follow the country typed above them (UAE -> only UAE cities, India -> only Indian cities ...)
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const done = [];

function patch(file, pairs, marker) {
  const fp = path.join(ROOT, file);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes(marker)) { done.push(file + ' (already)'); return; }
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${file}: missing ${from.slice(0, 70)}`);
    s = s.replace(from, () => to);
  }
  fs.writeFileSync(fp, s);
  done.push(file);
}

/* ---------- the form itself (client + server copies are minified with different names) ---------- */
const FORMS = [
  { file: 'static/chunks/50-13a8cbaeec2f91ec.js', J: '(0,s.jsx)', svc: 'Q', ph: 'X', setPh: '$', city: 'h.Z' },
  { file: 'server/chunks/916.js', J: 's.jsx', svc: 'z', ph: 'K', setPh: 'X', city: 'u.Z' },
];
for (const F of FORMS) {
  const J = F.J;
  const WA = `(0,s.jsxs)("div",{className:"space-y-1.5",children:[${J}("label",{className:"fj-label",children:"WhatsApp Number"}),${J}("input",{type:"tel",value:gpcWa,onChange:e=>gpcSetWa(e.target.value),placeholder:"Same as phone if left empty",className:"fj-input"})]}),`;
  patch(F.file, [
    ['H_dir?null:gpcSvc', 'null'],
    ['H_dir?gpcSvc:null', 'null'],
    [`servicesJson:JSON.stringify(${F.svc})`, 'servicesJson:"[]"'],
    ['[ea,es]=(0,l.useState)("")', '[ea,es]=(0,l.useState)(""),[gpcWa,gpcSetWa]=(0,l.useState)("")'],
    [`whatsapp:${F.ph}`, `whatsapp:gpcWa.trim()||${F.ph}`],
    [`children:"Phone / WhatsApp *"}),${J}("input",{type:"tel",value:${F.ph},onChange:e=>${F.setPh}(e.target.value),placeholder:"+971 52 987 6543",className:"fj-input",required:!0})]}),`,
      `children:"Phone Number *"}),${J}("input",{type:"tel",value:${F.ph},onChange:e=>${F.setPh}(e.target.value),placeholder:"+971 52 987 6543",className:"fj-input",required:!0})]}),` + WA],
    [`"space-y-1.5 md:col-span-2",children:[${J}("label",{className:"fj-label",children:"Email Address *"}`, `"space-y-1.5",children:[${J}("label",{className:"fj-label",children:"Email Address *"}`],
    ['"Additional Requirements / Flight Preferences"', '"Remark"'],
    ['placeholder:"Share any special flight preferences, airline choices, or veterinary history..."', 'placeholder:"Anything we should know: flight preferences, airline, vet history..."'],
    [`${J}(${F.city},{value:f,onChange:g,className:"fj-input",scope:"city"`, `${J}(${F.city},{value:f,onChange:g,className:"fj-input",country:b,scope:"city"`],
    [`${J}(${F.city},{value:y,onChange:w,className:"fj-input",scope:"city"`, `${J}(${F.city},{value:y,onChange:w,className:"fj-input",country:v,scope:"city"`],
  ], 'gpcSetWa');
}

/* ---------- autocomplete component (client) ---------- */
patch('static/chunks/960-10288c27ff6627b2.js', [
  ['required:r,scope:c="dubai",id:p}=e', 'required:r,scope:c="dubai",id:p,country:gC}=e'],
  ['s=b.filter(e=>e.scopes.includes(a))', 's=b.filter(e=>e.scopes.includes(a)&&(!gC||"city"!==a||String(e.subtitle).toLowerCase().includes(String(gC).trim().toLowerCase())))'],
  ['"&scope=").concat(c))', '"&scope=").concat(c).concat("city"===c&&gC&&String(gC).trim()?"&country="+encodeURIComponent(String(gC).trim()):""))'],
  ['},280);return()=>window.clearTimeout(l)},[a,c,h])', '},280);return()=>window.clearTimeout(l)},[a,c,h,gC])'],
], 'country:gC');

/* ---------- places API ---------- */
const CC = { 'united arab emirates': 'ae', uae: 'ae', india: 'in', 'united kingdom': 'gb', uk: 'gb', 'united states': 'us', usa: 'us', 'united states of america': 'us', canada: 'ca', australia: 'au', 'new zealand': 'nz', singapore: 'sg', 'hong kong': 'hk', thailand: 'th', philippines: 'ph', pakistan: 'pk', 'south africa': 'za', ireland: 'ie', netherlands: 'nl', spain: 'es', italy: 'it', france: 'fr', germany: 'de', switzerland: 'ch', japan: 'jp', 'south korea': 'kr', malaysia: 'my', qatar: 'qa', 'saudi arabia': 'sa', kuwait: 'kw', bahrain: 'bh', oman: 'om', egypt: 'eg', jordan: 'jo', china: 'cn', turkey: 'tr', 'sri lanka': 'lk', bangladesh: 'bd', nepal: 'np', indonesia: 'id', russia: 'ru', brazil: 'br', mexico: 'mx', greece: 'gr', portugal: 'pt', sweden: 'se', norway: 'no', denmark: 'dk', belgium: 'be', austria: 'at', poland: 'pl' };
patch('server/app/api/places/search/route.js', [
  ['async function l(e,t){', 'const GPC_CC=' + JSON.stringify(CC) + ';async function l(e,t,gc){'],
  [':e),a.searchParams.set("limit","6")', ':("city"===t&&gc?e+" "+gc:e)),a.searchParams.set("limit","6")'],
  ['t&&i.push(t)', 't&&(!gc||String(t.subtitle||"").toLowerCase().includes(gc))&&i.push(t)'],
  ['async function gplaces(q,sc){', 'async function gplaces(q,sc,gc){'],
  ['let r=await fetch("https://places.googleapis.com', 'let gcc=gc&&GPC_CC[gc];gcc&&"city"===sc&&(b.includedRegionCodes=[gcc]);let r=await fetch("https://places.googleapis.com'],
  ['o.push({label:l,subtitle:String(f.secondaryText&&f.secondaryText.text||"").trim()||void 0})', 'let gsub=String(f.secondaryText&&f.secondaryText.text||"").trim();if(gc&&!gcc&&gsub.toLowerCase().indexOf(gc)<0)continue;o.push({label:l,subtitle:gsub||void 0})'],
  ['s=(0,c.ne)(t,r,8),', 'gC="city"===r?String(e.nextUrl.searchParams.get("country")||"").trim().toLowerCase():"",s=(0,c.ne)(t,r,40).filter(x=>!gC||String(x.subtitle||"").toLowerCase().includes(gC)).slice(0,8),'],
  ['gplaces(t.trim(),r)', 'gplaces(t.trim(),r,gC)'],
  ['l(t.trim(),r)', 'l(t.trim(),r,gC)'],
], 'GPC_CC');

console.log('relocation form:\n  ' + done.join('\n  '));

/* step labels no longer mention services */
for (const f of ['static/chunks/50-13a8cbaeec2f91ec.js', 'server/chunks/916.js']) {
  const fp = path.join(ROOT, f);
  const s = fs.readFileSync(fp, 'utf8');
  const n = s.split('"3. Services & Contact"').join('"3. Contact Info"').split('"Continue to Pet Details & Services"').join('"Continue to Pet Details"').split('"2. Pet & Services"').join('"2. Pet Details"');
  if (n !== s) fs.writeFileSync(fp, n);
}

/* pet type / name / breed / weight move to the first screen (above the Continue button) */
for (const f of ['static/chunks/50-13a8cbaeec2f91ec.js', 'server/chunks/916.js']) {
  const fp = path.join(ROOT, f);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('gpcPetStep1')) continue;
  const head = '2===e&&(0,s.jsxs)("div",{className:"space-y-8 animate-fade-in-up",children:[';
  const a = s.indexOf(head) + head.length;
  if (a < head.length) throw new Error(f + ': step 2 not found');
  let depth = 0, i = a, str = null;
  for (; i < s.length; i++) {
    const c = s[i];
    if (str) { if (c === '\\') i++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '(') depth++;
    else if (c === ')') { depth--; if (depth === 0 && s[i + 1] !== '(') { i++; break; } }
  }
  const block = s.slice(a, i);
  if (!block.includes('Pet Type') || s[i] !== ',') throw new Error(f + ': unexpected pet block');
  s = s.slice(0, a) + s.slice(i + 1);
  const btn = '(0,s.jsxs)("button",{type:"button",onClick:()=>{H_dir&&(';
  const b = s.indexOf(btn);
  if (b < 0) throw new Error(f + ': step 1 button not found');
  s = s.slice(0, b) + '("gpcPetStep1",' + block.replace('"grid grid-cols-2 md:grid-cols-4 gap-4"', '"gpc-pet-top grid grid-cols-2 gap-5"') + '),' + s.slice(b);
  fs.writeFileSync(fp, s);
  console.log('  pet fields on step 1: ' + f);
}

/* pet fields on the first screen: larger labels and inputs */
const PET_CSS_START = '/*gpc-pet-top*/', PET_CSS_END = '/*end-gpc-pet-top*/';
const PET_CSS = [PET_CSS_START,
  '#international-quote-form .gpc-pet-top{padding-top:.25rem}',
  '#international-quote-form .gpc-pet-top .fj-label{font-size:1rem;margin-bottom:.45rem}',
  '#international-quote-form .gpc-pet-top .fj-input,#international-quote-form .gpc-pet-top .fj-select{height:3.6rem;font-size:1.08rem;padding:0 1.15rem;border-radius:1.1rem;border-width:2px}',
  '#international-quote-form .gpc-pet-top .fj-select{padding-right:2.4rem}',
  '@media (max-width:639px){#international-quote-form .gpc-pet-top{gap:1rem}#international-quote-form .gpc-pet-top .fj-input,#international-quote-form .gpc-pet-top .fj-select{height:3.4rem;font-size:1.02rem}}',
  PET_CSS_END].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(PET_CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(PET_CSS_END) + PET_CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + PET_CSS + '\n');
}

/* two screens only: contact fields join the pet / health screen (the third screen is removed) */
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
for (const f of ['static/chunks/50-13a8cbaeec2f91ec.js', 'server/chunks/916.js']) {
  const fp = path.join(ROOT, f);
  let s = fs.readFileSync(fp, 'utf8');
  const st3 = s.indexOf('3===e&&');
  if (st3 < 0) continue;
  const st3End = endOfCall(s, st3 + '3===e&&'.length);
  const step3 = s.slice(st3, st3End);
  const GRID = '(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6"';
  const NAV = '(0,s.jsxs)("div",{className:"flex gap-4"';
  const g = step3.indexOf(GRID), n = step3.indexOf(NAV, g);
  if (g < 0 || n < 0) throw new Error(f + ': step 3 parts not found');
  const grid3 = step3.slice(g, n - 1);
  const nav3 = step3.slice(n, endOfCall(step3, n)).replace('onClick:()=>t(2)', 'onClick:()=>t(1)');
  // cut step 3 (and the comma before it)
  s = s.slice(0, st3 - 1) + s.slice(st3End);
  // swap the step 2 navigation for the contact fields + submit
  const k = s.indexOf('onClick:()=>t(3),className:"w-2/3');
  const n2 = s.lastIndexOf(NAV, k);
  const n2End = endOfCall(s, n2);
  s = s.slice(0, n2) + grid3 + ',' + nav3 + s.slice(n2End);
  // drop the third tab
  const tabKey = 'onClick:()=>t(3),className:';
  const tk = s.indexOf(tabKey);
  if (tk < 0) throw new Error(f + ': third tab not found');
  const tStart = Math.max(s.lastIndexOf('(0,s.jsx)("button"', tk), s.lastIndexOf('s.jsx("button"', tk));
  const tStartFix = s.lastIndexOf('("button",{type:"button",', tk);
  let ts = s.lastIndexOf('s.jsx', tStartFix);
  if (s.slice(ts - 3, ts) === '(0,') ts -= 3; else if (s[ts - 1] === ')') ts = s.lastIndexOf('(0,', ts);
  const te = endOfCall(s, s[ts] === '(' ? ts : ts);
  s = s.slice(0, ts - 1) + s.slice(te);
  s = s.split('"2. Pet Details"').join('"2. Pet & Contact"').split('"Contact Info"').join('"Contact Info"');
  fs.writeFileSync(fp, s);
  console.log('  two screens: ' + f);
}

/* moving INTO Dubai: rabies/titer and crate questions are not needed */
for (const f of ['static/chunks/50-13a8cbaeec2f91ec.js', 'server/chunks/916.js']) {
  const fp = path.join(ROOT, f);
  let s = fs.readFileSync(fp, 'utf8');
  if (s.includes('gpcHideTo')) continue;
  for (const label of ['Rabies & Titer (RNATT)?', 'IATA Crate Status']) {
    const li = s.indexOf('children:"' + label + '"');
    if (li < 0) throw new Error(f + ': ' + label + ' not found');
    const st = s.lastIndexOf('(0,s.jsxs)("div",{children:[', li);
    const en = endOfCall(s, st);
    s = s.slice(0, st) + '("to_dubai"===H_dir?null:' + s.slice(st, en) + ')' + s.slice(en);
  }
  const g = 'className:"grid grid-cols-2 md:grid-cols-4 gap-4 bg-teal-soft p-5';
  if (!s.includes(g)) throw new Error(f + ': health grid not found');
  s = s.replace(g, 'className:"gpcHideTo grid grid-cols-2 "+("to_dubai"===H_dir?"md:grid-cols-2":"md:grid-cols-4")+" gap-4 bg-teal-soft p-5');
  fs.writeFileSync(fp, s);
  console.log('  to-dubai health fields: ' + f);
}
