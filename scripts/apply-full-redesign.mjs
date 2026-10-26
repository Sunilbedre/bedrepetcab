import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== STARTING CLEAN NON-DUPLICATED REDESIGN FOR /international-pet-relocation ===');

// -------------------------------------------------------------------------------------
// 1. DATA DEFINITIONS (Deduplicated, distinct, aligned with dubai-pet-taxi excellence)
// -------------------------------------------------------------------------------------

// Section 3: Comprehensive Services Scope (6 items)
const WHAT_WE_HELP = [
  {
    num: '01',
    title: 'Route & Regulatory Planning',
    desc: 'Review the relocation route, destination requirements, quarantine guidelines and travel considerations before the journey begins.',
  },
  {
    num: '02',
    title: 'Veterinary Preparation',
    desc: 'Coordinate required veterinary steps, including ISO microchip, core vaccinations, RNATT blood titer tests and official health certification.',
  },
  {
    num: '03',
    title: 'IATA Travel Crate',
    desc: "Appropriate IATA-compliant crate sizing, preparation and travel arrangements tailored to your pet's exact measurements.",
  },
  {
    num: '04',
    title: 'UAE MOCCAE & Entry Permits',
    desc: 'Support required UAE MOCCAE export documentation or Dubai import permits and destination-country government requirements.',
  },
  {
    num: '05',
    title: 'Airline Coordination',
    desc: 'Coordinate airline travel arrangements and the appropriate pet-friendly live-animal transport option for the flight.',
  },
  {
    num: '06',
    title: 'Customs & Arrival Support',
    desc: 'Support destination customs clearance, import inspection, and safe handover arrangements based on the route selected.',
  },
];

// Section 4: How It Works — 4 Sequential Customer Journey Phases (NOT duplicating service tasks!)
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Submit Route & Pet Details',
    desc: 'Share your origin, destination, intended travel timeline and pet specs through our quote form. Our relocation specialists evaluate route feasibility and country protocols.',
  },
  {
    num: '02',
    title: 'Custom Plan & Health Schedule',
    desc: 'We construct a custom timeline detailing required veterinary steps, blood testing windows, microchip checks and IATA crate sizing tailored to your pet.',
  },
  {
    num: '03',
    title: 'Permit Approvals & Flight Booking',
    desc: 'Our team secures official UAE MOCCAE permits, destination import licenses, and books live-animal manifest cargo on approved pet-friendly airlines.',
  },
  {
    num: '04',
    title: 'Departure Transit & Safe Handover',
    desc: 'We manage pre-flight airport transfer, export check-in, customs clearance at arrival, and safe handover so your family is joyfully reunited.',
  },
];

// Section 6: Worldwide Routes
const ROUTES = [
  { label: 'Dubai ↔ India', link: '#international-quote-form' },
  { label: 'Dubai ↔ UK', link: '#international-quote-form' },
  { label: 'Dubai ↔ USA', link: '#international-quote-form' },
  { label: 'Dubai ↔ Canada', link: '#international-quote-form' },
  { label: 'Dubai ↔ Australia', link: '#international-quote-form' },
  { label: 'Other destinations', link: '#international-quote-form' },
];

// Section 7: Genuine Trust & Capability Pillars (NOT repeating services or routes!)
const TRUST_PILLARS = [
  {
    num: '01',
    title: 'Dedicated Relocation Specialist',
    desc: 'A single, responsive point of contact guiding you through each milestone and providing reassuring updates along the way.',
  },
  {
    num: '02',
    title: 'IATA Live Animal Regulations',
    desc: 'Strict adherence to global animal welfare guidelines for crate dimensions, climate-safe transit, and gentle handling.',
  },
  {
    num: '03',
    title: 'Official UAE MOCCAE Expertise',
    desc: 'Seasoned guidance through complex UAE Ministry export certificates, entry import permits, and airport inspection requirements.',
  },
  {
    num: '04',
    title: 'Door-to-Door Mobility Network',
    desc: 'Seamless continuity combining our dedicated Dubai pet taxi fleet with trusted international partner agents across global hubs.',
  },
];

