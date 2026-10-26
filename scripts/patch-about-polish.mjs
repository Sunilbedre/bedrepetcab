import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Polish for /about (edits the compiled .next output, like the other patch scripts; idempotent):
 *  1. The "Our Story" eyebrow repeated the heading right under it ("OUR STORY / Our Story"): now "Who we are".
 *  2. The first story paragraph repeated the bold lead sentence word for word: it now continues from it instead.
 *  3. A `gpc-about` class on the page wrapper scopes the styling below to this page only.
 *  4. Styling: pill eyebrows, accent bar under section headings, framed story photo, tighter gap under the hero,
 *     equal-height Mission / Vision icons (the Vision card had a border the Mission card lacked), richer cards.
 */

const NEXT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const FILES = ['server/app/about.html', 'server/app/about.rsc', 'server/app/about/page.js'].map((f) => path.join(NEXT, f));

const DUP = 'Global Pet Cab was founded on a simple principle: moving a pet should be handled with the same care, safety, and operational precision as moving family.';
const DUP_NEW = 'That simple principle is how Global Pet Cab was founded, and it still guides every ride and every relocation we take on.';

// the wrapper div: prerendered html, the flight payload (plain in .rsc, backslash-escaped in the html's inline scripts) and the page chunk
const WRAPPERS = [
  ['<main class="flex-grow"><div class="font-body">', '<main class="flex-grow"><div class="font-body gpc-about">'],
  ['{"className":"font-body","children":[["$","section"', '{"className":"font-body gpc-about","children":[["$","section"'],
  ['{\\"className\\":\\"font-body\\",\\"children\\":[[\\"$\\",\\"section\\"', '{\\"className\\":\\"font-body gpc-about\\",\\"children\\":[[\\"$\\",\\"section\\"'],
  ['("div",{className:"font-body",children:[(0,s.jsxs)("section"', '("div",{className:"font-body gpc-about",children:[(0,s.jsxs)("section"'],
];

const changed = [];
for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  const before = t;
  t = t.split(DUP).join(DUP_NEW);
  t = t.split('Our story').join('Who we are');
  for (const [from, to] of WRAPPERS) t = t.split(from).join(to);
  if (t !== before) {
    fs.writeFileSync(f, t);
    changed.push(path.relative(NEXT, f));
  }
}

const CSS_START = '/*gpc-about*/';
const CSS_END = '/*end-gpc-about*/';
const A = '.gpc-about';
const CSS = [
  CSS_START,
  // eyebrows become pills
  `${A} p[class*="tracking-[0.18em]"]{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .9rem;border-radius:999px;background:color-mix(in srgb,currentColor 11%,transparent);letter-spacing:.16em}`,
  `${A} p[class*="tracking-[0.18em]"]::before{content:"";width:.4rem;height:.4rem;border-radius:50%;background:currentColor}`,
  // short accent bar under the section headings
  `${A} section .max-w-2xl>h2::after,${A} section .space-y-5>h2::after{content:"";display:block;width:3.5rem;height:.28rem;margin-top:.9rem;border-radius:999px;background:linear-gradient(90deg,#1b9fc4,#6fd3ea)}`,
  // story: less dead space under the hero, framed photo, calmer lead
  `@media (min-width:1024px){${A}>section:nth-of-type(2){padding-top:6.5rem}}`,
  `${A}>section:nth-of-type(2) .lg\\:col-span-5{box-shadow:0 40px 70px -36px rgba(5,45,73,.6),0 0 0 10px rgba(27,159,196,.09)}`,
  `${A}>section:nth-of-type(2) .lg\\:col-span-7>p.font-bold{padding-left:1.1rem;border-left:4px solid #1b9fc4}`,
  // mission / vision: same border on both cards so the icons and headings line up, plus depth
  `${A} .md\\:grid-cols-2>article{border:1px solid transparent;transition:transform .3s,box-shadow .3s}`,
  `${A} .md\\:grid-cols-2>article:first-child{border-color:#d4ebf2;box-shadow:0 30px 50px -30px rgba(0,0,0,.55)}`,
  `${A} .md\\:grid-cols-2>article:last-child{background:linear-gradient(150deg,#0e4a73 0%,#0A3A5C 60%,#082f4b 100%);border-color:rgba(255,255,255,.12)}`,
  `${A} .md\\:grid-cols-2>article:hover{transform:translateY(-4px)}`,
  `${A} .md\\:grid-cols-2>article>div:first-child{width:3.5rem;height:3.5rem}`,
  // team cards: keep a tidy tinted tile while a photo loads (or if it cannot)
  `${A} article.group>div.relative{background:linear-gradient(135deg,#dff1f6,#b9dde8)}`,
  CSS_END,
].join('\n');

const cssDir = path.join(NEXT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
changed.push('css');

console.log('about polish:\n  ' + changed.join('\n  '));
