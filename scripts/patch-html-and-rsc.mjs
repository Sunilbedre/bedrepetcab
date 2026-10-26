import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== STARTING CLEAN HTML & RSC PATCH FOR /international-pet-relocation ===');

// -------------------------------------------------------------------------------------
// 1. UPDATE .next/server/app/international-pet-relocation.rsc
// -------------------------------------------------------------------------------------
const rscPath = path.join(root, '.next/server/app/international-pet-relocation.rsc');
const origRsc = execSync('git show 09e691e:.next/server/app/international-pet-relocation.rsc').toString();

const lines = origRsc.split('\n');
const line0Idx = lines.findIndex((l) => l.startsWith('0:'));
const parsedRsc = JSON.parse(lines[line0Idx].slice(2));

// Replace page tree:
parsedRsc[1][0][1][1].children[1].children[2] = [
  [
    '$L1',
    [
      '$',
      'div',
      null,
      {
        className: 'font-body space-y-0 text-slate-800',
        children: [
          ['$', '$L2', null, {}],
          ['$', '$L3', null, {}],
        ],
      },
    ],
  ],
];

lines[line0Idx] = '0:' + JSON.stringify(parsedRsc);
const finalRsc = lines.join('\n');
fs.writeFileSync(rscPath, finalRsc);
console.log('Successfully written clean .next/server/app/international-pet-relocation.rsc');

// -------------------------------------------------------------------------------------
// 2. GENERATE FULL PRE-RENDERED 10-SECTION HTML
// -------------------------------------------------------------------------------------
function generateFullPageHtml() {
  // Read the HTML we generated in scripts/apply-full-redesign.mjs or craft it cleanly
  const existingHtml = fs.readFileSync(path.join(root, '.next/server/app/international-pet-relocation.html'), 'utf8');
  const mainMatch = existingHtml.match(/<main class="flex-grow">(.*?)<\/main>/s);
  if (mainMatch && mainMatch[1].includes('International Pet Relocation from Dubai, Made Simple')) {
    let html = mainMatch[1];
    html = html.replace('photo-1548199973-03cce0bbc87b', 'photo-1587300003388-59208cc962cb');
    html = html.replace('bg-navy/75', 'bg-navy/72');
    html = html.replace('from-navy-dark/95 via-navy/80 to-navy/40', 'from-navy-dark/90 via-navy/70 to-navy/40');
    return html;
  }

  throw new Error('Could not extract pre-rendered HTML from existing html file');
}

const fullPageHtml = generateFullPageHtml();
console.log('Extracted pre-rendered 10-section HTML (length:', fullPageHtml.length, ')');

// -------------------------------------------------------------------------------------
// 3. UPDATE .next/server/app/international-pet-relocation.html
// -------------------------------------------------------------------------------------
const htmlPath = path.join(root, '.next/server/app/international-pet-relocation.html');
let origHtml = execSync('git show 09e691e:.next/server/app/international-pet-relocation.html').toString();

// Replace <main class="flex-grow">...</main>
origHtml = origHtml.replace(/<main class="flex-grow">.*?<\/main>/s, `<main class="flex-grow">${fullPageHtml}</main>`);

// Replace Flight stream script tag
const prefix = '<script>self.__next_f.push([1,"';
const suffix = '"])</script>';
const match = origHtml.match(/<script>self\.__next_f\.push\(\[1,"0:.*?\]\)\s*<\/script>/gs);
if (!match) throw new Error('Could not find Flight script tag in origHtml');

const str = match[0].slice(prefix.length, -suffix.length);
const unescaped = JSON.parse('"' + str + '"');
const parsedObj = JSON.parse(unescaped.slice(2).trim());

const seed = parsedObj[3].initialSeedData[1];
seed.children[1].children[2] = [
  [
    '$L3',
    [
      '$',
      'div',
      null,
      {
        className: 'font-body space-y-0 text-slate-800',
        children: [
          ['$', '$L4', null, {}],
          ['$', '$L5', null, {}],
        ],
      },
    ],
  ],
];

const newPayload = '0:' + JSON.stringify(parsedObj) + '\n';
const newEncodedString = JSON.stringify(newPayload).slice(1, -1);
const newScriptTag = '<script>self.__next_f.push([1,"' + newEncodedString + '"])</script>';

origHtml = origHtml.replace(match[0], newScriptTag);

fs.writeFileSync(htmlPath, origHtml);
console.log('Successfully written clean .next/server/app/international-pet-relocation.html');

console.log('=== HTML AND RSC PATCH COMPLETED SUCCESSFULLY ===');
