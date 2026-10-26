import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(js|html|rsc|json)$/.test(name)) files.push(p);
  }
  return files;
}

const FAQS = [
  {
    question: 'How is my Dubai pet taxi fare calculated?',
    answer: 'Your estimated fare is based on the journey distance and selected trip details, including the type of ride and number of pets. Any applicable additional charges are shown in the estimate.',
  },
  {
    question: 'Can I travel with my pet during the ride?',
    answer: 'Yes, where permitted under the service arrangement. Please confirm the passenger policy when booking.',
  },
  {
    question: 'Are your pet taxi vehicles climate-controlled?',
    answer: 'Our Dubai pet taxi service is designed to provide pets with a comfortable environment during their journey.',
  },
  {
    question: 'Can you pick up my pet from my home?',
    answer: 'Yes. Our door-to-door service can collect your pet from your home or another agreed pickup location in Dubai.',
  },
  {
    question: 'Do you provide door-to-airport and airport-to-door transfers?',
    answer: 'Yes. Global Pet Cab provides transportation between your chosen pickup or drop-off location and the airport for travelling pets.',
  },
  {
    question: 'Can you take my pet to a grooming appointment if I am unavailable?',
    answer: 'Our team can help with the transportation and support around selected grooming appointments when the pet parent cannot be there, subject to the service arrangement.',
  },
  {
    question: 'Can you help with a vet or health-related appointment if I cannot be there?',
    answer: "Our team can assist with the pet's journey to selected health-related appointments when the pet parent is unavailable, subject to the service arrangement.",
  },
  {
    question: 'Do you provide city-to-city pet transportation?',
    answer: 'City-to-city ground transportation may be available for selected journeys. Contact the Global Pet Cab team to confirm the route and service availability.',
  },
  {
    question: 'Do you provide international pet relocation?',
    answer: 'Yes. Global Pet Cab also supports international pet journeys. When a pet travels from another country into Dubai, this is an import into Dubai. When a pet travels from Dubai or the UAE to another country, this is an export from the UAE.',
  },
];

const faqsJsString = JSON.stringify(FAQS);

// Generate pre-rendered HTML for all 9 FAQs:
function generateFaqsHtml() {
  return '<div class="space-y-4">' + FAQS.map((faq, idx) => {
    if (idx === 0) {
      return `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${faq.question}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 rotate-180 text-teal-deep"><path d="m6 9 6 6 6-6"></path></svg></button><div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">${faq.answer}</div></div>`;
    }
    return `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${faq.question}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 "><path d="m6 9 6 6 6-6"></path></svg></button></div>`;
  }).join('') + '</div>';
}

const faqsHtml = generateFaqsHtml();

