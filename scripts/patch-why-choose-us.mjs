import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

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

const textPairs = [
  // Heading
  [
    'Combining Warmth with Logistics Rigor',
    'Pet-First Care With End-to-End Relocation Support',
  ],

  // Intro
  [
    'We understand that your pet is family. Here is how we ensure their safety and peace of mind on every journey.',
    'From local pet transport in Dubai to international relocation, we combine careful pet handling with organised travel logistics.',
  ],

  // Card 1
  [
    'Every ride and flight plan prioritizes your pet’s physical comfort, hydration, and stress reduction.',
    "Every ride and relocation plan is built around your pet's comfort, hydration and stress reduction.",
  ],
  [
    "Every ride and flight plan prioritizes your pet's physical comfort, hydration, and stress reduction.",
    "Every ride and relocation plan is built around your pet's comfort, hydration and stress reduction.",
  ],

  // Card 2
  [
    'Transparent Instant Pricing',
    'Transparent Pet Taxi Pricing',
  ],
  [
    'No hidden surprise fees. Calculate estimated Dubai Pet Taxi fares instantly based on real driving distance.',
    'Get an estimated Dubai pet taxi fare based on actual driving distance, with clear pricing and no surprise fees.',
  ],

  // Card 3
  [
    'One unified team managing local Dubai door-to-door rides and cross-border international moves.',
    'One team for Dubai pet transport, airport transfers and international pet relocation.',
  ],

  // Card 4
  [
    'Sanitized Climate Fleet',
    'IPATA Membership',
  ],
  [
    'Specially converted vehicles with dual climate control suitable for extreme Dubai temperatures.',
    'As an IPATA member, Global Pet Cab is part of a professional network focused on pet transportation and relocation.',
  ],
];

let touched = 0;

for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  let next = s;

  // 1. Text replacements
  for (const [from, to] of textPairs) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }

  // 2. In index.html: remove cards 5 & 6 and adjust grid to 4 columns
  if (file.endsWith('index.html')) {
    const card5Start = next.indexOf('<article class="group rounded-[28px] overflow-hidden bg-white border border-teal-border shadow-fj-card hover:-translate-y-1 hover:shadow-fj-card-hover transition-all duration-300"><div class="relative h-48 overflow-hidden"><img alt="Handler with a golden retriever"');
    const cardsEnd = next.indexOf('</div></div></section><section class="py-20 sm:py-24 bg-[#F6F8FA]');
    if (card5Start !== -1 && cardsEnd !== -1 && card5Start < cardsEnd) {
      next = next.substring(0, card5Start) + next.substring(cardsEnd);
      next = next.replace(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7',
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      );
    }
  }

  // 3. In page.js: trim h array from 6 items to 4 items and adjust grid
  if (file.endsWith('server/app/page.js')) {
    const card5Token = ',{icon:d,title:"Certified Pet Handlers"';
    const hEndToken = '];function m(){';
    const c5Idx = next.indexOf(card5Token);
    const endIdx = next.indexOf(hEndToken);
    if (c5Idx !== -1 && endIdx !== -1 && c5Idx < endIdx) {
      next = next.substring(0, c5Idx) + next.substring(endIdx);
      next = next.replace(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7',
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      );
    }
  }

  if (next !== s) {
    fs.writeFileSync(file, next);
    touched++;
    console.log(`Patched: ${path.relative(path.join(root, '..'), file)}`);
  }
}

console.log(`Patched ${touched} files under .next for Why Pet Parents Choose Us`);
