import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

const customCssRule = `
/* Custom Heading Font Sizes */
.hero-heading-45, .lg\\:text-\\[45px\\], .text-\\[45px\\] {
  font-size: 45px !important;
  line-height: 1.15 !important;
}
.service-heading-27, .sm\\:text-\\[27px\\], .text-\\[27px\\] {
  font-size: 27px !important;
  line-height: 1.25 !important;
}
.journeys-heading-33, .sm\\:text-\\[33px\\], .text-\\[33px\\] {
  font-size: 33px !important;
  line-height: 1.2 !important;
}
.questions-heading-25, .text-\\[25px\\] {
  font-size: 25px !important;
  line-height: 1.25 !important;
}
.cta-heading-36, .sm\\:text-\\[36px\\], .text-\\[36px\\] {
  font-size: 36px !important;
  line-height: 1.2 !important;
}
h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 {
  font-size: 2.5rem !important;
  line-height: 1.2 !important;
}
@media (min-width: 640px) {
  h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 {
    font-size: 2.5rem !important;
    line-height: 1.2 !important;
  }
}
@media (min-width: 1024px) {
  h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 {
    font-size: 2.5rem !important;
    line-height: 1.2 !important;
  }
}
.destination-card-flation {
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F9FA 100%) !important;
  border: 1.5px solid rgba(14, 115, 150, 0.2) !important;
  box-shadow: 0 4px 18px -2px rgba(5, 45, 73, 0.06) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.destination-card-flation:hover {
  background: #FFFFFF !important;
  border-color: #0E7396 !important;
  transform: translateY(-6px) !important;
  box-shadow: 0 20px 36px -6px rgba(14, 115, 150, 0.16) !important;
}
.destination-card-flation .w-12, .destination-card-flation .w-11, .destination-icon-box {
  background: linear-gradient(135deg, #E6F6FA 0%, #D2F0F8 100%) !important;
  border: 1.5px solid rgba(14, 115, 150, 0.28) !important;
  color: #0E7396 !important;
  box-shadow: 0 2px 8px rgba(14, 115, 150, 0.1) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.destination-card-flation .w-12 svg, .destination-card-flation .w-11 svg, .destination-icon-box svg {
  stroke: #0E7396 !important;
  color: #0E7396 !important;
  transition: stroke 0.3s ease, transform 0.3s ease !important;
}
.destination-card-flation:hover .w-12, .destination-card-flation:hover .w-11, .destination-card-flation:hover .destination-icon-box {
  background: #0E7396 !important;
  border-color: #0E7396 !important;
  color: #FFFFFF !important;
  transform: scale(1.1) !important;
  box-shadow: 0 6px 16px rgba(14, 115, 150, 0.3) !important;
}
.destination-card-flation:hover .w-12 svg, .destination-card-flation:hover .w-11 svg, .destination-card-flation:hover .destination-icon-box svg {
  stroke: #FFFFFF !important;
  color: #FFFFFF !important;
}
.taxi-pricing-card {
  background: #FFFFFF !important;
  border: 1.5px solid rgba(14, 115, 150, 0.22) !important;
  box-shadow: 0 6px 20px -3px rgba(5, 45, 73, 0.07) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.taxi-pricing-card:hover {
  border-color: #0E7396 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 36px -6px rgba(14, 115, 150, 0.16) !important;
}
.taxi-pricing-card.featured {
  border: 2px solid #0E7396 !important;
  box-shadow: 0 12px 32px -4px rgba(14, 115, 150, 0.16) !important;
}
/* Pricing Pale Fix: Transforms flat container into rich, raised, non-pale cards */
section.bg-\\[\\#F6F8FA\\] {
  background: linear-gradient(180deg, #F0F6F8 0%, #E3EDF2 100%) !important;
}
.pricing-pale-fix {
  background: linear-gradient(180deg, #FFFFFF 0%, #EEF6F9 100%) !important;
  border: 2px solid rgba(14, 115, 150, 0.25) !important;
  box-shadow: 0 12px 36px -6px rgba(5, 45, 73, 0.08) !important;
}
.pricing-pale-fix > div {
  background: #FFFFFF !important;
  border-radius: 20px !important;
  padding: 28px 24px !important;
  border: 1.5px solid rgba(14, 115, 150, 0.2) !important;
  box-shadow: 0 4px 16px -2px rgba(5, 45, 73, 0.05) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.pricing-pale-fix > div:hover {
  border-color: #0E7396 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 32px -4px rgba(14, 115, 150, 0.16) !important;
}
.pricing-pale-fix > div:nth-child(2) {
  border: 2px solid #0E7396 !important;
  box-shadow: 0 8px 24px -4px rgba(14, 115, 150, 0.14) !important;
  position: relative !important;
}
.pricing-pale-fix > div:nth-child(2)::before {
  content: "POPULAR";
  position: absolute;
  top: 0;
  right: 0;
  background: #0E7396;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-bottom-left-radius: 12px;
  border-top-right-radius: 18px;
}
.pricing-pale-fix > div p:first-child {
  display: inline-flex !important;
  align-items: center !important;
  background: #E7F6FB !important;
  color: #0E7396 !important;
  border: 1px solid rgba(14, 115, 150, 0.25) !important;
  padding: 4px 12px !important;
  border-radius: 9999px !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  width: fit-content !important;
  margin-bottom: 8px !important;
}
.pricing-pale-fix > div p:nth-child(2) {
  font-size: 2.25rem !important;
  line-height: 1.15 !important;
  font-weight: 900 !important;
  color: #052D49 !important;
  letter-spacing: -0.02em !important;
}
.pricing-pale-fix > div p:last-child {
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  color: #475569 !important;
  margin-top: 10px !important;
  padding-top: 10px !important;
  border-top: 1px solid #F1F5F9 !important;
}
@media (min-width: 1024px) {
  .how-it-works-single-line {
    white-space: nowrap !important;
  }
}
@media (min-width: 768px) {
  .faq-subtitle-single-line {
    white-space: nowrap !important;
  }
}
#dubai-taxi-calculator {
  padding-top: 140px !important;
}
@media (max-width: 640px) {
  #dubai-taxi-calculator {
    padding-top: 130px !important;
  }
}
`;

