import fs from 'fs';
import path from 'path';

console.log('--- Patching international-pet-relocation.html with 10 sections ---');

const htmlPath = '.next/server/app/international-pet-relocation.html';
if (!fs.existsSync(htmlPath)) {
  console.error('File not found:', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Find the start and end of <main class="flex-grow">
const mainStartTag = '<main class="flex-grow">';
const mainStartIndex = html.indexOf(mainStartTag);
const mainEndIndex = html.indexOf('</main>', mainStartIndex);

if (mainStartIndex === -1 || mainEndIndex === -1) {
  console.error('Could not locate <main class="flex-grow"> in html');
  process.exit(1);
}

// Extract the existing quote form HTML from inside main
const quoteFormStart = html.indexOf('<div id="international-quote-form"', mainStartIndex);
let quoteFormHtml = '';
if (quoteFormStart !== -1 && quoteFormStart < mainEndIndex) {
  // Find where the quote form closes (or take up to next section)
  const nextSection = html.indexOf('<section class="py-20', quoteFormStart);
  if (nextSection !== -1 && nextSection < mainEndIndex) {
    quoteFormHtml = html.substring(quoteFormStart, nextSection);
    // Remove any trailing </section> or whitespace
    const lastSectionEnd = quoteFormHtml.lastIndexOf('</section>');
    if (lastSectionEnd !== -1) {
      quoteFormHtml = quoteFormHtml.substring(0, lastSectionEnd);
    }
  }
}

// Update the header of the quote form if found
if (quoteFormHtml) {
  quoteFormHtml = quoteFormHtml.replace(
    'Tell Us About Your Pet&#x27;s Journey',
    'Tell Us Where Your Pet Is Going'
  );
  quoteFormHtml = quoteFormHtml.replace(
    'Tell Us About Your Pet\'s Journey',
    'Tell Us Where Your Pet Is Going'
  );
  quoteFormHtml = quoteFormHtml.replace(
    /Every international pet move is different[\s\S]*?tailored quote\./,
    'Every pet relocation is different. Your starting point, destination, pet, travel date and travel requirements all affect the journey. Share the basics with us and our team can understand what you need before preparing your relocation quote.'
  );
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/'/g, '&#x27;');
}

const faqs = [
  {q:"What is international pet relocation?",a:"It is the process of moving a pet between countries while coordinating the travel, veterinary, documentation and other requirements that apply to the route."},
  {q:"Do you handle pet export and pet import?",a:"Global Pet Cab's international service is designed to support both directions. A pet travelling from the UAE to another country is an export journey, while a pet entering the UAE from another country is an import journey."},
  {q:"Can you relocate my pet from Dubai to another country?",a:"Yes. Global Pet Cab's international relocation service supports journeys from Dubai/UAE to destinations worldwide, with the exact requirements depending on the destination and travel plan."},
  {q:"Can you help bring my pet into Dubai?",a:"Yes. Pet import into Dubai can involve country-of-origin requirements, veterinary preparation, documentation, airline arrangements and arrival procedures. The exact requirements depend on the route."},
  {q:"What documents will my pet need?",a:"Requirements vary by destination and route. Depending on the journey, they may include vaccination records, microchip information, veterinary certificates, permits and other travel documents."},
  {q:"Does my pet need a travel crate?",a:"International airline travel may require an airline-approved or IATA-compliant travel crate. The correct crate and preparation depend on your pet, airline and route."},
  {q:"Can you help with airline arrangements?",a:"Airline and travel coordination can form part of the relocation service, subject to the route, airline and selected service."},
  {q:"Can you help with airport transfers in Dubai?",a:"Yes. Local pet transportation can connect your home or another agreed pickup point with the airport as part of the wider travel journey."},
  {q:"What if I cannot take my pet to a grooming or health appointment before travel?",a:"Selected local transportation and appointment support may be available when the pet parent cannot be there, subject to the service arrangement."},
  {q:"How do I get a quote?",a:"Start with the relocation form and share your origin, destination and tentative travel date. The team can then review the route and the services your pet may need."}
];

const scope = [
  {title:"Route & Travel Planning",desc:"We look at your origin, destination and travel plans to understand the practical requirements of the journey.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>'},
  {title:"Veterinary Preparation",desc:"Support around the veterinary checks, vaccinations, tests and health documents required for your route, where applicable.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'},
  {title:"Travel Crate Preparation",desc:"Guidance on the right travel crate and preparation for your pet's journey, based on airline and route requirements.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>'},
  {title:"Export & Import Support",desc:"Help with the relevant export or import documentation and country-specific requirements for the journey.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>'},
  {title:"Airline & Airport Coordination",desc:"Support with airline arrangements and the airport logistics involved in getting your pet ready to travel.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>'},
  {title:"Arrival & Handover",desc:"Support with the arrival process and agreed handover arrangements so the journey continues smoothly after landing.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>'}
];

const steps = [
  {s:"01",t:"Understand Your Route",d:"We start with where your pet is travelling from, where they are going and when you are planning to travel."},
  {s:"02",t:"Build the Travel Plan",d:"We identify the key veterinary, documentation, crate, airline and travel requirements that apply to your route."},
  {s:"03",t:"Prepare Your Pet",d:"We help you understand and coordinate the preparation your pet needs before departure."},
  {s:"04",t:"Get the Paperwork in Order",d:"We support the relevant export, import and travel documentation required for the journey."},
  {s:"05",t:"Coordinate the Travel",d:"We help bring together the flight and airport arrangements selected for your pet's relocation."},
  {s:"06",t:"Get Them Where They Need to Be",d:"We support the agreed arrival and handover process so your pet can continue safely to their new destination."}
];

const destinations = [
  {name:"Dubai ↔ India",href:"/destinations/dubai-to-india"},
  {name:"Dubai ↔ UK",href:"/destinations/dubai-to-uk"},
  {name:"Dubai ↔ USA",href:"/destinations/dubai-to-usa"},
  {name:"Dubai ↔ Canada",href:"/destinations/dubai-to-canada"},
  {name:"Dubai ↔ Australia",href:"/destinations/dubai-to-australia"},
  {name:"Other international destinations",href:"#international-quote-form"}
];

const whyUs = [
  {title:"A Route-First Approach",desc:"We start with your actual journey rather than giving every customer the same checklist.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>'},
  {title:"Support Across the Journey",desc:"From preparation and local transport to airport coordination and arrival support, the service can connect the different stages of the move.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'},
  {title:"Clear Communication",desc:"You should know what is happening next, what information is needed and which parts of the journey require your attention.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>'},
  {title:"Local + International Mobility",desc:"International relocation can connect naturally with local pet taxi, airport and appointment transportation.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>'},
  {title:"Professional Industry Recognition",desc:"If confirmed, IPATA membership can be highlighted here alongside other verified credentials and handling standards.",svg:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>'}
];

const newMainContent = `
<div class="font-body space-y-0 text-slate-800">
  <!-- 1. HERO SECTION -->
  <section class="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
    <div class="absolute inset-0" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="International Pet Relocation" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-navy/75"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/55"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="flex flex-wrap items-center justify-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          INTERNATIONAL PET RELOCATION
        </span>
      </div>
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
        International Pet Relocation, Wherever Your Pet Is Going
      </h1>
      <div class="max-w-3xl mx-auto space-y-3">
        <p class="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
          Moving a pet to another country is a big move for the whole family. There are flights to plan, veterinary requirements to understand, documents to prepare and a lot of small details that need to come together at the right time.
        </p>
        <p class="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
          Global Pet Cab helps you plan and coordinate your pet&#x27;s international journey, from the first route discussion and travel preparation to airport arrangements and arrival support.
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-bold text-teal-light">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">International Pet Relocation</span>
        <span class="text-white/40">|</span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">Route-Specific Planning</span>
        <span class="text-white/40">|</span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">Pet Transport Support</span>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto">
          <span>Get a Free Relocation Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp Us</span>
        </a>
      </div>
      <div class="pt-2 text-[11px] sm:text-xs text-slate-400">
        *IPATA Member — use only after the membership and exact wording are confirmed by Global Pet Cab.
      </div>
    </div>
  </section>

  <!-- 2. QUOTE FORM SECTION -->
  <section id="international-quote-form" class="py-16 sm:py-20 bg-slate-50 border-b border-teal-border/40">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      ${quoteFormHtml}
    </div>
  </section>

  <!-- 3. INTRODUCTION SECTION: More Than Getting Your Pet on a Flight -->
  <section class="py-20 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-teal-deep"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
          FULL-JOURNEY CARE
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          More Than Getting Your Pet on a Flight
        </h2>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
          A successful pet relocation is about much more than booking a ticket. The right preparation starts well before departure and can continue until your pet reaches their new home.
        </p>
        <p class="text-sm sm:text-base text-slate-500 leading-relaxed font-body">
          We help bring the moving parts together around your route, so you have a clearer idea of what needs to happen, when it needs to happen and where our team can support you.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${scope.map(s => `
          <div class="p-8 rounded-3xl bg-slate-50 border border-teal-border/70 hover:bg-white hover:shadow-fj-card hover:border-teal-deep/30 transition-all duration-300 group flex flex-col justify-between">
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border group-hover:bg-teal-deep group-hover:text-white transition-colors duration-300">
                ${s.svg}
              </div>
              <h3 class="text-xl font-black font-heading text-navy">${escapeHtml(s.title)}</h3>
              <p class="text-sm text-slate-600 leading-relaxed font-body">${escapeHtml(s.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 4. DIRECTION SECTION: Export or Import? -->
  <section class="py-20 sm:py-24 bg-teal-soft/40 border-y border-teal-border/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
          EXPORT OR IMPORT? START WITH YOUR DIRECTION
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          The Journey Depends on Where Your Pet Is Going
        </h2>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
          International pet travel looks different depending on the direction of the move. That&#x27;s why we make this the first choice in the quote journey.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div class="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 text-navy font-bold text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-teal-deep"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            UAE EXPORT
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">Moving FROM Dubai / UAE</h3>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
            Your pet is leaving the UAE for another country. This is an export journey, and the requirements will depend on the destination, airline and your pet&#x27;s circumstances.
          </p>
        </div>
        <div class="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-soft text-teal-deep font-bold text-xs border border-teal-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-teal-deep rotate-90"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            UAE IMPORT
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">Moving INTO Dubai / UAE</h3>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
            Your pet is travelling from another country into the UAE. This is an import journey, with entry requirements that depend on the country of origin and the applicable UAE rules.
          </p>
        </div>
      </div>
      <div class="text-center mt-10">
        <p class="text-sm text-slate-500 font-medium">
          For other origin and destination combinations, the relocation team can review the route and advise on the next steps.
        </p>
      </div>
    </div>
  </section>

  <!-- 5. PROCESS STEPS: HOW WE HELP MANAGE THE JOURNEY -->
  <section class="py-20 sm:py-24 bg-navy text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
          HOW IT WORKS
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
          One Journey. Many Details. One Team to Coordinate Them.
        </h2>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
          International pet travel can feel overwhelming because there is rarely just one thing to organise. Our role is to help you bring the important pieces together without losing sight of the most important part — your pet.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${steps.map(s => `
          <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-bright/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="text-3xl sm:text-4xl font-black font-heading text-teal-bright">${s.s}</div>
              <h3 class="text-xl font-black font-heading text-white">${escapeHtml(s.t)}</h3>
              <p class="text-sm text-slate-300 leading-relaxed font-body">${escapeHtml(s.d)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 6. BANNER WITH BACKGROUND IMAGE: Need Help Before Your Pet Flies? -->
  <section class="relative overflow-hidden text-white py-24 sm:py-28">
    <div class="absolute inset-0" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="Dubai Pet Taxi Service" class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-navy/80"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60"></div>
    </div>
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-teal-bright"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
        LOCAL PICKUP &amp; APPOINTMENTS
      </div>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
        Need Help Before Your Pet Flies?
      </h2>
      <div class="space-y-4 max-w-2xl mx-auto">
        <p class="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
          Sometimes the international journey starts days or weeks before the airport. If you are not available, selected local pet transportation services can help your pet get to grooming or health-related appointments before travel, subject to the service arrangement.
        </p>
        <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
          For Dubai-based customers, we can also connect the local part of the journey with airport transportation, helping your pet get from home or another agreed location to the airport.
        </p>
      </div>
      <div class="pt-2">
        <a href="/dubai-pet-taxi" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base">
          <span>Explore Dubai Pet Taxi</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- 7. WORLDWIDE DESTINATIONS: From Dubai to the World -->
  <section class="py-20 sm:py-24 bg-white border-b border-teal-border/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
          DUBAI ↔ WORLDWIDE
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          From Dubai to the World, and Back Again
        </h2>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
          Whether you are moving home, relocating for work, returning to your home country or bringing your pet to join you in Dubai, the journey starts with understanding your route.
        </p>
        <p class="text-sm font-bold text-navy pt-2">
          Explore our destination guides for route-specific information and requirements:
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        ${destinations.map(d => `
          <a href="${d.href}" class="p-5 rounded-2xl border border-teal-border bg-slate-50 hover:bg-teal-deep hover:text-white text-navy font-extrabold font-heading text-sm text-center transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-center min-h-[72px]">
            <span>${escapeHtml(d.name)}</span>
          </a>
        `).join('')}
      </div>
      <p class="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto italic">
        Each destination page carries the country-specific requirements, documents and route details. The worldwide overview remains broad, useful and conversion-focused.
      </p>
    </div>
  </section>

  <!-- 8. WHY CHOOSE US: Professional Support, With Your Pet at the Centre -->
  <section class="py-20 sm:py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-14 space-y-4">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
          WHY PET PARENTS CHOOSE US
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          Professional Support, With Your Pet at the Centre
        </h2>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
          There is a lot to think about when your pet is crossing borders. We want the process to feel clear, organised and personal — not like you are trying to piece together a complicated journey on your own.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${whyUs.map(w => `
          <div class="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border">
              ${w.svg}
            </div>
            <h3 class="text-xl font-black font-heading text-navy">${escapeHtml(w.title)}</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">${escapeHtml(w.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 9. FAQS ACCORDION: International Pet Relocation Questions, Answered -->
  <section class="py-20 sm:py-24 bg-white border-t border-teal-border/40">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14 space-y-3">
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
          QUESTIONS PET PARENTS ASK
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          International Pet Relocation Questions, Answered
        </h2>
        <p class="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
          Every international move has its own requirements. These answers give you a starting point before you request a route-specific quote.
        </p>
      </div>
      <div class="space-y-4">
        ${faqs.map(f => `
          <details class="group border border-teal-border rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
            <summary class="list-none cursor-pointer p-6 flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft/40 transition-colors select-none">
              <span>${escapeHtml(f.q)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-slate-400 group-open:rotate-180 group-open:text-teal-deep transition-transform duration-200 shrink-0"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/40 pt-4">
              ${escapeHtml(f.a)}
            </div>
          </details>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 10. FINAL CTA: Your Pet's Next Journey Starts With a Conversation -->
  <section class="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
        PLANNING A MOVE?
      </div>
      <h2 class="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
        Your Pet&#x27;s Next Journey Starts With a Conversation
      </h2>
      <p class="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
        Tell us where your pet is coming from, where they are going and when you hope to travel. We&#x27;ll help you understand the journey ahead and the next steps to get started.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto">
          <span>Get a Free Relocation Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  </section>
</div>
`;

const updatedHtml = html.substring(0, mainStartIndex + mainStartTag.length) +
  newMainContent +
  html.substring(mainEndIndex);

fs.writeFileSync(htmlPath, updatedHtml);
console.log('Successfully updated .next/server/app/international-pet-relocation.html!');