// 1. Text Replacements
const textPairs = [
  // --- 1. HERO SECTION ---
  [
    'Dubai Local Mobility',
    'DUBAI PET TAXI',
  ],
  [
    'Dubai&#x27;s Pet Taxi for Safe, Comfortable Door-to-Door Travel',
    'Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel',
  ],
  [
    "Dubai's Pet Taxi for Safe, Comfortable Door-to-Door Travel",
    'Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel',
  ],
  [
    'Professional pet transport across Dubai for veterinary clinic appointments, grooming, pet boarding facilities, airport transfers, and home moves.',
    'From everyday trips across Dubai to airport transfers and essential pet appointments, Global Pet Cab makes getting your pet from one place to another simple and comfortable. Our pet taxi service provides convenient door-to-door transportation for vet visits, grooming, boarding, airports and more.',
  ],

  // --- 2. FARE CALCULATOR ---
  [
    'Instant distance fare',
    'INSTANT DISTANCE FARE',
  ],
  [
    'One Way Ride',
    'One-Way Ride',
  ],
  [
    'Round Trip (-10%)',
    'Round Trip — Save 10%',
  ],

  // --- 3. WHERE WE TAKE YOUR PET IN DUBAI ---
  [
    'Door-to-door transportation tailored for everyday pet needs.',
    'Whether your pet needs to get across town, reach an appointment or travel to the airport, our Dubai pet taxi service helps make the journey easier from pickup to drop-off.',
  ],
  [
    'Stress-free rides to clinics &amp; emergency vet centers across Dubai.',
    "Comfortable rides to veterinary clinics and pet health appointments across Dubai. If you cannot be there yourself, ask our team about assistance with your pet's journey.",
  ],
  [
    'Stress-free rides to clinics & emergency vet centers across Dubai.',
    "Comfortable rides to veterinary clinics and pet health appointments across Dubai. If you cannot be there yourself, ask our team about assistance with your pet's journey.",
  ],
  [
    "Scheduled pickups and drop-offs to your preferred pet pampering salon.",
    "Scheduled pickups and drop-offs for grooming appointments and your pet's preferred salon. If you are unavailable, our team can help with the journey, subject to the service arrangement.",
  ],
  [
    'Comfortable transfer to and from pet boarding &amp; daycare resorts.',
    'Reliable transportation to and from pet hotels, boarding facilities and daycare centres.',
  ],
  [
    'Comfortable transfer to and from pet boarding & daycare resorts.',
    'Reliable transportation to and from pet hotels, boarding facilities and daycare centres.',
  ],
  [
    'DXB / DWC Airports',
    'Door-to-Airport Transfers',
  ],
  [
    'Direct transfers to Dubai International &amp; Al Maktoum Airport departures.',
    'Convenient transportation from your home or chosen pickup location to the airport when your pet is travelling.',
  ],
  [
    'Direct transfers to Dubai International & Al Maktoum Airport departures.',
    'Convenient transportation from your home or chosen pickup location to the airport when your pet is travelling.',
  ],
  [
    'Round Trip Waiting',
    'Airport-to-Door Transfers',
  ],
  [
    'Your driver waits on-site while your pet gets checked or groomed.',
    'A comfortable ride from the airport to your home or destination after your pet arrives.',
  ],
  [
    'Moving between Dubai apartments or villas? We carry your pet safely.',
    'Moving between apartments, villas or other locations in Dubai? We can help your pet travel comfortably to their new home.',
  ],
  [
    'One-Way Transfers',
    'City-to-City Ground Transport',
  ],
  [
    'Flexible single destination transfers across all Dubai neighborhoods.',
    'Need to move your pet beyond Dubai? Ask about available city-to-city ground transportation options.',
  ],
  [
    'Pet Events &amp; Parks',
    'Pet Parks & Other Destinations',
  ],
  [
    'Pet Events & Parks',
    'Pet Parks & Other Destinations',
  ],
  [
    'Rides to dog parks, pet meetups, and pet-friendly cafes.',
    'Transportation for pet-friendly parks, events, meetups and other everyday destinations across Dubai.',
  ],
  [
    '>Marina<',
    '>Dubai Marina<',
  ],
  [
    '"Marina"',
    '"Dubai Marina"',
  ],

  // --- 4. HOW IT WORKS ---
  [
    'Dubai Pet Taxi Journey Steps',
    'Your Dubai Pet Taxi Journey, Made Simple',
  ],
  [
    '01 — Calculate Your Fare',
    'Calculate Your Fare',
  ],
  [
    'Calculate Fare',
    'Calculate Your Fare',
  ],
  [
    'Enter your pickup and dropoff locations in Dubai. Our fare engine calculates exact driving distance and estimated price.',
    'Enter your pickup and drop-off locations and select your journey details to see your estimated pet taxi fare.',
  ],
  [
    '02 — Share Your Pet Details',
    'Share Your Pet Details',
  ],
  [
    'Share Pet Details',
    'Share Your Pet Details',
  ],
  [
    'Provide pet name, breed, date, and preferred pickup time. Submit to generate reference GPC-DXB-XXXX.',
    'Tell us about your pet, including the pet type, number of pets, travel date and preferred pickup time.',
  ],
  [
    '03 — Meet Your Driver',
    'Driver Pickup & Ride',
  ],
  [
    '03 — Driver Pickup & Ride',
    'Driver Pickup & Ride',
  ],
  [
    'Meet Your Driver',
    'Driver Pickup & Ride',
  ],
  [
    'Driver Pickup &amp; Ride',
    'Driver Pickup & Ride',
  ],
  [
    'Driver arrives at your doorstep in a climate-controlled vehicle. Pet parents ride along or track status via WhatsApp!',
    'Your driver arrives at the pickup location and takes your pet comfortably to the destination. For selected grooming or health appointments, our team can also assist when the pet parent is unavailable, subject to the service arrangement.',
  ],

  // --- 5. TRANSPARENT FARES ---
  [
    'Transparent fares',
    'SIMPLE, TRANSPARENT PRICING',
  ],
  [
    'Base fare, including first 5 km',
    'Base fare, including the first 5 km',
  ],
  [
    'Distance rate + 5% UAE VAT',
    'Distance rate + applicable 5% UAE VAT',
  ],
  [
    'No surprises',
    'Clear Pricing',
  ],
  [
    'No hidden fees',
    'NO HIDDEN FEES',
  ],
  [
    'Optional extra pets or night surcharge shown in the estimate',
    'Any applicable extras, such as additional pets or night surcharges, are shown in the estimate.',
  ],

  // --- 6. FAQ SECTION ---
  [
    'Frequently Asked Questions',
    'Dubai Pet Taxi Questions, Answered',
  ],
  [
    'Everything you need to know about our Dubai local rides and global relocation services.',
    'Planning a ride for your pet? Here are some of the questions pet parents may have before booking.',
  ],

  // --- 7. FINAL CTA ---
  [
    'Ready for a Dubai pet taxi ride?',
    "Your Pet's Next Ride Starts Here",
  ],
  [
    'Calculate your fare above, or message the Dubai team on WhatsApp.',
    'Whether your pet needs a ride across Dubai, a trip to the airport or help getting to an essential appointment, Global Pet Cab is here to make the journey easier from doorstep to destination.',
  ],
];

