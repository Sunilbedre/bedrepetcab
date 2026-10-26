import fs from 'fs';
import path from 'path';

// 1. Prepare exact card data
const cards = [
  {
    num: '01',
    title: 'Pet-First Decisions',
    copy: "Every journey starts with the pet, not just the route. We consider your pet's comfort, handling needs and the practical details of the journey before the ride or relocation is arranged.",
    humanLine: 'Because the easiest journey on paper is not always the easiest one for a pet.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    alt: 'Pets resting comfortably together',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
  },
  {
    num: '02',
    title: 'Transparent Pricing',
    copy: 'You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book.',
    humanLine: 'Clear information makes it easier to make the right decision for your pet.',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80',
    alt: 'City transfer on the road',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calculator w-5 h-5"><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>',
  },
  {
    num: '03',
    title: 'Local Dubai + Global Reach',
    copy: 'Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai.',
    humanLine: 'One pet. One journey. Wherever that journey needs to go.',
    img: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
    alt: 'International flight above the clouds',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth w-5 h-5"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>',
  },
  {
    num: '04',
    title: 'Climate-Controlled Fleet',
    copy: "Dubai's climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city.",
    humanLine: 'Because your pet should never have to choose between getting there and staying comfortable.',
    img: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=900&q=80',
    alt: 'Pet looking out from a climate-controlled vehicle',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-5 h-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>',
  },
  {
    num: '05',
    title: 'Experienced Pet Handlers',
    copy: 'Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families.',
    humanLine: 'Patience matters when your passenger has four legs and cannot tell you how they are feeling.',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    alt: 'Handler with a golden retriever',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>',
  },
  {
    num: '06',
    title: 'Direct WhatsApp Support',
    copy: "Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet's journey.",
    humanLine: "Sometimes you just want to ask, 'How is my pet?' — and know who to ask.",
    img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    alt: 'Team coordinating live pet travel updates',
    iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  },
];

function buildArticlesHtml() {
  return cards.map((c, idx) => {
    const isAlt = idx % 2 === 1;
    const orderClass = isAlt ? ' lg:[&amp;&gt;div:first-child]:order-2' : '';
    return `<article class="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[32px] bg-white border border-teal-border shadow-fj-card${orderClass}"><div class="relative lg:col-span-5 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"><img alt="${c.alt}" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="(max-width: 1024px) 100vw, 42vw" srcSet="/_next/image?url=${encodeURIComponent(c.img)}&amp;w=384&amp;q=75 384w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=640&amp;q=75 640w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=750&amp;q=75 750w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=828&amp;q=75 828w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=1080&amp;q=75 1080w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=1200&amp;q=75 1200w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=1920&amp;q=75 1920w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=2048&amp;q=75 2048w, /_next/image?url=${encodeURIComponent(c.img)}&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=${encodeURIComponent(c.img)}&amp;w=3840&amp;q=75"/><div class="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent"></div></div><div class="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-center"><div class="flex items-center gap-3 mb-4"><span class="text-sm font-black font-heading text-teal-deep tabular-nums">${c.num}</span><span class="w-10 h-10 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center">${c.iconSvg}</span></div><h3 class="text-2xl sm:text-3xl font-black font-heading text-navy tracking-tight">${c.title}</h3><p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">${c.copy}</p><div class="mt-4 pt-3.5 border-t border-slate-100 flex items-start gap-2.5"><span class="inline-flex items-center text-teal-deep shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake text-teal-deep"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"></path><path d="m18 15-2-2"></path><path d="m15 18-2-2"></path></svg></span><p class="text-sm sm:text-[15px] font-semibold text-teal-900/90 italic leading-snug">${c.humanLine}</p></div></div></article>`;
  }).join('');
}

// 2. Patch .next/server/app/why-global-pet-cab.html
const htmlPath = '.next/server/app/why-global-pet-cab.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace Hero supporting copy
const oldHeroP = '<p class="text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl">Combining professional mobility logistics with genuine warmth for pet family members.</p>';
const newHeroP = '<p class="text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl">Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs.</p>';