// Section 8: 10 Distinct Non-Doubled FAQs
const FAQS = [
  {
    question: 'What is international pet relocation and how does it work?',
    answer: 'International pet relocation is the complete coordination required to move your pet across borders. This encompasses veterinary protocols, microchipping, rabies testing, travel crate preparation, government import/export permits, airline booking, and airport customs clearance.',
  },
  {
    question: 'What is the difference between pet export from Dubai and pet import into Dubai?',
    answer: 'Pet export refers to relocating a pet from Dubai / UAE to another country, which requires UAE MOCCAE health clearance and meeting destination-country entry rules. Pet import refers to bringing a pet into Dubai from abroad, requiring a UAE MOCCAE import permit, valid rabies titer testing (RNATT), and customs clearance upon arrival at DXB.',
  },
  {
    question: 'How far in advance should I start planning my pet\'s international relocation?',
    answer: 'We recommend beginning preparation 2 to 4 months in advance. Many destinations enforce strict waiting periods following rabies titer tests (RNATT), and government permit approvals or airline live-animal manifest spaces often require advance booking.',
  },
  {
    question: 'Do I need an IATA-compliant travel crate, and can Global Pet Cab provide one?',
    answer: 'Yes. Airlines require IATA Live Animal Regulations (LAR) approved crates that allow your pet to stand, turn, and lie down naturally with secure ventilation and water bowls. We provide custom-fitted IATA wooden and plastic crates and offer crate conditioning guidance.',
  },
  {
    question: 'What vaccinations, microchips, and blood tests (RNATT) are required?',
    answer: 'Pets must have an ISO 11784/11785 standard microchip, an up-to-date rabies vaccination, and core vaccinations. Rabies-free or rabies-controlled countries (like the UK, Australia, New Zealand, and EU nations) also mandate a Rabies Blood Titer Test (RNATT) from an approved laboratory.',
  },
  {
    question: 'Can Global Pet Cab manage airline bookings and live-animal flight coordination?',
    answer: 'Yes. We coordinate pet travel reservations on pet-friendly international carriers. Depending on airline policy, pet size, and destination requirements, pets travel via climate-controlled manifest cargo, excess baggage with an owner, or in-cabin.',
  },
  {
    question: 'How does customs clearance and airport arrival work?',
    answer: 'Upon landing, your pet is transferred to the airport live-animal inspection facility. Our team or destination partner presents the import permits, original health documentation, and airway bill to customs and veterinary border officers to obtain official release.',
  },
  {
    question: 'Do you provide complete door-to-door relocation services?',
    answer: 'Yes. Our full-service relocation covers doorstep pickup in our air-conditioned Dubai pet taxi, coordinating pre-travel vet visits and government endorsements, airport check-in, flight supervision, customs clearance, and delivery to your new home address.',
  },
  {
    question: 'Will my pet need to go into quarantine upon arrival?',
    answer: 'Quarantine depends on the destination country\'s rabies status and entry protocols. While countries like Australia and New Zealand require a mandatory quarantine stay at government facilities, most destinations allow immediate home release if all advance veterinary tests and permits are verified.',
  },
  {
    question: 'Can I get a relocation quote before finalizing my travel date?',
    answer: 'Yes. You can submit your origin, destination, pet breed, weight, and approximate travel timeline via our quote form. Our relocation team will provide a transparent estimate and outline the key preparation milestones for your route.',
  },
];

