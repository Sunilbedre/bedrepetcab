import React from 'react';
import { ShieldCheck, Star, HeartHandshake, Globe2 } from 'lucide-react';

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-teal-border pt-32 sm:pt-36 lg:pt-44 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-teal-border">
          
          <div className="flex flex-col items-center justify-center p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-500 font-heading font-extrabold text-xl sm:text-2xl">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Verified Google Rating</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Based on real pet parent reviews</div>
          </div>

          <div className="flex flex-col items-center justify-center p-3 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <HeartHandshake className="w-6 h-6" />
              <span>2,000+ Pets</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Safely Transported</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Dubai taxi rides & global flights</div>
          </div>

          <div className="flex flex-col items-center justify-center p-3 space-y-1">
            <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
              <Globe2 className="w-6 h-6" />
              <span>45+ Countries</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Global Network</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">IATA & MOCCAE compliant</div>
          </div>

          <div className="flex flex-col items-center justify-center p-3 space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-heading font-extrabold text-xl sm:text-2xl">
              <ShieldCheck className="w-6 h-6" />
              <span>100% Climate Fleet</span>
            </div>
            <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Sanitized Vehicles</div>
            <div className="text-xs sm:text-sm text-slate-600 font-body">Trained pet handlers</div>
          </div>

        </div>
      </div>
    </div>
  );
}
