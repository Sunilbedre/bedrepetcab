import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Fixes from reviewing /how-it-works:
 *  1. The "2,000+ Pets Transported" trust card repeated the IATA card's subtitle ("Live animal regulations & crates").
 *     The same shared trust bar is on the home, about, why-us, destinations and how-it-works pages.
 *  2. The seven "More Than Just a Ride Across Dubai" descriptions started with a lowercase letter.
 *  3. "import into Dubai" / "export from the UAE" in the import/export note now link to the two new relocation pages.
 *  4. The closing banner had no overlay (the tailwind opacity classes are not in the compiled stylesheet), so its text sat on a
 *     bright photo; section headers on this page were narrow enough to leave one word on a second line.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

function listFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const n of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, n.name);
    if (n.isDirectory()) listFiles(p, out);
    else if (/\.(html|rsc|js)$/.test(n.name)) out.push(p);
  }
  return out;
}

/* ---- 1. trust card subtitle ---- */
const TRUST_RE = /(Pets Transported[\s\S]{0,360}?)Live animal regulations (?:&amp;|&|\\u0026) crates/g;
const TRUST_NEW = 'Across Dubai and beyond';

/* ---- 2. lowercase descriptions (how-it-works only) ---- */
const DESCRIPTIONS = [
  'transportation for essential veterinary visits when you need help getting your pet there.',
  'pickup and drop-off support when you are unavailable, subject to the service arrangement.',
  'transport to and from boarding facilities and pet hotels.',
  'take your pet from home or another pickup point to the airport.',
  'bring your pet home or to the agreed destination after arrival.',
  'help your pet travel between homes within Dubai.',
  'ask the team about available routes beyond Dubai.',
];

/* ---- 3. import / export links (how-it-works only) ---- */
const LINKS = [
  ['import into Dubai', '/international-pet-relocation/to-dubai'],
  ['export from the UAE', '/international-pet-relocation/from-dubai'],
];
const STRONG_CLASS = 'text-teal-bright font-black';
const LINK_CLASS = 'text-teal-bright font-black underline decoration-teal-bright/40 underline-offset-4 hover:decoration-teal-bright';

function linkify(s) {
  let out = s;
  for (const [text, href] of LINKS) {
    // prerendered html
    out = out.split(`<strong class="${STRONG_CLASS}">${text}</strong>`).join(`<a href="${href}" class="${LINK_CLASS}">${text}</a>`);
    // flight payload (plain in .rsc, backslash-escaped inside the html's inline script)
    const re = new RegExp(`\\[(\\\\?")\\$\\1,\\1strong\\1,null,\\{\\1className\\1:\\1${STRONG_CLASS}\\1,\\1children\\1:\\1${text}\\1\\}\\]`, 'g');
    out = out.replace(re, (_m, q) => `[${q}$${q},${q}a${q},null,{${q}href${q}:${q}${href}${q},${q}className${q}:${q}${LINK_CLASS}${q},${q}children${q}:${q}${text}${q}}]`);
  }
  return out;
}

function capitalise(s) {
  let out = s;
  for (const d of DESCRIPTIONS) out = out.split(d).join(d[0].toUpperCase() + d.slice(1));
  return out;
}

const changed = [];
const touch = (file, next, prev, label) => {
  if (next === prev) return;
  fs.writeFileSync(file, next);
  changed.push(`${label}: ${path.relative(ROOT, file)}`);
};

for (const file of [...listFiles(path.join(ROOT, 'server', 'app')), ...listFiles(path.join(ROOT, 'static', 'chunks', 'app'))]) {
  const s = fs.readFileSync(file, 'utf8');
  if (s.includes('Pets Transported')) touch(file, s.replace(TRUST_RE, `$1${TRUST_NEW}`), s, 'trust card');
}
for (const f of ['how-it-works.html', 'how-it-works.rsc']) {
  const file = path.join(ROOT, 'server', 'app', f);
  if (!fs.existsSync(file)) continue;
  const s = fs.readFileSync(file, 'utf8');
  touch(file, linkify(capitalise(s)), s, 'copy + links');
}