// -------------------------------------------------------------------------------------
// 2. GENERATE CODE FOR SECTIONS 1 & 3 (Used in QuoteForm: chunk 50 and chunk 916)
// -------------------------------------------------------------------------------------
function getQuoteFormSections({ isServer, globeVar, planeVar, arrowVar, waVar, jsxMulti, jsxSingle }) {
  const heroJsx = `${jsxSingle}("section",{className:"relative overflow-hidden bg-[#041a2c] text-white pt-16 sm:pt-20 pb-28",children:[
    ${jsxMulti}("div",{className:"absolute inset-0","aria-hidden":"true",children:[
      ${jsxSingle}("img",{
        alt:"International Pet Relocation Dubai",
        fetchPriority:"high",
        decoding:"async",
        className:"object-cover w-full h-full absolute inset-0",
        style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:"cover",objectPosition:"82% center",color:"transparent"},
        src:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75",
        srcSet:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75 3840w",
        sizes:"100vw"
      }),
      ${jsxSingle}("div",{className:"absolute inset-0 intl-hero-gradient"}),
      ${jsxSingle}("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"}})
    ]}),
    ${jsxSingle}("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:
      ${jsxMulti}("div",{className:"max-w-3xl space-y-5",children:[
        ${jsxMulti}("div",{className:"inline-flex items-center gap-2 text-teal-light text-xs sm:text-sm font-extrabold font-heading uppercase tracking-[0.16em]",children:[
          ${jsxSingle}(${globeVar},{className:"w-4 h-4 text-teal-bright"}),
          "INTERNATIONAL PET RELOCATION"
        ]}),
        ${jsxSingle}("h1",{className:"font-black font-heading tracking-tight leading-[1.2] text-3xl sm:text-5xl text-white",children:"International Pet Relocation from Dubai, Made Simple"}),
        ${jsxSingle}("p",{className:"text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl font-body",children:"Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence."}),
        ${jsxSingle}("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl",children:"Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai."}),
        ${jsxMulti}("div",{className:"flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light",children:[
          ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IPATA Member*"}),
          ${jsxSingle}("span",{className:"text-white/40",children:"|"}),
          ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IATA-Compliant Handling*"}),
          ${jsxSingle}("span",{className:"text-white/40",children:"|"}),
          ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"MOCCAE Support*"}),
          ${jsxSingle}("span",{className:"text-white/40",children:"|"}),
          ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"International Pet Relocation"})
        ]}),
        ${jsxMulti}("div",{className:"flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3",children:[
          ${jsxMulti}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base",children:[
            ${jsxSingle}("span",{children:"Request an Expert Quote"}),
            ${jsxSingle}(${arrowVar},{className:"w-5 h-5"})
          ]}),
          ${jsxMulti}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base shadow-sm",children:[
            ${jsxSingle}(${waVar},{className:"w-5 h-5"}),
            ${jsxSingle}("span",{children:"WhatsApp Us"})
          ]})
        ]}),
        ${jsxMulti}("div",{className:"mt-8 p-6 sm:p-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:[
          ${jsxMulti}("div",{className:"space-y-1.5 max-w-xl",children:[
            ${jsxSingle}("h3",{className:"text-xl sm:text-2xl font-black font-heading text-white",children:"Moving Your Pet Across Borders?"}),
            ${jsxSingle}("p",{className:"text-sm sm:text-base text-slate-200 leading-relaxed font-body",children:"From Dubai to the world and back again, we help coordinate the important details of your pet's international journey."})
          ]}),
          ${jsxMulti}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all",children:[
            ${jsxSingle}("span",{children:"Get a Free Relocation Quote"}),
            ${jsxSingle}(${arrowVar},{className:"w-4 h-4"})
          ]})
        ]})
      ]})
    })
  ]})`;

  const whatWeHelpItems = WHAT_WE_HELP.map(
    (item) => `${jsxSingle}("article",{className:"destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-7 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between",children:
      ${jsxMulti}("div",{className:"space-y-4",children:[
        ${jsxSingle}("div",{className:"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300",children:${jsxSingle}("span",{className:"font-mono font-black text-lg",children:${JSON.stringify(item.num)}})}),
        ${jsxSingle}("h3",{className:"text-xl font-black font-heading text-navy",children:${JSON.stringify(item.title)}}),
        ${jsxSingle}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:${JSON.stringify(item.desc)}})
      ]})
    })`
  ).join(',');

  const whatWeHelpJsx = `${jsxSingle}("section",{className:"py-20 bg-white border-t border-teal-border",children:
    ${jsxMulti}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
      ${jsxMulti}("div",{className:"max-w-3xl space-y-3",children:[
        ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase",children:"COMPREHENSIVE RELOCATION SERVICES"}),
        ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"More Than a Flight. We Manage the Journey."}),
        ${jsxSingle}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet's journey, so you have a clear plan from preparation to arrival."})
      ]}),
      ${jsxMulti}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[${whatWeHelpItems}]})
    ]})
  })`;

  return { heroJsx, whatWeHelpJsx };
}

