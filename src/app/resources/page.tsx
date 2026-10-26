import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, Tag, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pet Travel & Relocation Guides — Global Pet Cab Dubai',
  description: 'Practical guides for pet parents planning a move, preparing for international travel, or arranging Dubai pet taxi transport.',
  keywords: 'pet import Dubai, pet export UAE, IATA pet crate, Dubai pet taxi, pet relocation Dubai',
};

const ARTICLES = [
  {
    num: '01',
    category: 'UAE Pet Import',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'How to Relocate a Pet to Dubai/UAE: A Practical Step-by-Step Guide',
    description: 'Planning to bring your dog or cat into Dubai? Learn how to approach the pet import process, from microchip and vaccination preparation to veterinary documents, UAE entry requirements and airport arrival arrangements.',
    focus: 'What pet parents should prepare before travelling to the UAE; the difference between an import journey and an export journey; veterinary preparation; required documentation; travel arrangements; and what to expect around arrival at the UAE airport.',
    keywords: ['pet import Dubai', 'pet relocation Dubai', 'pet relocation services Dubai', 'international pet relocation'],
    href: '/get-a-quote',
  },
  {
    num: '02',
    category: 'UAE Pet Export',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Moving a Pet Out of Dubai: UAE Export & Travel Guide',
    description: 'Moving abroad with your pet? Understand the main steps involved in exporting a pet from Dubai/UAE, including veterinary preparation, export documentation, airline arrangements and destination requirements.',
    focus: 'How to start an export journey from Dubai; veterinary preparation; UAE export documentation; airline and crate planning; destination-country requirements; airport arrangements; and why requirements can differ from one destination to another.',
    keywords: ['pet export UAE', 'pet relocation Dubai', 'international pet relocation', 'pet relocation services Dubai'],
    href: '/get-a-quote',
  },
  {
    num: '03',
    category: 'Crate Guidance',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Choosing the Right IATA Travel Crate for Dogs & Cats',
    description: 'The right travel crate is an important part of an international pet journey. Learn how to think about crate size, ventilation, space and comfort when preparing your pet for air travel.',
    focus: 'How to measure your pet correctly; choosing the right crate size; ventilation and space; food and water arrangements; preparing your pet for the crate; and checking the airline requirements for the specific journey.',
    keywords: ['IATA pet crate', 'IATA travel crate', 'pet travel crate', 'international pet relocation', 'pet transport Dubai'],
    href: '/get-a-quote',
  },
  {
    num: '04',
    category: 'Dubai Pet Taxi',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Dubai Pet Taxi Guide: Getting Your Pet to the Vet, Groomer or Airport',
    description: "Need to take your pet across Dubai but don't have a suitable way to travel? Learn how Dubai pet taxi services work and what to expect when arranging a safe, climate-controlled door-to-door ride.",
    focus: 'Everyday urban pet transit across Dubai; door-to-door veterinary clinic runs; grooming drop-offs; airport transfers (DXB/DWC); and round-trip ride coordination.',
    keywords: ['Dubai pet taxi', 'pet transport Dubai', 'dog taxi Dubai', 'cat taxi Dubai', 'vet transportation'],
    href: '/get-a-quote',
  },
];

export default function ResourcesPage() {
  return (
    <div className="font-body">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy to-navy-light opacity-95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase tracking-[0.16em] border border-teal-bright/30 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-teal-bright" />
            KNOWLEDGE BASE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black font-heading tracking-tight text-white leading-[1.15]">
            Pet Travel &amp; Relocation Guides
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-body">
            Practical guides for pet parents planning a move, preparing for international travel, or simply trying to get their pet around Dubai safely. Find clear information on UAE pet import and export, travel crates, Dubai pet taxi services and the practical steps that come before travel day.
          </p>
        </div>
      </section>

      {/* 4 GUIDES CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <div
              key={art.num}
              className="bg-white p-7 sm:p-9 rounded-[28px] border border-teal-border shadow-fj-card space-y-6 flex flex-col justify-between hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all"
            >
              <div className="space-y-5">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black font-heading text-teal-deep bg-teal-soft/80 px-2.5 py-1 rounded-lg">
                      {art.num}
                    </span>
                    <span className="bg-teal-soft text-teal-deep font-extrabold px-3 py-1 rounded-full border border-teal-border text-xs sm:text-sm">
                      {art.category}
                    </span>
                  </div>
                  <span className="text-slate-500 font-medium flex items-center gap-1.5 text-xs sm:text-sm">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {art.reviewLabel}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black font-heading text-navy leading-snug">
                  {art.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
                  {art.description}
                </p>

                {/* Recommended Article Focus */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5">
                  <span className="text-xs font-extrabold font-heading uppercase tracking-wider text-teal-deep flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-deep" />
                    Recommended Article Focus
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                    {art.focus}
                  </p>
                </div>

                {/* SEO Keywords */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-extrabold font-heading uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    SEO Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {art.keywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-100/90 rounded-md px-2.5 py-1 border border-slate-200/50"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-5 border-t border-slate-100">
                <Link
                  href={art.href}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold font-heading text-teal-deep hover:text-navy group transition-colors"
                >
                  <span>Read the full guide &amp; request assistance</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
