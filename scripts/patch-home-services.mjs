import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page "Choose Your Pet Transport or Relocation Service" section.
 *
 * Before: four tiles (Within Dubai, Airport Transfer, UAE Intercity, International) and a button that sent people to /get-a-quote.
 * Now:    three services that match the menu — Dubai Pet Taxi, Pet Relocation from Dubai, Pet Relocation into Dubai —
 *         and the same form as the matching page right inside the section (taxi fare calculator / relocation quote form
 *         with the direction fixed).
 *
 * The section is a client component, so it is rewritten twice: the browser chunk (module 1011) and the server render
 * (module 7627 in the home bundle). The form modules are the ones those pages already ship:
 *   browser  9879 (taxi calculator, chunk 879)   3050 (relocation form, chunk 50)   + chunk 960 (place autocomplete)
 *   server   7480 (chunk 262)                    6928 (chunk 916)
 * The home route's chunk lists are extended so those chunks load with the section, and the prerendered home html/rsc
 * are removed so the page renders on request (like the international pages) with markup that matches the new section.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const SERVER_PAGE = path.join(ROOT, 'server', 'app', 'page.js');
const MANIFEST = path.join(ROOT, 'server', 'app', 'page_client-reference-manifest.js');
const CLIENT_DIR = path.join(ROOT, 'static', 'chunks', 'app');

// bump when the section markup changes: an installed older version is replaced
const VERSION = 'gpcPickerV2';

/* ---- the new section, shared by both builds ---- */
// Step 1: the service card (tag, heading, intro, the three services, Continue). Step 2: the matching form, with a way back.
function component() {
  const s = 's'; // local name of the jsx runtime module (326 on the server, 7437 in the browser: both bound to `s` below)
  const J = `(0,${s}.jsx)`;
  const JS = `(0,${s}.jsxs)`;
  const pill = 'inline-block text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border';
  return `let gpcV="${VERSION}",o=[{id:"taxi",title:"Dubai Pet Taxi",desc:"Door-to-door pet rides across Dubai: vet visits, grooming, boarding and airport transfers.",next:"Continue \\u2014 Calculate Your Fare",emoji:"\\uD83D\\uDE95"},{id:"from",title:"Pet Relocation from Dubai",desc:"Moving your pet out of Dubai or the UAE to another country.",next:"Continue \\u2014 Your Export Details",emoji:"\\u2708\\uFE0F"},{id:"to",title:"Pet Relocation into Dubai",desc:"Bringing your pet into Dubai or the UAE from another country.",next:"Continue \\u2014 Your Import Details",emoji:"\\uD83D\\uDEEC"}];function c(){let[t,a]=(0,i.useState)("taxi"),[u,d]=(0,i.useState)(1),m=o.find(e=>e.id===t);return${J}("section",{id:"dubai-taxi-calculator",className:"pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white gpc-home-picker",children:${J}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:${JS}("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch",children:[${JS}("div",{className:"relative min-h-[320px] lg:min-h-full rounded-[28px] overflow-hidden",children:[${J}(r.default,{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=80",alt:"Pet travelling comfortably in a Dubai pet taxi",fill:!0,className:"object-cover",sizes:"(max-width: 1024px) 100vw, 50vw",priority:!0}),${J}("div",{className:"absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"}),${JS}("div",{className:"absolute bottom-6 left-6 right-6 text-white",children:[${J}("div",{className:"text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light mb-1",children:"CLIMATE-CONTROLLED FLEET"}),${J}("div",{className:"text-2xl font-black font-heading",children:"Safe, comfortable pet transport across Dubai"})]})]}),1===u?${JS}("div",{className:"bg-white rounded-[28px] p-6 sm:p-8 border border-teal-border shadow-fj-card flex flex-col",children:[${JS}("div",{className:"space-y-2 mb-6",children:[${J}("span",{className:"${pill}",children:"STEP 1 OF 2"}),${J}("h2",{className:"text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy",style:{fontSize:"27px"},children:"Choose Your Pet Transport or Relocation Service"}),${J}("p",{className:"text-sm sm:text-base text-slate-600 font-body",children:"Select Dubai pet taxi, pet relocation from Dubai, or pet relocation into Dubai."})]}),${J}("div",{className:"grid grid-cols-1 gap-3 flex-grow",role:"tablist",children:o.map(e=>{let l=t===e.id,x="taxi"!==e.id;return${JS}("button",{type:"button",role:"tab","aria-selected":l,onClick:()=>a(e.id),className:\`p-4 rounded-3xl border-2 text-left transition-all flex items-center gap-4 relative \${l&&x?"border-navy bg-navy text-white shadow-fj-card":l?"border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-fj-card":"border-teal-border hover:border-slate-300 bg-white"}\`,children:[${J}("div",{className:\`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 \${l&&x?"bg-teal-bright":"bg-teal-deep text-white"}\`,children:e.emoji}),${JS}("div",{className:"flex-1 min-w-0",children:[${J}("h3",{className:\`font-black font-heading text-base \${l&&x?"text-white":"text-navy"}\`,children:e.title}),${J}("p",{className:\`text-xs font-body mt-1 leading-relaxed \${l&&x?"text-slate-300":"text-slate-600"}\`,children:e.desc})]}),l&&${J}("span",{className:\`font-extrabold text-[10px] px-2.5 py-1 rounded-full shrink-0 \${x?"bg-teal-bright text-navy":"bg-teal-deep text-white"}\`,children:"Selected"})]},e.id)})}),${JS}("button",{type:"button",onClick:()=>d(2),className:"w-full mt-6 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all",children:[m.next,${J}(n.Z,{className:"w-5 h-5"})]})]}):${JS}("div",{className:"gpc-picker-step2 flex flex-col gap-4",children:[${JS}("div",{className:"flex items-center justify-between gap-3 flex-wrap",children:[${J}("span",{className:"${pill}",children:"STEP 2 OF 2"}),${J}("button",{type:"button",onClick:()=>d(1),className:"text-sm font-extrabold font-heading text-teal-deep hover:underline",children:"\\u2190 Change service"})]}),${J}("div",{className:"gpc-picker-panel",children:"taxi"===t?${J}(f.default,{}):${J}(g.default,{direction:"from"===t?"from_dubai":"to_dubai"},t)})]})]})})})}`;
}