const inlineStyleTag = `<style id="custom-heading-font-sizes">.hero-heading-45, .lg\\:text-\\[45px\\], .text-\\[45px\\] { font-size: 45px !important; line-height: 1.15 !important; } .service-heading-27, .sm\\:text-\\[27px\\], .text-\\[27px\\] { font-size: 27px !important; line-height: 1.25 !important; } .journeys-heading-33, .sm\\:text-\\[33px\\], .text-\\[33px\\] { font-size: 33px !important; line-height: 1.2 !important; } .questions-heading-25, .text-\\[25px\\] { font-size: 25px !important; line-height: 1.25 !important; } .cta-heading-36, .sm\\:text-\\[36px\\], .text-\\[36px\\] { font-size: 36px !important; line-height: 1.2 !important; } h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 { font-size: 2.5rem !important; line-height: 1.2 !important; } @media (min-width: 640px) { h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 { font-size: 2.5rem !important; line-height: 1.2 !important; } } @media (min-width: 1024px) { h1.pet-taxi-hero-h1, .pet-taxi-hero-h1 { font-size: 2.5rem !important; line-height: 1.2 !important; } } .destination-card-flation { background: linear-gradient(180deg, #FFFFFF 0%, #F5F9FA 100%) !important; border: 1.5px solid rgba(14, 115, 150, 0.2) !important; box-shadow: 0 4px 18px -2px rgba(5, 45, 73, 0.06) !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; } .destination-card-flation:hover { background: #FFFFFF !important; border-color: #0E7396 !important; transform: translateY(-6px) !important; box-shadow: 0 20px 36px -6px rgba(14, 115, 150, 0.16) !important; } .destination-card-flation .w-12, .destination-card-flation .w-11, .destination-icon-box { background: linear-gradient(135deg, #E6F6FA 0%, #D2F0F8 100%) !important; border: 1.5px solid rgba(14, 115, 150, 0.28) !important; color: #0E7396 !important; box-shadow: 0 2px 8px rgba(14, 115, 150, 0.1) !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; } .destination-card-flation .w-12 svg, .destination-card-flation .w-11 svg, .destination-icon-box svg { stroke: #0E7396 !important; color: #0E7396 !important; transition: stroke 0.3s ease, transform 0.3s ease !important; } .destination-card-flation:hover .w-12, .destination-card-flation:hover .w-11, .destination-card-flation:hover .destination-icon-box { background: #0E7396 !important; border-color: #0E7396 !important; color: #FFFFFF !important; transform: scale(1.1) !important; box-shadow: 0 6px 16px rgba(14, 115, 150, 0.3) !important; } .destination-card-flation:hover .w-12 svg, .destination-card-flation:hover .w-11 svg, .destination-card-flation:hover .destination-icon-box svg { stroke: #FFFFFF !important; color: #FFFFFF !important; } .taxi-pricing-card { background: #FFFFFF !important; border: 1.5px solid rgba(14, 115, 150, 0.22) !important; box-shadow: 0 6px 20px -3px rgba(5, 45, 73, 0.07) !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; } .taxi-pricing-card:hover { border-color: #0E7396 !important; transform: translateY(-4px) !important; box-shadow: 0 16px 36px -6px rgba(14, 115, 150, 0.16) !important; } .taxi-pricing-card.featured { border: 2px solid #0E7396 !important; box-shadow: 0 12px 32px -4px rgba(14, 115, 150, 0.16) !important; } section.bg-\\[\\#F6F8FA\\] { background: linear-gradient(180deg, #F0F6F8 0%, #E3EDF2 100%) !important; } .pricing-pale-fix { background: linear-gradient(180deg, #FFFFFF 0%, #EEF6F9 100%) !important; border: 2px solid rgba(14, 115, 150, 0.25) !important; box-shadow: 0 12px 36px -6px rgba(5, 45, 73, 0.08) !important; } .pricing-pale-fix > div { background: #FFFFFF !important; border-radius: 20px !important; padding: 28px 24px !important; border: 1.5px solid rgba(14, 115, 150, 0.2) !important; box-shadow: 0 4px 16px -2px rgba(5, 45, 73, 0.05) !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important; } .pricing-pale-fix > div:hover { border-color: #0E7396 !important; transform: translateY(-4px) !important; box-shadow: 0 16px 32px -4px rgba(14, 115, 150, 0.16) !important; } .pricing-pale-fix > div:nth-child(2) { border: 2px solid #0E7396 !important; box-shadow: 0 8px 24px -4px rgba(14, 115, 150, 0.14) !important; position: relative !important; } .pricing-pale-fix > div:nth-child(2)::before { content: "POPULAR"; position: absolute; top: 0; right: 0; background: #0E7396; color: #FFFFFF; font-size: 10px; font-weight: 900; letter-spacing: 0.1em; padding: 4px 12px; border-bottom-left-radius: 12px; border-top-right-radius: 18px; } .pricing-pale-fix > div p:first-child { display: inline-flex !important; align-items: center !important; background: #E7F6FB !important; color: #0E7396 !important; border: 1px solid rgba(14, 115, 150, 0.25) !important; padding: 4px 12px !important; border-radius: 9999px !important; font-size: 11px !important; font-weight: 800 !important; letter-spacing: 0.08em !important; width: fit-content !important; margin-bottom: 8px !important; } .pricing-pale-fix > div p:nth-child(2) { font-size: 2.25rem !important; line-height: 1.15 !important; font-weight: 900 !important; color: #052D49 !important; letter-spacing: -0.02em !important; } .pricing-pale-fix > div p:last-child { font-size: 0.875rem !important; line-height: 1.5 !important; color: #475569 !important; margin-top: 10px !important; padding-top: 10px !important; border-top: 1px solid #F1F5F9 !important; } @media (min-width: 1024px) { .how-it-works-single-line { white-space: nowrap !important; } } @media (min-width: 768px) { .faq-subtitle-single-line { white-space: nowrap !important; } } #dubai-taxi-calculator { padding-top: 140px !important; } @media (max-width: 640px) { #dubai-taxi-calculator { padding-top: 130px !important; } }</style>`;

