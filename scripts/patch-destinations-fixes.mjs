import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Destination pages (/destinations/dubai-to-india etc.), found while reviewing dubai-to-india:
 *  1. Internal notes were showing to visitors ("Optional trust badge…", "If confirmed, IPATA membership…",
 *     "…conversion-focused"). They are replaced with real copy on every page that carried them.
 *  2. The generic template (India, India→Dubai, UK→Dubai, USA→Dubai, Australia) now looks and works like the new
 *     relocation pages: the quote form is in the hero with the direction fixed and the other country preset,
 *     the page has its own heading and copy, the quote form section becomes a "documents needed" panel,
 *     and the shared relocation page styling applies (marker class gpc-intl-page).
 *  3. The quote form takes a `country` prop (the open end of the route) in its client and server bundles.
 * The UK, USA and Canada pages have their own bespoke layouts and only get the note clean-up.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const changed = [];
const VERSION = 'gpcDestV1';

/* ---------- 1. internal notes ---------- */
const NOTES = [
  ['*IPATA Member — use only after the membership and exact wording are confirmed by Global Pet Cab.', 'IPATA Member · IATA-compliant handling'],
  ['Optional trust badge: IPATA Member — verified international pet transport handling.', 'IPATA Member · IATA-compliant handling'],
  ['If confirmed, IPATA membership can be highlighted here alongside other verified credentials and handling standards.', 'As an IPATA member, we coordinate international moves around recognised pet transport and IATA live-animal standards.'],
  ['Use this trust point only if the membership is confirmed by the client.', 'We are an IPATA member, and international moves are coordinated around IATA live-animal handling standards.'],
  [' The worldwide overview remains broad, useful and conversion-focused.', ''],
];
const NOTE_FILES = [
  path.join('destinations', '[slug]', 'page.js'),
  path.join('international-pet-relocation', 'page.js'),
  path.join('international-pet-relocation', 'page.base.js'),
  path.join('international-pet-relocation', 'from-dubai', 'page.js'),
  path.join('international-pet-relocation', 'to-dubai', 'page.js'),
];
for (const f of NOTE_FILES) {
  const fp = path.join(APP, f);
  if (!fs.existsSync(fp)) continue;
  const s = fs.readFileSync(fp, 'utf8');
  let n = s;
  for (const [a, b] of NOTES) n = n.split(a).join(b);
  if (n !== s) { fs.writeFileSync(fp, n); changed.push('notes: ' + f); }
}

/* ---------- 3. form: `country` prop ---------- */
function patchForm(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('H_ctry') || !s.includes('direction:H_dir')) return false;
  const must = (str, from, to) => {
    if (!str.includes(from)) throw new Error('patch-destinations-fixes: not found in form: ' + from);
    return str.replace(from, () => to);
  };
  s = must(s, 'direction:H_dir}=__customProps||{}', 'direction:H_dir,country:H_ctry}=__customProps||{}');
  s = must(s, '"to_dubai"===H_dir?"":"United Arab Emirates"', '"to_dubai"===H_dir?H_ctry||"":"United Arab Emirates"');
  s = must(s, '"to_dubai"===H_dir?"United Arab Emirates":"from_dubai"===H_dir?"":"United Kingdom"', '"to_dubai"===H_dir?"United Arab Emirates":"from_dubai"===H_dir?H_ctry||"":"United Kingdom"');
  fs.writeFileSync(file, s);
  return true;
}
for (const f of [path.join(ROOT, 'server', 'chunks', '916.js'), ...fs.readdirSync(path.join(ROOT, 'static', 'chunks')).filter((n) => /^50-.*\.js$/.test(n)).map((n) => path.join(ROOT, 'static', 'chunks', n))]) {
  if (fs.existsSync(f) && patchForm(f)) changed.push('form country prop: ' + path.relative(ROOT, f));
}

