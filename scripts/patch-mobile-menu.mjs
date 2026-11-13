import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Phone menu (hamburger drawer), the two big buttons at the top: "Dubai Pet Taxi" -> /dubai-pet-taxi and "International Move" -> /international-pet-relocation.
 * Now the same three services as the home cards and the bottom bar, each opening its own form page:
 *   From Dubai -> /book-pet-relocation-from-dubai   Into Dubai -> /book-pet-relocation-to-dubai   Pet Taxi -> /book-pet-taxi
 * The drawer only renders after it is opened (client state), so it lives in the server chunk and the browser layout chunk only. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const q = JSON.stringify;
const ARROW_OUT = ['M7 17 17 7', 'M7 7h10v10'];
const ARROW_IN = ['M17 7 7 17', 'M17 17H7V7'];
const CLS_NAVY = 'flex flex-col items-center justify-center p-3.5 rounded-2xl bg-navy text-white font-extrabold text-xs';
const CLS_TAXI = 'flex flex-col items-center justify-center p-3.5 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep font-extrabold text-xs';

function items({ J, JS, Link, Car, close }) {
  const svg = (paths) => `${JS}("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5 mb-1 text-teal-light",children:[${paths.map((d) => `${J}("path",{d:${q(d)}})`).join(',')}]})`;
  const link = (href, cls, icon, label) => `${JS}(${Link},{href:${q(href)},onClick:()=>${close},className:${q(cls)},children:[${icon},${q(label)}]})`;
  return [
    link('/book-pet-relocation-from-dubai', CLS_NAVY, svg(ARROW_OUT), 'From Dubai'),
    link('/book-pet-relocation-to-dubai', CLS_NAVY, svg(ARROW_IN), 'Into Dubai'),
    link('/book-pet-taxi', CLS_TAXI, `${J}(${Car},{className:"w-5 h-5 mb-1 text-teal-bright"})`, 'Pet Taxi'),
  ].join(',');
}

function patch(file, names) {
  const t = fs.readFileSync(file, 'utf8');
  if (t.includes('"grid grid-cols-3 gap-2",children:[') && t.includes('"From Dubai"') && !t.includes('"International Move"')) return false;
  const marker = '"grid grid-cols-2 gap-2",children:[';
  const start = t.indexOf(marker);
  const endTxt = '"International Move"]})';
  const end = t.indexOf(endTxt, start);
  if (start === -1 || end === -1) throw new Error('patch-mobile-menu: drawer buttons not found in ' + path.basename(file));
  const out = t.slice(0, start) + '"grid grid-cols-3 gap-2",children:[' + items(names) + t.slice(end + endTxt.length);
  fs.writeFileSync(file, out);
  return true;
}

const done = [];
if (patch(path.join(ROOT, 'server', 'chunks', '322.js'), { J: 's.jsx', JS: '(0,s.jsxs)', Link: 'r.default', Car: 'x.Z', close: 't(!1)' })) done.push('server chunk 322.js');
for (const n of fs.readdirSync(path.join(ROOT, 'static', 'chunks', 'app')).filter((x) => /^layout-.*\.js$/.test(x))) {
  if (patch(path.join(ROOT, 'static', 'chunks', 'app', n), { J: '(0,a.jsx)', JS: '(0,a.jsxs)', Link: 'n()', Car: 'u.Z', close: 't(!1)' })) done.push('browser ' + n);
}
console.log('mobile menu: ' + (done.length ? done.join(', ') : 'already'));
