'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Car, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Stethoscope,
  Hotel,
  Plane,
  Home,
  Trees,
  Navigation,
  Globe2,
  ChevronDown
} from 'lucide-react';
import DubaiFareCalculator from '@/components/DubaiFareCalculator';

const DESTINATIONS = [
  {
    icon: Stethoscope,
    title: 'Veterinary Visits',
    desc: "Comfortable rides to veterinary clinics and pet health appointments across Dubai. If you cannot be there yourself, ask our team about assistance with your pet's journey.",
  },
  {
    icon: Sparkles,
    title: 'Grooming & Salons',
    desc: "Scheduled pickups and drop-offs for grooming appointments and your pet's preferred salon. If you are unavailable, our team can help with the journey, subject to the service arrangement.",
  },
  {
    icon: Hotel,
    title: 'Pet Hotels & Boarding',
    desc: 'Reliable transportation to and from pet hotels, boarding facilities and daycare centres.',
  },
  {
    icon: Plane,
    title: 'Door-to-Airport Transfers',
    desc: 'Convenient transportation from your home or chosen pickup location to the airport when your pet is travelling.',
  },
  {
    icon: Navigation,
    title: 'Airport-to-Door Transfers',
    desc: 'A comfortable ride from the airport to your home or destination after your pet arrives.',
  },
  {
    icon: Home,
    title: 'Home Relocations',
    desc: 'Moving between apartments, villas or other locations in Dubai? We can help your pet travel comfortably to their new home.',
  },
  {
    icon: Globe2,
    title: 'City-to-City Ground Transport',
    desc: 'Need to move your pet beyond Dubai? Ask about available city-to-city ground transportation options.',
  },
  {
    icon: Trees,
    title: 'Pet Parks & Other Destinations',
    desc: 'Transportation for pet-friendly parks, events, meetups and other everyday destinations across Dubai.',
  },
];

const AREAS = [
  'Downtown',
  'Dubai Marina',
  'Palm Jumeirah',
  'JBR',
  'Business Bay',
  'Al Barsha',
  'Mirdif',
  'Jumeirah',
];

const STEPS = [
  {
    num: '1',
    title: 'Calculate Your Fare',
    desc: 'Enter your pickup and drop-off locations and select your journey details to see your estimated pet taxi fare.',
  },
  {
    num: '2',
    title: 'Share Your Pet Details',
    desc: 'Tell us about your pet, including the pet type, number of pets, travel date and preferred pickup time.',
  },
  {
    num: '3',
    title: 'Driver Pickup & Ride',
    desc: 'Your driver arrives at the pickup location and takes your pet comfortably to the destination. For selected grooming or health appointments, our team can also assist when the pet parent is unavailable, subject to the service arrangement.',
  },
];

const FAQS = [
  {
    question: 'How is my Dubai pet taxi fare calculated?',
    answer: 'Your estimated fare is based on the journey distance and selected trip details, including the type of ride and number of pets. Any applicable additional charges are shown in the estimate.',
  },
  {
    question: 'Can I travel with my pet during the ride?',
    answer: 'Yes, where permitted under the service arrangement. Please confirm the passenger policy when booking.',
  },
  {
    question: 'Are your pet taxi vehicles climate-controlled?',
    answer: 'Our Dubai pet taxi service is designed to provide pets with a comfortable environment during their journey.',
  },
  {
    question: 'Can you pick up my pet from my home?',
    answer: 'Yes. Our door-to-door service can collect your pet from your home or another agreed pickup location in Dubai.',
  },
  {
    question: 'Do you provide door-to-airport and airport-to-door transfers?',
    answer: 'Yes. Global Pet Cab provides transportation between your chosen pickup or drop-off location and the airport for travelling pets.',
  },
  {
    question: 'Can you take my pet to a grooming appointment if I am unavailable?',
    answer: 'Our team can help with the transportation and support around selected grooming appointments when the pet parent cannot be there, subject to the service arrangement.',
  },
  {
    question: 'Can you help with a vet or health-related appointment if I cannot be there?',
    answer: "Our team can assist with the pet's journey to selected health-related appointments when the pet parent is unavailable, subject to the service arrangement.",
  },
  {
    question: 'Do you provide city-to-city pet transportation?',
    answer: 'City-to-city ground transportation may be available for selected journeys. Contact the Global Pet Cab team to confirm the route and service availability.',
  },
  {
    question: 'Do you provide international pet relocation?',
    answer: 'Yes. Global Pet Cab also supports international pet journeys. When a pet travels from another country into Dubai, this is an import into Dubai. When a pet travels from Dubai or the UAE to another country, this is an export from the UAE.',
  },
];

