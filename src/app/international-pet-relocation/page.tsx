import React from 'react';
import { Metadata } from 'next';
import { Globe, Plane, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'International Pet Relocation Dubai — Export & Import Services',
  description: 'Expert international pet relocation between Dubai and worldwide destinations (UK, India, USA, Canada, Australia, Europe). MOCCAE permits, IATA crates, and customs.',
};

export default function InternationalPetRelocationPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30">
            <Globe className="w-4 h-4 text-teal-bright" />
            Cross-Border Logistics
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            International Pet Relocation — Dubai ↔ Worldwide
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-body">
            Full-service pet moving solutions covering export/import permits, IATA travel crates, veterinary blood tests, airline approvals, and customs clearing.
          </p>
        </div>
      </section>

      {/* Main Quote Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <InternationalQuoteForm />
      </section>

      {/* Process Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy">How We Manage Your Pet&apos;s International Journey</h2>
          <p className="text-base sm:text-lg text-slate-600 font-body">Six structured steps for complete peace of mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Route & Regulatory Review', desc: 'We verify destination country import rules, rabies titer requirements, and flight options.' },
            { step: '02', title: 'Veterinary Preparation', desc: 'Coordination of ISO microchip, vaccinations, blood testing (RNATT), and health certificates.' },
            { step: '03', title: 'IATA Crate Sizing & Fitting', desc: 'Custom assembly of IATA-compliant crates with proper ventilation, bedding, and water bowls.' },
            { step: '04', title: 'Government Permits', desc: 'Filing and securing UAE MOCCAE export/import permits and destination customs documentation.' },
            { step: '05', title: 'Airline Freight Booking', desc: 'Booking climate-controlled live animal cargo space with premier international carriers.' },
            { step: '06', title: 'Destination Handover', desc: 'Customs clearance at destination airport and doorstep handover to your new home.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-teal-border shadow-sm space-y-4">
              <div className="text-3xl font-black text-teal-deep font-mono">{item.step}</div>
              <h3 className="font-black font-heading text-xl text-navy">{item.title}</h3>
              <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion />
    </div>
  );
}
