import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const pairs = [
  // Eyebrow
  [
    'Real Stories & Reviews',
    'REAL PET RELOCATION STORIES',
  ],
  [
    'Real Stories &amp; Reviews',
    'REAL PET RELOCATION STORIES',
  ],

  // Heading
  [
    'Trusted by Dubai Pet Parents & Families',
    'Trusted by Pet Parents in Dubai and Around the World',
  ],
  [
    'Trusted by Dubai Pet Parents &amp; Families',
    'Trusted by Pet Parents in Dubai and Around the World',
  ],

  // Intro
  [
    'Read authentic experiences from pet owners who rely on Global Pet Cab for city taxi rides and cross-border relocations.',
    'Read real experiences from pet parents who have used Global Pet Cab for Dubai pet transport, airport transfers and international pet relocation.',
  ],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(js|html|rsc|json)$/.test(name)) files.push(p);
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
    console.log(`Patched: ${path.relative(path.join(root, '..'), file)}`);
  }
}
console.log(`Patched ${touched} files under .next for Real Pet Relocation Stories`);
