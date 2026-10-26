import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== Patching How It Works for .next and live preview ===');

// 1. Generate full HTML for <main class="flex-grow">
const newMainHtml = `<main class="flex-grow"><div class="font-body">
  <!-- 1. HERO SECTION -->
  <section class="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28 lg:pb-32">
    <div class="absolute inset-0" aria-hidden="true">
      <img alt="Global Pet Cab pet travel support" fetchPriority="high" decoding="async" data-nimg="fill" class="object-cover object-[center_35%]" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75"/>
      <div class="absolute inset-0 bg-navy/75"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl space-y-6">
        <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">HOW IT WORKS</p>
        <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-black font-heading tracking-tight leading-[1.1]">How Global Pet Cab Works</h1>
        <p class="text-base sm:text-xl text-white/90 leading-relaxed max-w-2xl font-body">From a quick pet taxi ride across Dubai to an international move, we keep the process clear from the first enquiry to the final drop-off. Choose the journey you need, share a few details about your pet, and we&#x27;ll guide you through the next steps.</p>
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4 text-teal-bright"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            Local City Rides
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4 text-teal-bright"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            Cross-Border Logistics
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-4 h-4 text-teal-bright"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
            IATA &amp; MOCCAE
          </span>
        </div>
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="/get-a-quote" class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-coral hover:bg-coral-hover text-white font-extrabold text-sm sm:text-base shadow-fj-coral transition-all transform active:scale-95 font-heading">
            <span>Get a Free Quote</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base transition-all transform active:scale-95 shadow-lg shadow-emerald-900/20 font-heading">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-4 h-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
      <!-- Floating Trust Bar -->
      <div class="relative z-30 translate-y-1/2 mt-10">
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-border">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-teal-border">
            <div class="flex flex-col items-center justify-center p-2 space-y-1">
              <div class="flex items-center gap-1.5 text-amber-500 font-heading font-extrabold text-xl sm:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-6 h-6 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>IPATA</span>
              </div>
              <div class="text-sm sm:text-base font-heading font-extrabold text-navy">IPATA Member</div>
              <div class="text-xs sm:text-sm text-slate-600 font-body">Accredited pet transport association</div>
            </div>
            <div class="flex flex-col items-center justify-center p-2 space-y-1">
              <div class="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"></path><path d="m18 15-2-2"></path><path d="m15 18-2-2"></path></svg>
                <span>IATA</span>
              </div>
              <div class="text-sm sm:text-base font-heading font-extrabold text-navy">IATA-Compliant Handling</div>
              <div class="text-xs sm:text-sm text-slate-600 font-body">Live animal regulations &amp; crates</div>
            </div>
            <div class="flex flex-col items-center justify-center p-2 space-y-1">
              <div class="flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth w-6 h-6"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>
                <span>45+ Countries</span>
              </div>
              <div class="text-sm sm:text-base font-heading font-extrabold text-navy">Global Network</div>
              <div class="text-xs sm:text-sm text-slate-600 font-body">IATA &amp; MOCCAE compliant</div>
            </div>
            <div class="flex flex-col items-center justify-center p-2 space-y-1">
              <div class="flex items-center gap-2 text-emerald-600 font-heading font-extrabold text-xl sm:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                <span>2,000+</span>
              </div>
              <div class="text-sm sm:text-base font-heading font-extrabold text-navy">Pets Transported</div>
              <div class="text-xs sm:text-sm text-slate-600 font-body">Live animal regulations &amp; crates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. ANCHOR NAVIGATION CARDS -->
  <section class="pt-32 sm:pt-36 lg:pt-40 pb-8 bg-[#FBFBFA]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="#dubai-taxi-steps" class="group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-7 h-7"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]">Local City Rides</p>
              <p class="text-xl sm:text-2xl font-black font-heading text-navy mt-1">Dubai Pet Taxi Journey Steps</p>
              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5">Need to get your pet across Dubai? Follow three simple steps to book a Dubai pet taxi for vet visits, grooming, boarding, airport transfers and other local journeys.</p>
            </div>
          </div>
          <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy">
            <span>View Local Ride Steps</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </a>
        <a href="#international-steps" class="group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl bg-navy text-teal-light flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-7 h-7"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]">Cross-Border Logistics</p>
              <p class="text-xl sm:text-2xl font-black font-heading text-navy mt-1">International Relocation Steps</p>
              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5">Moving your pet to or from another country? We&#x27;ll help you understand the route, prepare the required travel details and coordinate the relocation process.</p>
            </div>
          </div>
          <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy">
            <span>View International Relocation Steps</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- 3. LOCAL CITY RIDES SECTION -->
  <section id="dubai-taxi-steps" class="py-16 sm:py-20 bg-[#FBFBFA] scroll-mt-24 border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div class="lg:col-span-5 relative min-h-[380px] sm:min-h-[500px] rounded-[32px] overflow-hidden shadow-fj-card">
          <img alt="Pet travelling in a climate-controlled Dubai pet taxi" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="(max-width: 1024px) 100vw, 42vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1444212477490-ca407925329e%3Fauto%3Dformat%26fit%3Dcrop%26w%3D1400%26q%3D80&amp;w=3840&amp;q=75"/>
          <div class="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-5 left-5 right-5">
            <div class="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-navy text-xs sm:text-sm font-extrabold font-heading px-4 py-2.5 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-4 h-4 text-teal-deep"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
              CLIMATE-CONTROLLED FLEET
            </div>
          </div>
        </div>
        <div class="lg:col-span-7 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center shrink-0 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-7 h-7"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            </div>
            <div>
              <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">LOCAL CITY RIDES</p>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-navy tracking-tight">Dubai Pet Taxi Journey Steps</h2>
            </div>
          </div>
          <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-body">Booking pet transportation in Dubai should not feel complicated. Start with your pickup and drop-off details, tell us about your pet, and we&#x27;ll take care of the agreed ride.</p>
          <ol class="relative space-y-4 pt-2">
            <div class="absolute left-[23px] top-6 bottom-6 w-px bg-teal-border hidden sm:block" aria-hidden="true"></div>
            <li class="relative flex gap-4 sm:gap-5">
              <div class="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">1</div>
              <div class="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Calculate Your Fare</h3>
                <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">Enter your pickup and drop-off locations in Dubai. Our fare engine uses the journey distance and selected ride details to provide an estimated Dubai pet taxi fare.</p>
              </div>
            </li>
            <li class="relative flex gap-4 sm:gap-5">
              <div class="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">2</div>
              <div class="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Share Your Pet Details</h3>
                <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">Tell us your pet&#x27;s type, number of pets, travel date and preferred pickup time. These details help us understand the ride and make the right arrangements.</p>
              </div>
            </li>
            <li class="relative flex gap-4 sm:gap-5">
              <div class="relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base">3</div>
              <div class="flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors">
                <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Driver Pickup &amp; Ride</h3>
                <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">Your driver arrives at the pickup location in a climate-controlled vehicle and takes your pet to the agreed destination. Pet parents can ride along or track the journey through WhatsApp, where applicable.</p>
              </div>
            </li>
          </ol>
          <div class="pt-2">
            <a class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-deep hover:bg-teal-dark text-white font-extrabold font-heading text-sm sm:text-base shadow-sm transition-all transform active:scale-95" href="/dubai-pet-taxi">
              <span>Calculate a Dubai Pet Taxi Fare</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. LOCAL PET TRANSPORT OPTIONS -->
  <section class="py-20 bg-gradient-to-b from-white to-[#F0F6F8] border-t border-teal-border/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-4">
        <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">LOCAL PET TRANSPORT OPTIONS</p>
        <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]">More Than Just a Ride Across Dubai</h2>
        <p class="text-base sm:text-lg text-slate-700 leading-relaxed">Our Dubai pet taxi service can support everyday journeys as well as important appointments. Depending on the service you book, this can include door-to-door pet transport, airport transfers, grooming visits, boarding drop-offs and selected health-related appointments.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stethoscope w-6 h-6"><path d="M11 2v2"></path><path d="M5 2v2"></path><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path><path d="M8 15a6 6 0 0 0 12 0v-3"></path><circle cx="20" cy="10" r="2"></circle></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Vet and health appointments</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">transportation for essential veterinary visits when you need help getting your pet there.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scissors w-6 h-6"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" x2="8.12" y1="4" y2="15.88"></line><line x1="14.47" x2="20" y1="14.48" y2="20"></line><line x1="8.12" x2="12" y1="8.12" y2="12"></line></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Grooming and salon visits</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">pickup and drop-off support when you are unavailable, subject to the service arrangement.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2 w-6 h-6"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Pet boarding and hotels</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">transport to and from boarding facilities and pet hotels.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-takeoff w-6 h-6"><path d="M2 22h20"></path><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1 9.94 4.97a2 2 0 0 0 1.8 0L22 14"></path><path d="m10 15.5 3-3L8 9.5l4-2 3.5 3.5"></path></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Door-to-airport transfers</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">take your pet from home or another pickup point to the airport.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-landing w-6 h-6"><path d="M2 22h20"></path><path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28 1.2.28 1.76 0l.17-.08 9.94-4.97c.56-.28 1.21-.28 1.76 0L22 2.5"></path><path d="m12 6.5 1 3.5L8.5 12l2.5 3.5-3 1.5"></path></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Airport-to-door transfers</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">bring your pet home or to the agreed destination after arrival.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home w-6 h-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Home moves</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">help your pet travel between homes within Dubai.</p>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck w-6 h-6"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black font-heading text-navy">Selected city-to-city ground transport</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">ask the team about available routes beyond Dubai.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. CROSS-BORDER LOGISTICS SECTION -->
  <section id="international-steps" class="py-20 sm:py-24 bg-navy text-white scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div class="flex items-start gap-4 max-w-3xl">
          <div class="w-14 h-14 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0 shadow-lg mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-7 h-7"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <div class="space-y-3">
            <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.18em]">CROSS-BORDER LOGISTICS</p>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white">International Pet Relocation Steps</h2>
            <p class="text-base sm:text-lg text-slate-300 leading-relaxed">International pet relocation involves more planning than a local ride. We help you start with the route, understand what needs to be prepared and coordinate the agreed parts of the journey.</p>
          </div>
        </div>
        <a class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-extrabold font-heading text-teal-light hover:text-white transition-all shrink-0" href="/international-pet-relocation">
          <span>View International Relocation Services</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
      <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        <div class="hidden lg:block absolute top-[38px] left-[12%] right-[12%] h-px bg-white/15" aria-hidden="true"></div>
        <article class="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
          <div>
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">1</div>
            <p class="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">Step 1</p>
            <h3 class="mt-2 text-lg sm:text-xl font-black font-heading text-white">Request a Quote</h3>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">Share your origin and destination, tentative travel date, pet details and the services you need. This gives our team the information needed to review your route.</p>
          </div>
        </article>
        <article class="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
          <div>
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">2</div>
            <p class="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">Step 2</p>
            <h3 class="mt-2 text-lg sm:text-xl font-black font-heading text-white">Veterinary Preparation</h3>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">Depending on the destination and your pet&#x27;s circumstances, preparation may include microchip details, vaccinations, veterinary documentation and blood testing such as RNATT.</p>
          </div>
        </article>
        <article class="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
          <div>
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">3</div>
            <p class="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">Step 3</p>
            <h3 class="mt-2 text-lg sm:text-xl font-black font-heading text-white">Permits &amp; Travel Crates</h3>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">Where required, the relocation plan can include UAE export or import documentation and preparation of an appropriate airline travel crate. Destination requirements vary by route.</p>
          </div>
        </article>
        <article class="relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between">
          <div>
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg">4</div>
            <p class="text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light">Step 4</p>
            <h3 class="mt-2 text-lg sm:text-xl font-black font-heading text-white">Flight &amp; Delivery</h3>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">Once the travel arrangements are in place, the agreed transportation and relocation steps are coordinated through departure, flight arrangements and arrival or handover.</p>
          </div>
        </article>
      </div>
      <div class="rounded-3xl bg-gradient-to-r from-white/10 to-white/5 border border-teal-light/30 p-6 sm:p-8 backdrop-blur-sm flex items-start gap-4 sm:gap-6 shadow-lg">
        <div class="w-12 h-12 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
        </div>
        <div class="space-y-1">
          <span class="text-xs sm:text-sm font-extrabold font-heading uppercase tracking-wider text-teal-light">Import / Export distinction</span>
          <p class="text-base sm:text-lg text-white font-medium leading-relaxed">A pet travelling from another country into Dubai is an <strong class="text-teal-bright font-black">import into Dubai</strong>. A pet travelling from Dubai/UAE to another country is an <strong class="text-teal-bright font-black">export from the UAE</strong>.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. INTERNATIONAL JOURNEY SUPPORT SECTION -->
  <section class="py-20 sm:py-24 bg-[#FBFBFA] border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-4">
        <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]">INTERNATIONAL JOURNEY SUPPORT</p>
        <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]">From Dubai to the World, and Back Again</h2>
        <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-body">International pet relocation can involve several people, documents and travel arrangements. Our role is to help bring those moving parts together so you have a clearer picture of what happens before your pet travels, during the journey and at the agreed destination.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div class="rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5">
          <div class="w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass w-7 h-7"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <div class="space-y-2 flex-1">
            <h3 class="text-xl font-black font-heading text-navy">Route Support</h3>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We review the origin, destination and travel timing so the relocation plan is built around the actual route.</p>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5">
          <div class="w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-7 h-7"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
          </div>
          <div class="space-y-2 flex-1">
            <h3 class="text-xl font-black font-heading text-navy">Documentation Support</h3>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We help you understand the veterinary and travel documentation that may apply to your pet and destination.</p>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5">
          <div class="w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-boxes w-7 h-7"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path><path d="m7 16.5-4.74-2.85"></path><path d="m7 16.5 5-3"></path><path d="M7 16.5v5.17"></path><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path><path d="m17 16.5-5-3"></path><path d="m17 16.5 4.74-2.85"></path><path d="M17 16.5v5.17"></path><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path><path d="M12 8 7.26 5.15"></path><path d="m12 8 4.74-2.85"></path><path d="M12 13.5V8"></path></svg>
          </div>
          <div class="space-y-2 flex-1">
            <h3 class="text-xl font-black font-heading text-navy">Travel Preparation</h3>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We can coordinate the agreed crate, airline and transportation arrangements required for the selected service.</p>
          </div>
        </div>
        <div class="rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5">
          <div class="w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck w-7 h-7"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
          </div>
          <div class="space-y-2 flex-1">
            <h3 class="text-xl font-black font-heading text-navy">Local Ground Transport</h3>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">The international journey can also connect with local pet transportation, including door-to-airport or airport-to-door travel where included in the service.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. BOTTOM CTA SECTION -->
  <section class="relative overflow-hidden text-white py-20 sm:py-24">
    <div class="absolute inset-0" aria-hidden="true">
      <img alt="Happy pets travelling with Global Pet Cab" loading="lazy" decoding="async" data-nimg="fill" class="object-cover object-center" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75"/>
      <div class="absolute inset-0 bg-navy/80"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/60 to-navy/70"></div>
    </div>
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <p class="text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]">READY TO PLAN YOUR PET&#x27;S JOURNEY?</p>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">Let&#x27;s Get Your Pet Moving.</h2>
      <p class="text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">Whether you need a Dubai pet taxi, an airport transfer or help with international pet relocation, start by telling us where your pet needs to go. We&#x27;ll help you work out the next step.</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <a class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all transform active:scale-95 text-base" href="/get-a-quote">
          <span>Get a Free Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all transform active:scale-95 text-base shadow-lg shadow-emerald-900/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  </section>
</div></main>`;

