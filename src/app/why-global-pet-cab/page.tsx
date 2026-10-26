import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Calculator, Globe2, ShieldCheck, UserCheck, MessageSquare, ArrowRight, MessageCircle, HeartHandshake } from 'lucide-react';
import TrustBar from '@/components/TrustBar';

export const metadata: Metadata = {
  title: 'Why Global Pet Cab — Safety, Transparency & Certified Care',
  description: 'Discover why pet owners in Dubai trust Global Pet Cab for local taxi rides and international relocation.',
};

const cards = [
  {
    num: '01',
    title: 'Pet-First Decisions',
    copy: "Every journey starts with the pet, not just the route. We consider your pet's comfort, handling needs and the practical details of the journey before the ride or relocation is arranged.",
    humanLine: 'Because the easiest journey on paper is not always the easiest one for a pet.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    alt: 'Pets resting comfortably together',
    icon: Heart,
  },
  {
    num: '02',
    title: 'Transparent Pricing',
    copy: 'You should not have to guess what a pet taxi ride will cost. For Dubai pet taxi services, estimated fares are based on the journey details and actual driving distance, giving you a clearer idea of the cost before you book.',
    humanLine: 'Clear information makes it easier to make the right decision for your pet.',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80',
    alt: 'City transfer on the road',
    icon: Calculator,
  },
  {
    num: '03',
    title: 'Local Dubai + Global Reach',
    copy: 'Sometimes your pet simply needs to get across Dubai. Other times, they need to cross a border with you. Global Pet Cab supports both — from local pet transport, vet and grooming trips and airport transfers to international pet relocation to and from Dubai.',
    humanLine: 'One pet. One journey. Wherever that journey needs to go.',
    img: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80',
    alt: 'International flight above the clouds',
    icon: Globe2,
  },
  {
    num: '04',
    title: 'Climate-Controlled Fleet',
    copy: "Dubai's climate is part of the journey. Our pet transport vehicles are designed to provide a controlled, comfortable environment for pets travelling across the city.",
    humanLine: 'Because your pet should never have to choose between getting there and staying comfortable.',
    img: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=900&q=80',
    alt: 'Pet looking out from a climate-controlled vehicle',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Experienced Pet Handlers',
    copy: 'Pets do not all travel the same way. Some are confident, some are nervous, and some need a little more attention along the way. Our team is trained to handle pets carefully and responsibly, including different breeds, anxious pets and multi-pet families.',
    humanLine: 'Patience matters when your passenger has four legs and cannot tell you how they are feeling.',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    alt: 'Handler with a golden retriever',
    icon: UserCheck,
  },
  {
    num: '06',
    title: 'Direct WhatsApp Support',
    copy: "Questions do not always come during office hours. With direct WhatsApp communication, pet parents have a simple way to speak with the team, share information and stay connected about their pet's journey.",
    humanLine: "Sometimes you just want to ask, 'How is my pet?' — and know who to ask.",
    img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    alt: 'Team coordinating live pet travel updates',
    icon: MessageSquare,
  },
];

export default function WhyUsPage() {
  return (
    <div className="font-body">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28 lg:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy/75 to-navy/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">
              WHY PET PARENTS CHOOSE US
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-heading tracking-tight leading-[1.1]">
              Why Global Pet Cab
            </h1>
            <p className="text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              Your pet is part of the family. So when they travel, you want more than a vehicle, a booking or a flight plan. You want people who understand the responsibility that comes with moving them. Global Pet Cab brings together local pet transport in Dubai and international pet relocation, with the practical planning and personal care each journey needs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-teal-light text-xs sm:text-sm font-bold font-heading">
                <Heart className="w-4 h-4" />
                Pet-First Decisions
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-teal-light text-xs sm:text-sm font-bold font-heading">
                <Calculator className="w-4 h-4" />
                Transparent Pet Taxi Pricing
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-teal-light text-xs sm:text-sm font-bold font-heading">
                <ShieldCheck className="w-4 h-4" />
                IPATA Membership
              </span>
            </div>
          </div>

          <div className="relative z-30 translate-y-1/2 mt-10">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* 2. MAIN SECTION: WHY PET PARENTS CHOOSE US + 6 CARDS */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-20 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em] mb-3">
              WHY PET PARENTS CHOOSE US
            </p>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
              Combining Warmth with Logistics Rigor
            </h2>
            <div className="mt-4 text-base sm:text-lg text-slate-600 space-y-3 leading-relaxed">
              <p>
                We understand that your pet is family. And when a family member is travelling, the details matter.
              </p>
              <p>
                From a short Dubai pet taxi ride to a move across borders, there is always more happening behind the scenes than the journey itself. Our role is to bring the practical side of pet transport and relocation together with careful handling, clear communication and attention to the individual journey.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8">
            {cards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[32px] bg-white border border-teal-border shadow-fj-card ${
                    idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative lg:col-span-5 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
                  </div>

                  <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-black font-heading text-teal-deep tabular-nums">
                        {item.num}
                      </span>
                      <span className="w-10 h-10 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center">
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-navy tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                      {item.copy}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-start gap-2.5">
                      <span className="inline-flex items-center text-teal-deep shrink-0 mt-0.5">
                        <HeartHandshake className="w-4 h-4 text-teal-deep" />
                      </span>
                      <p className="text-sm sm:text-[15px] font-semibold text-teal-900/90 italic leading-snug">
                        {item.humanLine}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="relative overflow-hidden text-white py-20 sm:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/78" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy/45 to-navy/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">
            OFFICIAL DUBAI PET MOBILITY &amp; RELOCATION LOGISTICS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-3xl mx-auto leading-tight">
            Instant city ride estimates or expert international pet relocation assistance.
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral"
            >
              Get a Free Quote →
            </Link>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full"
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
