import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /why-global-pet-cab, the six cards under "Combining Warmth with Logistics Rigor" (intro "From local pet transport in Dubai to international relocation ..."):
 *   Pet-First Decisions         -> why-handlers.webp  (handler holding a Shih Tzu)
 *   Transparent Pricing         -> why-pricing.webp   (fare on the phone)
 *   Local Dubai + Global Reach  -> why-reach.webp     (van, skyline, world map)
 *   Climate-Controlled Fleet    -> why-comfort.webp   (dog and cat in the car)
 *   Experienced Pet Handlers    -> why-ipata.webp     (Global Pet Cab + IPATA logos)
 *   Direct WhatsApp Support     -> why-whatsapp.webp  (support agent with the chat)
 * (the same photo files the home page cards use). Patches the compiled page, the prerendered html and the rsc, including the image alt texts.
 * Cards 1 and 5 shared one stock photo, so they are told apart by their order on the page. Idempotent.
 */
const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'server', 'app');
const B = '/banners/';
// [stock photo id, local file, old alt, new alt]; the two uses of 1548199973 are in card order (1st = Pet-First, 2nd = Experienced Pet Handlers)
const CARDS = [
  ['1548199973', 'why-handlers.webp', 'Pets resting comfortably together', 'A Global Pet Cab handler gently holding a Shih Tzu next to a travel crate, with the Dubai skyline behind'],
  ['1568605117036', 'why-pricing.webp', 'City transfer on the road', 'A pet taxi app showing a distance-based fare with no hidden fees, next to a golden retriever in the back seat'],
  ['1529074963764', 'why-reach.webp', 'International flight above the clouds', 'A Global Pet Cab van, a dog and cat with their travel crate and passport, the Dubai skyline and a world route map'],
  ['1444212477490', 'why-comfort.webp', 'Pet looking out from a climate-controlled vehicle', 'A golden retriever and a cat resting comfortably in a pet bed on the back seat, with the Dubai skyline outside'],
  ['1548199973', 'why-ipata.webp', 'Handler with a golden retriever', 'Global Pet Cab logo above the IPATA member logo, the International Pet and Animal Transportation Association'],
  ['1516321497487', 'why-whatsapp.webp', 'Team coordinating live pet travel updates', 'A Global Pet Cab support agent with a headset, and a WhatsApp chat sharing a live update with a photo of the pet'],
];
const rawRe = (id) => new RegExp(`https://images\\.unsplash\\.com/photo-${id}-[0-9a-f]+\\?auto=format(?:&amp;|&|\\\\u0026)fit=crop(?:&amp;|&|\\\\u0026)w=900(?:&amp;|&|\\\\u0026)q=\\d+`, 'g');
const encRe = (id) => new RegExp(`https%3A%2F%2Fimages\\.unsplash\\.com%2Fphoto-${id}-[0-9a-f]+%3Fauto%3Dformat%26fit%3Dcrop%26w%3D900%26q%3D\\d+`, 'g');

const done = [];
for (const f of ['why-global-pet-cab/page.js', 'why-global-pet-cab.html', 'why-global-pet-cab.rsc']) {
  const fp = path.join(APP, f);
  if (!fs.existsSync(fp)) continue;
  const t = fs.readFileSync(fp, 'utf8');
  let u = t;
  // url-encoded forms live inside <img> tags (html only): handle tag by tag, so shared photos map by card order
  if (f.endsWith('.html')) {
    const seen = {};
    u = u.replace(/<img [^>]*>/g, (tag) => {
      for (let k = 0; k < CARDS.length; k++) {
        const [id, file] = CARDS[k];
        if (!tag.includes(`photo-${id}-`) || !/w%3D900/.test(tag)) continue;
        const n = (seen[id] = (seen[id] || 0) + 1);
        const idx = CARDS.findIndex((c, j) => c[0] === id && (id !== '1548199973' || j === (n === 1 ? 0 : 4)));
        const [, fl, oldAlt, newAlt] = CARDS[idx];
        return tag.replace(encRe(id), encodeURIComponent(B + fl)).replace(oldAlt, newAlt);
      }
      return tag;
    });
  }
  // raw forms (js, rsc and the flight data in the html): in card order
  const seenRaw = {};
  for (const id of [...new Set(CARDS.map((c) => c[0]))]) {
    u = u.replace(rawRe(id), () => {
      const n = (seenRaw[id] = (seenRaw[id] || 0) + 1);
      const idx = CARDS.findIndex((c, j) => c[0] === id && (id !== '1548199973' || j === (n === 1 ? 0 : 4)));
      return B + CARDS[idx][1];
    });
  }
  for (const [, , oldAlt, newAlt] of CARDS) u = u.split(oldAlt).join(newAlt);
  if (u !== t) { fs.writeFileSync(fp, u); done.push(f); }
}
console.log('why cards images: ' + (done.length ? done.join(', ') : 'already'));
