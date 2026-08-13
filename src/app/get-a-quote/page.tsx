import React from 'react';
import { Metadata } from 'next';
import ChauffurBookingWizard from '@/components/ChauffurBookingWizard';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Get a Quote & Book — Global Pet Cab Dubai',
  description: 'Book your Dubai Pet Taxi or request an international pet relocation quote using our step-by-step interactive booking form.',
};

export default function GetAQuotePage() {
  return (
    <div className="space-y-12 py-6 font-body">
      
      {/* Interactive Multi-Step Booking Wizard */}
      <section className="bg-slate-50/50 py-4">
        <ChauffurBookingWizard />
      </section>

      {/* Categorized FAQs */}
      <FAQAccordion />

    </div>
  );
}
