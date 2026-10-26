import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const pairs = [
  // 1. Eyebrow
  [
    'Reassurance & Clarity',
    'REASSURANCE & CLARITY',
  ],
  [
    'Reassurance &amp; Clarity',
    'REASSURANCE &amp; CLARITY',
  ],

  // 2. Heading
  [
    'Questions Pet Parents Ask Before Booking',
    'Pet Transport & Relocation Questions, Answered',
  ],

  // 3. Intro
  [
    'We know your pet is family. Here is how we ensure their safety and comfort.',
    'From Dubai pet taxi rides to international pet relocation, here are answers to the questions pet parents ask before booking.',
  ],

  // 4. FAQ 01 Question
  [
    'Will my pet be comfortable during a Dubai summer ride?',
    'Will my pet be comfortable during a Dubai pet taxi ride in summer?',
  ],
  [
    '&quot;Will my pet be comfortable during a Dubai summer ride?&quot;',
    'Will my pet be comfortable during a Dubai pet taxi ride in summer?',
  ],

  // 5. FAQ 01 Answer
  [
    'Yes. Every Global Pet Cab vehicle is custom fitted with heavy-duty dual air-conditioning designed specifically for Middle Eastern heat. Vehicles are pre-cooled prior to pickup so your pet steps into a cool, comfortable environment immediately.',
    'Yes. Global Pet Cab vehicles are fitted with heavy-duty dual air-conditioning designed for Middle Eastern heat and are pre-cooled before pickup, helping your pet travel in a cool and comfortable environment.',
  ],

  // 6. FAQ 02 Answer
  [
    'We use a transparent dynamic fare engine: Base fare (AED 60 including first 5 km) + distance rate (AED 4.5/km) + optional additional pets or night surcharges + 5% UAE VAT. No hidden extra fees.',
    'Your Dubai pet taxi fare is calculated based on the actual driving distance, trip type, number of pets, pickup time and applicable airport surcharges, plus 5% UAE VAT.',
  ],

  // 7. FAQ 03 Answer
  [
    'Pets entering the UAE require an ISO microchip, valid rabies vaccination, a Rabies Neutralizing Antibody Titer Test (RNATT), an official UAE MOCCAE import permit, and an international health certificate. We manage all of these steps for you!',
    'Pets entering the UAE may require an ISO-compatible microchip, valid rabies vaccination, Rabies Neutralizing Antibody Titer Test (RNATT), an official UAE MOCCAE import permit and an international health certificate. Our team can coordinate the required steps.',
  ],

  // 8. FAQ 04 Answer
  [
    'Yes! Our drivers provide doorstep service across Dubai (Downtown, Marina, Palm Jumeirah, JBR, Business Bay, Al Barsha, Mirdif, and beyond), helping carry carriers or guiding leashed pets safely to the vehicle.',
    'Yes. We provide door-to-door pet transport across Dubai, including pickups from residential areas and transfers for vet visits, grooming, boarding and airport travel.',
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
console.log(`Patched ${touched} files under .next for Questions Pet Parents Ask section`);
