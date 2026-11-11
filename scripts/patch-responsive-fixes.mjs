import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Heading scale + responsive fixes (CSS only, appended to the compiled stylesheet). Idempotent.
 *   - one page-title (h1) scale on every page: 28px phones, 40px from 768px, 44px from 1024px (the home banner title has its own, matching steps)
 *   - /dubai-pet-taxi: the FAQ subtitle was forced onto one line from 768px and pushed the page wider than the screen; it now only does that from 1280px
 *   - home banner stage: always as wide as the screen (it was 1200px wide on 768-1199px screens)
 *   - review marquee and page content are clipped sideways; 11px labels raised to 12px; 28px quick-pick buttons and the taxi 'booking page' link get bigger tap areas
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
  // home banner: with aspect-ratio 3/1 and a 25rem minimum height the stage became 1200px wide on tablets (copy and arrows off-screen)
  `${P} main .gpc-hb-stage{width:100%;max-width:100%}`,
  // tablets: narrower text column and a taller banner so the copy stays on the shaded left side of the photo
  `@media (min-width:640px) and (max-width:1023px){${P} main .gpc-hb-stage{min-height:30rem}${P} main .gpc-hb-copy{max-width:25rem}}`,
  // sliders / marquees: clip them (the reviews track is ~2750px wide) so a phone can never pan the page sideways; iOS Safari ignores overflow-x:hidden on the body
  `${P} main .review-marquee-wrap{overflow:hidden}`,
  `${P} main{overflow-x:clip}`,
  // small text and tap targets
  `${P} main .text-\\[11px\\]{font-size:.75rem!important}`,
  `@media (max-width:767px){${P} main button.h-7{min-height:2.25rem;height:auto}${P} main .gtr-all{padding:.7rem 0}}`,
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