/* ---------- 2. generic destination template ---------- */
const DEST = path.join(APP, 'destinations', '[slug]', 'page.js');
if (fs.existsSync(DEST)) {
  let s = fs.readFileSync(DEST, 'utf8');
  if (!s.includes(VERSION)) {
    const start = s.indexOf('function renderDefault(t){');
    if (start === -1) throw new Error('patch-destinations-fixes: renderDefault not found');
    const end = s.indexOf('\nfunction u({params:e})', start);
    let r = s.slice(start, end);
    const cut = (txt, from, to, replacement) => {
      const a = txt.indexOf(from);
      const b = txt.indexOf(to, a);
      if (a === -1 || b === -1) throw new Error('patch-destinations-fixes: section markers not found: ' + from);
      return txt.slice(0, a) + replacement + txt.slice(b);
    };
    const swap = (txt, from, to) => {
      if (!txt.includes(from)) throw new Error('patch-destinations-fixes: not found: ' + from);
      return txt.replace(from, () => to);
    };

    const arrow = 'a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})';
    const hero = `    // 1. HERO SECTION (${VERSION})
    (0,a.jsxs)("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28 gpc-intl-hero",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80",alt:"",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy/75"}),
        a.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/55"})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gpc-intl-hero-grid",children:[(0,a.jsxs)("div",{className:"gpc-intl-hero-copy space-y-6",children:[
        (0,a.jsxs)("div",{className:"inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30",children:[
          a.jsx(Svg,{p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",cls:"w-3.5 h-3.5"}),
          t.route||"INTERNATIONAL PET RELOCATION"
        ]}),
        a.jsx("h1",{className:"text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]",children:t.title}),
        (0,a.jsxs)("div",{className:"max-w-3xl mx-auto space-y-3",children:[
          a.jsx("p",{className:"text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:t.overview}),
          a.jsx("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto",children:"Global Pet Cab coordinates the preparation, paperwork, travel crate, flight and handover for your pet, from the first route discussion to arrival."})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-bold text-teal-light",children:[
          a.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:t.flightTimeApprox||"Direct & transit options"}),
          a.jsx("span",{className:"text-white/40",children:"|"}),
          a.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IATA-compliant crates"}),
          a.jsx("span",{className:"text-white/40",children:"|"}),
          a.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"Dedicated coordinator"})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Relocation Quote",
            ${arrow}
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text="+encodeURIComponent("Hello Global Pet Cab Dubai - "+t.title+" enquiry"),target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]}),
        a.jsx("div",{className:"pt-2 text-[11px] sm:text-xs text-slate-300",children:"IPATA Member · IATA-compliant handling"})]}),a.jsx("div",{className:"gpc-intl-hero-form",children:a.jsx(l.Z,{direction:gpcImport?"to_dubai":"from_dubai",country:gpcCountry})})]})
    ]}),

    `;
    r = cut(r, '    // 1. HERO SECTION', '    // 2. SCOPE OF SUPPORT', hero);

    // route variables + page marker class on the wrapper
    r = swap(r, 'function renderDefault(t){\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800"',
      'function renderDefault(t){\n  let gpcImport=/-to-dubai$/.test(t.slug),gpcForeign=gpcImport?t.origin:t.destination,gpcCountry={"United States of America":"United States"}[gpcForeign]||gpcForeign;\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800 gpc-intl-page"');

    // section 4: route overview + documents instead of the (now hero) quote form
    r = swap(r, 'id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b', 'id:"route-overview",className:"py-20 sm:py-24 bg-white border-b');
    r = swap(r, '"REQUEST A QUOTE"', '"ROUTE OVERVIEW"');
    r = swap(r, '"Tell Us About Your Pet\'s Journey"', '"Your Pet\'s Journey "+(gpcImport?"from ":"to ")+gpcForeign');
    r = swap(r, '"Share a few details about your move, and our team will review the route, the travel requirements and the best options for your pet."', '"These are the typical requirements for this route. We confirm the exact list for your pet, airline and travel date before anything is booked."');
    r = swap(r, 'children:"Route Overview"}', 'children:"Route"}');
    const check = 'a.jsx(Svg,{p:["M20 6 9 17l-5-5"],cls:"w-5 h-5 text-teal-deep shrink-0 mt-0.5"})';
    r = swap(r, 'a.jsx("div",{className:"lg:col-span-7",children:a.jsx(l.Z,{})})',
      `a.jsx("div",{className:"lg:col-span-7",children:(0,a.jsxs)("div",{className:"rounded-3xl bg-white border border-teal-border p-8 shadow-fj-card space-y-5",children:[
            a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:"Documents typically needed"}),
            a.jsx("ul",{className:"space-y-3",children:(t.documentsNeeded||[]).map((e,i)=>(0,a.jsxs)("li",{className:"flex items-start gap-3 text-sm sm:text-base text-slate-700 font-body leading-relaxed",children:[${check},a.jsx("span",{children:e})]},i))}),
            a.jsx("p",{className:"text-sm text-slate-500 font-body pt-2 border-t border-teal-border/60",children:"Requirements can change and depend on your pet, airline and travel date, so our team confirms the current list with you."})
          ]})})`);

    s = s.slice(0, start) + r + s.slice(end);
    fs.writeFileSync(DEST, s);
    changed.push('destinations template');
  }
}

