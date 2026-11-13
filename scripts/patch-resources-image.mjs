import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /resources hero ("Pet Travel & Relocation Guides"): stock dog photo -> /banners/resources-hero.webp (dog + cat, passport, crate, Dubai skyline).
 * The page is prerendered (resources.html and resources.rsc, built by patch-resources.mjs): both are patched, including the flight data inside the html.
 * The gradient over the photo is lightened so the picture shows. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const NEW = '/banners/resources-hero.webp';
const ALT = 'A golden retriever and a cat with a passport, travel crate and the Dubai skyline behind them';
const re = /https:\/\/images\.unsplash\.com\/photo-1587300003388-59208cc962cb\?auto=format(?:&amp;|&)fit=crop(?:&amp;|&)w=2000(?:&amp;|&)q=75/g;
const done = [];
for (const f of ['resources.html', 'resources.rsc']) {
  const fp = path.join(APP, f);
  if (!fs.existsSync(fp)) continue;
  const t = fs.readFileSync(fp, 'utf8');
  const u = t.replace(re, NEW);
  if (u !== t) { fs.writeFileSync(fp, u); done.push(f); }
}
console.log('resources image: ' + (done.length ? done.join(', ') : 'already'));

const CSS_START = '/*gpc-resources-image*/';
const CSS_END = '/*end-gpc-resources-image*/';
const CSS = [CSS_START, 'img[src*="resources-hero"]~div{opacity:.85}', 'img[src*="resources-hero"]{object-position:50% 40%!important}', CSS_END].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((x) => x.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let c = fs.readFileSync(fp, 'utf8');
  const a = c.indexOf(CSS_START);
  if (a !== -1) c = c.slice(0, a) + c.slice(c.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, c.trimEnd() + '\n' + CSS + '\n');
}