if (html.includes(oldHeroP)) {
  html = html.replace(oldHeroP, newHeroP);
  console.log('Replaced Hero supporting copy in HTML');
} else {
  console.log('Hero supporting copy not found or already replaced');
}

// Replace Section 2 Header + Intro
const oldSec2Header = '<p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em] mb-3">Why Pet Parents Choose Us</p><h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">Pet-First Care With End-to-End Relocation Support</h2><p class="mt-4 text-base sm:text-lg text-slate-600">From local pet transport in Dubai to international relocation, we combine careful pet handling with organised travel logistics.</p>';

const newSec2Header = '<p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em] mb-3">WHY PET PARENTS CHOOSE US</p><h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">Combining Warmth with Logistics Rigor</h2><div class="mt-4 text-base sm:text-lg text-slate-600 space-y-3 leading-relaxed"><p>We understand that your pet is family. And when a family member is travelling, the details matter.</p><p>From a short Dubai pet taxi ride to a move across borders, there is always more happening behind the scenes than the journey itself. Our role is to bring the practical side of pet transport and relocation together with careful handling, clear communication and attention to the individual journey.</p></div>';

if (html.includes(oldSec2Header)) {
  html = html.replace(oldSec2Header, newSec2Header);
  console.log('Replaced Section 2 Header and Intro in HTML');
} else {
  console.log('Section 2 header not found or already replaced');
}

// Replace articles container
const articlesContainerStart = '<div class="space-y-6 lg:space-y-8">';
const articlesContainerEnd = '</div></div></section><section class="relative overflow-hidden text-white py-20 sm:py-24">';

const startIdx = html.indexOf(articlesContainerStart);
const endIdx = html.indexOf(articlesContainerEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const newArticles = buildArticlesHtml();
  html = html.substring(0, startIdx + articlesContainerStart.length) + newArticles + html.substring(endIdx);
  console.log('Replaced all 6 articles in HTML');
} else {
  console.error('Could not find articles container boundaries in HTML!', startIdx, endIdx);
}

// Replace CTA Section
const oldCtaSection = '<section class="relative overflow-hidden text-white py-20 sm:py-24"><div class="absolute inset-0" aria-hidden="true"><img alt="" loading="lazy" decoding="async" data-nimg="fill" class="object-cover object-center" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75"/><div class="absolute inset-0 bg-navy/78"></div><div class="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/45 to-navy/55"></div></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"><h2 class="text-3xl sm:text-4xl font-black font-heading tracking-tight">Pet-First Care With End-to-End Relocation Support</h2><p class="text-base sm:text-lg text-white/70 max-w-xl mx-auto">Combining professional mobility logistics with genuine warmth for pet family members.</p><div class="flex flex-col sm:flex-row justify-center gap-3 pt-2"><a class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral" href="/get-a-quote">Get a free quote<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>WhatsApp Us</a></div></div></section>';

const newCtaSection = '<section class="relative overflow-hidden text-white py-20 sm:py-24"><div class="absolute inset-0" aria-hidden="true"><img alt="" loading="lazy" decoding="async" data-nimg="fill" class="object-cover object-center" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75"/><div class="absolute inset-0 bg-navy/78"></div><div class="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/45 to-navy/55"></div></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"><p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">OFFICIAL DUBAI PET MOBILITY &amp; RELOCATION LOGISTICS</p><h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight">Instant city ride estimates or expert international pet relocation assistance.</h2><div class="flex flex-col sm:flex-row justify-center gap-3 pt-2"><a class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral" href="/get-a-quote">Get a Free Quote &rarr;</a><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>WhatsApp Us</a></div></div></section>';

