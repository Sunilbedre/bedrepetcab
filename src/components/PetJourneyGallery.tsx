import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    customerName: 'Sarah Jenkins',
    petName: 'Milo (Golden Retriever)',
    routeLabel: 'DUBAI MARINA → DXB AIRPORT',
    comment: 'Outstanding pet taxi service! The vehicle was immaculate, air-conditioned, and Milo was safely secured in a spacious travel crate. Arrived at DXB with zero stress.',
    rating: 5,
    source: 'Verified Google Review',
  },
  {
    customerName: 'Tariq Al-Maktoum',
    petName: 'Bella (Persian Cat)',
    routeLabel: 'JUMEIRAH → VET CLINIC (ROUND TRIP)',
    comment: 'We use Global Pet Cab for all of Bella\'s grooming and vet visits across Dubai. The driver was punctual, incredibly gentle with her, and waited right outside.',
    rating: 5,
    source: 'Verified Customer',
  },
  {
    customerName: 'Marcus & Elena Vance',
    petName: 'Bruno (French Bulldog)',
    routeLabel: 'DUBAI → LONDON (LHR)',
    comment: 'Relocating our Frenchie to Heathrow felt overwhelming until Global Pet Cab took over. They handled export permits, IATA crate sizing, airline approval, and door-to-door delivery perfectly.',
    rating: 5,
    source: 'Verified Relocation Story',
  },
  {
    customerName: 'Ananya Sharma',
    petName: 'Coco & Leo (Indie Dogs)',
    routeLabel: 'MUMBAI → DUBAI (DXB)',
    comment: 'Brought both our dogs into Dubai smoothly! Global Pet Cab managed the UAE import permit, rabies titer verification, customs clearance, and home delivery.',
    rating: 5,
    source: 'Verified Import Customer',
  },
];

export default function PetJourneyGallery() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-teal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
            REAL PET RELOCATION STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
            Trusted by Pet Parents in Dubai and Around the World
          </h2>
          <p className="text-base sm:text-lg font-body text-slate-600">
            Read real experiences from pet parents who have used Global Pet Cab for Dubai pet transport, airport transfers and international pet relocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-teal-soft/70 rounded-3xl p-8 border border-teal-border shadow-sm hover:shadow-fj-card transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-bright/40" />
                </div>

                <div className="inline-block bg-white text-teal-deep font-mono font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-teal-border shadow-sm">
                  {review.routeLabel}
                </div>

                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-body font-medium">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-teal-border/70 flex justify-between items-end">
                <div>
                  <div className="font-extrabold font-heading text-base sm:text-lg text-navy">{review.customerName}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-body font-medium">{review.petName}</div>
                </div>
                <div className="text-xs sm:text-sm text-emerald-600 font-extrabold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {review.source}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
