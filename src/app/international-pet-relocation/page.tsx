import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Plane, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Car,
  Box,
  HeartHandshake,
  Compass,
  Sparkles,
  Award,
  Check
} from 'lucide-react';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';
import RelocationFAQAccordion from '@/components/RelocationFAQAccordion';

export const metadata: Metadata = {
  title: 'International Pet Relocation — Global Pet Cab Dubai',
  description: "Moving a pet to another country? Global Pet Cab helps plan and coordinate your pet's international journey from Dubai to worldwide destinations.",
};

// Section 3: More Than Getting Your Pet on a Flight (6 Icon Boxes)
const SCOPE_ITEMS = [
  {
    icon: Compass,
    title: 'Route & Travel Planning',
    desc: 'We look at your origin, destination and travel plans to understand the practical requirements of the journey.',
  },
  {
    icon: HeartHandshake,
    title: 'Veterinary Preparation',
    desc: 'Support around the veterinary checks, vaccinations, tests and health documents required for your route, where applicable.',
  },
  {
    icon: Box,
    title: 'Travel Crate Preparation',
    desc: "Guidance on the right travel crate and preparation for your pet's journey, based on airline and route requirements.",
  },
  {
    icon: FileText,
    title: 'Export & Import Support',
    desc: 'Help with the relevant export or import documentation and country-specific requirements for the journey.',
  },
  {
    icon: Plane,
    title: 'Airline & Airport Coordination',
    desc: 'Support with airline arrangements and the airport logistics involved in getting your pet ready to travel.',
  },
  {
    icon: ShieldCheck,
    title: 'Arrival & Handover',
    desc: 'Support with the arrival process and agreed handover arrangements so the journey continues smoothly after landing.',
  },
];

// Section 5: Process Steps (6 Steps)
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Route',
    desc: 'We start with where your pet is travelling from, where they are going and when you are planning to travel.',
  },
  {
    step: '02',
    title: 'Build the Travel Plan',
    desc: 'We identify the key veterinary, documentation, crate, airline and travel requirements that apply to your route.',
  },
  {
    step: '03',
    title: 'Prepare Your Pet',
    desc: 'We help you understand and coordinate the preparation your pet needs before departure.',
  },
  {
    step: '04',
    title: 'Get the Paperwork in Order',
    desc: 'We support the relevant export, import and travel documentation required for the journey.',
  },
  {
    step: '05',
    title: 'Coordinate the Travel',
    desc: "We help bring together the flight and airport arrangements selected for your pet's relocation.",
  },
  {
    step: '06',
    title: 'Get Them Where They Need to Be',
    desc: 'We support the agreed arrival and handover process so your pet can continue safely to their new destination.',
  },
];

// Section 7: Popular Worldwide Routes
const WORLDWIDE_DESTINATIONS = [
  { label: 'Dubai ↔ India', link: '/destinations/dubai-to-india' },
  { label: 'Dubai ↔ UK', link: '/destinations/dubai-to-uk' },
  { label: 'Dubai ↔ USA', link: '/destinations/dubai-to-usa' },
  { label: 'Dubai ↔ Canada', link: '/destinations/dubai-to-canada' },
  { label: 'Dubai ↔ Australia', link: '/destinations/dubai-to-australia' },
  { label: 'Other international destinations', link: '#international-quote-form' },
];

// Section 8: Why Choose Us (5 items)
const WHY_CHOOSE_US_ITEMS = [
  {
    icon: Compass,
    title: 'A Route-First Approach',
    desc: 'We start with your actual journey rather than giving every customer the same checklist.',
  },
  {
    icon: HeartHandshake,
    title: 'Support Across the Journey',
    desc: 'From preparation and local transport to airport coordination and arrival support, the service can connect the different stages of the move.',
  },
  {
    icon: Sparkles,
    title: 'Clear Communication',
    desc: 'You should know what is happening next, what information is needed and which parts of the journey require your attention.',
  },
  {
    icon: Car,
    title: 'Local + International Mobility',
    desc: 'International relocation can connect naturally with local pet taxi, airport and appointment transportation.',
  },
  {
    icon: Award,
    title: 'Professional Industry Recognition',
    desc: 'If confirmed, IPATA membership can be highlighted here alongside other verified credentials and handling standards.',
  },
];

