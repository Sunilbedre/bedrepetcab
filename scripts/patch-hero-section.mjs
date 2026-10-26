import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const newHeading = 'Pet Relocation in Dubai, Made Simple From Start to Safe Arrival';
const newBadge = 'PET RELOCATION SERVICES IN DUBAI';
const newPrimaryCta = 'Get a Free Pet Relocation Quote';
const newSecondaryCta = 'Chat with Us on WhatsApp';

const p1Text = 'Moving your pet across borders involves more than booking a flight. From travel planning and documentation to customs coordination, the right travel crate and arrival arrangements, Global Pet Cab manages the journey end to end.';
const p2Text = 'Our pet relocation team helps pet parents move their dogs and cats safely to and from Dubai, with one team coordinating the journey from the first call to safe arrival.';

const pairs = [
  // 1. Eyebrow badge
  [
    "DUBAI'S TRUSTED PET RELOCATION TEAM",
    newBadge,
  ],
  [
    "DUBAI&#x27;S TRUSTED PET RELOCATION TEAM",
    newBadge,
  ],

  // 2. Main Hero H1 in JS and HTML (2 lines, balanced font size)
  [
    '>Wherever you&#x27;re moving, your pet gets there safely.</h1>',
    '>Pet Relocation in Dubai,<br class="hidden sm:inline"/> Made Simple From Start to Safe Arrival</h1>',
  ],
  [
    '>Wherever you\'re moving, your pet gets there safely.</h1>',
    '>Pet Relocation in Dubai,<br class="hidden sm:inline"/> Made Simple From Start to Safe Arrival</h1>',
  ],
  [
    'leading-[1.08]",children:"Wherever you\'re moving, your pet gets there safely."',
    'text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]",style:{fontSize:"45px"},children:["Pet Relocation in Dubai,",(0,s.jsx)("br",{className:"hidden sm:inline"})," Made Simple From Start to Safe Arrival"]',
  ],
  [
    'leading-[1.15]",children:"Wherever you\'re moving, your pet gets there safely."',
    'text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]",style:{fontSize:"45px"},children:["Pet Relocation in Dubai,",(0,s.jsx)("br",{className:"hidden sm:inline"})," Made Simple From Start to Safe Arrival"]',
  ],
  [
    'leading-[1.08]",children:"Pet Relocation in Dubai, Made Simple From Start to Safe Arrival"',
    'leading-[1.15]",style:{fontSize:"45px"},children:["Pet Relocation in Dubai,",(0,s.jsx)("br",{className:"hidden sm:inline"})," Made Simple From Start to Safe Arrival"]',
  ],
  [
    'text-4xl sm:text-5xl lg:text-[56px] font-black font-heading text-white tracking-tight leading-[1.08]',
    'text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]',
  ],
  [
    'text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-white tracking-tight leading-[1.15]',
    'text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]',
  ],
  [
    'leading-[1.08]">Wherever you&#x27;re moving, your pet gets there safely.</h1>',
    'leading-[1.15]">Pet Relocation in Dubai,<br class="hidden sm:inline"/> Made Simple From Start to Safe Arrival</h1>',
  ],
  [
    'leading-[1.15]">Pet Relocation in Dubai, Made Simple From Start to Safe Arrival</h1>',
    'leading-[1.15]">Pet Relocation in Dubai,<br class="hidden sm:inline"/> Made Simple From Start to Safe Arrival</h1>',
  ],

  // 3. Subtitle description in index.html
  [
    '<p class="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl">Cargo safety, customs paperwork, the right crate, the timing — we handle the entire journey end to end, so you can focus on the reunion. One team that owns your pet&#x27;s trip from first call to safe arrival.</p>',
    `<div class="space-y-3 max-w-2xl text-base sm:text-lg text-slate-300 font-body leading-relaxed"><p>${p1Text}</p><p>${p2Text}</p></div>`,
  ],

  // Subtitle description in page.js and client chunk
  [
    `children:"Cargo safety, customs paperwork, the right crate, the timing — we handle the entire journey end to end, so you can focus on the reunion. One team that owns your pet's trip from first call to safe arrival."})`,
    `children:["${p1Text}",(0,s.jsx)("span",{className:"block mt-3",children:"${p2Text}"})]})`,
  ],

  // 4. Hero Primary CTA: font-size, padding, whitespace-nowrap
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95"><span>Get a free quote</span>',
    `px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95"><span>${newPrimaryCta}</span>`,
  ],
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95"><span>Get a Free Pet Relocation Quote</span>',
    'px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95"><span>Get a Free Pet Relocation Quote</span>',
  ],
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95",children:[(0,s.jsx)("span",{children:"Get a free quote"})',
    `px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95",children:[(0,s.jsx)("span",{children:"${newPrimaryCta}"})`,
  ],
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95",children:[(0,s.jsx)("span",{children:"Get a Free Pet Relocation Quote"})',
    'px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95",children:[(0,s.jsx)("span",{children:"Get a Free Pet Relocation Quote"})',
  ],
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95",children:[s.jsx("span",{children:"Get a free quote"})',
    `px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95",children:[s.jsx("span",{children:"${newPrimaryCta}"})`,
  ],
  [
    'px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95",children:[s.jsx("span",{children:"Get a Free Pet Relocation Quote"})',
    'px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-fj-coral text-sm sm:text-base whitespace-nowrap transition-all transform active:scale-95",children:[s.jsx("span",{children:"Get a Free Pet Relocation Quote"})',
  ],

  // 5. Hero Secondary CTA: font-size, padding, whitespace-nowrap
  [
    'px-7 py-4 rounded-full border border-white/20 backdrop-blur-md text-base sm:text-lg transition-all',
    'px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full border border-white/20 backdrop-blur-md text-sm sm:text-base whitespace-nowrap transition-all',
  ],
  [
    '<span>Chat on WhatsApp</span></a></div></div><div class="lg:col-span-5 flex flex-col items-center justify-center relative">',
    `<span>${newSecondaryCta}</span></a></div></div><div class="lg:col-span-5 flex flex-col items-center justify-center relative">`,
  ],
  [
    'backdrop-blur-md text-base sm:text-lg transition-all",children:[(0,s.jsx)(c.Z,{className:"w-5 h-5 text-emerald-400"}),(0,s.jsx)("span",{children:"Chat on WhatsApp"})',
    `backdrop-blur-md text-sm sm:text-base whitespace-nowrap transition-all",children:[(0,s.jsx)(c.Z,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0"}),(0,s.jsx)("span",{children:"${newSecondaryCta}"})`,
  ],
  [
    'backdrop-blur-md text-base sm:text-lg transition-all",children:[s.jsx(c.Z,{className:"w-5 h-5 text-emerald-400"}),s.jsx("span",{children:"Chat on WhatsApp"})',
    `backdrop-blur-md text-sm sm:text-base whitespace-nowrap transition-all",children:[s.jsx(c.Z,{className:"w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0"}),s.jsx("span",{children:"${newSecondaryCta}"})`,
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
console.log(`Patched ${touched} files under .next for Hero section`);