// 1. Inject CSS into .next/static/css/*.css
const cssDir = path.join(root, 'static', 'css');
if (fs.existsSync(cssDir)) {
  for (const name of fs.readdirSync(cssDir)) {
    if (name.endsWith('.css')) {
      const p = path.join(cssDir, name);
      let content = fs.readFileSync(p, 'utf8');
      const idx = content.indexOf('/* Custom Heading Font Sizes */');
      if (idx !== -1) {
        content = content.slice(0, idx) + customCssRule;
      } else {
        content += customCssRule;
      }
      fs.writeFileSync(p, content);
      console.log(`Updated heading font-size CSS into: ${name}`);
    }
  }
}

// HTML specific replacements
const htmlPairs = [
  // Dubai Pet Taxi Hero H1 -> 2.5rem (40px) with NO conflicting text-4xl/sm:text-5xl
  [
    '<h1 class="text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12]">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
    '<h1 class="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1" style="font-size:2.5rem !important;line-height:1.2 !important;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
  ],
  [
    '<h1 class="text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12] pet-taxi-hero-h1" style="font-size:2.5rem;line-height:1.2;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
    '<h1 class="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1" style="font-size:2.5rem !important;line-height:1.2 !important;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
  ],
  [
    '<h1 class="text-4xl sm:text-[2.5rem] font-black font-heading tracking-tight pet-taxi-hero-h1" style="font-size: 2.5rem; line-height: 1.2;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
    '<h1 class="font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1" style="font-size:2.5rem !important;line-height:1.2 !important;">Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel</h1>',
  ],

  // 1. Pet Relocation in Dubai -> 45px
  [
    '<h1 class="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-white tracking-tight leading-[1.15]">',
    '<h1 class="text-3xl sm:text-4xl lg:text-[45px] hero-heading-45 font-black font-heading text-white tracking-tight leading-[1.15]" style="font-size:45px">',
  ],
  [
    '<h1 class="text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]">',
    '<h1 class="text-3xl sm:text-4xl lg:text-[45px] hero-heading-45 font-black font-heading text-white tracking-tight leading-[1.15]" style="font-size:45px">',
  ],
  [
    '<h1 class="text-4xl sm:text-5xl lg:text-[56px] font-black font-heading text-white tracking-tight leading-[1.15]">',
    '<h1 class="text-3xl sm:text-4xl lg:text-[45px] hero-heading-45 font-black font-heading text-white tracking-tight leading-[1.15]" style="font-size:45px">',
  ],

  // 2. Choose Your Pet Transport -> 27px
  [
    '<h2 class="text-2xl sm:text-3xl font-black font-heading text-navy">Choose Your Pet Transport or Relocation Service</h2>',
    '<h2 class="text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy" style="font-size:27px">Choose Your Pet Transport or Relocation Service</h2>',
  ],
  [
    '<h2 class="text-2xl sm:text-[27px] font-black font-heading text-navy" style="font-size:27px">Choose Your Pet Transport or Relocation Service</h2>',
    '<h2 class="text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy" style="font-size:27px">Choose Your Pet Transport or Relocation Service</h2>',
  ],
  [
    '<h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">Choose Your Pet Transport or Relocation Service</h2>',
    '<h2 class="text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy tracking-tight" style="font-size:27px">Choose Your Pet Transport or Relocation Service</h2>',
  ],

  // 3. Pet Relocation and Transport -> 33px
  [
    '<h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]">Pet Relocation and Transport, From Dubai to Anywhere You Need to Go</h2>',
    '<h2 class="text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]" style="font-size:33px">Pet Relocation and Transport, From Dubai to Anywhere You Need to Go</h2>',
  ],
  [
    '<h2 class="text-2xl sm:text-[33px] font-black font-heading text-navy tracking-tight leading-[1.15]" style="font-size:33px">Pet Relocation and Transport, From Dubai to Anywhere You Need to Go</h2>',
    '<h2 class="text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]" style="font-size:33px">Pet Relocation and Transport, From Dubai to Anywhere You Need to Go</h2>',
  ],

  // 4. Questions, Answered -> 25px
  [
    '<h2 class="text-[1.9rem] sm:text-[2.65rem] font-black font-heading text-white tracking-tight leading-[1.12] max-w-xl">Pet Transport & Relocation Questions, Answered</h2>',
    '<h2 class="text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl" style="font-size:25px">Pet Transport & Relocation Questions, Answered</h2>',
  ],
  [
    '<h2 class="text-[25px] font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl" style="font-size:25px">Pet Transport & Relocation Questions, Answered</h2>',
    '<h2 class="text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl" style="font-size:25px">Pet Transport & Relocation Questions, Answered</h2>',
  ],

  // 5. Moving Your Pet? -> 36px
  [
    '<h2 class="text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight">Moving Your Pet? Let Global Pet Cab Handle the Journey.</h2>',
    '<h2 class="text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight" style="font-size:36px">Moving Your Pet? Let Global Pet Cab Handle the Journey.</h2>',
  ],
  [
    '<h2 class="text-2xl sm:text-[36px] font-black font-heading tracking-tight" style="font-size:36px">Moving Your Pet? Let Global Pet Cab Handle the Journey.</h2>',
    '<h2 class="text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight" style="font-size:36px">Moving Your Pet? Let Global Pet Cab Handle the Journey.</h2>',
  ],

  // Escaped RSC stream replacements in HTML
  [
    '\\"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]\\"',
    '\\"text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]\\"',
  ],
  [
    '\\"text-[1.9rem] sm:text-[2.65rem] font-black font-heading text-white tracking-tight leading-[1.12] max-w-xl\\"',
    '\\"text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl\\"',
  ],
  [
    '\\"text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight\\"',
    '\\"text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight\\"',
  ],
];

