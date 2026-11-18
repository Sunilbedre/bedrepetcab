import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page: strip of international airlines under the three service cards (inside the same section, so the
 * server render and the client render stay identical). Both the server bundle and the browser chunk are patched. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const MARK = 'gpc-airlines';
const AIRLINES = [
  'Emirates', 'Etihad Airways', 'Qatar Airways', 'flydubai', 'Air Arabia', 'Saudia', 'Oman Air', 'Gulf Air', 'Kuwait Airways',
  'Turkish Airlines', 'Lufthansa', 'KLM', 'Air France', 'British Airways', 'Virgin Atlantic', 'Swiss', 'Austrian Airlines',
  'Iberia', 'TAP Air Portugal', 'Finnair', 'SAS', 'Aer Lingus', 'ITA Airways',
  'Singapore Airlines', 'Cathay Pacific', 'Thai Airways', 'Malaysia Airlines', 'Philippine Airlines', 'Japan Airlines', 'ANA', 'Korean Air',
  'Air India', 'IndiGo', 'SriLankan Airlines', 'PIA',
  'Qantas', 'Air New Zealand',
  'American Airlines', 'Delta', 'United Airlines', 'Air Canada', 'WestJet',
  'Ethiopian Airlines', 'Kenya Airways', 'EgyptAir', 'Royal Air Maroc', 'South African Airways',
];
const wrap = { marginTop: '56px', textAlign: 'center' };
const h = { fontSize: '12px', fontWeight: 900, letterSpacing: '.16em', textTransform: 'uppercase', color: '#0e7c7b' };
const h3 = { margin: '8px 0 6px', fontSize: '26px', fontWeight: 800, color: '#0a2540', lineHeight: 1.2 };
const p = { margin: '0 auto 22px', maxWidth: '640px', color: '#475569', fontSize: '16px' };
const list = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', listStyle: 'none', padding: 0, margin: 0 };
const chip = { padding: '9px 16px', borderRadius: '999px', border: '1px solid #cfe3e3', background: '#f6f8fa', color: '#0a2540', fontSize: '14px', fontWeight: 600 };
const j = (o) => JSON.stringify(o);
const EXPR =
  `(0,s.jsxs)("div",{className:"${MARK}",style:${j(wrap)},children:[` +
  `(0,s.jsx)("p",{style:${j(h)},children:"Flying your pet worldwide"}),` +
  `(0,s.jsx)("h3",{className:"font-heading",style:${j(h3)},children:"International Airlines We Work With"}),` +
  `(0,s.jsx)("p",{style:${j(p)},children:"We coordinate your pet\u2019s journey with airlines across the Middle East, Europe, Asia, Africa, Oceania and the Americas."}),` +
  `(0,s.jsx)("ul",{style:${j(list)},children:${j(AIRLINES)}.map(e=>(0,s.jsx)("li",{style:${j(chip)},children:e},e))})]})`;

const FROM = '},e.id))})]})})})}';
const TO = '},e.id))}),' + EXPR + ']})})})}';
const targets = [path.join(ROOT, 'server', 'app', 'page.js')];
const dir = path.join(ROOT, 'static', 'chunks', 'app');
for (const f of fs.readdirSync(dir)) if (/^page-.*\.js$/.test(f)) targets.push(path.join(dir, f));

const changed = [];
for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes('gpc-pc-grid') || s.includes(MARK)) continue;
  if (!s.includes(FROM)) throw new Error('home picker end not found in ' + f);
  fs.writeFileSync(f, s.replace(FROM, () => TO));
  changed.push(path.relative(ROOT, f));
}
console.log(changed.length ? 'airlines section added: ' + changed.join(', ') : 'airlines section already present');