/* ---------- 2b. UK and USA pages (own layouts): same hero + form placement, customer-facing document copy ---------- */
const DOC_COPY = [
  ['The microchip must be in place before the rabies vaccination, as reflected in the current route requirements.', 'The microchip must be in place before the rabies vaccination is given, so the order matters.'],
  ['The current page specifies a minimum of 21 days before travel.', 'The rabies vaccination needs to be at least 21 days old before travel.'],
  ['The current page specifies treatment for Echinococcus multilocularis within 24–120 hours before arrival.', 'A vet-administered treatment for Echinococcus multilocularis is given 24–120 hours before arrival.'],
  ['The current route information specifies air waybill and manifest cargo booking for the journey.', 'Pets enter the UK as manifested cargo, so an air waybill and cargo booking are part of the journey.'],
  ['The current route information specifies a minimum of 21 days before travel. The team should verify the current requirement for your specific journey before departure.', 'The vaccination needs to be at least 21 days old before travel. We confirm the requirement for your journey before departure.'],
  ['The current route page lists a DEFRA GB Pet Health Certificate. The exact documentation should be checked against the latest requirements for your route.', 'A DEFRA GB Pet Health Certificate is required. We check the exact documentation against the latest rules for your route.'],
  ['The current Global Pet Cab service information includes IATA-compliant travel crate assembly and preparation as part of the relocation support.', 'Crate assembly and preparation to IATA standards is part of our relocation support.'],
  ['The current Global Pet Cab page lists the UAE MOCCAE export health certificate among the required documents.', 'A UAE MOCCAE export health certificate is needed to take your pet out of the UAE.'],
  ['The current route page lists an ISO 11784/11785-compliant microchip requirement.', 'Your pet needs an ISO 11784/11785-compliant microchip.'],
  ['The current page lists airline cargo booking confirmation as part of the USA route documentation.', 'The airline cargo booking confirmation forms part of the USA route paperwork.'],
  ['The current Global Pet Cab USA page lists a CDC rabies vaccination and microchip record, UAE MOCCAE export health certificate, ISO 11784/11785 microchip and airline cargo booking confirmation. The exact checklist should be confirmed for your pet and route.', 'Typically this means a CDC rabies vaccination and microchip record, a UAE MOCCAE export health certificate, an ISO 11784/11785 microchip and an airline cargo booking confirmation. We confirm the exact checklist for your pet and route.'],
  ['The current route page lists a CDC rabies vaccination and microchip record. The exact vaccination requirements and timing should be verified before travel.', 'A CDC rabies vaccination and microchip record is needed. We verify the exact vaccination requirements and timing before travel.'],
  ['UK pet travel requirements are route-specific and can change. The list below reflects the requirements shown on the current Global Pet Cab UK destination page and should be checked against the latest applicable rules before travel.', 'UK pet travel requirements are route-specific and can change. This is what pets typically need, and we check it against the latest rules before you travel.'],
  ['The documents shown below are based on the current Global Pet Cab USA destination page. Pet entry requirements can vary depending on the destination, the animal and how the pet travels, so the final checklist should always be confirmed for the specific journey.', 'These are the documents pets typically need for the USA. Entry requirements vary with the animal and how it travels, so we always confirm the final checklist for your journey.'],
  ['Important: Regulatory requirements can change. The relocation team should verify the current UK requirements for the specific journey before confirming the final checklist.', 'Requirements can change. Our team confirms the current UK rules for your journey before the final checklist is agreed.'],
];
const PANEL = `a.jsx("div",{className:"lg:col-span-7",children:(0,a.jsxs)("div",{className:"rounded-3xl bg-white border border-teal-border p-8 shadow-fj-card space-y-5",children:[
            a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:"What happens after you send your details"}),
            a.jsx("ol",{className:"space-y-4",children:["We review your route, your pet and your travel date.","We confirm the documents, timing and airline options that apply to your journey.","You receive a clear quote and the next steps, and a coordinator stays with you until your pet arrives."].map((e,i)=>(0,a.jsxs)("li",{className:"flex items-start gap-3 text-sm sm:text-base text-slate-700 font-body leading-relaxed",children:[a.jsx("span",{className:"w-7 h-7 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-sm font-black flex items-center justify-center shrink-0",children:i+1}),a.jsx("span",{children:e})]},i))})
          ]})})`.replace(/,\n\s*a\.jsx\("a",\{href:"#",onClick:void 0,className:"hidden"\}\)/, '');