// Special HTML structure replacements for dubai-pet-taxi.html
const htmlReplacements = [
  // Hero H1 font size: 2.5rem, line-height: 1.2
  [
    '<h1 class="text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12]">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
    '<h1 class="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1" style="font-size:2.5rem !important;line-height:1.2 !important;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
  ],
  [
    '<h1 class="text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12] pet-taxi-hero-h1" style="font-size:2.5rem;line-height:1.2;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
    '<h1 class="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1" style="font-size:2.5rem !important;line-height:1.2 !important;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
  ],

  // Destination Cards Flations & Hover Lift
  [
    'class="rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card transition-all"',
    'class="destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"',
  ],
  [
    'class="w-11 h-11 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border mb-4"',
    'class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm mb-4 group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300"',
  ],

  // Hero Badges replacement:
  [
    '<div class="flex flex-wrap gap-2 pt-1"><span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-4 h-4 text-teal-light"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>CLIMATE-CONTROLLED FLEET</span><span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4 text-teal-light"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Doorstep pickup</span></div>',
    '<div class="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light"><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">Climate-Controlled Fleet</span><span class="text-white/40">|</span><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">Doorstep Pickup</span><span class="text-white/40">|</span><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">Pet-Friendly Service</span></div>',
  ],

  // Hero CTA button replacement:
  [
    'class="inline-flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral">Calculate my fare',
    'class="inline-flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral">Calculate My Fare',
  ],
  [
    'class="inline-flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral">Calculate Your Pet Taxi Fare',
    'class="inline-flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral">Calculate My Fare',
  ],

  // Calculator H2:
  [
    '<h2 class="text-2xl sm:text-3xl font-black font-heading text-navy mt-1">Calculate my fare</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black font-heading text-navy mt-1">Calculate Your Pet Taxi Fare</h2>',
  ],

  // Calculator Subtitle:
  [
    '<h2 class="text-2xl sm:text-3xl font-black font-heading text-navy mt-1">Calculate Your Pet Taxi Fare</h2></div>',
    '<h2 class="text-2xl sm:text-3xl font-black font-heading text-navy mt-1">Calculate Your Pet Taxi Fare</h2><p class="text-sm text-slate-500 mt-1">Enter your pickup and drop-off locations in Dubai to get an estimated fare based on your journey.</p></div>',
  ],

  // How it works header in single line:
  [
    '<div class="max-w-2xl mb-12"><p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light mb-3">HOW IT WORKS</p><h2 class="text-3xl sm:text-4xl font-black font-heading">Your Dubai Pet Taxi Journey, Made Simple</h2></div>',
    '<div class="max-w-4xl mb-12"><p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light mb-3">HOW IT WORKS</p><h2 class="text-3xl sm:text-4xl font-black font-heading lg:whitespace-nowrap how-it-works-single-line">Your Dubai Pet Taxi Journey, Made Simple</h2><p class="text-base text-white/70 font-body leading-relaxed mt-2">From booking to drop-off, we keep the process straightforward so you know what to expect at every step.</p></div>',
  ],
  [
    '<div class="max-w-2xl mb-12"><p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light mb-3">How it works</p><h2 class="text-3xl sm:text-4xl font-black font-heading">Your Dubai Pet Taxi Journey, Made Simple</h2></div>',
    '<div class="max-w-4xl mb-12"><p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light mb-3">HOW IT WORKS</p><h2 class="text-3xl sm:text-4xl font-black font-heading lg:whitespace-nowrap how-it-works-single-line">Your Dubai Pet Taxi Journey, Made Simple</h2><p class="text-base text-white/70 font-body leading-relaxed mt-2">From booking to drop-off, we keep the process straightforward so you know what to expect at every step.</p></div>',
  ],

  // How it works bottom note:
  [
    'subject to the service arrangement.</p></div></div></div></section><section class="py-16 bg-[#F6F8FA]',
    'subject to the service arrangement.</p></div></div><div class="mt-8 text-sm text-white/80 font-body p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"><span>Need help during the booking process? Contact the Global Pet Cab team on WhatsApp.</span><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="text-teal-light font-bold hover:underline shrink-0">WhatsApp Us →</a></div></div></section><section class="py-16 bg-[#F6F8FA]',
  ],

  // Transparent Fares Header & note:
  [
    '<section class="py-16 bg-[#F6F8FA]"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">',
    '<section class="py-16 bg-[#F6F8FA]"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"><div class="max-w-2xl space-y-2"><p class="text-xs font-extrabold uppercase tracking-widest text-teal-deep">SIMPLE, TRANSPARENT PRICING</p><h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">Know Your Fare Before You Ride</h2><p class="text-base text-slate-600 font-body leading-relaxed pt-1">Your Dubai pet taxi fare is calculated based on the journey distance and selected ride details, so you can see the estimated cost before booking.</p></div><div class="pricing-pale-fix rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">',
  ],
  [
    'class="rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"',
    'class="pricing-pale-fix rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"',
  ],
  [
    'shown in the estimate.</p></div></div></div></section>',
    'shown in the estimate.</p></div></div><p class="text-xs text-slate-500 font-body italic mt-4">Pricing, VAT and surcharge details should be confirmed by the Global Pet Cab team before final publication.</p></div></section>',
  ],

  // FAQ Subtitle in single line:
  [
    '<p class="text-base sm:text-lg font-body text-slate-600">Planning a ride for your pet? Here are some of the questions pet parents may have before booking.</p>',
    '<p class="text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line" style="white-space:nowrap">Planning a ride for your pet? Here are some of the questions pet parents may have before booking.</p>',
  ],

  // Final CTA button replacement:
  [
    'class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full">Calculate my fare',
    'class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full">Calculate My Fare →',
  ],
  [
    'class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full">Calculate Your Pet Taxi Fare',
    'class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full">Calculate My Fare →',
  ],
];

