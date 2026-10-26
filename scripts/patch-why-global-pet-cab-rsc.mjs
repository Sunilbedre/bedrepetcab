import fs from 'fs';

const replacements = [
  // 1. Hero copy
  [
    'Combining professional mobility logistics with genuine warmth for pet family members.',
    'Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs.',
  ],

  // 2. Section 2 Header
  [
    'Pet-First Care With End-to-End Relocation Support',
    'Combining Warmth with Logistics Rigor',
  ],

  // 3. Section 2 Intro
  [
    'From local pet transport in Dubai to international relocation, we combine careful pet handling with organised travel logistics.',
    'We understand that your pet is family. And when a family member is travelling, the details matter. From a short Dubai pet taxi ride to a move across borders, there is always more happening behind the scenes than the journey itself. Our role is to bring the practical side of pet transport and relocation together with careful handling, clear communication and attention to the individual journey.',
  ],

  // 4. Card 1
  [
    "Every ride and relocation plan is built around your pet's comfort, hydration and stress reduction.",
    "Every journey starts with the pet, not just the route. We consider your pet's comfort, handling needs and the practical details of the journey before the ride or relocation is arranged. Because the easiest journey on paper is not always the easiest one for a pet.",
  ],

  // 5. Card 2
  [
    'Transparent Pet Taxi Pricing',
    'Transparent Pricing',
  ],
  [
    'Get an estimated Dubai pet taxi fare based on actual driving distance, with clear pricing and no surprise fees.',
    'You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book. Clear information makes it easier to make the right decision for your pet.',
  ],

  // 6. Card 3
  [
    'One team for Dubai pet transport, airport transfers and international pet relocation.',
    'Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai. One pet. One journey. Wherever that journey needs to go.',
  ],

  // 7. Card 4
  [
    'IPATA Membership',
    'Climate-Controlled Fleet',
  ],
  [
    'As an IPATA member, Global Pet Cab is part of a professional network focused on pet transportation and relocation.',
    "Dubai's climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city. Because your pet should never have to choose between getting there and staying comfortable.",
  ],

  // 8. Card 5
  [
    'Certified Pet Handlers',
    'Experienced Pet Handlers',
  ],
  [
    'Trained staff experienced in handling anxious pets, brachycephalic breeds, and multi-pet families.',
    'Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families. Patience matters when your passenger has four legs and cannot tell you how they are feeling.',
  ],

  // 9. Card 6
  [
    'Speak directly with real relocation specialists and receive live updates throughout your pet’s ride.',
    'Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet\'s journey. Sometimes you just want to ask, \'How is my pet?\' — and know who to ask.',
  ],
];

// Target files:
// 1. .next/server/app/why-global-pet-cab.rsc
// 2. .next/server/app/why-global-pet-cab.html (for the script part)

const rscPath = '.next/server/app/why-global-pet-cab.rsc';
if (fs.existsSync(rscPath)) {
  let rsc = fs.readFileSync(rscPath, 'utf8');
  for (const [from, to] of replacements) {
    if (rsc.includes(from)) {
      rsc = rsc.split(from).join(to);
      console.log(`Replaced in .rsc: "${from.slice(0, 30)}..."`);
    }
  }
  fs.writeFileSync(rscPath, rsc, 'utf8');
  console.log('Saved .next/server/app/why-global-pet-cab.rsc');
}

const htmlPath = '.next/server/app/why-global-pet-cab.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const scriptIdx = html.indexOf('<script>(self.__next_f');
if (scriptIdx !== -1) {
  let domPart = html.substring(0, scriptIdx);
  let scriptPart = html.substring(scriptIdx);

  for (const [from, to] of replacements) {
    // In JSON strings, quotes or characters might be escaped
    const jsonFrom = JSON.stringify(from).slice(1, -1);
    const jsonTo = JSON.stringify(to).slice(1, -1);

    if (scriptPart.includes(jsonFrom)) {
      scriptPart = scriptPart.split(jsonFrom).join(jsonTo);
      console.log(`Replaced JSON in script: "${from.slice(0, 30)}..."`);
    } else if (scriptPart.includes(from)) {
      scriptPart = scriptPart.split(from).join(to);
      console.log(`Replaced plain in script: "${from.slice(0, 30)}..."`);
    }
  }

  html = domPart + scriptPart;
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Saved script part of .next/server/app/why-global-pet-cab.html');
}
