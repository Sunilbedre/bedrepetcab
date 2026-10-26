import fs from 'fs';

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

// 2. Patch .next/server/app/why-global-pet-cab/page.js
const pageJsPath = '.next/server/app/why-global-pet-cab/page.js';
let pageJs = fs.readFileSync(pageJsPath, 'utf8');

// Update array `m` in module 7966 to include humanLine and clean copy:
const newMArray = `m=[{icon:l.Z,title:"Pet-First Decisions",desc:"Every journey starts with the pet, not just the route. We consider your pet's comfort, handling needs and the practical details of the journey before the ride or relocation is arranged.",humanLine:"Because the easiest journey on paper is not always the easiest one for a pet.",img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",alt:"Pets resting comfortably together"},{icon:r.Z,title:"Transparent Pricing",desc:"You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book.",humanLine:"Clear information makes it easier to make the right decision for your pet.",img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80",alt:"City transfer on the road"},{icon:n.Z,title:"Local Dubai + Global Reach",desc:"Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai.",humanLine:"One pet. One journey. Wherever that journey needs to go.",img:"https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80",alt:"International flight above the clouds"},{icon:o.Z,title:"Climate-Controlled Fleet",desc:"Dubai's climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city.",humanLine:"Because your pet should never have to choose between getting there and staying comfortable.",img:"https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=900&q=80",alt:"Pet looking out from a climate-controlled vehicle"},{icon:d,title:"Experienced Pet Handlers",desc:"Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families.",humanLine:"Patience matters when your passenger has four legs and cannot tell you how they are feeling.",img:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80",alt:"Handler with a golden retriever"},{icon:x,title:"Direct WhatsApp Support",desc:"Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet's journey.",humanLine:"Sometimes you just want to ask, 'How is my pet?' — and know who to ask.",img:"https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",alt:"Team coordinating live pet travel updates"}];`;

const mStart = pageJs.indexOf('m=[');
const mEnd = pageJs.indexOf('];function h(){');
if (mStart !== -1 && mEnd !== -1) {
  pageJs = pageJs.substring(0, mStart) + newMArray + pageJs.substring(mEnd + 2);
  console.log('Updated m array in page.js');
}

// Update the article rendering in module 6189 to show humanLine
const oldArticleChildren = 's.jsx("h3",{className:"text-2xl sm:text-3xl font-black font-heading text-navy tracking-tight",children:e.title}),s.jsx("p",{className:"mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl",children:e.desc})';

const newArticleChildren = 's.jsx("h3",{className:"text-2xl sm:text-3xl font-black font-heading text-navy tracking-tight",children:e.title}),s.jsx("p",{className:"mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl",children:e.desc}),e.humanLine&&(0,s.jsxs)("div",{className:"mt-4 pt-3.5 border-t border-slate-100 flex items-start gap-2.5",children:[s.jsx("span",{className:"inline-flex items-center text-teal-deep shrink-0 mt-0.5",children:s.jsx(r.Z,{className:"w-4 h-4 text-teal-deep"})}),s.jsx("p",{className:"text-sm sm:text-[15px] font-semibold text-teal-900/90 italic leading-snug",children:e.humanLine})]})';

if (pageJs.includes(oldArticleChildren)) {
  pageJs = pageJs.replace(oldArticleChildren, newArticleChildren);
  console.log('Updated article rendering with humanLine in page.js');
}

// Update CTA section in module 6189
const oldCtaInJs = '(0,s.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[s.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading tracking-tight",children:"Pet-First Care With End-to-End Relocation Support"}),s.jsx("p",{className:"text-base sm:text-lg text-white/70 max-w-xl mx-auto",children:"Combining professional mobility logistics with genuine warmth for pet family members."}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row justify-center gap-3 pt-2",children:[(0,s.jsxs)(l.default,{href:"/get-a-quote",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral",children:["Get a free quote",s.jsx(c.Z,{className:"w-5 h-5"})]}),(0,s.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full",children:[s.jsx(d.Z,{className:"w-5 h-5"}),"WhatsApp Us"]})]})]})';

