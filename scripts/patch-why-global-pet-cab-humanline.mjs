import fs from 'fs';

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

function makeRscHumanLinePlain(humanLine) {
  return `,["$","div",null,{"className":"mt-4 pt-3.5 border-t border-slate-100 flex items-start gap-2.5","children":[["$","span",null,{"className":"inline-flex items-center text-teal-deep shrink-0 mt-0.5","children":["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":16,"height":16,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-heart-handshake text-teal-deep","children":[["$","path","c3ymky",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],["$","path","4oyue0",{"d":"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"}],["$","path","60u0ii",{"d":"m18 15-2-2"}],["$","path","6p76be",{"d":"m15 18-2-2"}],"$undefined"]}]}],["$","p",null,{"className":"text-sm sm:text-[15px] font-semibold text-teal-900/90 italic leading-snug","children":"${humanLine}"}]]}]`;
}

function makeRscHumanLineEscaped(humanLine) {
  const plain = makeRscHumanLinePlain(humanLine);
  return plain.replace(/"/g, '\\"');
}

// 1. Update .next/server/app/why-global-pet-cab.rsc
const rscPath = '.next/server/app/why-global-pet-cab.rsc';
let rsc = fs.readFileSync(rscPath, 'utf8');

for (const c of cards) {
  const oldCardP = `["$","p",null,{"className":"mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl","children":"${c.copy}"}]`;
  const newCardP = oldCardP + makeRscHumanLinePlain(c.humanLine);
  if (rsc.includes(oldCardP) && !rsc.includes(c.humanLine)) {
    rsc = rsc.replace(oldCardP, newCardP);
    console.log(`Added human line to RSC for "${c.title}"`);
  }
}
fs.writeFileSync(rscPath, rsc, 'utf8');
console.log('Saved .next/server/app/why-global-pet-cab.rsc');

// 2. Update inlined script in .next/server/app/why-global-pet-cab.html
const htmlPath = '.next/server/app/why-global-pet-cab.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const scriptIdx = html.indexOf('<script>(self.__next_f');
if (scriptIdx !== -1) {
  let domPart = html.substring(0, scriptIdx);
  let scriptPart = html.substring(scriptIdx);

  for (const c of cards) {
    const oldCardPEsc = `[\\\"$\\\",\\\"p\\\",null,{\\\"className\\\":\\\"mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl\\\",\\\"children\\\":\\\"${c.copy}\\\"}]`;
    const newCardPEsc = oldCardPEsc + makeRscHumanLineEscaped(c.humanLine);
    if (scriptPart.includes(oldCardPEsc) && !scriptPart.includes(c.humanLine)) {
      scriptPart = scriptPart.replace(oldCardPEsc, newCardPEsc);
      console.log(`Added human line to HTML script for "${c.title}"`);
    }
  }

  html = domPart + scriptPart;
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Saved inlined script in .next/server/app/why-global-pet-cab.html');
}
