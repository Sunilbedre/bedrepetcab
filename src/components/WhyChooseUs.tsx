import React from 'react';
import { Heart, Calculator, Globe2, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Heart,
      title: 'Pet-First Decisions',
      desc: 'Every ride and flight plan prioritizes your pet’s physical comfort, hydration, and stress reduction.',
    },
    {
      icon: Calculator,
      title: 'Transparent Instant Pricing',
      desc: 'No hidden surprise fees. Calculate estimated Dubai Pet Taxi fares instantly based on real driving distance.',
    },
    {
      icon: Globe2,
      title: 'Local Dubai + Global Reach',
      desc: 'One unified team managing local Dubai door-to-door rides and cross-border international moves.',
    },
    {
      icon: ShieldCheck,
      title: 'Sanitized Climate Fleet',
      desc: 'Specially converted vehicles with dual climate control suitable for extreme Dubai temperatures.',
    },
    {
      icon: UserCheck,
      title: 'Certified Pet Handlers',
      desc: 'Trained staff experienced in handling anxious pets, brachycephalic breeds, and multi-pet families.',
    },
    {
      icon: MessageSquare,
      title: 'Direct WhatsApp Support',
      desc: 'Speak directly with real relocation specialists and receive live updates throughout your pet’s ride.',
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
            Combining Warmth with Logistics Rigor
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600">
            We understand that your pet is family. Here is how we ensure their safety and peace of mind on every journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
