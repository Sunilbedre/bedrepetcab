import React from 'react';
import { Metadata } from 'next';
import PetJourneyGallery from '@/components/PetJourneyGallery';

export const metadata: Metadata = {
  title: 'Pet Journeys & Customer Reviews — Global Pet Cab Dubai',
  description: 'Read authentic customer reviews and pet journey stories from pet parents in Dubai.',
};

export default function ReviewsPage() {
  return (
    <div className="space-y-8 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Verified Customer Reviews</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Real pet parents, real journeys, real ratings.
          </p>
        </div>
      </section>
      <PetJourneyGallery />
    </div>
  );
}
