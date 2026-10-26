import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const pairs = [
  // 1. Heading
  [
    'Select Pet Mobility Service',
    'Choose Your Pet Transport or Relocation Service',
  ],

  // 2. Subtitle / description
  [
    'Choose local city ground transport inside Dubai or cross-border international flight relocation.',
    'Select local pet transport in Dubai, an airport transfer, UAE intercity travel, or international pet relocation.',
  ],

  // 3. Option 1: Within Dubai
  [
    'Vet visits, grooming drop-offs, pet hotels, and DXB airport transfers across Dubai.',
    'Pet Transport in Dubai — Vet visits, grooming drop-offs, boarding and DXB airport transfers across Dubai.',
  ],

  // 4. Option 2: Airport Transfer (both plain '&' and HTML '&amp;')
  [
    'DXB Main, DWC Al Maktoum & Abu Dhabi AUH pickups and drop-offs.',
    'Pet Airport Transfers — DXB, DWC Al Maktoum and Abu Dhabi AUH pickups and drop-offs.',
  ],
  [
    'DXB Main, DWC Al Maktoum &amp; Abu Dhabi AUH pickups and drop-offs.',
    'Pet Airport Transfers — DXB, DWC Al Maktoum and Abu Dhabi AUH pickups and drop-offs.',
  ],

  // 5. Option 3: UAE Intercity
  [
    'Dubai ↔ Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah transfers.',
    'UAE Pet Transport — Dubai to Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Fujairah.',
  ],

  // 6. Option 4: International Relocation
  [
    'Dubai ↔ UK, India, USA, Canada, Australia, and Europe.',
    'Dubai to and from the UK, India, USA, Canada, Australia and Europe.',
  ],

  // 7. Image label
  [
    'Safe rides across Dubai',
    'Safe, comfortable pet transport across Dubai',
  ],
  [
    'Climate-controlled fleet',
    'CLIMATE-CONTROLLED FLEET',
  ],

  // 8. Section label
  [
    'Step 1 of 4',
    'STEP 1 OF 4',
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
console.log(`Patched ${touched} files under .next for Pet Mobility Service Selector`);
