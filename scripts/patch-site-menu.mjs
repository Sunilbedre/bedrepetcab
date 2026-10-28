import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Header "Services" dropdown: three direct links, no sub-titles, same type as the rest of the nav
 *   Pet Relocation from Dubai · Pet Relocation into Dubai · Dubai Pet Taxi
 * The header is a client component, so it lives in the layout chunk (browser) and the server chunk that renders it.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const LINKS = [
  ['/international-pet-relocation/from-dubai', 'Pet Relocation from Dubai'],
  ['/international-pet-relocation/to-dubai', 'Pet Relocation into Dubai'],
  ['/dubai-pet-taxi', 'Dubai Pet Taxi'],
];

// same size / weight / colour as the top-level nav items (font-semibold text-[15px] text-navy-muted)
const ITEM_CLASS = 'block px-3 py-2.5 rounded-xl hover:bg-teal-soft text-[15px] font-semibold text-navy-muted hover:text-teal-deep transition-colors';

// Destinations dropdown: the route links were text-xs (12px); match the nav and the Services dropdown (15px / 600)
const ROUTE_OLD = 'className:"px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-soft hover:text-teal-deep rounded-xl transition-colors flex justify-between"';
const ROUTE_NEW = 'className:"px-3 py-2.5 text-[15px] font-semibold text-navy-muted hover:bg-teal-soft hover:text-teal-deep rounded-xl transition-colors flex justify-between items-center"';

function patchRoutes(file) {
  const s = fs.readFileSync(file, 'utf8');
  if (!s.includes(ROUTE_OLD)) return false;
  fs.writeFileSync(file, s.split(ROUTE_OLD).join(ROUTE_NEW));
  return true;
}

function patch(file) {
  let s = fs.readFileSync(file, 'utf8');
  const open = 'className:"absolute top-full left-0 w-64 bg-white rounded-2xl shadow-fj-card-hover border border-teal-border p-2 space-y-1 animate-fade-in-up z-50",children:[';
  const a = s.indexOf(open);
  if (a === -1) throw new Error('patch-site-menu: Services dropdown not found in ' + file);
  const start = a + open.length;
  const rest = s.slice(start);
  const end = rest.search(/\]\}\)\]\}\),(?:\(0,\w+\.jsxs\)|\w+\.jsxs)\("div",\{className:"relative",onMouseEnter/);
  if (end === -1) throw new Error('patch-site-menu: end of Services dropdown not found in ' + file);

  const items = rest.slice(0, end);
  const m = items.match(/^((?:\(0,\w+\.jsxs?\)|\w+\.jsxs?))\(([\w.()]+),\{href:"\/(?:dubai-pet-taxi|international-pet-relocation\/from-dubai)"/);
  if (!m) throw new Error('patch-site-menu: unexpected first menu item in ' + file);
  const jsx = m[1].replace(/jsxs$/, 'jsx').replace('jsxs)', 'jsx)');
  const link = m[2];

  const next = LINKS.map(([href, label]) => `${jsx}(${link},{href:"${href}",className:"${ITEM_CLASS}",children:"${label}"})`).join(',');
  if (items === next) return false;
  s = s.slice(0, start) + next + rest.slice(end);
  fs.writeFileSync(file, s);
  return true;
}

const files = [
  path.join(ROOT, 'server', 'chunks', '322.js'),
  ...fs.readdirSync(path.join(ROOT, 'static', 'chunks', 'app')).filter((n) => /^layout-.*\.js$/.test(n)).map((n) => path.join(ROOT, 'static', 'chunks', 'app', n)),
];
for (const f of files) {
  const a = patch(f);
  const b = patchRoutes(f);
  console.log(a || b ? 'patched' : 'unchanged', path.relative(ROOT, f));
}
