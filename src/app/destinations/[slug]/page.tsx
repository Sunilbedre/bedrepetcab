import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Plane, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Car,
  Box,
  HeartHandshake,
  Compass,
  Sparkles,
  Award,
  Clock,
  MapPin,
  Check,
  ChevronDown
} from 'lucide-react';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';
import RelocationFAQAccordion from '@/components/RelocationFAQAccordion';

interface DestinationInfo {
  slug: string;
  title: string;
  route: string;
  origin: string;
  destination: string;
  overview: string;
  documentsNeeded: string[];
  flightTimeApprox: string;
}

const DESTINATION_DATA: Record<string, DestinationInfo> = {
  'dubai-to-india': {
    slug: 'dubai-to-india',
    title: 'Pet Relocation from Dubai to India',
    route: 'Dubai (DXB) → India (DEL / BOM / BLR)',
    origin: 'Dubai, UAE',
    destination: 'India',
    overview: 'Relocating your dog or cat from Dubai to India requires careful coordination with Indian AQCS (Animal Quarantine and Certification Services), DGFT NOC permits, and UAE MOCCAE export clearance.',
    documentsNeeded: [
      'ISO 11784/11785 Microchip Certificate',
      'UAE MOCCAE Export Health Certificate',
      'India AQCS No Objection Certificate (NOC)',
      'Valid Rabies & Core Vaccination Records (30+ days prior)',
      'Owner Passport & Indian Visa/OCI Copy',
    ],
    flightTimeApprox: '3 to 4.5 Hours Direct Flight',
  },
  'india-to-dubai': {
    slug: 'india-to-dubai',
    title: 'Pet Relocation from India to Dubai',
    route: 'India (BOM / DEL) → Dubai (DXB)',
    origin: 'India',
    destination: 'Dubai, UAE',
    overview: 'Importing a pet into Dubai from India requires a mandatory Rabies Neutralizing Antibody Titer Test (RNATT) from an approved lab, a UAE MOCCAE Import Permit, and Indian Govt Export Certification.',
    documentsNeeded: [
      'Approved ISO 15-digit Microchip',
      'Rabies Titer Test (RNATT) with >= 0.5 IU/ml titer level',
      'UAE Ministry (MOCCAE) Import Permit',
      'Indian Animal Quarantine (AQCS) Export Health Certificate',
      'UAE Resident Visa Copy of Owner',
    ],
    flightTimeApprox: '3 to 4.5 Hours Direct Flight',
  },
  'dubai-to-uk': {
    slug: 'dubai-to-uk',
    title: 'Pet Relocation from Dubai to United Kingdom',
    route: 'Dubai (DXB) → London (LHR) / Manchester (MAN)',
    origin: 'Dubai, UAE',
    destination: 'United Kingdom',
    overview: 'Pets entering the UK from the UAE must travel as Manifested Cargo in compliance with DEFRA regulations via approved Heathrow or Manchester HARC inspection facilities.',
    documentsNeeded: [
      'DEFRA GB Pet Health Certificate',
      'Microchip implanted prior to Rabies Vaccination',
      'Valid Rabies Vaccination (minimum 21 days old)',
      'Tapeworm (Echinococcus multilocularis) treatment given by vet 24-120 hrs before arrival',
      'Air Waybill (AWB) Manifest Cargo Booking',
    ],
    flightTimeApprox: '7.5 Hours Direct Flight',
  },
  'uk-to-dubai': {
    slug: 'uk-to-dubai',
    title: 'Pet Relocation from United Kingdom to Dubai',
    route: 'London (LHR) → Dubai (DXB)',
    origin: 'United Kingdom',
    destination: 'Dubai, UAE',
    overview: 'Moving your pet back to Dubai from the UK requires securing an official UAE MOCCAE Import Permit and an official UK DEFRA Export Health Certificate.',
    documentsNeeded: [
      'ISO Microchip',
      'UAE MOCCAE Import Permit',
      'UK Official Vet Health Certificate (DEFRA signed)',
      'Rabies Titer Test (if applicable)',
      'Owner UAE Residence Entry Permit / Visa',
    ],
    flightTimeApprox: '7 Hours Direct Flight',
  },
  'dubai-to-usa': {
    slug: 'dubai-to-usa',
    title: 'Pet Relocation from Dubai to United States',
    route: 'Dubai (DXB) → USA (JFK / LAX / ORD / IAH)',
    origin: 'Dubai, UAE',
    destination: 'United States of America',
    overview: 'Relocating pets to the US requires compliance with CDC rabies regulations and USDA entry documentation depending on whether the pet travels as excess baggage or manifest cargo.',
    documentsNeeded: [
      'CDC Rabies Vaccination & Microchip Record',
      'UAE MOCCAE Export Health Certificate',
      'ISO 11784/11785 Microchip',
      'Airline Cargo Booking Confirmation',
    ],
    flightTimeApprox: '13 to 16 Hours Direct Flight',
  },
  'usa-to-dubai': {
    slug: 'usa-to-dubai',
    title: 'Pet Relocation from USA to Dubai',
    route: 'USA → Dubai (DXB)',
    origin: 'United States',
    destination: 'Dubai, UAE',
    overview: 'Importing pets into Dubai from the US requires USDA endorsement of the health certificate and a valid UAE MOCCAE import permit.',
    documentsNeeded: [
      'USDA Endorsed Veterinary Health Certificate',
      'UAE MOCCAE Import Permit',
      'Rabies Titer Blood Test (RNATT)',
      'Valid Microchip & Vaccination Passport',
    ],
    flightTimeApprox: '13 to 15 Hours Direct Flight',
  },
  'dubai-to-canada': {
    slug: 'dubai-to-canada',
    title: 'Pet Relocation from Dubai to Canada',
    route: 'Dubai (DXB) → Toronto (YYZ) / Vancouver (YVR)',
    origin: 'Dubai, UAE',
    destination: 'Canada',
    overview: 'Moving pets from Dubai to Canada requires Canadian Food Inspection Agency (CFIA) rabies compliance, microchip verification, and UAE MOCCAE export clearance.',
    documentsNeeded: [
      'ISO 11784/11785 Microchip Certificate',
      'UAE MOCCAE Export Health Certificate',
      'Valid Rabies Vaccination Record (at least 30 days prior)',
      'Veterinary Certificate of Health',
      'Owner Passport Copy & Flight Itinerary',
    ],
    flightTimeApprox: '14 to 16 Hours Direct Flight',
  },
  'dubai-to-australia': {
    slug: 'dubai-to-australia',
    title: 'Pet Relocation from Dubai to Australia',
    route: 'Dubai (DXB) → Melbourne (MEL) / Sydney (SYD)',
    origin: 'Dubai, UAE',
    destination: 'Australia',
    overview: 'Australia enforces strict biosecurity protocols via DAFF. Relocating pets requires RNATT blood testing, import permits, and mandatory Mickleham quarantine booking.',
    documentsNeeded: [
      'ISO 15-digit Microchip Certificate',
      'Rabies Neutralizing Antibody Titer Test (RNATT)',
      'Australia DAFF Import Permit',
      'Mickleham Post-Entry Quarantine Reservation',
      'Official UAE MOCCAE Endorsed Veterinary Certificate',
    ],
    flightTimeApprox: '13 to 14.5 Hours Direct Flight',
  },
};

