import React from 'react';
import { Heart, Calculator, Globe2, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Heart,
      title: 'Pet-First Decisions',
      desc: "Every ride and relocation plan is built around your pet's comfort, hydration and stress reduction.",
    },
    {
      icon: Calculator,
      title: 'Transparent Pet Taxi Pricing',
      desc: 'Get an estimated Dubai pet taxi fare based on actual driving distance, with clear pricing and no surprise fees.',
    },
    {
      icon: Globe2,
      title: 'Local Dubai + Global Reach',
      desc: 'One team for Dubai pet transport, airport transfers and international pet relocation.',
    },
    {
      icon: ShieldCheck,
      title: 'IPATA Membership',
      desc: 'As an IPATA member, Global Pet Cab is part of a professional network focused on pet transportation and relocation.',
    },
  ];

  return (
    <section className="py-20 bg-teal-soft/50 border-t border-teal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-sm">
            Why Pet Parents Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
            Pet-First Care With End-to-End Relocation Support
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600">
            From local pet transport in Dubai to international relocation, we combine careful pet handling with organised travel logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-teal-border shadow-sm hover:shadow-fj-card transition-all space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center border border-teal-border">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-black font-heading text-lg sm:text-xl text-navy">{item.title}</h3>
                <p className="text-sm sm:text-base font-body text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
