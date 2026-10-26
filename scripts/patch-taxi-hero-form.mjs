import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const cssDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'static', 'css');

const START = '/*gpc-taxi-hero-form*/';
const END = '/*end-gpc-taxi-hero-form*/';

// Everything in RAW is for the taxi page only. The home and contact pages also contain #dubai-taxi-calculator,
// so every rule gets prefixed with a marker that exists on the taxi page alone (its hero heading).
const SCOPE = 'body:has(h1.pet-taxi-hero-h1) ';

function scopeCss(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let out = '';
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open === -1) break;
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const head = css.slice(i, open).trim();
    const body = css.slice(open + 1, j - 1);
    if (head.startsWith('@keyframes')) out += `${head}{${body}}\n`;
    else if (head.startsWith('@')) out += `${head}{${scopeCss(body)}}\n`;
    else out += `${head.split(/,(?![^(\[]*[)\]])/).map((x) => SCOPE + x.trim()).join(',')}{${body}}\n`;
    i = j;
  }
  return out;
}

// Desktop only: lift the fare calculator section into the right half of the hero.
// Below 1024px the existing stacked layout is untouched.
const RAW = `
@media (min-width:1024px){
div.font-body:has(#dubai-taxi-calculator){position:relative}
div.font-body:has(#dubai-taxi-calculator)>section:first-child{min-height:700px;display:flex;align-items:center;padding-top:0;padding-bottom:0}
div.font-body:has(#dubai-taxi-calculator)>section:first-child>div.relative{width:100%}
div.font-body:has(#dubai-taxi-calculator)>section:first-child .max-w-3xl{max-width:calc(100% - min(540px,46vw) - 2rem)}
div.font-body:has(#dubai-taxi-calculator)>section:first-child h1.pet-taxi-hero-h1{font-size:clamp(1.6rem,2.7vw,2.4rem)!important;line-height:1.2!important}
section:has(>#dubai-taxi-calculator){position:absolute;z-index:30;top:3rem;right:max(1.5rem,calc((100vw - 80rem)/2 + 2rem));width:min(540px,46vw);margin:0;padding:0;max-width:none}
/* once a fare result is shown, the card drops into normal flow and pushes the page down (no inner scroll) */
section:has(>#dubai-taxi-calculator:not([data-step]) .bg-navy){position:relative;top:auto;right:auto;margin:-630px max(1.5rem,calc((100vw - 80rem)/2 + 2rem)) 0 auto;padding-bottom:2rem}
#dubai-taxi-calculator .p-6{padding:1.25rem 1.5rem}
#dubai-taxi-calculator .space-y-6>:not([hidden])~:not([hidden]){margin-top:.75rem}
section>#dubai-taxi-calculator{padding:0!important}
#dubai-taxi-calculator [class*="lg:grid-cols-4"]{grid-template-columns:repeat(2,minmax(0,1fr))}
#dubai-taxi-calculator [class*="md:grid-cols-2"]{grid-template-columns:minmax(0,1fr)}
#dubai-taxi-calculator .flex-wrap[class*="min-h-"]{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;gap:.375rem}
#dubai-taxi-calculator .flex-wrap[class*="min-h-"]>*{flex-shrink:0;white-space:nowrap}
#dubai-taxi-calculator .flex-wrap[class*="min-h-"]>button{padding-left:.5rem;padding-right:.5rem}
#dubai-taxi-calculator .gap-5{gap:.625rem .75rem}
#dubai-taxi-calculator h2+p{display:none}
#dubai-taxi-calculator .h-12{height:2.5rem;line-height:2.5rem}
#dubai-taxi-calculator button[type=submit]{height:3rem}
#dubai-taxi-calculator .h-11{height:2.5rem}
#dubai-taxi-calculator .flex-col.gap-2{gap:.25rem}
#dubai-taxi-calculator .min-h-\[28px\]{min-height:0}
}

/* two-step card (see public/gpc-taxi-steps.js) */
#dubai-taxi-calculator[data-step="2"]>.p-6>div:first-child,#dubai-taxi-calculator[data-step="2"]>.p-6>form{display:none}
#dubai-taxi-calculator[data-step="1"]>.p-6>div.space-y-8{display:none}
#dubai-taxi-calculator[data-step="2"] .space-y-8{padding-top:0;border-top:0}
#dubai-taxi-calculator[data-step="2"] .space-y-8>:not([hidden])~:not([hidden]){margin-top:.75rem}
#dubai-taxi-calculator .bg-navy{padding:1.1rem 1.25rem!important}
#dubai-taxi-calculator form.bg-teal-soft{padding:1rem 1.25rem!important}
#dubai-taxi-calculator form.bg-teal-soft .gap-6{gap:.625rem .75rem}
#dubai-taxi-calculator form.bg-teal-soft [class*="md:grid-cols-2"]{grid-template-columns:repeat(2,minmax(0,1fr))}
#dubai-taxi-calculator form.bg-teal-soft.space-y-6>:not([hidden])~:not([hidden]){margin-top:.625rem}
#dubai-taxi-calculator .bg-navy div.items-baseline{font-size:2.25rem!important;line-height:1.1}
#dubai-taxi-calculator .bg-navy div.items-baseline>span:first-child{white-space:nowrap}
#dubai-taxi-calculator .bg-navy .uppercase{font-size:11px;line-height:1.2}
#dubai-taxi-calculator .bg-navy .mt-4{margin-top:.5rem}
#dubai-taxi-calculator form.bg-teal-soft .fj-input,#dubai-taxi-calculator form.bg-teal-soft .fj-select{height:2.5rem;line-height:2.5rem}
#dubai-taxi-calculator form.bg-teal-soft .fj-label{margin-bottom:.125rem}
#dubai-taxi-calculator form.bg-teal-soft h3{padding-bottom:.5rem;font-size:1rem}
/* booking details: no special-instructions field; pet name/breed and crate get full-width rows */
#dubai-taxi-calculator form.bg-teal-soft{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.625rem .75rem}
#dubai-taxi-calculator form.bg-teal-soft>*{margin-top:0!important}
#dubai-taxi-calculator form.bg-teal-soft>h3,#dubai-taxi-calculator form.bg-teal-soft>button{grid-column:1/-1}
#dubai-taxi-calculator form.bg-teal-soft>h3{order:-1}
#dubai-taxi-calculator form.bg-teal-soft>button{order:9}
#dubai-taxi-calculator form.bg-teal-soft>div{display:contents}
#dubai-taxi-calculator form.bg-teal-soft>div:nth-of-type(1)>:nth-child(3){grid-column:1/-1}
#dubai-taxi-calculator form.bg-teal-soft>div:nth-of-type(1)>:nth-child(4){grid-column:1/-1;order:5}
#dubai-taxi-calculator form.bg-teal-soft>div:nth-of-type(2)>:nth-child(1){grid-column:1/-1;order:6}
#dubai-taxi-calculator form.bg-teal-soft>div:nth-of-type(2)>:nth-child(2){display:none}
#dubai-taxi-calculator .bg-navy .mt-4{display:none}
#dubai-taxi-calculator .bg-navy{padding:.8rem 1.1rem!important}
#dubai-taxi-calculator .bg-navy .text-sm,#dubai-taxi-calculator .bg-navy .text-base{font-size:.8125rem}
#dubai-taxi-calculator .bg-navy div.items-baseline{font-size:2rem!important}
#dubai-taxi-calculator form.bg-teal-soft{padding:.8rem 1.1rem!important;gap:.5rem .75rem}
#dubai-taxi-calculator form.bg-teal-soft>h3{padding-bottom:.35rem;font-size:.95rem}
#dubai-taxi-calculator[data-step="2"] .p-6{padding-top:.5rem;padding-bottom:1rem}
.gpc-step-back{display:block;margin:.75rem 1.5rem 0;padding:0;background:none;border:0;font-weight:800;font-size:.875rem;color:#0e7396;cursor:pointer}
.gpc-step-back[hidden]{display:none}
.gpc-step-back:hover{text-decoration:underline}

/* "Where we take your pet" cards: top-aligned icon / title / text instead of space-between */
div.font-body:has(#dubai-taxi-calculator) .destination-card-flation{justify-content:flex-start;padding:1.5rem}
div.font-body:has(#dubai-taxi-calculator) .destination-card-flation>.w-12{margin-bottom:1.1rem}
div.font-body:has(#dubai-taxi-calculator) .destination-card-flation>h3{line-height:1.3;min-height:2.6em;display:flex;align-items:flex-start}
div.font-body:has(#dubai-taxi-calculator) .destination-card-flation>p{margin-top:.25rem;line-height:1.6}

/* "How it works" steps: numbered badge, readable body text, connectors between steps */
section:has(.how-it-works-single-line) .grid>div{position:relative;padding:1.75rem;transition:transform .3s ease,background-color .3s ease,border-color .3s ease}
section:has(.how-it-works-single-line) .grid>div:hover{transform:translateY(-4px);background-color:rgba(255,255,255,.08);border-color:rgba(125,211,252,.35)}
section:has(.how-it-works-single-line) .grid>div>div:first-child{display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;border-radius:9999px;background:rgba(125,211,252,.12);border:1.5px solid rgba(125,211,252,.55);font-size:1.25rem;line-height:1}
section:has(.how-it-works-single-line) .grid>div>h3{margin-top:1.1rem}
section:has(.how-it-works-single-line) .grid>div>p{margin-top:.6rem;font-size:.9375rem;line-height:1.65;color:rgba(255,255,255,.78)}
@media (min-width:768px){
section:has(.how-it-works-single-line) .grid>div:not(:last-child)::after{content:"";position:absolute;top:3.1rem;left:calc(100% - .25rem);width:calc(1.5rem + .5rem);border-top:2px dashed rgba(125,211,252,.45)}
}

/* pricing cards: sentence-case labels, aligned rows, no "popular" badge (these are steps of one price, not options) */
section .pricing-pale-fix>div{justify-content:flex-start!important;gap:0}
section .pricing-pale-fix>div:nth-child(2){border:1.5px solid rgba(14,115,150,.2)!important;box-shadow:0 4px 16px -2px rgba(5,45,73,.05)!important}
section .pricing-pale-fix>div:nth-child(2)::before{content:none!important}
section .pricing-pale-fix>div p:first-child{text-transform:none!important;font-size:.8125rem!important;font-weight:700!important;letter-spacing:.01em!important;padding:.3rem .8rem!important;margin-bottom:1rem!important}
section .pricing-pale-fix>div p:nth-child(2){margin-top:0!important;min-height:2.6rem;display:flex;align-items:center}
section .pricing-pale-fix>div p:last-child{margin-top:.9rem!important;padding-top:.9rem!important}
@media (min-width:768px){
section .pricing-pale-fix>div:first-child{position:relative}
section .pricing-pale-fix>div:first-child::after{content:"+";position:absolute;top:4.75rem;right:-1.55rem;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#0e7396;color:#fff;font-weight:900;font-size:1rem;line-height:1;z-index:2}
}

/* closing "Your pet's next ride" banner: larger, brighter copy */
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20{padding-top:5.5rem;padding-bottom:5.5rem}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10{max-width:56rem;display:flex;flex-direction:column;align-items:center;gap:1.25rem}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10>*{margin:0}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10>h2{font-size:2.5rem;line-height:1.15}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10>p{font-size:1.1875rem;line-height:1.65;color:rgba(255,255,255,.92);max-width:50rem;text-wrap:balance}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10>div{margin-top:.5rem}
div.font-body:has(#dubai-taxi-calculator)>section.relative.overflow-hidden.py-20>.z-10 a{font-size:1.0625rem}

/* FAQ in two columns (markup built by patch-taxi-faq.mjs): left 1-5, right 6-9, each column grows on its own */
section:has(.gpc-faq-grid)>div{max-width:72rem}
.gpc-faq-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:1rem;align-items:start}
@media (min-width:1024px){.gpc-faq-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}}

/* "How it works": photo background with navy overlay (served through next/image like the other banners) */
section:has(.how-it-works-single-line){background-color:#052d49;background-image:linear-gradient(180deg,rgba(5,45,73,.84) 0%,rgba(5,45,73,.74) 55%,rgba(3,31,51,.88) 100%),url("/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75");background-size:cover;background-position:center}
section:has(.how-it-works-single-line) .grid>div{background-color:rgba(8,38,62,.78)}
/* progressive enhancement: steps rise in as the section scrolls into view (no effect where unsupported or with reduced motion) */
@keyframes gpcRise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){
section:has(.how-it-works-single-line) .grid>div{animation:gpcRise linear both;animation-timeline:view();animation-range:entry 5% entry 55%}
section:has(.how-it-works-single-line) .grid>div:nth-child(2){animation-range:entry 12% entry 62%}
section:has(.how-it-works-single-line) .grid>div:nth-child(3){animation-range:entry 19% entry 69%}
}}

/* type scale: hero copy and card share one rhythm */
div.font-body:has(#dubai-taxi-calculator)>section:first-child div.inline-flex.uppercase,#dubai-taxi-calculator p.uppercase{font-size:13px;line-height:1.25rem;letter-spacing:.16em}
div.font-body:has(#dubai-taxi-calculator)>section:first-child p{font-size:1.0625rem;line-height:1.65}
div.font-body:has(#dubai-taxi-calculator)>section:first-child span.rounded-full{font-size:13px}
div.font-body:has(#dubai-taxi-calculator)>section:first-child a.rounded-full{font-size:1rem}
#dubai-taxi-calculator h2{font-size:1.5rem;line-height:1.25}
#dubai-taxi-calculator h2+p{font-size:.875rem;line-height:1.5}
#dubai-taxi-calculator .fj-input,#dubai-taxi-calculator .fj-select{font-size:.9375rem;font-weight:500}
#dubai-taxi-calculator .fj-select{line-height:normal}
`;