// 2. Helper to build RSC element tree
function buildRscChildren(imgRef, linkRef) {
  return [
    // 1. Hero Section
    ["$","section",null,{"className":"relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-28 lg:pb-32","children":[
      ["$","div",null,{"className":"absolute inset-0","aria-hidden":"true","children":[
        ["$",imgRef,null,{"src":"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=2000&q=80","alt":"Global Pet Cab pet travel support","fill":true,"priority":true,"className":"object-cover object-[center_35%]","sizes":"100vw"}],
        ["$","div",null,{"className":"absolute inset-0 bg-navy/75"}],
        ["$","div",null,{"className":"absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40"}]
      ]}],
      ["$","div",null,{"className":"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8","children":[
        ["$","div",null,{"className":"max-w-3xl space-y-6","children":[
          ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]","children":"HOW IT WORKS"}],
          ["$","h1",null,{"className":"text-4xl sm:text-5xl lg:text-[56px] font-black font-heading tracking-tight leading-[1.1]","children":"How Global Pet Cab Works"}],
          ["$","p",null,{"className":"text-base sm:text-xl text-white/90 leading-relaxed max-w-2xl font-body","children":"From a quick pet taxi ride across Dubai to an international move, we keep the process clear from the first enquiry to the final drop-off. Choose the journey you need, share a few details about your pet, and we'll guide you through the next steps."}],
          ["$","div",null,{"className":"flex flex-wrap items-center gap-3 pt-1","children":[
            ["$","span",null,{"className":"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-car w-4 h-4 text-teal-bright","children":[
                ["$","path","1",{"d":"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],
                ["$","circle","2",{"cx":"7","cy":"17","r":"2"}],
                ["$","path","3",{"d":"M9 17h6"}],
                ["$","circle","4",{"cx":"17","cy":"17","r":"2"}]
              ]}],
              "Local City Rides"
            ]}],
            ["$","span",null,{"className":"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-globe w-4 h-4 text-teal-bright","children":[
                ["$","circle","1",{"cx":"12","cy":"12","r":"10"}],
                ["$","path","2",{"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],
                ["$","path","3",{"d":"M2 12h20"}]
              ]}],
              "Cross-Border Logistics"
            ]}],
            ["$","span",null,{"className":"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-teal-light text-xs sm:text-sm font-bold font-heading backdrop-blur-sm","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-shield-check w-4 h-4 text-teal-bright","children":[
                ["$","path","1",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],
                ["$","path","2",{"d":"m9 12 2 2 4-4"}]
              ]}],
              "IATA & MOCCAE"
            ]}]
          ]}],
          ["$","div",null,{"className":"flex flex-wrap items-center gap-4 pt-2","children":[
            ["$",linkRef,null,{"href":"/get-a-quote","className":"inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-coral hover:bg-coral-hover text-white font-extrabold text-sm sm:text-base shadow-fj-coral transition-all transform active:scale-95 font-heading","children":[
              ["$","span",null,{"children":"Get a Free Quote"}],
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
            ]}],
            ["$","a",null,{"href":"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai","target":"_blank","rel":"noopener noreferrer","className":"inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base transition-all transform active:scale-95 shadow-lg shadow-emerald-900/20 font-heading","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-message-circle w-4 h-4","children":[["$","path","1",{"d":"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]}],
              ["$","span",null,{"children":"WhatsApp Us"}]
            ]}]
          ]}]
        ]}],
        ["$","div",null,{"className":"relative z-30 translate-y-1/2 mt-10","children":[
          ["$","div",null,{"className":"bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-border","children":[
            ["$","div",null,{"className":"grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-teal-border","children":[
              ["$","div",null,{"className":"flex flex-col items-center justify-center p-2 space-y-1","children":[
                ["$","div",null,{"className":"flex items-center gap-1.5 text-amber-500 font-heading font-extrabold text-xl sm:text-2xl","children":[
                  ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-star w-6 h-6 fill-amber-400 text-amber-400","children":[["$","polygon","1",{"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}]]}],
                  ["$","span",null,{"children":"IPATA"}]
                ]}],
                ["$","div",null,{"className":"text-sm sm:text-base font-heading font-extrabold text-navy","children":"IPATA Member"}],
                ["$","div",null,{"className":"text-xs sm:text-sm text-slate-600 font-body","children":"Accredited pet transport association"}]
              ]}],
              ["$","div",null,{"className":"flex flex-col items-center justify-center p-2 space-y-1","children":[
                ["$","div",null,{"className":"flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl","children":[
                  ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-heart-handshake w-6 h-6","children":[
                    ["$","path","1",{"d":"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"}],
                    ["$","path","2",{"d":"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"}],
                    ["$","path","3",{"d":"m18 15-2-2"}],
                    ["$","path","4",{"d":"m15 18-2-2"}]
                  ]}],
                  ["$","span",null,{"children":"IATA"}]
                ]}],
                ["$","div",null,{"className":"text-sm sm:text-base font-heading font-extrabold text-navy","children":"IATA-Compliant Handling"}],
                ["$","div",null,{"className":"text-xs sm:text-sm text-slate-600 font-body","children":"Live animal regulations & crates"}]
              ]}],
              ["$","div",null,{"className":"flex flex-col items-center justify-center p-2 space-y-1","children":[
                ["$","div",null,{"className":"flex items-center gap-2 text-teal-deep font-heading font-extrabold text-xl sm:text-2xl","children":[
                  ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-earth w-6 h-6","children":[
                    ["$","path","1",{"d":"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],
                    ["$","path","2",{"d":"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"}],
                    ["$","path","3",{"d":"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],
                    ["$","circle","4",{"cx":"12","cy":"12","r":"10"}]
                  ]}],
                  ["$","span",null,{"children":"45+ Countries"}]
                ]}],
                ["$","div",null,{"className":"text-sm sm:text-base font-heading font-extrabold text-navy","children":"Global Network"}],
                ["$","div",null,{"className":"text-xs sm:text-sm text-slate-600 font-body","children":"IATA & MOCCAE compliant"}]
              ]}],
              ["$","div",null,{"className":"flex flex-col items-center justify-center p-2 space-y-1","children":[
                ["$","div",null,{"className":"flex items-center gap-2 text-emerald-600 font-heading font-extrabold text-xl sm:text-2xl","children":[
                  ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-shield-check w-6 h-6","children":[
                    ["$","path","1",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],
                    ["$","path","2",{"d":"m9 12 2 2 4-4"}]
                  ]}],
                  ["$","span",null,{"children":"2,000+"}]
                ]}],
                ["$","div",null,{"className":"text-sm sm:text-base font-heading font-extrabold text-navy","children":"Pets Transported"}],
                ["$","div",null,{"className":"text-xs sm:text-sm text-slate-600 font-body","children":"Live animal regulations & crates"}]
              ]}]
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 2. Anchor Navigation Cards
    ["$","section",null,{"className":"pt-32 sm:pt-36 lg:pt-40 pb-8 bg-[#FBFBFA]","children":[
      ["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8","children":[
        ["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2 gap-6","children":[
          ["$","a",null,{"href":"#dubai-taxi-steps","className":"group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"flex items-start gap-5","children":[
              ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center shrink-0","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-car w-7 h-7","children":[
                  ["$","path","1",{"d":"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],
                  ["$","circle","2",{"cx":"7","cy":"17","r":"2"}],
                  ["$","path","3",{"d":"M9 17h6"}],
                  ["$","circle","4",{"cx":"17","cy":"17","r":"2"}]
                ]}]
              ]}],
              ["$","div",null,{"className":"min-w-0 flex-1","children":[
                ["$","p",null,{"className":"text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]","children":"Local City Rides"}],
                ["$","p",null,{"className":"text-xl sm:text-2xl font-black font-heading text-navy mt-1","children":"Dubai Pet Taxi Journey Steps"}],
                ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5","children":"Need to get your pet across Dubai? Follow three simple steps to book a Dubai pet taxi for vet visits, grooming, boarding, airport transfers and other local journeys."}]
              ]}]
            ]}],
            ["$","div",null,{"className":"mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy","children":[
              ["$","span",null,{"children":"View Local Ride Steps"}],
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
            ]}]
          ]}],
          ["$","a",null,{"href":"#international-steps","className":"group rounded-[28px] bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"flex items-start gap-5","children":[
              ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-navy text-teal-light flex items-center justify-center shrink-0","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-globe w-7 h-7","children":[
                  ["$","circle","1",{"cx":"12","cy":"12","r":"10"}],
                  ["$","path","2",{"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],
                  ["$","path","3",{"d":"M2 12h20"}]
                ]}]
              ]}],
              ["$","div",null,{"className":"min-w-0 flex-1","children":[
                ["$","p",null,{"className":"text-[11px] font-extrabold font-heading text-teal-deep uppercase tracking-[0.16em]","children":"Cross-Border Logistics"}],
                ["$","p",null,{"className":"text-xl sm:text-2xl font-black font-heading text-navy mt-1","children":"International Relocation Steps"}],
                ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed mt-2.5","children":"Moving your pet to or from another country? We'll help you understand the route, prepare the required travel details and coordinate the relocation process."}]
              ]}]
            ]}],
            ["$","div",null,{"className":"mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-teal-deep font-extrabold text-sm font-heading group-hover:text-navy","children":[
              ["$","span",null,{"children":"View International Relocation Steps"}],
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 3. Local City Rides Section
    ["$","section",null,{"id":"dubai-taxi-steps","className":"py-16 sm:py-20 bg-[#FBFBFA] scroll-mt-24 border-t border-slate-200/60","children":[
      ["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8","children":[
        ["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center","children":[
          ["$","div",null,{"className":"lg:col-span-5 relative min-h-[380px] sm:min-h-[500px] rounded-[32px] overflow-hidden shadow-fj-card","children":[
            ["$",imgRef,null,{"src":"https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1400&q=80","alt":"Pet travelling in a climate-controlled Dubai pet taxi","fill":true,"className":"object-cover","sizes":"(max-width: 1024px) 100vw, 42vw"}],
            ["$","div",null,{"className":"absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"}],
            ["$","div",null,{"className":"absolute bottom-5 left-5 right-5","children":[
              ["$","div",null,{"className":"inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-navy text-xs sm:text-sm font-extrabold font-heading px-4 py-2.5 rounded-full shadow-md","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-shield-check w-4 h-4 text-teal-deep","children":[
                  ["$","path","1",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],
                  ["$","path","2",{"d":"m9 12 2 2 4-4"}]
                ]}],
                "CLIMATE-CONTROLLED FLEET"
              ]}]
            ]}]
          ]}],
          ["$","div",null,{"className":"lg:col-span-7 space-y-6","children":[
            ["$","div",null,{"className":"flex items-center gap-4","children":[
              ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center shrink-0 shadow-md","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-car w-7 h-7","children":[
                  ["$","path","1",{"d":"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],
                  ["$","circle","2",{"cx":"7","cy":"17","r":"2"}],
                  ["$","path","3",{"d":"M9 17h6"}],
                  ["$","circle","4",{"cx":"17","cy":"17","r":"2"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]","children":"LOCAL CITY RIDES"}],
                ["$","h2",null,{"className":"text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-navy tracking-tight","children":"Dubai Pet Taxi Journey Steps"}]
              ]}]
            ]}],
            ["$","p",null,{"className":"text-base sm:text-lg text-slate-700 leading-relaxed font-body","children":"Booking pet transportation in Dubai should not feel complicated. Start with your pickup and drop-off details, tell us about your pet, and we'll take care of the agreed ride."}],
            ["$","ol",null,{"className":"relative space-y-4 pt-2","children":[
              ["$","div",null,{"className":"absolute left-[23px] top-6 bottom-6 w-px bg-teal-border hidden sm:block","aria-hidden":"true"}],
              ["$","li","1",{"className":"relative flex gap-4 sm:gap-5","children":[
                ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base","children":"1"}],
                ["$","div",null,{"className":"flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors","children":[
                  ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Calculate Your Fare"}],
                  ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"Enter your pickup and drop-off locations in Dubai. Our fare engine uses the journey distance and selected ride details to provide an estimated Dubai pet taxi fare."}]
                ]}]
              ]}],
              ["$","li","2",{"className":"relative flex gap-4 sm:gap-5","children":[
                ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base","children":"2"}],
                ["$","div",null,{"className":"flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors","children":[
                  ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Share Your Pet Details"}],
                  ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"Tell us your pet's type, number of pets, travel date and preferred pickup time. These details help us understand the ride and make the right arrangements."}]
                ]}]
              ]}],
              ["$","li","3",{"className":"relative flex gap-4 sm:gap-5","children":[
                ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-white border border-teal-border text-teal-deep flex items-center justify-center shrink-0 shadow-sm font-black font-heading text-base","children":"3"}],
                ["$","div",null,{"className":"flex-1 min-w-0 bg-white rounded-[24px] border border-teal-border p-5 sm:p-6 shadow-fj-card hover:border-teal-deep/50 transition-colors","children":[
                  ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Driver Pickup & Ride"}],
                  ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"Your driver arrives at the pickup location in a climate-controlled vehicle and takes your pet to the agreed destination. Pet parents can ride along or track the journey through WhatsApp, where applicable."}]
                ]}]
              ]}]
            ]}],
            ["$","div",null,{"className":"pt-2","children":[
              ["$",linkRef,null,{"href":"/dubai-pet-taxi","className":"inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-deep hover:bg-teal-dark text-white font-extrabold font-heading text-sm sm:text-base shadow-sm transition-all transform active:scale-95","children":[
                ["$","span",null,{"children":"Calculate a Dubai Pet Taxi Fare"}],
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
              ]}]
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 4. Local Pet Transport Options Section
    ["$","section",null,{"className":"py-20 bg-gradient-to-b from-white to-[#F0F6F8] border-t border-teal-border/40","children":[
      ["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12","children":[
        ["$","div",null,{"className":"max-w-3xl space-y-4","children":[
          ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]","children":"LOCAL PET TRANSPORT OPTIONS"}],
          ["$","h2",null,{"className":"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]","children":"More Than Just a Ride Across Dubai"}],
          ["$","p",null,{"className":"text-base sm:text-lg text-slate-700 leading-relaxed","children":"Our Dubai pet taxi service can support everyday journeys as well as important appointments. Depending on the service you book, this can include door-to-door pet transport, airport transfers, grooming visits, boarding drop-offs and selected health-related appointments."}]
        ]}],
        ["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6","children":[
          ["$","div","1",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-stethoscope w-6 h-6","children":[
                  ["$","path","1",{"d":"M11 2v2"}],
                  ["$","path","2",{"d":"M5 2v2"}],
                  ["$","path","3",{"d":"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"}],
                  ["$","path","4",{"d":"M8 15a6 6 0 0 0 12 0v-3"}],
                  ["$","circle","5",{"cx":"20","cy":"10","r":"2"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Vet and health appointments"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"transportation for essential veterinary visits when you need help getting your pet there."}]
              ]}]
            ]}]
          ]}],
          ["$","div","2",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-scissors w-6 h-6","children":[
                  ["$","circle","1",{"cx":"6","cy":"6","r":"3"}],
                  ["$","circle","2",{"cx":"6","cy":"18","r":"3"}],
                  ["$","line","3",{"x1":"20","x2":"8.12","y1":"4","y2":"15.88"}],
                  ["$","line","4",{"x1":"14.47","x2":"20","y1":"14.48","y2":"20"}],
                  ["$","line","5",{"x1":"8.12","x2":"12","y1":"8.12","y2":"12"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Grooming and salon visits"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"pickup and drop-off support when you are unavailable, subject to the service arrangement."}]
              ]}]
            ]}]
          ]}],
          ["$","div","3",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-building-2 w-6 h-6","children":[
                  ["$","path","1",{"d":"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}],
                  ["$","path","2",{"d":"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}],
                  ["$","path","3",{"d":"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}],
                  ["$","path","4",{"d":"M10 6h4"}],
                  ["$","path","5",{"d":"M10 10h4"}],
                  ["$","path","6",{"d":"M10 14h4"}],
                  ["$","path","7",{"d":"M10 18h4"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Pet boarding and hotels"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"transport to and from boarding facilities and pet hotels."}]
              ]}]
            ]}]
          ]}],
          ["$","div","4",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-plane-takeoff w-6 h-6","children":[
                  ["$","path","1",{"d":"M2 22h20"}],
                  ["$","path","2",{"d":"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1 9.94 4.97a2 2 0 0 0 1.8 0L22 14"}],
                  ["$","path","3",{"d":"m10 15.5 3-3L8 9.5l4-2 3.5 3.5"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Door-to-airport transfers"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"take your pet from home or another pickup point to the airport."}]
              ]}]
            ]}]
          ]}],
          ["$","div","5",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-plane-landing w-6 h-6","children":[
                  ["$","path","1",{"d":"M2 22h20"}],
                  ["$","path","2",{"d":"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28 1.2.28 1.76 0l.17-.08 9.94-4.97c.56-.28 1.21-.28 1.76 0L22 2.5"}],
                  ["$","path","3",{"d":"m12 6.5 1 3.5L8.5 12l2.5 3.5-3 1.5"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Airport-to-door transfers"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"bring your pet home or to the agreed destination after arrival."}]
              ]}]
            ]}]
          ]}],
          ["$","div","6",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-home w-6 h-6","children":[
                  ["$","path","1",{"d":"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],
                  ["$","polyline","2",{"points":"9 22 9 12 15 12 15 22"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Home moves"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"help your pet travel between homes within Dubai."}]
              ]}]
            ]}]
          ]}],
          ["$","div","7",{"className":"rounded-3xl bg-white border border-teal-border/80 p-6 sm:p-7 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex flex-col justify-between","children":[
            ["$","div",null,{"className":"space-y-4","children":[
              ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center","children":[
                ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-truck w-6 h-6","children":[
                  ["$","path","1",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],
                  ["$","path","2",{"d":"M15 18H9"}],
                  ["$","path","3",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],
                  ["$","circle","4",{"cx":"17","cy":"18","r":"2"}],
                  ["$","circle","5",{"cx":"7","cy":"18","r":"2"}]
                ]}]
              ]}],
              ["$","div",null,{"children":[
                ["$","h3",null,{"className":"text-lg sm:text-xl font-black font-heading text-navy","children":"Selected city-to-city ground transport"}],
                ["$","p",null,{"className":"mt-2 text-sm sm:text-base text-slate-600 leading-relaxed","children":"ask the team about available routes beyond Dubai."}]
              ]}]
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 5. Cross-Border Logistics Section
    ["$","section",null,{"id":"international-steps","className":"py-20 sm:py-24 bg-navy text-white scroll-mt-24","children":[
      ["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12","children":[
        ["$","div",null,{"className":"flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6","children":[
          ["$","div",null,{"className":"flex items-start gap-4 max-w-3xl","children":[
            ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0 shadow-lg mt-1","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-globe w-7 h-7","children":[
                ["$","circle","1",{"cx":"12","cy":"12","r":"10"}],
                ["$","path","2",{"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],
                ["$","path","3",{"d":"M2 12h20"}]
              ]}]
            ]}],
            ["$","div",null,{"className":"space-y-3","children":[
              ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.18em]","children":"CROSS-BORDER LOGISTICS"}],
              ["$","h2",null,{"className":"text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white","children":"International Pet Relocation Steps"}],
              ["$","p",null,{"className":"text-base sm:text-lg text-slate-300 leading-relaxed","children":"International pet relocation involves more planning than a local ride. We help you start with the route, understand what needs to be prepared and coordinate the agreed parts of the journey."}]
            ]}]
          ]}],
          ["$",linkRef,null,{"href":"/international-pet-relocation","className":"inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-extrabold font-heading text-teal-light hover:text-white transition-all shrink-0","children":[
            ["$","span",null,{"children":"View International Relocation Services"}],
            ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
          ]}]
        ]}],
        ["$","div",null,{"className":"relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4","children":[
          ["$","div",null,{"className":"hidden lg:block absolute top-[38px] left-[12%] right-[12%] h-px bg-white/15","aria-hidden":"true"}],
          ["$","article","1",{"className":"relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between","children":[
            ["$","div",null,{"children":[
              ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg","children":"1"}],
              ["$","p",null,{"className":"text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light","children":"Step 1"}],
              ["$","h3",null,{"className":"mt-2 text-lg sm:text-xl font-black font-heading text-white","children":"Request a Quote"}],
              ["$","p",null,{"className":"mt-3 text-sm text-slate-300 leading-relaxed","children":"Share your origin and destination, tentative travel date, pet details and the services you need. This gives our team the information needed to review your route."}]
            ]}]
          ]}],
          ["$","article","2",{"className":"relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between","children":[
            ["$","div",null,{"children":[
              ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg","children":"2"}],
              ["$","p",null,{"className":"text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light","children":"Step 2"}],
              ["$","h3",null,{"className":"mt-2 text-lg sm:text-xl font-black font-heading text-white","children":"Veterinary Preparation"}],
              ["$","p",null,{"className":"mt-3 text-sm text-slate-300 leading-relaxed","children":"Depending on the destination and your pet's circumstances, preparation may include microchip details, vaccinations, veterinary documentation and blood testing such as RNATT."}]
            ]}]
          ]}],
          ["$","article","3",{"className":"relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between","children":[
            ["$","div",null,{"children":[
              ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg","children":"3"}],
              ["$","p",null,{"className":"text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light","children":"Step 3"}],
              ["$","h3",null,{"className":"mt-2 text-lg sm:text-xl font-black font-heading text-white","children":"Permits & Travel Crates"}],
              ["$","p",null,{"className":"mt-3 text-sm text-slate-300 leading-relaxed","children":"Where required, the relocation plan can include UAE export or import documentation and preparation of an appropriate airline travel crate. Destination requirements vary by route."}]
            ]}]
          ]}],
          ["$","article","4",{"className":"relative rounded-[28px] bg-white/5 border border-white/10 p-6 sm:p-7 hover:bg-white/[0.08] transition-colors flex flex-col justify-between","children":[
            ["$","div",null,{"children":[
              ["$","div",null,{"className":"relative z-10 w-12 h-12 rounded-2xl bg-navy-light border border-white/15 text-teal-light flex items-center justify-center mb-5 font-black font-heading text-lg","children":"4"}],
              ["$","p",null,{"className":"text-xs font-extrabold font-heading uppercase tracking-widest text-teal-light","children":"Step 4"}],
              ["$","h3",null,{"className":"mt-2 text-lg sm:text-xl font-black font-heading text-white","children":"Flight & Delivery"}],
              ["$","p",null,{"className":"mt-3 text-sm text-slate-300 leading-relaxed","children":"Once the travel arrangements are in place, the agreed transportation and relocation steps are coordinated through departure, flight arrangements and arrival or handover."}]
            ]}]
          ]}]
        ]}],
        ["$","div",null,{"className":"rounded-3xl bg-gradient-to-r from-white/10 to-white/5 border border-teal-light/30 p-6 sm:p-8 backdrop-blur-sm flex items-start gap-4 sm:gap-6 shadow-lg","children":[
          ["$","div",null,{"className":"w-12 h-12 rounded-2xl bg-teal-bright text-navy flex items-center justify-center shrink-0","children":[
            ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-help-circle w-6 h-6","children":[
              ["$","circle","1",{"cx":"12","cy":"12","r":"10"}],
              ["$","path","2",{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}],
              ["$","line","3",{"x1":"12","x2":"12.01","y1":"17","y2":"17"}]
            ]}]
          ]}],
          ["$","div",null,{"className":"space-y-1","children":[
            ["$","span",null,{"className":"text-xs sm:text-sm font-extrabold font-heading uppercase tracking-wider text-teal-light","children":"Import / Export distinction"}],
            ["$","p",null,{"className":"text-base sm:text-lg text-white font-medium leading-relaxed","children":[
              "A pet travelling from another country into Dubai is an ",
              ["$","strong",null,{"className":"text-teal-bright font-black","children":"import into Dubai"}],
              ". A pet travelling from Dubai/UAE to another country is an ",
              ["$","strong",null,{"className":"text-teal-bright font-black","children":"export from the UAE"}],
              "."
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 6. International Journey Support Section
    ["$","section",null,{"className":"py-20 sm:py-24 bg-[#FBFBFA] border-t border-slate-200/60","children":[
      ["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12","children":[
        ["$","div",null,{"className":"max-w-3xl space-y-4","children":[
          ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-deep uppercase tracking-[0.18em]","children":"INTERNATIONAL JOURNEY SUPPORT"}],
          ["$","h2",null,{"className":"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]","children":"From Dubai to the World, and Back Again"}],
          ["$","p",null,{"className":"text-base sm:text-lg text-slate-700 leading-relaxed font-body","children":"International pet relocation can involve several people, documents and travel arrangements. Our role is to help bring those moving parts together so you have a clearer picture of what happens before your pet travels, during the journey and at the agreed destination."}]
        ]}],
        ["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8","children":[
          ["$","div","1",{"className":"rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5","children":[
            ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-compass w-7 h-7","children":[
                ["$","circle","1",{"cx":"12","cy":"12","r":"10"}],
                ["$","polygon","2",{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}]
              ]}]
            ]}],
            ["$","div",null,{"className":"space-y-2 flex-1","children":[
              ["$","h3",null,{"className":"text-xl font-black font-heading text-navy","children":"Route Support"}],
              ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed","children":"We review the origin, destination and travel timing so the relocation plan is built around the actual route."}]
            ]}]
          ]}],
          ["$","div","2",{"className":"rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5","children":[
            ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-file-text w-7 h-7","children":[
                ["$","path","1",{"d":"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],
                ["$","path","2",{"d":"M14 2v4a2 2 0 0 0 2 2h4"}],
                ["$","path","3",{"d":"M10 9H8"}],
                ["$","path","4",{"d":"M16 13H8"}],
                ["$","path","5",{"d":"M16 17H8"}]
              ]}]
            ]}],
            ["$","div",null,{"className":"space-y-2 flex-1","children":[
              ["$","h3",null,{"className":"text-xl font-black font-heading text-navy","children":"Documentation Support"}],
              ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed","children":"We help you understand the veterinary and travel documentation that may apply to your pet and destination."}]
            ]}]
          ]}],
          ["$","div","3",{"className":"rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5","children":[
            ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-boxes w-7 h-7","children":[
                ["$","path","1",{"d":"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],
                ["$","path","2",{"d":"m7 16.5-4.74-2.85"}],
                ["$","path","3",{"d":"m7 16.5 5-3"}],
                ["$","path","4",{"d":"M7 16.5v5.17"}],
                ["$","path","5",{"d":"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],
                ["$","path","6",{"d":"m17 16.5-5-3"}],
                ["$","path","7",{"d":"m17 16.5 4.74-2.85"}],
                ["$","path","8",{"d":"M17 16.5v5.17"}],
                ["$","path","9",{"d":"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],
                ["$","path","10",{"d":"M12 8 7.26 5.15"}],
                ["$","path","11",{"d":"m12 8 4.74-2.85"}],
                ["$","path","12",{"d":"M12 13.5V8"}]
              ]}]
            ]}],
            ["$","div",null,{"className":"space-y-2 flex-1","children":[
              ["$","h3",null,{"className":"text-xl font-black font-heading text-navy","children":"Travel Preparation"}],
              ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed","children":"We can coordinate the agreed crate, airline and transportation arrangements required for the selected service."}]
            ]}]
          ]}],
          ["$","div","4",{"className":"rounded-3xl bg-white border border-teal-border p-7 sm:p-8 shadow-fj-card hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all flex items-start gap-5","children":[
            ["$","div",null,{"className":"w-14 h-14 rounded-2xl bg-teal-soft border border-teal-border text-teal-deep flex items-center justify-center shrink-0","children":[
              ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-truck w-7 h-7","children":[
                ["$","path","1",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],
                ["$","path","2",{"d":"M15 18H9"}],
                ["$","path","3",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],
                ["$","circle","4",{"cx":"17","cy":"18","r":"2"}],
                ["$","circle","5",{"cx":"7","cy":"18","r":"2"}]
              ]}]
            ]}],
            ["$","div",null,{"className":"space-y-2 flex-1","children":[
              ["$","h3",null,{"className":"text-xl font-black font-heading text-navy","children":"Local Ground Transport"}],
              ["$","p",null,{"className":"text-sm sm:text-base text-slate-600 leading-relaxed","children":"The international journey can also connect with local pet transportation, including door-to-airport or airport-to-door travel where included in the service."}]
            ]}]
          ]}]
        ]}]
      ]}]
    ]}],

    // 7. Bottom CTA Section
    ["$","section",null,{"className":"relative overflow-hidden text-white py-20 sm:py-24","children":[
      ["$","div",null,{"className":"absolute inset-0","aria-hidden":"true","children":[
        ["$",imgRef,null,{"src":"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80","alt":"Happy pets travelling with Global Pet Cab","fill":true,"className":"object-cover object-center","sizes":"100vw"}],
        ["$","div",null,{"className":"absolute inset-0 bg-navy/80"}],
        ["$","div",null,{"className":"absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/60 to-navy/70"}]
      ]}],
      ["$","div",null,{"className":"relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6","children":[
        ["$","p",null,{"className":"text-[11px] sm:text-xs font-extrabold font-heading text-teal-light uppercase tracking-[0.2em]","children":"READY TO PLAN YOUR PET'S JOURNEY?"}],
        ["$","h2",null,{"className":"text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white","children":"Let's Get Your Pet Moving."}],
        ["$","p",null,{"className":"text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed","children":"Whether you need a Dubai pet taxi, an airport transfer or help with international pet relocation, start by telling us where your pet needs to go. We'll help you work out the next step."}],
        ["$","div",null,{"className":"flex flex-col sm:flex-row justify-center gap-4 pt-4","children":[
          ["$",linkRef,null,{"href":"/get-a-quote","className":"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all transform active:scale-95 text-base","children":[
            ["$","span",null,{"children":"Get a Free Quote"}],
            ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-5 h-5","children":[["$","path","1",{"d":"M5 12h14"}],["$","path","2",{"d":"m12 5 7 7-7 7"}]]}]
          ]}],
          ["$","a",null,{"href":"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai","target":"_blank","rel":"noopener noreferrer","className":"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all transform active:scale-95 text-base shadow-lg shadow-emerald-900/30","children":[
            ["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-message-circle w-5 h-5","children":[["$","path","1",{"d":"M7.9 20A9 9 0 1 0 4 16.1L2 22Z"}]]}],
            ["$","span",null,{"children":"WhatsApp Us"}]
          ]}]
        ]}]
      ]}]
    ]}]
  ];
}