export default function InternationalPetRelocationPage() {
  return (
    <div className="font-body space-y-0 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
            alt="International Pet Relocation"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/55" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
            <Globe className="w-3.5 h-3.5" />
            INTERNATIONAL PET RELOCATION
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            International Pet Relocation, Wherever Your Pet Is Going
          </h1>

          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
              Moving a pet to another country is a big move for the whole family. There are flights to plan, veterinary requirements to understand, documents to prepare and a lot of small details that need to come together at the right time.
            </p>
            <p className="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
              Global Pet Cab helps you plan and coordinate your pet&apos;s international journey, from the first route discussion and travel preparation to airport arrangements and arrival support.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs sm:text-sm font-bold text-teal-light">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              International Pet Relocation
            </span>
            <span className="text-white/40">|</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              Route-Specific Planning
            </span>
            <span className="text-white/40">|</span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
              Pet Transport Support
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="#international-quote-form"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              Get a Free Relocation Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          <div className="pt-2 text-[11px] sm:text-xs text-slate-400">
            *IPATA Member — verified international live animal handling standards
          </div>
        </div>
      </section>

      {/* 2. QUOTE FORM SECTION */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-teal-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <InternationalQuoteForm />
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION: More Than Getting Your Pet on a Flight */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              <ShieldCheck className="w-4 h-4 text-teal-deep" />
              FULL-JOURNEY CARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              More Than Getting Your Pet on a Flight
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              A successful pet relocation is about much more than booking a ticket. The right preparation starts well before departure and can continue until your pet reaches their new home.
            </p>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-body">
              We help bring the moving parts together around your route, so you have a clearer idea of what needs to happen, when it needs to happen and where our team can support you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SCOPE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-50 border border-teal-border/70 hover:bg-white hover:shadow-fj-card hover:border-teal-deep/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border group-hover:bg-teal-deep group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DIRECTION SECTION: Export or Import? */}
      <section className="py-20 sm:py-24 bg-teal-soft/40 border-y border-teal-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
              EXPORT OR IMPORT? START WITH YOUR DIRECTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              The Journey Depends on Where Your Pet Is Going
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              International pet travel looks different depending on the direction of the move. That&apos;s why we make this the first choice in the quote journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Direction 1: Export */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 text-navy font-bold text-xs">
                <Plane className="w-4 h-4 text-teal-deep" />
                UAE EXPORT
              </div>
              <h3 className="text-2xl font-black font-heading text-navy">
                Moving FROM Dubai / UAE
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Your pet is leaving the UAE for another country. This is an export journey, and the requirements will depend on the destination, airline and your pet&apos;s circumstances.
              </p>
            </div>

            {/* Direction 2: Import */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-teal-border shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-soft text-teal-deep font-bold text-xs border border-teal-border">
                <Plane className="w-4 h-4 text-teal-deep rotate-90" />
                UAE IMPORT
              </div>
              <h3 className="text-2xl font-black font-heading text-navy">
                Moving INTO Dubai / UAE
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Your pet is travelling from another country into the UAE. This is an import journey, with entry requirements that depend on the country of origin and the applicable UAE rules.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-500 font-medium">
              For other origin and destination combinations, the relocation team can review the route and advise on the next steps.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROCESS STEPS: HOW WE HELP MANAGE THE JOURNEY */}
      <section className="py-20 sm:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
              One Journey. Many Details. One Team to Coordinate Them.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body">
              International pet travel can feel overwhelming because there is rarely just one thing to organise. Our role is to help you bring the important pieces together without losing sight of the most important part — your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-bright/40 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-black font-heading text-teal-bright">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-black font-heading text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BANNER WITH BACKGROUND IMAGE: Need Help Before Your Pet Flies? */}
      <section className="relative overflow-hidden text-white py-24 sm:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Pet Taxi Service"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
            <Car className="w-4 h-4 text-teal-bright" />
            LOCAL PICKUP & APPOINTMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
            Need Help Before Your Pet Flies?
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
              Sometimes the international journey starts days or weeks before the airport. If you are not available, selected local pet transportation services can help your pet get to grooming or health-related appointments before travel, subject to the service arrangement.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
              For Dubai-based customers, we can also connect the local part of the journey with airport transportation, helping your pet get from home or another agreed location to the airport.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dubai-pet-taxi"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base"
            >
              Explore Dubai Pet Taxi
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WORLDWIDE DESTINATIONS: From Dubai to the World */}
      <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              DUBAI ↔ WORLDWIDE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              From Dubai to the World, and Back Again
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Whether you are moving home, relocating for work, returning to your home country or bringing your pet to join you in Dubai, the journey starts with understanding your route.
            </p>
            <p className="text-sm font-bold text-navy pt-2">
              Explore our destination guides for route-specific information and requirements:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {WORLDWIDE_DESTINATIONS.map((dest, idx) => (
              <Link
                key={idx}
                href={dest.link}
                className="p-5 rounded-2xl border border-teal-border bg-slate-50 hover:bg-teal-deep hover:text-white text-navy font-extrabold font-heading text-sm text-center transition-all duration-200 shadow-2xs hover:shadow-md flex items-center justify-center min-h-[72px]"
              >
                <span>{dest.label}</span>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto italic">
            Each destination carries route-specific country requirements, documentation rules and airline considerations.
          </p>
        </div>
      </section>

      {/* 8. WHY CHOOSE US (ICON BOXES): Professional Support, With Your Pet at the Centre */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border">
              WHY PET PARENTS CHOOSE US
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Professional Support, With Your Pet at the Centre
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              There is a lot to think about when your pet is crossing borders. We want the process to feel clear, organised and personal — not like you are trying to piece together a complicated journey on your own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black font-heading text-navy">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FAQS ACCORDION: International Pet Relocation Questions, Answered */}
      <section className="py-20 sm:py-24 bg-white border-t border-teal-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
              QUESTIONS PET PARENTS ASK
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              International Pet Relocation Questions, Answered
            </h2>
            <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
              Every international move has its own requirements. These answers give you a starting point before you request a route-specific quote.
            </p>
          </div>

          <RelocationFAQAccordion />
        </div>
      </section>

      {/* 10. FINAL CTA: Your Pet's Next Journey Starts With a Conversation */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
            PLANNING A MOVE?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
            Your Pet&apos;s Next Journey Starts With a Conversation
          </h2>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
            Tell us where your pet is coming from, where they are going and when you hope to travel. We&apos;ll help you understand the journey ahead and the next steps to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#international-quote-form"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              Get a Free Relocation Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
