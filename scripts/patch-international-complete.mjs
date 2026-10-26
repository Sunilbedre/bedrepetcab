import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

// 10 Relocation FAQs
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

console.log('Patching International Pet Relocation complete sections...');

// -------------------------------------------------------------
// A. ENHANCE HERO SECTION IN .html, .rsc, and server/app/international-pet-relocation/page.js
// -------------------------------------------------------------
const heroTargetBody = 'Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.';

const heroHtmlAdditions = `Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.</p><p class="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto pt-1">Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.</p><div class="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-bold text-teal-light"><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">IPATA Member*</span><span class="text-white/40">|</span><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">IATA-Compliant Handling*</span><span class="text-white/40">|</span><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">MOCCAE Support*</span><span class="text-white/40">|</span><span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">International Pet Relocation</span></div><div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3"><a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-3.5 rounded-full shadow-fj-coral transition-all text-sm sm:text-base"><span>Request an Expert Quote</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-3.5 rounded-full transition-all text-sm sm:text-base shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-4 h-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg><span>WhatsApp Us</span></a></div><p style="display:none"`;

const htmlFile = path.join(root, 'server/app/international-pet-relocation.html');
if (fs.existsSync(htmlFile)) {
  let c = fs.readFileSync(htmlFile, 'utf8');
  if (c.includes(heroTargetBody) && !c.includes('IPATA Member*')) {
    c = c.replace(heroTargetBody + '</p>', heroHtmlAdditions + '>');
    fs.writeFileSync(htmlFile, c);
    console.log('Enhanced Hero section in international-pet-relocation.html');
  }
}

