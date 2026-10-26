import fs from 'fs';

const p = '.next/server/app/international-pet-relocation/page.js';
let c = fs.readFileSync(p, 'utf8');

const RELOCATION_FAQS = [
  { question: 'What is international pet relocation?', answer: 'International pet relocation is the process of moving a pet from one country to another while coordinating the travel, veterinary, documentation and other requirements applicable to the route.' },
  { question: 'What is pet export from Dubai?', answer: 'When a pet travels from Dubai or the UAE to another country, it is considered an export from the UAE. The requirements depend on the destination country and travel route.' },
  { question: 'What is pet import into Dubai?', answer: 'When a pet travels from another country into Dubai, it is considered an import into Dubai. The applicable UAE entry requirements depend on the origin country and the pet’s travel circumstances.' },
  { question: 'Can Global Pet Cab help with pet import to Dubai?', answer: 'Global Pet Cab can support international pet relocation journeys into Dubai, including coordination around applicable veterinary, documentation, travel and arrival requirements.' },
  { question: 'Can Global Pet Cab help with pet export from Dubai?', answer: 'Yes. Global Pet Cab supports pet relocation journeys from Dubai/UAE to international destinations, with route-specific planning and travel coordination.' },
  { question: 'Do I need an IATA-compliant travel crate?', answer: 'International pet travel may require an airline-approved or IATA-compliant travel crate depending on the airline and route. Our team can help determine the appropriate travel arrangement for your journey.' },
  { question: 'Do pets need blood tests or vaccinations before international travel?', answer: 'Some destinations require specific vaccinations, tests or veterinary certificates. Requirements vary by country, so the exact steps should be confirmed for your route.' },
  { question: 'Can you help with airline bookings?', answer: 'Airline coordination can form part of the relocation service, subject to the route, airline and selected service.' },
  { question: 'Can you help with customs clearance and arrival?', answer: 'Arrival and customs-related support can be included depending on the destination and service arrangement. The exact scope should be confirmed for your route.' },
  { question: 'Can I get a quote before deciding my travel date?', answer: 'Yes. Share your intended route and tentative travel date through the quote form so the team can review your requirements and provide a tailored estimate.' }
];

const faqsDataJs = JSON.stringify(RELOCATION_FAQS);
c = c.replace(/let\s+d\s*=\s*\[\{question:[^\]]+\];/, `let d=${faqsDataJs};`);
c = c.replace(/let\s+c\s*=\s*\[\{question:[^\]]+\];/, `let c=${faqsDataJs};`);

const singleJsx = 'i.jsx';
const multiJsx = '(0,i.jsxs)';

// Section 6: Before Journey
const sec6 = `${singleJsx}("section",{className:"py-14 sm:py-16 bg-[#F8FAFC] border-y border-teal-border rounded-3xl",children:${multiJsx}("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8",children:[${multiJsx}("div",{className:"space-y-3 max-w-2xl",children:[${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border",children:"BEFORE THE INTERNATIONAL JOURNEY"}),${singleJsx}("h2",{className:"text-2xl sm:text-3xl font-black font-heading text-navy",children:"Need Help Getting Your Pet Ready to Travel?"}),${singleJsx}("p",{className:"text-sm sm:text-base text-slate-600 font-body leading-relaxed",children:"Before international departure, pets often need visits to the vet for vaccinations, microchipping, blood tests or health checks. Our Dubai Pet Taxi service provides safe, comfortable transportation across Dubai to help you complete these essential preparations without the stress."})]}),${singleJsx}("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center justify-center gap-2 bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading px-8 py-4 rounded-2xl shadow-md text-sm sm:text-base shrink-0 transition-all",children:"Explore Dubai Pet Taxi →"})]})})`;

