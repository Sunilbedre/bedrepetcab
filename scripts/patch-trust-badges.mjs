import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const pairs = [
  ['4.9 / 5.0', 'IPATA'],
  ['Verified Google Rating', 'IPATA Member'],
  ['Based on real pet parent reviews', 'Accredited pet transport association'],
  ['2,000+ Pets', 'IATA'],
  ['Safely Transported', 'IATA-Compliant Handling'],
  ['Dubai taxi rides & global flights', 'Live animal regulations & crates'],
  ['Dubai taxi rides &amp; global flights', 'Live animal regulations &amp; crates'],
  ['100% Climate Fleet', '2,000+'],
  ['Sanitized Vehicles', 'Pets Transported'],
  ['Trained pet handlers', 'Dubai taxi rides & global flights'],
  ['Trained pet handlers', 'Dubai taxi rides &amp; global flights'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(js|html|rsc)$/.test(name)) files.push(p);
  }
  return files;
}

let touched = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  let next = s;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== s) {
    fs.writeFileSync(file, next);
    touched++;
  }
}
console.log(`Patched ${touched} files under .next`);