// -------------------------------------------------------------
// B. ENHANCE QUOTE FORM COMPONENT (Banner Copy 2, Section 3, Section 4)
// -------------------------------------------------------------
// We wrap the quote form in chunk 50 and chunk 916
function patchQuoteFormChunk(filePath) {
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');

  // Check if already patched with Banner Copy 2
  if (c.includes('Moving Your Pet Across Borders?')) {
    console.log(`${filePath} already has Banner Copy 2.`);
    return;
  }

  // Find return statement of InternationalQuoteForm
  // Original start: return(0,s.jsxs)("div",{id:"international-quote-form",
  // Or in server chunk: return s.jsxs("div",{id:"international-quote-form",
  const isServer = filePath.includes('916.js');
  const jsxNs = isServer ? 's' : 's';
  const jsxCall = isServer ? '(0,s.jsxs)' : '(0,s.jsxs)';
  const singleJsx = isServer ? '(0,s.jsx)' : '(0,s.jsx)';

  const targetPrefix = 'return(0,s.jsxs)("div",{id:"international-quote-form"';
  const targetPrefixAlt = 'return s.jsxs("div",{id:"international-quote-form"';

  let chosenPrefix = null;
  if (c.includes(targetPrefix)) chosenPrefix = targetPrefix;
  else if (c.includes(targetPrefixAlt)) chosenPrefix = targetPrefixAlt;

  if (!chosenPrefix) {
    console.error(`Could not find quote form return statement in ${filePath}`);
    return;
  }

  // What We Help With cards code
  const whatWeHelpWithJsx = `${singleJsx}("section",{className:"py-16 sm:py-20 bg-white border-t border-teal-border",children:${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[${jsxCall}("div",{className:"max-w-3xl space-y-3",children:[${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"More Than a Flight. We Manage the Journey."}),${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet's journey, so you have a clear plan from preparation to arrival."})]}),${singleJsx}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[
    {title:"Route & Regulatory Planning",desc:"Review the relocation route, destination requirements and travel considerations before the journey begins."},
    {title:"Veterinary Preparation",desc:"Coordinate the required veterinary steps, including microchip, vaccinations, blood tests and health documentation where applicable."},
    {title:"IATA Travel Crate",desc:"Help with appropriate IATA-compliant crate sizing, preparation and travel arrangements based on your pet's needs."},
    {title:"Export & Import Permits",desc:"Support the required UAE export or Dubai import documentation and destination-country requirements, where applicable."},
    {title:"Airline Coordination",desc:"Coordinate airline travel arrangements and the appropriate live-animal transport option for the journey."},
    {title:"Customs & Arrival Support",desc:"Support the arrival process, including customs-related coordination and handover arrangements, based on the destination and service selected."}
  ].map((item,idx)=>${singleJsx}("div",{key:idx,className:"rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300",children:${jsxCall}("div",{className:"space-y-4",children:[${singleJsx}("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep font-mono font-black border border-teal-border text-base",children:"0" + (idx+1)}),${singleJsx}("h3",{className:"text-xl font-black font-heading text-navy",children:item.title}),${singleJsx}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:item.desc})]})}))})]})})`;

  // Direction cards code
  const directionsJsx = `${singleJsx}("section",{className:"py-16 sm:py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] border-t border-teal-border rounded-3xl",children:${jsxCall}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",children:[${jsxCall}("div",{className:"max-w-3xl space-y-2",children:[${singleJsx}("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase",children:"KNOW YOUR RELOCATION DIRECTION"}),${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Exporting or Importing Your Pet? We Can Help You Plan the Right Journey."}),${singleJsx}("p",{className:"text-base text-slate-600 font-body leading-relaxed pt-1",children:"The direction of your pet's journey determines the documentation, veterinary requirements and arrival process involved."})]}),${jsxCall}("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[
    ${jsxCall}("div",{className:"rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all",children:[${jsxCall}("div",{className:"flex items-center justify-between",children:[${singleJsx}("span",{className:"text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"EXPORT ROUTE"}),${singleJsx}("div",{className:"w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border",children:${singleJsx}(i.Z,{className:"w-5 h-5"})})]}),${singleJsx}("h3",{className:"text-2xl font-black font-heading text-navy",children:"Pet Export from Dubai / UAE"}),${singleJsx}("p",{className:"text-slate-600 text-sm sm:text-base leading-relaxed font-body",children:"If your pet is travelling from Dubai or the UAE to another country, the journey is an export from the UAE. The relocation plan can include preparation for destination-country requirements, veterinary documentation, airline arrangements and departure formalities."}),${singleJsx}("div",{className:"pt-2",children:${jsxCall}("a",{href:"#international-quote-form",onClick:()=>{p("from_dubai");t(1);},className:"inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm",children:[${singleJsx}("span",{children:"Plan Pet Export →"}),${singleJsx}(x.Z,{className:"w-4 h-4"})]})})]}),
    ${jsxCall}("div",{className:"rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all",children:[${jsxCall}("div",{className:"flex items-center justify-between",children:[${singleJsx}("span",{className:"text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"IMPORT ROUTE"}),${singleJsx}("div",{className:"w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border",children:${singleJsx}(i.Z,{className:"w-5 h-5 rotate-90"})})]}),${singleJsx}("h3",{className:"text-2xl font-black font-heading text-navy",children:"Pet Import into Dubai / UAE"}),${singleJsx}("p",{className:"text-slate-600 text-sm sm:text-base leading-relaxed font-body",children:"If your pet is arriving in Dubai or the UAE from another country, the journey is an import into Dubai. Relocation coordination can cover entry permit guidance, destination veterinary compliance, transit handling and arrival clearance."}),${singleJsx}("div",{className:"pt-2",children:${jsxCall}("a",{href:"#international-quote-form",onClick:()=>{p("to_dubai");t(1);},className:"inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm",children:[${singleJsx}("span",{children:"Plan Pet Import →"}),${singleJsx}(x.Z,{className:"w-4 h-4"})]})})]}),
  ]})]})})`;

  // Banner Copy 2 code
  const bannerCopy2Jsx = `${jsxCall}("div",{className:"mb-8 p-6 sm:p-8 rounded-3xl bg-navy text-white border border-teal-border/40 shadow-fj-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6",children:[${jsxCall}("div",{className:"space-y-1.5 max-w-2xl",children:[${singleJsx}("h3",{className:"text-xl sm:text-2xl font-black font-heading text-white",children:"Moving Your Pet Across Borders?"}),${singleJsx}("p",{className:"text-sm sm:text-base text-slate-200 leading-relaxed font-body",children:"From veterinary preparation and IATA travel crates to export/import permits, airline booking and arrival support, we help make international relocation clear and manageable."})]}),${jsxCall}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all",children:[${singleJsx}("span",{children:"Get a Free Relocation Quote"}),${singleJsx}(x.Z,{className:"w-4 h-4"})]})]})`;

  // Replacement prefix: wrap in container div with Banner Copy 2 at top, quote form in middle, and sections 3 & 4 at bottom
  const newReturn = `return ${jsxCall}("div",{className:"space-y-12",children:[${bannerCopy2Jsx},${chosenPrefix.replace('return', '')}`;

  // And at the end of the form div: append whatWeHelpWithJsx and directionsJsx
  // Find where the form div closes: `]})]})}}`
  // We can insert after the outer quote-form div closes:
  c = c.replace(chosenPrefix, newReturn);
  
  // Find the closing of the form div: `]})]})}}` in client chunk or `]})]})}}` in server chunk
  const closingIdx = c.lastIndexOf(']})]})}}');
  if (closingIdx !== -1) {
    c = c.slice(0, closingIdx + 6) + `,${whatWeHelpWithJsx},${directionsJsx}]})}}` + c.slice(closingIdx + 8);
    fs.writeFileSync(filePath, c);
    console.log(`Successfully patched QuoteForm in ${filePath}`);
  } else {
    console.error(`Could not locate closing tag in ${filePath}`);
  }
}

