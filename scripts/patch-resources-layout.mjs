import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /resources: the page wrapper (space-y-16 py-8) left a white band above the hero and big gaps between the hero and the guide list.
 * CSS only; scoped to the wrapper whose first child is the photo hero (the contact page shares the wrapper classes but has a gradient hero).
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const W = 'main>div.space-y-16.py-8:has(>section.relative.overflow-hidden.bg-navy)';
const CSS_START = '/*gpc-resources-layout*/';
const CSS_END = '/*end-gpc-resources-layout*/';
const CSS = [
  CSS_START,
  `${W}{padding-top:0;padding-bottom:0}`,
  `${W}>section.bg-navy{padding-top:3.25rem;padding-bottom:3.25rem}`,
  `${W}>*:not(:first-child){margin-top:0;padding-top:3rem;padding-bottom:4rem}`,
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
console.log('resources layout: css');
