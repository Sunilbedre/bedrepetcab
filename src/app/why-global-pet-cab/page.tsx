import React from 'react';
import { Metadata } from 'next';
import WhyChooseUs from '@/components/WhyChooseUs';
import TrustBar from '@/components/TrustBar';

export const metadata: Metadata = {
  title: 'Why Global Pet Cab — Safety, Transparency & Certified Care',
  description: 'Discover why pet owners in Dubai trust Global Pet Cab for local taxi rides and international relocation.',
};

export default function WhyUsPage() {
  return (
    <div className="space-y-8 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Why Global Pet Cab</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Combining professional mobility logistics with genuine warmth for pet family members.
          </p>
        </div>
      </section>
      <TrustBar />
      <WhyChooseUs />
    </div>
  );
}
