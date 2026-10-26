import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FAQS } from './taxi-faq-data.mjs';

/*
 * Fixes found while reviewing the home page:
 *  1. The two home route cards ("Moving a pet out of Dubai", "Bringing a pet into Dubai") still pointed at the old
 *     combined quote flow. They now go to the export / import pages.
 *  2. The tabbed FAQ on the home, /faq and /get-a-quote pages still carried the old taxi answers (for example
 *     "up to 2 pet parents ride at no extra cost"), which contradict the approved taxi FAQ. They now use the same nine
 *     questions and answers as /dubai-pet-taxi.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const CHUNKS = path.join(ROOT, 'static', 'chunks', 'app');

/* ---------- 1. home route cards ---------- */
const OLD_LINK = '/get-a-quote?service=international';
const CARD_LINKS = ['/international-pet-relocation/from-dubai', '/international-pet-relocation/to-dubai']; // card 1 = out of Dubai, card 2 = into Dubai

function fixLinks(file) {
  const s = fs.readFileSync(file, 'utf8');
  let n = 0;
  const next = s.split(OLD_LINK).reduce((acc, part, i) => (i === 0 ? part : acc + CARD_LINKS[(n++) % 2] + part), '');
  if (next === s) return false;
  fs.writeFileSync(file, next);
  return true;
}

/* ---------- 2. old taxi FAQ list ---------- */
const OLD_ARRAY_RE = /\[\{"?question"?:"How is my Dubai Pet Taxi fare calculated\?"[^\]]+\]/;
const FAQ_JS = JSON.stringify(FAQS.map((f) => ({ question: f.question, answer: f.answer })));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#x27;');

function fixFaqJs(file) {
  const s = fs.readFileSync(file, 'utf8');
  if (!OLD_ARRAY_RE.test(s)) return false;
  fs.writeFileSync(file, s.replace(OLD_ARRAY_RE, () => FAQ_JS));
  return true;
}

function accordionHtml() {
  const chevron = (open) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-teal-deep' : ''}"><path d="m6 9 6 6 6-6"></path></svg>`;
  return '<div class="space-y-4">' + FAQS.map((f, i) =>
    `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${esc(f.question)}</span>${chevron(i === 0)}</button>` +
    (i === 0 ? `<div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">${esc(f.answer)}</div>` : '') +
    '</div>').join('') + '</div>';
}

function fixFaqHtml(file) {
  const s = fs.readFileSync(file, 'utf8');
  const start = s.indexOf('<div class="space-y-4"><div class="border border-teal-border rounded-2xl');
  if (start === -1) return false;
  let depth = 0;
  let end = -1;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  for (let m; (m = re.exec(s)); ) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) { end = m.index + m[0].length; break; }
  }
  if (end === -1) throw new Error('FAQ markup not balanced in ' + file);
  // only touch the old taxi list, never another accordion on the page
  if (!s.slice(start, end).includes('How is my Dubai Pet Taxi fare calculated?')) return false;
  fs.writeFileSync(file, s.slice(0, start) + accordionHtml() + s.slice(end));
  return true;
}

const report = [];
const note = (changed, label) => changed && report.push(label);

// links: html (card + inline payload), rsc payload and the page bundle
// (index.html / index.rsc are removed by patch-home-services.mjs, which renders the home page on request)
for (const f of ['index.html', 'index.rsc', 'page.js']) {
  const fp = path.join(APP, f);
  if (fs.existsSync(fp)) note(fixLinks(fp), 'home links: ' + f);
}

// FAQ: server bundles, browser chunks, prerendered html
for (const page of ['', 'faq', 'get-a-quote']) {
  const srv = path.join(APP, page, 'page.js');
  if (fs.existsSync(srv)) note(fixFaqJs(srv), `faq list: server/${page || 'home'}`);
  const dir = page ? path.join(CHUNKS, page) : CHUNKS;
  if (!fs.existsSync(dir)) continue;
  for (const n of fs.readdirSync(dir).filter((x) => /^page-.*\.js$/.test(x))) note(fixFaqJs(path.join(dir, n)), `faq list: chunk ${page || 'home'}/${n}`);
}
for (const f of ['index.html', 'faq.html']) {
  const fp = path.join(APP, f);
  if (fs.existsSync(fp)) note(fixFaqHtml(fp), 'faq html: ' + f);
}

console.log(report.length ? 'patched:\n  ' + report.join('\n  ') : 'unchanged');