// -------------------------------------------------------------
// STEP A: Patch .next/server/app/how-it-works.html
// -------------------------------------------------------------
const htmlPath = path.join(root, '.next/server/app/how-it-works.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace DOM <main class="flex-grow">...</main>
const mainStart = html.indexOf('<main class="flex-grow">');
const mainEnd = html.indexOf('</main>');
if (mainStart !== -1 && mainEnd !== -1) {
  html = html.substring(0, mainStart) + newMainHtml + html.substring(mainEnd + 7);
  console.log('Replaced DOM <main> in how-it-works.html');
}

// Replace Script 2 flight payload in how-it-works.html
const scripts = html.match(/<script>self\.__next_f\.push\(.*?\)<\/script>/g) || [];
if (scripts.length >= 3) {
  let targetScript = scripts[2];
  let payload;
  const self = { __next_f: { push: (arg) => { payload = arg; } } };
  eval(targetScript.replace('<script>', '').replace('<\/script>', ''));
  const jsonStr = payload[1].substring(2);
  const data = JSON.parse(jsonStr.trim());

  // Inject updated 7 sections into flight seed data
  data[3].initialSeedData[1].children[1].children[2][0][1][3].children = buildRscChildren("$L4", "$L5");

  const newScriptContent = '<script>self.__next_f.push([1,' + JSON.stringify('0:' + JSON.stringify(data) + '\n') + '])</script>';
  html = html.replace(targetScript, newScriptContent);
  console.log('Replaced script 2 flight payload in how-it-works.html');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved .next/server/app/how-it-works.html');

// -------------------------------------------------------------
// STEP B: Patch .next/server/app/how-it-works.rsc
// -------------------------------------------------------------
const rscPath = path.join(root, '.next/server/app/how-it-works.rsc');
let rsc = fs.readFileSync(rscPath, 'utf8');
const rscLines = rsc.split('\n');
const rsc0Idx = rscLines.findIndex(l => l.startsWith('0:'));
if (rsc0Idx !== -1) {
  const rscData = JSON.parse(rscLines[rsc0Idx].substring(2));
  rscData[1][0][1][1].children[1].children[2][0][1][3].children = buildRscChildren("$L2", "$L3");
  rscLines[rsc0Idx] = '0:' + JSON.stringify(rscData);
  fs.writeFileSync(rscPath, rscLines.join('\n'), 'utf8');
  console.log('Saved .next/server/app/how-it-works.rsc');
}

console.log('=== How It Works Patch Completed Successfully ===');
