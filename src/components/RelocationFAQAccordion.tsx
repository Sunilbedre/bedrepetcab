'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const RELOCATION_FAQS: FAQItem[] = [
  {
    question: 'What is international pet relocation?',
    answer:
      'It is the process of moving a pet between countries while coordinating the travel, veterinary, documentation and other requirements that apply to the route.',
  },
  {
    question: 'Do you handle pet export and pet import?',
    answer:
      "Global Pet Cab's international service is designed to support both directions. A pet travelling from the UAE to another country is an export journey, while a pet entering the UAE from another country is an import journey.",
  },
  {
    question: 'Can you relocate my pet from Dubai to another country?',
    answer:
      "Yes. Global Pet Cab's international relocation service supports journeys from Dubai/UAE to destinations worldwide, with the exact requirements depending on the destination and travel plan.",
  },
  {
    question: 'Can you help bring my pet into Dubai?',
    answer:
      'Yes. Pet import into Dubai can involve country-of-origin requirements, veterinary preparation, documentation, airline arrangements and arrival procedures. The exact requirements depend on the route.',
  },
  {
    question: 'What documents will my pet need?',
    answer:
      'Requirements vary by destination and route. Depending on the journey, they may include vaccination records, microchip information, veterinary certificates, permits and other travel documents.',
  },
  {
    question: 'Does my pet need a travel crate?',
    answer:
      'International airline travel may require an airline-approved or IATA-compliant travel crate. The correct crate and preparation depend on your pet, airline and route.',
  },
  {
    question: 'Can you help with airline arrangements?',
    answer:
      'Airline and travel coordination can form part of the relocation service, subject to the route, airline and selected service.',
  },
  {
    question: 'Can you help with airport transfers in Dubai?',
    answer:
      'Yes. Local pet transportation can connect your home or another agreed pickup point with the airport as part of the wider travel journey.',
  },
  {
    question: 'What if I cannot take my pet to a grooming or health appointment before travel?',
    answer:
      'Selected local transportation and appointment support may be available when the pet parent cannot be there, subject to the service arrangement.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Start with the relocation form and share your origin, destination and tentative travel date. The team can then review the route and the services your pet may need.',
  },
];

export default function RelocationFAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {RELOCATION_FAQS.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft/50 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-teal-deep' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/40 pt-4 animate-fade-in-up">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