// Section 3: More Than Getting Your Pet on a Flight (6 Icon Boxes)
const SCOPE_ITEMS = [
  {
    icon: Compass,
    title: 'Route & Travel Planning',
    desc: 'We look at your origin, destination and travel plans to understand the practical requirements of the journey.',
  },
  {
    icon: HeartHandshake,
    title: 'Veterinary Preparation',
    desc: 'Support around the veterinary checks, vaccinations, tests and health documents required for your route, where applicable.',
  },
  {
    icon: Box,
    title: 'Travel Crate Preparation',
    desc: "Guidance on the right travel crate and preparation for your pet's journey, based on airline and route requirements.",
  },
  {
    icon: FileText,
    title: 'Export & Import Support',
    desc: 'Help with the relevant export or import documentation and country-specific requirements for the journey.',
  },
  {
    icon: Plane,
    title: 'Airline & Airport Coordination',
    desc: 'Support with airline arrangements and the airport logistics involved in getting your pet ready to travel.',
  },
  {
    icon: ShieldCheck,
    title: 'Arrival & Handover',
    desc: 'Support with the arrival process and agreed handover arrangements so the journey continues smoothly after landing.',
  },
];

// Section 5: Process Steps (6 Steps)
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Route',
    desc: 'We start with where your pet is travelling from, where they are going and when you are planning to travel.',
  },
  {
    step: '02',
    title: 'Build the Travel Plan',
    desc: 'We identify the key veterinary, documentation, crate, airline and travel requirements that apply to your route.',
  },
  {
    step: '03',
    title: 'Prepare Your Pet',
    desc: 'We help you understand and coordinate the preparation your pet needs before departure.',
  },
  {
    step: '04',
    title: 'Get the Paperwork in Order',
    desc: 'We support the relevant export, import and travel documentation required for the journey.',
  },
  {
    step: '05',
    title: 'Coordinate the Travel',
    desc: "We help bring together the flight and airport arrangements selected for your pet's relocation.",
  },
  {
    step: '06',
    title: 'Get Them Where They Need to Be',
    desc: 'We support the agreed arrival and handover process so your pet can continue safely to their new destination.',
  },
];

// Section 7: Popular Worldwide Routes
const WORLDWIDE_DESTINATIONS = [
  { label: 'Dubai ↔ India', link: '/destinations/dubai-to-india' },
  { label: 'Dubai ↔ UK', link: '/destinations/dubai-to-uk' },
  { label: 'Dubai ↔ USA', link: '/destinations/dubai-to-usa' },
  { label: 'Dubai ↔ Canada', link: '/destinations/dubai-to-canada' },
  { label: 'Dubai ↔ Australia', link: '/destinations/dubai-to-australia' },
  { label: 'Other international destinations', link: '#international-quote-form' },
];

// Section 8: Why Choose Us (5 items)
const WHY_CHOOSE_US_ITEMS = [
  {
    icon: Compass,
    title: 'A Route-First Approach',
    desc: 'We start with your actual journey rather than giving every customer the same checklist.',
  },
  {
    icon: HeartHandshake,
    title: 'Support Across the Journey',
    desc: 'From preparation and local transport to airport coordination and arrival support, the service can connect the different stages of the move.',
  },
  {
    icon: Sparkles,
    title: 'Clear Communication',
    desc: 'You should know what is happening next, what information is needed and which parts of the journey require your attention.',
  },
  {
    icon: Car,
    title: 'Local + International Mobility',
    desc: 'International relocation can connect naturally with local pet taxi, airport and appointment transportation.',
  },
  {
    icon: Award,
    title: 'Professional Industry Recognition',
    desc: 'If confirmed, IPATA membership can be highlighted here alongside other verified credentials and handling standards.',
  },
];

