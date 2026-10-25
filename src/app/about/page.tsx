import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Heart, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Global Pet Cab Dubai — Our Story & Operations',
  description: 'Learn about Global Pet Cab’s expansion into Dubai, operational experience, and commitment to safe pet transport.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">About Global Pet Cab Dubai</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Dedicated pet transport specialists connecting Dubai homes, veterinary centers, and worldwide destinations.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-base">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-teal-border shadow-sm space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-navy">Our Story</h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
            Global Pet Cab was founded on a simple principle: moving a pet should be handled with the same care, safety, and operational precision as moving family.
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
            Recognizing the unique mobility needs of Dubai&apos;s pet parent community, we expanded our operations to offer dedicated local city rides (Dubai Pet Taxi) alongside our established international pet relocation capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-teal-soft/60 p-8 rounded-3xl border border-teal-border space-y-3">
            <div className="font-black font-heading text-navy text-lg sm:text-xl">Dubai Local Operations</div>
            <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
              Our Dubai ground transport fleet features custom climate-controlled vehicles, anti-slip flooring, and trained drivers experienced in handling dogs, cats, and small animals across all Dubai emirate districts.
            </p>
          </div>
          <div className="bg-teal-soft/60 p-8 rounded-3xl border border-teal-border space-y-3">
            <div className="font-black font-heading text-navy text-lg sm:text-xl">Global Relocation Expertise</div>
            <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
              Our relocation team handles cross-border moves between Dubai and major global hubs (India, UK, USA, Canada, Australia, Europe, Singapore), managing MOCCAE permits, IATA crates, and customs clearance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