if (html.includes(oldCtaSection)) {
  html = html.replace(oldCtaSection, newCtaSection);
  console.log('Replaced CTA section in HTML');
} else {
  console.log('Old CTA section not found or already replaced');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved .next/server/app/why-global-pet-cab.html');

// 3. Patch .next/server/app/why-global-pet-cab/page.js
const pageJsPath = '.next/server/app/why-global-pet-cab/page.js';
let pageJs = fs.readFileSync(pageJsPath, 'utf8');

// Update Hero copy in page.js
const oldJsHero = 'Combining professional mobility logistics with genuine warmth for pet family members.';
const newJsHero = 'Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs.';

if (pageJs.includes(oldJsHero)) {
  // Replace only the hero one (first occurrence)
  pageJs = pageJs.replace(oldJsHero, newJsHero);
  console.log('Replaced Hero copy in page.js');
}

// Update Section 2 header in page.js
const oldJsH2 = 'children:"Pet-First Care With End-to-End Relocation Support"';
const newJsH2 = 'children:"Combining Warmth with Logistics Rigor"';
if (pageJs.includes(oldJsH2)) {
  pageJs = pageJs.replace(oldJsH2, newJsH2);
  console.log('Replaced Section 2 H2 in page.js');
}

// Update Section 2 intro in page.js
const oldJsIntro = 'children:"From local pet transport in Dubai to international relocation, we combine careful pet handling with organised travel logistics."';
const newJsIntro = 'children:"We understand that your pet is family. And when a family member is travelling, the details matter. From a short Dubai pet taxi ride to a move across borders, there is always more happening behind the scenes than the journey itself. Our role is to bring the practical side of pet transport and relocation together with careful handling, clear communication and attention to the individual journey."';
if (pageJs.includes(oldJsIntro)) {
  pageJs = pageJs.replace(oldJsIntro, newJsIntro);
  console.log('Replaced Section 2 Intro in page.js');
}

// Update Card 4 and Card 5 titles in module 7966 in page.js
if (pageJs.includes('title:"IPATA Membership",desc:"As an IPATA member, Global Pet Cab is part of a professional network focused on pet transportation and relocation."')) {
  pageJs = pageJs.replace(
    'title:"IPATA Membership",desc:"As an IPATA member, Global Pet Cab is part of a professional network focused on pet transportation and relocation."',
    'title:"Climate-Controlled Fleet",desc:"Dubai\'s climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city."'
  );
  console.log('Replaced Card 4 title & desc in page.js');
}

if (pageJs.includes('title:"Certified Pet Handlers",desc:"Trained staff experienced in handling anxious pets, brachycephalic breeds, and multi-pet families."')) {
  pageJs = pageJs.replace(
    'title:"Certified Pet Handlers",desc:"Trained staff experienced in handling anxious pets, brachycephalic breeds, and multi-pet families."',
    'title:"Experienced Pet Handlers",desc:"Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families."'
  );
  console.log('Replaced Card 5 title & desc in page.js');
}

// Update Card 1, 2, 3 descriptions if needed
if (pageJs.includes('desc:"Every ride and relocation plan is built around your pet\'s comfort, hydration and stress reduction."')) {
  pageJs = pageJs.replace(
    'desc:"Every ride and relocation plan is built around your pet\'s comfort, hydration and stress reduction."',
    'desc:"Every journey starts with the pet, not just the route. We consider your pet\'s comfort, handling needs and the practical details of the journey before the ride or relocation is arranged."'
  );
  console.log('Replaced Card 1 desc in page.js');
}

if (pageJs.includes('desc:"Get an estimated Dubai pet taxi fare based on actual driving distance, with clear pricing and no surprise fees."')) {
  pageJs = pageJs.replace(
    'desc:"Get an estimated Dubai pet taxi fare based on actual driving distance, with clear pricing and no surprise fees."',
    'desc:"You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book."'
  );
  console.log('Replaced Card 2 desc in page.js');
}

if (pageJs.includes('desc:"One team for Dubai pet transport, airport transfers and international pet relocation."')) {
  pageJs = pageJs.replace(
    'desc:"One team for Dubai pet transport, airport transfers and international pet relocation."',
    'desc:"Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai."'
  );
  console.log('Replaced Card 3 desc in page.js');
}

if (pageJs.includes('desc:"Speak directly with real relocation specialists and receive live updates throughout your pet’s ride."')) {
  pageJs = pageJs.replace(
    'desc:"Speak directly with real relocation specialists and receive live updates throughout your pet’s ride."',
    'desc:"Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet\'s journey."'
  );
  console.log('Replaced Card 6 desc in page.js');
}

fs.writeFileSync(pageJsPath, pageJs, 'utf8');
console.log('Saved .next/server/app/why-global-pet-cab/page.js');