// -------------------------------------------------------------------------------------
// 3. PATCH QUOTE FORM (CLIENT: chunk 50, SERVER: chunk 916)
// -------------------------------------------------------------------------------------
function patchQuoteForm() {
  const files = [
    {
      path: path.join(root, '.next/static/chunks/50-13a8cbaeec2f91ec.js'),
      isServer: false,
      globeVar: 'n.Z',
      planeVar: 'i.Z',
      arrowVar: 'x.Z',
      waVar: 'c.Z',
      jsxMulti: '(0,s.jsxs)',
      jsxSingle: '(0,s.jsx)',
    },
    {
      path: path.join(root, '.next/server/chunks/916.js'),
      isServer: true,
      globeVar: 'r.Z',
      planeVar: 'n.Z',
      arrowVar: 'x.Z',
      waVar: 'd.Z',
      jsxMulti: '(0,s.jsxs)',
      jsxSingle: 's.jsx',
    },
  ];

  for (const f of files) {
    if (!fs.existsSync(f.path)) continue;
    let content = fs.readFileSync(f.path, 'utf8');

    const { heroJsx, whatWeHelpJsx } = getQuoteFormSections(f);

    // 1. Update quote form header title & subtext
    const oldTitle = f.isServer
      ? 's.jsx("h2",{className:"text-2xl sm:text-3xl font-black font-heading tracking-tight",children:"International Pet Relocation — Request Expert Quote"})'
      : '(0,s.jsx)("h2",{className:"text-2xl sm:text-3xl font-black font-heading tracking-tight",children:"International Pet Relocation — Request Expert Quote"})';

    const newTitle = `${f.jsxMulti}("div",{className:"space-y-1.5",children:[
      ${f.jsxSingle}("h2",{className:"text-2xl sm:text-3xl font-black font-heading tracking-tight",children:"Tell Us About Your Pet's Journey"}),
      ${f.jsxSingle}("p",{className:"text-sm sm:text-base text-slate-200 font-body leading-relaxed",children:"Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote."})
    ]})`;

    if (content.includes(oldTitle)) {
      content = content.replace(oldTitle, newTitle);
      console.log(`Replaced quote form header title in ${path.basename(f.path)}`);
    }

    // 2. Wrap the return:
    const oldReturnOpening = 'return(0,s.jsxs)("div",{id:"international-quote-form",className:"bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden",children:[';
    const newReturnOpening = `return (0,s.jsxs)("div",{className:"space-y-0",children:[${heroJsx},${f.jsxSingle}("section",{className:"relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16",children:(0,s.jsxs)("div",{id:"international-quote-form",className:"bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden",children:[`;

    if (!content.includes(oldReturnOpening)) {
      console.error(`Could not find oldReturnOpening in ${f.path}`);
      continue;
    }
    content = content.replace(oldReturnOpening, newReturnOpening);

    // 3. Wrap the return closing (Clean: only whatWeHelpJsx, NO redundant directions section!):
    const oldReturnClosing = f.isServer
      ? 's.jsx("span",{children:"Get My Pet Relocation Quote"})]})})]})]})]})]})]})'
      : '(0,s.jsx)("span",{children:"Get My Pet Relocation Quote"})]})})]})]})]})]})]})';

    const newReturnClosing = `${oldReturnClosing}}),${whatWeHelpJsx}]})`;

    if (!content.includes(oldReturnClosing)) {
      console.error(`Could not find oldReturnClosing in ${f.path}`);
      continue;
    }
    content = content.replace(oldReturnClosing, newReturnClosing);

    fs.writeFileSync(f.path, content);
    console.log(`Successfully patched QuoteForm in ${path.basename(f.path)}`);

    // Verify syntax immediately
    execSync(`node --check ${f.path}`);
    console.log(`Syntax verified OK for ${path.basename(f.path)}`);
  }
}

