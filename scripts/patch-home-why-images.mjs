import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page, section "Why Pet Parents Choose Us" (heading "Pet-First Care With End-to-End Relocation Support"): one photo per card, matched by card title.
 * The cards are the array in .next/server/app/page.js; the /why-global-pet-cab page has its own cards and is not touched. Idempotent.
 */
const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'server', 'app', 'page.js');
let t = fs.readFileSync(file, 'utf8');
const CARDS = [
  ['Pet-First Decisions', '/banners/why-comfort.webp', 'A golden retriever and a cat resting comfortably in a pet bed on the back seat, with the Dubai skyline outside'],
  ['Transparent Pet Taxi Pricing', '/banners/why-pricing.webp', 'A pet taxi app showing a distance-based fare with no hidden fees, next to a golden retriever in the back seat'],
  ['Local Dubai + Global Reach', '/banners/why-reach.webp', 'A Global Pet Cab van, a dog and cat with their travel crate and passport, the Dubai skyline and a world route map'],
  ['IPATA Membership', '/banners/why-ipata.webp', 'Global Pet Cab logo above the IPATA member logo, the International Pet and Animal Transportation Association'],
  ['Certified Pet Handlers', '/banners/why-handlers.webp', 'A Global Pet Cab handler gently holding a Shih Tzu next to a travel crate, with the Dubai skyline behind'],
  ['Direct WhatsApp Support', '/banners/why-whatsapp.webp', 'A Global Pet Cab support agent with a headset, and a WhatsApp chat sharing a live update with a photo of the pet'],
];
let n = 0;
for (const [title, src, alt] of CARDS) {
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(title:${esc(JSON.stringify(title))},desc:"(?:[^"\\\\]|\\\\.)*",img:)"[^"]*"(,alt:)"[^"]*"`);
  if (!re.test(t)) throw new Error('patch-home-why-images: card not found: ' + title);
  const u = t.replace(re, (m, a, b) => `${a}${JSON.stringify(src)}${b}${JSON.stringify(alt)}`);
  if (u !== t) { t = u; n++; }
}
if (n) { fs.writeFileSync(file, t); console.log('home why images: updated ' + n + ' cards'); } else console.log('home why images: already');
