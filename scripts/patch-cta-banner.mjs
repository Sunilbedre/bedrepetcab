import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const newHeading = 'Moving Your Pet? Let Global Pet Cab Handle the Journey.';
const newSupport = "Get an instant estimate for pet transport in Dubai or speak with our team about international pet relocation. From local rides to cross-border journeys, we'll help you plan the next step.";
const newSupportHtml = "Get an instant estimate for pet transport in Dubai or speak with our team about international pet relocation. From local rides to cross-border journeys, we&#x27;ll help you plan the next step.";

const pairs = [
  // CTA 1
  [
    'Calculate Dubai Taxi Fare',
    'Calculate Dubai Pet Taxi Fare',
  ],

  // CTA 2
  [
    'Get International Quote',
    'Get an International Pet Relocation Quote',
  ],

  // In page.js banner
  [
    `tracking-tight whitespace-nowrap",children:"Wherever you're moving, your pet gets there safely."}),s.jsx("p",{className:"text-base sm:text-lg font-body text-slate-300 max-w-xl mx-auto",children:"Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance."})`,
    `tracking-tight",children:"${newHeading}"}),s.jsx("p",{className:"text-base sm:text-lg font-body text-slate-300 max-w-xl mx-auto",children:"${newSupport}"})`,
  ],

  // In about/page.js banner
  [
    `tracking-tight",children:"Wherever you're moving, your pet gets there safely."}),s.jsx("p",{className:"text-base sm:text-lg text-white/70 max-w-xl mx-auto",children:"Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance."})`,
    `tracking-tight",children:"${newHeading}"}),s.jsx("p",{className:"text-base sm:text-lg text-white/70 max-w-xl mx-auto",children:"${newSupport}"})`,
  ],

  // In index.html banner
  [
    `<h2 class="text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight whitespace-nowrap">Wherever you&#x27;re moving, your pet gets there safely.</h2><p class="text-base sm:text-lg font-body text-slate-300 max-w-xl mx-auto">Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance.</p>`,
    `<h2 class="text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight">${newHeading}</h2><p class="text-base sm:text-lg font-body text-slate-300 max-w-xl mx-auto">${newSupportHtml}</p>`,
  ],

  // In about.html banner
  [
    `<h2 class="text-3xl sm:text-5xl font-black font-heading tracking-tight">Wherever you&#x27;re moving, your pet gets there safely.</h2><p class="text-base sm:text-lg text-white/70 max-w-xl mx-auto">Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance.</p>`,
    `<h2 class="text-3xl sm:text-5xl font-black font-heading tracking-tight">${newHeading}</h2><p class="text-base sm:text-lg text-white/70 max-w-xl mx-auto">${newSupportHtml}</p>`,
  ],

  // In rsc streams if present
  [
    'Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance.',
    newSupport,
  ],

  // In RSC stream (un-escaped JSON)
  [
    `tracking-tight whitespace-nowrap","children":"Wherever you're moving, your pet gets there safely."}`,
    `tracking-tight","children":"${newHeading}"}`,
  ],
  [
    `font-heading tracking-tight","children":"Wherever you're moving, your pet gets there safely."}`,
    `font-heading tracking-tight","children":"${newHeading}"}`,
  ],

  // In RSC stream (escaped JSON in HTML)
  [
    `tracking-tight whitespace-nowrap\\",\\"children\\":\\"Wherever you're moving, your pet gets there safely.\\"}`,
    `tracking-tight\\",\\"children\\":\\"${newHeading}\\"}`,
  ],
  [
    `font-heading tracking-tight\\",\\"children\\":\\"Wherever you're moving, your pet gets there safely.\\"}`,
    `font-heading tracking-tight\\",\\"children\\":\\"${newHeading}\\"}`,
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
console.log(`Patched ${touched} files under .next for CTA conversion banner`);
