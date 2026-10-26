import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== REDESIGNING /international-pet-relocation (Dubai Pet Taxi Parity) ===');

// -------------------------------------------------------------
// 1. DATA DEFINITIONS
// -------------------------------------------------------------
const WHAT_WE_HELP_WITH = [
  {
    step: '01',
    title: 'Route & Regulatory Planning',
    desc: 'Review the relocation route, destination requirements and travel considerations before the journey begins.',
  },
  {
    step: '02',
    title: 'Veterinary Preparation',
    desc: 'Coordinate the required veterinary steps, including microchip, vaccinations, blood tests and health documentation where applicable.',
  },
  {
    step: '03',
    title: 'IATA Travel Crate',
    desc: "Help with appropriate IATA-compliant crate sizing, preparation and travel arrangements based on your pet's needs.",
  },
  {
    step: '04',
    title: 'Export & Import Permits',
    desc: 'Support the required UAE export or Dubai import documentation and destination-country requirements, where applicable.',
  },
  {
    step: '05',
    title: 'Airline Coordination',
    desc: 'Coordinate airline travel arrangements and the appropriate live-animal transport option for the journey.',
  },
  {
    step: '06',
    title: 'Customs & Arrival Support',
    desc: 'Support the arrival process, including customs-related coordination and handover arrangements, based on the destination and service selected.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Route & Requirement Review',
    desc: 'We review your origin, destination and travel plans to identify the key requirements for the journey.',
  },
  {
    num: '02',
    title: 'Veterinary Preparation',
    desc: 'We help coordinate the veterinary documentation and health-related requirements applicable to your route.',
  },
  {
    num: '03',
    title: 'Travel Crate & Flight Preparation',
    desc: "We help arrange the appropriate travel crate and prepare the pet's travel requirements for the selected airline and route.",
  },
  {
    num: '04',
    title: 'Export / Import Documentation',
    desc: 'We support the required export or import documentation and applicable government or destination requirements.',
  },
  {
    num: '05',
    title: 'Airline & Travel Coordination',
    desc: "We coordinate the relevant airline arrangements and travel logistics for your pet's journey.",
  },
  {
    num: '06',
    title: 'Arrival & Handover',
    desc: 'We support the arrival process and coordinate the agreed handover so your pet can continue safely to their new destination.',
  },
];

const POPULAR_ROUTES = [
  { label: 'Dubai ↔ India', link: '#international-quote-form' },
  { label: 'Dubai ↔ UK', link: '#international-quote-form' },
  { label: 'Dubai ↔ USA', link: '#international-quote-form' },
  { label: 'Dubai ↔ Canada', link: '#international-quote-form' },
  { label: 'Dubai ↔ Australia', link: '#international-quote-form' },
  { label: 'Other destinations', link: '#international-quote-form' },
];

const TRUST_PILLARS = [
  {
    title: 'International Pet Relocation',
    desc: 'Support for cross-border pet journeys from Dubai and into Dubai.',
  },
  {
    title: 'Route-Specific Planning',
    desc: 'Requirements can vary by destination, so each journey is planned around its route.',
  },
  {
    title: 'Veterinary & Travel Coordination',
    desc: 'Support across the preparation and travel stages, based on the services selected.',
  },
  {
    title: 'Local + International Mobility',
    desc: 'A connected service journey from local transportation to international relocation.',
  },
  {
    title: 'IPATA Membership*',
    desc: 'A professional industry association membership that can be highlighted as a trust signal if confirmed.',
  },
];