const newCtaInJs = '(0,s.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[s.jsx("p",{className:"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]",children:"OFFICIAL DUBAI PET MOBILITY & RELOCATION LOGISTICS"}),s.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight",children:"Instant city ride estimates or expert international pet relocation assistance."}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row justify-center gap-3 pt-2",children:[(0,s.jsxs)(l.default,{href:"/get-a-quote",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral",children:["Get a Free Quote →",s.jsx(c.Z,{className:"w-5 h-5"})]}),(0,s.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full",children:[s.jsx(d.Z,{className:"w-5 h-5"}),"WhatsApp Us"]})]})]})';

if (pageJs.includes(oldCtaInJs)) {
  pageJs = pageJs.replace(oldCtaInJs, newCtaInJs);
  console.log('Updated CTA section in page.js');
} else {
  // If slightly changed, let's look for matching substring
  console.log('Notice: searching for CTA section start in page.js...');
  const ctaMatch = pageJs.indexOf('children:"Pet-First Care With End-to-End Relocation Support"}),s.jsx("p",{className:"text-base sm:text-lg text-white/70 max-w-xl mx-auto"');
  if (ctaMatch !== -1) {
    const sectionStart = pageJs.lastIndexOf('(0,s.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto', ctaMatch);
    const sectionEnd = pageJs.indexOf(']})]})]})', ctaMatch);
    if (sectionStart !== -1 && sectionEnd !== -1) {
      pageJs = pageJs.substring(0, sectionStart) + newCtaInJs + pageJs.substring(sectionEnd + 3);
      console.log('Updated CTA section via boundary search in page.js');
    }
  }
}

fs.writeFileSync(pageJsPath, pageJs, 'utf8');
console.log('Saved page.js');

// 3. Update .next/server/app/why-global-pet-cab.html DOM
const htmlPath = '.next/server/app/why-global-pet-cab.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace articles container
const articlesContainerStart = '<div class="space-y-6 lg:space-y-8">';
const articlesContainerEnd = '</div></div></section><section class="relative overflow-hidden text-white py-20 sm:py-24">';

const startIdx = html.indexOf(articlesContainerStart);
const endIdx = html.indexOf(articlesContainerEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const newArticles = buildArticlesHtml();
  html = html.substring(0, startIdx + articlesContainerStart.length) + newArticles + html.substring(endIdx);
  console.log('Replaced all 6 articles in HTML');
}

// Replace CTA section
const ctaSecStart = html.indexOf('<section class="relative overflow-hidden text-white py-20 sm:py-24">');
const ctaSecEnd = html.indexOf('</section></div></main>');

if (ctaSecStart !== -1 && ctaSecEnd !== -1) {
  const newCtaHtml = `<section class="relative overflow-hidden text-white py-20 sm:py-24"><div class="absolute inset-0" aria-hidden="true"><img alt="" loading="lazy" decoding="async" data-nimg="fill" class="object-cover object-center" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1601758228041-f3b2795255f1%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75"/><div class="absolute inset-0 bg-navy/78"></div><div class="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/45 to-navy/55"></div></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"><p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">OFFICIAL DUBAI PET MOBILITY &amp; RELOCATION LOGISTICS</p><h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight">Instant city ride estimates or expert international pet relocation assistance.</h2><div class="flex flex-col sm:flex-row justify-center gap-3 pt-2"><a class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral" href="/get-a-quote">Get a Free Quote &rarr;</a><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>WhatsApp Us</a></div></div></section>`;
  html = html.substring(0, ctaSecStart) + newCtaHtml + html.substring(ctaSecEnd + 10);
  console.log('Replaced CTA section in HTML DOM');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved .next/server/app/why-global-pet-cab.html');
