'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, Globe, MessageCircle, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white font-heading border-b border-teal-border shadow-fj-header transition-shadow">
      {/* Top Banner - Dubai UAE Focus */}
      <div className="bg-navy border-b border-navy-dark text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-bright animate-pulse"></span>
              Official Dubai Pet Mobility & Relocation Logistics
            </span>
            <span className="text-navy-muted">|</span>
            <span className="text-teal-light font-mono text-[11px] font-bold">globalpetcab.ae</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-teal-light hover:text-white transition-colors font-bold text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Dubai: +971 50 123 4567
            </a>
            <span className="text-navy-muted">|</span>
            <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors text-[11px]">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Inner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[74px]">
          
          {/* Logo Lockup - FidoJet Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-deep text-white flex items-center justify-center shadow-sm group-hover:bg-teal-bright transition-colors">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-navy flex items-center gap-1.5">
                <span>GLOBAL PET CAB</span>
                <span className="text-[10px] bg-teal-soft text-teal-deep font-black px-1.5 py-0.5 rounded border border-teal-border">
                  DUBAI
                </span>
              </div>
              <div className="text-[10px] font-bold tracking-widest text-teal-deep uppercase -mt-1">
                PET TAXI & RELOCATION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 font-semibold text-[15px] text-navy-muted">
            
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all">
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isServicesOpen ? 'rotate-180 text-teal-deep' : ''}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-fj-card-hover border border-teal-border p-2 space-y-1 animate-fade-in-up z-50">
                  <Link
                    href="/dubai-pet-taxi"
                    className="block p-2.5 rounded-xl hover:bg-teal-soft text-navy font-semibold text-sm transition-colors"
                  >
                    <div className="font-bold text-teal-deep">Dubai Pet Taxi</div>
                    <div className="text-xs text-slate-500 font-normal">Instant distance fare inside Dubai</div>
                  </Link>
                  <Link
                    href="/international-pet-relocation"
                    className="block p-2.5 rounded-xl hover:bg-teal-soft text-navy font-semibold text-sm transition-colors"
                  >
                    <div className="font-bold text-navy">International Relocation</div>
                    <div className="text-xs text-slate-500 font-normal">Dubai ↔ Worldwide flight moves</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all">
                <span>Destinations</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isDestinationsOpen ? 'rotate-180 text-teal-deep' : ''}`} />
              </button>

              {isDestinationsOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-fj-card-hover border border-teal-border p-3 grid grid-cols-1 gap-1 animate-fade-in-up z-50">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2 py-1">
                    Dubai Routes
                  </div>
                  {[
                    { name: 'Dubai ↔ India', href: '/destinations/dubai-to-india' },
                    { name: 'Dubai ↔ UK (London)', href: '/destinations/dubai-to-uk' },
                    { name: 'Dubai ↔ USA (New York/LA)', href: '/destinations/dubai-to-usa' },
                    { name: 'Dubai ↔ Canada', href: '/destinations/dubai-to-canada' },
                  ].map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-soft hover:text-teal-deep rounded-xl transition-colors flex justify-between"
                    >
                      <span>{r.name}</span>
                      <span className="text-teal-deep font-bold">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/how-it-works" className="px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all">
              How it works
            </Link>

            <Link href="/why-global-pet-cab" className="px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all">
              Why Us
            </Link>

            <Link href="/resources" className="px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all">
              Guides
            </Link>
          </nav>

          {/* Desktop Right Actions - FidoJet Style buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://wa.me/971501234567?text=Hi%20Global%20Pet%20Cab%20Dubai%2C%20I%20would%20like%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-teal-border text-teal-deep font-bold text-sm bg-white hover:bg-teal-soft hover:border-teal-deep transition-all"
            >
              <MessageCircle className="w-4 h-4 text-teal-deep" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-coral hover:bg-coral-hover text-white font-extrabold text-sm shadow-fj-coral transition-all transform active:scale-95"
            >
              <span>Get a free quote</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/get-a-quote"
              className="bg-coral text-white font-extrabold text-xs px-3.5 py-2 rounded-lg"
            >
              Get a quote
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-navy hover:bg-teal-soft"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-border px-4 pt-3 pb-6 space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dubai-pet-taxi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep font-extrabold text-xs"
            >
              <Car className="w-5 h-5 mb-1 text-teal-bright" />
              Dubai Pet Taxi
            </Link>
            <Link
              href="/international-pet-relocation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-navy text-white font-extrabold text-xs"
            >
              <Globe className="w-5 h-5 mb-1 text-teal-light" />
              International Move
            </Link>
          </div>

          <div className="space-y-1 text-sm font-semibold text-navy">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-teal-soft">
              Home
            </Link>
            <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-teal-soft">
              How it works
            </Link>
            <Link href="/why-global-pet-cab" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-teal-soft">
              Why Us
            </Link>
            <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-teal-soft">
              Guides
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl hover:bg-teal-soft">
              Contact
            </Link>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm"
            >
              WhatsApp Us
            </a>
            <Link
              href="/get-a-quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center bg-coral hover:bg-coral-hover text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm"
            >
              Get a free quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
