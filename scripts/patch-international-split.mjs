import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * International pet relocation, split by direction (compiled-build patch, same approach as the other patch-*.mjs):
 *
 *   /international-pet-relocation              overview: two cards linking to the pages below (no form)
 *   /international-pet-relocation/from-dubai   export: same copy, hero with the quote form for FROM Dubai / UAE
 *   /international-pet-relocation/to-dubai     import: same copy, hero with the quote form for INTO Dubai / UAE
 *
 * 1. the shared quote-form component takes a `direction` prop (client chunk + server chunk, must match exactly)
 * 2. the two new routes are cloned from the page bundle (own module ids) and registered in the manifests
 * 3. the overview page swaps its single wizard for the two direction cards
 * CSS for the new hero lives in patch-taxi-hero-form.mjs (one stylesheet block per page family).
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app', 'international-pet-relocation');
const PAGE = path.join(APP, 'page.js');
const BASE = path.join(APP, 'page.base.js'); // pristine copy of the combined page, used to (re)build the variants
const OVERVIEW_MARK = '/*gpc-overview*/';

function must(s, from, to, label) {
  if (typeof from === 'string' ? !s.includes(from) : !from.test(s)) throw new Error('patch-international-split: pattern not found: ' + label);
  return s.replace(from, typeof to === 'function' ? to : () => to);
}

/* ---------- 1. quote form: direction prop ---------- */
function patchForm(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('direction:H_dir')) return false;
  s = must(s, 'let{title:H_t,description:H_d}=__customProps||{}', 'let{title:H_t,description:H_d,direction:H_dir}=__customProps||{}', 'form props');
  s = must(s, '(0,l.useState)("from_dubai")', '(0,l.useState)(H_dir||"from_dubai")', 'form direction');
  s = must(s, '(0,l.useState)("United Arab Emirates")', '(0,l.useState)("to_dubai"===H_dir?"India":"United Arab Emirates")', 'origin country');
  s = must(s, '(0,l.useState)("Dubai")', '(0,l.useState)("to_dubai"===H_dir?"Mumbai":"Dubai")', 'origin city');
  s = must(s, '(0,l.useState)("United Kingdom")', '(0,l.useState)("to_dubai"===H_dir?"United Arab Emirates":"United Kingdom")', 'dest country');
  s = must(s, '(0,l.useState)("London")', '(0,l.useState)("to_dubai"===H_dir?"Dubai":"London")', 'dest city');
  s = must(
    s,
    'className:"bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden"',
    'className:"bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden".concat(H_dir?" gpc-dir-fixed gpc-dir-"+H_dir:"")',
    'form root class',
  );
  fs.writeFileSync(file, s);
  return true;
}

