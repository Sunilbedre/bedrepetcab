import React from 'react';
import { Metadata } from 'next';
import { Car, ShieldCheck, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import DubaiFareCalculator from '@/components/DubaiFareCalculator';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Dubai Pet Taxi — Instant Distance Fare & Door-to-Door Pet Transport',
  description: 'Book safe, comfortable pet taxi rides inside Dubai. Instant road distance fare calculator for vet visits, grooming salons, pet hotels, and DXB airport transfers.',
};

export default function DubaiPetTaxiPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30">
            <Car className="w-4 h-4 text-teal-bright" />
            Dubai Local Mobility
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Dubai&apos;s Pet Taxi for Safe, Comfortable Door-to-Door Travel
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-body">
            Professional pet transport across Dubai for veterinary clinic appointments, grooming, pet boarding facilities, airport transfers, and home moves.
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DubaiFareCalculator />
      </section>

      {/* Where We Take Your Pet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy">Where We Take Your Pet in Dubai</h2>
          <p className="text-base sm:text-lg text-slate-600 font-body">Door-to-door transportation tailored for everyday pet needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Veterinary Visits', desc: 'Stress-free rides to clinics & emergency vet centers across Dubai.' },
            { title: 'Grooming & Salons', desc: 'Scheduled pickups and drop-offs to your preferred pet pampering salon.' },
            { title: 'Pet Hotels & Boarding', desc: 'Comfortable transfer to and from pet boarding & daycare resorts.' },
            { title: 'DXB / DWC Airports', desc: 'Direct transfers to Dubai International & Al Maktoum Airport departures.' },
            { title: 'Home Relocations', desc: 'Moving between Dubai apartments or villas? We carry your pet safely.' },
            { title: 'Pet Events & Parks', desc: 'Rides to dog parks, pet meetups, and pet-friendly cafes.' },
            { title: 'Round Trip Waiting', desc: 'Your driver waits on-site while your pet gets checked or groomed.' },
            { title: 'One-Way Transfers', desc: 'Flexible single destination transfers across all Dubai neighborhoods.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-teal-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-soft text-teal-deep flex items-center justify-center font-extrabold text-sm border border-teal-border">
                ✓
              </div>
              <h3 className="font-black font-heading text-lg text-navy">{item.title}</h3>
              <p className="text-sm font-body text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pet Taxi FAQs */}
      <FAQAccordion />
    </div>
  );
}
