import fs from 'fs';
import path from 'path';

// This script generates the complete module 5301 for .next/server/app/destinations/[slug]/page.js
// supporting:
// 1. dubai-to-canada (10 sections)
// 2. dubai-to-usa (8 sections)
// 3. dubai-to-uk (8 sections)
// 4. dubai-to-india & others (default 10 sections)

const destinationPageJs = path.join(process.cwd(), '.next/server/app/destinations/[slug]/page.js');

if (!fs.existsSync(destinationPageJs)) {
  console.error('File not found:', destinationPageJs);
  process.exit(1);
}

const code = fs.readFileSync(destinationPageJs, 'utf8');

// Build module 5301
const module5301Code = `5301:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>u,generateMetadata:()=>c});var a=i(9510);i(1159);var r=i(1269),n=i(8608),o=i(8648);var l=i(8280);
function Svg(e){let{p:t,cls:s="w-5 h-5",vb:r="0 0 24 24"}=e;return a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:r,fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:s,children:Array.isArray(t)?t.map((e,t)=>a.jsx("path",{d:e},t)):a.jsx("path",{d:t})})}
let d={
  "dubai-to-india":{slug:"dubai-to-india",title:"Pet Relocation from Dubai to India",route:"Dubai (DXB) → India (DEL / BOM / BLR)",origin:"Dubai, UAE",destination:"India",overview:"Relocating your dog or cat from Dubai to India requires careful coordination with Indian AQCS (Animal Quarantine and Certification Services), DGFT NOC permits, and UAE MOCCAE export clearance.",documentsNeeded:["ISO 11784/11785 Microchip Certificate","UAE MOCCAE Export Health Certificate","India AQCS No Objection Certificate (NOC)","Valid Rabies & Core Vaccination Records (30+ days prior)","Owner Passport & Indian Visa/OCI Copy"],flightTimeApprox:"3 to 4.5 Hours Direct Flight"},
  "india-to-dubai":{slug:"india-to-dubai",title:"Pet Relocation from India to Dubai",route:"India (BOM / DEL) → Dubai (DXB)",origin:"India",destination:"Dubai, UAE",overview:"Importing a pet into Dubai from India requires a mandatory Rabies Neutralizing Antibody Titer Test (RNATT) from an approved lab, a UAE MOCCAE Import Permit, and Indian Govt Export Certification.",documentsNeeded:["Approved ISO 15-digit Microchip","Rabies Titer Test (RNATT) with >= 0.5 IU/ml titer level","UAE Ministry (MOCCAE) Import Permit","Indian Animal Quarantine (AQCS) Export Health Certificate","UAE Resident Visa Copy of Owner"],flightTimeApprox:"3 to 4.5 Hours Direct Flight"},
  "dubai-to-uk":{slug:"dubai-to-uk",title:"Pet Relocation from Dubai to the UK, Made Simple",route:"Dubai (DXB) → London (LHR) / Manchester (MAN)",origin:"Dubai, UAE",destination:"United Kingdom",overview:"Pets entering the UK from the UAE must travel as Manifested Cargo in compliance with DEFRA regulations via approved Heathrow or Manchester HARC inspection facilities.",documentsNeeded:["DEFRA GB Pet Health Certificate","Microchip implanted prior to Rabies Vaccination","Valid Rabies Vaccination (minimum 21 days old)","Tapeworm (Echinococcus multilocularis) treatment given by vet 24-120 hrs before arrival","Air Waybill (AWB) Manifest Cargo Booking"],flightTimeApprox:"7.5 Hours Direct Flight"},
  "uk-to-dubai":{slug:"uk-to-dubai",title:"Pet Relocation from United Kingdom to Dubai",route:"London (LHR) → Dubai (DXB)",origin:"United Kingdom",destination:"Dubai, UAE",overview:"Moving your pet back to Dubai from the UK requires securing an official UAE MOCCAE Import Permit and an official UK DEFRA Export Health Certificate.",documentsNeeded:["ISO Microchip","UAE MOCCAE Import Permit","UK Official Vet Health Certificate (DEFRA signed)","Rabies Titer Test (if applicable)","Owner UAE Residence Entry Permit / Visa"],flightTimeApprox:"7 Hours Direct Flight"},
  "dubai-to-usa":{slug:"dubai-to-usa",title:"Pet Relocation from Dubai to United States",route:"Dubai (DXB) → USA (JFK / LAX / ORD / IAH)",origin:"Dubai, UAE",destination:"United States of America",overview:"Relocating pets to the US requires compliance with CDC rabies regulations and USDA entry documentation depending on whether the pet travels as excess baggage or manifest cargo.",documentsNeeded:["CDC Rabies Vaccination & Microchip Record","UAE MOCCAE Export Health Certificate","ISO 11784/11785 Microchip","Airline Cargo Booking Confirmation"],flightTimeApprox:"13 to 16 Hours Direct Flight"},
  "usa-to-dubai":{slug:"usa-to-dubai",title:"Pet Relocation from USA to Dubai",route:"USA → Dubai (DXB)",origin:"United States",destination:"Dubai, UAE",overview:"Importing pets into Dubai from the US requires USDA endorsement of the health certificate and a valid UAE MOCCAE import permit.",documentsNeeded:["USDA Endorsed Veterinary Health Certificate","UAE MOCCAE Import Permit","Rabies Titer Blood Test (RNATT)","Valid Microchip & Vaccination Passport"],flightTimeApprox:"13 to 15 Hours Direct Flight"},
  "dubai-to-canada":{slug:"dubai-to-canada",title:"Pet Relocation from Dubai to Canada",route:"Dubai (DXB) → Toronto (YYZ) / Vancouver (YVR)",origin:"Dubai, UAE",destination:"Canada",overview:"Moving pets from Dubai to Canada requires Canadian Food Inspection Agency (CFIA) rabies compliance, microchip verification, and UAE MOCCAE export clearance.",documentsNeeded:["ISO 11784/11785 Microchip Certificate","UAE MOCCAE Export Health Certificate","Valid Rabies Vaccination Record (at least 30 days prior)","Veterinary Certificate of Health","Owner Passport Copy & Flight Itinerary"],flightTimeApprox:"14 to 16 Hours Direct Flight"},
  "dubai-to-australia":{slug:"dubai-to-australia",title:"Pet Relocation from Dubai to Australia",route:"Dubai (DXB) → Melbourne (MEL) / Sydney (SYD)",origin:"Dubai, UAE",destination:"Australia",overview:"Australia enforces strict biosecurity protocols via DAFF. Relocating pets requires RNATT blood testing, import permits, and mandatory Mickleham quarantine booking.",documentsNeeded:["ISO 15-digit Microchip Certificate","Rabies Neutralizing Antibody Titer Test (RNATT)","Australia DAFF Import Permit","Mickleham Post-Entry Quarantine Reservation","Official UAE MOCCAE Endorsed Veterinary Certificate"],flightTimeApprox:"13 to 14.5 Hours Direct Flight"}
};

let defaultFaqs=[
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

let defaultScope=[
  {title:"Route & Travel Planning",desc:"We look at your origin, destination and travel plans to understand the practical requirements of the journey.",p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"]},
  {title:"Veterinary Preparation",desc:"Support around the veterinary checks, vaccinations, tests and health documents required for your route, where applicable.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {title:"Travel Crate Preparation",desc:"Guidance on the right travel crate and preparation for your pet's journey, based on airline and route requirements.",p:["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z","m3.3 7 8.7 5 8.7-5","M12 22V12"]},
  {title:"Export & Import Support",desc:"Help with the relevant export or import documentation and country-specific requirements for the journey.",p:["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z","M14 2v4a2 2 0 0 0 2 2h4","M10 9H8","M16 13H8","M16 17H8"]},
  {title:"Airline & Airport Coordination",desc:"Support with airline arrangements and the airport logistics involved in getting your pet ready to travel.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"},
  {title:"Arrival & Handover",desc:"Support with the arrival process and agreed handover arrangements so the journey continues smoothly after landing.",p:["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m9 12 2 2 4-4"]}
];

let defaultSteps=[
  {s:"01",t:"01 — Understand Your Route",d:"We start with where your pet is travelling from, where they are going and when you are planning to travel."},
  {s:"02",t:"02 — Build the Travel Plan",d:"We identify the key veterinary, documentation, crate, airline and travel requirements that apply to your route."},
  {s:"03",t:"03 — Prepare Your Pet",d:"We help you understand and coordinate the preparation your pet needs before departure."},
  {s:"04",t:"04 — Get the Paperwork in Order",d:"We support the relevant export, import and travel documentation required for the journey."},
  {s:"05",t:"05 — Coordinate the Travel",d:"We help bring together the flight and airport arrangements selected for your pet's relocation."},
  {s:"06",t:"06 — Get Them Where They Need to Be",d:"We support the agreed arrival and handover process so your pet can continue safely to their new destination."}
];

let destinations=[
  {name:"Dubai ↔ India",href:"/destinations/dubai-to-india"},
  {name:"Dubai ↔ UK",href:"/destinations/dubai-to-uk"},
  {name:"Dubai ↔ USA",href:"/destinations/dubai-to-usa"},
  {name:"Dubai ↔ Canada",href:"/destinations/dubai-to-canada"},
  {name:"Dubai ↔ Australia",href:"/destinations/dubai-to-australia"},
  {name:"Other international destinations",href:"#international-quote-form"}
];

let whyUs=[
  {title:"A Route-First Approach",desc:"We start with your actual journey rather than giving every customer the same checklist.",p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"]},
  {title:"Support Across the Journey",desc:"From preparation and local transport to airport coordination and arrival support, the service can connect the different stages of the move.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {title:"Clear Communication",desc:"You should know what is happening next, what information is needed and which parts of the journey require your attention.",p:["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4","M4 17v2","M5 18H3"]},
  {title:"Local + International Mobility",desc:"International relocation can connect naturally with local pet taxi, airport and appointment transportation.",p:["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2","M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M9 17h6","M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]},
  {title:"Professional Industry Recognition",desc:"If confirmed, IPATA membership can be highlighted here alongside other verified credentials and handling standards.",p:["m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526","M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"]}
];

// UK-Specific Data
let ukHandles=[
  {title:"Route & Airline Planning",desc:"Plan the journey around the available route, travel requirements and appropriate airline options.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"},
  {title:"UAE Export Permit Support",desc:"Support the export permit process and coordination with the relevant ministry requirements.",p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"]},
  {title:"UK Import Requirements",desc:"Help you prepare for the requirements that apply when your pet enters the United Kingdom.",p:["M3 21h18","M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4","M5 21V10.85","M19 21V10.85","M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"]},
  {title:"Veterinary Preparation",desc:"Coordinate the veterinary checks, health documentation and travel requirements needed for the journey.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {title:"IATA-Compliant Travel Crate",desc:"Help arrange the appropriate travel crate, including sizing, preparation and travel setup.",p:["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z","m3.3 7 8.7 5 8.7-5","M12 22V12"]},
  {title:"Airport Ground Handling",desc:"Coordinate the relevant ground-handling arrangements at departure and destination airports.",p:["M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2","M10 12h4"]},
  {title:"Customs & Arrival Coordination",desc:"Support the arrival process and customs-related coordination at the destination.",p:["M22 11.08V12a10 10 0 1 1-5.93-9.14","m9 11 3 3L22 4"]},
  {title:"Doorstep Pickup & Delivery",desc:"Connect the international journey with local pet transportation, where the selected service includes pickup or delivery.",p:["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2","M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M9 17h6","M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]}
];

let ukDocs=[
  {title:"DEFRA GB Pet Health Certificate",desc:"Health certification required for the UK journey, subject to the applicable travel route and rules.",p:["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z","M14 2v4a2 2 0 0 0 2 2h4","M10 9H8","M16 13H8","M16 17H8"]},
  {title:"Microchip Before Rabies Vaccination",desc:"The microchip must be in place before the rabies vaccination, as reflected in the current route requirements.",p:["M12 2v20","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]},
  {title:"Valid Rabies Vaccination",desc:"The current page specifies a minimum of 21 days before travel.",p:["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z","M12 5v6","M9 8h6"]},
  {title:"Tapeworm Treatment",desc:"The current page specifies treatment for Echinococcus multilocularis within 24–120 hours before arrival.",p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"]},
  {title:"Air Waybill (AWB) / Manifest Cargo Booking",desc:"The current route information specifies air waybill and manifest cargo booking for the journey.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}
];

let ukSteps=[
  {s:"01",t:"01 — Start With Your Route",d:"Tell us where in Dubai your pet is travelling from, where in the UK they are going and your tentative travel date."},
  {s:"02",t:"02 — Understand the Requirements",d:"We review the route and help identify the veterinary, documentation and travel requirements that apply."},
  {s:"03",t:"03 — Prepare for Travel",d:"We help coordinate the required preparation, travel crate and airline arrangements."},
  {s:"04",t:"04 — Get Your Pet Moving",d:"The journey is coordinated from departure arrangements through the relevant airport and travel stages."},
  {s:"05",t:"05 — Arrival & Handover",d:"We support the agreed destination-side arrangements so you know what happens after your pet lands."}
];

let ukFaqs=[
  {q:"What is involved in relocating a pet from Dubai to the UK?",a:"The journey can involve route planning, veterinary preparation, UK entry requirements, travel crate arrangements, airline coordination, export documentation and destination-side arrival arrangements."},
  {q:"How early should I start planning my pet's move to the UK?",a:"Start as early as possible. Some veterinary and travel requirements have specific timing windows, so the exact lead time depends on your pet, route and travel date."},
  {q:"Does my pet need a microchip before the rabies vaccination?",a:"The current UK route information on the Global Pet Cab page specifies that the microchip should be implanted before the rabies vaccination."},
  {q:"How long before travel must the rabies vaccination be valid?",a:"The current route information specifies a minimum of 21 days before travel. The team should verify the current requirement for your specific journey before departure."},
  {q:"Is tapeworm treatment required for the UK?",a:"The current UK route information specifies treatment for Echinococcus multilocularis within 24–120 hours before arrival."},
  {q:"Will my pet need a health certificate?",a:"The current route page lists a DEFRA GB Pet Health Certificate. The exact documentation should be checked against the latest requirements for your route."},
  {q:"Do I need an IATA-compliant travel crate?",a:"The current Global Pet Cab service information includes IATA-compliant travel crate assembly and preparation as part of the relocation support."},
  {q:"Can you arrange airport pickup or delivery?",a:"Doorstep pickup and delivery can be part of the selected relocation service. The exact pickup and destination arrangements should be confirmed when requesting the quote."},
  {q:"Can you help if I am not available for my pet's grooming or health appointment before travel?",a:"Selected local pet transportation and appointment support may be available when the pet parent cannot be there, subject to the service arrangement."},
  {q:"How do I get a quote for pet relocation from Dubai to the UK?",a:"Use the relocation quote form and share your route, tentative travel date and pet details. The team can then review your requirements and prepare the next steps."}
];

// USA-Specific Data
let usaHandles=[
  {title:"Route & Airline Planning",desc:"Review the travel route and help identify suitable airline options based on the journey and available service.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"},
  {title:"UAE Export Permit Support",desc:"Help coordinate the export health documentation and relevant UAE requirements for leaving the country.",p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"]},
  {title:"USA Entry Preparation",desc:"Help you understand the documents and travel preparation shown for the USA route, with the final requirements checked for your specific journey.",p:["M3 21h18","M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4","M5 21V10.85","M19 21V10.85","M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"]},
  {title:"Veterinary Preparation",desc:"Coordinate the veterinary records and travel-related preparation needed before departure.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {title:"Travel Crate Preparation",desc:"Help arrange the appropriate airline travel crate and preparation for your pet's journey.",p:["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z","m3.3 7 8.7 5 8.7-5","M12 22V12"]},
  {title:"Airport Ground Handling",desc:"Coordinate the relevant airport arrangements at departure and destination, depending on the selected service.",p:["M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z","M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2","M10 12h4"]},
  {title:"Customs & Arrival Support",desc:"Assist with the agreed arrival and clearance coordination after your pet reaches the destination.",p:["M22 11.08V12a10 10 0 1 1-5.93-9.14","m9 11 3 3L22 4"]},
  {title:"Doorstep Pickup & Delivery",desc:"Local pickup or delivery can connect your home in Dubai with the wider international relocation journey, subject to the selected service.",p:["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2","M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M9 17h6","M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]}
];

let usaDocs=[
  {title:"CDC Rabies Vaccination & Microchip Record",desc:"Keep the relevant rabies vaccination and microchip records ready for the journey.",p:["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z","M14 2v4a2 2 0 0 0 2 2h4","M10 9H8","M16 13H8","M16 17H8"]},
  {title:"UAE MOCCAE Export Health Certificate",desc:"The current Global Pet Cab page lists the UAE MOCCAE export health certificate among the required documents.",p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"]},
  {title:"ISO 11784/11785 Microchip",desc:"The current route page lists an ISO 11784/11785-compliant microchip requirement.",p:["M12 2v20","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]},
  {title:"Airline Cargo Booking Confirmation",desc:"The current page lists airline cargo booking confirmation as part of the USA route documentation.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"},
  {title:"CDC Dog Import Form & USDA Compliance",desc:"Compliance with CDC rabies regulations and USDA entry documentation depending on whether the pet travels as excess baggage or manifest cargo.",p:["M22 11.08V12a10 10 0 1 1-5.93-9.14","m9 11 3 3L22 4"]}
];

let usaSteps=[
  {s:"01",t:"01 — Start With the Route",d:"Share your Dubai pickup location, destination in the USA and tentative travel date."},
  {s:"02",t:"02 — Review the Requirements",d:"We look at the route and help you understand the veterinary, documentation and travel preparation involved."},
  {s:"03",t:"03 — Get Travel-Ready",d:"Prepare the required records, health documents and travel crate based on the confirmed route and airline requirements."},
  {s:"04",t:"04 — Coordinate the Flight",d:"The selected airline and travel arrangement are coordinated around the journey details."},
  {s:"05",t:"05 — Arrival",d:"We support the agreed airport, clearance and destination-side arrangements so you know what to expect after landing."}
];

let usaFaqs=[
  {q:"What is involved in relocating a pet from Dubai to the USA?",a:"The journey can involve route planning, veterinary preparation, vaccination and microchip records, export documentation, travel crate arrangements, airline coordination and destination-side arrival procedures."},
  {q:"What documents does my pet need to travel from Dubai to the USA?",a:"The current Global Pet Cab USA page lists a CDC rabies vaccination and microchip record, UAE MOCCAE export health certificate, ISO 11784/11785 microchip and airline cargo booking confirmation. The exact checklist should be confirmed for your pet and route."},
  {q:"Does my pet need a microchip for travel to the USA?",a:"The current USA destination page lists an ISO 11784/11785 microchip as part of the required documentation. The final requirement should be confirmed for the specific journey."},
  {q:"Do I need a rabies vaccination record?",a:"The current route page lists a CDC rabies vaccination and microchip record. The exact vaccination requirements and timing should be verified before travel."},
  {q:"Will my pet travel as excess baggage or manifest cargo?",a:"The travel method can depend on the route, airline and pet travel arrangements. The current USA page notes that documentation and compliance can depend on whether the pet travels as excess baggage or manifest cargo."},
  {q:"Do you help with the UAE export process?",a:"Yes. UAE export health documentation and related coordination can form part of the relocation service, subject to the selected service and route."},
  {q:"Can you help with the travel crate?",a:"Global Pet Cab's relocation service includes support around airline travel crate preparation. The appropriate crate should be confirmed according to the pet, airline and journey."},
  {q:"Can you pick up my pet from my home in Dubai?",a:"Local doorstep pickup can connect with the wider international relocation journey when included in the selected service."},
  {q:"How early should I start planning my pet's move to the USA?",a:"It is best to start early because veterinary preparation, documentation and airline arrangements may involve specific timing. The right lead time depends on your route and pet."},
  {q:"How do I get a quote for pet relocation from Dubai to the USA?",a:"Use the relocation quote form and share your origin, destination, tentative travel date and pet details. The team can then review the journey and advise you on the next steps."}
];

// Canada-Specific Data
let canadaCoordinateSteps=[
  {s:"01",t:"01 — Route Planning",d:"We start with your departure point, destination and intended travel date to understand what your journey will involve.",p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"]},
  {s:"02",t:"02 — Pet Travel Preparation",d:"From veterinary preparation to travel documentation, we help you understand the important things to arrange before departure.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {s:"03",t:"03 — Travel Crate & Flight Preparation",d:"The right travel setup matters. We can help coordinate the appropriate travel crate and arrangements required for your pet's journey.",p:["M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z","m3.3 7 8.7 5 8.7-5","M12 22V12"]},
  {s:"04",t:"04 — Export & Import Coordination",d:"Travelling from Dubai to Canada means exporting your pet from the UAE and importing your pet into Canada. Travelling the other way means importing your pet into Dubai/UAE. We help you understand the requirements for the direction you're travelling.",p:["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z","M14 2v4a2 2 0 0 0 2 2h4","M10 9H8","M16 13H8","M16 17H8"]},
  {s:"05",t:"05 — Airport & Ground Transport",d:"Your pet's journey doesn't necessarily start at the airport. Local transportation can be arranged as part of the selected service, including getting your pet from home to the airport or from the airport to their final destination.",p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"},
  {s:"06",t:"06 — Arrival Arrangements",d:"We help coordinate the agreed arrival and handover arrangements so you know what to expect when your pet reaches the other side.",p:["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z","m9 12 2 2 4-4"]}
];

let canadaWhyUs=[
  {title:"Pet-first planning",desc:"We look at the journey from your pet's perspective, not just the itinerary.",p:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"},
  {title:"Clear communication",desc:"You should know what is happening, what needs to happen next and who is handling each part of the journey.",p:["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4","M4 17v2","M5 18H3"]},
  {title:"Dubai & worldwide support",desc:"From local pet transport in Dubai to international relocation, our services cover different stages of your pet's journey.",p:["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2","M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z","M9 17h6","M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]},
  {title:"Professional relocation network",desc:"Where applicable, our international relocation support is coordinated around the requirements of the route, airline and destination.",p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"]},
  {title:"IPATA Member",desc:"Use this trust point only if the membership is confirmed by the client.",p:["m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526","M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"]}
];

let canadaFaqs=[
  {q:"Can Global Pet Cab help move my pet from Dubai to Canada?",a:"Yes. Global Pet Cab supports international pet relocation from Dubai/UAE to destinations including Canada. Share your route and tentative travel date through the quote form so the team can review your journey."},
  {q:"What does it mean to export a pet from Dubai?",a:"If your pet is travelling from Dubai/UAE to Canada, the pet is being exported from the UAE. The journey will also involve the applicable Canadian import requirements."},
  {q:"What does it mean to import a pet into Dubai?",a:"If your pet is travelling from Canada into Dubai/UAE, it is an import into the UAE. The applicable entry requirements depend on the pet and travel circumstances."},
  {q:"Do I need a special travel crate for my pet?",a:"International air travel may require an airline-approved or IATA-compliant travel crate, depending on the airline and route. The appropriate travel arrangement should be confirmed for your journey."},
  {q:"Can you help with airport transportation in Dubai?",a:"Yes. Local pet transportation can form part of the journey, including getting your pet from home to the airport or from the airport to their destination, depending on the selected service."},
  {q:"Can you help if I can't take my pet to the vet or groomer myself?",a:"Local transportation support may be available for veterinary or grooming appointments when you are unable to accompany your pet. The exact service can be discussed when planning your booking."},
  {q:"How early should I start planning my pet's relocation?",a:"International pet travel can involve several preparation steps, so it is better to start planning as early as possible. The right timeline depends on your pet, route, airline and destination requirements."},
  {q:"Can I get a quote before I have a confirmed travel date?",a:"Yes. You can provide a tentative travel date when submitting your enquiry. This gives the team a starting point for reviewing your route and planning the next steps."}
];

function c({params:e}){
  let t=d[e.slug]||d["dubai-to-india"];
  if(e.slug==="dubai-to-canada"){
    return{
      title:"Moving Your Pet Between Dubai & Canada? Let's Plan the Journey — Global Pet Cab Dubai",
      description:"Moving your pet to another country is a big move. Global Pet Cab helps you organise your pet relocation between Dubai and Canada."
    };
  }
  if(e.slug==="dubai-to-usa"){
    return{
      title:"Pet Relocation from Dubai to the USA, Made Easier — Global Pet Cab Dubai",
      description:"Pet relocation from Dubai to the USA with route planning, travel preparation and arrival coordination."
    };
  }
  if(e.slug==="dubai-to-uk"){
    return{
      title:"Pet Relocation from Dubai to the UK, Made Simple — Global Pet Cab Dubai",
      description:"Pet relocation from Dubai to the UK with route-specific preparation, travel coordination and arrival support."
    };
  }
  return{title:\`\${t.title} — Global Pet Cab Dubai\`,description:t.overview};
}

function renderDubaiToUk(){
  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800",children:[
    // 1. HERO SECTION
    (0,a.jsxs)("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80",alt:"Dubai to UK Pet Relocation",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30",children:"DUBAI → UNITED KINGDOM PET RELOCATION"}),
        a.jsx("h1",{className:"text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]",children:"Pet Relocation from Dubai to the UK, Made Simple"}),
        (0,a.jsxs)("div",{className:"max-w-3xl mx-auto space-y-3",children:[
          a.jsx("p",{className:"text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:"Moving your dog or cat from Dubai to the United Kingdom comes with a few important steps, from getting the right veterinary documents and travel preparation in place to arranging the flight and arrival process. Global Pet Cab helps you understand what needs to happen and coordinates the key parts of the journey, so you can focus on getting your pet ready for the move."}),
          a.jsx("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto",children:"Pet relocation from Dubai to the UK with route-specific preparation, travel coordination and arrival support."})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Pet Relocation Quote",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20UK%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    ]}),

    // 2. WHAT GLOBAL PET CAB HANDLES
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"WHAT GLOBAL PET CAB HANDLES"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Helping You Prepare for Your Pet's Move from Dubai to the UK"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"A move to the UK is more than getting your pet onto a flight. We help bring the important pieces together, from route planning and veterinary preparation to travel crate arrangements, airport handling and arrival coordination."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8",children:ukHandles.map((e,t)=>(0,a.jsxs)("div",{className:"p-7 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-lg font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))})
      ]})
    }),

    // 3. DOCUMENTS & REQUIREMENTS
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"DOCUMENTS & REQUIREMENTS"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Documents Your Pet May Need for Travel to the UK"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"UK pet travel requirements are route-specific and can change. The list below reflects the requirements shown on the current Global Pet Cab UK destination page and should be checked against the latest applicable rules before travel."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:ukDocs.map((e,t)=>(0,a.jsxs)("div",{className:"p-7 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-lg font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))}),
        a.jsx("div",{className:"mt-10 p-6 max-w-4xl mx-auto rounded-2xl bg-amber-50/80 border border-amber-200 text-center",children:
          a.jsx("p",{className:"text-sm text-amber-900 font-medium leading-relaxed font-body",children:"Important: Regulatory requirements can change. The relocation team should verify the current UK requirements for the specific journey before confirming the final checklist."})
        })
      ]})
    }),

    // 4. HUMAN SUPPORT SECTION
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80",alt:"Pet Care Support",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"HUMAN SUPPORT"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"We Know the Hard Part Isn't Just the Flight"}),
        (0,a.jsxs)("div",{className:"space-y-4 max-w-3xl mx-auto",children:[
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"When you're moving your pet to another country, it is easy to get stuck wondering whether you have missed a document, booked the right kind of travel, or planned everything early enough."}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"That's why we start with your route and your pet, then work through the requirements with you. The goal is simple: fewer unknowns, a clearer plan and someone you can speak to when you have a question."}),
          a.jsx("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed font-body",children:"And if you are not available for a local grooming or health-related appointment before travel, selected local pet transportation and appointment support may also be available, subject to the service arrangement."})
        ]})
      ]})
    ]}),

    // 5. INTERNATIONAL PET RELOCATION QUOTE FORM
    a.jsx("section",{id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"DUBAI ↔ WORLDWIDE RELOCATION"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Request Your UK Pet Relocation Quote"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Once we understand the route and your pet's needs, the team can review the requirements and prepare the next steps."})
        ]}),
        (0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto",children:[
          (0,a.jsxs)("div",{className:"lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden",children:[
            (0,a.jsxs)("div",{className:"space-y-3 relative z-10",children:[
              a.jsx("span",{className:"text-xs font-bold font-heading text-teal-bright uppercase tracking-widest",children:"Route Overview"}),
              a.jsx("h3",{className:"text-2xl font-black font-heading tracking-tight",children:"Dubai (DXB) → London (LHR) / Manchester (MAN)"}),
              a.jsx("p",{className:"text-sm text-slate-300 leading-relaxed",children:"Pets travelling from Dubai to the UK fly into approved HARC facilities via manifested air cargo under strict DEFRA guidelines."})
            ]}),
            (0,a.jsxs)("div",{className:"space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm",children:[
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Direct Flight: ~7.5 Hours"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"DEFRA UK Health Checklist & HARC Handling"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Dedicated Route Relocation Specialist"})
              ]})
            ]})
          ]}),
          a.jsx("div",{className:"lg:col-span-7",children:
            a.jsx(l.Z,{
              title:"Request Your UK Pet Relocation Quote",
              description:"Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Once we understand the route and your pet's needs, the team can review the requirements and prepare the next steps."
            })
          })
        ]})
      ]})
    }),

    // 6. SIMPLE JOURNEY EXPLANATION
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"HOW IT WORKS"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"From Dubai to the UK, One Step at a Time"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"We coordinate every phase from your initial route enquiry to destination arrival."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto",children:ukSteps.map((e,t)=>(0,a.jsxs)("div",{className:"p-6 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-10 h-10 rounded-xl bg-teal-soft border border-teal-border flex items-center justify-center font-heading font-black text-teal-deep text-sm",children:e.s}),
          a.jsx("h3",{className:"text-base font-black font-heading text-navy leading-snug",children:e.t}),
          a.jsx("p",{className:"text-xs sm:text-sm text-slate-600 leading-relaxed font-body",children:e.d})
        ]},t))})
      ]})
    }),

    // 7. FAQS
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center mb-14 space-y-3",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Dubai to UK Pet Relocation Questions, Answered"}),
          a.jsx("p",{className:"text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto",children:"Planning your pet's move from Dubai to the UK? Here are a few of the questions worth answering before you book."})
        ]}),
        a.jsx("div",{className:"space-y-4",children:ukFaqs.map((e,t)=>(0,a.jsxs)("details",{className:"group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30",children:[
          (0,a.jsxs)("summary",{className:"flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none",children:[
            a.jsx("span",{children:e.q}),
            a.jsx("span",{className:"ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep",children:a.jsx(Svg,{p:"m6 9 6 6 6-6",cls:"w-5 h-5"})})
          ]}),
          a.jsx("div",{className:"px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4",children:e.a})
        ]},t))})
      ]})
    }),

    // 8. FINAL CTA
    a.jsx("section",{className:"py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"READY TO PLAN THE MOVE?"}),
        a.jsx("h2",{className:"text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Let's Get Your Pet Ready for the UK"}),
        a.jsx("p",{className:"text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed",children:"You don't need to figure out every step on your own. Tell us about your pet and your route, and we'll help you understand what needs to happen next."}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Pet Relocation Quote",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20UK%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    })
  ]});
}

function renderDubaiToUsa(){
  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800",children:[
    // 1. HERO SECTION
    (0,a.jsxs)("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80",alt:"Dubai to USA Pet Relocation",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30",children:"DUBAI → USA PET RELOCATION"}),
        a.jsx("h1",{className:"text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]",children:"Pet Relocation from Dubai to the USA, Made Easier"}),
        (0,a.jsxs)("div",{className:"max-w-3xl mx-auto space-y-3",children:[
          a.jsx("p",{className:"text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:"Taking your pet from Dubai to the United States involves more than booking a flight. Depending on the route and how your pet travels, you may need to prepare veterinary documents, vaccination records, a suitable travel crate and the right airline arrangements. Global Pet Cab helps you put those pieces together and plan the journey around your pet."}),
          a.jsx("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto",children:"Pet relocation from Dubai to the USA with route planning, travel preparation and arrival coordination."})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Pet Relocation Quote",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    ]}),

    // 2. WHAT GLOBAL PET CAB HANDLES
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"WHAT GLOBAL PET CAB HANDLES"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"What We Can Help With on Your Dubai to USA Pet Move"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Every international pet journey has its own details. We start with your route, your pet and your intended travel date, then help coordinate the practical pieces needed to get the journey moving."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8",children:usaHandles.map((e,t)=>(0,a.jsxs)("div",{className:"p-7 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-lg font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))})
      ]})
    }),

    // 3. DOCUMENTS GENERALLY REQUIRED
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"DOCUMENTS GENERALLY REQUIRED"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Documents to Prepare for a Dubai to USA Pet Journey"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"The documents shown below are based on the current Global Pet Cab USA destination page. Pet entry requirements can vary depending on the destination, the animal and how the pet travels, so the final checklist should always be confirmed for the specific journey."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:usaDocs.map((e,t)=>(0,a.jsxs)("div",{className:"p-7 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-lg font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))}),
        a.jsx("div",{className:"mt-10 p-6 max-w-4xl mx-auto rounded-2xl bg-amber-50/80 border border-amber-200 text-center",children:
          a.jsx("p",{className:"text-sm text-amber-900 font-medium leading-relaxed font-body",children:"Important: Regulatory and airline requirements can change. Global Pet Cab should verify the latest applicable requirements for the pet, destination and travel method before confirming the final travel checklist."})
        })
      ]})
    }),

    // 4. HUMAN-FIRST SUPPORT SECTION
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80",alt:"USA Pet Relocation Support",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"HUMAN-FIRST SUPPORT"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"The Paperwork Is Important. So Is Knowing What Happens Next."}),
        (0,a.jsxs)("div",{className:"space-y-4 max-w-3xl mx-auto",children:[
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"International pet travel can feel overwhelming because there are several things to keep track of at the same time. You may be thinking about vaccination records, the microchip, the crate, the flight and what happens when your pet lands."}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"Our job is to make that process easier to understand. Tell us where you're travelling from, where in the USA your pet is going and when you hope to travel. We'll look at the route with you and help you understand the next steps before you commit to the journey."})
        ]})
      ]})
    ]}),

    // 5. INTERNATIONAL PET RELOCATION QUOTE FORM
    a.jsx("section",{id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"DUBAI ↔ WORLDWIDE RELOCATION"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Tell Us About Your Pet's Journey"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details. This gives the team the information needed to review your relocation request."})
        ]}),
        (0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto",children:[
          (0,a.jsxs)("div",{className:"lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden",children:[
            (0,a.jsxs)("div",{className:"space-y-3 relative z-10",children:[
              a.jsx("span",{className:"text-xs font-bold font-heading text-teal-bright uppercase tracking-widest",children:"Route Overview"}),
              a.jsx("h3",{className:"text-2xl font-black font-heading tracking-tight",children:"Dubai (DXB) → USA (JFK / LAX / ORD / IAH)"}),
              a.jsx("p",{className:"text-sm text-slate-300 leading-relaxed",children:"Direct and transit pet travel compliance for dogs and cats relocating to major US airport hubs under CDC & USDA entry regulations."})
            ]}),
            (0,a.jsxs)("div",{className:"space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm",children:[
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Direct Flight: ~13 to 16 Hours"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"CDC Rabies & USDA Entry Documentation"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Dedicated USA Move Specialist"})
              ]})
            ]})
          ]}),
          a.jsx("div",{className:"lg:col-span-7",children:
            a.jsx(l.Z,{
              title:"Tell Us About Your Pet's Journey",
              description:"Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details."
            })
          })
        ]})
      ]})
    }),

    // 6. THE JOURNEY
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"THE JOURNEY"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"From Dubai to the USA, One Step at a Time"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"We coordinate every phase from your initial route enquiry to destination arrival."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto",children:usaSteps.map((e,t)=>(0,a.jsxs)("div",{className:"p-6 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-10 h-10 rounded-xl bg-teal-soft border border-teal-border flex items-center justify-center font-heading font-black text-teal-deep text-sm",children:e.s}),
          a.jsx("h3",{className:"text-base font-black font-heading text-navy leading-snug",children:e.t}),
          a.jsx("p",{className:"text-xs sm:text-sm text-slate-600 leading-relaxed font-body",children:e.d})
        ]},t))})
      ]})
    }),

    // 7. FAQS
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center mb-14 space-y-3",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Dubai to USA Pet Relocation Questions, Answered"}),
          a.jsx("p",{className:"text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto",children:"Planning to take your pet from Dubai to the United States? Here are some of the practical questions to think about before you book."})
        ]}),
        a.jsx("div",{className:"space-y-4",children:usaFaqs.map((e,t)=>(0,a.jsxs)("details",{className:"group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30",children:[
          (0,a.jsxs)("summary",{className:"flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none",children:[
            a.jsx("span",{children:e.q}),
            a.jsx("span",{className:"ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep",children:a.jsx(Svg,{p:"m6 9 6 6 6-6",cls:"w-5 h-5"})})
          ]}),
          a.jsx("div",{className:"px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4",children:e.a})
        ]},t))})
      ]})
    }),

    // 8. FINAL CTA
    a.jsx("section",{className:"py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"READY TO PLAN YOUR PET'S MOVE?"}),
        a.jsx("h2",{className:"text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Let's Start With Your Route"}),
        a.jsx("p",{className:"text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed",children:"You don't have to work out every part of an international pet move on your own. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. We'll help you understand what comes next."}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Pet Relocation Quote →",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    })
  ]});
}

function renderDubaiToCanada(){
  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800",children:[
    // 1. HERO / INTRO SECTION
    (0,a.jsxs)("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80",alt:"Dubai to Canada Pet Relocation",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30",children:"DUBAI ↔ CANADA PET RELOCATION"}),
        a.jsx("h1",{className:"text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]",children:"Moving Your Pet Between Dubai & Canada? Let's Plan the Journey."}),
        (0,a.jsxs)("div",{className:"max-w-3xl mx-auto space-y-4",children:[
          a.jsx("p",{className:"text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:"Moving your pet to another country is a big move — and there is a lot to think about before travel day. From understanding the route and preparing your pet to getting the travel details in place, Global Pet Cab helps you organise the journey one step at a time."}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"Whether your pet is leaving Dubai for Canada or coming home to Dubai from Canada, we help you understand what needs to happen next and coordinate the journey around your pet."})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Pet Relocation Quote →",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    ]}),

    // 2. INTERNATIONAL PET RELOCATION QUOTE
    a.jsx("section",{id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"DUBAI ↔ CANADA RELOCATION"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"International Pet Relocation — Request Your Quote"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps."})
        ]}),
        (0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto",children:[
          (0,a.jsxs)("div",{className:"lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden",children:[
            (0,a.jsxs)("div",{className:"space-y-3 relative z-10",children:[
              a.jsx("span",{className:"text-xs font-bold font-heading text-teal-bright uppercase tracking-widest",children:"Route Overview"}),
              a.jsx("h3",{className:"text-2xl font-black font-heading tracking-tight",children:"Dubai (DXB) ↔ Canada (YYZ / YVR / YUL)"}),
              a.jsx("p",{className:"text-sm text-slate-300 leading-relaxed",children:"Relocating pets between Dubai and Canada requires careful alignment between CFIA Canadian entry protocols and UAE MOCCAE clearance."})
            ]}),
            (0,a.jsxs)("div",{className:"space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm",children:[
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Direct Flight: ~14 to 16 Hours"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"CFIA & UAE MOCCAE Compliant"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Dedicated Route Move Coordinator"})
              ]})
            ]})
          ]}),
          a.jsx("div",{className:"lg:col-span-7",children:
            a.jsx(l.Z,{
              title:"International Pet Relocation — Request Your Quote",
              description:"Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps."
            })
          })
        ]})
      ]})
    }),

    // 3. CANADA ROUTE INTRODUCTION BANNER
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80",alt:"Canada Pet Relocation Route",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"YOUR PET'S JOURNEY TO CANADA"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"More Than Just Getting From Dubai to Canada"}),
        (0,a.jsxs)("div",{className:"space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed",children:[
          a.jsx("p",{children:"A pet relocation involves more than getting your pet onto a flight."}),
          a.jsx("p",{children:"There is preparation before departure, travel arrangements to organise and documents that need to be in place. The details can also change depending on your pet, your route and the direction you are travelling."}),
          a.jsx("p",{children:"That's why we start by understanding your pet, your journey and your timeline — then help you work through the practical steps."}),
          a.jsx("p",{className:"text-teal-light font-medium",children:"Whether you're relocating for work, moving back home or starting a new chapter in Canada, your pet deserves to be part of the plan."})
        ]})
      ]})
    ]}),

    // 4. WHAT WE HELP YOU COORDINATE (PROCESS WITH STEPS)
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"HOW WE SUPPORT YOUR MOVE"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"One Journey. Many Moving Parts. One Team to Help Coordinate Them."}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"We support your pet relocation step by step across both Dubai and Canadian jurisdictions."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:canadaCoordinateSteps.map((e,t)=>(0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start",children:[
          (0,a.jsxs)("div",{className:"flex items-center justify-between",children:[
            a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
            a.jsx("span",{className:"text-xs font-black font-heading text-teal-deep bg-white px-3 py-1 rounded-full border border-teal-border",children:e.s})
          ]}),
          a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:e.t}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.d})
        ]},t))})
      ]})
    }),

    // 5. LOCAL SUPPORT BEFORE THE BIG MOVE BANNER
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=2000&q=80",alt:"Local Pet Care Support",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"BEFORE TRAVEL DAY"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Need Help Getting Your Pet Ready?"}),
        (0,a.jsxs)("div",{className:"space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed",children:[
          a.jsx("p",{children:"Sometimes the international journey isn't the only thing on your plate."}),
          a.jsx("p",{children:"If your pet needs to visit a veterinarian, groomer or other pet-care appointment before travelling and you can't make it yourself, local pet transport support can help. Depending on the service arranged, our team can assist with getting your pet where they need to go."}),
          a.jsx("p",{className:"text-teal-light font-medium",children:"Because sometimes getting ready to travel is a journey of its own."})
        ]}),
        a.jsx("div",{className:"pt-2",children:
          (0,a.jsxs)("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base",children:[
            "Explore Dubai Pet Taxi",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-5 h-5"})
          ]})
        })
      ]})
    ]}),

    // 6. DUBAI → CANADA / CANADA → DUBAI COMPARISON
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"KNOW WHICH WAY YOUR PET IS TRAVELLING"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"From Dubai to Canada? Or Canada to Dubai?"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Pet import and export regulations differ significantly between departure and arrival countries."})
        ]}),
        (0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto",children:[
          (0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4",children:[
            a.jsx("div",{className:"inline-flex items-center gap-2 text-xs font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-3 py-1.5 rounded-full border border-teal-border",children:"EXPORT JOURNEY"}),
            a.jsx("h3",{className:"text-2xl font-black font-heading text-navy",children:"Moving FROM Dubai / UAE to Canada"}),
            a.jsx("p",{className:"text-sm sm:text-base text-slate-600 leading-relaxed font-body",children:"Your pet is leaving the UAE, so this is an export from the UAE and an import into Canada. The journey needs to be planned around the requirements on both sides."}),
            (0,a.jsxs)("ul",{className:"space-y-2 pt-2 text-sm text-slate-700 font-medium font-body",children:[
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-teal-deep shrink-0"}),
                a.jsx("span",{children:"UAE MOCCAE Export Health Certificate"})
              ]}),
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-teal-deep shrink-0"}),
                a.jsx("span",{children:"Canadian Food Inspection Agency (CFIA) Compliance"})
              ]}),
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-teal-deep shrink-0"}),
                a.jsx("span",{children:"ISO 11784/11785 Microchip & Rabies Vaccination"})
              ]})
            ]})
          ]}),
          (0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4",children:[
            a.jsx("div",{className:"inline-flex items-center gap-2 text-xs font-black font-heading text-coral uppercase tracking-widest bg-coral/10 px-3 py-1.5 rounded-full border border-coral/20",children:"IMPORT JOURNEY"}),
            a.jsx("h3",{className:"text-2xl font-black font-heading text-navy",children:"Moving INTO Dubai / UAE from Canada"}),
            a.jsx("p",{className:"text-sm sm:text-base text-slate-600 leading-relaxed font-body",children:"Your pet is entering the UAE, so this is an import into Dubai/UAE. The preparation and documentation will be based on the applicable UAE entry requirements and your pet's travel circumstances."}),
            (0,a.jsxs)("ul",{className:"space-y-2 pt-2 text-sm text-slate-700 font-medium font-body",children:[
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-coral shrink-0"}),
                a.jsx("span",{children:"UAE MOCCAE Official Import Permit"})
              ]}),
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-coral shrink-0"}),
                a.jsx("span",{children:"CFIA Endorsed Veterinary Health Certificate"})
              ]}),
              (0,a.jsxs)("li",{className:"flex items-center gap-2",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-4 h-4 text-coral shrink-0"}),
                a.jsx("span",{children:"Rabies Neutralizing Antibody Titer Test (RNATT)"})
              ]})
            ]})
          ]})
        ]}),
        a.jsx("div",{className:"mt-12 text-center max-w-2xl mx-auto",children:
          a.jsx("p",{className:"text-sm sm:text-base font-bold text-navy bg-white py-4 px-6 rounded-2xl border border-teal-border shadow-2xs",children:"Not sure which requirements apply to your pet? Start with your route and travel date, and we'll help you understand what needs to be planned."})
        })
      ]})
    }),

    // 7. WHY PET PARENTS CHOOSE GLOBAL PET CAB (ICON BOXES)
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"WHY GLOBAL PET CAB"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Because Your Pet Isn't Just Another Piece of Luggage."}),
          (0,a.jsxs)("div",{className:"space-y-3 font-body text-base sm:text-lg text-slate-600 leading-relaxed",children:[
            a.jsx("p",{children:"International relocation can feel complicated when you're trying to figure everything out yourself."}),
            a.jsx("p",{children:"Our job is to make the journey easier to understand — from the first conversation about your route to the practical details that need to be arranged before your pet travels."})
          ]})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:canadaWhyUs.map((e,t)=>(0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-slate-50 border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))})
      ]})
    }),

    // 8. TRUST SECTION BANNER
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80",alt:"Happy Pets Travelling",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"FAMILY-FIRST CARE"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Your Pet's Journey Deserves More Than a Booking Confirmation."}),
        (0,a.jsxs)("div",{className:"space-y-3 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed",children:[
          a.jsx("p",{children:"We know you're not simply sending a pet from one airport to another."}),
          a.jsx("p",{className:"font-extrabold text-teal-light text-xl",children:"You're sending a family member."}),
          a.jsx("p",{children:"That's why the focus is on planning the journey properly, communicating clearly and making sure the practical details are considered before travel day."})
        ]}),
        (0,a.jsxs)("div",{className:"pt-6 border-t border-white/15 max-w-3xl mx-auto",children:[
          a.jsx("p",{className:"text-xs uppercase tracking-widest text-slate-300 font-bold mb-4",children:"Trust Badges — Verify Before Publishing"}),
          (0,a.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-3 sm:gap-4",children:[
            a.jsx("span",{className:"px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white",children:"IPATA Member"}),
            a.jsx("span",{className:"px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white",children:"IATA-Compliant Handling"}),
            a.jsx("span",{className:"px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white",children:"45+ Countries"}),
            a.jsx("span",{className:"px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white",children:"2,000+ Pets Transported"})
          ]})
        ]})
      ]})
    ]}),

    // 9. FAQ SECTION
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center mb-14 space-y-3",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Dubai ↔ Canada Pet Relocation FAQs"}),
          a.jsx("p",{className:"text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto",children:"Planning to move your pet between Dubai and Canada? Here are answers to commonly asked questions."})
        ]}),
        a.jsx("div",{className:"space-y-4",children:canadaFaqs.map((e,t)=>(0,a.jsxs)("details",{className:"group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30",children:[
          (0,a.jsxs)("summary",{className:"flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none",children:[
            a.jsx("span",{children:e.q}),
            a.jsx("span",{className:"ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep",children:a.jsx(Svg,{p:"m6 9 6 6 6-6",cls:"w-5 h-5"})})
          ]}),
          a.jsx("div",{className:"px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4",children:e.a})
        ]},t))})
      ]})
    }),

    // 10. FINAL CTA
    a.jsx("section",{className:"py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"READY TO PLAN YOUR PET'S MOVE?"}),
        a.jsx("h2",{className:"text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Let's Figure Out the Journey Together."}),
        (0,a.jsxs)("div",{className:"space-y-2 max-w-2xl mx-auto font-body text-base sm:text-xl text-slate-200 leading-relaxed",children:[
          a.jsx("p",{children:"Tell us where your pet is travelling from, where they're going and roughly when you want to travel."}),
          a.jsx("p",{children:"We'll start with the route, understand your pet's needs and help you work out what comes next."})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Canada Relocation Quote →",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp the Relocation Team"
          ]})
        ]})
      ]})
    })
  ]});
}

function renderDefault(t){
  return (0,a.jsxs)("div",{className:"font-body space-y-0 text-slate-800",children:[
    // 1. HERO SECTION
    (0,a.jsxs)("section",{className:"relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80",alt:"International Pet Relocation",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-75"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to right, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.80), rgba(7, 23, 40, 0.55))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        (0,a.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-3",children:[
          (0,a.jsxs)("span",{className:"inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30",children:[
            a.jsx(Svg,{p:"m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",cls:"w-3.5 h-3.5"}),
            "INTERNATIONAL PET RELOCATION"
          ]}),
          t.route&&(0,a.jsxs)("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 text-slate-200 border border-white/15",children:[
            a.jsx(Svg,{p:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",cls:"w-3.5 h-3.5 text-teal-bright"}),
            t.route
          ]})
        ]}),
        a.jsx("h1",{className:"text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]",children:"International Pet Relocation, Wherever Your Pet Is Going"}),
        (0,a.jsxs)("div",{className:"max-w-3xl mx-auto space-y-3",children:[
          a.jsx("p",{className:"text-base sm:text-xl text-slate-200 leading-relaxed font-body",children:"Moving a pet to another country is a big move for the whole family. There are flights to plan, veterinary requirements to understand, documents to prepare and a lot of small details that need to come together at the right time."}),
          a.jsx("p",{className:"text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto",children:"Global Pet Cab helps you plan and coordinate your pet's international journey, from the first route discussion and travel preparation to airport arrangements and arrival support."})
        ]}),
        (0,a.jsxs)("div",{className:"pt-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-teal-light",children:[
          a.jsx("span",{children:"International Pet Relocation"}),
          a.jsx("span",{className:"text-white/40",children:"|"}),
          a.jsx("span",{children:"Route-Specific Planning"}),
          a.jsx("span",{className:"text-white/40",children:"|"}),
          a.jsx("span",{children:"Pet Transport Support"})
        ]}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Relocation Quote",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]}),
        a.jsx("p",{className:"text-xs text-slate-300 pt-1",children:"Optional trust badge: IPATA Member — verified international pet transport handling."})
      ]})
    ]}),

    // 2. SCOPE OF SUPPORT
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"HOW WE HELP"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"What We Help You Plan, Prepare and Coordinate"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"An international move is not just a flight booking. It is a multi-stage process with veterinary, documentation and travel requirements that depend on where your pet is going."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:defaultScope.map((e,t)=>(0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))})
      ]})
    }),

    // 3. ROUTE EXPLANATION
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-14 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"ROUTE-FIRST APPROACH"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Every Route Has Its Own Rules"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"The requirements for international pet travel depend heavily on the country your pet is leaving and the country they are entering. Some destinations require blood tests months in advance, while others have strict quarantine or entry document rules."})
        ]}),
        (0,a.jsxs)("div",{className:"p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-2xs space-y-6",children:[
          a.jsx("p",{className:"text-base sm:text-lg text-navy font-bold",children:"Before we do anything else, we start with:"}),
          (0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[
            (0,a.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 border border-teal-border/60 text-center space-y-1",children:[
              a.jsx("span",{className:"text-xs font-bold text-teal-deep uppercase tracking-wider block",children:"1. Origin"}),
              a.jsx("p",{className:"text-sm font-bold text-navy",children:"Where is your pet starting?"})
            ]}),
            (0,a.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 border border-teal-border/60 text-center space-y-1",children:[
              a.jsx("span",{className:"text-xs font-bold text-teal-deep uppercase tracking-wider block",children:"2. Destination"}),
              a.jsx("p",{className:"text-sm font-bold text-navy",children:"Where are they travelling to?"})
            ]}),
            (0,a.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 border border-teal-border/60 text-center space-y-1",children:[
              a.jsx("span",{className:"text-xs font-bold text-teal-deep uppercase tracking-wider block",children:"3. Pet Profile"}),
              a.jsx("p",{className:"text-sm font-bold text-navy",children:"Dog or cat, breed, size and age"})
            ]}),
            (0,a.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 border border-teal-border/60 text-center space-y-1",children:[
              a.jsx("span",{className:"text-xs font-bold text-teal-deep uppercase tracking-wider block",children:"4. Timeline"}),
              a.jsx("p",{className:"text-sm font-bold text-navy",children:"When do you hope to travel?"})
            ]})
          ]}),
          a.jsx("p",{className:"text-sm text-slate-500 text-center font-body pt-2",children:"Once we know the route, we can outline the specific steps, timing and documents your pet will need."})
        ]})
      ]})
    }),

    // 4. QUOTE FORM
    a.jsx("section",{id:"international-quote-form",className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"REQUEST A QUOTE"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Tell Us About Your Pet's Journey"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Share a few details about your move, and our team will review the route, the travel requirements and the best options for your pet."})
        ]}),
        (0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto",children:[
          (0,a.jsxs)("div",{className:"lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden",children:[
            (0,a.jsxs)("div",{className:"space-y-3 relative z-10",children:[
              a.jsx("span",{className:"text-xs font-bold font-heading text-teal-bright uppercase tracking-widest",children:"Route Overview"}),
              a.jsx("h3",{className:"text-2xl font-black font-heading tracking-tight",children:t.route||"Dubai ↔ International Destinations"}),
              a.jsx("p",{className:"text-sm text-slate-300 leading-relaxed",children:t.overview})
            ]}),
            (0,a.jsxs)("div",{className:"space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm",children:[
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:"M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:t.flightTimeApprox||"Direct & Transit Flight Options"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","m9 12 2 2 4-4"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"IATA-Compliant Crates & Full Handling"})
              ]}),
              (0,a.jsxs)("div",{className:"flex items-center gap-3 text-slate-200",children:[
                a.jsx(Svg,{p:["m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z","M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"],cls:"w-5 h-5 text-teal-bright shrink-0"}),
                a.jsx("span",{children:"Dedicated Relocation Coordinator"})
              ]})
            ]})
          ]}),
          a.jsx("div",{className:"lg:col-span-7",children:a.jsx(l.Z,{})})
        ]})
      ]})
    }),

    // 5. PROCESS STEPS
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"HOW IT WORKS"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"How We Move Your Pet Safely Across Borders"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"A clear, structured process so you always know what has been done and what happens next."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:defaultSteps.map((e,t)=>(0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center font-heading font-black text-teal-deep text-lg",children:e.s}),
          a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:e.t}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.d})
        ]},t))})
      ]})
    }),

    // 6. LOCAL SUPPORT BANNER
    (0,a.jsxs)("section",{className:"relative py-20 sm:py-24 overflow-hidden text-white",children:[
      (0,a.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
        a.jsx("img",{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80",alt:"Pet Care in Dubai",className:"w-full h-full object-cover object-center"}),
        a.jsx("div",{className:"absolute inset-0 bg-navy opacity-90"}),
        a.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))"}})
      ]}),
      (0,a.jsxs)("div",{className:"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"LOCAL MOBILITY SUPPORT"}),
        a.jsx("h2",{className:"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Need Help Getting Your Pet Ready in Dubai?"}),
        (0,a.jsxs)("div",{className:"space-y-4 max-w-3xl mx-auto",children:[
          a.jsx("p",{className:"text-base sm:text-lg text-slate-200 leading-relaxed font-body",children:"Sometimes the international journey starts days or weeks before the airport. If you are not available, selected local pet transportation services can help your pet get to grooming or health-related appointments before travel, subject to the service arrangement."}),
          a.jsx("p",{className:"text-sm sm:text-base text-slate-300 leading-relaxed font-body",children:"For Dubai-based customers, we can also connect the local part of the journey with airport transportation, helping your pet get from home or another agreed location to the airport."})
        ]}),
        a.jsx("div",{className:"pt-2",children:
          (0,a.jsxs)("a",{href:"/dubai-pet-taxi",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base",children:[
            "Explore Dubai Pet Taxi",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-5 h-5"})
          ]})
        })
      ]})
    ]}),

    // 7. WORLDWIDE DESTINATIONS
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-14 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"DUBAI ↔ WORLDWIDE"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"From Dubai to the World, and Back Again"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"Whether you are moving home, relocating for work, returning to your home country or bringing your pet to join you in Dubai, the journey starts with understanding your route."}),
          a.jsx("p",{className:"text-sm font-bold text-navy pt-2",children:"Explore our destination guides for route-specific information and requirements:"})
        ]}),
        a.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto",children:destinations.map((e,t)=>(0,a.jsxs)("a",{href:e.href,className:"p-5 rounded-2xl border border-teal-border bg-slate-50 hover:bg-teal-deep hover:text-white text-navy font-extrabold font-heading text-sm text-center transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-center min-h-[72px]",children:[
          a.jsx("span",{children:e.name})
        ]},t))}),
        a.jsx("p",{className:"text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto italic",children:"Each destination page carries the country-specific requirements, documents and route details. The worldwide overview remains broad, useful and conversion-focused."})
      ]})
    }),

    // 8. WHY CHOOSE US
    a.jsx("section",{className:"py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center max-w-3xl mx-auto mb-16 space-y-4",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs",children:"WHY PET PARENTS CHOOSE US"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Professional Support, With Your Pet at the Centre"}),
          a.jsx("p",{className:"text-base sm:text-lg text-slate-600 leading-relaxed font-body",children:"There is a lot to think about when your pet is crossing borders. We want the process to feel clear, organised and personal — not like you are trying to piece together a complicated journey on your own."})
        ]}),
        a.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto",children:whyUs.map((e,t)=>(0,a.jsxs)("div",{className:"p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start",children:[
          a.jsx("div",{className:"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep",children:a.jsx(Svg,{p:e.p,cls:"w-6 h-6"})}),
          a.jsx("h3",{className:"text-xl font-black font-heading text-navy",children:e.title}),
          a.jsx("p",{className:"text-sm text-slate-600 leading-relaxed font-body",children:e.desc})
        ]},t))})
      ]})
    }),

    // 9. FAQS ACCORDION
    a.jsx("section",{className:"py-20 sm:py-24 bg-white border-t border-teal-border/40",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[
        (0,a.jsxs)("div",{className:"text-center mb-14 space-y-3",children:[
          a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
          a.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"International Pet Relocation Questions, Answered"}),
          a.jsx("p",{className:"text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto",children:"Every international move has its own requirements. These answers give you a starting point before you request a route-specific quote."})
        ]}),
        a.jsx("div",{className:"space-y-4",children:defaultFaqs.map((e,t)=>(0,a.jsxs)("details",{className:"group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30",children:[
          (0,a.jsxs)("summary",{className:"flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none",children:[
            a.jsx("span",{children:e.q}),
            a.jsx("span",{className:"ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep",children:a.jsx(Svg,{p:"m6 9 6 6 6-6",cls:"w-5 h-5"})})
          ]}),
          a.jsx("div",{className:"px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4",children:e.a})
        ]},t))})
      ]})
    }),

    // 10. FINAL CTA
    a.jsx("section",{className:"py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center",children:
      (0,a.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",children:[
        a.jsx("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15",children:"PLANNING A MOVE?"}),
        a.jsx("h2",{className:"text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight",children:"Your Pet's Next Journey Starts With a Conversation"}),
        a.jsx("p",{className:"text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed",children:"Tell us where your pet is coming from, where they are going and when you hope to travel. We'll help you understand the journey ahead and the next steps to get started."}),
        (0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-4",children:[
          (0,a.jsxs)("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto",children:[
            "Get a Free Relocation Quote",
            a.jsx(Svg,{p:["M5 12h14","m12 5 7 7-7 7"],cls:"w-4 h-4"})
          ]}),
          (0,a.jsxs)("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto",children:[
            a.jsx(Svg,{p:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",cls:"w-4 h-4"}),
            "WhatsApp Us"
          ]})
        ]})
      ]})
    })
  ]});
}

function u({params:e}){
  if(e.slug==="dubai-to-canada"){
    return renderDubaiToCanada();
  }
  if(e.slug==="dubai-to-usa"){
    return renderDubaiToUsa();
  }
  if(e.slug==="dubai-to-uk"){
    return renderDubaiToUk();
  }
  let t=d[e.slug]||d["dubai-to-india"];
  return renderDefault(t);
}`;

// Replace module 5301 in destinationPageJs
const regex5301 = /5301:\(e,t,i\)=>\{"use strict";i\.r\(t\),i\.d\(t,\{default:\(\)=>u,generateMetadata:\(\)=>c\}\);[\s\S]*?module\.exports=a\}\)\(\);/;

if (!regex5301.test(code)) {
  console.error('Could not match module 5301 in destinationPageJs!');
  process.exit(1);
}

const newPageJs = code.replace(
  regex5301,
  `${module5301Code}}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[276,342,322,98,916],()=>i(9526));module.exports=a})();`
);

fs.writeFileSync(destinationPageJs, newPageJs);
console.log('Successfully updated .next/server/app/destinations/[slug]/page.js for Canada, USA, UK, and India!');
