import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import DubaiFareCalculator from '@/components/DubaiFareCalculator';
import InternationalQuoteForm from '@/components/InternationalQuoteForm';

export const metadata: Metadata = {
  title: 'Contact Global Pet Cab Dubai — Phone, WhatsApp & Office Details',
  description: 'Get in touch with Global Pet Cab Dubai for local pet taxi bookings or international relocation enquiries.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-8 font-body">
      <section className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">Contact Global Pet Cab Dubai</h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            Our relocation specialists and local transport dispatch team are available 7 days a week.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-teal-border shadow-sm space-y-6">
            <h2 className="text-2xl font-black font-heading text-navy">Dubai Office & Support</h2>
            
            <div className="space-y-5 text-sm sm:text-base text-slate-700">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-6 h-6 text-teal-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy text-base">Headquarters Address</div>
                  <div className="text-slate-600">Business Bay / Silicon Oasis, Dubai, United Arab Emirates</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-6 h-6 text-teal-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy text-base">Phone Support</div>
                  <div className="text-slate-600">+971 50 123 4567 / +971 4 800 PETS</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MessageCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy text-base">WhatsApp Dispatch</div>
                  <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold hover:underline">
                    +971 50 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-6 h-6 text-teal-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy text-base">Email Enquiries</div>
                  <div className="text-slate-600">dubai@globalpetcab.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-6 h-6 text-teal-deep shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy text-base">Operating Hours</div>
                  <div className="text-slate-600">Monday – Sunday: 08:00 – 22:00 GST</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <DubaiFareCalculator />
          </div>

        </div>
      </section>
    </div>
  );
}
