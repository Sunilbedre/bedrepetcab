import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const pairs = [
  // 1. Eyebrow badge
  [
    'Whatever your move looks like',
    "WHATEVER YOUR PET'S JOURNEY LOOKS LIKE",
  ],

  // 2. Section Heading
  [
    'Three journeys, one team that handles all of it',
    'Pet Relocation and Transport, From Dubai to Anywhere You Need to Go',
  ],

  // 3. Section Subheading (plain + HTML encoded variants)
  [
    "Most families fall into one of these. Tell us which is yours, and we'll take it from there.",
    "Whether you're moving your pet out of Dubai, bringing them into the UAE, or travelling across the city, our team coordinates the journey from start to finish.",
  ],
  [
    "Most families fall into one of these. Tell us which is yours, and we&#x27;ll take it from there.",
    "Whether you&#x27;re moving your pet out of Dubai, bringing them into the UAE, or travelling across the city, our team coordinates the journey from start to finish.",
  ],
  [
    "Most families fall into one of these. Tell us which is yours, and we&apos;ll take it from there.",
    "Whether you&apos;re moving your pet out of Dubai, bringing them into the UAE, or travelling across the city, our team coordinates the journey from start to finish.",
  ],

  // 4. Journey 1 description
  [
    'Taking your dog or cat overseas? We handle MOCCAE export papers, the IATA crate, airline booking and customs at the other end — start to finish.',
    'Taking your dog or cat overseas? We coordinate MOCCAE export requirements, IATA-compliant crate preparation, airline arrangements and destination-side customs coordination.',
  ],

  // 5. Journey 2 description
  [
    'Importing into the UAE? We manage RNATT, the MOCCAE import permit and airport clearance — so arrival in Dubai is the easy part.',
    'Bringing your pet into the UAE? We support the required RNATT, MOCCAE import permit, airport clearance and arrival arrangements.',
  ],

  // 6. Journey 3 description
  [
    'Moving across Dubai? Climate-controlled door-to-door rides for vet visits, grooming, boarding and DXB / DWC transfers — calm, on time.',
    'Need pet transport within Dubai? Book climate-controlled, door-to-door rides for vet visits, grooming, boarding and DXB/DWC airport transfers.',
  ],

  // 7. Route / Extras formatting
  [
    '· BOM · JFK',
    '/ BOM · JFK',
  ],
  [
    '\xb7 BOM \xb7 JFK',
    '/ BOM \xb7 JFK',
  ],
  [
    '· LHR · JFK',
    '/ LHR · JFK',
  ],
  [
    '\xb7 LHR \xb7 JFK',
    '/ LHR \xb7 JFK',
  ],
  [
    '· VET · GROOMING',
    '/ VET · GROOMING',
  ],
  [
    '\xb7 VET \xb7 GROOMING',
    '/ VET · GROOMING',
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
console.log(`Patched ${touched} files under .next for Three Customer Journeys`);