// UK-Specific Data
const UK_HANDLES = [
  {
    title: 'Route & Airline Planning',
    desc: 'Plan the journey around the available route, travel requirements and appropriate airline options.',
    icon: Plane,
  },
  {
    title: 'UAE Export Permit Support',
    desc: 'Support the export permit process and coordination with the relevant ministry requirements.',
    icon: ShieldCheck,
  },
  {
    title: 'UK Import Requirements',
    desc: 'Help you prepare for the requirements that apply when your pet enters the United Kingdom.',
    icon: Globe,
  },
  {
    title: 'Veterinary Preparation',
    desc: 'Coordinate the veterinary checks, health documentation and travel requirements needed for the journey.',
    icon: HeartHandshake,
  },
  {
    title: 'IATA-Compliant Travel Crate',
    desc: 'Help arrange the appropriate travel crate, including sizing, preparation and travel setup.',
    icon: Box,
  },
  {
    title: 'Airport Ground Handling',
    desc: 'Coordinate the relevant ground-handling arrangements at departure and destination airports.',
    icon: Clock,
  },
  {
    title: 'Customs & Arrival Coordination',
    desc: 'Support the arrival process and customs-related coordination at the destination.',
    icon: CheckCircle2,
  },
  {
    title: 'Doorstep Pickup & Delivery',
    desc: 'Connect the international journey with local pet transportation, where the selected service includes pickup or delivery.',
    icon: Car,
  },
];

const UK_DOCS = [
  {
    title: 'DEFRA GB Pet Health Certificate',
    desc: 'Health certification required for the UK journey, subject to the applicable travel route and rules.',
    icon: FileText,
  },
  {
    title: 'Microchip Before Rabies Vaccination',
    desc: 'The microchip must be in place before the rabies vaccination, as reflected in the current route requirements.',
    icon: ShieldCheck,
  },
  {
    title: 'Valid Rabies Vaccination',
    desc: 'The current page specifies a minimum of 21 days before travel.',
    icon: HeartHandshake,
  },
  {
    title: 'Tapeworm Treatment',
    desc: 'The current page specifies treatment for Echinococcus multilocularis within 24–120 hours before arrival.',
    icon: Award,
  },
  {
    title: 'Air Waybill (AWB) / Manifest Cargo Booking',
    desc: 'The current route information specifies air waybill and manifest cargo booking for the journey.',
    icon: Plane,
  },
];

const UK_STEPS = [
  {
    step: '01',
    title: '01 — Start With Your Route',
    desc: 'Tell us where in Dubai your pet is travelling from, where in the UK they are going and your tentative travel date.',
  },
  {
    step: '02',
    title: '02 — Understand the Requirements',
    desc: 'We review the route and help identify the veterinary, documentation and travel requirements that apply.',
  },
  {
    step: '03',
    title: '03 — Prepare for Travel',
    desc: 'We help coordinate the required preparation, travel crate and airline arrangements.',
  },
  {
    step: '04',
    title: '04 — Get Your Pet Moving',
    desc: 'The journey is coordinated from departure arrangements through the relevant airport and travel stages.',
  },
  {
    step: '05',
    title: '05 — Arrival & Handover',
    desc: 'We support the agreed destination-side arrangements so you know what happens after your pet lands.',
  },
];

const UK_FAQS = [
  {
    q: 'What is involved in relocating a pet from Dubai to the UK?',
    a: 'The journey can involve route planning, veterinary preparation, UK entry requirements, travel crate arrangements, airline coordination, export documentation and destination-side arrival arrangements.',
  },
  {
    q: 'How early should I start planning my pet\'s move to the UK?',
    a: 'Start as early as possible. Some veterinary and travel requirements have specific timing windows, so the exact lead time depends on your pet, route and travel date.',
  },
  {
    q: 'Does my pet need a microchip before the rabies vaccination?',
    a: 'The current UK route information on the Global Pet Cab page specifies that the microchip should be implanted before the rabies vaccination.',
  },
  {
    q: 'How long before travel must the rabies vaccination be valid?',
    a: 'The current route information specifies a minimum of 21 days before travel. The team should verify the current requirement for your specific journey before departure.',
  },
  {
    q: 'Is tapeworm treatment required for the UK?',
    a: 'The current UK route information specifies treatment for Echinococcus multilocular is within 24–120 hours before arrival.',
  },
  {
    q: 'Will my pet need a health certificate?',
    a: 'The current route page lists a DEFRA GB Pet Health Certificate. The exact documentation should be checked against the latest requirements for your route.',
  },
  {
    q: 'Do I need an IATA-compliant travel crate?',
    a: 'The current Global Pet Cab service information includes IATA-compliant travel crate assembly and preparation as part of the relocation support.',
  },
  {
    q: 'Can you arrange airport pickup or delivery?',
    a: 'Doorstep pickup and delivery can be part of the selected relocation service. The exact pickup and destination arrangements should be confirmed when requesting the quote.',
  },
  {
    q: 'Can you help if I am not available for my pet\'s grooming or health appointment before travel?',
    a: 'Selected local pet transportation and appointment support may be available when the pet parent cannot be there, subject to the service arrangement.',
  },
  {
    q: 'How do I get a quote for pet relocation from Dubai to the UK?',
    a: 'Use the relocation quote form and share your route, tentative travel date and pet details. The team can then review your requirements and prepare the next steps.',
  },
];

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = DESTINATION_DATA[params.slug];
  if (!data) return { title: 'International Pet Relocation — Global Pet Cab Dubai' };
  return {
    title: `${data.title} — Global Pet Cab Dubai`,
    description: data.overview,
  };
}


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

