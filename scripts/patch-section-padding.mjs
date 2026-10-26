import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

// Restores the original spacious, premium section paddings
// py-20 (80px) on mobile, sm:py-24 (96px) on desktop
const pairs = [
  // 1. Hero section
  [
    'pt-10 sm:pt-14 pb-20 sm:pb-24 lg:pb-28 font-body',
    'pt-12 sm:pt-16 pb-24 lg:pb-32 font-body',
  ],
  [
    'pt-10 sm:pt-14 pb-16 lg:pb-20 font-body',
    'pt-12 sm:pt-16 pb-24 lg:pb-32 font-body',
  ],
  [
    'pt-10 sm:pt-14 pb-24 lg:pb-32 font-body',
    'pt-12 sm:pt-16 pb-24 lg:pb-32 font-body',
  ],
  [
    'pb-20 sm:pb-24 lg:pb-28',
    'pb-24 lg:pb-32',
  ],
  [
    'pb-16 lg:pb-20',
    'pb-24 lg:pb-32',
  ],

  // 2. Mobility Service Section
  [
    'pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12 bg-white',
    'pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white',
  ],
  [
    'pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 bg-white',
    'pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white',
  ],
  [
    'pt-32 sm:pt-36 lg:pt-40 pb-12 bg-white',
    'pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white',
  ],
  [
    'pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 bg-white',
    'pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white',
  ],
  [
    'pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-12',
    'pt-32 sm:pt-36 lg:pt-40 pb-20',
  ],
  [
    'pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12',
    'pt-32 sm:pt-36 lg:pt-40 pb-20',
  ],
  [
    'pt-32 sm:pt-36 lg:pt-40 pb-12',
    'pt-32 sm:pt-36 lg:pt-40 pb-20',
  ],
  [
    'pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20',
    'pt-32 sm:pt-36 lg:pt-40 pb-20',
  ],

  // 3. Three Journeys Section
  [
    'py-10 sm:py-12 bg-[#F6F8FA] border-t border-teal-border',
    'py-20 sm:py-24 bg-[#F6F8FA] border-t border-teal-border',
  ],
  [
    'py-16 sm:py-20 bg-[#F6F8FA] border-t border-teal-border',
    'py-20 sm:py-24 bg-[#F6F8FA] border-t border-teal-border',
  ],
  [
    'py-10 sm:py-12 bg-teal-soft/40 border-t border-teal-border',
    'py-20 bg-teal-soft/40 border-t border-teal-border',
  ],
  [
    'py-16 sm:py-20 bg-teal-soft/40 border-t border-teal-border',
    'py-20 bg-teal-soft/40 border-t border-teal-border',
  ],

  // 4. Questions Pet Parents Ask Section
  [
    'py-10 sm:py-12 hq-elegant',
    'py-20 sm:py-24 hq-elegant',
  ],
  [
    'py-16 sm:py-20 hq-elegant',
    'py-20 sm:py-24 hq-elegant',
  ],
  [
    'py-20 sm:py-28 hq-elegant',
    'py-20 sm:py-24 hq-elegant',
  ],
  [
    'py-10 sm:py-12 bg-white border-t border-teal-border',
    'py-20 bg-white border-t border-teal-border',
  ],
  [
    'py-16 sm:py-20 bg-white border-t border-teal-border',
    'py-20 bg-white border-t border-teal-border',
  ],
  [
    'py-16 sm:py-16 sm:py-20 bg-white border-t border-teal-border',
    'py-20 bg-white border-t border-teal-border',
  ],

  // 5. Why Choose Us Section
  [
    'py-10 sm:py-12 bg-teal-soft/50 border-t border-teal-border',
    'py-20 bg-teal-soft/50 border-t border-teal-border',
  ],
  [
    'py-16 sm:py-20 bg-teal-soft/50 border-t border-teal-border',
    'py-20 bg-teal-soft/50 border-t border-teal-border',
  ],
  [
    'py-10 sm:py-12 bg-white',
    'py-20 sm:py-24 bg-white',
  ],
  [
    'py-16 sm:py-20 bg-white',
    'py-20 sm:py-24 bg-white',
  ],
  [
    'py-20 sm:py-28 bg-white',
    'py-20 sm:py-24 bg-white',
  ],

  // 6. Pet Journey Gallery (Stories / Reviews)
  [
    'py-10 sm:py-12 bg-[#F6F8FA] border-t border-teal-border overflow-hidden',
    'py-20 sm:py-24 bg-[#F6F8FA] border-t border-teal-border overflow-hidden',
  ],
  [
    'py-16 sm:py-20 bg-[#F6F8FA] border-t border-teal-border overflow-hidden',
    'py-20 sm:py-24 bg-[#F6F8FA] border-t border-teal-border overflow-hidden',
  ],

  // 7. Final Conversion Banner
  [
    'text-white py-12 sm:py-14',
    'text-white py-20 sm:py-24',
  ],
  [
    'text-white py-16 sm:py-20',
    'text-white py-20 sm:py-24',
  ],
  [
    'text-white py-12 sm:py-14 border-t border-slate-800',
    'text-white py-20 sm:py-24 border-t border-slate-800',
  ],
  [
    'text-white py-16 sm:py-20 border-t border-slate-800',
    'text-white py-20 sm:py-24 border-t border-slate-800',
  ],

  // 8. Internal section title margins (original spacious margins)
  [
    'mb-8 space-y-3',
    'mb-14 space-y-3',
  ],
  [
    'mb-12 sm:mb-14 space-y-3',
    'mb-14 space-y-3',
  ],
  [
    'mb-6 sm:mb-8 space-y-2',
    'mb-10 space-y-2',
  ],
  [
    'mb-10 sm:mb-12 space-y-2',
    'mb-10 space-y-2',
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

const files = walk(root);
let patched = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  for (const [from, to] of pairs) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
    }
  }

  // General cleanup
  content = content.replaceAll('py-16 sm:py-16 sm:py-20', 'py-20 sm:py-24');
  content = content.replaceAll('sm:py-16 sm:py-20', 'sm:py-24');

  if (content !== original) {
    fs.writeFileSync(file, content);
    patched++;
    console.log(`Patched padding: ${path.relative(root, file)}`);
  }
}

console.log(`Patched ${patched} files under .next for Section Padding`);
