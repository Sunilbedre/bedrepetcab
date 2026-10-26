import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== BUILDING DEDUPLICATED SSR HTML & RSC FOR /international-pet-relocation ===');

// 1. Read existing HTML to get layout
const existingHtml = fs.readFileSync(path.join(root, '.next/server/app/international-pet-relocation.html'), 'utf8');

// Extract the inner interactive quote form section from existingHtml
const pos = existingHtml.indexOf('id="international-quote-form"');
const formSectionStart = existingHtml.lastIndexOf('<section', pos);
const nextSec = existingHtml.indexOf('More Than a Flight', pos);
const nextSecSection = existingHtml.lastIndexOf('<section', nextSec);
let formSectionHtml = existingHtml.slice(formSectionStart, nextSecSection).trim();

// Ensure form section header has correct title and subtext
formSectionHtml = formSectionHtml.replace(
  /<h2 class="text-2xl sm:text-3xl font-black font-heading tracking-tight">[\s\S]*?<\/h2>/,
  `<div class="space-y-1.5"><h2 class="text-2xl sm:text-3xl font-black font-heading tracking-tight">Tell Us About Your Pet's Journey</h2><p class="text-sm sm:text-base text-slate-200 font-body leading-relaxed">Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote.</p></div>`
);

// 2. Build Hero Section HTML
const heroHtml = `
<section class="relative overflow-hidden bg-[#041a2c] text-white pt-16 sm:pt-20 pb-28">
  <div class="absolute inset-0" aria-hidden="true">
    <img alt="International Pet Relocation Dubai" fetchpriority="high" decoding="async" class="object-cover w-full h-full absolute inset-0" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;object-position:82% center;color:transparent" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75" srcset="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" sizes="100vw">
    <div class="absolute inset-0 intl-hero-gradient"></div>
    <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"></div>
  </div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl space-y-5">
      <div class="inline-flex items-center gap-2 text-teal-light text-xs sm:text-sm font-extrabold font-heading uppercase tracking-[0.16em]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4 text-teal-bright"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        INTERNATIONAL PET RELOCATION
      </div>
      <h1 class="font-black font-heading tracking-tight leading-[1.2] text-3xl sm:text-5xl text-white">
        International Pet Relocation from Dubai, Made Simple
      </h1>
      <p class="text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl font-body">
        Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.
      </p>
      <p class="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl">
        Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.
      </p>
      <div class="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">IPATA Member*</span>
        <span class="text-white/40">|</span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">IATA-Compliant Handling*</span>
        <span class="text-white/40">|</span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">MOCCAE Support*</span>
        <span class="text-white/40">|</span>
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">International Pet Relocation</span>
      </div>
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base">
          <span>Request an Expert Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp Us</span>
        </a>
      </div>
      <div class="mt-8 p-6 sm:p-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-1.5 max-w-xl">
          <h3 class="text-xl sm:text-2xl font-black font-heading text-white">Moving Your Pet Across Borders?</h3>
          <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-body">From Dubai to the world and back again, we help coordinate the important details of your pet&#x27;s international journey.</p>
        </div>
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all">
          <span>Get a Free Relocation Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  </div>
</section>`;

// 3. Build Section 3: What We Help With (6 Cards)
const whatWeHelpCards = [
  { num: '01', title: 'Route & Regulatory Planning', desc: 'Review the relocation route, destination requirements, quarantine guidelines and travel considerations before the journey begins.' },
  { num: '02', title: 'Veterinary Preparation', desc: 'Coordinate required veterinary steps, including ISO microchip, core vaccinations, RNATT blood titer tests and official health certification.' },
  { num: '03', title: 'IATA Travel Crate', desc: 'Appropriate IATA-compliant crate sizing, preparation and travel arrangements tailored to your pet&#x27;s exact measurements.' },
  { num: '04', title: 'UAE MOCCAE & Entry Permits', desc: 'Support required UAE MOCCAE export documentation or Dubai import permits and destination-country government requirements.' },
  { num: '05', title: 'Airline Coordination', desc: 'Coordinate airline travel arrangements and the appropriate pet-friendly live-animal transport option for the flight.' },
  { num: '06', title: 'Customs & Arrival Support', desc: 'Support destination customs clearance, import inspection, and safe handover arrangements based on the route selected.' },
];

const whatWeHelpHtml = `
<section class="py-20 bg-white border-t border-teal-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
    <div class="max-w-3xl space-y-3">
      <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase">COMPREHENSIVE RELOCATION SERVICES</span>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">More Than a Flight. We Manage the Journey.</h2>
      <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet&#x27;s journey, so you have a clear plan from preparation to arrival.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${whatWeHelpCards.map(c => `
      <article class="destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-7 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300">
            <span class="font-mono font-black text-lg">${c.num}</span>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">${c.title}</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">${c.desc}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