const CSS = `${START}\n${scopeCss(RAW)}${END}`;

for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const p = path.join(cssDir, f);
  let s = fs.readFileSync(p, 'utf8');
  const a = s.indexOf(START);
  if (a !== -1) s = s.slice(0, a) + s.slice(s.indexOf(END) + END.length);
  fs.writeFileSync(p, s.trimEnd() + '\n' + CSS + '\n');
  console.log('patched', f);
}

// load the step controller on the taxi page
const html = path.join(cssDir, '..', '..', 'server', 'app', 'dubai-pet-taxi.html');
let h = fs.readFileSync(html, 'utf8');
if (!h.includes('gpc-taxi-steps.js')) {
  h = h.replace('</head>', '<script defer src="/gpc-taxi-steps.js"></script></head>');
  fs.writeFileSync(html, h);
  console.log('injected steps script');
}

// pricing cards: friendlier labels instead of ALL-CAPS slogans (copy lives in html, rsc payload and server chunk)
const appDir = path.join(cssDir, '..', '..', 'server', 'app');
const copyEdits = [
  // card 1 pill (the same text is also the section eyebrow above the heading, which stays)
  [/SIMPLE, TRANSPARENT PRICING(?=(?:(?!SIMPLE)[\s\S]){0,160}AED 60)/g, 'Starting fare'],
  [/(>|\\?")Then(<|\\?")/g, '$1Distance rate$2'],
  [/(>|\\?")Clear Pricing(<|\\?")/g, '$1Clear pricing$2'],
  [/(>|\\?")NO HIDDEN FEES(<|\\?")/g, '$1No hidden fees$2'],
];
for (const f of ['dubai-pet-taxi.html', 'dubai-pet-taxi.rsc', path.join('dubai-pet-taxi', 'page.js')]) {
  const fp = path.join(appDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const before = t;
  for (const [re, to] of copyEdits) t = t.replace(re, to);
  if (t !== before) {
    fs.writeFileSync(fp, t);
    console.log('pricing copy updated in', f);
  }
}