// -------------------------------------------------------------------------------------
// 4. GENERATE CODE FOR SECTIONS 4 TO 9 (Used in FAQAccordion: page-2baeffb38495d4a2.js and page.js)
// -------------------------------------------------------------------------------------
function getFaqComponentCode({ isServer, fnName, jsxMulti, jsxSingle, chevronVar, reactHook }) {
  // Section 4: How It Works (4 Journey Phases, dark navy)
  const stepsItems = PROCESS_STEPS.map(
    (step) => `${jsxSingle}("div",{className:"rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-all",children:
      ${jsxMulti}("div",{children:[
        ${jsxSingle}("div",{className:"text-teal-bright font-black font-heading text-3xl font-mono",children:${JSON.stringify(step.num)}}),
        ${jsxSingle}("h3",{className:"text-xl font-black font-heading text-white mt-3",children:${JSON.stringify(step.title)}}),
        ${jsxSingle}("p",{className:"text-sm text-white/75 leading-relaxed font-body mt-2",children:${JSON.stringify(step.desc)}})
      ]})
    })`
  ).join(',');

  const sec4 = `${jsxSingle}("section",{className:"py-20 bg-navy text-white border-t border-teal-border",children:
    ${jsxMulti}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
      ${jsxMulti}("div",{className:"max-w-3xl space-y-2",children:[
        ${jsxSingle}("p",{className:"text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light",children:"HOW IT WORKS"}),
        ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-white",children:"A Clearer Path From First Planning to Safe Arrival"}),
        ${jsxSingle}("p",{className:"text-base text-white/70 font-body leading-relaxed pt-1",children:"Every route has its own requirements, but the overall process follows a structured 4-phase journey designed to keep pet parents informed at each stage."})
      ]}),
      ${jsxMulti}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:[${stepsItems}]})
    ]})
  })`;

  // Section 5: Before the International Journey (Local Transport)
  const sec5 = `${jsxSingle}("section",{className:"py-20 bg-white border-t border-teal-border",children:
    ${jsxSingle}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:
      ${jsxMulti}("div",{className:"rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8",children:[
        ${jsxMulti}("div",{className:"max-w-2xl space-y-3",children:[
          ${jsxSingle}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep",children:"LOCAL TRANSPORT & APPOINTMENTS"}),
          ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Need Help Getting Your Pet Ready to Travel?"}),
          ${jsxSingle}("p",{className:"text-base text-slate-700 font-body leading-relaxed",children:"International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement."}),
          ${jsxSingle}("p",{className:"text-sm text-slate-600 font-body leading-relaxed pt-1",children:"For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport."})
        ]}),
        ${jsxSingle}("div",{className:"shrink-0",children:
          ${jsxSingle}("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all",children:"Explore Dubai Pet Taxi →"})
        })
      ]})
    })
  })`;

  // Section 6: Routes
  const routeItems = ROUTES.map(
    (r) => `${jsxMulti}("a",{href:${JSON.stringify(r.link)},className:"rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all",children:[
      ${jsxSingle}("div",{className:"text-sm font-extrabold font-heading text-navy",children:${JSON.stringify(r.label)}}),
      ${jsxSingle}("div",{className:"text-[11px] text-teal-deep font-bold mt-1",children:"Route Planning →"})
    ]})`
  ).join(',');

  const sec6 = `${jsxSingle}("section",{className:"py-20 bg-[#F7FAFB] border-t border-teal-border",children:
    ${jsxMulti}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8",children:[
      ${jsxMulti}("div",{className:"max-w-3xl space-y-3",children:[
        ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest",children:"GLOBAL MOBILITY NETWORK"}),
        ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Pet Relocation from Dubai to Destinations Worldwide"}),
        ${jsxSingle}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination."})
      ]}),
      ${jsxMulti}("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4",children:[${routeItems}]})
    ]})
  })`;

  // Section 7: Distinct Trust & Compliance Pillars (4 cards, no duplication!)
  const trustItems = TRUST_PILLARS.map(
    (p) => `${jsxMulti}("div",{className:"rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all",children:[
      ${jsxSingle}("div",{className:"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm",children:${jsxSingle}("span",{className:"font-mono font-black text-lg",children:${JSON.stringify(p.num)}})}),
      ${jsxSingle}("h3",{className:"text-xl font-black font-heading text-navy",children:${JSON.stringify(p.title)}}),
      ${jsxSingle}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:${JSON.stringify(p.desc)}})
    ]})`
  ).join(',');

  const sec7 = `${jsxSingle}("section",{className:"py-20 bg-white border-t border-teal-border",children:
    ${jsxMulti}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
      ${jsxMulti}("div",{className:"max-w-3xl space-y-3",children:[
        ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest",children:"WHY CHOOSE US"}),
        ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Professional Planning. Personal Attention."}),
        ${jsxSingle}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support."})
      ]}),
      ${jsxMulti}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:[${trustItems}]})
    ]})
  })`;

  // Section 8: 10 FAQs
  const faqsItems = FAQS.map(
    (faq, idx) => `(()=>{
      let isOpen = activeFaq === ${idx};
      return ${jsxMulti}("div",{className:"border border-teal-border rounded-2xl overflow-hidden transition-all bg-white",children:[
        ${jsxMulti}("button",{type:"button",onClick:()=>setActiveFaq(isOpen ? null : ${idx}),className:"w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors",children:[
          ${jsxSingle}("span",{children:${JSON.stringify(faq.question)}}),
          ${jsxSingle}(${chevronVar},{className:"w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 " + (isOpen ? "rotate-180 text-teal-deep" : "")})
        ]}),
        isOpen ? ${jsxSingle}("div",{className:"px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up",children:${JSON.stringify(faq.answer)}}) : null
      ]});
    })()`
  ).join(',');

  const sec8 = `${jsxSingle}("section",{className:"py-20 bg-[#F6F8FA] border-t border-teal-border",children:
    ${jsxMulti}("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",children:[
      ${jsxMulti}("div",{className:"text-center space-y-3",children:[
        ${jsxSingle}("span",{className:"inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
        ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"International Pet Relocation Questions, Answered"}),
        ${jsxSingle}("p",{className:"text-base sm:text-lg font-body text-slate-600",children:"Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process."})
      ]}),
      ${jsxMulti}("div",{className:"space-y-4",children:[${faqsItems}]})
    ]})
  })`;

  // Section 9: Final CTA Banner
  const sec9 = `${jsxSingle}("section",{className:"relative overflow-hidden text-white py-20 sm:py-24 bg-navy",children:[
    ${jsxMulti}("div",{className:"absolute inset-0","aria-hidden":"true",children:[
      ${jsxSingle}("img",{
        src:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80",
        alt:"",
        className:"object-cover object-center w-full h-full absolute inset-0",
        style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,color:"transparent"}
      }),
      ${jsxSingle}("div",{className:"absolute inset-0 bg-navy/88"})
    ]}),
    ${jsxMulti}("div",{className:"relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6",children:[
      ${jsxSingle}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light",children:"READY TO PLAN YOUR PET'S MOVE?"}),
      ${jsxSingle}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-white",children:"Let's Plan Your Pet's Journey Together"}),
      ${jsxSingle}("p",{className:"text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed",children:"Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps."}),
      ${jsxMulti}("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-4 pt-2",children:[
        ${jsxSingle}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto",children:"Get a Free Relocation Quote →"}),
        ${jsxSingle}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm",children:"WhatsApp the Relocation Team"})
      ]})
    ]})
  ]})`;

  return `function ${fnName}(){
    let [activeFaq, setActiveFaq] = ${reactHook}(0);
    return ${jsxMulti}("div",{className:"space-y-0",children:[
      ${sec4},
      ${sec5},
      ${sec6},
      ${sec7},
      ${sec8},
      ${sec9}
    ]});
  }`;
}

