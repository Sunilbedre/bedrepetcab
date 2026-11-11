import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Heading scale + responsive fixes (CSS only, appended to the compiled stylesheet). Idempotent.
 *   - one page-title (h1) scale on every page: 28px phones, 40px from 768px, 44px from 1024px (the home banner title has its own, matching steps)
 *   - /dubai-pet-taxi: the FAQ subtitle was forced onto one line from 768px and pushed the page wider than the screen; it now only does that from 1280px
 *   - /get-a-quote: the pet-type cards were wider than their grid columns at tablet width
 * Run after patch-type-scale.mjs and before patch-home-themes.mjs.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const CSS_START = '/*gpc-responsive*/';
const CSS_END = '/*end-gpc-responsive*/';
const P = 'html body:not(#gpc-t):not(#gpc-u)';
const H1 = `${P} main h1:not(.gpc-hb-title)`;
const CSS = [
  CSS_START,
  `${H1}{font-size:1.75rem!important;line-height:1.15!important}`,
  `@media (min-width:768px){${H1}{font-size:2.5rem!important}}`,
  `@media (min-width:1024px){${H1}{font-size:2.75rem!important}}`,
  `@media (min-width:640px){${P} main .gpc-hb-title{font-size:2.125rem!important}}`,
  `@media (min-width:1024px){${P} main .gpc-hb-title{font-size:2.5rem!important}}`,
  `${P} main .faq-subtitle-single-line{white-space:normal!important}`,
  `@media (min-width:1280px){${P} main .faq-subtitle-single-line{white-space:nowrap!important}}`,
  `${P} main .gpc-pc{width:100%;max-width:100%;min-width:0}`,
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
console.log('responsive fixes: css');