/* ---- 4. banner overlay + header width, scoped to this page (#dubai-taxi-steps only exists here) ---- */
const CSS_START = '/*gpc-how-it-works*/';
const CSS_END = '/*end-gpc-how-it-works*/';
const B = 'body:has(#dubai-taxi-steps)';
const CSS = [
  CSS_START,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy)::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,31,51,.93) 0%,rgba(5,45,73,.84) 55%,rgba(5,45,73,.72) 100%)}`,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10{position:relative;z-index:10}`,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy) h2{font-size:2.25rem!important;line-height:1.2!important}`,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy) p.max-w-2xl{font-size:1.125rem;line-height:1.6;color:rgba(255,255,255,.92);max-width:58rem}`,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy) p.uppercase{font-size:.8rem}`,
  `${B} main section .max-w-3xl.space-y-4{max-width:56rem}`,
  // wider closing banner copy, like the other pages (fewer lines)
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy)>.z-10{max-width:76rem}`,
  // the stylesheet has no space-y-12 / space-y-10, so section headers sat directly on their cards and the import/export note touched the steps
  `${B} main .space-y-12>:not([hidden])~:not([hidden]){margin-top:3rem}`,
  `${B} main .space-y-10>:not([hidden])~:not([hidden]){margin-top:2.5rem}`,
  // hero: dark overlay over the photo (the page's overlay classes are not in the stylesheet)
  `${B} main section.relative.overflow-hidden.bg-navy::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,31,51,.95) 0%,rgba(4,26,44,.85) 48%,rgba(5,45,73,.5) 100%)}`,
  // cross-border steps: photo background with a navy overlay, glassy step cards
  `${B} main section.py-20.bg-navy{background-color:#052d49;background-image:linear-gradient(180deg,rgba(5,45,73,.9) 0%,rgba(5,45,73,.82) 55%,rgba(3,31,51,.94) 100%),url("/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1544568100-847a948585b9%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75");background-size:cover;background-position:center}`,
  `${B} main section.py-20.bg-navy article{background-color:rgba(8,38,62,.8)}`,
  // connector line through the step badges (its top-[38px] class is not in the stylesheet)
  `${B} main section.py-20.bg-navy .grid>.absolute.h-px{top:69px}`,
  // the trust bar hung half out of the hero and the next section reserved a fixed 160px for it, which left a big empty band on wide screens: keep the bar inside the hero and tighten the section
  `${B} main section.relative.overflow-hidden.bg-navy{padding-bottom:3rem}`,
  `${B} main section.relative.overflow-hidden.bg-navy .z-30{transform:none}`,
  `${B} main section.relative.overflow-hidden.bg-navy+section{padding-top:3.5rem}`,
  // "More Than Just a Ride Across Dubai": soft tinted background with a teal glow
  `${B} main section.py-20.bg-gradient-to-b{background-color:#eef7f9;background-image:radial-gradient(60rem 28rem at 8% 0%,rgba(20,184,166,.14),transparent 70%),radial-gradient(50rem 26rem at 100% 100%,rgba(5,45,73,.08),transparent 70%)}`,
  // motion below the hero: the trust bar floats in on load, everything else rises as it scrolls into view
  `@keyframes gpcHiwUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}`,
  `@keyframes gpcHiwRise{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}`,
  `@media (prefers-reduced-motion:no-preference){${B} main section.relative.overflow-hidden.bg-navy .z-30>div{animation:gpcHiwUp 1s cubic-bezier(.16,1,.3,1) .2s backwards}}`,
  `@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){${B} main section:not(:first-of-type) .grid>*{animation:gpcHiwRise linear backwards;animation-timeline:view();animation-range:entry 0% entry 45%}${B} main section:not(:first-of-type) .grid>*:nth-child(2){animation-range:entry 8% entry 53%}${B} main section:not(:first-of-type) .grid>*:nth-child(3){animation-range:entry 16% entry 61%}${B} main section:not(:first-of-type) .grid>*:nth-child(4){animation-range:entry 24% entry 69%}${B} main section:not(:first-of-type) .grid>*:nth-child(5){animation-range:entry 32% entry 77%}}}`,
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

console.log('how-it-works fixes:\n  ' + changed.join('\n  '));