// Clean Steps definition for server page.js
const cleanStepsJs = `let N=[{n:"1",title:"Calculate Your Fare",desc:"Enter your pickup and drop-off locations and select your journey details to see your estimated pet taxi fare."},{n:"2",title:"Share Your Pet Details",desc:"Tell us about your pet, including the pet type, number of pets, travel date and preferred pickup time."},{n:"3",title:"Driver Pickup & Ride",desc:"Your driver arrives at the pickup location and takes your pet comfortably to the destination. For selected grooming or health appointments, our team can also assist when the pet parent is unavailable, subject to the service arrangement."}];`;

// Execute Walk and Patch
const files = walk(root);
let patchedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // General text pairs
  for (const [from, to] of textPairs) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
    }
  }

  // HTML-specific structures
  if (file.endsWith('.html')) {
    for (const [from, to] of htmlReplacements) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
      }
    }
  }

function escapeRsc(s) {
  return s.replaceAll('"', '\\"');
}

const rscReplacements = [
  // 1. Hero H1 styling (font-size: 2.5rem; line-height: 1.2)
  [
    '["$","h1",null,{"className":"text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12]","children":"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"}]',
    '["$","h1",null,{"className":"font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1","style":{"fontSize":"2.5rem","lineHeight":1.2},"children":"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"}]'
  ],
  // 2. Hero badges
  [
    '["$","div",null,{"className":"flex flex-wrap gap-2 pt-1","children":[["$","span",null,{"className":"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold","children":[["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-shield-check w-4 h-4 text-teal-light","children":[["$","path","oel41y",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["$","path","dzmm74",{"d":"m9 12 2 2 4-4"}],"$undefined"]}],"CLIMATE-CONTROLLED FLEET"]}],["$","span",null,{"className":"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold","children":[["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-map-pin w-4 h-4 text-teal-light","children":[["$","path","1r0f0z",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["$","circle","ilqhr7",{"cx":"12","cy":"10","r":"3"}],"$undefined"]}],"Doorstep pickup"]}]]}]',
    '["$","div",null,{"className":"flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light","children":[["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":[["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-shield-check w-4 h-4 text-teal-bright","children":[["$","path","oel41y",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["$","path","dzmm74",{"d":"m9 12 2 2 4-4"}],"$undefined"]}],"Climate-Controlled Fleet"]}],["$","span",null,{"className":"text-white/40","children":"|"}],["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":[["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-map-pin w-4 h-4 text-teal-bright","children":[["$","path","1r0f0z",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["$","circle","ilqhr7",{"cx":"12","cy":"10","r":"3"}],"$undefined"]}],"Doorstep Pickup"]}],["$","span",null,{"className":"text-white/40","children":"|"}],["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":"Pet-Friendly Service"}]]}]'
  ],
  // 3. Hero CTA button
  [
    '["Calculate Your Pet Taxi Fare",',
    '["Calculate My Fare",'
  ],
  // 4. Bottom CTA button
  [
    '"children":"Calculate Your Pet Taxi Fare"',
    '"children":"Calculate My Fare →"'
  ],
  // 5. Destination card flation
  [
    '"className":"rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card transition-all"',
    '"className":"destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"'
  ],
  [
    '"className":"w-11 h-11 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border mb-4"',
    '"className":"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm mb-4 group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300"'
  ],
  // 6. How it works
  [
    '"className":"max-w-2xl mb-12"',
    '"className":"max-w-4xl mb-12"'
  ],
  [
    '"className":"text-3xl sm:text-4xl font-black font-heading","children":"Your Dubai Pet Taxi Journey, Made Simple"',
    '"className":"text-3xl sm:text-4xl font-black font-heading lg:whitespace-nowrap how-it-works-single-line","children":"Your Dubai Pet Taxi Journey, Made Simple"'
  ],
  // 7. Pricing Pale Fix container
  [
    '"className":"rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"',
    '"className":"pricing-pale-fix rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"'
  ]
];

