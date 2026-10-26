import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plane, PlaneLanding, Car } from 'lucide-react';

const JOURNEYS = [
  {
    badge: 'DXB → LHR / BOM · JFK',
    badgeSub: 'Export, handled end to end',
    title: 'Moving a pet out of Dubai',
    description:
      'Taking your dog or cat overseas? We coordinate MOCCAE export requirements, IATA-compliant crate preparation, airline arrangements and destination-side customs coordination.',
    href: '/international-pet-relocation',
    icon: Plane,
  },
  {
    badge: 'BOM → DXB / LHR · JFK',
    badgeSub: 'Import & MOCCAE, handled',
    title: 'Bringing a pet into Dubai',
    description:
      'Bringing your pet into the UAE? We support the required RNATT, MOCCAE import permit, airport clearance and arrival arrangements.',
    href: '/international-pet-relocation',
    icon: PlaneLanding,
  },
  {
    badge: 'MARINA → DXB / VET · GROOMING',
    badgeSub: 'Road · City · Airport',
    title: 'Dubai Pet Taxi',
    description:
      'Need pet transport within Dubai? Book climate-controlled, door-to-door rides for vet visits, grooming, boarding and DXB/DWC airport transfers.',
    href: '/dubai-pet-taxi',
    icon: Car,
  },
];

export default function ThreeJourneysSection() {
  return (
    <section className="py-20 sm:py-24 bg-teal-soft/40 border-t border-teal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-sm">
            WHATEVER YOUR PET&apos;S JOURNEY LOOKS LIKE
          </span>
          <h2 className="text-2xl sm:text-[33px] font-black font-heading text-navy tracking-tight">
            Pet Relocation and Transport, From Dubai to Anywhere You Need to Go
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600">
            Whether you&apos;re moving your pet out of Dubai, bringing them into the UAE, or travelling across the city, our team coordinates the journey from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNEYS.map((journey) => {
            const Icon = journey.icon;
            return (
              <Link
                key={journey.title}
                href={journey.href}
                className="group bg-white rounded-3xl p-8 border border-teal-border shadow-sm hover:shadow-fj-card transition-all flex flex-col"
              >
                <div className="text-[10px] sm:text-xs font-black font-heading uppercase tracking-wider text-teal-deep mb-1">
                  {journey.badge}
                </div>
                <div className="text-[10px] sm:text-xs font-bold font-heading text-slate-500 mb-4">
                  {journey.badgeSub}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center mb-5 group-hover:bg-teal-deep group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-heading text-navy mb-3">{journey.title}</h3>
                <p className="text-sm sm:text-base font-body text-slate-600 leading-relaxed flex-grow">
                  {journey.description}
                </p>
                <span className="inline-flex items-center gap-2 text-teal-deep font-extrabold font-heading text-sm mt-6 group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
