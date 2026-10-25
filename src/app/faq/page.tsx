import React from 'react';
import { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Global Pet Cab Dubai',
  description: 'Categorized FAQs for Dubai Pet Taxi rides and international pet relocations.',
};

export default function FAQPage() {
  return (
    <div className="space-y-8 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Help & FAQ Center</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Everything you need to know about calculating fares, vehicle safety, travel crates, and import/export documentation.
          </p>
        </div>
      </section>
      <FAQAccordion />
    </div>
  );
}