export default function DubaiPetTaxiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-body space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Pet Taxi"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/78" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/55" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-teal-light text-xs sm:text-sm font-extrabold font-heading uppercase tracking-[0.16em]">
              <Car className="w-4 h-4" />
              DUBAI PET TAXI
            </div>

            <h1
              className="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1"
              style={{ fontSize: '2.5rem', lineHeight: 1.2 }}
            >
              Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel
            </h1>

            <p className="text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl font-body">
              From everyday trips across Dubai to airport transfers and essential pet appointments, Global Pet Cab makes getting your pet from one place to another simple and comfortable. Our pet taxi service provides convenient door-to-door transportation for vet visits, grooming, boarding, airports and more.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-teal-bright" />
                Climate-Controlled Fleet
              </span>
              <span className="text-white/40">|</span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
                <MapPin className="w-4 h-4 text-teal-bright" />
                Doorstep Pickup
              </span>
              <span className="text-white/40">|</span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
                <CheckCircle2 className="w-4 h-4 text-teal-bright" />
                Pet-Friendly Service
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#dubai-taxi-calculator"
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all"
              >
                <span>Calculate My Fare</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FARE CALCULATOR SECTION */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 pb-8">
        <DubaiFareCalculator />
      </section>

      {/* 3. WHERE WE TAKE YOUR PET IN DUBAI */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy">
              Where We Take Your Pet in Dubai
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
              Whether your pet needs to get across town, reach an appointment or travel to the airport, our Dubai pet taxi service helps make the journey easier from pickup to drop-off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DESTINATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="destination-card-flation group rounded-[24px] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="destination-icon-box w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-black font-heading text-navy text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Areas:</span>
            {AREAS.map((area) => (
              <span
                key={area}
                className="text-xs font-bold font-heading text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border"
              >
                {area}
              </span>
            ))}
            <span className="text-xs font-bold text-slate-500 px-3 py-1.5">and beyond</span>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12 space-y-2">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl sm:text-4xl font-black font-heading lg:whitespace-nowrap how-it-works-single-line">
              Your Dubai Pet Taxi Journey, Made Simple
            </h2>
            <p className="text-base text-white/70 font-body leading-relaxed pt-1">
              From booking to drop-off, we keep the process straightforward so you know what to expect at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3"
              >
                <div className="text-teal-light font-black font-heading text-3xl">{step.num}</div>
                <h3 className="text-xl font-black font-heading">{step.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-body">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-white/80 font-body">
              Need help during the booking process? Contact the Global Pet Cab team on WhatsApp.
            </p>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20I%20need%20help%20booking%20a%20pet%20taxi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-5 py-2.5 rounded-full text-sm shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT FARES */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase">
              SIMPLE, TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy">
              Know Your Fare Before You Ride
            </h2>
            <p className="text-base text-slate-600 font-body leading-relaxed pt-1">
              Your Dubai pet taxi fare is calculated based on the journey distance and selected ride details, so you can see the estimated cost before booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Base Fare */}
            <div className="taxi-pricing-card rounded-[26px] bg-white border-2 border-teal-border/60 p-8 sm:p-9 flex flex-col justify-between shadow-fj-card">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
                    STARTING FARE
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-1">Base Fare</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-teal-deep uppercase">AED</span>
                  <span className="text-4xl sm:text-5xl font-black font-heading text-navy">60</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-teal-deep">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>First 5 km Included</span>
                  </div>
                  <p className="text-sm text-slate-600 font-body leading-relaxed">
                    Base fare includes doorstep pickup and first 5 km of travel across Dubai.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Distance Rate (Featured) */}
            <div className="taxi-pricing-card featured rounded-[26px] bg-white border-2 border-teal-deep p-8 sm:p-9 flex flex-col justify-between shadow-fj-card-hover relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-deep text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-bl-2xl">
                STANDARD METER
              </div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
                    DISTANCE RATE
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-teal-deep text-white flex items-center justify-center shadow-sm">
                    <Navigation className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-1">Per Kilometre</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-teal-deep uppercase">AED</span>
                  <span className="text-4xl sm:text-5xl font-black font-heading text-navy">4.5</span>
                  <span className="text-base font-bold text-slate-500">/ km</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-teal-deep">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>After first 5 km</span>
                  </div>
                  <p className="text-sm text-slate-600 font-body leading-relaxed">
                    Distance rate + applicable 5% UAE VAT, calculated via exact route navigation.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Clear Pricing / No Hidden Fees */}
            <div className="taxi-pricing-card rounded-[26px] bg-white border-2 border-teal-border/60 p-8 sm:p-9 flex flex-col justify-between shadow-fj-card">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
                    CLEAR PRICING
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-1">Pricing Guarantee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-heading text-navy">NO HIDDEN FEES</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-teal-deep">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% Upfront Estimate</span>
                  </div>
                  <p className="text-sm text-slate-600 font-body leading-relaxed">
                    Any applicable extras, such as additional pets or night surcharges, are shown in the estimate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-body italic">
            Pricing, VAT and surcharge details should be confirmed by the Global Pet Cab team before final publication.
          </p>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-white border-t border-teal-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              QUESTIONS PET PARENTS ASK
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Dubai Pet Taxi Questions, Answered
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line">
              Planning a ride for your pet? Here are some of the questions pet parents may have before booking.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-teal-deep' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 bg-[#F9FBFC]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="relative overflow-hidden text-white py-14 sm:py-16 bg-navy">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/60 to-navy/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-heading leading-tight">
            Your Pet&apos;s Next Ride Starts Here
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Whether your pet needs a ride across Dubai, a trip to the airport or help getting to an essential appointment, Global Pet Cab is here to make the journey easier from doorstep to destination.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href="#dubai-taxi-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all"
            >
              <span>Calculate My Fare →</span>
            </a>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