// JS specific replacements (using valid JS objects/Tailwind classes)
const jsPairs = [
  // 1. Pet Relocation in Dubai -> 45px
  [
    'className:"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-white tracking-tight leading-[1.15]"',
    'className:"text-3xl sm:text-4xl lg:text-[45px] hero-heading-45 font-black font-heading text-white tracking-tight leading-[1.15]",style:{fontSize:"45px"}',
  ],
  [
    'className:"text-3xl sm:text-4xl lg:text-[45px] font-black font-heading text-white tracking-tight leading-[1.15]"',
    'className:"text-3xl sm:text-4xl lg:text-[45px] hero-heading-45 font-black font-heading text-white tracking-tight leading-[1.15]",style:{fontSize:"45px"}',
  ],

  // 2. Choose Your Pet Transport -> 27px
  [
    'className:"text-2xl sm:text-3xl font-black font-heading text-navy",children:"Choose Your Pet Transport or Relocation Service"',
    'className:"text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy",style:{fontSize:"27px"},children:"Choose Your Pet Transport or Relocation Service"',
  ],
  [
    'className:"text-2xl sm:text-[27px] font-black font-heading text-navy",style:{fontSize:"27px"},children:"Choose Your Pet Transport or Relocation Service"',
    'className:"text-2xl sm:text-[27px] service-heading-27 font-black font-heading text-navy",style:{fontSize:"27px"},children:"Choose Your Pet Transport or Relocation Service"',
  ],

  // 3. Pet Relocation and Transport -> 33px
  [
    'className:"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]",children:"Pet Relocation and Transport, From Dubai to Anywhere You Need to Go"',
    'className:"text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]",style:{fontSize:"33px"},children:"Pet Relocation and Transport, From Dubai to Anywhere You Need to Go"',
  ],
  [
    'className:"text-2xl sm:text-[33px] font-black font-heading text-navy tracking-tight leading-[1.15]",style:{fontSize:"33px"},children:"Pet Relocation and Transport, From Dubai to Anywhere You Need to Go"',
    'className:"text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]",style:{fontSize:"33px"},children:"Pet Relocation and Transport, From Dubai to Anywhere You Need to Go"',
  ],

  // 4. Questions, Answered -> 25px
  [
    'className:"text-[1.9rem] sm:text-[2.65rem] font-black font-heading text-white tracking-tight leading-[1.12] max-w-xl",children:"Pet Transport & Relocation Questions, Answered"',
    'className:"text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl",style:{fontSize:"25px"},children:"Pet Transport & Relocation Questions, Answered"',
  ],
  [
    'className:"text-[25px] font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl",style:{fontSize:"25px"},children:"Pet Transport & Relocation Questions, Answered"',
    'className:"text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl",style:{fontSize:"25px"},children:"Pet Transport & Relocation Questions, Answered"',
  ],

  // 5. Moving Your Pet? -> 36px
  [
    'className:"text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight",children:"Moving Your Pet? Let Global Pet Cab Handle the Journey."',
    'className:"text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight",style:{fontSize:"36px"},children:"Moving Your Pet? Let Global Pet Cab Handle the Journey."',
  ],
  [
    'className:"text-2xl sm:text-[36px] font-black font-heading tracking-tight",style:{fontSize:"36px"},children:"Moving Your Pet? Let Global Pet Cab Handle the Journey."',
    'className:"text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight",style:{fontSize:"36px"},children:"Moving Your Pet? Let Global Pet Cab Handle the Journey."',
  ],
  // Dubai Pet Taxi Hero H1 -> 2.5rem (40px)
  [
    's.jsx("h1",{className:"text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12]",children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
    's.jsx("h1",{className:"font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
  ],
  [
    's.jsx("h1",{className:"text-4xl sm:text-5xl font-black font-heading tracking-tight leading-[1.12] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
    's.jsx("h1",{className:"font-black font-heading tracking-tight leading-[1.2] pet-taxi-hero-h1",style:{fontSize:"2.5rem",lineHeight:1.2},children:"Dubai Pet Taxi for Safe, Comfortable Door-to-Door Travel"})',
  ],
];

