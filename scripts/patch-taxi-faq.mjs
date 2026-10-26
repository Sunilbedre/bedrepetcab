import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Dubai pet taxi page: replace the FAQ list (client chunk, server chunk and prerendered html).
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

import { FAQS } from './taxi-faq-data.mjs';

const FAQ_JS = JSON.stringify(FAQS.map((f) => ({ question: f.question, answer: f.answer })));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#x27;');

// the taxi list is the array that starts with the fare question (old or new wording)
const ARRAY_RE = /\[\{"?question"?:"How is my Dubai [Pp]et [Tt]axi fare calculated\?"[^\]]+\]/;

// two columns: items 0-4 left, 5-8 right (CSS for .gpc-faq-grid lives in patch-taxi-hero-form.mjs)
const LIST_RE = /(\(0,\w+\.jsx\)|\w+\.jsx)\("div",\{className:"space-y-4",children:(\w+)\.map\(\(e,t\)=>\{let i=a===t;([\s\S]*?)\},t\)\}\)\}\)/;
function twoColumns(s) {
  if (s.includes('gpc-faq-grid') || !LIST_RE.test(s)) return s;
  return s.replace(LIST_RE, (_m, jsx, arr, body) =>
    `${jsx}("div",{className:"gpc-faq-grid",children:[0,1].map(k=>${jsx}("div",{className:"space-y-4",children:${arr}.map((e,t)=>{let i=a===t;${body}},t)}).filter((_,t)=>(t<5)===(k===0))},k))})`);
}

function patchJs(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (!ARRAY_RE.test(s) && !LIST_RE.test(s) && !s.includes('gpc-faq-grid')) return false;
  const next = twoColumns(s.replace(ARRAY_RE, () => FAQ_JS));
  if (next === s) return false;
  fs.writeFileSync(file, next);
  return true;
}

// html: rebuild the accordion markup (first item open, like the component's initial state)
function faqHtml() {
  const chevron = (open) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-teal-deep' : ''}"><path d="m6 9 6 6 6-6"></path></svg>`;
  const item = (f, i) =>
    `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${esc(f.question)}</span>${chevron(i === 0)}</button>` +
    (i === 0 ? `<div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">${esc(f.answer)}</div>` : '') +
    '</div>';
  const col = (lo, hi) => '<div class="space-y-4">' + FAQS.slice(lo, hi).map((f, k) => item(f, k + lo)).join('') + '</div>';
  return '<div class="gpc-faq-grid">' + col(0, 5) + col(5, FAQS.length) + '</div>';
}

function patchHtml(file) {
  const s = fs.readFileSync(file, 'utf8');
  let start = s.indexOf('<div class="space-y-4"><div class="border border-teal-border rounded-2xl');
  if (start === -1) return false;
  const grid = '<div class="gpc-faq-grid">';
  if (s.slice(start - grid.length, start) === grid) start -= grid.length;
  // walk to the matching close of the wrapper div
  let depth = 0;
  let end = -1;
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  for (let m; (m = re.exec(s)); ) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) { end = m.index + m[0].length; break; }
  }
  if (end === -1) throw new Error('FAQ markup not balanced');
  const next = s.slice(0, start) + faqHtml() + s.slice(end);
  if (next === s) return false;
  fs.writeFileSync(file, next);
  return true;
}

const targets = [
  path.join(root, 'server', 'app', 'dubai-pet-taxi', 'page.js'),
  ...fs.readdirSync(path.join(root, 'static', 'chunks', 'app', 'dubai-pet-taxi')).filter((n) => n.endsWith('.js')).map((n) => path.join(root, 'static', 'chunks', 'app', 'dubai-pet-taxi', n)),
];
for (const f of targets) console.log(patchJs(f) ? 'patched' : 'unchanged', path.relative(root, f));
console.log(patchHtml(path.join(root, 'server', 'app', 'dubai-pet-taxi.html')) ? 'patched html' : 'html unchanged');
