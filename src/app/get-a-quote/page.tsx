import React from 'react';
import { Metadata } from 'next';
import HeroServiceSelector from '@/components/HeroServiceSelector';
import DubaiFareCalculator from '@/components/DubaiFareCalculator';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';

export const metadata: Metadata = {
  title: 'Get a Quote — Global Pet Cab Dubai',
  description: 'Select your service: instant distance fare for Dubai Pet Taxi or custom international relocation quote.',
};

export default function GetAQuotePage() {
  return (
    <div className="space-y-16 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Get Your Pet Transport Quote</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Select Dubai Pet Taxi for instant city ride estimates or International Relocation for cross-border moves.
          </p>
        </div>
      </section>

      <HeroServiceSelector />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <DubaiFareCalculator />
        <InternationalQuoteForm />
      </div>
    </div>
  );
}
