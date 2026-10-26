import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Car, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  MapPin, 
  PawPrint, 
  FileCheck2, 
  Package, 
  Plane, 
  Stethoscope, 
  Scissors, 
  Building2, 
  PlaneTakeoff, 
  PlaneLanding, 
  Home, 
  Truck,
  Compass,
  FileText,
  Boxes,
  HelpCircle,
  Star,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Global Pet Cab Works — Dubai Pet Taxi & International Relocation',
  description: 'From a quick pet taxi ride across Dubai to an international move, learn how Global Pet Cab keeps the journey simple, safe, and transparent.',
};

export default function HowItWorksPage() {
  const localOptions = [
    {
      title: 'Vet and health appointments',
      desc: 'Transportation for essential veterinary visits when you need help getting your pet there.',
      icon: Stethoscope,
    },
    {
      title: 'Grooming and salon visits',
      desc: 'Pickup and drop-off support when you are unavailable, subject to the service arrangement.',
      icon: Scissors,
    },
    {
      title: 'Pet boarding and hotels',
      desc: 'Transport to and from boarding facilities and pet hotels.',
      icon: Building2,
    },
    {
      title: 'Door-to-airport transfers',
      desc: 'Take your pet from home or another pickup point to the airport.',
      icon: PlaneTakeoff,
    },
    {
      title: 'Airport-to-door transfers',
      desc: 'Bring your pet home or to the agreed destination after arrival.',
      icon: PlaneLanding,
    },
    {
      title: 'Home moves',
      desc: 'Help your pet travel between homes within Dubai.',
      icon: Home,
    },
    {
      title: 'Selected city-to-city ground transport',
      desc: 'Ask the team about available routes beyond Dubai.',
      icon: Truck,
    },
  ];

  const internationalSupportPillars = [
    {
      title: 'Route Support',
      desc: 'We review the origin, destination and travel timing so the relocation plan is built around the actual route.',
      icon: Compass,
    },
    {
      title: 'Documentation Support',
      desc: 'We help you understand the veterinary and travel documentation that may apply to your pet and destination.',
      icon: FileText,
    },
    {
      title: 'Travel Preparation',
      desc: 'We can coordinate the agreed crate, airline and transportation arrangements required for the selected service.',
      icon: Boxes,
    },
    {
      title: 'Local Ground Transport',
      desc: 'The international journey can also connect with local pet transportation, including door-to-airport or airport-to-door travel where included in the service.',
      icon: Truck,
    },
  ];

  return (
    <div className="font-body">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28 lg:pb-32">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
            alt="Global Pet Cab pet travel support"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">
              HOW IT WORKS
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-heading tracking-tight leading-[1.1]">
              How Global Pet Cab Works
            </h1>
            <p className="text-base sm:text-xl text-white/90 leading-relaxed max-w-2xl">
              From a quick pet taxi ride across Dubai to an international move, we keep the process clear from the first enquiry to the final drop-off. Choose the journey you need, share a few details about your pet, and we&apos;ll guide you through the next steps.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
                <Car className="w-4 h-4 text-teal-bright" />
                Local City Rides
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
                <Globe className="w-4 h-4 text-teal-bright" />
                Cross-Border Logistics
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-teal-bright" />
                IATA &amp; MOCCAE
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-coral hover:bg-coral-hover text-white font-extrabold text-sm sm:text-base shadow-fj-coral transition-all transform active:scale-95"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base transition-all transform active:scale-95 shadow-lg shadow-emerald-900/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Floating Trust Bar */}
          <div className="relative z-30 translate-y-1/2 mt-10">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-teal-border">
                <div className="flex flex-col items-center justify-center p-2 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-500 font-heading font-extrabold text-xl sm:text-2xl">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    <span>IPATA</span>
                  </div>
                  <div className="text-sm sm:text-base font-heading font-extrabold text-navy">IPATA Member</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-body">Accredited pet transport association</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 space-y-1">
                  <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
                    <HeartHandshake className="w-6 h-6" />
                    <span>IATA</span>
                  </div>
                  <div className="text-sm sm:text-base font-heading font-extrabold text-navy">IATA-Compliant Handling</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-body">Live animal regulations &amp; crates</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 space-y-1">
                  <div className="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
                    <Globe className="w-6 h-6" />
                    <span>45+ Countries</span>
                  </div>
                  <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Global Network</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-body">IATA &amp; MOCCAE compliant</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-heading font-extrabold text-xl sm:text-2xl">
                    <ShieldCheck className="w-6 h-6" />
                    <span>2,000+</span>
                  </div>
                  <div className="text-sm sm:text-base font-heading font-extrabold text-navy">Pets Transported</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-body">Live animal regulations &amp; crates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANCHOR NAVIGATION CARDS */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-8 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="#dubai-taxi-steps"
              className="group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center shrink-0">
                  <Car className="w-7 h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]">
                    Local City Rides
                  </p>
                  <p className="text-xl sm:text-2xl font-black font-heading text-navy mt-1">
                    Dubai Pet Taxi Journey Steps
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5">
                    Need to get your pet across Dubai? Follow three simple steps to book a Dubai pet taxi for vet visits, grooming, boarding, airport transfers and other local journeys.
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy">
                <span>View Local Ride Steps</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a
              href="#international-steps"
              className="group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-navy text-teal-light flex items-center justify-center shrink-0">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]">
                    Cross-Border Logistics
                  </p>
                  <p className="text-xl sm:text-2xl font-black font-heading text-navy mt-1">
                    International Relocation Steps
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5">
                    Moving your pet to or from another country? We&apos;ll help you understand the route, prepare the required travel details and coordinate the relocation process.
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy">
                <span>View International Relocation Steps</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. LOCAL CITY RIDES SECTION */}
      <section id="dubai-taxi-steps" className="py-16 sm:py-20 bg-[#FBFBFA] scroll-mt-24 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[500px] rounded-[32px] overflow-hidden shadow-fj-card">
              <Image
                src="https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1400&q=80"
                alt="Pet travelling in a climate-controlled Dubai pet taxi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-navy text-xs sm:text-sm font-extrabold font-heading px-4 py-2.5 rounded-full shadow-md">
                  <ShieldCheck className="w-4 h-4 text-teal-deep" />
                  CLIMATE-CONTROLLED FLEET
                </div>
              </div>
            </div>

            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center shrink-0 shadow-md">
                  <Car className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">
                    LOCAL CITY RIDES
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-navy tracking-tight">
                    Dubai Pet Taxi Journey Steps
                  </h2>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
                Booking pet transportation in Dubai should not feel complicated. Start with your pickup and drop-off details, tell us about your pet, and we&apos;ll take care of the agreed ride.
              </p>

              {/* 3 Step List */}
              <ol className="relative space-y-4 pt-2">
                <div className="absolute left-[23px] top-6 bottom-6 w-px bg-teal-border hidden sm:block" aria-hidden="true"></div>

                {/* Step 1 */}
                <li className="relative flex gap-4 sm:gap-5">
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">
                    1
                  </div>
                  <div className="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                    <h3 className="text-lg sm:text-xl font-black font-heading text-navy">
                      Calculate Your Fare
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Enter your pickup and drop-off locations in Dubai. Our fare engine uses the journey distance and selected ride details to provide an estimated Dubai pet taxi fare.
                    </p>
                  </div>
                </li>

                {/* Step 2 */}
                <li className="relative flex gap-4 sm:gap-5">
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">
                    2
                  </div>
                  <div className="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                    <h3 className="text-lg sm:text-xl font-black font-heading text-navy">
                      Share Your Pet Details
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Tell us your pet&apos;s type, number of pets, travel date and preferred pickup time. These details help us understand the ride and make the right arrangements.
                    </p>
                  </div>
                </li>

                {/* Step 3 */}
                <li className="relative flex gap-4 sm:gap-5">
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">
                    3
                  </div>
                  <div className="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                    <h3 className="text-lg sm:text-xl font-black font-heading text-navy">
                      Driver Pickup &amp; Ride
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Your driver arrives at the pickup location in a climate-controlled vehicle and takes your pet to the agreed destination. Pet parents can ride along or track the journey through WhatsApp, where applicable.
                    </p>
                  </div>
                </li>
              </ol>

              {/* Step CTA Button */}
              <div className="pt-2">
                <Link
                  href="/dubai-pet-taxi"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-deep hover:bg-teal-dark text-white font-extrabold font-heading text-sm sm:text-base shadow-sm transition-all transform active:scale-95"
                >
                  <span>Calculate a Dubai Pet Taxi Fare</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEW SECTION: LOCAL PET TRANSPORT OPTIONS */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F0F6F8] border-t border-teal-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">
              LOCAL PET TRANSPORT OPTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]">
              More Than Just a Ride Across Dubai
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Our Dubai pet taxi service can support everyday journeys as well as important appointments. Depending on the service you book, this can include door-to-door pet transport, airport transfers, grooming visits, boarding drop-offs and selected health-related appointments.
            </p>
          </div>

          {/* 7 Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localOptions.map((opt, idx) => {
              const IconComp = opt.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black font-heading text-navy">
                        {opt.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CROSS-BORDER LOGISTICS SECTION */}
      <section id="international-steps" className="py-20 sm:py-24 bg-navy text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0 shadow-lg mt-1">
                <Globe className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.18em]">
                  CROSS-BORDER LOGISTICS
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white">
                  International Pet Relocation Steps
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  International pet relocation involves more planning than a local ride. We help you start with the route, understand what needs to be prepared and coordinate the agreed parts of the journey.
                </p>
              </div>
            </div>

            <Link
              href="/international-pet-relocation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-extrabold font-heading text-teal-light hover:text-white transition-all shrink-0"
            >
              <span>View International Relocation Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="hidden lg:block absolute top-[38px] left-[12%] right-[12%] h-px bg-white/15" aria-hidden="true"></div>

            {/* Step 1 */}
            <article className="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
              <div>
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">
                  1
                </div>
                <p className="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">
                  Step 1
                </p>
                <h3 className="mt-2 text-lg sm:text-xl font-black font-heading text-white">
                  Request a Quote
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Share your origin and destination, tentative travel date, pet details and the services you need. This gives our team the information needed to review your route.
                </p>
              </div>
            </article>

            {/* Step 2 */}
            <article className="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
              <div>
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">
                  2
                </div>
                <p className="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">
                  Step 2
                </p>
                <h3 className="mt-2 text-lg sm:text-xl font-black font-heading text-white">
                  Veterinary Preparation
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Depending on the destination and your pet&apos;s circumstances, preparation may include microchip details, vaccinations, veterinary documentation and blood testing such as RNATT.
                </p>
              </div>
            </article>

            {/* Step 3 */}
            <article className="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
              <div>
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">
                  3
                </div>
                <p className="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">
                  Step 3
                </p>
                <h3 className="mt-2 text-lg sm:text-xl font-black font-heading text-white">
                  Permits &amp; Travel Crates
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Where required, the relocation plan can include UAE export or import documentation and preparation of an appropriate airline travel crate. Destination requirements vary by route.
                </p>
              </div>
            </article>

            {/* Step 4 */}
            <article className="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
              <div>
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">
                  4
                </div>
                <p className="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">
                  Step 4
                </p>
                <h3 className="mt-2 text-lg sm:text-xl font-black font-heading text-white">
                  Flight &amp; Delivery
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Once the travel arrangements are in place, the agreed transportation and relocation steps are coordinated through departure, flight arrangements and arrival or handover.
                </p>
              </div>
            </article>
          </div>

          {/* Import / Export distinction callout */}
          <div className="rounded-3xl bg-gradient-to-r from-white/10 to-white/5 border border-teal-light/30 p-6 sm:p-8 backdrop-blur-sm flex items-start gap-4 sm:gap-6 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-extrabold font-heading uppercase tracking-wider text-teal-light">
                Import / Export distinction
              </span>
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                A pet travelling from another country into Dubai is an <strong className="text-teal-bright font-black">import into Dubai</strong>. A pet travelling from Dubai/UAE to another country is an <strong className="text-teal-bright font-black">export from the UAE</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW SECTION: INTERNATIONAL JOURNEY SUPPORT */}
      <section className="py-20 sm:py-24 bg-[#FBFBFA] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">
              INTERNATIONAL JOURNEY SUPPORT
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]">
              From Dubai to the World, and Back Again
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
              International pet relocation can involve several people, documents and travel arrangements. Our role is to help bring those moving parts together so you have a clearer picture of what happens before your pet travels, during the journey and at the agreed destination.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {internationalSupportPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0">
                    <PillarIcon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-black font-heading text-navy">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="relative overflow-hidden text-white py-20 sm:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
            alt="Happy pets travelling with Global Pet Cab"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/60 to-navy/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">
            READY TO PLAN YOUR PET&apos;S JOURNEY?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            Let&apos;s Get Your Pet Moving.
          </h2>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Whether you need a Dubai pet taxi, an airport transfer or help with international pet relocation, start by telling us where your pet needs to go. We&apos;ll help you work out the next step.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all transform active:scale-95 text-base"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all transform active:scale-95 text-base shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