patchQuoteFormChunk(path.join(root, 'static/chunks/50-13a8cbaeec2f91ec.js'));
patchQuoteFormChunk(path.join(root, 'server/chunks/916.js'));

// -------------------------------------------------------------
// C. ENHANCE FAQ ACCORDION (Sections 6, 7, 8, 9, 10)
// -------------------------------------------------------------
function patchFaqChunk(filePath) {
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');

  if (c.includes('Need Help Getting Your Pet Ready to Travel?')) {
    console.log(`${filePath} already has Sections 6-10.`);
    return;
  }

  const isServer = filePath.includes('server');
  const singleJsx = '(0,n.jsx)';
  const multiJsx = '(0,n.jsxs)';

  // 10 Relocation FAQs data
  const faqsDataJs = JSON.stringify(RELOCATION_FAQS.map(f => ({ question: f.question, answer: f.answer })));

  // Section 6: Before Journey
  const sec6 = `${singleJsx}("section",{className:"py-14 sm:py-16 bg-[#F8FAFC] border-y border-teal-border rounded-3xl",children:${multiJsx}("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8",children:[${multiJsx}("div",{className:"space-y-3 max-w-2xl",children:[${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"BEFORE THE INTERNATIONAL JOURNEY"}),${singleJsx}("h2",{className:"text-2xl sm:text-3xl font-black font-heading text-navy",children:"Need Help Getting Your Pet Ready to Travel?"}),${singleJsx}("p",{className:"text-sm sm:text-base text-slate-600 font-body leading-relaxed",children:"Before international departure, pets often need visits to the vet for vaccinations, microchipping, blood tests or health checks. Our Dubai Pet Taxi service provides safe, comfortable transportation across Dubai to help you complete these essential preparations without the stress."})]}),${singleJsx}("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center justify-center gap-2 bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading px-8 py-4 rounded-2xl shadow-md text-sm sm:text-base shrink-0 transition-all",children:"Explore Dubai Pet Taxi →"})]})})`;

  // Section 7: Relocation Routes
  const sec7 = `${singleJsx}("section",{className:"py-14 sm:py-16 bg-white",children:${multiJsx}("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[${singleJsx}("h2",{className:"text-2xl sm:text-3xl font-black font-heading text-navy",children:"Pet Relocation from Dubai to Destinations Worldwide"}),${singleJsx}("p",{className:"text-sm sm:text-base text-slate-600 font-body max-w-2xl mx-auto leading-relaxed",children:"We assist pet parents with relocations across major global routes, including:"}),${singleJsx}("div",{className:"flex flex-wrap items-center justify-center gap-3 pt-2",children:[
    "Dubai ↔ India", "Dubai ↔ UK", "Dubai ↔ USA", "Dubai ↔ Canada", "Dubai ↔ Australia", "Other destinations worldwide"
  ].map((route,idx)=>${singleJsx}("a",{key:idx,href:"#international-quote-form",className:"px-5 py-3 rounded-2xl bg-teal-soft border border-teal-border font-extrabold font-heading text-xs sm:text-sm text-navy hover:border-teal-deep hover:bg-white hover:shadow-sm transition-all",children:route}))})]})})`;

  // Section 8: Why Pet Parents Trust
  const sec8 = `${singleJsx}("section",{className:"py-16 sm:py-20 bg-white border-t border-teal-border",children:${multiJsx}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[${multiJsx}("div",{className:"max-w-3xl space-y-3",children:[${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Professional Planning. Personal Attention."}),${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support."})]}),${singleJsx}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[
    {title:"International Pet Relocation",desc:"Support for cross-border pet journeys from Dubai and into Dubai."},
    {title:"Route-Specific Planning",desc:"Requirements can vary by destination, so each journey is planned around its route."},
    {title:"Veterinary & Travel Coordination",desc:"Support across the preparation and travel stages, based on the services selected."},
    {title:"Local + International Mobility",desc:"A connected service journey from local transportation to international relocation."},
    {title:"IPATA Membership*",desc:"A professional industry association membership that can be highlighted as a trust signal if confirmed."}
  ].map((pillar,idx)=>${multiJsx}("div",{key:idx,className:"rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all",children:[${singleJsx}("div",{className:"w-10 h-10 rounded-xl bg-teal-soft text-teal-deep font-mono font-bold flex items-center justify-center border border-teal-border text-sm",children:"0" + (idx+1)}),${singleJsx}("h3",{className:"text-xl font-black font-heading text-navy",children:pillar.title}),${singleJsx}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:pillar.desc})]}))})]})})`;

  // Section 10: Final CTA
  const sec10 = `${singleJsx}("section",{className:"relative overflow-hidden text-white py-16 sm:py-20 bg-navy rounded-3xl mt-12",children:[${singleJsx}("div",{className:"relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6",children:[${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light",children:"READY TO PLAN YOUR PET'S MOVE?"}),${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-white",children:"Let's Plan Your Pet's Journey Together"}),${singleJsx}("p",{className:"text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed",children:"Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps."}),${multiJsx}("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-4 pt-2",children:[${singleJsx}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto",children:"Get a Free Relocation Quote →"}),${singleJsx}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm",children:"WhatsApp the Relocation Team"})]})]})]})`;

  // Replace FAQs list with the 10 Relocation FAQs
  c = c.replace(/let\s+c\s*=\s*\[\{question:[^\]]+\];/, `let c=${faqsDataJs};`);
  c = c.replace(/let\s+d\s*=\s*\[\{question:[^\]]+\];/, `let d=${faqsDataJs};`);

  // Target return statement of FAQ component:
  // return(0,n.jsx)("section",{className:"py-20 bg-white border-t border-teal-border",children:(0,n.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  const faqTarget = 'return(0,n.jsx)("section",{className:"py-20 bg-white border-t border-teal-border",children:';
  if (c.includes(faqTarget)) {
    // Wrap in container div with sec6, sec7, sec8 before, and sec10 after
    const newFaqReturn = `return (0,n.jsxs)("div",{className:"space-y-12",children:[${sec6},${sec7},${sec8},(0,n.jsx)("section",{className:"py-20 bg-white border-t border-teal-border",children:`;
    c = c.replace(faqTarget, newFaqReturn);
    // Add sec10 before closing of the component
    // Find closing of section: `]})})}}`
    const lastClosing = c.lastIndexOf(']})})}}');
    if (lastClosing !== -1) {
      c = c.slice(0, lastClosing + 4) + `,${sec10}]})}}` + c.slice(lastClosing + 6);
      fs.writeFileSync(filePath, c);
      console.log(`Successfully patched FAQAccordion in ${filePath}`);
    }
  } else {
    console.error(`Could not find FAQ target in ${filePath}`);
  }
}

patchFaqChunk(path.join(root, 'static/chunks/app/international-pet-relocation/page-2baeffb38495d4a2.js'));
patchFaqChunk(path.join(root, 'server/app/international-pet-relocation/page.js'));

console.log('Complete patch finished successfully.');
