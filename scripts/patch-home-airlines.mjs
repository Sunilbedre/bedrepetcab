import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page: scrolling strip of international airline logos under the three service cards (inside the same section,
 * so server render and client render match). Logos live in public/airlines/*.png. Patches the server bundle and
 * the browser chunk. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const MARK = 'gpc-airlines-v2';
const LOGOS = [
  ['emirates', 'Emirates'], ['etihad', 'Etihad Airways'], ['qatar', 'Qatar Airways'], ['flydubai', 'flydubai'], ['air-arabia', 'Air Arabia'],
  ['saudia', 'Saudia'], ['oman-air', 'Oman Air'], ['gulf-air', 'Gulf Air'], ['kuwait', 'Kuwait Airways'], ['turkish', 'Turkish Airlines'],
  ['lufthansa', 'Lufthansa'], ['klm', 'KLM'], ['air-france', 'Air France'], ['british', 'British Airways'], ['virgin', 'Virgin Atlantic'],
  ['swiss', 'Swiss'], ['austrian', 'Austrian Airlines'], ['iberia', 'Iberia'], ['tap', 'TAP Air Portugal'], ['finnair', 'Finnair'],
  ['sas', 'SAS'], ['aer-lingus', 'Aer Lingus'], ['ita', 'ITA Airways'], ['singapore', 'Singapore Airlines'], ['cathay', 'Cathay Pacific'],
  ['thai', 'Thai Airways'], ['philippine', 'Philippine Airlines'], ['jal', 'Japan Airlines'], ['ana', 'ANA'], ['korean', 'Korean Air'],
  ['air-india', 'Air India'], ['indigo', 'IndiGo'], ['pia', 'PIA'], ['qantas', 'Qantas'], ['air-new-zealand', 'Air New Zealand'],
  ['delta', 'Delta Air Lines'], ['air-canada', 'Air Canada'], ['westjet', 'WestJet'], ['ethiopian', 'Ethiopian Airlines'],
  ['kenya', 'Kenya Airways'], ['egyptair', 'EgyptAir'], ['royal-air-maroc', 'Royal Air Maroc'], ['south-african', 'South African Airways'],
].filter(([slug]) => fs.existsSync(path.join(ROOT, '..', 'public', 'airlines', slug + '.png')));

const css =
  '@keyframes gpcAirScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
  '.gpc-airlines-v2 .gpc-air-view{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}' +
  '.gpc-airlines-v2 .gpc-air-track{display:flex;align-items:center;width:max-content;animation:gpcAirScroll 70s linear infinite}' +
  '.gpc-airlines-v2 .gpc-air-view:hover .gpc-air-track{animation-play-state:paused}' +
  '.gpc-airlines-v2 .gpc-air-logo{height:44px;width:130px;margin:0 22px;object-fit:contain;flex:none}' +
  '@media (prefers-reduced-motion:reduce){.gpc-airlines-v2 .gpc-air-track{animation:none}.gpc-airlines-v2 .gpc-air-view{overflow-x:auto}}';
const j = JSON.stringify;
const wrap = { marginTop: '56px', textAlign: 'center' };
const h = { fontSize: '12px', fontWeight: 900, letterSpacing: '.16em', textTransform: 'uppercase', color: '#0e7c7b' };
const h3 = { margin: '8px 0 6px', fontSize: '26px', fontWeight: 800, color: '#0a2540', lineHeight: 1.2 };
const p = { margin: '0 auto 26px', maxWidth: '640px', color: '#475569', fontSize: '16px' };
const img = (copy) => `.map(([a,b])=>(0,s.jsx)("img",{className:"gpc-air-logo",src:"/airlines/"+a+".png",alt:${copy ? '""' : 'b'},${copy ? '"aria-hidden":"true",' : ''}width:"130",height:"44",loading:"lazy",decoding:"async"},${copy ? '"c"+a' : 'a'}))`;
const EXPR =
  `(0,s.jsxs)("div",{className:"${MARK}",style:${j(wrap)},children:[` +
  `(0,s.jsx)("style",{children:${j(css)}}),` +
  `(0,s.jsx)("p",{style:${j(h)},children:"Flying your pet worldwide"}),` +
  `(0,s.jsx)("h3",{className:"font-heading",style:${j(h3)},children:"International Airlines We Work With"}),` +
  `(0,s.jsx)("p",{style:${j(p)},children:"We coordinate your pet\u2019s journey with airlines across the Middle East, Europe, Asia, Africa, Oceania and the Americas."}),` +
  `(0,s.jsx)("div",{className:"gpc-air-view",children:(0,s.jsxs)("div",{className:"gpc-air-track",children:[${j(LOGOS)}${img(false)},${j(LOGOS)}${img(true)}]})})]})`;

const FROM = '},e.id))})]})})})}';
const TO = '},e.id))}),' + EXPR + ']})})})}';
const targets = [path.join(ROOT, 'server', 'app', 'page.js')];
const dir = path.join(ROOT, 'static', 'chunks', 'app');
for (const f of fs.readdirSync(dir)) if (/^page-.*\.js$/.test(f)) targets.push(path.join(dir, f));

const changed = [];
for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  if (!s.includes('gpc-pc-grid') || s.includes(MARK)) continue;
  if (s.includes('"gpc-airlines"')) throw new Error('old airlines chips found in ' + f + ' - restore the file from git first');
  if (!s.includes(FROM)) throw new Error('home picker end not found in ' + f);
  fs.writeFileSync(f, s.replace(FROM, () => TO));
  changed.push(path.relative(ROOT, f));
}
console.log(changed.length ? 'airline logo strip added: ' + changed.join(', ') : 'airline logo strip already present');
