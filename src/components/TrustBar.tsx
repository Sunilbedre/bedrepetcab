/**
 * DEV ONLY — not used by Hostinger / npm run dev.
 * For live site badges edit live/trust-badges.json and run: npm run sync:live
 */
import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Globe2 } from 'lucide-react';

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-teal-border pt-32 sm:pt-36 lg:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-teal-border">
          <div className="flex flex-col items-center justify-center p-2 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <Award className="w-6 h-6" />
              <span>IPATA</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">IPATA Member</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Accredited pet transport association</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <ShieldCheck className="w-6 h-6" />
              <span>IATA</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy leading-tight">
              IATA-Compliant Handling
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Live animal regulations &amp; crates</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <Globe2 className="w-6 h-6" />
              <span>45+ Countries</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Global Network</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">IATA &amp; MOCCAE compliant</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <HeartHandshake className="w-6 h-6" />
              <span>2,000+</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Pets Transported</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Dubai taxi rides &amp; global flights</div>
          </div>
        </div>
      </div>
    </div>
  );
}
