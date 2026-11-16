import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* Real phone number + registered office address (replaces the placeholder number and the old Business Bay address). Idempotent. */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const changed = [];
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'cache') walk(p, out); }
    else if (/\.(html|rsc|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
const ADDR_SHORT = 'City Avenue Building, 7th Floor, Office 707, 8th St, Port Saeed, Deira, Dubai';
const REPL = [
  ['+971 50 123 4567', '+971 50 485 6239'],
  ['+971-50-123-4567', '+971-50-485-6239'],
  ['971501234567', '971504856239'],
  ['Business Bay / Dubai Silicon Oasis, Dubai, UAE', ADDR_SHORT + ', UAE'],
  ['Business Bay / Silicon Oasis, Dubai, United Arab Emirates', ADDR_SHORT + ', United Arab Emirates'],
  ['Business Bay / Dubai Silicon Oasis', ADDR_SHORT],
];
for (const f of [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks'))]) {
  const s = fs.readFileSync(f, 'utf8');
  let n = s;
  for (const [a, b] of REPL) if (n.includes(a)) n = n.split(a).join(b);
  if (n !== s) { fs.writeFileSync(f, n); changed.push(path.relative(ROOT, f)); }
}
console.log(changed.length ? 'contact details patched in ' + changed.length + ' files' : 'contact details already current');

/* second pass: drop the "+971 4 800 PETS" line, and let the footer copyright stay on one line on desktop */
const more = [];
for (const f of [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks'))]) {
  const s = fs.readFileSync(f, 'utf8');
  const n = s.split(' / +971 4 800 PETS').join('').split('lg:max-w-[58%]').join('lg:max-w-none');
  if (n !== s) { fs.writeFileSync(f, n); more.push(f); }
}
console.log(more.length ? 'removed 800 PETS / unwrapped footer in ' + more.length + ' files' : 'footer/phone line already clean');
