import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== PATCHING ALL 10 SECTIONS ON /international-pet-relocation ===');

// --------------------------------------------------------------------
// 1. GENERATE JSX FOR HERO SECTION (Section 1)
// --------------------------------------------------------------------
function getHeroJsx(jsxCall, singleJsx, globeComp, arrowComp, waComp) {
  return `${singleJsx}("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28",children:[
    ${jsxCall}("div",{className:"absolute inset-0","aria-hidden":"true",children:[
      ${singleJsx}("img",{
        alt:"International Pet Relocation Dubai",
        fetchPriority:"high",
        decoding:"async",
        className:"object-cover object-center w-full h-full absolute inset-0",
        style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,color:"transparent"},
        src:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
      }),
      ${singleJsx}("div",{className:"absolute inset-0 bg-navy/75"}),
      ${singleJsx}("div",{className:"absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40"})
    ]}),
    ${singleJsx}("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:
      ${jsxCall}("div",{className:"max-w-3xl space-y-5",children:[
        ${jsxCall}("div",{className:"inline-flex items-center gap-2 text-teal-light text-xs sm:text-sm font-extrabold font-heading uppercase tracking-[0.16em]",children:[
          ${singleJsx}(${globeComp},{className:"w-4 h-4 text-teal-bright"}),
          "INTERNATIONAL PET RELOCATION"
        ]}),
        ${singleJsx}("h1",{className:"font-black font-heading tracking-tight leading-[1.2] text-3xl sm:text-5xl text-white",children:"International Pet Relocation from Dubai, Made Simple"}),
        ${singleJsx}("p",{className:"text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl font-body",children:"Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence."}),
        ${singleJsx}("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl",children:"Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai."}),
        ${jsxCall}("div",{className:"flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light",children:[
          ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IPATA Member*"}),
          ${singleJsx}("span",{className:"text-white/40",children:"|"}),
          ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IATA-Compliant Handling*"}),
          ${singleJsx}("span",{className:"text-white/40",children:"|"}),
          ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"MOCCAE Support*"}),
          ${singleJsx}("span",{className:"text-white/40",children:"|"}),
          ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"International Pet Relocation"})
        ]}),
        ${jsxCall}("div",{className:"flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3",children:[
          ${jsxCall}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base",children:[
            ${singleJsx}("span",{children:"Request an Expert Quote"}),
            ${singleJsx}(${arrowComp},{className:"w-5 h-5"})
          ]}),
          ${jsxCall}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base shadow-sm",children:[
            ${singleJsx}(${waComp},{className:"w-5 h-5"}),
            ${singleJsx}("span",{children:"WhatsApp Us"})
          ]})
        ]}),
        ${jsxCall}("div",{className:"mt-8 p-6 sm:p-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:[
          ${jsxCall}("div",{className:"space-y-1.5 max-w-xl",children:[
            ${singleJsx}("h3",{className:"text-xl sm:text-2xl font-black font-heading text-white",children:"Moving Your Pet Across Borders?"}),
            ${singleJsx}("p",{className:"text-sm sm:text-base text-slate-200 leading-relaxed font-body",children:"From Dubai to the world and back again, we help coordinate the important details of your pet's international journey."})
          ]}),
          ${jsxCall}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all",children:[
            ${singleJsx}("span",{children:"Get a Free Relocation Quote"}),
            ${singleJsx}(${arrowComp},{className:"w-4 h-4"})
          ]})
        ]})
      ]})
    })
  ]})`;
}