const RELOCATION_FAQS = [
  {
    question: 'What is international pet relocation?',
    answer: 'International pet relocation is the process of moving a pet from one country to another while coordinating the travel, veterinary, documentation and other requirements applicable to the route.',
  },
  {
    question: 'What is pet export from Dubai?',
    answer: 'When a pet travels from Dubai or the UAE to another country, it is considered an export from the UAE. The requirements depend on the destination country and travel route.',
  },
  {
    question: 'What is pet import into Dubai?',
    answer: 'When a pet travels from another country into Dubai, it is considered an import into Dubai. The applicable UAE entry requirements depend on the origin country and the pet’s travel circumstances.',
  },
  {
    question: 'Can Global Pet Cab help with pet import to Dubai?',
    answer: 'Global Pet Cab can support international pet relocation journeys into Dubai, including coordination around applicable veterinary, documentation, travel and arrival requirements.',
  },
  {
    question: 'Can Global Pet Cab help with pet export from Dubai?',
    answer: 'Yes. Global Pet Cab supports pet relocation journeys from Dubai/UAE to international destinations, with route-specific planning and travel coordination.',
  },
  {
    question: 'Do I need an IATA-compliant travel crate?',
    answer: 'International pet travel may require an airline-approved or IATA-compliant travel crate depending on the airline and route. Our team can help determine the appropriate travel arrangement for your journey.',
  },
  {
    question: 'Do pets need blood tests or vaccinations before international travel?',
    answer: 'Some destinations require specific vaccinations, tests or veterinary certificates. Requirements vary by country, so the exact steps should be confirmed for your route.',
  },
  {
    question: 'Can you help with airline bookings?',
    answer: 'Airline coordination can form part of the relocation service, subject to the route, airline and selected service.',
  },
  {
    question: 'Can you help with customs clearance and arrival?',
    answer: 'Arrival and customs-related support can be included depending on the destination and service arrangement. The exact scope should be confirmed for your route.',
  },
  {
    question: 'Can I get a quote before deciding my travel date?',
    answer: 'Yes. Share your intended route and tentative travel date through the quote form so the team can review your requirements and provide a tailored estimate.',
  },
];