// browser module 1011: the page chunk keeps its imports (jsx runtime 7437, react 2265, next/image 3145, arrow icon 6858) and adds the two forms
function clientModule() {
  return `1011:function(e,t,a){"use strict";a.d(t,{default:function(){return c}});var s=a(7437),i=a(2265),r=a(3145),n=a(6858),f=a(9879),g=a(3050);${component()}}`;
}

// server module 7627: jsx runtime 326, react 7577, next/image 6226, arrow icon 4230, taxi calculator 7480, relocation form 6928
function serverModule() {
  return `7627:(e,t,a)=>{"use strict";a.d(t,{default:()=>c});var s=a(326),i=a(7577),r=a(6226),n=a(4230),f=a(7480),g=a(6928);${component()}}`;
}

/* ---- patching ---- */
function patchClient() {
  const dir = CLIENT_DIR;
  const file = fs.readdirSync(dir).filter((n) => /^page-.*\.js$/.test(n)).map((n) => path.join(dir, n)).find((f) => fs.readFileSync(f, 'utf8').includes('1011:function(e,t,a)'));
  if (!file) throw new Error('patch-home-services: home page chunk not found');
  let s = fs.readFileSync(file, 'utf8');
  let changed = false;
  // the page chunk bootstraps its entry module once these chunks are in; the section needs the form chunks as well
  const BOOT = 'e.O(0,[878,972,971,117,744],';
  if (s.includes(BOOT)) {
    s = s.replace(BOOT, 'e.O(0,[878,972,971,117,744,960,50,879],');
    changed = true;
  }
  if (!s.includes(VERSION)) {
    const start = s.indexOf('1011:function(e,t,a){');
    const tail = s.indexOf('}}},function(e){e.O(0,[', start);
    if (start === -1 || tail === -1) throw new Error('patch-home-services: browser module boundaries not found');
    // [start, tail+2) is the whole module function; the third brace closes the modules object and stays
    s = s.slice(0, start) + clientModule() + s.slice(tail + 2);
    changed = true;
  }
  if (changed) fs.writeFileSync(file, s);
  return changed;
}

function patchServer() {
  let s = fs.readFileSync(SERVER_PAGE, 'utf8');
  let changed = false;
  if (!s.includes(VERSION)) {
    const start = s.indexOf('7627:(e,t,a)=>{');
    const tail = s.indexOf('},1733:(e,t,a)=>{', start);
    if (start === -1 || tail === -1) throw new Error('patch-home-services: server module boundaries not found');
    s = s.slice(0, start) + serverModule() + s.slice(tail + 1); // keep the comma + next module
    changed = true;
  }
  // the form modules live in server chunks 262 (taxi calculator) and 916 (relocation form)
  const loader = 't.X(0,[276,342,481,38,322],()=>a(3681))';
  if (s.includes(loader)) {
    s = s.replace(loader, 't.X(0,[276,342,481,38,322,98,262,916],()=>a(3681))');
    changed = true;
  }
  if (changed) fs.writeFileSync(SERVER_PAGE, s);
  return changed;
}