// Replace FAQ in dubai-pet-taxi.html
if (file.endsWith('dubai-pet-taxi.html')) {
  const faqStart = content.indexOf('<div class="space-y-4"><div class="border border-teal-border rounded-2xl');
  if (faqStart !== -1) {
    const faqEnd = content.indexOf('</div></div></section><section class="relative overflow-hidden text-white py-12 sm:py-14', faqStart);
    if (faqEnd !== -1) {
      content = content.slice(0, faqStart) + faqsHtml + content.slice(faqEnd + 6);
    }
  }

  // Also patch the embedded self.__next_f.push RSC payload inside dubai-pet-taxi.html!
  for (const [from, to] of rscReplacements) {
    const fromEsc = escapeRsc(from);
    const toEsc = escapeRsc(to);
    if (content.includes(fromEsc)) {
      content = content.replaceAll(fromEsc, toEsc);
    }
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
    }
  }
}

// Patch dubai-pet-taxi.rsc
if (file.endsWith('dubai-pet-taxi.rsc')) {
  for (const [from, to] of rscReplacements) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
    }
  }
}

// Patch server page.js for dubai-pet-taxi
if (file.includes('dubai-pet-taxi') && file.endsWith('page.js')) {
  // 1. FAQ array
  const faqMatch = content.match(/let\s+d\s*=\s*\[\{question:[^\]]+\];/);
  if (faqMatch) {
    content = content.replace(faqMatch[0], `let d=${faqsJsString};`);
  }

  // 2. Steps array (remove 01, 02)
  const stepsMatch = content.match(/let\s+N\s*=\s*\[\{n:"1"[^\]]+\];/);
  if (stepsMatch) {
    content = content.replace(stepsMatch[0], cleanStepsJs);
  }

  // 3. How It Works max-w-4xl & single line heading
  content = content.replaceAll('className:"max-w-2xl mb-12', 'className:"max-w-4xl mb-12');
  content = content.replaceAll(
    's.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading",children:"Your Dubai Pet Taxi Journey, Made Simple"})',
    's.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading lg:whitespace-nowrap how-it-works-single-line",children:"Your Dubai Pet Taxi Journey, Made Simple"})'
  );

  // 4. Hero H1 styling
  content = content.replaceAll(
    's.jsx("h1",{className:"text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12]",children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
    's.jsx("h1",{className:"font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})'
  );
  content = content.replaceAll(
    's.jsx("h1",{className:"text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
    's.jsx("h1",{className:"font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})'
  );

  // 5. Hero badges
  content = content.replaceAll(
    '(0,s.jsxs)("div",{className:"flex flex-wrap gap-2 pt-1",children:[(0,s.jsxs)("span",{className:"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold",children:[s.jsx(u.Z,{className:"w-4 h-4 text-teal-light"}),"CLIMATE-CONTROLLED FLEET"]}),(0,s.jsxs)("span",{className:"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-bold",children:[s.jsx(b.Z,{className:"w-4 h-4 text-teal-light"}),"Doorstep pickup"]})]})',
    '(0,s.jsxs)("div",{className:"flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light",children:[(0,s.jsxs)("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:[s.jsx(u.Z,{className:"w-4 h-4 text-teal-bright"}),"Climate-Controlled Fleet"]}),s.jsx("span",{className:"text-white/40",children:"|"}),(0,s.jsxs)("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:[s.jsx(b.Z,{className:"w-4 h-4 text-teal-bright"}),"Doorstep Pickup"]}),s.jsx("span",{className:"text-white/40",children:"|"}),s.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"Pet-Friendly Service"})]})'
  );

  // 6. Hero CTA button
  content = content.replaceAll(
    'children:["Calculate Your Pet Taxi Fare",s.jsx(g.Z,{className:"w-5 h-5"})]})',
    'children:["Calculate My Fare",s.jsx(g.Z,{className:"w-5 h-5"})]})'
  );

  // 7. Bottom CTA button
  content = content.replaceAll(
    's.jsx("a",{href:"#dubai-taxi-calculator",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full",children:"Calculate Your Pet Taxi Fare"})',
    's.jsx("a",{href:"#dubai-taxi-calculator",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover font-extrabold font-heading px-8 py-4 rounded-full",children:"Calculate My Fare →"})'
  );

  // 8. Destination card flation
  content = content.replaceAll(
    'className:"rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card transition-all"',
    'className:"destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-6 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"'
  );
  content = content.replaceAll(
    'className:"w-11 h-11 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border mb-4"',
    'className:"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm mb-4 group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300"'
  );

  // 9. FAQ subtitle single line
  content = content.replaceAll(
    'className:"text-base sm:text-lg font-body text-slate-600",children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."',
    'className:"text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line",children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."'
  );

  // 10. Pricing Pale Fix container
  content = content.replaceAll(
    'className:"rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"',
    'className:"pricing-pale-fix rounded-[28px] bg-white border border-teal-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8"'
  );
}

// Patch client chunk page-90801651df4e3acb.js
if (file.includes('dubai-pet-taxi') && file.endsWith('.js') && file.includes('90801651df4e3acb')) {
  const match = content.match(/let\s+c\s*=\s*\[\{question:[^\]]+\];/);
  if (match) {
    content = content.replace(match[0], `let c=${faqsJsString};`);
  }
  content = content.replaceAll(
    'className:"text-base sm:text-lg font-body text-slate-600",children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."',
    'className:"text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line",children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."'
  );
}

// Replace Calculator header in 262.js and 879 chunk
if (file.includes('262.js') || file.includes('879-1c4eb1423b71f4ad')) {
  content = content.replaceAll('Instant distance fare', 'INSTANT DISTANCE FARE');
  content = content.replaceAll('Calculate my fare', 'Calculate Your Pet Taxi Fare');
  content = content.replaceAll('One Way Ride', 'One-Way Ride');
  content = content.replaceAll('Round Trip (-10%)', 'Round Trip — Save 10%');
}

  if (content !== original) {
    fs.writeFileSync(file, content);
    patchedCount++;
    console.log(`Patched: ${path.relative(root, file)}`);
  }
}

console.log(`Patched ${patchedCount} files under .next for Dubai Pet Taxi page`);
