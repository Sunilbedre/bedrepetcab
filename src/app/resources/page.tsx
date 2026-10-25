import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileText, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pet Travel Knowledge Center — UAE Import/Export Guides',
  description: 'Comprehensive guides on relocating pets to/from Dubai, choosing IATA crates, and traveling to the vet in Dubai.',
};

const ARTICLES = [
  {
    title: 'How to Relocate a Pet to Dubai / UAE: Complete Step-by-Step Guide',
    date: 'Last reviewed: August 2026',
    category: 'UAE Pet Import',
    summary: 'Everything you need to know about MOCCAE import permits, microchipping, rabies blood titer (RNATT) testing, and customs clearing at DXB airport.',
  },
  {
    title: 'Moving a Pet OUT of Dubai: Export Permits & Airline Requirements',
    date: 'Last reviewed: August 2026',
    category: 'UAE Pet Export',
    summary: 'A step-by-step breakdown of obtaining MOCCAE exit health certificates, airline freight booking, and destination entry permits.',
  },
  {
    title: 'Choosing the Right IATA Travel Crate for Dogs & Cats',
    date: 'Last reviewed: August 2026',
    category: 'Crate Guidance',
    summary: 'How to measure your pet correctly (length, height, width) to ensure proper ventilation, comfort, and IATA airline compliance.',
  },
  {
    title: 'Dubai Pet Taxi Guide: Traveling to the Vet or Groomer Without a Car',
    date: 'Last reviewed: August 2026',
    category: 'Dubai Pet Taxi',
    summary: 'How to arrange safe, climate-controlled door-to-door ground transportation for your pet across Dubai.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-16 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30">
            <BookOpen className="w-4 h-4 text-teal-bright" />
            Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Pet Travel & Relocation Guides</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Updated regulatory advice, veterinary checklists, and travel tips for pet owners in Dubai.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art, idx) => (
            <div key={idx} className="bg-white p-8 sm:p-10 rounded-3xl border border-teal-border shadow-sm space-y-6 flex flex-col justify-between hover:shadow-fj-card transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="bg-teal-soft text-teal-deep font-extrabold px-3.5 py-1.5 rounded-full border border-teal-border">
                    {art.category}
                  </span>
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {art.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black font-heading text-navy leading-snug">{art.title}</h2>
                <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">{art.summary}</p>
              </div>

              <div className="pt-4 border-t border-teal-border">
                <Link href="/get-a-quote" className="text-sm font-extrabold font-heading text-teal-deep hover:text-teal-bright flex items-center gap-2">
                  <span>Read full guide & request assistance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