// Section 7: Relocation Routes
const sec7 = `${singleJsx}("section",{className:"py-14 sm:py-16 bg-white",children:${multiJsx}("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[${singleJsx}("h2",{className:"text-2xl sm:text-3xl font-black font-heading text-navy",children:"Pet Relocation from Dubai to Destinations Worldwide"}),${singleJsx}("p",{className:"text-sm sm:text-base text-slate-600 font-body max-w-2xl mx-auto leading-relaxed",children:"We assist pet parents with relocations across major global routes, including:"}),${singleJsx}("div",{className:"flex flex-wrap items-center justify-center gap-3 pt-2",children:[
  "Dubai ↔ India", "Dubai ↔ UK", "Dubai ↔ USA", "Dubai ↔ Canada", "Dubai ↔ Australia", "Other destinations worldwide"
].map((route,idx)=>` + `${singleJsx}("a",{key:idx,href:"#international-quote-form",className:"px-5 py-3 rounded-2xl bg-teal-soft border border-teal-border font-extrabold font-heading text-xs sm:text-sm text-navy hover:border-teal-deep hover:bg-white hover:shadow-sm transition-all",children:route}))})]})})`;

// Section 8: Why Pet Parents Trust
const sec8 = `${singleJsx}("section",{className:"py-16 sm:py-20 bg-white border-t border-teal-border",children:${multiJsx}("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12",children:[${multiJsx}("div",{className:"max-w-3xl space-y-3",children:[${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy",children:"Professional Planning. Personal Attention."}),${singleJsx}("p",{className:"text-base sm:text-lg text-slate-600 font-body leading-relaxed",children:"International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support."})]}),${singleJsx}("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[
  {title:"International Pet Relocation",desc:"Support for cross-border pet journeys from Dubai and into Dubai."},
  {title:"Route-Specific Planning",desc:"Requirements can vary by destination, so each journey is planned around its route."},
  {title:"Veterinary & Travel Coordination",desc:"Support across the preparation and travel stages, based on the services selected."},
  {title:"Local + International Mobility",desc:"A connected service journey from local transportation to international relocation."},
  {title:"IPATA Membership*",desc:"A professional industry association membership that can be highlighted as a trust signal if confirmed."}
].map((pillar,idx)=>` + `${multiJsx}("div",{key:idx,className:"rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all",children:[${singleJsx}("div",{className:"w-10 h-10 rounded-xl bg-teal-soft text-teal-deep font-mono font-bold flex items-center justify-center border border-teal-border text-sm",children:"0" + (idx+1)}),${singleJsx}("h3",{className:"text-xl font-black font-heading text-navy",children:pillar.title}),${singleJsx}("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:pillar.desc})]}))})]})})`;

// Section 10: Final CTA
const sec10 = `${singleJsx}("section",{className:"relative overflow-hidden text-white py-16 sm:py-20 bg-navy rounded-3xl mt-12",children:[${singleJsx}("div",{className:"relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6",children:[${singleJsx}("div",{className:"inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light",children:"READY TO PLAN YOUR PET'S MOVE?"}),${singleJsx}("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-white",children:"Let's Plan Your Pet's Journey Together"}),${singleJsx}("p",{className:"text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed",children:"Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps."}),${multiJsx}("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-4 pt-2",children:[${singleJsx}("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto",children:"Get a Free Relocation Quote →"}),${singleJsx}("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm",children:"WhatsApp the Relocation Team"})]})]})]})`;

const faqTarget = 'return i.jsx("section",{className:"py-20 bg-white border-t border-teal-border",children:';
if (c.includes(faqTarget)) {
  const newFaqReturn = `return (0,i.jsxs)("div",{className:"space-y-12",children:[${sec6},${sec7},${sec8},i.jsx("section",{className:"py-20 bg-white border-t border-teal-border",children:`;
  c = c.replace(faqTarget, newFaqReturn);
  const closingIdx = c.indexOf(']},t)})})]})})}}', c.indexOf('International Pet Relocation Questions, Answered'));
  if (closingIdx !== -1) {
    c = c.slice(0, closingIdx + 16) + `,${sec10}]})}}` + c.slice(closingIdx + 18);
    fs.writeFileSync(p, c);
    console.log('Successfully patched FAQAccordion in server page.js');
  } else {
    console.error('Could not find closing tag in page.js');
  }
} else {
  console.log('FAQ target not matched in page.js');
}
