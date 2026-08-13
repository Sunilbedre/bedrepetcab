import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Car, Globe, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works — Global Pet Cab Dubai',
  description: 'Learn how Global Pet Cab manages local pet taxi rides inside Dubai and international pet relocations step by step.',
};

export default function HowItWorksPage() {
  return (
    <div className="space-y-16 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">How Global Pet Cab Works</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Clear, transparent workflows for both city ground transport and international relocation.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16">
        {/* Dubai Pet Taxi Process */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-teal-border shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-bold">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-teal-deep uppercase tracking-widest">LOCAL CITY RIDES</span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy font-heading">Dubai Pet Taxi Journey Steps</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-3 bg-teal-soft/60 p-6 rounded-3xl border border-teal-border">
              <div className="text-xl font-black font-heading text-teal-deep">1. Calculate Fare</div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body">
                Enter your pickup and dropoff locations in Dubai. Our fare engine calculates exact driving distance and estimated price.
              </p>
            </div>
            <div className="space-y-3 bg-teal-soft/60 p-6 rounded-3xl border border-teal-border">
              <div className="text-xl font-black font-heading text-teal-deep">2. Share Pet Details</div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body">
                Provide pet name, breed, date, and preferred pickup time. Submit to generate reference GPC-DXB-XXXX.
              </p>
            </div>
            <div className="space-y-3 bg-teal-soft/60 p-6 rounded-3xl border border-teal-border">
              <div className="text-xl font-black font-heading text-teal-deep">3. Driver Pickup & Ride</div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body">
                Driver arrives at your doorstep in a climate-controlled vehicle. Pet parents ride along or track status via WhatsApp!
              </p>
            </div>
          </div>
        </div>

        {/* International Process */}
        <div className="bg-navy-dark text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-sm space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-bright text-navy flex items-center justify-center font-bold">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-teal-light uppercase tracking-widest">CROSS-BORDER LOGISTICS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">International Relocation Steps</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div className="space-y-3 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
              <div className="font-extrabold font-heading text-teal-light text-base sm:text-lg">Step 1: Request Quote</div>
              <p className="text-sm text-slate-300 leading-relaxed">Submit origin/destination cities, pet weight/dimensions, and preferred travel date.</p>
            </div>
            <div className="space-y-3 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
              <div className="font-extrabold font-heading text-teal-light text-base sm:text-lg">Step 2: Vet Checklist</div>
              <p className="text-sm text-slate-300 leading-relaxed">We guide microchipping, rabies vaccinations, and blood titer testing (RNATT).</p>
            </div>
            <div className="space-y-3 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
              <div className="font-extrabold font-heading text-teal-light text-base sm:text-lg">Step 3: Permits & Crates</div>
              <p className="text-sm text-slate-300 leading-relaxed">Procure MOCCAE export/import permits and fit custom IATA travel crates.</p>
            </div>
            <div className="space-y-3 bg-slate-800/80 p-6 rounded-3xl border border-slate-700">
              <div className="font-extrabold font-heading text-teal-light text-base sm:text-lg">Step 4: Flight & Delivery</div>
              <p className="text-slate-300 text-sm leading-relaxed">Manifest cargo booking, airport ground handling, customs, and doorstep delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