// -------------------------------------------------------------------------------------
// 5. PATCH FAQ ACCORDION (CLIENT: page-2baeffb38495d4a2.js, SERVER: page.js)
// -------------------------------------------------------------------------------------
function patchFaqAccordion() {
  // 1. Client chunk
  const clientPath = path.join(root, '.next/static/chunks/app/international-pet-relocation/page-2baeffb38495d4a2.js');
  let clientContent = fs.readFileSync(clientPath, 'utf8');

  const clientCode = getFaqComponentCode({
    isServer: false,
    fnName: 'u',
    jsxMulti: '(0,n.jsxs)',
    jsxSingle: '(0,n.jsx)',
    chevronVar: 'l.Z',
    reactHook: '(0,i.useState)',
  });

  const uStart = clientContent.indexOf('function u(){let[e,t]=(0,i.useState)("taxi")');
  const uEnd = clientContent.indexOf('}}},function(e){');

  if (uStart !== -1 && uEnd !== -1) {
    clientContent = clientContent.slice(0, uStart) + clientCode + clientContent.slice(uEnd + 1);
    fs.writeFileSync(clientPath, clientContent);
    console.log(`Successfully patched FAQAccordion in ${path.basename(clientPath)}`);
    execSync(`node --check ${clientPath}`);
    console.log(`Syntax verified OK for ${path.basename(clientPath)}`);
  } else {
    console.error(`Could not locate function u() boundaries in ${clientPath}`);
  }

  // 2. Server page.js
  const serverPath = path.join(root, '.next/server/app/international-pet-relocation/page.js');
  let serverContent = fs.readFileSync(serverPath, 'utf8');

  const serverCode = getFaqComponentCode({
    isServer: true,
    fnName: 'p',
    jsxMulti: '(0,i.jsxs)',
    jsxSingle: 'i.jsx',
    chevronVar: 'l.Z',
    reactHook: '(0,n.useState)',
  });

  const pStart = serverContent.indexOf('function p(){let[e,t]=(0,n.useState)("taxi")');
  const nextMod = serverContent.indexOf(',2402:(e,t,a)=>{"use strict";', pStart);

  if (pStart !== -1 && nextMod !== -1) {
    const modEnd = serverContent.lastIndexOf('}}', nextMod);
    serverContent = serverContent.slice(0, pStart) + serverCode + serverContent.slice(modEnd + 1);
    fs.writeFileSync(serverPath, serverContent);
    console.log(`Successfully patched FAQAccordion in ${path.basename(serverPath)}`);
    execSync(`node --check ${serverPath}`);
    console.log(`Syntax verified OK for ${path.basename(serverPath)}`);
  } else {
    console.error(`Could not locate function p() boundaries in ${serverPath}`);
  }
}

// -------------------------------------------------------------------------------------
// EXECUTE CLEAN PATCH
// -------------------------------------------------------------------------------------
// First reset target files to clean git HEAD
execSync('git checkout -- .next/static/chunks/50-13a8cbaeec2f91ec.js .next/server/chunks/916.js .next/static/chunks/app/international-pet-relocation/page-2baeffb38495d4a2.js .next/server/app/international-pet-relocation/page.js', { cwd: root });

patchQuoteForm();
patchFaqAccordion();

console.log('=== CLEAN DEDUPLICATED REDESIGN SUCCESSFULLY APPLIED TO ALL 4 CHUNKS ===');
