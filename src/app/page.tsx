import React from 'react';
import { MessageCircle } from 'lucide-react';
import HeroServiceSelector from '@/components/HeroServiceSelector';
import TrustBar from '@/components/TrustBar';
import MobilityServiceSection from '@/components/MobilityServiceSection';
import ThreeJourneysSection from '@/components/ThreeJourneysSection';
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

      {/* 3. MOBILITY SELECTOR (from live Hostinger build) */}
      <MobilityServiceSection />

      {/* 4. THREE JOURNEYS */}
      <ThreeJourneysSection />

      {/* 5. QUESTIONS PET PARENTS ASK */}
      <section className="py-20 bg-white border-t border-teal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              REASSURANCE &amp; CLARITY
            </span>
            <h2 className="text-[25px] font-black font-heading text-navy tracking-tight">
              Pet Transport &amp; Relocation Questions, Answered
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600">
              From Dubai pet taxi rides to international pet relocation, here are answers to the questions pet parents ask before booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                01
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                Will my pet be comfortable during a Dubai pet taxi ride in summer?
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Yes. Global Pet Cab vehicles are fitted with heavy-duty dual air-conditioning designed for Middle Eastern heat and are pre-cooled before pickup, helping your pet travel in a cool and comfortable environment.
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                02
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                How is the Dubai Pet Taxi price calculated?
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Your Dubai pet taxi fare is calculated based on the actual driving distance, trip type, number of pets, pickup time and applicable airport surcharges, plus 5% UAE VAT.
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                03
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                What paperwork is required to bring my pet into Dubai?
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Pets entering the UAE may require an ISO-compatible microchip, valid rabies vaccination, Rabies Neutralizing Antibody Titer Test (RNATT), an official UAE MOCCAE import permit and an international health certificate. Our team can coordinate the required steps.
              </p>
            </div>

            <div className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-black font-heading text-base shadow-sm">
                04
              </div>
              <h3 className="text-xl font-black font-heading text-navy">
                Can you collect my pet directly from my Dubai apartment?
              </h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                Yes. We provide door-to-door pet transport across Dubai, including pickups from residential areas and transfers for vet visits, grooming, boarding and airport travel.
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
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-20 sm:py-24 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-[36px] font-black font-heading tracking-tight">
            Moving Your Pet? Let Global Pet Cab Handle the Journey.
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-300 max-w-2xl mx-auto">
            Get an instant estimate for pet transport in Dubai or speak with our team about international pet relocation. From local rides to cross-border journeys, we&apos;ll help you plan the next step.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="#dubai-taxi-calculator"
              className="w-full sm:w-auto bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-9 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all"
            >
              Calculate Dubai Pet Taxi Fare
            </a>

            <a
              href="#international-quote-form"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold font-heading px-9 py-4 rounded-full border border-white/20 backdrop-blur-md text-base sm:text-lg transition-all"
            >
              Get an International Pet Relocation Quote
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