function patchManifest() {
  const s = fs.readFileSync(MANIFEST, 'utf8');
  const oldList = '"chunks":["878","static/chunks/878-1570d80606d2ecfb.js","972","static/chunks/972-00e988e771933c19.js","931","static/chunks/app/page-1cf7b7243727573f.js"],"async":false},"E:\\\\Pictures\\\\petcabdubai-main\\\\petcabdubai-main\\\\src\\\\components\\\\DubaiFareCalculator.tsx"';
  if (s.includes('static/chunks/50-')) {
    // already extended
    if (!s.includes(oldList)) return false;
  }
  const marker = '"MobilityServiceSection.tsx":{"id":1011,"name":"*","chunks":[';
  const alt = 'MobilityServiceSection.tsx":{"id":1011,"name":"*","chunks":[';
  const i = s.indexOf(alt);
  if (i === -1) throw new Error('patch-home-services: manifest entry for the section not found');
  const end = s.indexOf(']', i);
  const list = s.slice(i + alt.length, end);
  if (list.includes('static/chunks/50-')) return false;
  const extra = ',"960","static/chunks/960-10288c27ff6627b2.js","50","static/chunks/50-13a8cbaeec2f91ec.js","879","static/chunks/879-1c4eb1423b71f4ad.js"';
  fs.writeFileSync(MANIFEST, s.slice(0, end) + extra + s.slice(end));
  return true;
}

// the prerendered home html/rsc describe the old section; render the page on request instead
function dropPrerender() {
  let changed = false;
  for (const f of ['index.html', 'index.rsc']) {
    const p = path.join(ROOT, 'server', 'app', f);
    if (fs.existsSync(p)) { fs.rmSync(p); changed = true; }
  }
  const pm = path.join(ROOT, 'prerender-manifest.json');
  const j = JSON.parse(fs.readFileSync(pm, 'utf8'));
  if (j.routes['/']) { delete j.routes['/']; fs.writeFileSync(pm, JSON.stringify(j)); changed = true; }
  return changed;
}

/* ---- CSS: tiles + compact taxi calculator inside the section (the relocation form brings its own .gpc-dir-fixed styles) ---- */
const CSS_START = '/*gpc-home-picker*/';
const CSS_END = '/*end-gpc-home-picker*/';
const P = '.gpc-picker-panel #dubai-taxi-calculator';
const CSS = [
  CSS_START,
  // the layout has an inline rule that adds 140px of top padding to #dubai-taxi-calculator (meant for the taxi hero overlap)
  '.gpc-picker-panel #dubai-taxi-calculator{padding-top:0!important}',
  // photo: fixed height and sticky, so the tall forms do not stretch it
  '@media (min-width:1024px){.gpc-home-picker>div>.grid>div:first-child{position:sticky;top:6.5rem;align-self:start;height:640px;min-height:0}}',
  '.gpc-picker-tabs button{min-height:100%}',
  '.gpc-picker-tabs button p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
  '.gpc-picker-panel>div{box-shadow:0 22px 50px -30px rgba(5,45,73,.35)}',
  // taxi calculator, compacted the same way as on the taxi page hero
  `${P} .p-6{padding:1.25rem 1.5rem}`,
  `${P} .space-y-6>:not([hidden])~:not([hidden]){margin-top:.85rem}`,
  `${P} h2{font-size:1.5rem;line-height:1.25}`,
  `${P} h2+p{display:none}`,
  `${P} [class*="md:grid-cols-2"]{grid-template-columns:minmax(0,1fr)}`,
  `${P} [class*="lg:grid-cols-4"]{grid-template-columns:repeat(2,minmax(0,1fr))}`,
  `${P} .gap-5{gap:.7rem .75rem}`,
  `${P} .fj-input,${P} .fj-select{height:2.5rem;line-height:2.5rem;font-size:.9375rem;font-weight:500}`,
  `${P} .fj-select{line-height:normal}`,
  `${P} .h-12{height:2.5rem;line-height:2.5rem}`,
  `${P} .h-11{height:2.5rem}`,
  `${P} button[type=submit]{height:3rem}`,
  `${P} .flex-col.gap-2{gap:.25rem}`,
  `${P} .flex-wrap[class*="min-h-"]{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;gap:.375rem;min-height:0}`,
  `${P} .flex-wrap[class*="min-h-"]>*{flex-shrink:0;white-space:nowrap}`,
  CSS_END,
].join('\n');

function patchCss() {
  const dir = path.join(ROOT, 'static', 'css');
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.css'))) {
    const fp = path.join(dir, f);
    let t = fs.readFileSync(fp, 'utf8');
    const a = t.indexOf(CSS_START);
    if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
    fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
  }
}

const done = [];
if (patchClient()) done.push('browser module');
if (patchServer()) done.push('server module + chunk list');
if (patchManifest()) done.push('manifest chunk list');
if (dropPrerender()) done.push('prerendered html/rsc removed');
patchCss();
done.push('css');
console.log('home services:', done.join(', '));