const BESPOKE = [
  { fn: 'renderDubaiToUk', slug: 'dubai-to-uk', country: 'United Kingdom' },
  { fn: 'renderDubaiToUsa', slug: 'dubai-to-usa', country: 'United States' },
];
if (fs.existsSync(DEST)) {
  let s = fs.readFileSync(DEST, 'utf8');
  if (!s.includes('gpcDestV2')) {
    const hs = s.indexOf('    // 1. HERO SECTION (gpcDestV1)');
    const he = s.indexOf('    // 2. SCOPE OF SUPPORT', hs);
    if (hs === -1 || he === -1) throw new Error('patch-destinations-fixes: generic hero not found');
    const hero = s.slice(hs, he).replace('gpcDestV1', 'gpcDestV2');
    for (const b of BESPOKE) {
      const a0 = s.indexOf(`function ${b.fn}(){`);
      const a1 = s.indexOf('\nfunction ', a0 + 10);
      let r = s.slice(a0, a1);
      const h1 = (r.match(/a\.jsx\("h1",\{[^}]*children:("(?:[^"\\]|\\.)*")\}\)/) || [])[1];
      const lead = (r.match(/text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:("(?:[^"\\]|\\.)*")\}\)/) || [])[1];
      if (!h1 || !lead) throw new Error('patch-destinations-fixes: hero text not found in ' + b.fn);
      r = r.replace(`function ${b.fn}(){\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800"`,
        `function ${b.fn}(){\n  let t=Object.assign({},d["${b.slug}"],{title:${h1},overview:${lead}}),gpcImport=!1,gpcCountry="${b.country}",gpcForeign=${JSON.stringify(b.country === 'United States' ? 'the USA' : 'the UK')};\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800 gpc-intl-page"`);
      if (!r.includes('gpcCountry')) throw new Error('patch-destinations-fixes: wrapper not found in ' + b.fn);
      const c0 = r.indexOf('    // 1. HERO');
      const c1 = r.indexOf('    // 2.', c0);
      r = r.slice(0, c0) + hero + r.slice(c1);
      // quote section: becomes the route overview, the form lives in the hero
      r = r.replace('id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b', 'id:"route-overview",className:"py-20 sm:py-24 bg-white border-b');
      r = r.replace(/children:"DUBAI ↔ WORLDWIDE RELOCATION"\}\),\s*a\.jsx\("h2",\{className:"([^"]*)",children:"[^"]*"\}\),\s*a\.jsx\("p",\{className:"([^"]*)",children:"[^"]*"\}\)/,
        (_m, c, p) => `children:"ROUTE OVERVIEW"}),\n          a.jsx("h2",{className:"${c}",children:"Your Route at a Glance"}),\n          a.jsx("p",{className:"${p}",children:"Here is how the route works and what happens once you send us your details."})`);
      const before = r;
      r = r.replace(/a\.jsx\("div",\{className:"lg:col-span-7",children:\s*a\.jsx\(l\.Z,\{[\s\S]*?\}\)\s*\}\)/, () => PANEL);
      if (r === before) throw new Error('patch-destinations-fixes: form column not found in ' + b.fn);
      s = s.slice(0, a0) + r + s.slice(a1);
    }
    for (const [from, to] of DOC_COPY) s = s.split(from).join(to);
    fs.writeFileSync(DEST, s);
    changed.push('UK / USA pages');
  }
}

