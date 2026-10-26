import fs from 'fs';
import path from 'path';

const srcPagePath = path.join(process.cwd(), 'src/app/destinations/[slug]/page.tsx');

if (!fs.existsSync(srcPagePath)) {
  console.error('File not found:', srcPagePath);
  process.exit(1);
}

let srcCode = fs.readFileSync(srcPagePath, 'utf8');

// Check if Canada is already present in srcCode
if (!srcCode.includes('CANADA_COORDINATE_STEPS')) {
  // Constants to add
  const constantsToAdd = `
// USA-Specific Data
const USA_HANDLES = [
  { title: "Route & Airline Planning", desc: "Review the travel route and help identify suitable airline options based on the journey and available service.", icon: Plane },
  { title: "UAE Export Permit Support", desc: "Help coordinate the export health documentation and relevant UAE requirements for leaving the country.", icon: ShieldCheck },
  { title: "USA Entry Preparation", desc: "Help you understand the documents and travel preparation shown for the USA route, with the final requirements checked for your specific journey.", icon: Globe },
  { title: "Veterinary Preparation", desc: "Coordinate the veterinary records and travel-related preparation needed before departure.", icon: HeartHandshake },
  { title: "Travel Crate Preparation", desc: "Help arrange the appropriate airline travel crate and preparation for your pet's journey.", icon: Box },
  { title: "Airport Ground Handling", desc: "Coordinate the relevant airport arrangements at departure and destination, depending on the selected service.", icon: Clock },
  { title: "Customs & Arrival Support", desc: "Assist with the agreed arrival and clearance coordination after your pet reaches the destination.", icon: CheckCircle2 },
  { title: "Doorstep Pickup & Delivery", desc: "Local pickup or delivery can connect your home in Dubai with the wider international relocation journey, subject to the selected service.", icon: Car }
];

const USA_DOCS = [
  { title: "CDC Rabies Vaccination & Microchip Record", desc: "Keep the relevant rabies vaccination and microchip records ready for the journey.", icon: FileText },
  { title: "UAE MOCCAE Export Health Certificate", desc: "The current Global Pet Cab page lists the UAE MOCCAE export health certificate among the required documents.", icon: ShieldCheck },
  { title: "ISO 11784/11785 Microchip", desc: "The current route page lists an ISO 11784/11785-compliant microchip requirement.", icon: Award },
  { title: "Airline Cargo Booking Confirmation", desc: "The current page lists airline cargo booking confirmation as part of the USA route documentation.", icon: Plane },
  { title: "CDC Dog Import Form & USDA Compliance", desc: "Compliance with CDC rabies regulations and USDA entry documentation depending on whether the pet travels as excess baggage or manifest cargo.", icon: CheckCircle2 }
];

const USA_STEPS = [
  { s: "01", t: "01 — Start With the Route", d: "Share your Dubai pickup location, destination in the USA and tentative travel date." },
  { s: "02", t: "02 — Review the Requirements", d: "We look at the route and help you understand the veterinary, documentation and travel preparation involved." },
  { s: "03", t: "03 — Get Travel-Ready", d: "Prepare the required records, health documents and travel crate based on the confirmed route and airline requirements." },
  { s: "04", t: "04 — Coordinate the Flight", d: "The selected airline and travel arrangement are coordinated around the journey details." },
  { s: "05", t: "05 — Arrival", d: "We support the agreed airport, clearance and destination-side arrangements so you know what to expect after landing." }
];

const USA_FAQS = [
  { q: "What is involved in relocating a pet from Dubai to the USA?", a: "The journey can involve route planning, veterinary preparation, vaccination and microchip records, export documentation, travel crate arrangements, airline coordination and destination-side arrival procedures." },
  { q: "What documents does my pet need to travel from Dubai to the USA?", a: "The current Global Pet Cab USA page lists a CDC rabies vaccination and microchip record, UAE MOCCAE export health certificate, ISO 11784/11785 microchip and airline cargo booking confirmation. The exact checklist should be confirmed for your pet and route." },
  { q: "Does my pet need a microchip for travel to the USA?", a: "The current USA destination page lists an ISO 11784/11785 microchip as part of the required documentation. The final requirement should be confirmed for the specific journey." },
  { q: "Do I need a rabies vaccination record?", a: "The current route page lists a CDC rabies vaccination and microchip record. The exact vaccination requirements and timing should be verified before travel." },
  { q: "Will my pet travel as excess baggage or manifest cargo?", a: "The travel method can depend on the route, airline and pet travel arrangements. The current USA page notes that documentation and compliance can depend on whether the pet travels as excess baggage or manifest cargo." },
  { q: "Do you help with the UAE export process?", a: "Yes. UAE export health documentation and related coordination can form part of the relocation service, subject to the selected service and route." },
  { q: "Can you help with the travel crate?", a: "Global Pet Cab's relocation service includes support around airline travel crate preparation. The appropriate crate should be confirmed according to the pet, airline and journey." },
  { q: "Can you pick up my pet from my home in Dubai?", a: "Local doorstep pickup can connect with the wider international relocation journey when included in the selected service." },
  { q: "How early should I start planning my pet's move to the USA?", a: "It is best to start early because veterinary preparation, documentation and airline arrangements may involve specific timing. The right lead time depends on your route and pet." },
  { q: "How do I get a quote for pet relocation from Dubai to the USA?", a: "Use the relocation quote form and share your origin, destination, tentative travel date and pet details. The team can then review the journey and advise you on the next steps." }
];

// Canada-Specific Data
const CANADA_COORDINATE_STEPS = [
  { s: "01", t: "01 — Route Planning", d: "We start with your departure point, destination and intended travel date to understand what your journey will involve.", icon: Compass },
  { s: "02", t: "02 — Pet Travel Preparation", d: "From veterinary preparation to travel documentation, we help you understand the important things to arrange before departure.", icon: HeartHandshake },
  { s: "03", t: "03 — Travel Crate & Flight Preparation", d: "The right travel setup matters. We can help coordinate the appropriate travel crate and arrangements required for your pet's journey.", icon: Box },
  { s: "04", t: "04 — Export & Import Coordination", d: "Travelling from Dubai to Canada means exporting your pet from the UAE and importing your pet into Canada. Travelling the other way means importing your pet into Dubai/UAE. We help you understand the requirements for the direction you're travelling.", icon: FileText },
  { s: "05", t: "05 — Airport & Ground Transport", d: "Your pet's journey doesn't necessarily start at the airport. Local transportation can be arranged as part of the selected service, including getting your pet from home to the airport or from the airport to their final destination.", icon: Plane },
  { s: "06", t: "06 — Arrival Arrangements", d: "We help coordinate the agreed arrival and handover arrangements so you know what to expect when your pet reaches the other side.", icon: ShieldCheck }
];

const CANADA_WHY_US = [
  { title: "Pet-first planning", desc: "We look at the journey from your pet's perspective, not just the itinerary.", icon: HeartHandshake },
  { title: "Clear communication", desc: "You should know what is happening, what needs to happen next and who is handling each part of the journey.", icon: Sparkles },
  { title: "Dubai & worldwide support", desc: "From local pet transport in Dubai to international relocation, our services cover different stages of your pet's journey.", icon: Car },
  { title: "Professional relocation network", desc: "Where applicable, our international relocation support is coordinated around the requirements of the route, airline and destination.", icon: Compass },
  { title: "IPATA Member", desc: "Use this trust point only if the membership is confirmed by the client.", icon: Award }
];

const CANADA_FAQS = [
  { q: "Can Global Pet Cab help move my pet from Dubai to Canada?", a: "Yes. Global Pet Cab supports international pet relocation from Dubai/UAE to destinations including Canada. Share your route and tentative travel date through the quote form so the team can review your journey." },
  { q: "What does it mean to export a pet from Dubai?", a: "If your pet is travelling from Dubai/UAE to Canada, the pet is being exported from the UAE. The journey will also involve the applicable Canadian import requirements." },
  { q: "What does it mean to import a pet into Dubai?", a: "If your pet is travelling from Canada into Dubai/UAE, it is an import into the UAE. The applicable entry requirements depend on the pet and travel circumstances." },
  { q: "Do I need a special travel crate for my pet?", a: "International air travel may require an airline-approved or IATA-compliant travel crate, depending on the airline and route. The appropriate travel arrangement should be confirmed for your journey." },
  { q: "Can you help with airport transportation in Dubai?", a: "Yes. Local pet transportation can form part of the journey, including getting your pet from home to the airport or from the airport to their destination, depending on the selected service." },
  { q: "Can you help if I can't take my pet to the vet or groomer myself?", a: "Local transportation support may be available for veterinary or grooming appointments when you are unable to accompany your pet. The exact service can be discussed when planning your booking." },
  { q: "How early should I start planning my pet's relocation?", a: "International pet travel can involve several preparation steps, so it is better to start planning as early as possible. The right timeline depends on your pet, route, airline and destination requirements." },
  { q: "Can I get a quote before I have a confirmed travel date?", a: "Yes. You can provide a tentative travel date when submitting your enquiry. This gives the team a starting point for reviewing your route and planning the next steps." }
];
`;

  srcCode = srcCode.replace('export default function DestinationPage', `${constantsToAdd}\nexport default function DestinationPage`);
}

// Write the updated file
fs.writeFileSync(srcPagePath, srcCode);
console.log('src/app/destinations/[slug]/page.tsx updated with constants!');
