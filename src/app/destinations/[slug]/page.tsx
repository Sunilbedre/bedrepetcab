import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Globe, Plane, ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';

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
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = DESTINATION_DATA[params.slug];
  if (!data) return { title: 'Destination Not Found — Global Pet Cab' };
  return {
    title: `${data.title} — Global Pet Cab Dubai`,
    description: data.overview,
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const data = DESTINATION_DATA[params.slug];
  
  if (!data) {
    return (
      <div className="py-16 max-w-4xl mx-auto px-4 text-center space-y-6 font-body">
        <h1 className="text-3xl font-black font-heading text-navy">Pet Relocation Route</h1>
        <p className="text-base text-slate-600">
          Global Pet Cab handles international pet relocation for all countries worldwide. Fill out our quote form to get custom route requirements!
        </p>
        <InternationalQuoteForm />
      </div>
    );
  }

  return (
    <div className="space-y-16 py-8 font-body">
      {/* Route Hero */}
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30">
            <Plane className="w-4 h-4 text-teal-bright" />
            {data.route}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            {data.title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {data.overview}
          </p>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="bg-white p-8 rounded-3xl border border-teal-border shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-black font-heading text-navy flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                What Global Pet Cab Handles for {data.origin} → {data.destination}
              </h2>

              <ul className="text-sm sm:text-base text-slate-700 space-y-3 font-medium">
                {[
                  'Complete route planning & airline flight selection',
                  'Export permit clearance with origin ministry',
                  'Import permit clearance with destination ministry',
                  'Veterinary inspection & rabies titer test verification',
                  'IATA-compliant custom travel crate assembly & bedding',
                  'Airport ground handling at DXB and destination airports',
                  'Customs clearance processing upon landing',
                  'Doorstep pickup and destination delivery',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-soft/60 p-8 rounded-3xl border border-teal-border space-y-6">
              <h3 className="text-lg sm:text-xl font-black font-heading text-navy flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-deep" />
                Documents Generally Required
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 italic">
                * Regulatory requirements may update. Our team verifies exact current rules prior to booking.
              </p>
              <ul className="text-sm sm:text-base text-slate-700 space-y-2.5">
                {data.documentsNeeded.map((doc, idx) => (
                  <li key={idx} className="bg-white p-4 rounded-2xl border border-teal-border font-bold text-navy flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-deep shrink-0"></span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-6">
            <InternationalQuoteForm />
          </div>

        </div>
      </section>

    </div>
  );
}
