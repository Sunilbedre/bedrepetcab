import fs from 'fs';

// Exact cards data
const cards = [
  {
    num: '01',
    title: 'Pet-First Decisions',
    copy: "Every journey starts with the pet, not just the route. We consider your pet's comfort, handling needs and the practical details of the journey before the ride or relocation is arranged.",
    humanLine: 'Because the easiest journey on paper is not always the easiest one for a pet.',
  },
  {
    num: '02',
    title: 'Transparent Pricing',
    copy: 'You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book.',
    humanLine: 'Clear information makes it easier to make the right decision for your pet.',
  },
  {
    num: '03',
    title: 'Local Dubai + Global Reach',
    copy: 'Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai.',
    humanLine: 'One pet. One journey. Wherever that journey needs to go.',
  },
  {
    num: '04',
    title: 'Climate-Controlled Fleet',
    copy: "Dubai's climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city.",
    humanLine: 'Because your pet should never have to choose between getting there and staying comfortable.',
  },
  {
    num: '05',
    title: 'Experienced Pet Handlers',
    copy: 'Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families.',
    humanLine: 'Patience matters when your passenger has four legs and cannot tell you how they are feeling.',
  },
  {
    num: '06',
    title: 'Direct WhatsApp Support',
    copy: "Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet's journey.",
    humanLine: "Sometimes you just want to ask, 'How is my pet?' — and know who to ask.",
  },
];

function patchContent(content, isJsonInScript = false) {
  let res = content;

  // 1. Separate combined copy + humanLine back into copy and humanLine in paragraph
  for (const c of cards) {
    const combined = `${c.copy} ${c.humanLine}`;
    if (res.includes(combined)) {
      res = res.split(combined).join(c.copy);
      console.log(`Separated combined text for Card "${c.title}"`);
    }
  }

  // 2. CTA Section in RSC
  // Old target inside relative z-10 max-w-4xl
  const oldCtaTargetPlain = 'space-y-6","children":[["$","h2",null,{"className":"text-3xl sm:text-4xl font-black font-heading tracking-tight","children":"Combining Warmth with Logistics Rigor"}],["$","p",null,{"className":"text-base sm:text-lg text-white/70 max-w-xl mx-auto","children":"Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs."}],["$","div",null,{"className":"flex flex-col sm:flex-row justify-center gap-3 pt-2",';

  const newCtaReplacementPlain = 'space-y-6","children":[["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]","children":"OFFICIAL DUBAI PET MOBILITY & RELOCATION LOGISTICS"}],["$","h2",null,{"className":"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight","children":"Instant city ride estimates or expert international pet relocation assistance."}],["$","div",null,{"className":"flex flex-col sm:flex-row justify-center gap-3 pt-2",';

  if (res.includes(oldCtaTargetPlain)) {
    res = res.replace(oldCtaTargetPlain, newCtaReplacementPlain);
    console.log('Replaced CTA section in plain RSC');
  }

  // Also check if escaped for inlined script
  const oldCtaTargetEsc = 'space-y-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"h2\\\",null,{\\\"className\\\":\\\"text-3xl sm:text-4xl font-black font-heading tracking-tight\\\",\\\"children\\\":\\\"Combining Warmth with Logistics Rigor\\\"}],[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"text-base sm:text-lg text-white/70 max-w-xl mx-auto\\\",\\\"children\\\":\\\"Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs.\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex flex-col sm:flex-row justify-center gap-3 pt-2\\\",';

  const newCtaReplacementEsc = 'space-y-6\\\",\\\"children\\\":[[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]\\\",\\\"children\\\":\\\"OFFICIAL DUBAI PET MOBILITY & RELOCATION LOGISTICS\\\"}],[\\\"$\\\",\\\"h2\\\",null,{\\\"className\\\":\\\"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight\\\",\\\"children\\\":\\\"Instant city ride estimates or expert international pet relocation assistance.\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"className\\\":\\\"flex flex-col sm:flex-row justify-center gap-3 pt-2\\\",';

  if (res.includes(oldCtaTargetEsc)) {
    res = res.replace(oldCtaTargetEsc, newCtaReplacementEsc);
    console.log('Replaced CTA section in escaped script RSC');
  }

  return res;
}

// 1. Update .next/server/app/why-global-pet-cab.rsc
const rscPath = '.next/server/app/why-global-pet-cab.rsc';
let rsc = fs.readFileSync(rscPath, 'utf8');
rsc = patchContent(rsc, false);
fs.writeFileSync(rscPath, rsc, 'utf8');
console.log('Saved .next/server/app/why-global-pet-cab.rsc');

// 2. Update inlined script in .next/server/app/why-global-pet-cab.html
const htmlPath = '.next/server/app/why-global-pet-cab.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const scriptIdx = html.indexOf('<script>(self.__next_f');
if (scriptIdx !== -1) {
  let domPart = html.substring(0, scriptIdx);
  let scriptPart = html.substring(scriptIdx);
  scriptPart = patchContent(scriptPart, true);
  html = domPart + scriptPart;
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Saved script part of .next/server/app/why-global-pet-cab.html');
}
