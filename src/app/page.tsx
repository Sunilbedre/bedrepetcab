import React from 'react';
import Link from 'next/link';
import { Car, Globe, ArrowRight, MessageCircle, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import DubaiFareCalculator from '@/components/DubaiFareCalculator';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';
import HeroServiceSelector from '@/components/HeroServiceSelector';
import TrustBar from '@/components/TrustBar';
import PetJourneyGallery from '@/components/PetJourneyGallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  return (
    <div className="space-y-0 font-body">
      
      {/* 1. HERO SERVICE SELECTOR & INTRO */}
      <HeroServiceSelector />

      {/* 2. TRUST METRICS BAR */}
      <TrustBar />

      {/* 3. DUBAI PET TAXI CALCULATOR SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <DubaiFareCalculator />
        </div>
      </section>

      {/* 4. INTERNATIONAL RELOCATION SECTION */}
      <section className="py-20 bg-teal-soft/50 border-t border-teal-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-sm">
              Cross-Border Pet Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Popular International Relocation Routes
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600">
              We specialize in end-to-end relocation into and out of Dubai with complete MOCCAE permits and airline approvals.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 pt-3">
              {[
                'Dubai ↔ India (Mumbai / Delhi)',
                'Dubai ↔ UK (London LHR)',
                'Dubai ↔ USA (New York / LAX)',
                'Dubai ↔ Canada (Toronto)',
                'Dubai ↔ Australia',
                'Dubai ↔ Europe',
                'Dubai ↔ Singapore',
              ].map((route) => (
                <span
                  key={route}
                  className="bg-white text-navy font-bold text-xs sm:text-sm px-4 py-2 rounded-2xl border border-teal-border shadow-sm"
                >
                  ✈️ {route}
                </span>
              ))}
            </div>
          </div>

          <InternationalQuoteForm />
        </div>
      </section>

      {/* 5. QUESTIONS PET PARENTS ASK */}
      <section className="py-20 bg-white border-t border-teal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              Reassurance & Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Questions Pet Parents Ask Before Booking
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600">
              We know your pet is family. Here is how we ensure their safety and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                1
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                &quot;Will my pet be comfortable during a Dubai summer ride?&quot;
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Yes. Every Global Pet Cab vehicle is custom fitted with heavy-duty dual air-conditioning designed specifically for Middle Eastern heat. Vehicles are pre-cooled prior to pickup so your pet steps into a cool, comfortable environment immediately.
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                2
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                &quot;How is the Dubai Pet Taxi price calculated?&quot;
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                We use a transparent dynamic fare engine: Base fare (AED 60 including first 5 km) + distance rate (AED 4.5/km) + optional additional pets or night surcharges + 5% UAE VAT. No hidden extra fees.
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                3
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                &quot;What paperwork is required to bring my pet into Dubai?&quot;
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Pets entering the UAE require an ISO microchip, valid rabies vaccination, a Rabies Neutralizing Antibody Titer Test (RNATT), an official UAE MOCCAE import permit, and an international health certificate. We manage all of these steps for you!
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                4
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                &quot;Can you collect my pet directly from my Dubai apartment?&quot;
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Yes! Our drivers provide doorstep service across Dubai (Downtown, Marina, Palm Jumeirah, JBR, Business Bay, Al Barsha, Mirdif, and beyond), helping carry carriers or guiding leashed pets safely to the vehicle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 7. REAL PET JOURNEYS */}
      <PetJourneyGallery />

      {/* 8. FAQ ACCORDION */}
      <FAQAccordion />

      {/* 9. FINAL CONVERSION BANNER */}
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-20 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Wherever you&apos;re moving, your pet gets there safely.
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-300 max-w-xl mx-auto">
            Speak with our Dubai team today for instant city ride estimates or expert international pet relocation assistance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="#dubai-taxi-calculator"
              className="w-full sm:w-auto bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-9 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all"
            >
              Calculate Dubai Taxi Fare
            </a>

            <a
              href="#international-quote-form"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold font-heading px-9 py-4 rounded-full border border-white/20 backdrop-blur-md text-base sm:text-lg transition-all"
            >
              Get International Quote
            </a>

            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-9 py-4 rounded-full shadow-md flex items-center justify-center gap-2 text-base sm:text-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