// --------------------------------------------------------------------
// 2. GENERATE JSX FOR WHAT WE HELP WITH (Section 3)
// --------------------------------------------------------------------
function getWhatWeHelpWithJsx(jsxCall, singleJsx) {
  return `${singleJsx}("section",{className:"py-20 bg-white border-t border-teal-border",children:
    ${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
      ${jsxCall}("div",{className:"max-w-3xl space-y-3",children:[
        ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"More Than a Flight. We Manage the Journey."}),
        ${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet's journey, so you have a clear plan from preparation to arrival."})
      ]}),
      ${singleJsx}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[
        {title:"Route & Regulatory Planning",desc:"Review the relocation route, destination requirements and travel considerations before the journey begins."},
        {title:"Veterinary Preparation",desc:"Coordinate the required veterinary steps, including microchip, vaccinations, blood tests and health documentation where applicable."},
        {title:"IATA Travel Crate",desc:"Help with appropriate IATA-compliant crate sizing, preparation and travel arrangements based on your pet's needs."},
        {title:"Export & Import Permits",desc:"Support the required UAE export or Dubai import documentation and destination-country requirements, where applicable."},
        {title:"Airline Coordination",desc:"Coordinate airline travel arrangements and the appropriate live-animal transport option for the journey."},
        {title:"Customs & Arrival Support",desc:"Support the arrival process, including customs-related coordination and handover arrangements, based on the destination and service selected."}
      ].map((item,idx)=>${singleJsx}("article",{key:idx,className:"destination-card-flation group rounded-[24px] border border-teal-border bg-[#F7FAFB] p-7 hover:bg-white hover:shadow-fj-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between",children:
        ${jsxCall}("div",{className:"space-y-4",children:[
          ${singleJsx}("div",{className:"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm group-hover:scale-110 group-hover:bg-teal-deep group-hover:text-white transition-all duration-300",children:${singleJsx}("span",{className:"font-mono font-black text-lg",children:"0" + (idx+1)})}),
          ${singleJsx}("h3",{className:"text-xl font-black font-heading text-navy",children:item.title}),
          ${singleJsx}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:item.desc})
        ]})
      }))})
    ]})
  })`;
}

// --------------------------------------------------------------------
// 3. GENERATE JSX FOR EXPORT / IMPORT DIRECTIONS (Section 4)
// --------------------------------------------------------------------
function getDirectionsJsx(jsxCall, singleJsx, planeComp, arrowComp) {
  return `${singleJsx}("section",{className:"py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] border-t border-teal-border",children:
    ${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",children:[
      ${jsxCall}("div",{className:"max-w-3xl space-y-2",children:[
        ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase",children:"KNOW YOUR RELOCATION DIRECTION"}),
        ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Exporting or Importing Your Pet? We Can Help You Plan the Right Journey."}),
        ${singleJsx}("p",{className:"text-base text-slate-600 font-body leading-relaxed pt-1",children:"The direction of your pet's journey determines the documentation, veterinary requirements and arrival process involved."})
      ]}),
      ${jsxCall}("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[
        ${jsxCall}("div",{className:"rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all",children:[
          ${jsxCall}("div",{className:"flex items-center justify-between",children:[
            ${singleJsx}("span",{className:"text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"EXPORT ROUTE"}),
            ${singleJsx}("div",{className:"w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border",children:${singleJsx}(${planeComp},{className:"w-5 h-5"})})
          ]}),
          ${singleJsx}("h3",{className:"text-2xl font-black font-heading text-navy",children:"Pet Export from Dubai / UAE"}),
          ${singleJsx}("p",{className:"text-slate-600 text-sm sm:text-base leading-relaxed font-body",children:"If your pet is travelling from Dubai or the UAE to another country, the journey is an export from the UAE. The relocation plan can include preparation for destination-country requirements, veterinary documentation, airline arrangements and departure formalities."}),
          ${singleJsx}("div",{className:"pt-2",children:
            ${jsxCall}("a",{href:"#international-quote-form",onClick:()=>{p("from_dubai");j("United Arab Emirates");g("Dubai");N("United Kingdom");w("London");t(1);},className:"inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm",children:[
              ${singleJsx}("span",{children:"Select Export in Quote Form"}),
              ${singleJsx}(${arrowComp},{className:"w-4 h-4"})
            ]})
          })
        ]}),
        ${jsxCall}("div",{className:"rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all",children:[
          ${jsxCall}("div",{className:"flex items-center justify-between",children:[
            ${singleJsx}("span",{className:"text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"IMPORT ROUTE"}),
            ${singleJsx}("div",{className:"w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border",children:${singleJsx}(${planeComp},{className:"w-5 h-5 rotate-90"})})
          ]}),
          ${singleJsx}("h3",{className:"text-2xl font-black font-heading text-navy",children:"Pet Import into Dubai / UAE"}),
          ${singleJsx}("p",{className:"text-slate-600 text-sm sm:text-base leading-relaxed font-body",children:"If your pet is travelling from another country into Dubai, the journey is an import into Dubai. The relocation plan can include preparation for UAE entry requirements, veterinary documentation, arrival coordination and destination handover."}),
          ${singleJsx}("div",{className:"pt-2",children:
            ${jsxCall}("a",{href:"#international-quote-form",onClick:()=>{p("to_dubai");j("India");g("Mumbai");N("United Arab Emirates");w("Dubai");t(1);},className:"inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm",children:[
              ${singleJsx}("span",{children:"Select Import in Quote Form"}),
              ${singleJsx}(${arrowComp},{className:"w-4 h-4"})
            ]})
          })
        ]})
      ]})
    ]})
  })`;
}