// RSC un-escaped stream replacements
const rscPairs = [
  [
    '"text-3xl sm:text-4xl lg:text-[42px] font-black font-heading text-navy tracking-tight leading-[1.15]"',
    '"text-2xl sm:text-[33px] journeys-heading-33 font-black font-heading text-navy tracking-tight leading-[1.15]"',
  ],
  [
    '"text-[1.9rem] sm:text-[2.65rem] font-black font-heading text-white tracking-tight leading-[1.12] max-w-xl"',
    '"text-[25px] questions-heading-25 font-black font-heading text-white tracking-tight leading-[1.15] max-w-xl"',
  ],
  [
    '"text-[clamp(1.05rem,4.4vw,2.75rem)] font-black font-heading tracking-tight"',
    '"text-2xl sm:text-[36px] cta-heading-36 font-black font-heading tracking-tight"',
  ],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(js|html|rsc|json)$/.test(name)) files.push(p);
  }
  return files;
}

let touched = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  let next = s;
  const isHtml = file.endsWith('.html');
  const isRsc = file.endsWith('.rsc');
  const pairs = isHtml ? htmlPairs : isRsc ? rscPairs : jsPairs;

  if (isHtml) {
    next = next.replace(/<style id="custom-heading-font-sizes">.*?<\/style>/g, '');
    next = next.replace('</head>', `${inlineStyleTag}</head>`);
  }

  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== s) {
    fs.writeFileSync(file, next);
    touched++;
    console.log(`Patched: ${path.relative(path.join(root, '..'), file)}`);
  }
}
console.log(`Patched ${touched} files under .next for Heading Font Sizes`);
