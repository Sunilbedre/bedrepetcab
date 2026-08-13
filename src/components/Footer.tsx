import React from 'react';
import Link from 'next/link';
import { Car, Globe, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-deep flex items-center justify-center text-white shadow-md">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="font-black text-xl text-white tracking-tight flex items-center gap-1.5 font-heading">
                  <span>GLOBAL PET CAB</span>
                  <span className="text-xs bg-teal-soft text-teal-deep px-1.5 py-0.5 rounded border border-teal-border font-mono font-bold">
                    .AE
                  </span>
                </div>
                <div className="text-xs font-extrabold tracking-widest text-teal-light uppercase -mt-0.5 font-heading">
                  DUBAI PET TAXI & WORLDWIDE RELOCATION
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Dubai&apos;s premier dedicated pet mobility platform. Providing instant distance-based pet taxi fares across Dubai and comprehensive international pet relocation from Dubai to the world and world to Dubai.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                IATA Compliant
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 font-bold">
                <Heart className="w-4 h-4 text-amber-400" />
                MOCCAE Certified
              </div>
            </div>

            <div className="pt-2 text-sm text-slate-300 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-light shrink-0" />
                <span>Business Bay / Dubai Silicon Oasis, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-light shrink-0" />
                <span>+971 50 123 4567 / +971 4 800 PETS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-light shrink-0" />
                <span>dubai@globalpetcab.ae</span>
              </div>
            </div>
          </div>

          {/* Column 3: Dubai Pet Taxi */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5 font-heading">
              <Car className="w-4 h-4 text-teal-light" />
              Dubai Pet Taxi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  Instant Fare Calculator
                </Link>
              </li>
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  Veterinary Clinic Visits
                </Link>
              </li>
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  DXB & DWC Airport Rides
                </Link>
              </li>
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  Grooming & Salon Transfers
                </Link>
              </li>
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  Pet Boarding & Hotel Drops
                </Link>
              </li>
              <li>
                <Link href="/dubai-pet-taxi" className="hover:text-white transition-colors">
                  One-Way & Round Trip Rides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: International Relocation */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5 font-heading">
              <Globe className="w-4 h-4 text-teal-light" />
              Dubai ↔ Worldwide
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/international-pet-relocation" className="hover:text-white transition-colors">
                  Relocation Overview
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai-to-india" className="hover:text-white transition-colors">
                  Dubai ↔ India (Mumbai / Delhi)
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai-to-uk" className="hover:text-white transition-colors">
                  Dubai ↔ UK (London Heathrow)
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai-to-usa" className="hover:text-white transition-colors">
                  Dubai ↔ USA (New York / LA)
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai-to-canada" className="hover:text-white transition-colors">
                  Dubai ↔ Canada (Toronto)
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai-to-australia" className="hover:text-white transition-colors">
                  Dubai ↔ Australia
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Legal */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest font-heading">
              Company & Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Global Pet Cab Dubai
                </Link>
              </li>
              <li>
                <Link href="/why-global-pet-cab" className="hover:text-white transition-colors">
                  Why Pet Parents Trust Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Verified Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  UAE Pet Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-teal-light hover:text-white transition-colors font-bold">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Global Pet Cab Dubai (globalpetcab.ae). All rights reserved. Registered UAE Pet Transport & Relocation Logistics.
          </div>
          <div className="flex space-x-6">
            <Link href="/resources" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/resources" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/resources" className="hover:text-white transition-colors">Cancellation Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
