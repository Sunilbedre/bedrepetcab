import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Adds the registered legal name (PAWPORT PETS RELOCATION SERVICES L.L.C) to the footer, the About page,
 * and points the footer Privacy / Terms links at the real pages served by legal-pages.js. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const LEGAL = 'PAWPORT PETS RELOCATION SERVICES L.L.C';
const changed = [];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'cache') walk(p, out); }
    else if (/\.(html|rsc|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
const files = [...walk(path.join(ROOT, 'server')), ...walk(path.join(ROOT, 'static', 'chunks'))];

const FOOT_OLD = 'Global Pet Cab. All rights reserved.';
const FOOT_NEW = `Global Pet Cab, a trade name of ${LEGAL}. All rights reserved.`;
const ABOUT_OLD = 'connecting Dubai homes, veterinary centers, and worldwide destinations.';
const ABOUT_NEW = `${ABOUT_OLD} Global Pet Cab is a trade name of ${LEGAL}.`;

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  let n = s;
  if (n.includes(FOOT_OLD)) n = n.split(FOOT_OLD).join(FOOT_NEW);
  if (n.includes(ABOUT_OLD) && !n.includes(ABOUT_NEW)) n = n.split(ABOUT_OLD).join(ABOUT_NEW);
  // footer links (html)
  n = n.replace(/href="\/resources">Privacy Policy</g, 'href="/privacy-policy">Privacy Policy<');
  n = n.replace(/href="\/resources">Terms of Service</g, 'href="/terms-and-conditions">Terms &amp; Conditions<');
  // footer links (compiled js)
  n = n.replace(/href:"\/resources",(className:"hover:text-white transition-colors",children:)"Privacy Policy"/g, 'href:"/privacy-policy",$1"Privacy Policy"');
  n = n.replace(/href:"\/resources",(className:"hover:text-white transition-colors",children:)"Terms of Service"/g, 'href:"/terms-and-conditions",$1"Terms & Conditions"');
  if (n !== s) { fs.writeFileSync(f, n); changed.push(path.relative(ROOT, f)); }
}
console.log(changed.length ? 'legal name patched in:\n  ' + changed.join('\n  ') : 'legal name already present');
