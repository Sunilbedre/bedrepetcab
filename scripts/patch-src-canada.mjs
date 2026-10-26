import fs from 'fs';
import path from 'path';

const srcPagePath = path.join(process.cwd(), 'src/app/destinations/[slug]/page.tsx');
let srcCode = fs.readFileSync(srcPagePath, 'utf8');

const canadaComponent = `  if (params.slug === 'dubai-to-canada') {
    return (
      <div className="font-body space-y-0 text-slate-800">
        {/* 1. HERO / INTRO SECTION */}
        <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
              alt="Dubai to Canada Pet Relocation"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(7, 23, 40, 0.95), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.98))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-heading uppercase tracking-widest bg-teal-bright/20 text-teal-light border border-teal-bright/30">
              DUBAI ↔ CANADA PET RELOCATION
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Moving Your Pet Between Dubai & Canada? Let&apos;s Plan the Journey.
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
                Moving your pet to another country is a big move — and there is a lot to think about before travel day. From understanding the route and preparing your pet to getting the travel details in place, Global Pet Cab helps you organise the journey one step at a time.
              </p>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
                Whether your pet is leaving Dubai for Canada or coming home to Dubai from Canada, we help you understand what needs to happen next and coordinate the journey around your pet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* 2. INTERNATIONAL PET RELOCATION QUOTE */}
        <section id="international-quote-form" className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                DUBAI ↔ CANADA RELOCATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                International Pet Relocation — Request Your Quote
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold font-heading text-teal-bright uppercase tracking-widest">
                    Route Overview
                  </span>
                  <h3 className="text-2xl font-black font-heading tracking-tight">
                    Dubai (DXB) ↔ Canada (YYZ / YVR / YUL)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Relocating pets between Dubai and Canada requires careful alignment between CFIA Canadian entry protocols and UAE MOCCAE clearance.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm">
                  <div className="flex items-center gap-3 text-slate-200">
                    <Clock className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Direct Flight: ~14 to 16 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>CFIA & UAE MOCCAE Compliant</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <Compass className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Dedicated Route Move Coordinator</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InternationalQuoteForm
                  title="International Pet Relocation — Request Your Quote"
                  description="Every pet and every journey is different. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. Our team can then review the route and help you understand the next steps."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. CANADA ROUTE INTRODUCTION BANNER */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
              alt="Canada Pet Relocation Route"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              YOUR PET&apos;S JOURNEY TO CANADA
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              More Than Just Getting From Dubai to Canada
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>A pet relocation involves more than getting your pet onto a flight.</p>
              <p>
                There is preparation before departure, travel arrangements to organise and documents that need to be in place. The details can also change depending on your pet, your route and the direction you are travelling.
              </p>
              <p>
                That&apos;s why we start by understanding your pet, your journey and your timeline — then help you work through the practical steps.
              </p>
              <p className="text-teal-light font-medium">
                Whether you&apos;re relocating for work, moving back home or starting a new chapter in Canada, your pet deserves to be part of the plan.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHAT WE HELP YOU COORDINATE */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                HOW WE SUPPORT YOUR MOVE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                One Journey. Many Moving Parts. One Team to Help Coordinate Them.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                We support your pet relocation step by step across both Dubai and Canadian jurisdictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {CANADA_COORDINATE_STEPS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black font-heading text-teal-deep bg-white px-3 py-1 rounded-full border border-teal-border">
                        {item.s}
                      </span>
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">{item.t}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. LOCAL SUPPORT BEFORE THE BIG MOVE */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=2000&q=80"
              alt="Local Pet Care Support"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              BEFORE TRAVEL DAY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Need Help Getting Your Pet Ready?
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>Sometimes the international journey isn&apos;t the only thing on your plate.</p>
              <p>
                If your pet needs to visit a veterinarian, groomer or other pet-care appointment before travelling and you can&apos;t make it yourself, local pet transport support can help. Depending on the service arranged, our team can assist with getting your pet where they need to go.
              </p>
              <p className="text-teal-light font-medium">Because sometimes getting ready to travel is a journey of its own.</p>
            </div>
            <div className="pt-2">
              <Link
                href="/dubai-pet-taxi"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base"
              >
                Explore Dubai Pet Taxi
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. DUBAI → CANADA / CANADA → DUBAI COMPARISON */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                KNOW WHICH WAY YOUR PET IS TRAVELLING
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                From Dubai to Canada? Or Canada to Dubai?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Pet import and export regulations differ significantly between departure and arrival countries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-3 py-1.5 rounded-full border border-teal-border">
                  EXPORT JOURNEY
                </div>
                <h3 className="text-2xl font-black font-heading text-navy">Moving FROM Dubai / UAE to Canada</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                  Your pet is leaving the UAE, so this is an export from the UAE and an import into Canada. The journey needs to be planned around the requirements on both sides.
                </p>
                <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium font-body">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>UAE MOCCAE Export Health Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>Canadian Food Inspection Agency (CFIA) Compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-deep shrink-0" />
                    <span>ISO 11784/11785 Microchip & Rabies Vaccination</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black font-heading text-coral uppercase tracking-widest bg-coral/10 px-3 py-1.5 rounded-full border border-coral/20">
                  IMPORT JOURNEY
                </div>
                <h3 className="text-2xl font-black font-heading text-navy">Moving INTO Dubai / UAE from Canada</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                  Your pet is entering the UAE, so this is an import into Dubai/UAE. The preparation and documentation will be based on the applicable UAE entry requirements and your pet&apos;s travel circumstances.
                </p>
                <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium font-body">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>UAE MOCCAE Official Import Permit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>CFIA Endorsed Veterinary Health Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                    <span>Rabies Neutralizing Antibody Titer Test (RNATT)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-bold text-navy bg-white py-4 px-6 rounded-2xl border border-teal-border shadow-2xs">
                Not sure which requirements apply to your pet? Start with your route and travel date, and we&apos;ll help you understand what needs to be planned.
              </p>
            </div>
          </div>
        </section>

        {/* 7. WHY PET PARENTS CHOOSE GLOBAL PET CAB */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                WHY GLOBAL PET CAB
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Because Your Pet Isn&apos;t Just Another Piece of Luggage.
              </h2>
              <div className="space-y-3 font-body text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>International relocation can feel complicated when you&apos;re trying to figure everything out yourself.</p>
                <p>
                  Our job is to make the journey easier to understand — from the first conversation about your route to the practical details that need to be arranged before your pet travels.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {CANADA_WHY_US.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50 border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-4 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. TRUST SECTION BANNER */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80"
              alt="Happy Pets Travelling"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy opacity-90" />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(rgba(7, 23, 40, 0.90), rgba(10, 37, 64, 0.88), rgba(7, 23, 40, 0.95))'
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              FAMILY-FIRST CARE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Your Pet&apos;s Journey Deserves More Than a Booking Confirmation.
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>We know you&apos;re not simply sending a pet from one airport to another.</p>
              <p className="font-extrabold text-teal-light text-xl">You&apos;re sending a family member.</p>
              <p>
                That&apos;s why the focus is on planning the journey properly, communicating clearly and making sure the practical details are considered before travel day.
              </p>
            </div>
            <div className="pt-6 border-t border-white/15 max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-4">
                Trust Badges — Verify Before Publishing
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  IPATA Member
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  IATA-Compliant Handling
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  45+ Countries
                </span>
                <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-bold text-white">
                  2,000+ Pets Transported
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                QUESTIONS PET PARENTS ASK
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Dubai ↔ Canada Pet Relocation FAQs
              </h2>
              <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
                Planning to move your pet between Dubai and Canada? Here are answers to commonly asked questions.
              </p>
            </div>

            <div className="space-y-4">
              {CANADA_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-50 border border-teal-border/60 rounded-2xl overflow-hidden transition-all duration-200 open:bg-white open:shadow-fj-card open:border-teal-deep/30"
                >
                  <summary className="flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer font-heading font-black text-navy text-base sm:text-lg list-none hover:text-teal-deep transition-colors select-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-teal-deep">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed font-body border-t border-slate-100/80 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              READY TO PLAN YOUR PET&apos;S MOVE?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Figure Out the Journey Together.
            </h2>
            <div className="space-y-2 max-w-2xl mx-auto font-body text-base sm:text-xl text-slate-200 leading-relaxed">
              <p>Tell us where your pet is travelling from, where they&apos;re going and roughly when you want to travel.</p>
              <p>We&apos;ll start with the route, understand your pet&apos;s needs and help you work out what comes next.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Canada Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Canada%20Pet%20Relocation%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-sm sm:text-base shadow-sm w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp the Relocation Team
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
`;

const targetAnchor = "  if (params.slug === 'dubai-to-uk') {";
if (srcCode.includes(targetAnchor) && !srcCode.includes("params.slug === 'dubai-to-canada'")) {
  srcCode = srcCode.replace(targetAnchor, `${canadaComponent}\n${targetAnchor}`);
  fs.writeFileSync(srcPagePath, srcCode);
  console.log('src/app/destinations/[slug]/page.tsx updated with Canada branch!');
} else {
  console.log('Canada branch already present or anchor missing.');
}
