'use client';

import React, { useState } from 'react';
import { ShieldCheck, Globe, MessageCircle, ArrowRight, Car, MapPin, Phone, CheckCircle2, Plane } from 'lucide-react';

export default function HeroServiceSelector() {
  const [moveType, setMoveType] = useState('dubai_taxi');
  const [movingFrom, setMovingFrom] = useState('Dubai, UAE');
  const [movingTo, setMovingTo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (moveType === 'dubai_taxi') {
      const calcElement = document.getElementById('dubai-taxi-calculator');
      if (calcElement) {
        calcElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const intlElement = document.getElementById('international-quote-form');
      if (intlElement) {
        intlElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative bg-[#052D49] text-white pt-12 sm:pt-16 pb-24 lg:pb-32 font-body">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Grid: Left Text + Right Globe Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pb-8 sm:pb-14">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Kick Badge - FidoJet Style */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold font-heading tracking-widest text-[#7FDBE5] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0FA3B1] animate-pulse"></span>
              DUBAI&apos;S TRUSTED PET RELOCATION TEAM
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-heading text-white tracking-tight leading-[1.08]">
              Wherever you&apos;re moving, your pet gets there safely.
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl">
              Cargo safety, customs paperwork, the right crate, the timing &mdash; we handle the entire journey end to end, so you can focus on the reunion. One team that owns your pet&apos;s trip from first call to safe arrival.
            </p>

            {/* Pill Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A3A5C] border border-[#0FA3B1]/30 text-[#7FDBE5] text-xs sm:text-sm font-bold font-heading">
                <ShieldCheck className="w-4 h-4 text-[#0FA3B1]" />
                IATA-compliant handling
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A3A5C] border border-[#0FA3B1]/30 text-[#7FDBE5] text-xs sm:text-sm font-bold font-heading">
                <Globe className="w-4 h-4 text-[#0FA3B1]" />
                40+ countries
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#dubai-taxi-calculator"
                className="inline-flex items-center justify-center gap-2.5 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral text-base sm:text-lg transition-all transform active:scale-95"
              >
                <span>Get a free quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/15 text-white font-extrabold font-heading px-7 py-4 rounded-full border border-white/20 backdrop-blur-md text-base sm:text-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: FidoJet Clean Vector Globe Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Clean FidoJet Globe Vector SVG */}
              <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-xl">
                <defs>
                  <style>{`
                    @keyframes rotateGlobeGrid {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    @keyframes dashMove {
                      0% { stroke-dashoffset: 100; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .globe-grid-spin {
                      transform-origin: 250px 250px;
                      animation: rotateGlobeGrid 90s linear infinite;
                    }
                    .route-dash-animated {
                      stroke-dasharray: 6 4;
                      animation: dashMove 3s linear infinite;
                    }
                  `}</style>
                </defs>

                {/* Outer Globe Circle Ring */}
                <circle cx="250" cy="250" r="215" fill="#041A2C" stroke="#0FA3B1" strokeWidth="1.5" opacity="0.6" />
                <circle cx="250" cy="250" r="208" fill="#052D49" stroke="#0C7F8A" strokeWidth="2" opacity="0.95" />

                {/* Grid Ellipses */}
                <g className="globe-grid-spin" opacity="0.3">
                  <ellipse cx="250" cy="250" rx="208" ry="60" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <ellipse cx="250" cy="250" rx="208" ry="120" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <ellipse cx="250" cy="250" rx="208" ry="170" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <ellipse cx="250" cy="250" rx="60" ry="208" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <ellipse cx="250" cy="250" rx="120" ry="208" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <ellipse cx="250" cy="250" rx="170" ry="208" stroke="#7FDBE5" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                </g>

                {/* Flat Solid Continent Shapes */}
                <g opacity="0.85">
                  {/* Europe & Africa */}
                  <path d="M 180 130 Q 240 100, 300 120 T 360 170 Q 380 240, 340 310 T 250 380 Q 180 340, 170 250 Z" fill="#0C7F8A" opacity="0.8" />
                  {/* Arabian Peninsula / UAE Dubai Highlight */}
                  <path d="M 290 205 Q 320 195, 335 220 T 310 250 Q 290 240, 290 205 Z" fill="#0FA3B1" opacity="0.95" />
                  {/* India Subcontinent */}
                  <path d="M 345 220 Q 375 215, 395 255 T 355 285 Z" fill="#0C7F8A" opacity="0.8" />
                </g>

                {/* Dotted Flight Arcs */}
                {/* Dubai (320, 210) to London (200, 135) */}
                <path d="M 320 210 Q 260 90, 200 135" fill="none" stroke="#FB6F4C" strokeWidth="3" strokeLinecap="round" className="route-dash-animated" />

                {/* Dubai (320, 210) to Frankfurt (230, 120) */}
                <path d="M 320 210 Q 275 130, 230 120" fill="none" stroke="#7FDBE5" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.8" />

                {/* Dubai (320, 210) to Delhi (375, 220) */}
                <path d="M 320 210 Q 345 190, 375 220" fill="none" stroke="#7FDBE5" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.8" />

                {/* Dubai Node Marker */}
                <circle cx="320" cy="210" r="6" fill="#FB6F4C" />
                <circle cx="320" cy="210" r="12" fill="none" stroke="#FB6F4C" strokeWidth="1.5" opacity="0.7">
                  <animate attributeName="r" values="7;18;7" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Destination Nodes */}
                <circle cx="200" cy="135" r="4.5" fill="#7FDBE5" />
                <circle cx="230" cy="120" r="4" fill="#7FDBE5" />
                <circle cx="375" cy="220" r="4.5" fill="#7FDBE5" />

                {/* Animated Airplane */}
                <g transform="translate(255, 130) rotate(-30)">
                  <path d="M 0 0 L 12 -4 L 8 0 L 12 4 Z" fill="#FFFFFF" />
                </g>
              </svg>

            </div>

            {/* Live Route Legend beneath Globe */}
            <div className="mt-3 text-center space-y-1">
              <div className="text-sm font-extrabold font-heading text-white flex items-center justify-center gap-2">
                <span className="font-mono text-white font-extrabold">DXB → LHR</span>
                <span className="text-slate-300 font-medium text-xs">Dubai to London</span>
              </div>
              <div className="text-[11px] font-black tracking-widest text-[#7FDBE5] uppercase flex items-center justify-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#0FA3B1]" />
                <span>LIVE ROUTES FROM <strong className="text-white">DUBAI</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* FLOATING QUICK ESTIMATE CARD (50% Overlapping boundary into next section) */}
        <div className="relative z-30 translate-y-1/2 -mt-6 sm:-mt-8 lg:-mt-10">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-border text-navy max-w-7xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h3 className="text-xl sm:text-2xl font-black font-heading text-navy">
                Start your free estimate
              </h3>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Takes ~60 seconds &middot; no obligation &middot; we reply fast</span>
              </div>
            </div>

            {/* FidoJet 5-Column Inline Form Row */}
            <form onSubmit={handleQuickEstimate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              
              {/* Field 1: Move type */}
              <div className="space-y-1.5">
                <label className="fj-label text-xs">Move type</label>
                <select
                  value={moveType}
                  onChange={(e) => setMoveType(e.target.value)}
                  className="fj-select text-xs sm:text-sm h-[48px]"
                >
                  <option value="dubai_taxi">Dubai Pet Taxi (Local)</option>
                  <option value="international">International Relocation</option>
                </select>
              </div>

              {/* Field 2: Moving from */}
              <div className="space-y-1.5">
                <label className="fj-label text-xs">Moving from</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    type="text"
                    value={movingFrom}
                    onChange={(e) => setMovingFrom(e.target.value)}
                    placeholder="City, country"
                    className="fj-input pl-10 text-xs sm:text-sm h-[48px]"
                    required
                  />
                </div>
              </div>

              {/* Field 3: Moving to */}
              <div className="space-y-1.5">
                <label className="fj-label text-xs">Moving to</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    type="text"
                    value={movingTo}
                    onChange={(e) => setMovingTo(e.target.value)}
                    placeholder="City, country or vet clinic"
                    className="fj-input pl-10 text-xs sm:text-sm h-[48px]"
                    required
                  />
                </div>
              </div>

              {/* Field 4: Phone number */}
              <div className="space-y-1.5">
                <label className="fj-label text-xs">Phone number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className="fj-input pl-10 text-xs sm:text-sm h-[48px]"
                  />
                </div>
              </div>

              {/* Field 5: Inline Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-coral hover:bg-coral-hover text-white font-extrabold font-heading h-[48px] px-6 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-sm transition-all transform active:scale-98"
                >
                  <span>Get my estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