export default function DestinationPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'dubai-to-canada') {
    return (
      <div className="font-body space-y-0 text-slate-800">
        {/* 1. HERO / INTRO SECTION */}
        <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
              alt="Dubai to Canada Pet Relocation"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
              DUBAI ↔ CANADA PET RELOCATION
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Moving Your Pet Between Dubai & Canada? Let&apos;s Plan the Journey.
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
                Moving your pet to another country is a big move — and there is a lot to think about before travel day. From understanding the route and preparing your pet to getting the travel details in place, Global Pet Cab helps you organise the journey one step at a time.
              </p>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
                Whether your pet is leaving Dubai for Canada or coming home to Dubai from Canada, we help you understand what needs to happen next and coordinate the journey around your pet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* 2. INTERNATIONAL PET RELOCATION QUOTE */}
        <section id="international-quote-form" className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                DUBAI ↔ CANADA RELOCATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                International Pet Relocation — Request Your Quote
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold font-heading text-teal-bright uppercase tracking-widest">
                    Route Overview
                  </span>
                  <h3 className="text-2xl font-black font-heading tracking-tight">
                    Dubai (DXB) ↔ Canada (YYZ / YVR / YUL)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Relocating pets between Dubai and Canada requires careful alignment between CFIA Canadian entry protocols and UAE MOCCAE clearance.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm">
                  <div className="flex items-center gap-3 text-slate-200">
                    <Clock className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Direct Flight: ~14 to 16 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>CFIA & UAE MOCCAE Compliant</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <Compass className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Dedicated Route Move Coordinator</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InternationalQuoteForm
                  title="International Pet Relocation — Request Your Quote"
                  description="Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. CANADA ROUTE INTRODUCTION BANNER */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
              alt="Canada Pet Relocation Route"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              YOUR PET&apos;S JOURNEY TO CANADA
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              More Than Just Getting From Dubai to Canada
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>A pet relocation involves more than getting your pet onto a flight.</p>
              <p>
                There is preparation before departure, travel arrangements to organise and documents that need to be in place. The details can also change depending on your pet, your route and the direction you are travelling.
              </p>
              <p>
                That&apos;s why we start by understanding your pet, your journey and your timeline — then help you work through the practical steps.
              </p>
              <p className="text-teal-light font-medium">
                Whether you&apos;re relocating for work, moving back home or starting a new chapter in Canada, your pet deserves to be part of the plan.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHAT WE HELP YOU COORDINATE */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                HOW WE SUPPORT YOUR MOVE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                One Journey. Many Moving Parts. One Team to Help Coordinate Them.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                We support your pet relocation step by step across both Dubai and Canadian jurisdictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {CANADA_COORDINATE_STEPS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black font-heading text-teal-deep bg-white px-3 py-1 rounded-full border border-teal-border">
                        {item.s}
                      </span>
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">{item.t}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. LOCAL SUPPORT BEFORE THE BIG MOVE */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=2000&q=80"
              alt="Local Pet Care Support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              BEFORE TRAVEL DAY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Need Help Getting Your Pet Ready?
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>Sometimes the international journey isn&apos;t the only thing on your plate.</p>
              <p>
                If your pet needs to visit a veterinarian, groomer or other pet-care appointment before travelling and you can&apos;t make it yourself, local pet transport support can help. Depending on the service arranged, our team can assist with getting your pet where they need to go.
              </p>
              <p className="text-teal-light font-medium">Because sometimes getting ready to travel is a journey of its own.</p>
            </div>
            <div className="pt-2">
              <Link
                href="/dubai-pet-taxi"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base"
              >
                Explore Dubai Pet Taxi
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. DUBAI → CANADA / CANADA → DUBAI COMPARISON */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                KNOW WHICH WAY YOUR PET IS TRAVELLING
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                From Dubai to Canada? Or Canada to Dubai?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Pet import and export regulations differ significantly between departure and arrival countries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-3 py-1.5 rounded-full border border-teal-border">
                  EXPORT JOURNEY
                </div>
                <h3 className="text-2xl font-black font-heading text-navy">Moving FROM Dubai / UAE to Canada</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                  Your pet is leaving the UAE, so this is an export from the UAE and an import into Canada. The journey needs to be planned around the requirements on both sides.
                </p>
                <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium font-body">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>UAE MOCCAE Export Health Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>Canadian Food Inspection Agency (CFIA) Compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>ISO 11784/11785 Microchip & Rabies Vaccination</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black font-heading text-coral uppercase tracking-widest bg-coral/10 px-3 py-1.5 rounded-full border border-coral/20">
                  IMPORT JOURNEY
                </div>
                <h3 className="text-2xl font-black font-heading text-navy">Moving INTO Dubai / UAE from Canada</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                  Your pet is entering the UAE, so this is an import into Dubai/UAE. The preparation and documentation will be based on the applicable UAE entry requirements and your pet&apos;s travel circumstances.
                </p>
                <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium font-body">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>UAE MOCCAE Official Import Permit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>CFIA Endorsed Veterinary Health Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>Rabies Neutralizing Antibody Titer Test (RNATT)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-bold text-navy bg-white py-4 px-6 rounded-2xl border border-teal-border shadow-2xs">
                Not sure which requirements apply to your pet? Start with your route and travel date, and we&apos;ll help you understand what needs to be planned.
              </p>
            </div>
          </div>
        </section>

        {/* 7. WHY PET PARENTS CHOOSE GLOBAL PET CAB */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                WHY GLOBAL PET CAB
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Because Your Pet Isn&apos;t Just Another Piece of Luggage.
              </h2>
              <div className="space-y-3 font-body text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>International relocation can feel complicated when you&apos;re trying to figure everything out yourself.</p>
                <p>
                  Our job is to make the journey easier to understand — from the first conversation about your route to the practical details that need to be arranged before your pet travels.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {CANADA_WHY_US.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50 border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. TRUST SECTION BANNER */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
              alt="Happy Pets Travelling"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              FAMILY-FIRST CARE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Your Pet&apos;s Journey Deserves More Than a Booking Confirmation.
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>We know you&apos;re not simply sending a pet from one airport to another.</p>
              <p className="font-extrabold text-teal-light text-xl">You&apos;re sending a family member.</p>
              <p>
                That&apos;s why the focus is on planning the journey properly, communicating clearly and making sure the practical details are considered before travel day.
              </p>
            </div>
            <div className="pt-6 border-t border-white/15 max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-4">
                Trust Badges — Verify Before Publishing
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  IPATA Member
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  IATA-Compliant Handling
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  45+ Countries
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  2,000+ Pets Transported
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                QUESTIONS PET PARENTS ASK
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Dubai ↔ Canada Pet Relocation FAQs
              </h2>
              <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
                Planning to move your pet between Dubai and Canada? Here are answers to commonly asked questions.
              </p>
            </div>

            <div className="space-y-4">
              {CANADA_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30"
                >
                  <summary className="flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              READY TO PLAN YOUR PET&apos;S MOVE?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Figure Out the Journey Together.
            </h2>
            <div className="space-y-2 max-w-2xl mx-auto font-body text-base sm:text-xl text-slate-200 leading-relaxed">
              <p>Tell us where your pet is travelling from, where they&apos;re going and roughly when you want to travel.</p>
              <p>We&apos;ll start with the route, understand your pet&apos;s needs and help you work out what comes next.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Canada Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp the Relocation Team
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (params.slug === 'dubai-to-usa') {
    return (
      <div className="font-body space-y-0 text-slate-800">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
              alt="Dubai to USA Pet Relocation"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
              DUBAI → USA PET RELOCATION
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Pet Relocation from Dubai to the USA, Made Easier
            </h1>

            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
                Taking your pet from Dubai to the United States involves more than booking a flight. Depending on the route and how your pet travels, you may need to prepare veterinary documents, vaccination records, a suitable travel crate and the right airline arrangements. Global Pet Cab helps you put those pieces together and plan the journey around your pet.
              </p>
              <p className="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
                Pet relocation from Dubai to the USA with route planning, travel preparation and arrival coordination.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* 2. WHAT GLOBAL PET CAB HANDLES */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                WHAT GLOBAL PET CAB HANDLES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                What We Can Help With on Your Dubai to USA Pet Move
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Every international pet journey has its own details. We start with your route, your pet and your intended travel date, then help coordinate the practical pieces needed to get the journey moving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {USA_HANDLES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. DOCUMENTS GENERALLY REQUIRED */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                DOCUMENTS GENERALLY REQUIRED
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Documents to Prepare for a Dubai to USA Pet Journey
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                The documents shown below are based on the current Global Pet Cab USA destination page. Pet entry requirements can vary depending on the destination, the animal and how the pet travels, so the final checklist should always be confirmed for the specific journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {USA_DOCS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 max-w-4xl mx-auto rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
              <p className="text-sm text-amber-900 font-medium leading-relaxed font-body">
                Important: Regulatory and airline requirements can change. Global Pet Cab should verify the latest applicable requirements for the pet, destination and travel method before confirming the final travel checklist.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HUMAN-FIRST SUPPORT SECTION */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
              alt="USA Pet Relocation Support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              HUMAN-FIRST SUPPORT
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              The Paperwork Is Important. So Is Knowing What Happens Next.
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>
                International pet travel can feel overwhelming because there are several things to keep track of at the same time. You may be thinking about vaccination records, the microchip, the crate, the flight and what happens when your pet lands.
              </p>
              <p>
                Our job is to make that process easier to understand. Tell us where you&apos;re travelling from, where in the USA your pet is going and when you hope to travel. We&apos;ll look at the route with you and help you understand the next steps before you commit to the journey.
              </p>
            </div>
          </div>
        </section>

        {/* 5. INTERNATIONAL PET RELOCATION QUOTE FORM */}
        <section id="international-quote-form" className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                DUBAI ↔ WORLDWIDE RELOCATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Tell Us About Your Pet&apos;s Journey
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details. This gives the team the information needed to review your relocation request.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold font-heading text-teal-bright uppercase tracking-widest">
                    Route Overview
                  </span>
                  <h3 className="text-2xl font-black font-heading tracking-tight">
                    Dubai (DXB) → USA (JFK / LAX / ORD / IAH)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Direct and transit pet travel compliance for dogs and cats relocating to major US airport hubs under CDC & USDA entry regulations.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm">
                  <div className="flex items-center gap-3 text-slate-200">
                    <Clock className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Direct Flight: ~13 to 16 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>CDC Rabies & USDA Entry Documentation</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <Compass className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Dedicated USA Move Specialist</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InternationalQuoteForm
                  title="Tell Us About Your Pet's Journey"
                  description="Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. THE JOURNEY */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                THE JOURNEY
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                From Dubai to the USA, One Step at a Time
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                We coordinate every phase from your initial route enquiry to destination arrival.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {USA_STEPS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3 flex flex-col justify-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-soft border border-teal-border flex items-center justify-center font-heading font-black text-teal-deep text-sm">
                    {item.s}
                  </div>
                  <h3 className="text-base font-black font-heading text-navy leading-snug">{item.t}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQS */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                QUESTIONS PET PARENTS ASK
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Dubai to USA Pet Relocation Questions, Answered
              </h2>
              <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
                Planning to take your pet from Dubai to the United States? Here are some of the practical questions to think about before you book.
              </p>
            </div>

            <div className="space-y-4">
              {USA_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30"
                >
                  <summary className="flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              READY TO PLAN YOUR PET&apos;S MOVE?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Start With Your Route
            </h2>
            <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
              You don&apos;t have to work out every part of an international pet move on your own. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. We&apos;ll help you understand what comes next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (params.slug === 'dubai-to-uk') {
    return (
      <div className="font-body space-y-0 text-slate-800">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
              alt="Dubai to UK Pet Relocation"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
              DUBAI → UNITED KINGDOM PET RELOCATION
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Pet Relocation from Dubai to the UK, Made Simple
            </h1>

            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
                Moving your dog or cat from Dubai to the United Kingdom comes with a few important steps, from getting the right veterinary documents and travel preparation in place to arranging the flight and arrival process. Global Pet Cab helps you understand what needs to happen and coordinates the key parts of the journey, so you can focus on getting your pet ready for the move.
              </p>
              <p className="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
                Pet relocation from Dubai to the UK with route-specific preparation, travel coordination and arrival support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20UK%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* 2. WHAT GLOBAL PET CAB HANDLES */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                WHAT GLOBAL PET CAB HANDLES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Helping You Prepare for Your Pet&apos;s Move from Dubai to the UK
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                A move to the UK is more than getting your pet onto a flight. We help bring the important pieces together, from route planning and veterinary preparation to travel crate arrangements, airport handling and arrival coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {UK_HANDLES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. DOCUMENTS & REQUIREMENTS */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                DOCUMENTS &amp; REQUIREMENTS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Documents Your Pet May Need for Travel to the UK
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                UK pet travel requirements are route-specific and can change. The list below reflects the requirements shown on the current Global Pet Cab UK destination page and should be checked against the latest applicable rules before travel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {UK_DOCS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 sm:p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 max-w-3xl mx-auto p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium text-center leading-relaxed">
              Important: Regulatory requirements can change. The relocation team should verify the current UK requirements for the specific journey before confirming the final checklist.
            </div>
          </div>
        </section>

        {/* 4. HUMAN SUPPORT SECTION */}
        <section className="relative overflow-hidden text-white py-24 sm:py-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
              alt="Human Support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(7, 23, 40, 0.94), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.96))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              HUMAN SUPPORT &amp; GUIDANCE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
              We Know the Hard Part Isn&apos;t Just the Flight
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
                When you&apos;re moving your pet to another country, it is easy to get stuck wondering whether you have missed a document, booked the right kind of travel, or planned everything early enough.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                That&apos;s why we start with your route and your pet, then work through the requirements with you. The goal is simple: fewer unknowns, a clearer plan and someone you can speak to when you have a question.
              </p>
              <p className="text-xs sm:text-sm text-teal-light leading-relaxed font-body pt-2">
                And if you are not available for a local grooming or health-related appointment before travel, selected local pet transportation and appointment support may also be available, subject to the service arrangement.
              </p>
            </div>
          </div>
        </section>

        {/* 5. INTERNATIONAL PET RELOCATION QUOTE FORM */}
        <section id="international-quote-form" className="py-16 sm:py-20 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-7 sm:p-8 rounded-3xl border border-teal-border shadow-sm space-y-5">
                  <div className="inline-flex items-center gap-2 bg-teal-soft text-teal-deep text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-teal-border">
                    <MapPin className="w-3.5 h-3.5" />
                    Route Details: Dubai, UAE → United Kingdom
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-heading text-navy">
                    What We Handle for Your UK Move
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    Pets entering the UK from the UAE must travel as Manifested Cargo in compliance with DEFRA regulations via approved Heathrow or Manchester HARC inspection facilities.
                  </p>

                  <div className="pt-2 border-t border-teal-border/40 space-y-3">
                    <span className="text-xs font-black font-heading uppercase tracking-wider text-slate-400 block">
                      Included Route Management:
                    </span>
                    <ul className="text-sm text-slate-700 space-y-2.5 font-medium">
                      {[
                        'Complete route planning & DEFRA manifest cargo booking',
                        'UAE MOCCAE export permit clearance',
                        'UK DEFRA GB Pet Health Certificate coordination',
                        'Microchip & 21-day rabies vaccination compliance',
                        'Tapeworm (Echinococcus multilocularis) treatment scheduling',
                        'IATA-compliant custom travel crate assembly & bedding',
                        'Heathrow HARC & Manchester ARC ground handling',
                        'Doorstep pickup in Dubai and UK arrival support'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-teal-soft/70 p-7 sm:p-8 rounded-3xl border border-teal-border space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-black font-heading text-navy flex items-center gap-2">
                      <FileText className="w-5 h-5 text-teal-deep" />
                      Documents Generally Required
                    </h4>
                    <span className="text-xs font-bold text-teal-deep bg-white px-3 py-1 rounded-full border border-teal-border">
                      7.5 Hours Direct Flight
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    * Regulatory requirements may update. Our team verifies exact current rules prior to booking.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'DEFRA GB Pet Health Certificate',
                      'Microchip implanted prior to Rabies Vaccination',
                      'Valid Rabies Vaccination (minimum 21 days old)',
                      'Tapeworm (Echinococcus multilocularis) treatment (24-120 hrs prior)',
                      'Air Waybill (AWB) Manifest Cargo Booking'
                    ].map((doc, idx) => (
                      <li
                        key={idx}
                        className="bg-white p-3.5 rounded-2xl border border-teal-border text-xs sm:text-sm font-bold text-navy flex items-center gap-2.5 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-deep shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InternationalQuoteForm
                  title="Request Your UK Pet Relocation Quote"
                  description="Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Once we understand the route and your pet's needs, the team can review the requirements and prepare the next steps."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. SIMPLE JOURNEY EXPLANATION */}
        <section className="py-20 sm:py-24 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
                HOW IT WORKS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
                From Dubai to the UK, One Step at a Time
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
                A clear, structured 5-step journey to safely bring your pet from the UAE to their new home in the United Kingdom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {UK_STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-bright/40 transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="text-3xl sm:text-4xl font-black font-heading text-teal-bright">{s.step}</div>
                    <h3 className="text-xl font-black font-heading text-white">{s.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-body">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section className="py-20 sm:py-24 bg-white border-t border-teal-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                QUESTIONS PET PARENTS ASK
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Dubai to UK Pet Relocation Questions, Answered
              </h2>
              <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
                Planning your pet&apos;s move from Dubai to the UK? Here are a few of the questions worth answering before you book.
              </p>
            </div>

            <div className="space-y-4">
              {UK_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30"
                >
                  <summary className="flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              READY TO PLAN THE MOVE?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Get Your Pet Ready for the UK
            </h2>
            <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
              You don&apos;t need to figure out every step on your own. Tell us about your pet and your route, and we&apos;ll help you understand what needs to happen next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20UK%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const data = DESTINATION_DATA[params.slug] || {
    slug: params.slug || 'dubai-to-india',
    title: 'Pet Relocation from Dubai to India',
    route: 'Dubai (DXB) → India (DEL / BOM / BLR)',
    origin: 'Dubai, UAE',
    destination: 'India',
    overview: 'Relocating your dog or cat from Dubai to India requires careful coordination with Indian AQCS (Animal Quarantine and Certification Services), DGFT NOC permits, and UAE MOCCAE export clearance.',
    documentsNeeded: [
      'ISO 11784/11785 Microchip Certificate',
      'UAE MOCCAE Export Health Certificate',
      'India AQCS No Objection Certificate (NOC)',
      'Valid Rabies & Core Vaccination Records (30+ days prior)',
      'Owner Passport & Indian Visa/OCI Copy',
    ],
    flightTimeApprox: '3 to 4.5 Hours Direct Flight',
  };

  return (
    <div className="font-body space-y-0 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
            alt="International Pet Relocation"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/55" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
              <Globe className="w-3.5 h-3.5" />
              INTERNATIONAL PET RELOCATION
            </span>
            {data.route && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 text-slate-200 border border-white/15">
                <Plane className="w-3.5 h-3.5 text-teal-bright" />
                {data.route}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            International Pet Relocation, Wherever Your Pet Is Going
          </h1>

          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
              Moving a pet to another country is a big move for the whole family. There are flights to plan, veterinary requirements to understand, documents to prepare and a lot of small details that need to come together at the right time.
            </p>
            <p className="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
              Global Pet Cab helps you plan and coordinate your pet&apos;s international journey, from the first route discussion and travel preparation to airport arrangements and arrival support.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-bold text-teal-light">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              International Pet Relocation
            </span>
            <span className="text-white/40">|</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              Route-Specific Planning
            </span>
            <span className="text-white/40">|</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              Pet Transport Support
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="#international-quote-form"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              Get a Free Relocation Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          <div className="pt-2 text-[11px] sm:text-xs text-slate-400">
            *IPATA Member — verified international live animal handling standards
          </div>
        </div>
      </section>

      {/* 2. QUOTE FORM + ROUTE DETAIL SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-teal-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Route Specific Guidance */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-teal-border shadow-sm space-y-5">
                <div className="inline-flex items-center gap-2 bg-teal-soft text-teal-deep text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-teal-border">
                  <MapPin className="w-3.5 h-3.5" />
                  Route Details: {data.origin} → {data.destination}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black font-heading text-navy">
                  What We Handle for Your {data.destination} Move
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-body">
                  {data.overview}
                </p>

                <div className="pt-2 border-t border-teal-border/40 space-y-3">
                  <span className="text-xs font-black font-heading uppercase tracking-wider text-slate-400 block">
                    Included Route Management:
                  </span>
                  <ul className="text-sm text-slate-700 space-y-2.5 font-medium">
                    {[
                      'Complete route planning & airline flight selection',
                      'Export permit clearance with origin ministry',
                      'Import permit clearance with destination ministry',
                      'Veterinary inspection & rabies titer test verification',
                      'IATA-compliant custom travel crate assembly & bedding',
                      'Airport ground handling at DXB and arrival airports',
                      'Customs clearance processing upon landing',
                      'Doorstep pickup and destination delivery',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-teal-soft/70 p-7 sm:p-8 rounded-3xl border border-teal-border space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-black font-heading text-navy flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-deep" />
                    Documents Generally Required
                  </h4>
                  {data.flightTimeApprox && (
                    <span className="text-xs font-bold text-teal-deep bg-white px-3 py-1 rounded-full border border-teal-border">
                      {data.flightTimeApprox}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 italic">
                  * Regulatory requirements may update. Our team verifies exact current rules prior to booking.
                </p>
                <ul className="space-y-2">
                  {data.documentsNeeded.map((doc, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-3.5 rounded-2xl border border-teal-border text-xs sm:text-sm font-bold text-navy flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-deep shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Column: Interactive Relocation Quote Form */}
            <div className="lg:col-span-7">
              <InternationalQuoteForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION: More Than Getting Your Pet on a Flight */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              <ShieldCheck className="w-4 h-4 text-teal-deep" />
              FULL-JOURNEY CARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              More Than Getting Your Pet on a Flight
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              A successful pet relocation is about much more than booking a ticket. The right preparation starts well before departure and can continue until your pet reaches their new home.
            </p>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-body">
              We help bring the moving parts together around your route, so you have a clearer idea of what needs to happen, when it needs to happen and where our team can support you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SCOPE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-50 border border-teal-border/70 hover:bg-white hover:shadow-fj-card hover:border-teal-deep/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border group-hover:bg-teal-deep group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIRECTION SECTION: Export or Import? */}
      <section className="py-20 sm:py-24 bg-teal-soft/40 border-y border-teal-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
              EXPORT OR IMPORT? START WITH YOUR DIRECTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              The Journey Depends on Where Your Pet Is Going
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              International pet travel looks different depending on the direction of the move. That&apos;s why we make this the first choice in the quote journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Direction 1: Export */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 text-navy font-bold text-xs">
                <Plane className="w-4 h-4 text-teal-deep" />
                UAE EXPORT
              </div>
              <h3 className="text-2xl font-black font-heading text-navy">
                Moving FROM Dubai / UAE
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Your pet is leaving the UAE for another country. This is an export journey, and the requirements will depend on the destination, airline and your pet&apos;s circumstances.
              </p>
            </div>

            {/* Direction 2: Import */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-soft text-teal-deep font-bold text-xs border border-teal-border">
                <Plane className="w-4 h-4 text-teal-deep rotate-90" />
                UAE IMPORT
              </div>
              <h3 className="text-2xl font-black font-heading text-navy">
                Moving INTO Dubai / UAE
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Your pet is travelling from another country into the UAE. This is an import journey, with entry requirements that depend on the country of origin and the applicable UAE rules.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-500 font-medium">
              For other origin and destination combinations, the relocation team can review the route and advise on the next steps.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROCESS STEPS: HOW WE HELP MANAGE THE JOURNEY */}
      <section className="py-20 sm:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
              One Journey. Many Details. One Team to Coordinate Them.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
              International pet travel can feel overwhelming because there is rarely just one thing to organise. Our role is to help you bring the important pieces together without losing sight of the most important part — your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-bright/40 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-black font-heading text-teal-bright">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-black font-heading text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BANNER WITH BACKGROUND IMAGE: Need Help Before Your Pet Flies? */}
      <section className="relative overflow-hidden text-white py-24 sm:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Pet Taxi Service"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
            <Car className="w-4 h-4 text-teal-bright" />
            LOCAL PICKUP & APPOINTMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
            Need Help Before Your Pet Flies?
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
              Sometimes the international journey starts days or weeks before the airport. If you are not available, selected local pet transportation services can help your pet get to grooming or health-related appointments before travel, subject to the service arrangement.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
              For Dubai-based customers, we can also connect the local part of the journey with airport transportation, helping your pet get from home or another agreed location to the airport.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dubai-pet-taxi"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base"
            >
              Explore Dubai Pet Taxi
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WORLDWIDE DESTINATIONS: From Dubai to the World */}
      <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              DUBAI ↔ WORLDWIDE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              From Dubai to the World, and Back Again
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Whether you are moving home, relocating for work, returning to your home country or bringing your pet to join you in Dubai, the journey starts with understanding your route.
            </p>
            <p className="text-sm font-bold text-navy pt-2">
              Explore our destination guides for route-specific information and requirements:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {WORLDWIDE_DESTINATIONS.map((dest, idx) => (
              <Link
                key={idx}
                href={dest.link}
                className="p-5 rounded-2xl border border-teal-border bg-slate-50 hover:bg-teal-deep hover:text-white text-navy font-extrabold font-heading text-sm text-center transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-center min-h-[72px]"
              >
                <span>{dest.label}</span>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto italic">
            Each destination carries route-specific country requirements, documentation rules and airline considerations.
          </p>
        </div>
      </section>

      {/* 8. WHY CHOOSE US (ICON BOXES): Professional Support, With Your Pet at the Centre */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
              WHY PET PARENTS CHOOSE US
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Professional Support, With Your Pet at the Centre
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              There is a lot to think about when your pet is crossing borders. We want the process to feel clear, organised and personal — not like you are trying to piece together a complicated journey on your own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black font-heading text-navy">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FAQS ACCORDION: International Pet Relocation Questions, Answered */}
      <section className="py-20 sm:py-24 bg-white border-t border-teal-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              QUESTIONS PET PARENTS ASK
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              International Pet Relocation Questions, Answered
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
              Every international move has its own requirements. These answers give you a starting point before you request a route-specific quote.
            </p>
          </div>

          <RelocationFAQAccordion />
        </div>
      </section>

      {/* 10. FINAL CTA: Your Pet's Next Journey Starts With a Conversation */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
            PLANNING A MOVE?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
            Your Pet&apos;s Next Journey Starts With a Conversation
          </h2>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
            Tell us where your pet is coming from, where they are going and when you hope to travel. We&apos;ll help you understand the journey ahead and the next steps to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#international-quote-form"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              Get a Free Relocation Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
