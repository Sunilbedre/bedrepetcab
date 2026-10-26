import fs from 'fs';
import path from 'path';

const srcPagePath = path.join(process.cwd(), 'src/app/destinations/[slug]/page.tsx');
let srcCode = fs.readFileSync(srcPagePath, 'utf8');

const usaComponent = `  if (params.slug === 'dubai-to-usa') {
    return (
      <div className="font-body space-y-0 text-slate-800">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-navy text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=2000&q=80"
              alt="Dubai to USA Pet Relocation"
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
              DUBAI → USA PET RELOCATION
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Pet Relocation from Dubai to the USA, Made Easier
            </h1>

            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
                Taking your pet from Dubai to the United States involves more than booking a flight. Depending on the route and how your pet travels, you may need to prepare veterinary documents, vaccination records, a suitable travel crate and the right airline arrangements. Global Pet Cab helps you put those pieces together and plan the journey around your pet.
              </p>
              <p className="text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto">
                Pet relocation from Dubai to the USA with route planning, travel preparation and arrival coordination.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry"
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

        {/* 2. WHAT GLOBAL PET CAB HANDLES */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                WHAT GLOBAL PET CAB HANDLES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                What We Can Help With on Your Dubai to USA Pet Move
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Every international pet journey has its own details. We start with your route, your pet and your intended travel date, then help coordinate the practical pieces needed to get the journey moving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {USA_HANDLES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-slate-50 border border-teal-border hover:border-teal-deep/30 hover:bg-white hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. DOCUMENTS GENERALLY REQUIRED */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                DOCUMENTS GENERALLY REQUIRED
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Documents to Prepare for a Dubai to USA Pet Journey
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                The documents shown below are based on the current Global Pet Cab USA destination page. Pet entry requirements can vary depending on the destination, the animal and how the pet travels, so the final checklist should always be confirmed for the specific journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {USA_DOCS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3.5 flex flex-col justify-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border flex items-center justify-center text-teal-deep">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black font-heading text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-body">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 max-w-4xl mx-auto rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
              <p className="text-sm text-amber-900 font-medium leading-relaxed font-body">
                Important: Regulatory and airline requirements can change. Global Pet Cab should verify the latest applicable requirements for the pet, destination and travel method before confirming the final travel checklist.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HUMAN-FIRST SUPPORT SECTION */}
        <section className="relative py-20 sm:py-24 overflow-hidden text-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80"
              alt="USA Pet Relocation Support"
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
              HUMAN-FIRST SUPPORT
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              The Paperwork Is Important. So Is Knowing What Happens Next.
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto font-body text-base sm:text-lg text-slate-200 leading-relaxed">
              <p>
                International pet travel can feel overwhelming because there are several things to keep track of at the same time. You may be thinking about vaccination records, the microchip, the crate, the flight and what happens when your pet lands.
              </p>
              <p>
                Our job is to make that process easier to understand. Tell us where you&apos;re travelling from, where in the USA your pet is going and when you hope to travel. We&apos;ll look at the route with you and help you understand the next steps before you commit to the journey.
              </p>
            </div>
          </div>
        </section>

        {/* 5. INTERNATIONAL PET RELOCATION QUOTE FORM */}
        <section id="international-quote-form" className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                DUBAI ↔ WORLDWIDE RELOCATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Tell Us About Your Pet&apos;s Journey
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details. This gives the team the information needed to review your relocation request.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-5 bg-navy text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold font-heading text-teal-bright uppercase tracking-widest">
                    Route Overview
                  </span>
                  <h3 className="text-2xl font-black font-heading tracking-tight">
                    Dubai (DXB) → USA (JFK / LAX / ORD / IAH)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Direct and transit pet travel compliance for dogs and cats relocating to major US airport hubs under CDC & USDA entry regulations.
                  </p>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10 relative z-10 text-sm">
                  <div className="flex items-center gap-3 text-slate-200">
                    <Clock className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Direct Flight: ~13 to 16 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>CDC Rabies & USDA Entry Documentation</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <Compass className="w-5 h-5 text-teal-bright shrink-0" />
                    <span>Dedicated USA Move Specialist</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InternationalQuoteForm
                  title="Tell Us About Your Pet's Journey"
                  description="Start with the basics. Choose whether your pet is leaving Dubai or coming into the UAE, add the route and tentative travel date, and continue with your pet details."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6. THE JOURNEY */}
        <section className="py-20 sm:py-24 bg-slate-50 border-b border-teal-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-teal-border shadow-2xs">
                THE JOURNEY
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                From Dubai to the USA, One Step at a Time
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                We coordinate every phase from your initial route enquiry to destination arrival.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {USA_STEPS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-teal-border shadow-2xs hover:shadow-fj-card transition-all duration-300 space-y-3 flex flex-col justify-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-soft border border-teal-border flex items-center justify-center font-heading font-black text-teal-deep text-sm">
                    {item.s}
                  </div>
                  <h3 className="text-base font-black font-heading text-navy leading-snug">{item.t}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQS */}
        <section className="py-20 sm:py-24 bg-white border-b border-teal-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
                QUESTIONS PET PARENTS ASK
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
                Dubai to USA Pet Relocation Questions, Answered
              </h2>
              <p className="text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto">
                Planning to take your pet from Dubai to the United States? Here are some of the practical questions to think about before you book.
              </p>
            </div>

            <div className="space-y-4">
              {USA_FAQS.map((faq, idx) => (
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

        {/* 8. FINAL CTA */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-light uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/15">
              READY TO PLAN YOUR PET&apos;S MOVE?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Start With Your Route
            </h2>
            <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-body leading-relaxed">
              You don&apos;t have to work out every part of an international pet move on your own. Tell us where your pet is travelling from, where they are going and when you are hoping to travel. We&apos;ll help you understand what comes next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#international-quote-form"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-sm sm:text-base w-full sm:w-auto"
              >
                Get a Free Pet Relocation Quote →
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20USA%20Pet%20Relocation%20Enquiry"
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
      </div>
    );
  }
`;

const targetAnchor = "  if (params.slug === 'dubai-to-uk') {";
if (srcCode.includes(targetAnchor) && !srcCode.includes("params.slug === 'dubai-to-usa'")) {
  srcCode = srcCode.replace(targetAnchor, `${usaComponent}\n${targetAnchor}`);
  fs.writeFileSync(srcPagePath, srcCode);
  console.log('src/app/destinations/[slug]/page.tsx updated with USA branch!');
} else {
  console.log('USA branch already present or anchor missing.');
}
