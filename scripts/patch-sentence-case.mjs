import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * No more ALL-CAPS text on the site.
 *   1. CSS: nothing is uppercased by the stylesheet any more (the small labels above headings, tags, footer headings, the top bar ...).
 *   2. Text: the labels that were typed in capitals in the pages themselves are rewritten in sentence case (proper nouns and
 *      acronyms such as Dubai, UAE, IATA, IPATA, MOCCAE keep their capitals). Applied to the prerendered html / rsc and the page bundles.
 * Idempotent. Run after every patch that can write page text.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const MAP = [
  ['EXPORT OR IMPORT? START WITH YOUR DIRECTION', 'Export or import? Start with your direction'],
  ["READY TO PLAN YOUR PET'S JOURNEY?", "Ready to plan your pet's journey?"],
  ["READY TO PLAN YOUR PET'S MOVE?", "Ready to plan your pet's move?"],
  ['READY TO PLAN THE MOVE?', 'Ready to plan the move?'],
  ['JUMEIRAH → VET CLINIC (ROUND TRIP)', 'Jumeirah → Vet clinic (round trip)'],
  ['DUBAI MARINA → DXB AIRPORT', 'Dubai Marina → DXB airport'],
  ['DUBAI ↔ WORLDWIDE RELOCATION', 'Dubai ↔ worldwide relocation'],
  ['MUMBAI → DUBAI (DXB)', 'Mumbai → Dubai (DXB)'],
  ['DUBAI → LONDON (LHR)', 'Dubai → London (LHR)'],
  ['DUBAI ↔ WORLDWIDE', 'Dubai ↔ worldwide'],
  ['PLANNING A MOVE?', 'Planning a move?'],
  ['MARINA → DXB', 'Marina → DXB'],
  ['· VET · GROOMING', '· Vet · grooming'],
  ['\\xb7 VET \\xb7 GROOMING', '\\xb7 Vet \\xb7 grooming'],
  ['OFFICIAL DUBAI PET MOBILITY & RELOCATION LOGISTICS', 'Official Dubai pet mobility & relocation logistics'],
  ['KNOW WHICH WAY YOUR PET IS TRAVELLING', 'Know which way your pet is travelling'],
  ["WHATEVER YOUR PET'S JOURNEY LOOKS LIKE", "Whatever your pet's journey looks like"],
  ["YOUR PET'S JOURNEY TO CANADA", "Your pet's journey to Canada"],
  ['DUBAI PET MOBILITY & RELOCATION', 'Dubai pet mobility & relocation'],
  ['INTERNATIONAL JOURNEY SUPPORT', 'International journey support'],
  ['INTERNATIONAL PET RELOCATION', 'International pet relocation'],
  ['DOCUMENTS GENERALLY REQUIRED', 'Documents generally required'],
  ['WHAT GLOBAL PET CAB HANDLES', 'What Global Pet Cab handles'],
  ['LOCAL PET TRANSPORT OPTIONS', 'Local pet transport options'],
  ['LOCAL PICKUP & APPOINTMENTS', 'Local pickup & appointments'],
  ['REAL PET RELOCATION STORIES', 'Real pet relocation stories'],
  ['SIMPLE, TRANSPARENT PRICING', 'Simple, transparent pricing'],
  ['HOW WE SUPPORT YOUR MOVE', 'How we support your move'],
  ['QUESTIONS PET PARENTS ASK', 'Questions pet parents ask'],
  ['WHY PET PARENTS CHOOSE US', 'Why pet parents choose us'],
  ['DOCUMENTS & REQUIREMENTS', 'Documents & requirements'],
  ['AIRPORT & CITY TRANSFERS', 'Airport & city transfers'],
  ['CLIMATE-CONTROLLED FLEET', 'Climate-controlled fleet'],
  ['LOCAL MOBILITY SUPPORT', 'Local mobility support'],
  ['REASSURANCE & CLARITY', 'Reassurance & clarity'],
  ['RELOCATION FROM DUBAI', 'Relocation from Dubai'],
  ['RELOCATION INTO DUBAI', 'Relocation into Dubai'],
  ['CROSS-BORDER LOGISTICS', 'Cross-border logistics'],
  ['INSTANT DISTANCE FARE', 'Instant distance fare'],
  ['HUMAN-FIRST SUPPORT', 'Human-first support'],
  ['ROUTE-FIRST APPROACH', 'Route-first approach'],
  ['WHY GLOBAL PET CAB', 'Why Global Pet Cab'],
  ['REAL PET JOURNEYS', 'Real pet journeys'],
  ['FAMILY-FIRST CARE', 'Family-first care'],
  ['FULL-JOURNEY CARE', 'Full-journey care'],
  ['LOCAL CITY RIDES', 'Local city rides'],
  ['BEFORE TRAVEL DAY', 'Before travel day'],
  ['PET TAXI BOOKING', 'Pet taxi booking'],
  ['KNOWLEDGE BASE', 'Knowledge base'],
  ['EXPORT JOURNEY', 'Export journey'],
  ['IMPORT JOURNEY', 'Import journey'],
  ['ROUTE OVERVIEW', 'Route overview'],
  ['HUMAN SUPPORT', 'Human support'],
  ['DUBAI PET TAXI', 'Dubai pet taxi'],
  ['HOW WE HELP', 'How we help'],
  ['HOW IT WORKS', 'How it works'],
  ['THE JOURNEY', 'The journey'],
  ['BOOK ONLINE', 'Book online'],
  ['FROM DUBAI', 'From Dubai'],
  ['INTO DUBAI', 'Into Dubai'],
  ['UAE EXPORT', 'UAE export'],
  ['UAE IMPORT', 'UAE import'],
  ['PET TAXI', 'Pet taxi'],
  ['GALLERY', 'Gallery'],
];

// a phrase only counts when it is the whole string: between quotes (js, json, escaped json) or whole html text (any whitespace around it).
// html writes & as &amp; and ' as &#x27;, so those spellings are handled too
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const html = (x) => x.replace(/&/g, '&amp;').replace(/'/g, '&#x27;');
const QUOTED = '(?<=["\'`>])';
const RES = [];
for (const [from, to] of MAP) {
  for (const [f, t] of [[from, to], [html(from), html(to)]]) {
    RES.push([new RegExp(`${QUOTED}${esc(f)}(?=["'\`<\\\\])|(?<=>\\s+)${esc(f)}(?=\\s+<)`, 'g'), t]);
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'cache') walk(p, out); }
    else if (/\.(html|rsc|js)$/.test(e.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const f of [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks'))]) {
  let s = fs.readFileSync(f, 'utf8');
  if (!/[A-Z]{3}/.test(s)) continue;
  let n = s;
  for (const [re, to] of RES) n = n.replace(re, to);
  if (n !== s) { fs.writeFileSync(f, n); changed++; }
}

/* css: no text-transform anywhere */
const CSS_START = '/*gpc-sentence-case*/';
const CSS_END = '/*end-gpc-sentence-case*/';
const CSS = [CSS_START, 'html body :not(svg):not(path){text-transform:none!important}', CSS_END].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
console.log(`sentence case: ${changed} files rewritten, css`);
