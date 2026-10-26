'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Car, Globe } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const TAXI_FAQS: FAQItem[] = [
  {
    question: 'How is my Dubai Pet Taxi fare calculated?',
    answer: 'Your fare is calculated dynamically based on actual driving road distance via mapping APIs, trip type (one-way or round-trip), number of pets, pickup time, and optional airport surcharges, plus 5% UAE VAT.',
  },
  {
    question: 'Can I accompany my pet during the ride?',
    answer: 'Yes! Up to 2 pet parents can ride alongside their pets in our pet taxis at no extra cost.',
  },
  {
    question: 'Are your vehicles climate-controlled and sanitized?',
    answer: 'Every Global Pet Cab vehicle features powerful dual air conditioning tailored for Dubai temperatures, anti-slip safety matting, sanitization between rides, and approved travel crates/harnesses.',
  },
  {
    question: 'Do you offer vet visit waiting options?',
    answer: 'Yes, for round trips (such as vet appointments or grooming visits), your driver can wait on-site. Waiting charges are calculated transparently and shown in your fare estimate.',
  },
  {
    question: 'Do you handle airport transfers to DXB and DWC?',
    answer: 'Yes, we provide specialized airport pickups and drops for pets traveling via Dubai International (DXB) and Al Maktoum International (DWC).',
  },
];

const INTL_FAQS: FAQItem[] = [
  {
    question: 'How early should I start planning an international pet relocation to/from Dubai?',
    answer: 'We recommend starting 2 to 4 months in advance, especially for destinations requiring Rabies Neutralizing Antibody Titer Tests (RNATT), export/import permit approvals, or specific health certificates.',
  },
  {
    question: 'Can you bring my pet INTO Dubai / UAE?',
    answer: 'Yes! We manage complete import formalities into Dubai including UAE Ministry of Climate Change and Environment (MOCCAE) import permits, customs clearing at DXB, and delivery to your Dubai address.',
  },
  {
    question: 'Do you supply IATA-compliant travel crates?',
    answer: 'Yes, we provide custom and standard IATA-certified plastic and wooden crates with proper ventilation, absorbent bedding, water bowls, and live animal labelling tailored to your pet’s exact dimensions.',
  },
  {
    question: 'How is international relocation priced?',
    answer: 'International relocation requires a custom quote because pricing depends on origin/destination cities, airline freight rates, pet dimensions/weight, crate size, and required export/import permits.',
  },
  {
    question: 'Can you manage complete door-to-door relocation?',
    answer: 'Yes! Our full-service relocation package handles doorstep pickup, veterinary inspection, documentation, export permits, airline booking, customs clearance, and home delivery.',
  },
];

export default function FAQAccordion() {
  const [activeTab, setActiveTab] = useState<'taxi' | 'international'>('taxi');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const currentFaqs = activeTab === 'taxi' ? TAXI_FAQS : INTL_FAQS;

  return (
    <section className="py-20 bg-white border-t border-teal-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
            <HelpCircle className="w-4 h-4" />
            Questions Pet Parents Ask
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600">
            Everything you need to know about our Dubai local rides and global relocation services.
          </p>
        </div>

        {/* Tab Switcher - FidoJet Style */}
        <div className="flex justify-center mb-10">
          <div className="bg-teal-soft p-2 rounded-2xl flex space-x-3 border border-teal-border">
            <button
              onClick={() => { setActiveTab('taxi'); setOpenIdx(0); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ${
                activeTab === 'taxi'
                  ? 'bg-teal-deep text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Car className="w-4 h-4" />
              Dubai Pet Taxi FAQs
            </button>

            <button
              onClick={() => { setActiveTab('international'); setOpenIdx(0); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ${
                activeTab === 'international'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Globe className="w-4 h-4" />
              International Relocation FAQs
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-teal-deep' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
