'use client';

import React from 'react';
import Link from 'next/link';
import { Car, MessageCircle, Globe } from 'lucide-react';

export default function MobileStickyBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-modal px-3 py-2">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Dubai Pet Taxi Action */}
        <Link
          href="/dubai-pet-taxi"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold border border-brand-200 text-[11px] transition-all active:scale-95"
        >
          <Car className="w-4 h-4 text-brand-500 mb-0.5" />
          <span>Pet Taxi Ride</span>
        </Link>

        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%2C%20I%20would%20like%20to%20enquire"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-all shadow-sm active:scale-95"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>WhatsApp Us</span>
        </a>

        {/* International Quote */}
        <Link
          href="/international-pet-relocation"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-dark hover:bg-slate-800 text-white font-bold text-[11px] transition-all active:scale-95"
        >
          <Globe className="w-4 h-4 text-brand-400 mb-0.5" />
          <span>Int&apos;l Quote</span>
        </Link>

      </div>
    </div>
  );
}