// 4. Build Section 4: How It Works (4 Steps)
const stepsData = [
  { num: '01', title: 'Submit Route & Pet Details', desc: 'Share your origin, destination, intended travel timeline and pet specs through our quote form. Our relocation specialists evaluate route feasibility and country protocols.' },
  { num: '02', title: 'Custom Plan & Health Schedule', desc: 'We construct a custom timeline detailing required veterinary steps, blood testing windows, microchip checks and IATA crate sizing tailored to your pet.' },
  { num: '03', title: 'Permit Approvals & Flight Booking', desc: 'Our team secures official UAE MOCCAE permits, destination import licenses, and books live-animal manifest cargo on approved pet-friendly airlines.' },
  { num: '04', title: 'Departure Transit & Safe Handover', desc: 'We manage pre-flight airport transfer, export check-in, customs clearance at arrival, and safe handover so your family is joyfully reunited.' },
];

const howItWorksHtml = `
<section class="py-20 bg-navy text-white border-t border-teal-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
    <div class="max-w-3xl space-y-2">
      <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light">HOW IT WORKS</p>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-white">A Clearer Path From First Planning to Safe Arrival</h2>
      <p class="text-base text-white/70 font-body leading-relaxed pt-1">Every route has its own requirements, but the overall process follows a structured 4-phase journey designed to keep pet parents informed at each stage.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${stepsData.map(s => `
      <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-all">
        <div>
          <div class="text-teal-bright font-black font-heading text-3xl font-mono">${s.num}</div>
          <h3 class="text-xl font-black font-heading text-white mt-3">${s.title}</h3>
          <p class="text-sm text-white/75 leading-relaxed font-body mt-2">${s.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;

// 5. Build Section 5: Local Transport CTA
const localTransportHtml = `
<section class="py-20 bg-white border-t border-teal-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div class="max-w-2xl space-y-3">
        <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
          LOCAL TRANSPORT &amp; APPOINTMENTS
        </div>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">Need Help Getting Your Pet Ready to Travel?</h2>
        <p class="text-base text-slate-700 font-body leading-relaxed">International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement.</p>
        <p class="text-sm text-slate-600 font-body leading-relaxed pt-1">For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport.</p>
      </div>
      <div class="shrink-0">
        <a class="inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all" href="/dubai-pet-taxi">
          <span>Explore Dubai Pet Taxi</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5 text-teal-bright"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  </div>
</section>`;

// 6. Build Section 6: Routes
const routes = [
  'Dubai ↔ India',
  'Dubai ↔ UK',
  'Dubai ↔ USA',
  'Dubai ↔ Canada',
  'Dubai ↔ Australia',
  'Other destinations',
];

const routesHtml = `
<section class="py-20 bg-[#F7FAFB] border-t border-teal-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
    <div class="max-w-3xl space-y-3">
      <span class="inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest">GLOBAL MOBILITY NETWORK</span>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">Pet Relocation from Dubai to Destinations Worldwide</h2>
      <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination.</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      ${routes.map(r => `
      <a href="#international-quote-form" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
        <div class="text-sm font-extrabold font-heading text-navy">${r}</div>
        <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
      </a>`).join('')}
    </div>
  </div>
</section>`;

// 7. Build Section 7: Why Us (4 Trust Pillars)
const trustPillarsData = [
  { num: '01', title: 'Dedicated Relocation Specialist', desc: 'A single, responsive point of contact guiding you through each milestone and providing reassuring updates along the way.' },
  { num: '02', title: 'IATA Live Animal Regulations', desc: 'Strict adherence to global animal welfare guidelines for crate dimensions, climate-safe transit, and gentle handling.' },
  { num: '03', title: 'Official UAE MOCCAE Expertise', desc: 'Seasoned guidance through complex UAE Ministry export certificates, entry import permits, and airport inspection requirements.' },
  { num: '04', title: 'Door-to-Door Mobility Network', desc: 'Seamless continuity combining our dedicated Dubai pet taxi fleet with trusted international partner agents across global hubs.' },
];

const whyUsHtml = `
<section class="py-20 bg-white border-t border-teal-border">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
    <div class="max-w-3xl space-y-3">
      <span class="inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest">WHY CHOOSE US</span>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">Professional Planning. Personal Attention.</h2>
      <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${trustPillarsData.map(p => `
      <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
        <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
          <span class="font-mono font-black text-lg">${p.num}</span>
        </div>
        <h3 class="text-xl font-black font-heading text-navy">${p.title}</h3>
        <p class="text-sm text-slate-600 leading-relaxed font-body">${p.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;

// 8. Build Section 8: FAQs (10 Distinct Non-Doubled Items)
const faqs = [
  { q: 'What is international pet relocation and how does it work?', a: 'International pet relocation is the complete coordination required to move your pet across borders. This encompasses veterinary protocols, microchipping, rabies testing, travel crate preparation, government import/export permits, airline booking, and airport customs clearance.' },
  { q: 'What is the difference between pet export from Dubai and pet import into Dubai?', a: 'Pet export refers to relocating a pet from Dubai / UAE to another country, which requires UAE MOCCAE health clearance and meeting destination-country entry rules. Pet import refers to bringing a pet into Dubai from abroad, requiring a UAE MOCCAE import permit, valid rabies titer testing (RNATT), and customs clearance upon arrival at DXB.' },
  { q: 'How far in advance should I start planning my pet\'s international relocation?', a: 'We recommend beginning preparation 2 to 4 months in advance. Many destinations enforce strict waiting periods following rabies titer tests (RNATT), and government permit approvals or airline live-animal manifest spaces often require advance booking.' },
  { q: 'Do I need an IATA-compliant travel crate, and can Global Pet Cab provide one?', a: 'Yes. Airlines require IATA Live Animal Regulations (LAR) approved crates that allow your pet to stand, turn, and lie down naturally with secure ventilation and water bowls. We provide custom-fitted IATA wooden and plastic crates and offer crate conditioning guidance.' },
  { q: 'What vaccinations, microchips, and blood tests (RNATT) are required?', a: 'Pets must have an ISO 11784/11785 standard microchip, an up-to-date rabies vaccination, and core vaccinations. Rabies-free or rabies-controlled countries (like the UK, Australia, New Zealand, and EU nations) also mandate a Rabies Blood Titer Test (RNATT) from an approved laboratory.' },
  { q: 'Can Global Pet Cab manage airline bookings and live-animal flight coordination?', a: 'Yes. We coordinate pet travel reservations on pet-friendly international carriers. Depending on airline policy, pet size, and destination requirements, pets travel via climate-controlled manifest cargo, excess baggage with an owner, or in-cabin.' },
  { q: 'How does customs clearance and airport arrival work?', a: 'Upon landing, your pet is transferred to the airport live-animal inspection facility. Our team or destination partner presents the import permits, original health documentation, and airway bill to customs and veterinary border officers to obtain official release.' },
  { q: 'Do you provide complete door-to-door relocation services?', a: 'Yes. Our full-service relocation covers doorstep pickup in our air-conditioned Dubai pet taxi, coordinating pre-travel vet visits and government endorsements, airport check-in, flight supervision, customs clearance, and delivery to your new home address.' },
  { q: 'Will my pet need to go into quarantine upon arrival?', a: 'Quarantine depends on the destination country\'s rabies status and entry protocols. While countries like Australia and New Zealand require a mandatory quarantine stay at government facilities, most destinations allow immediate home release if all advance veterinary tests and permits are verified.' },
  { q: 'Can I get a relocation quote before finalizing my travel date?', a: 'Yes. You can submit your origin, destination, pet breed, weight, and approximate travel timeline via our quote form. Our relocation team will provide a transparent estimate and outline the key preparation milestones for your route.' },
];

const faqsHtml = `
<section class="py-20 bg-[#F6F8FA] border-t border-teal-border">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
    <div class="text-center space-y-3">
      <span class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">QUESTIONS PET PARENTS ASK</span>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">International Pet Relocation Questions, Answered</h2>
      <p class="text-base sm:text-lg font-body text-slate-600">Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process.</p>
    </div>
    <div class="space-y-4">
      ${faqs.map((f, idx) => `
      <div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white">
        <button type="button" class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors">
          <span>${f.q}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${idx === 0 ? 'rotate-180 text-teal-deep' : ''}"><path d="m6 9 6 6 6-6"></path></svg>
        </button>
        ${idx === 0 ? `<div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">${f.a}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>`;

// 9. Build Section 9: Final CTA Banner
const finalCtaHtml = `
<section class="relative overflow-hidden text-white py-20 sm:py-24 bg-navy">
  <div class="absolute inset-0" aria-hidden="true">
    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="" class="object-cover object-center w-full h-full absolute inset-0" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent">
    <div class="absolute inset-0 bg-navy/88"></div>
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
    <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light">
      READY TO PLAN YOUR PET&#x27;S MOVE?
    </div>
    <h2 class="text-3xl sm:text-4xl font-black font-heading text-white">Let&#x27;s Plan Your Pet&#x27;s Journey Together</h2>
    <p class="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps.</p>
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
      <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto">Get a Free Relocation Quote →</a>
      <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
        <span>WhatsApp the Relocation Team</span>
      </a>
    </div>
  </div>
</section>`;

// Assemble complete main HTML
const completeMainContent = `
<div class="font-body space-y-0 text-slate-800">
  <div class="space-y-0">
    ${heroHtml}
    ${formSectionHtml}
    ${whatWeHelpHtml}
  </div>
  <div class="space-y-0">
    ${howItWorksHtml}
    ${localTransportHtml}
    ${routesHtml}
    ${whyUsHtml}
    ${faqsHtml}
    ${finalCtaHtml}
  </div>
</div>`;

// Update .next/server/app/international-pet-relocation.html
const htmlPath = path.join(root, '.next/server/app/international-pet-relocation.html');
let newHtml = existingHtml.replace(/<main class="flex-grow">[\s\S]*?<\/main>/, `<main class="flex-grow">${completeMainContent}</main>`);

fs.writeFileSync(htmlPath, newHtml);
console.log('Successfully written updated .next/server/app/international-pet-relocation.html');

console.log('=== SSR HTML SUCCESSFULLY BUILT WITHOUT ANY DUPLICATED SECTIONS ===');
