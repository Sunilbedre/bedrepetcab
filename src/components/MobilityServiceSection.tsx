'use client';

import React, { useState } from 'react';
import { Car, Plane, Map, Globe, Check } from 'lucide-react';

type ServiceKey = 'dubai' | 'airport' | 'intercity' | 'international';

const SERVICES: {
  key: ServiceKey;
  title: string;
  description: string;
  emoji: string;
  icon: typeof Car;
}[] = [
  {
    key: 'dubai',
    title: 'Within Dubai',
    description:
      'Vet visits, grooming drop-offs, pet hotels, and DXB airport transfers across Dubai.',
    emoji: '🏙️',
    icon: Car,
  },
  {
    key: 'airport',
    title: 'Airport Transfer',
    description: 'DXB Main, DWC Al Maktoum & Abu Dhabi AUH pickups and drop-offs.',
    emoji: '✈️',
    icon: Plane,
  },
  {
    key: 'intercity',
    title: 'UAE Intercity',
    description: 'Dubai ↔ Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah transfers.',
    emoji: '🗺️',
    icon: Map,
  },
  {
    key: 'international',
    title: 'International Relocation',
    description: 'Dubai ↔ UK, India, USA, Canada, Australia, and Europe.',
    emoji: '🌍',
    icon: Globe,
  },
];

/** Recovered from live Hostinger build (homepage module). */
export default function MobilityServiceSection() {
  const [selected, setSelected] = useState<ServiceKey>('dubai');

  const continueToDetails = () => {
    const el = document.getElementById('dubai-taxi-calculator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="dubai-taxi-calculator" className="pt-32 sm:pt-36 lg:pt-40 pb-20 bg-white scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <p className="text-xs font-black font-heading uppercase tracking-widest text-teal-deep">
            Step 1 of 4
          </p>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
            Select Pet Mobility Service
          </h2>
          <p className="text-base text-slate-600 font-body max-w-2xl mx-auto">
            Choose local city ground transport inside Dubai or cross-border international flight relocation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isSelected = selected === service.key;
            return (
              <button
                key={service.key}
                type="button"
                onClick={() => setSelected(service.key)}
                className={`text-left rounded-3xl p-6 border-2 transition-all ${
                  isSelected
                    ? 'border-teal-deep bg-teal-soft/60 shadow-fj-card'
                    : 'border-teal-border bg-white hover:border-teal-deep/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-2xl" aria-hidden>
                    {service.emoji}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-xs font-black font-heading text-teal-deep uppercase">
                      <Check className="w-4 h-4" /> Selected
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-teal-deep" />
                  <h3 className="text-lg font-black font-heading text-navy">{service.title}</h3>
                </div>
                <p className="text-sm font-body text-slate-600 leading-relaxed">{service.description}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={continueToDetails}
            className="inline-flex items-center justify-center bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-10 py-4 rounded-full shadow-fj-coral transition-all"
          >
            Continue to Step 2 — Ride Details
          </button>
        </div>
      </div>
    </section>
  );
}