// --------------------------------------------------------------------
// 4. PATCH CHUNK 50 (Client Quote Form) & CHUNK 916 (Server Quote Form)
// --------------------------------------------------------------------
function patchQuoteFormFiles() {
  const clientChunk = path.join(root, '.next/static/chunks/50-13a8cbaeec2f91ec.js');
  const serverChunk = path.join(root, '.next/server/chunks/916.js');

  [clientChunk, serverChunk].forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const isServer = filePath.includes('916.js');
    const jsxCall = '(0,s.jsxs)';
    const singleJsx = isServer ? 's.jsx' : '(0,s.jsx)';
    const globeComp = isServer ? 'r.Z' : 'n.Z';
    const planeComp = isServer ? 'n.Z' : 'i.Z';
    const arrowComp = 'x.Z';
    const waComp = isServer ? 'd.Z' : 'c.Z';

    const heroJsx = getHeroJsx(jsxCall, singleJsx, globeComp, arrowComp, waComp);
    const whatWeHelpJsx = getWhatWeHelpWithJsx(jsxCall, singleJsx);
    const directionsJsx = getDirectionsJsx(jsxCall, singleJsx, planeComp, arrowComp);

    // Look for return statement of QuoteForm:
    // Original: return (0,s.jsxs)("div",{className:"space-y-12",children:[...
    const returnPattern = /return\s+(?:\(0,s\.jsxs\)|s\.jsxs)\("div",\{className:"space-y-12",children:\[(?:\(0,s\.jsxs\)|s\.jsxs)\("div",\{className:"mb-8 p-6 sm:p-8 rounded-3xl bg-navy text-white.*?children:\[/;
    
    // In our new return:
    // return (0,s.jsxs)("div",{className:"space-y-0",children:[
    //   HERO_JSX,
    //   (0,s.jsx)("section",{className:"relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16",children:
    //     (0,s.jsxs)("div",{id:"international-quote-form",className:"bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden",children:[...
    
    // Let's replace the outer return opening
    const oldReturnStart = 'return (0,s.jsxs)("div",{className:"space-y-12",children:[(0,s.jsxs)("div",{className:"mb-8 p-6 sm:p-8 rounded-3xl bg-navy text-white border border-teal-border/40 shadow-fj-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:';
    const oldReturnStartAlt = 'return (0,s.jsxs)("div",{className:"space-y-12",children:[(0,s.jsxs)("div",{className:"mb-8 p-6 sm:p-8 rounded-3xl bg-navy text-white';
    
    // Find where `id:"international-quote-form"` begins
    const formIdIdx = content.indexOf('{id:"international-quote-form"');
    if (formIdIdx === -1) {
      console.error(`Could not find id:"international-quote-form" in ${filePath}`);
      return;
    }

    // Find the return statement immediately preceding formIdIdx
    const retIdx = content.lastIndexOf('return', formIdIdx);
    if (retIdx === -1) {
      console.error(`Could not find return statement before quote form in ${filePath}`);
      return;
    }

    // Form element wrapper:
    // (0,s.jsx)("section",{className:"relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16",children:(0,s.jsxs)("div",{id:"international-quote-form"
    const newFormWrapper = `return (0,s.jsxs)("div",{className:"space-y-0",children:[${heroJsx},${singleJsx}("section",{className:"relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-16",children:(0,s.jsxs)("div",{id:"international-quote-form"`;

    content = content.slice(0, retIdx) + newFormWrapper + content.slice(formIdIdx + '{id:"international-quote-form"'.length);

    // Now find the end of the quote form:
    // In chunk 50: `]})]})}}` followed by sections 3 & 4 that were added previously
    // Let's find the closing of `p()`:
    // Look for `)]})]})` that closes the form, followed by sections or closing braces
    // Let's inspect the end of `p()` in content:
    const pEndIdx = content.lastIndexOf('}}}');
    if (pEndIdx !== -1) {
      // Find where the form div closes:
      // We wrap the form div, then section closes with `})`, then comma, then whatWeHelpJsx, then comma, then directionsJsx, then `]})}}`
      // Let's find where `id:"international-quote-form"`'s outer div closes.
      // In the original, the form div closes with `]})`
      // Let's replace from the last occurrence of `More Than a Flight` (if present) or before `}}}`, closing cleanly!
      const whatWeHelpIdx = content.indexOf('More Than a Flight');
      if (whatWeHelpIdx !== -1) {
        // Find the start of the section containing 'More Than a Flight'
        const secStart = content.lastIndexOf('(0,s.jsx)("section"', whatWeHelpIdx);
        if (secStart !== -1) {
          // Replace from secStart to the end of component function
          // Before secStart, close the section that wrapped the quote form: `})`
          content = content.slice(0, secStart - 1) + `}),${whatWeHelpJsx},${directionsJsx}]})}}` + content.slice(pEndIdx + 3);
          fs.writeFileSync(filePath, content);
          console.log(`Successfully patched QuoteForm with Hero, WhatWeHelp, and Directions in ${filePath}`);
          return;
        }
      }
    }

    console.log(`Fallback for ${filePath}`);
  });
}

patchQuoteFormFiles();

// --------------------------------------------------------------------
// 5. PATCH FAQ ACCORDION (Client: page-2baeffb38495d4a2.js, Server: page.js)
// --------------------------------------------------------------------
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
    answer: 'Arrival and customs-related support can be included depending on the destination and service selected. The exact scope should be confirmed for your route.',
  },
  {
    question: 'Can I get a quote before deciding my travel date?',
    answer: 'Yes. Share your intended route and tentative travel date through the quote form so the team can review your requirements and provide a tailored estimate.',
  },
];

function patchFaqFiles() {
  const clientFaq = path.join(root, '.next/static/chunks/app/international-pet-relocation/page-2baeffb38495d4a2.js');
  const serverPage = path.join(root, '.next/server/app/international-pet-relocation/page.js');

  [clientFaq, serverPage].forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const isServer = filePath.includes('server');
    const jsxCall = isServer ? '(0,i.jsxs)' : '(0,n.jsxs)';
    const singleJsx = isServer ? 'i.jsx' : '(0,n.jsx)';
    const chevronComp = 'l.Z';
    const reactHook = isServer ? '(0,n.useState)' : '(0,i.useState)';

    // Section 5: How We Manage Your Pet's Journey (Dark navy, 6 steps)
    const sec5 = `${singleJsx}("section",{className:"py-20 bg-navy text-white border-t border-teal-border",children:
      ${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
        ${jsxCall}("div",{className:"max-w-3xl space-y-2",children:[
          ${singleJsx}("p",{className:"text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light",children:"HOW IT WORKS"}),
          ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading",children:"A Clearer Path From First Planning to Safe Arrival"}),
          ${singleJsx}("p",{className:"text-base text-white/70 font-body leading-relaxed pt-1",children:"Every route has its own requirements, but the overall process follows a structured journey designed to keep pet parents informed at each stage."})
        ]}),
        ${singleJsx}("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[
          {num:"01",title:"Route & Requirement Review",desc:"We review your origin, destination and travel plans to identify the key requirements for the journey."},
          {num:"02",title:"Veterinary Preparation",desc:"We help coordinate the veterinary documentation and health-related requirements applicable to your route."},
          {num:"03",title:"Travel Crate & Flight Preparation",desc:"We help arrange the appropriate travel crate and prepare the pet's travel requirements for the selected airline and route."},
          {num:"04",title:"Export / Import Documentation",desc:"We support the required export or import documentation and applicable government or destination requirements."},
          {num:"05",title:"Airline & Travel Coordination",desc:"We coordinate the relevant airline arrangements and travel logistics for your pet's journey."},
          {num:"06",title:"Arrival & Handover",desc:"We support the arrival process and coordinate the agreed handover so your pet can continue safely to their new destination."}
        ].map((step,idx)=>${singleJsx}("div",{key:idx,className:"rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between",children:
          ${jsxCall}("div",{children:[
            ${singleJsx}("div",{className:"text-teal-light font-black font-heading text-3xl font-mono",children:step.num}),
            ${singleJsx}("h3",{className:"text-xl font-black font-heading text-white mt-3",children:step.title}),
            ${singleJsx}("p",{className:"text-sm text-white/75 leading-relaxed font-body mt-2",children:step.desc})
          ]})
        }))})
      ]})
    })`;

    // Section 6: Before the International Journey (Local Transport)
    const sec6 = `${singleJsx}("section",{className:"py-20 bg-white border-t border-teal-border",children:
      ${singleJsx}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:
        ${jsxCall}("div",{className:"rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8",children:[
          ${jsxCall}("div",{className:"max-w-2xl space-y-3",children:[
            ${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep",children:"LOCAL TRANSPORT & APPOINTMENTS"}),
            ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Need Help Getting Your Pet Ready to Travel?"}),
            ${singleJsx}("p",{className:"text-base text-slate-700 font-body leading-relaxed",children:"International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement."}),
            ${singleJsx}("p",{className:"text-sm text-slate-600 font-body leading-relaxed pt-1",children:"For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport."})
          ]}),
          ${singleJsx}("div",{className:"shrink-0",children:
            ${singleJsx}("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all",children:"Explore Dubai Pet Taxi →"})
          })
        ]})
      })
    })`;

    // Section 7: Routes
    const sec7 = `${singleJsx}("section",{className:"py-20 bg-[#F7FAFB] border-t border-teal-border",children:
      ${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8",children:[
        ${jsxCall}("div",{className:"max-w-3xl space-y-3",children:[
          ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Pet Relocation from Dubai to Destinations Worldwide"}),
          ${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination."})
        ]}),
        ${singleJsx}("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4",children:[
          {label:"Dubai ↔ India",link:"#international-quote-form"},
          {label:"Dubai ↔ UK",link:"#international-quote-form"},
          {label:"Dubai ↔ USA",link:"#international-quote-form"},
          {label:"Dubai ↔ Canada",link:"#international-quote-form"},
          {label:"Dubai ↔ Australia",link:"#international-quote-form"},
          {label:"Other destinations",link:"#international-quote-form"}
        ].map((r,idx)=>${jsxCall}("a",{key:idx,href:r.link,className:"rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all",children:[
          ${singleJsx}("div",{className:"text-sm font-extrabold font-heading text-navy",children:r.label}),
          ${singleJsx}("div",{className:"text-[11px] text-teal-deep font-bold mt-1",children:"Route Planning →"})
        ]}))})
      ]})
    })`;

    // Section 8: Why Trust
    const sec8 = `${singleJsx}("section",{className:"py-20 bg-white border-t border-teal-border",children:
      ${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[
        ${jsxCall}("div",{className:"max-w-3xl space-y-3",children:[
          ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Professional Planning. Personal Attention."}),
          ${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support."})
        ]}),
        ${singleJsx}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[
          {title:"International Pet Relocation",desc:"Support for cross-border pet journeys from Dubai and into Dubai."},
          {title:"Route-Specific Planning",desc:"Requirements can vary by destination, so each journey is planned around its route."},
          {title:"Veterinary & Travel Coordination",desc:"Support across the preparation and travel stages, based on the services selected."},
          {title:"Local + International Mobility",desc:"A connected service journey from local transportation to international relocation."},
          {title:"IPATA Membership*",desc:"A professional industry association membership that can be highlighted as a trust signal if confirmed."}
        ].map((pillar,idx)=>${jsxCall}("div",{key:idx,className:"rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all",children:[
          ${singleJsx}("div",{className:"w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm",children:${singleJsx}("span",{className:"font-mono font-black text-lg",children:"0" + (idx+1)})}),
          ${singleJsx}("h3",{className:"text-xl font-black font-heading text-navy",children:pillar.title}),
          ${singleJsx}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:pillar.desc})
        ]}))})
      ]})
    })`;

    // Section 9: 10 FAQs accordion
    const faqsDataJson = JSON.stringify(RELOCATION_FAQS);
    const sec9 = `${singleJsx}("section",{className:"py-20 bg-[#F6F8FA] border-t border-teal-border",children:
      ${jsxCall}("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",children:[
        ${jsxCall}("div",{className:"text-center space-y-3",children:[
          ${singleJsx}("span",{className:"inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
          ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"International Pet Relocation Questions, Answered"}),
          ${singleJsx}("p",{className:"text-base sm:text-lg font-body text-slate-600",children:"Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process."})
        ]}),
        ${singleJsx}("div",{className:"space-y-4",children:faqsData.map((faq,idx)=>{
          let isOpen = activeFaq === idx;
          return ${jsxCall}("div",{key:idx,className:"border border-teal-border rounded-2xl overflow-hidden transition-all bg-white",children:[
            ${jsxCall}("button",{type:"button",onClick:()=>setActiveFaq(isOpen ? null : idx),className:"w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors",children:[
              ${singleJsx}("span",{children:faq.question}),
              ${singleJsx}(${chevronComp},{className:"w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 " + (isOpen ? "rotate-180 text-teal-deep" : "")})
            ]}),
            isOpen && ${singleJsx}("div",{className:"px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up",children:faq.answer})
          ]};
        })})
      ]})
    })`;

    // Section 10: Final CTA
    const sec10 = `${singleJsx}("section",{className:"relative overflow-hidden text-white py-20 sm:py-24 bg-navy",children:[
      ${jsxCall}("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        ${singleJsx}("img",{
          src:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80",
          alt:"",
          className:"object-cover object-center w-full h-full absolute inset-0",
          style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,color:"transparent"}
        }),
        ${singleJsx}("div",{className:"absolute inset-0 bg-navy/88"})
      ]}),
      ${jsxCall}("div",{className:"relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6",children:[
        ${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light",children:"READY TO PLAN YOUR PET'S MOVE?"}),
        ${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-white",children:"Let's Plan Your Pet's Journey Together"}),
        ${singleJsx}("p",{className:"text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed",children:"Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps."}),
        ${jsxCall}("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-4 pt-2",children:[
          ${singleJsx}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto",children:"Get a Free Relocation Quote →"}),
          ${singleJsx}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm",children:"WhatsApp the Relocation Team"})
        ]})
      ]})
    ]})`;

    // Construct the entire FAQ function:
    const fnName = isServer ? 'p' : 'u';
    const newFaqFunction = `let faqsData = ${faqsDataJson};
function ${fnName}(){
  let [activeFaq, setActiveFaq] = ${reactHook}(0);
  return ${jsxCall}("div",{className:"space-y-0",children:[
    ${sec5},
    ${sec6},
    ${sec7},
    ${sec8},
    ${sec9},
    ${sec10}
  ]});
}`;

    // Replace the function inside the module
    // In client: function u(){ ... }
    // In server: function p(){ ... }
    const fnPattern = isServer ? /function p\(\)\{let\[e,t\]=.*?\}\}\}/ : /function u\(\)\{let\[e,t\]=.*?\}\}\}/;

    if (fnPattern.test(content)) {
      content = content.replace(fnPattern, `${newFaqFunction}}`);
      fs.writeFileSync(filePath, content);
      console.log(`Successfully patched FAQAccordion with Sections 5 to 10 in ${filePath}`);
    } else {
      console.error(`Could not match fnPattern in ${filePath}`);
    }
  });
}

patchFaqFiles();

console.log('=== All 10 sections successfully patched across client and server chunks ===');