/* stage 2: the open end of the route starts empty (typed with autocomplete), services move from step 2 to step 3 */
function patchFormStage2(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('gpcSvc')) return false;
  s = must(s, '"to_dubai"===H_dir?"India":"United Arab Emirates"', '"to_dubai"===H_dir?"":"United Arab Emirates"', 'origin country empty');
  s = must(s, '"to_dubai"===H_dir?"Mumbai":"Dubai"', '"to_dubai"===H_dir?"":"Dubai"', 'origin city empty');
  s = must(s, '"to_dubai"===H_dir?"United Arab Emirates":"United Kingdom"', '"to_dubai"===H_dir?"United Arab Emirates":"from_dubai"===H_dir?"":"United Kingdom"', 'dest country empty');
  s = must(s, '"to_dubai"===H_dir?"Dubai":"London"', '"to_dubai"===H_dir?"Dubai":"from_dubai"===H_dir?"":"London"', 'dest city empty');
  for (const [v, set, scope] of [['b', 'j', 'country'], ['f', 'g', 'city'], ['v', 'N', 'country'], ['y', 'w', 'city']]) {
    const base = `{value:${v},onChange:${set},className:"fj-input",scope:"${scope}",required:!0}`;
    s = must(s, base, base.replace(/}$/, `,placeholder:H_dir?"Start typing a ${scope}":void 0}`), 'place input ' + v);
  }
  // route must be filled before moving on / submitting
  const missing = '("from_dubai"===H_dir?!v.trim()||!y.trim():!b.trim()||!f.trim())';
  const say = '"Please add your "+("from_dubai"===H_dir?"destination":"origin")+" country and city."';
  // the client and server bundles are minified separately, so the error setter / field names differ: read them from the file
  const err = (s.match(/\{(\w+)\("Please enter your name, phone number, and email\."\);return\}/) || [])[1];
  const cond = (s.match(/if\(e\.preventDefault\(\),(![\w$]+\.trim\(\)\|\|![\w$]+\.trim\(\)\|\|![\w$]+\.trim\(\))\)\{/) || [])[1];
  if (!err || !cond) throw new Error('patch-international-split: submit handler not found');
  s = must(s, /onClick:\(\)=>t\(2\),className:"w-full bg-teal-deep hover:bg-teal-bright/, `onClick:()=>{H_dir&&${missing}?${err}(${say}):(${err}(""),t(2))},className:"w-full bg-teal-deep hover:bg-teal-bright`, 'continue button');
  s = must(s, `if(e.preventDefault(),${cond}){`, `if(e.preventDefault(),H_dir&&${missing}){${err}(${say});t(1);return}if(${cond}){`, 'submit check');
  // tab + button labels for the direction pages
  s = must(s, 'children:"2. Pet & Services"', 'children:H_dir?"2. Pet Details":"2. Pet & Services"', 'tab 2');
  s = must(s, 'children:"3. Contact Info"', 'children:H_dir?"3. Services & Contact":"3. Contact Info"', 'tab 3');
  s = must(s, 'children:"Continue to Pet Details & Services"', 'children:H_dir?"Continue to Pet Details":"Continue to Pet Details & Services"', 'step 1 button');
  s = must(s, 'children:"Proceed to Contact Info"', 'children:H_dir?"Continue to Services & Contact":"Proceed to Contact Info"', 'step 2 button');
  // services block: lift into a variable, render it in step 3 for the direction pages.
  // (the client and server bundles write jsx calls differently: "(0,s.jsxs)(" vs "s.jsxs(")
  const label = s.indexOf('"Select Services Required"');
  const open = s.lastIndexOf('("div",{className:"space-y-3",children:[', label);
  const callee = s.slice(0, open).match(/(\(0,s\.jsxs\)|s\.jsxs)$/);
  const end = s.slice(label).search(/,(?:\(0,s\.jsxs\)|s\.jsxs)\("div",\{className:"flex gap-4",children:\[/);
  if (label === -1 || open === -1 || !callee || end === -1) throw new Error('patch-international-split: services block not found');
  const a = open - callee[1].length;
  const b = label + end;
  const block = s.slice(a, b);
  s = s.slice(0, a) + 'H_dir?null:gpcSvc' + s.slice(b);
  s = must(s, /return\s*(?:\(0,s\.jsxs\)|s\.jsxs)\("div",\{id:"international-quote-form"/, (m) => `let gpcSvc=${block};${m}`, 'service var');
  s = must(s, /3===e&&(?:\(0,s\.jsxs\)|s\.jsxs)\("div",\{className:"space-y-8 animate-fade-in-up",children:\[/, (m) => m + 'H_dir?gpcSvc:null,', 'step 3 services');
  fs.writeFileSync(file, s);
  return true;
}

/* ---------- 2. variants ---------- */
const VARIANTS = [
  {
    slug: 'from-dubai',
    dir: 'from_dubai',
    ids: { chunk: 910290, entry: 915789, page: 912402 },
    title: 'Pet Export from Dubai — International Pet Relocation | Global Pet Cab',
    description: 'Moving your pet from Dubai or the UAE to another country? Tell us the route and get a relocation quote from Global Pet Cab.',
  },
  {
    slug: 'to-dubai',
    dir: 'to_dubai',
    ids: { chunk: 920290, entry: 925789, page: 922402 },
    title: 'Pet Import into Dubai — International Pet Relocation | Global Pet Cab',
    description: 'Bringing your pet into Dubai or the UAE from another country? Tell us the route and get a relocation quote from Global Pet Cab.',
  },
];

/* markup shared by the overview and both direction pages: page marker, FAQ in two columns, direction cards as links */
function prep(base) {
  let s = base;
  s = must(s, 'className:"font-body space-y-0 text-slate-800"', 'className:"font-body space-y-0 text-slate-800 gpc-intl-page"', 'page marker');
  s = must(
    s,
    'i.jsx("div",{className:"space-y-4",children:faqs.map((e,t)=>',
    'i.jsx("div",{className:"gpc-faq-grid",children:[faqs.slice(0,Math.ceil(faqs.length/2)),faqs.slice(Math.ceil(faqs.length/2))].map((col,c)=>i.jsx("div",{className:"space-y-4",children:col.map((e,t)=>',
    'faq columns',
  );
  s = must(s, /(children:e\.a\}\)\s*\]\},t\)\))\}\)/, (_m, a) => a + '},c))})', 'faq columns end');
  // the "Need help before your pet flies?" banner goes above the export/import direction section
  const bStart = s.indexOf('    // 6. BANNER');
  const bEnd = s.indexOf('    // 7. WORLDWIDE');
  const dStart = s.indexOf('    // 4. DIRECTION SECTION');
  if (bStart === -1 || bEnd === -1 || dStart === -1 || !(dStart < bStart && bStart < bEnd)) throw new Error('patch-international-split: section order changed');
  s = s.slice(0, dStart) + s.slice(bStart, bEnd) + s.slice(dStart, bStart) + s.slice(bEnd);
  const card = '(0,i.jsxs)("div",{className:"p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all",children:[';
  const link = (slug, cta) => '(0,i.jsxs)("a",{href:"/international-pet-relocation/' + slug + '","data-cta":"' + cta + '",className:"gpc-dir-card block p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all",children:[';
  s = must(s, card, link('from-dubai', 'Start your export quote'), 'direction card 1');
  s = must(s, card, link('to-dubai', 'Start your import quote'), 'direction card 2');
  return s;
}

function buildVariant(base, v) {
  let s = base;
  const R = 'international-pet-relocation';

  // module / chunk ids (the lower-level modules stay shared)
  s = must(s, 'e.id=290,e.ids=[290]', `e.id=${v.ids.chunk},e.ids=[${v.ids.chunk}]`, 'chunk id');
  s = s.replace(/\b5789\b/g, String(v.ids.entry)).replace(/\b2402\b/g, String(v.ids.page));

  // route definition + loader tree (nested one segment deeper)
  s = s.split(`"/${R}/page"`).join(`"/${R}/${v.slug}/page"`);
  s = must(s, `pathname:"/${R}"`, `pathname:"/${R}/${v.slug}"`, 'pathname');
  s = must(s, `["${R}",{children:["__PAGE__",{},`, `["${R}",{children:["${v.slug}",{children:["__PAGE__",{},`, 'tree open');
  s = must(s, /page\.tsx"\]\}\]\},\{\}\]\},\{layout:/, (m) => m.replace('{}]},{layout:', '{}]},{}]},{layout:'), 'tree close');
  s = s.split(`${R}\\\\page.tsx`).join(`${R}\\\\${v.slug}\\\\page.tsx`);

  // one folder deeper than the original page
  s = must(s, 'require("../../webpack-runtime.js")', 'require("../../../webpack-runtime.js")', 'runtime path');

  // metadata
  s = must(s, /let o=\{title:"[^"]*",description:"[^"]*"\};/, `let o={title:${JSON.stringify(v.title)},description:${JSON.stringify(v.description)}};`, 'metadata');

  // hero: copy on the left, the quote form (fixed direction) on the right
  s = must(s, 'className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28"', 'className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28 gpc-intl-hero"', 'hero class');
  s = must(
    s,
    'className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[',
    'className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gpc-intl-hero-grid",children:[(0,i.jsxs)("div",{className:"gpc-intl-hero-copy space-y-6",children:[',
    'hero container',
  );
  s = must(
    s,
    /(\*IPATA Member[^"]*"\}\))\s*\]\}\)(\s*\]\}\),\s*\/\/ 2\. QUOTE FORM SECTION)/,
    (_m, a, b) => `${a}]}),i.jsx("div",{className:"gpc-intl-hero-form",children:i.jsx(s.Z,{direction:"${v.dir}"})})]})${b}`,
    'hero end',
  );
  // the separate form section goes away (the form lives in the hero; its root keeps id="international-quote-form")
  s = must(s, /\/\/ 2\. QUOTE FORM SECTION\s*i\.jsx\("section",\{id:"international-quote-form"[\s\S]*?i\.jsx\(s\.Z,\{\}\)\}\)\s*\}\),/, '', 'form section');
  return s;
}

function writeVariant(base, v) {
  const dir = path.join(APP, v.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.js'), buildVariant(base, v));

  const mf = fs.readFileSync(path.join(APP, 'page_client-reference-manifest.js'), 'utf8');
  const R = 'international-pet-relocation';
  const out = mf
    .split(`"/${R}/page"`).join(`"/${R}/${v.slug}/page"`)
    .split(`${R}\\\\page"`).join(`${R}\\\\${v.slug}\\\\page"`);
  fs.writeFileSync(path.join(dir, 'page_client-reference-manifest.js'), out);
}

function updateJson(file, fn) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  fn(j);
  fs.writeFileSync(file, JSON.stringify(j, null, 2));
}

function register(v) {
  const R = '/international-pet-relocation';
  const route = `${R}/${v.slug}`;
  updateJson(path.join(ROOT, 'server', 'app-paths-manifest.json'), (j) => {
    j[`${route}/page`] = `app${route}/page.js`;
  });
  updateJson(path.join(ROOT, 'app-path-routes-manifest.json'), (j) => {
    j[`${route}/page`] = route;
  });
  updateJson(path.join(ROOT, 'app-build-manifest.json'), (j) => {
    j.pages[`${route}/page`] = j.pages[`${R}/page`];
  });
  updateJson(path.join(ROOT, 'routes-manifest.json'), (j) => {
    if (j.staticRoutes.some((r) => r.page === route)) return;
    const esc = route.replace(/-/g, '\\-');
    j.staticRoutes.push({ page: route, regex: `^${esc}(?:/)?$`, routeKeys: {}, namedRegex: `^${esc}(?:/)?$` });
  });
}

/* ---------- 3. overview page ---------- */
const OVERVIEW_SECTION = `i.jsx("section",{id:"international-quote-form",className:"py-16 sm:py-20 bg-slate-50 border-b border-teal-border/40",children:
      (0,i.jsxs)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",children:[
        (0,i.jsxs)("div",{className:"text-center max-w-3xl mx-auto space-y-4",children:[
          i.jsx("div",{className:"inline-flex items-center gap-1.5 bg-teal-soft text-teal-deep text-xs px-3 py-1 rounded-full font-bold border border-teal-border",children:"DUBAI ↔ WORLDWIDE RELOCATION"}),
          i.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Tell Us Where Your Pet Is Going"}),
          i.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Every pet relocation is different. Your starting point, destination, pet, travel date and travel requirements all affect the journey. Share the basics with us and our team can understand what you need before preparing your relocation quote."})
        ]}),
        (0,i.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[
          (0,i.jsxs)("a",{href:"/international-pet-relocation/from-dubai",className:"group p-8 rounded-3xl bg-white border border-teal-border shadow-sm hover:shadow-fj-card hover:border-teal-deep/40 hover:-translate-y-1 transition-all duration-300 space-y-4 block",children:[
            i.jsx("div",{className:"w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border group-hover:bg-teal-deep group-hover:text-white transition-colors",children:i.jsx(Svg,{p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",cls:"w-7 h-7"})}),
            i.jsx("h3",{className:"text-2xl font-black font-heading text-navy",children:"Moving FROM Dubai / UAE"}),
            i.jsx("p",{className:"text-sm sm:text-base text-slate-600 leading-relaxed font-body",children:"Exporting your pet to another country."}),
            (0,i.jsxs)("span",{className:"inline-flex items-center gap-2 font-extrabold font-heading text-teal-deep",children:["Start your export quote",i.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4 group-hover:translate-x-1 transition-transform"})]})
          ]}),
          (0,i.jsxs)("a",{href:"/international-pet-relocation/to-dubai",className:"group p-8 rounded-3xl bg-white border border-teal-border shadow-sm hover:shadow-fj-card hover:border-teal-deep/40 hover:-translate-y-1 transition-all duration-300 space-y-4 block",children:[
            i.jsx("div",{className:"w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border group-hover:bg-teal-deep group-hover:text-white transition-colors",children:i.jsx(Svg,{p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",cls:"w-7 h-7 rotate-90"})}),
            i.jsx("h3",{className:"text-2xl font-black font-heading text-navy",children:"Moving INTO Dubai / UAE"}),
            i.jsx("p",{className:"text-sm sm:text-base text-slate-600 leading-relaxed font-body",children:"Importing your pet into Dubai."}),
            (0,i.jsxs)("span",{className:"inline-flex items-center gap-2 font-extrabold font-heading text-teal-deep",children:["Start your import quote",i.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4 group-hover:translate-x-1 transition-transform"})]})
          ]})
        ]})
      ]})
    }),`;

function patchOverview(base) {
  return must(
    base,
    /i\.jsx\("section",\{id:"international-quote-form"[\s\S]*?i\.jsx\(s\.Z,\{\}\)\}\)\s*\}\),/,
    OVERVIEW_SECTION,
    'overview form section',
  ) + OVERVIEW_MARK;
}


const CSS_START = '/*gpc-intl*/';
const CSS_END = '/*end-gpc-intl*/';
const CSS = [
  CSS_START,
  // hero: photo overlay (the tailwind opacity classes on the page are not in the compiled stylesheet), copy left, form right
  '.gpc-intl-hero{padding-top:3.5rem!important;padding-bottom:3.5rem!important}',
  '.gpc-intl-hero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,31,51,.95) 0%,rgba(5,45,73,.86) 50%,rgba(5,45,73,.68) 100%)}',
  '.gpc-intl-hero-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:2.5rem;align-items:center}',
  '@media (min-width:1024px){.gpc-intl-hero-grid{grid-template-columns:minmax(0,1fr) minmax(0,31rem);gap:3.5rem}.gpc-intl-hero{min-height:54rem;display:flex;align-items:center}.gpc-intl-hero-grid{width:100%}}',
  '.gpc-intl-hero-copy{text-align:left}',
  '.gpc-intl-hero-copy .mx-auto{margin-left:0;margin-right:0}',
  '.gpc-intl-hero-copy .justify-center{justify-content:flex-start}',
  '.gpc-intl-hero-copy h1{font-size:clamp(1.75rem,3.4vw,2.75rem)!important;line-height:1.15!important;max-width:none}',
  '.gpc-intl-hero-copy p.text-slate-200{font-size:1.0625rem;line-height:1.65}',
  '.gpc-intl-hero-copy p.text-teal-light{font-size:1rem}',
  // quote card inside the hero
  '.gpc-intl-hero-form #international-quote-form{box-shadow:0 24px 60px -28px rgba(0,0,0,.6)}',
  '.gpc-dir-fixed>div:first-child{padding:1rem 1.5rem!important}',
  '.gpc-dir-fixed>div:first-child div[class~="p-3.5"],.gpc-dir-fixed>div:first-child p{display:none}',
  '.gpc-dir-fixed>div:first-child h2{font-size:1.375rem!important;line-height:1.25}',
  '.gpc-dir-fixed>div:first-child .space-y-1\.5>*+*{margin-top:0}',
  '.gpc-dir-fixed>div:nth-child(2){padding:1.1rem 1.5rem 1.4rem!important}',
  '.gpc-dir-fixed form.space-y-8>:not([hidden])~:not([hidden]),.gpc-dir-fixed form .space-y-8>:not([hidden])~:not([hidden]){margin-top:.85rem}',
  '.gpc-dir-fixed form>div:first-child{padding-bottom:.75rem}',
  '.gpc-dir-fixed form>div:first-child>div{gap:.4rem}',
  '.gpc-dir-fixed form>div:first-child>div>*{margin:0!important;padding:.4rem .7rem!important;font-size:.8125rem}',
  '.gpc-dir-fixed .fj-input,.gpc-dir-fixed .fj-select{height:2.5rem;line-height:2.5rem;font-size:.9375rem;font-weight:500}',
  '.gpc-dir-fixed .fj-input.max-w-md{max-width:none}',
  '.gpc-dir-fixed .fj-label{margin-bottom:.15rem}',
  '.gpc-dir-fixed .grid{gap:.7rem .75rem}',
  '.gpc-dir-fixed form button[class*="py-4"]{padding-top:.8rem;padding-bottom:.8rem}',
  // step 1: direction is fixed by the page, so only the other end of the route is asked
  '.gpc-dir-fixed .space-y-8>.space-y-3:has(>.grid>button[class*="p-5"]){display:none}',
  '.gpc-dir-from_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid>div:nth-child(-n+2),.gpc-dir-to_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid>div:nth-child(n+3){display:none}',
  '.gpc-dir-from_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid::before,.gpc-dir-to_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid::after{grid-column:1/-1;display:flex;align-items:center;gap:.5rem;padding:.6rem .9rem;border-radius:.9rem;background:#e7f6fb;border:1px solid rgba(14,115,150,.25);color:#052d49;font-weight:800;font-size:.875rem}',
  '.gpc-dir-from_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid::before{content:"From: Dubai, United Arab Emirates"}',
  '.gpc-dir-to_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid::after{content:"To: Dubai, United Arab Emirates"}',
  '.gpc-dir-to_dubai .space-y-3:has(>.grid>button[class*="p-5"])+.grid::after{order:5}',
  // step 2: pet details in two columns, services as compact chips
  '.gpc-dir-fixed [class*="md:grid-cols-4"]{grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}',
  '.gpc-dir-fixed [class*="md:grid-cols-4"][class*="bg-teal-soft"]{padding:.85rem;gap:.75rem}',
  '.gpc-dir-fixed .space-y-3>.grid{gap:.4rem .5rem}',
  '.gpc-dir-fixed button[class*="p-4"][class*="rounded-2xl"]{padding:.3rem .6rem;font-size:.72rem;line-height:1.2;border-radius:.7rem;min-height:1.95rem}',
  '.gpc-dir-fixed button[class*="p-4"][class*="rounded-2xl"] svg{width:.95rem;height:.95rem;flex-shrink:0;margin-left:.3rem}',
  '.gpc-dir-fixed textarea{min-height:0;height:3.1rem;padding-top:.55rem;padding-bottom:.55rem}',
  '.gpc-dir-fixed .space-y-3>.grid{gap:.35rem .5rem}',
  // confirmation card after submitting
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"]{padding:.25rem 0!important}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"]>*+*{margin-top:.8rem!important}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="w-16"]{width:3rem;height:3rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="w-16"] svg{width:1.75rem;height:1.75rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] h3{font-size:1.35rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] .font-mono{padding:.4rem 1rem;font-size:1.05rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="bg-teal-soft"][class*="p-6"]{padding:.8rem 1rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="space-y-3"]>*+*{margin-top:.4rem}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="sm:flex-row"]{flex-direction:column;gap:.6rem;padding-top:0}',
  '.gpc-dir-fixed [class*="py-8"][class*="text-center"] [class*="sm:flex-row"] a{padding:.7rem 1rem;font-size:.9rem;width:100%}',
  // FAQ in two columns (markup built here and by patch-taxi-faq.mjs; the taxi stylesheet block is scoped to the taxi page)
  'section:has(.gpc-faq-grid)>div{max-width:72rem}',
  '.gpc-faq-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:1rem;align-items:start}',
  '@media (min-width:1024px){.gpc-faq-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}}',
  '@keyframes gpcRise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}',
  // ---- sections below the hero (same treatment as the dubai-pet-taxi page) ----
  // main heading: two balanced lines, larger than the section headings; the tag above it is plain text (no pill background)
  '.gpc-intl-page>section:first-child .inline-flex.uppercase{background:none!important;border:0!important;padding-left:0!important;padding-right:0!important}',
  '.gpc-intl-page>section:first-child:not(.gpc-intl-hero) .inline-flex.uppercase{padding-left:0!important}',
  '.gpc-intl-page>section:first-child h1{text-wrap:balance}',
  '@media (min-width:1024px){.gpc-intl-page>section:first-child:not(.gpc-intl-hero) h1{font-size:clamp(1.9rem,3.4vw,2.9rem)!important;line-height:1.15!important;max-width:22em;margin-left:auto;margin-right:auto}}',
  // each lower section gets its own background so they stop blending: destinations (teal dots), why us (warm cream), FAQ (cool blue), closing banner (photo)
  '.gpc-intl-page>section:has(a[href*="/destinations/"]){background:radial-gradient(circle at 1px 1px,rgba(14,115,150,.16) 1.3px,transparent 1.6px) 0 0/22px 22px,linear-gradient(180deg,#eef8fb 0%,#e2f1f6 100%)!important;border-color:rgba(14,115,150,.15)}',
  '.gpc-intl-page .grid:has(>a[href*="/destinations/"]){grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:1rem;max-width:62rem}',
  '@media (max-width:640px){.gpc-intl-page .grid:has(>a[href*="/destinations/"]){grid-template-columns:repeat(1,minmax(0,1fr))!important}}',
  '.gpc-intl-page .grid:has(>a[href*="/destinations/"])>a{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:1.25rem 1.5rem!important;border-radius:1.15rem!important;background:#fff!important;border:1px solid rgba(14,115,150,.2)!important;font-size:1rem!important;text-align:left!important;box-shadow:0 14px 30px -24px rgba(5,45,73,.45);transition:transform .3s ease,background .3s ease,color .3s ease,box-shadow .3s ease}',
  '.gpc-intl-page .grid:has(>a[href*="/destinations/"])>a::after{content:"\\2192";display:flex;align-items:center;justify-content:center;flex:none;width:2rem;height:2rem;border-radius:9999px;background:#e7f6fb;color:#0e7396;font-weight:900;transition:background .3s ease,color .3s ease}',
  '.gpc-intl-page .grid:has(>a[href*="/destinations/"])>a:hover{transform:translateY(-4px);background:#0e7396!important;color:#fff!important;border-color:#0e7396!important;box-shadow:0 22px 40px -22px rgba(14,115,150,.7)}',
  '.gpc-intl-page .grid:has(>a[href*="/destinations/"])>a:hover::after{background:rgba(255,255,255,.2);color:#fff}',
  '.gpc-intl-page>section.bg-slate-50{background:radial-gradient(45% 55% at 100% 0%,rgba(14,115,150,.10),transparent 70%),radial-gradient(40% 50% at 0% 100%,rgba(234,88,12,.09),transparent 70%),linear-gradient(180deg,#fffaf2 0%,#fdf1e2 100%)!important}',
  '.gpc-intl-page>section.bg-slate-50 .grid>div{position:relative;overflow:hidden;border:1px solid rgba(180,120,60,.18)!important;border-radius:1.5rem!important;box-shadow:0 1px 2px rgba(80,50,10,.04),0 20px 40px -30px rgba(80,50,10,.35);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}',
  '.gpc-intl-page>section.bg-slate-50 .grid>div::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#0e7396,#38bdf8)}',
  '.gpc-intl-page>section.bg-slate-50 .grid>div:hover{transform:translateY(-5px);box-shadow:0 2px 4px rgba(80,50,10,.05),0 30px 50px -28px rgba(14,115,150,.45)}',
  '@media (min-width:1024px){.gpc-intl-page>section.bg-slate-50 .grid{grid-template-columns:repeat(6,minmax(0,1fr))}.gpc-intl-page>section.bg-slate-50 .grid>div{grid-column:span 2}.gpc-intl-page>section.bg-slate-50 .grid>div:nth-child(4){grid-column:2/span 2}.gpc-intl-page>section.bg-slate-50 .grid>div:nth-child(5){grid-column:4/span 2}}',
  '.gpc-intl-page>section:has(.gpc-faq-grid){background:linear-gradient(180deg,#f5f8fc 0%,#e8eef7 100%)!important;border-top:0!important}',
  '.gpc-intl-page>section.text-center.text-white{background-image:linear-gradient(90deg,rgba(3,31,51,.93) 0%,rgba(5,45,73,.84) 55%,rgba(5,45,73,.72) 100%),url("/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1552053831-71594a27632d%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75")!important;background-size:cover;background-position:center;padding-top:5rem;padding-bottom:5rem}',
  '.gpc-intl-page>section.text-center.text-white p{font-size:1.1875rem;line-height:1.65;color:rgba(255,255,255,.92);max-width:56rem}',
  '.gpc-intl-page>section.text-center.text-white>div{max-width:70rem}',
  '.gpc-intl-page>section.text-center.text-white h2{max-width:none!important;text-wrap:balance}',
  // single line on tablet and up: the text is about 23x the font size wide, so scale the size with the window
  '@media (min-width:700px){.gpc-intl-page>section.text-center.text-white h2{font-size:clamp(1.4rem,3.6vw,2.25rem)!important;white-space:nowrap}}',
  // card icons: the compiled stylesheet has group-hover:text-white but not group-hover:bg-teal-deep (white icon on a pale tile)
  '.gpc-intl-page .group:hover [class*="group-hover:bg-teal-deep"]{background-color:#0e7396;border-color:#0e7396}',
  // section headers: every other header on the page is centred, so centre these three too
  '.gpc-intl-page>section>div>div.max-w-3xl.mb-14{margin-left:auto;margin-right:auto;text-align:center;max-width:60rem}',
  // overview hero: the page has no overlay classes in the compiled stylesheet, so add one
  '.gpc-intl-page>section:first-child:not(.gpc-intl-hero)::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(3,31,51,.9) 0%,rgba(5,45,73,.82) 100%)}',
  // "Need help before your pet flies?" banner: overlay + larger copy
  '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy){padding-top:4.5rem;padding-bottom:4.5rem}',
  '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10{max-width:76rem}',
  '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10>div.max-w-2xl{max-width:75rem}',
  '.gpc-intl-page>section:not(.gpc-intl-hero) h2{font-size:2.25rem!important;line-height:1.2!important}',
  '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy)::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,31,51,.94) 0%,rgba(5,45,73,.86) 55%,rgba(5,45,73,.74) 100%)}',
    '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10 p{font-size:1.125rem;line-height:1.6;color:rgba(255,255,255,.92)}',
  '.gpc-intl-page>section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10 p+p{font-size:1rem;color:rgba(255,255,255,.82)}',
  // direction cards are links now
  // export / import direction section: equal cards with accent bar, matching tags, watermark, button-style link and a link badge between them
  'section:has(a.gpc-dir-card){background:radial-gradient(70% 90% at 50% 0%,rgba(14,115,150,.12),transparent 70%),linear-gradient(180deg,#f6fbfd 0%,#edf5f8 100%)}',
  'section:has(a.gpc-dir-card) .max-w-3xl{max-width:60rem}',
  '.grid:has(>a.gpc-dir-card){position:relative;gap:2.25rem;align-items:stretch}',
  '@media (min-width:768px){.grid:has(>a.gpc-dir-card)::before{content:"\\21C4";position:absolute;z-index:3;left:50%;top:50%;width:3.25rem;height:3.25rem;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#fff;border:2px solid #0e7396;color:#0e7396;font-size:1.4rem;font-weight:900;box-shadow:0 10px 26px -10px rgba(14,115,150,.55)}}',
  'a.gpc-dir-card{display:flex!important;flex-direction:column;position:relative;overflow:hidden;text-decoration:none;color:inherit;padding:2.25rem!important;border:1px solid rgba(14,115,150,.18)!important;border-radius:1.75rem!important;background-color:#fff;background-repeat:no-repeat;background-position:right -1.5rem bottom -1.5rem;background-size:11rem;box-shadow:0 1px 2px rgba(5,45,73,.04),0 22px 44px -28px rgba(5,45,73,.35);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease,border-color .35s ease}',
  'a.gpc-dir-card:first-child{background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%230e7396%27 stroke-width=%27.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 opacity=%27.14%27%3E%3Cpath d=%27M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z%27/%3E%3C/svg%3E")}',
  'a.gpc-dir-card:last-child{background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%230e7396%27 stroke-width=%27.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 opacity=%27.14%27%3E%3Cpath transform=%27rotate(90 12 12)%27 d=%27M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z%27/%3E%3C/svg%3E")}',
  'a.gpc-dir-card::before{content:"";position:absolute;left:0;right:0;top:0;height:5px;background:linear-gradient(90deg,#0e7396,#38bdf8)}',
  'a.gpc-dir-card:last-child::before{background:linear-gradient(90deg,#052d49,#0e7396)}',
  'a.gpc-dir-card:hover{transform:translateY(-6px);border-color:rgba(14,115,150,.5)!important;box-shadow:0 2px 4px rgba(5,45,73,.05),0 30px 56px -26px rgba(14,115,150,.5)}',
  'a.gpc-dir-card>div:first-child{align-self:flex-start;background:#e7f6fb!important;border:1px solid rgba(14,115,150,.28)!important;color:#0e7396!important;padding:.4rem .9rem!important;border-radius:9999px;font-size:.75rem;font-weight:800;letter-spacing:.06em}',
  'a.gpc-dir-card>div:first-child svg{width:1rem;height:1rem}',
  'a.gpc-dir-card h3{font-size:1.65rem;line-height:1.2;margin-top:1.25rem}',
  'a.gpc-dir-card p{font-size:1rem;line-height:1.7;color:#475569;margin-top:.75rem!important;margin-bottom:1.75rem!important}',
  'a.gpc-dir-card::after{content:attr(data-cta) "  \\2192";align-self:flex-start;margin-top:auto;padding:.75rem 1.35rem;border-radius:9999px;background:#0e7396;color:#fff;font-weight:800;font-size:.92rem;box-shadow:0 12px 24px -14px rgba(14,115,150,.9);transition:background .25s ease,transform .25s ease}',
  'a.gpc-dir-card:hover::after{background:#052d49;transform:translateX(3px)}',
  // "how it works": photo background, numbered badges, connectors, rise-in
  '.gpc-intl-page>section.py-20.bg-navy{background-color:#052d49;background-image:linear-gradient(180deg,rgba(5,45,73,.86) 0%,rgba(5,45,73,.76) 55%,rgba(3,31,51,.9) 100%),url("/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75");background-size:cover;background-position:center}',
  '.gpc-intl-page>section.py-20.bg-navy .grid>div{position:relative;background-color:rgba(8,38,62,.78);transition:transform .3s ease,border-color .3s ease}',
  '.gpc-intl-page>section.py-20.bg-navy .grid>div:hover{transform:translateY(-4px);border-color:rgba(125,211,252,.4)}',
  '.gpc-intl-page>section.py-20.bg-navy .grid>div div[class*="text-teal-bright"]{display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;border-radius:9999px;background:rgba(125,211,252,.12);border:1.5px solid rgba(125,211,252,.55);color:#7dd3fc;font-size:1.05rem;line-height:1}',
  '.gpc-intl-page>section.py-20.bg-navy .grid>div p{font-size:.9375rem;line-height:1.65;color:rgba(255,255,255,.78)}',
  '@media (min-width:1024px){.gpc-intl-page>section.py-20.bg-navy .grid>div:nth-child(3n+1)::after,.gpc-intl-page>section.py-20.bg-navy .grid>div:nth-child(3n+2)::after{content:"";position:absolute;top:3.4rem;left:calc(100% + .15rem);width:1.7rem;border-top:2px dashed rgba(125,211,252,.45)}}',
  '@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){.gpc-intl-page>section.py-20.bg-navy .grid>div{animation:gpcRise linear both;animation-timeline:view();animation-range:entry 5% entry 55%}}}',
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

/* ---------- run ---------- */
let changed = [];
for (const f of [path.join(ROOT, 'static', 'chunks'), path.join(ROOT, 'server', 'chunks')]) {
  for (const n of fs.readdirSync(f).filter((x) => x.endsWith('.js'))) {
    const fp = path.join(f, n);
    if (!fs.readFileSync(fp, 'utf8').includes('let{title:H_t,description:H_d')) continue;
    const a = patchForm(fp);
    const b = patchFormStage2(fp);
    if (a || b) changed.push(path.relative(ROOT, fp));
  }
}

let current = fs.readFileSync(PAGE, 'utf8');
if (!current.includes(OVERVIEW_MARK)) fs.writeFileSync(BASE, current); // fresh combined page: remember it
const base = prep(fs.readFileSync(BASE, 'utf8'));

for (const v of VARIANTS) {
  writeVariant(base, v);
  register(v);
  changed.push(`international-pet-relocation/${v.slug}`);
}
fs.writeFileSync(PAGE, patchOverview(base));
changed.push('international-pet-relocation (overview)');
patchCss();
changed.push('css');
console.log('patched:', changed.join(', '));