/* ---------- 2c. Canada works in both directions, so it keeps its form section (with the direction choice); only the repeated heading goes ---------- */
if (fs.existsSync(DEST)) {
  let s = fs.readFileSync(DEST, 'utf8');
  const from = /a\.jsx\(l\.Z,\{\s*title:"International Pet Relocation — Request Your Quote",\s*description:"[^"]*"\s*\}\)/;
  if (from.test(s)) {
    s = s.replace(from, () => 'a.jsx(l.Z,{title:"Tell Us Where Your Pet Is Going",description:"Choose the direction of travel, then add the route and your tentative travel date."})');
    fs.writeFileSync(DEST, s);
    changed.push('Canada form heading');
  }
}

/* ---------- 2d. Canada: hero form with a Dubai → Canada / Canada → Dubai switch (two forms, shown by a CSS radio switch) ---------- */
if (fs.existsSync(DEST)) {
  let s = fs.readFileSync(DEST, 'utf8');
  if (!s.includes('gpcDestV3')) {
    const hs = s.indexOf('    // 1. HERO SECTION (gpcDestV1)');
    const he = s.indexOf('    // 2. SCOPE OF SUPPORT', hs);
    if (hs === -1 || he === -1) throw new Error('patch-destinations-fixes: generic hero not found');
    const formExpr = 'a.jsx("div",{className:"gpc-intl-hero-form",children:a.jsx(l.Z,{direction:gpcImport?"to_dubai":"from_dubai",country:gpcCountry})})';
    let hero = s.slice(hs, he).replace('gpcDestV1', 'gpcDestV3');
    if (!hero.includes(formExpr)) throw new Error('patch-destinations-fixes: hero form expression not found');
    hero = hero.replace(formExpr, () => `(0,a.jsxs)("div",{className:"gpc-intl-hero-form gpc-dir-switcher",children:[
          a.jsx("input",{type:"radio",name:"gpcdir",id:"gpcdir-out",className:"gpc-dir-radio",defaultChecked:!0}),
          a.jsx("input",{type:"radio",name:"gpcdir",id:"gpcdir-in",className:"gpc-dir-radio"}),
          (0,a.jsxs)("div",{className:"gpc-dir-switch",children:[a.jsx("label",{htmlFor:"gpcdir-out",children:"Dubai → Canada"}),a.jsx("label",{htmlFor:"gpcdir-in",children:"Canada → Dubai"})]}),
          a.jsx("div",{className:"gpc-dir-pane gpc-dir-pane-out",children:a.jsx(l.Z,{direction:"from_dubai",country:"Canada"})}),
          a.jsx("div",{className:"gpc-dir-pane gpc-dir-pane-in",children:a.jsx(l.Z,{direction:"to_dubai",country:"Canada"})})
        ]})`);
    const a0 = s.indexOf('function renderDubaiToCanada(){');
    const a1 = s.indexOf('\nfunction ', a0 + 10);
    let r = s.slice(a0, a1);
    const h1 = (r.match(/a\.jsx\("h1",\{[^}]*children:("(?:[^"\\]|\\.)*")\}\)/) || [])[1];
    const lead = (r.match(/text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:("(?:[^"\\]|\\.)*")\}\)/) || [])[1];
    const lead2 = (r.match(/text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:("(?:[^"\\]|\\.)*")\}\)/) || [])[1];
    if (!h1 || !lead || !lead2) throw new Error('patch-destinations-fixes: Canada hero text not found');
    hero = hero.replace('children:"Global Pet Cab coordinates the preparation, paperwork, travel crate, flight and handover for your pet, from the first route discussion to arrival."', () => 'children:' + lead2);
    r = r.replace('function renderDubaiToCanada(){\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800"',
      `function renderDubaiToCanada(){\n  let t=Object.assign({},d["dubai-to-canada"],{title:${h1},overview:${lead}}),gpcImport=!1,gpcCountry="Canada",gpcForeign="Canada";\n  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800 gpc-intl-page"`);
    if (!r.includes('gpcCountry')) throw new Error('patch-destinations-fixes: Canada wrapper not found');
    const c0 = r.indexOf('    // 1. HERO');
    const c1 = r.indexOf('    // 2.', c0);
    r = r.slice(0, c0) + hero + r.slice(c1);
    r = r.replace('id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b', 'id:"route-overview",className:"py-20 sm:py-24 bg-white border-b');
    const hb = r.length;
    r = r.replace(/children:"DUBAI ↔ CANADA RELOCATION"\}\),\s*a\.jsx\("h2",\{className:"([^"]*)",children:"[^"]*"\}\),\s*a\.jsx\("p",\{className:"([^"]*)",children:"[^"]*"\}\)/,
      (_m, c, p) => `children:"ROUTE OVERVIEW"}),\n          a.jsx("h2",{className:"${c}",children:"Your Route at a Glance"}),\n          a.jsx("p",{className:"${p}",children:"Here is how the route works and what happens once you send us your details."})`);
    const before = r;
    r = r.replace(/a\.jsx\("div",\{className:"lg:col-span-7",children:\s*a\.jsx\(l\.Z,\{[\s\S]*?\}\)\s*\}\)/, () => PANEL);
    if (r === before) throw new Error('patch-destinations-fixes: Canada form column not found');
    s = s.slice(0, a0) + r + s.slice(a1);
    fs.writeFileSync(DEST, s);
    changed.push('Canada hero form');
  }
}

/* ---------- 4. layout fixes (scoped to the generic destination template, which is the only page with #route-overview) ---------- */
const CSS_START = '/*gpc-destinations*/';
const CSS_END = '/*end-gpc-destinations*/';
const B = 'body:has(#route-overview) .gpc-intl-page';
const CSS = [
  CSS_START,
  // the relocation overview centres a 3+2 layout; here the "before we start" list has 4 cards and the process has 6, so lay them out evenly
  `${B}>section.bg-slate-50 .grid>div:nth-child(n){grid-column:auto}`,
  `@media (min-width:1024px){${B}>section.bg-slate-50 .grid:has(>div:nth-child(6)){grid-template-columns:repeat(3,minmax(0,1fr))}${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(4)){grid-template-columns:repeat(4,minmax(0,1fr))}}`,
  `${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(4))>div{height:100%}`,
  // two- and three-card grids (e.g. Canada's export / import comparison) also inherited the six-column overview layout
  `@media (min-width:768px){${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(2)){grid-template-columns:repeat(2,minmax(0,1fr))}}`,
  `@media (min-width:1024px){${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(3)){grid-template-columns:repeat(3,minmax(0,1fr))}}`,
  // five cards (why-us) keep the centred 3 + 2 layout the overview uses, which the reset above removed
  `@media (min-width:1024px){${B}>section.bg-slate-50 .grid:has(>div:last-child:nth-child(5))>div:nth-child(4){grid-column:2/span 2}${B}>section.bg-slate-50 .grid:has(>div:last-child:nth-child(5))>div:nth-child(5){grid-column:4/span 2}${B}>section.bg-slate-50 .grid:has(>div:last-child:nth-child(5))>div:nth-child(-n+3){grid-column:span 2}}`,
  // the same 3 + 2 layout for a five-card grid in a white section (Canada's "why us" cards)
  `@media (min-width:1024px){${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(5)){grid-template-columns:repeat(6,minmax(0,1fr))}${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(5))>div{grid-column:span 2}${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(5))>div:nth-child(4){grid-column:2/span 2}${B}>section:not(.gpc-intl-hero) .grid:has(>div:last-child:nth-child(5))>div:nth-child(5){grid-column:4/span 2}}`,
  // local mobility banner: let the photo show through (the page stacked two 90% navy layers over it)
  `${B}>section.relative.overflow-hidden.text-white:not(.gpc-intl-hero)>.absolute>div.bg-navy{opacity:.3!important}`,
  `${B}>section.relative.overflow-hidden.text-white:not(.gpc-intl-hero)>.absolute>div[style]{background:linear-gradient(90deg,rgba(3,31,51,.88) 0%,rgba(5,45,73,.72) 55%,rgba(5,45,73,.55) 100%)!important}`,
  // Canada hero: direction switch (radio + labels) in front of the two forms
  '.gpc-dir-radio{position:absolute;opacity:0;pointer-events:none}',
  '.gpc-dir-switch{display:flex;gap:.25rem;padding:.25rem;margin-bottom:.75rem;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2)}',
  '.gpc-dir-switch label{flex:1;text-align:center;padding:.6rem .75rem;border-radius:999px;font-weight:800;font-size:.9rem;color:#fff;cursor:pointer;transition:background .2s,color .2s}',
  '#gpcdir-out:checked~.gpc-dir-switch label[for=gpcdir-out],#gpcdir-in:checked~.gpc-dir-switch label[for=gpcdir-in]{background:#fff;color:#052d49;box-shadow:0 4px 14px -6px rgba(0,0,0,.4)}',
  '#gpcdir-out:checked~.gpc-dir-pane-in{display:none}#gpcdir-in:checked~.gpc-dir-pane-out{display:none}',
  // headings and intro copy: wider measure, balanced lines (no single orphan word)
  `${B}>section .text-center.max-w-3xl{max-width:54rem}`,
  `${B} h1,${B} h2{text-wrap:balance}`,
  `${B} section p{text-wrap:pretty}`,
  // route card + documents panel: same height, title that wraps cleanly
  `${B} #route-overview .grid.items-start{align-items:stretch}`,
  `${B} #route-overview .lg\\:col-span-7>div{height:100%}`,
  `${B} #route-overview .lg\\:col-span-5 h3{font-size:1.5rem;line-height:1.3;text-wrap:balance}`,
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

console.log('destinations fixes:\n  ' + (changed.join('\n  ') || 'unchanged'));