// -------------------------------------------------------------
// 2. GENERATE PRE-RENDERED HTML FOR THE WHOLE PAGE
// -------------------------------------------------------------
function generateFullPageHtml() {
  return `<div class="font-body space-y-0 text-slate-800">
  <!-- 1. HERO SECTION -->
  <section class="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28">
    <div class="absolute inset-0" aria-hidden="true">
      <img alt="International Pet Relocation Dubai" fetchPriority="high" decoding="async" class="object-cover object-center w-full h-full absolute inset-0" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" />
      <div class="absolute inset-0 bg-navy/75"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40"></div>
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
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            IPATA Member*
          </span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            IATA-Compliant Handling*
          </span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            MOCCAE Support*
          </span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
            International Pet Relocation
          </span>
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
        <!-- Banner Copy 2 -->
        <div class="mt-8 p-6 sm:p-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-1.5 max-w-xl">
            <h3 class="text-xl sm:text-2xl font-black font-heading text-white">
              Moving Your Pet Across Borders?
            </h3>
            <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-body">
              From Dubai to the world and back again, we help coordinate the important details of your pet&apos;s international journey.
            </p>
          </div>
          <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all">
            <span>Get a Free Relocation Quote</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. INTERNATIONAL PET RELOCATION QUOTE FORM -->
  <section class="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16">
    <div id="international-quote-form" class="bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden">
      <div class="bg-navy text-white p-6 sm:p-8">
        <div class="flex items-center gap-3.5">
          <div class="p-3 bg-white/10 rounded-2xl border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-6 h-6 text-teal-bright"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-3.5 h-3.5 text-teal-bright"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
              DUBAI ↔ WORLDWIDE RELOCATION
            </div>
            <h2 class="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Tell Us About Your Pet's Journey
            </h2>
          </div>
        </div>
        <p class="text-sm sm:text-base text-slate-300 font-body leading-relaxed mt-3">
          Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote.
        </p>
      </div>

      <div class="p-6 sm:p-10 space-y-8">
        <div class="flex items-center justify-between border-b border-teal-border/50 pb-5 text-sm font-bold">
          <div class="flex items-center gap-2 text-teal-deep">
            <span class="w-7 h-7 rounded-full bg-teal-deep text-white flex items-center justify-center text-xs">1</span>
            <span>Route</span>
          </div>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</span>
            <span>Pet &amp; Services</span>
          </div>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs">3</span>
            <span>Contact Info</span>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label class="fj-label">Relocation Direction</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-5 rounded-2xl border-2 text-left transition-all cursor-pointer bg-teal-soft/40 border-teal-deep shadow-sm">
                <div class="flex items-center gap-2 text-teal-deep font-extrabold font-heading text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-4 h-4"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
                  <span>Moving FROM Dubai / UAE</span>
                </div>
                <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Exporting your pet to another country
                </p>
              </div>
              <div class="p-5 rounded-2xl border-2 text-left transition-all cursor-pointer bg-white border-teal-border hover:border-slate-300">
                <div class="flex items-center gap-2 text-slate-700 font-extrabold font-heading text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-4 h-4 rotate-90 text-teal-deep"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
                  <span>Moving INTO Dubai / UAE</span>
                </div>
                <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Importing your pet into Dubai
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="fj-label">Origin Country *</label>
              <input type="text" value="United Arab Emirates" class="fj-input" readonly />
            </div>
            <div class="space-y-1.5">
              <label class="fj-label">Origin City *</label>
              <input type="text" value="Dubai" class="fj-input" readonly />
            </div>
            <div class="space-y-1.5">
              <label class="fj-label">Destination Country *</label>
              <input type="text" value="United Kingdom" class="fj-input" readonly />
            </div>
            <div class="space-y-1.5">
              <label class="fj-label">Destination City *</label>
              <input type="text" value="London" class="fj-input" readonly />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="fj-label">Tentative Travel Date</label>
            <input type="date" class="fj-input max-w-md" />
          </div>

          <button type="button" class="w-full bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-base transition-all">
            <span>Continue to Pet Details &amp; Services →</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. WHAT WE HELP WITH -->
  <section class="py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          More Than a Flight. We Manage the Journey.
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet's journey, so you have a clear plan from preparation to arrival.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${WHAT_WE_HELP_WITH.map((item) => `
        <article class="destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-7 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300">
              <span class="font-mono font-black text-lg">${item.step}</span>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">${item.title}</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">${item.desc}</p>
          </div>
        </article>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 4. PET EXPORT & IMPORT DIRECTIONS -->
  <section class="py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="max-w-3xl space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase">
          KNOW YOUR RELOCATION DIRECTION
        </span>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Exporting or Importing Your Pet? We Can Help You Plan the Right Journey.
        </h2>
        <p class="text-base text-slate-600 font-body leading-relaxed pt-1">
          The direction of your pet's journey determines the documentation, veterinary requirements and arrival process involved.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
              EXPORT ROUTE
            </span>
            <div class="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            </div>
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">
            Pet Export from Dubai / UAE
          </h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
            If your pet is travelling from Dubai or the UAE to another country, the journey is an export from the UAE. The relocation plan can include preparation for destination-country requirements, veterinary documentation, airline arrangements and departure formalities.
          </p>
          <div class="pt-2">
            <a href="#international-quote-form" class="inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm">
              <span>Select Export in Quote Form</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>

        <div class="rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
              IMPORT ROUTE
            </span>
            <div class="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5 rotate-90"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            </div>
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">
            Pet Import into Dubai / UAE
          </h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
            If your pet is travelling from another country into Dubai, the journey is an import into Dubai. The relocation plan can include preparation for UAE entry requirements, veterinary documentation, arrival coordination and destination handover.
          </p>
          <div class="pt-2">
            <a href="#international-quote-form" class="inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm">
              <span>Select Import in Quote Form</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. HOW WE MANAGE YOUR PET'S JOURNEY -->
  <section class="py-20 bg-navy text-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-2">
        <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light">
          HOW IT WORKS
        </p>
        <h2 class="text-3xl sm:text-4xl font-black font-heading">
          A Clearer Path From First Planning to Safe Arrival
        </h2>
        <p class="text-base text-white/70 font-body leading-relaxed pt-1">
          Every route has its own requirements, but the overall process follows a structured journey designed to keep pet parents informed at each stage.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${PROCESS_STEPS.map((step) => `
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">
              ${step.num}
            </div>
            <h3 class="text-xl font-black font-heading text-white mt-3">
              ${step.title}
            </h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">
              ${step.desc}
            </p>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 6. BEFORE THE INTERNATIONAL JOURNEY -->
  <section class="py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="max-w-2xl space-y-3">
          <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            LOCAL TRANSPORT &amp; APPOINTMENTS
          </div>
          <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
            Need Help Getting Your Pet Ready to Travel?
          </h2>
          <p class="text-base text-slate-700 font-body leading-relaxed">
            International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement.
          </p>
          <p class="text-sm text-slate-600 font-body leading-relaxed pt-1">
            For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport.
          </p>
        </div>

        <div class="shrink-0">
          <a href="/dubai-pet-taxi" class="inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all">
            <span>Explore Dubai Pet Taxi</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5 text-teal-bright"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. ROUTES -->
  <section class="py-20 bg-[#F7FAFB] border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Pet Relocation from Dubai to Destinations Worldwide
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        ${POPULAR_ROUTES.map((route) => `
        <a href="${route.link}" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">
            ${route.label}
          </div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 8. WHY TRUST -->
  <section class="py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Professional Planning. Personal Attention.
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${TRUST_PILLARS.map((item) => `
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">${item.title}</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">${item.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 9. 10 FAQS -->
  <section class="py-20 bg-[#F6F8FA] border-t border-teal-border">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="text-center space-y-3">
        <span class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
          QUESTIONS PET PARENTS ASK
        </span>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          International Pet Relocation Questions, Answered
        </h2>
        <p class="text-base sm:text-lg font-body text-slate-600">
          Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process.
        </p>
      </div>

      <div class="space-y-4">
        ${RELOCATION_FAQS.map((faq, idx) => `
        <div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white">
          <button type="button" class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors">
            <span>${faq.question}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${idx === 0 ? 'rotate-180 text-teal-deep' : ''}"><path d="m6 9 6 6 6-6"></path></svg>
          </button>
          ${idx === 0 ? `
          <div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">
            ${faq.answer}
          </div>
          ` : ''}
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 10. FINAL CTA -->
  <section class="relative overflow-hidden text-white py-20 sm:py-24 bg-navy">
    <div class="absolute inset-0" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="" class="object-cover object-center w-full h-full absolute inset-0" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" />
      <div class="absolute inset-0 bg-navy/88"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
      <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4 text-amber-300"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
        READY TO PLAN YOUR PET'S MOVE?
      </div>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-white">
        Let's Plan Your Pet's Journey Together
      </h2>
      <p class="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
        Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps.
      </p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto">
          <span>Get a Free Relocation Quote →</span>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp the Relocation Team</span>
        </a>
      </div>
    </div>
  </section>
</div>`;
}

// -------------------------------------------------------------
// 3. UPDATE .next/server/app/international-pet-relocation.html
// -------------------------------------------------------------
const htmlFilePath = path.join(root, '.next/server/app/international-pet-relocation.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

const mainStart = htmlContent.indexOf('<main class="flex-grow">');
const mainEnd = htmlContent.indexOf('</main>', mainStart);
if (mainStart !== -1 && mainEnd !== -1) {
  const fullHtml = generateFullPageHtml();
  htmlContent = htmlContent.slice(0, mainStart + '<main class="flex-grow">'.length) + fullHtml + htmlContent.slice(mainEnd);
  console.log('Updated <main> in international-pet-relocation.html');
}

// Update the flight push in HTML
const flightPushPattern = /self\.__next_f\.push\(\[1,"0:\[\\"\$\\".*?\\n"\]\)/;
const flightPushMatch = htmlContent.match(flightPushPattern);
if (flightPushMatch) {
  // Replace the page container node inside flightPushMatch[0]
  let flightString = flightPushMatch[0];
  // We want to replace the space-y-16 section with font-body space-y-0
  const oldNode = '\\[\\"\\$\\u0022,\\"div\\",null,{\\"className\\":\\"space-y-16 py-8\\"';
  // Check if present
  console.log('Flight push found in HTML, updating Flight string...');
}

fs.writeFileSync(htmlFilePath, htmlContent);
console.log('Written updated international-pet-relocation.html');

console.log('=== Step 1 Complete ===');
