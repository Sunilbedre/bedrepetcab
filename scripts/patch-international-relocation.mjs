import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');

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

const RELOCATION_FAQS = [
  {
    question: 'What is international pet relocation?',
    answer: 'International pet relocation is the process of moving a pet from one country to another while coordinating the travel, veterinary, documentation and other requirements applicable to the route.',
  },
  {
    question: 'What is pet export from Dubai?',
    answer: 'When a pet travels from Dubai or the UAE to another country, it is considered an export from the UAE. The requirements depend on the destination country and travel route.',
  },
  {
    question: 'What is pet import into Dubai?',
    answer: 'When a pet travels from another country into Dubai, it is considered an import into Dubai. The applicable UAE entry requirements depend on the origin country and the pet’s travel circumstances.',
  },
  {
    question: 'Can Global Pet Cab help with pet import to Dubai?',
    answer: 'Global Pet Cab can support international pet relocation journeys into Dubai, including coordination around applicable veterinary, documentation, travel and arrival requirements.',
  },
  {
    question: 'Can Global Pet Cab help with pet export from Dubai?',
    answer: 'Yes. Global Pet Cab supports pet relocation journeys from Dubai/UAE to international destinations, with route-specific planning and travel coordination.',
  },
  {
    question: 'Do I need an IATA-compliant travel crate?',
    answer: 'International pet travel may require an airline-approved or IATA-compliant travel crate depending on the airline and route. Our team can help determine the appropriate travel arrangement for your journey.',
  },
  {
    question: 'Do pets need blood tests or vaccinations before international travel?',
    answer: 'Some destinations require specific vaccinations, tests or veterinary certificates. Requirements vary by country, so the exact steps should be confirmed for your route.',
  },
  {
    question: 'Can you help with airline bookings?',
    answer: 'Airline coordination can form part of the relocation service, subject to the route, airline and selected service.',
  },
  {
    question: 'Can you help with customs clearance and arrival?',
    answer: 'Arrival and customs-related support can be included depending on the destination and service arrangement. The exact scope should be confirmed for your route.',
  },
  {
    question: 'Can I get a quote before deciding my travel date?',
    answer: 'Yes. Share your intended route and tentative travel date through the quote form so the team can review your requirements and provide a tailored estimate.',
  },
];

const faqsJsString = JSON.stringify(RELOCATION_FAQS);

// Helpers to construct React element trees
function h(tag, props = {}, ...children) {
  const p = { ...props };
  if (children.length === 1) {
    p.children = children[0];
  } else if (children.length > 1) {
    p.children = children;
  }
  return ['$', tag, null, p];
}

function svg(paths, className = 'w-4 h-4') {
  return [
    '$',
    'svg',
    null,
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className,
      children: paths.map(([tag, p], i) => ['$', tag, String(i), p]),
    },
  ];
}

// Build 10-section React elements tree
function build10SectionsTree(quoteRef, faqRef) {
  // Section 1: Hero
  const section1 = h(
    'section',
    { className: 'relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-20 sm:pb-24' },
    h('div', { className: 'absolute inset-0', 'aria-hidden': 'true' }, [
      h('img', {
        src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80',
        alt: 'International Pet Relocation Dubai',
        className: 'object-cover object-center w-full h-full absolute inset-0 text-transparent',
      }),
      h('div', { className: 'absolute inset-0 bg-navy/85' }),
      h('div', { className: 'absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60' }),
    ]),
    h('div', { className: 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8' }, [
      h('div', { className: 'max-w-3xl space-y-5' }, [
        h(
          'div',
          { className: 'inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30' },
          [
            svg([['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }], ['path', { d: 'M2 12h20' }]], 'lucide lucide-globe w-4 h-4 text-teal-bright'),
            'INTERNATIONAL PET RELOCATION',
          ]
        ),
        h('h1', { className: 'text-3xl sm:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white' }, 'International Pet Relocation from Dubai, Made Simple'),
        h('p', { className: 'text-base sm:text-xl text-slate-200 leading-relaxed font-body' }, 'Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.'),
        h('p', { className: 'text-sm sm:text-base text-teal-light font-medium leading-relaxed' }, 'Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.'),
        h('div', { className: 'flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light' }, [
          h('span', { className: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15' }, 'IPATA Member*'),
          h('span', { className: 'text-white/40' }, '|'),
          h('span', { className: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15' }, 'IATA-Compliant Handling*'),
          h('span', { className: 'text-white/40' }, '|'),
          h('span', { className: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15' }, 'MOCCAE Support*'),
          h('span', { className: 'text-white/40' }, '|'),
          h('span', { className: 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15' }, 'International Pet Relocation'),
        ]),
        h('div', { className: 'flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3' }, [
          h('a', { href: '#international-quote-form', className: 'inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base' }, [
            h('span', null, 'Request an Expert Quote'),
            svg([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]], 'lucide lucide-arrow-right w-5 h-5'),
          ]),
          h('a', { href: 'https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry', target: '_blank', rel: 'noopener noreferrer', className: 'inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base shadow-sm' }, [
            svg([['path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' }]], 'lucide lucide-message-circle w-5 h-5'),
            h('span', null, 'WhatsApp Us'),
          ]),
        ]),
      ]),
      // Banner Copy 2
      h('div', { className: 'p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6' }, [
        h('div', { className: 'space-y-1.5 max-w-2xl' }, [
          h('h3', { className: 'text-xl sm:text-2xl font-black font-heading text-white' }, 'Moving Your Pet Across Borders?'),
          h('p', { className: 'text-sm sm:text-base text-slate-200 leading-relaxed font-body' }, "From Dubai to the world and back again, we help coordinate the important details of your pet's international journey."),
        ]),
        h('a', { href: '#international-quote-form', className: 'inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all' }, [
          h('span', null, 'Get a Free Relocation Quote'),
          svg([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]], 'lucide lucide-arrow-right w-4 h-4'),
        ]),
      ]),
    ])
  );

  // Section 2: Quote Form
  const section2 = h('section', { className: 'relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-16' }, ['$', quoteRef, null, {}]);

  // Section 3: What We Help With
  const whatWeHelpWithData = [
    { title: 'Route & Regulatory Planning', desc: 'Review the relocation route, destination requirements and travel considerations before the journey begins.' },
    { title: 'Veterinary Preparation', desc: 'Coordinate the required veterinary steps, including microchip, vaccinations, blood tests and health documentation where applicable.' },
    { title: 'IATA Travel Crate', desc: "Help with appropriate IATA-compliant crate sizing, preparation and travel arrangements based on your pet's needs." },
    { title: 'Export & Import Permits', desc: 'Support the required UAE export or Dubai import documentation and destination-country requirements, where applicable.' },
    { title: 'Airline Coordination', desc: 'Coordinate airline travel arrangements and the appropriate live-animal transport option for the journey.' },
    { title: 'Customs & Arrival Support', desc: 'Support the arrival process, including customs-related coordination and handover arrangements, based on the destination and service selected.' },
  ];
  const section3 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-white border-t border-teal-border' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12' }, [
      h('div', { className: 'max-w-3xl space-y-3' }, [
        h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-navy' }, 'More Than a Flight. We Manage the Journey.'),
        h('p', { className: 'text-base sm:text-lg text-slate-600 font-body leading-relaxed' }, "International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet's journey, so you have a clear plan from preparation to arrival."),
      ]),
      h(
        'div',
        { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' },
        whatWeHelpWithData.map((item, i) =>
          h('div', { key: String(i), className: 'rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300' }, [
            h('div', { className: 'space-y-4' }, [
              h('div', { className: 'w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border' }, [
                svg([['circle', { cx: '12', cy: '12', r: '10' }]], 'lucide lucide-compass w-6 h-6'),
              ]),
              h('h3', { className: 'text-xl font-black font-heading text-navy' }, item.title),
              h('p', { className: 'text-sm text-slate-600 leading-relaxed font-body' }, item.desc),
            ]),
          ])
        )
      ),
    ])
  );

  // Section 4: Pet Export & Import
  const section4 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] border-t border-teal-border' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10' }, [
      h('div', { className: 'max-w-3xl space-y-2' }, [
        h('span', { className: 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase' }, 'KNOW YOUR RELOCATION DIRECTION'),
        h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-navy' }, 'Exporting or Importing Your Pet? We Can Help You Plan the Right Journey.'),
        h('p', { className: 'text-base text-slate-600 font-body leading-relaxed pt-1' }, "The direction of your pet's journey determines the documentation, veterinary requirements and arrival process involved."),
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-8' }, [
        // Export card
        h('div', { className: 'rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all' }, [
          h('div', { className: 'flex items-center justify-between' }, [
            h('span', { className: 'text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border' }, 'EXPORT ROUTE'),
            h('div', { className: 'w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border' }, [
              svg([['path', { d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' }]], 'lucide lucide-plane w-5 h-5'),
            ]),
          ]),
          h('h3', { className: 'text-2xl font-black font-heading text-navy' }, 'Pet Export from Dubai / UAE'),
          h('p', { className: 'text-slate-600 text-sm sm:text-base leading-relaxed font-body' }, 'If your pet is travelling from Dubai or the UAE to another country, the journey is an export from the UAE. The relocation plan can include preparation for destination-country requirements, veterinary documentation, airline arrangements and departure formalities.'),
          h('div', { className: 'pt-2' }, [
            h('a', { href: '#international-quote-form', className: 'inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm' }, [
              h('span', null, 'Select Export in Quote Form'),
              svg([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]], 'lucide lucide-arrow-right w-4 h-4'),
            ]),
          ]),
        ]),
        // Import card
        h('div', { className: 'rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all' }, [
          h('div', { className: 'flex items-center justify-between' }, [
            h('span', { className: 'text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border' }, 'IMPORT ROUTE'),
            h('div', { className: 'w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border' }, [
              svg([['path', { d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' }]], 'lucide lucide-plane w-5 h-5 rotate-90'),
            ]),
          ]),
          h('h3', { className: 'text-2xl font-black font-heading text-navy' }, 'Pet Import into Dubai / UAE'),
          h('p', { className: 'text-slate-600 text-sm sm:text-base leading-relaxed font-body' }, 'If your pet is travelling from another country into Dubai, the journey is an import into Dubai. The relocation plan can include preparation for UAE entry requirements, veterinary documentation, arrival coordination and destination handover.'),
          h('div', { className: 'pt-2' }, [
            h('a', { href: '#international-quote-form', className: 'inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm' }, [
              h('span', null, 'Select Import in Quote Form'),
              svg([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]], 'lucide lucide-arrow-right w-4 h-4'),
            ]),
          ]),
        ]),
      ]),
    ])
  );

  // Section 5: How We Manage (6 Steps)
  const stepsData = [
    { num: '01', title: 'Route & Requirement Review', desc: 'We review your origin, destination and travel plans to identify the key requirements for the journey.' },
    { num: '02', title: 'Veterinary Preparation', desc: 'We help coordinate the veterinary documentation and health-related requirements applicable to your route.' },
    { num: '03', title: 'Travel Crate & Flight Preparation', desc: "We help arrange the appropriate travel crate and prepare the pet's travel requirements for the selected airline and route." },
    { num: '04', title: 'Export / Import Documentation', desc: 'We support the required export or import documentation and applicable government or destination requirements.' },
    { num: '05', title: 'Airline & Travel Coordination', desc: "We coordinate the relevant airline arrangements and travel logistics for your pet's journey." },
    { num: '06', title: 'Arrival & Handover', desc: 'We support the arrival process and coordinate the agreed handover so your pet can continue safely to their new destination.' },
  ];
  const section5 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-navy text-white' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12' }, [
      h('div', { className: 'max-w-3xl space-y-2' }, [
        h('p', { className: 'text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light' }, 'HOW IT WORKS'),
        h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading' }, 'A Clearer Path From First Planning to Safe Arrival'),
        h('p', { className: 'text-base text-white/70 font-body leading-relaxed pt-1' }, 'Every route has its own requirements, but the overall process follows a structured journey designed to keep pet parents informed at each stage.'),
      ]),
      h(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
        stepsData.map((step, i) =>
          h('div', { key: String(i), className: 'rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between' }, [
            h('div', null, [
              h('div', { className: 'text-teal-light font-black font-heading text-3xl font-mono' }, step.num),
              h('h3', { className: 'text-xl font-black font-heading text-white mt-3' }, step.title),
              h('p', { className: 'text-sm text-white/75 leading-relaxed font-body mt-2' }, step.desc),
            ]),
          ])
        )
      ),
    ])
  );

  // Section 6: Before International Journey
  const section6 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-white border-t border-teal-border' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' }, [
      h('div', { className: 'rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8' }, [
        h('div', { className: 'max-w-2xl space-y-3' }, [
          h('div', { className: 'inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep' }, [
            svg([['path', { d: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2' }], ['circle', { cx: '7', cy: '17', r: '2' }], ['path', { d: 'M9 17h6' }], ['circle', { cx: '17', cy: '17', r: '2' }]], 'lucide lucide-car w-4 h-4'),
            'LOCAL TRANSPORT & APPOINTMENTS',
          ]),
          h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-navy' }, 'Need Help Getting Your Pet Ready to Travel?'),
          h('p', { className: 'text-base text-slate-700 font-body leading-relaxed' }, 'International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement.'),
          h('p', { className: 'text-sm text-slate-600 font-body leading-relaxed pt-1' }, 'For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport.'),
        ]),
        h('div', { className: 'shrink-0' }, [
          h('a', { href: '/dubai-pet-taxi', className: 'inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all' }, [
            h('span', null, 'Explore Dubai Pet Taxi'),
            svg([['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]], 'lucide lucide-arrow-right w-5 h-5 text-teal-bright'),
          ]),
        ]),
      ]),
    ])
  );

  // Section 7: Routes
  const routesData = [
    { label: 'Dubai ↔ India', link: '/destinations/dubai-to-india' },
    { label: 'Dubai ↔ UK', link: '/destinations/dubai-to-uk' },
    { label: 'Dubai ↔ USA', link: '/destinations/dubai-to-usa' },
    { label: 'Dubai ↔ Canada', link: '/destinations/dubai-to-canada' },
    { label: 'Dubai ↔ Australia', link: '/destinations/dubai-to-australia' },
    { label: 'Other destinations', link: '#international-quote-form' },
  ];
  const section7 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-[#F7FAFB] border-t border-teal-border' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8' }, [
      h('div', { className: 'max-w-3xl space-y-3' }, [
        h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-navy' }, 'Pet Relocation from Dubai to Destinations Worldwide'),
        h('p', { className: 'text-base sm:text-lg text-slate-600 font-body leading-relaxed' }, 'Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination.'),
      ]),
      h(
        'div',
        { className: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4' },
        routesData.map((route, i) =>
          h('a', { key: String(i), href: route.link, className: 'rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all' }, [
            h('div', { className: 'text-sm font-extrabold font-heading text-navy' }, route.label),
            h('div', { className: 'text-[11px] text-teal-deep font-bold mt-1' }, 'Route Planning →'),
          ])
        )
      ),
    ])
  );

  // Section 8: Why Pet Parents Trust
  const trustData = [
    { title: 'International Pet Relocation', desc: 'Support for cross-border pet journeys from Dubai and into Dubai.' },
    { title: 'Route-Specific Planning', desc: 'Requirements can vary by destination, so each journey is planned around its route.' },
    { title: 'Veterinary & Travel Coordination', desc: 'Support across the preparation and travel stages, based on the services selected.' },
    { title: 'Local + International Mobility', desc: 'A connected service journey from local transportation to international relocation.' },
    { title: 'IPATA Membership*', desc: 'A professional industry association membership that can be highlighted as a trust signal if confirmed.' },
  ];
  const section8 = h(
    'section',
    { className: 'py-16 sm:py-20 bg-white border-t border-teal-border' },
    h('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12' }, [
      h('div', { className: 'max-w-3xl space-y-3' }, [
        h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-navy' }, 'Professional Planning. Personal Attention.'),
        h('p', { className: 'text-base sm:text-lg text-slate-600 font-body leading-relaxed' }, 'International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support.'),
      ]),
      h(
        'div',
        { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' },
        trustData.map((item, i) =>
          h('div', { key: String(i), className: 'rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all' }, [
            h('div', { className: 'w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm' }, [
              svg([['circle', { cx: '12', cy: '12', r: '10' }]], 'lucide lucide-globe w-6 h-6'),
            ]),
            h('h3', { className: 'text-xl font-black font-heading text-navy' }, item.title),
            h('p', { className: 'text-sm text-slate-600 leading-relaxed font-body' }, item.desc),
          ])
        )
      ),
    ])
  );

  // Section 9: FAQ Section (renders interactive client component)
  const section9 = ['$', faqRef, null, {}];

  // Section 10: Final CTA
  const section10 = h(
    'section',
    { className: 'relative overflow-hidden text-white py-16 sm:py-20 bg-navy' },
    h('div', { className: 'absolute inset-0', 'aria-hidden': 'true' }, [
      h('img', {
        src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=80',
        alt: '',
        className: 'object-cover object-center w-full h-full absolute inset-0 text-transparent',
      }),
      h('div', { className: 'absolute inset-0 bg-navy/88' }),
    ]),
    h('div', { className: 'relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6' }, [
      h('div', { className: 'inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light' }, [
        svg([['path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' }]], 'lucide lucide-sparkles w-4 h-4 text-amber-300'),
        "READY TO PLAN YOUR PET'S MOVE?",
      ]),
      h('h2', { className: 'text-3xl sm:text-4xl font-black font-heading text-white' }, "Let's Plan Your Pet's Journey Together"),
      h('p', { className: 'text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed' }, 'Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps.'),
      h('div', { className: 'flex flex-col sm:flex-row justify-center items-center gap-4 pt-2' }, [
        h('a', { href: '#international-quote-form', className: 'inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto' }, [
          h('span', null, 'Get a Free Relocation Quote →'),
        ]),
        h('a', { href: 'https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation', target: '_blank', rel: 'noopener noreferrer', className: 'inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm' }, [
          svg([['path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' }]], 'lucide lucide-message-circle w-5 h-5'),
          h('span', null, 'WhatsApp the Relocation Team'),
        ]),
      ]),
    ])
  );

  return [section1, section2, section3, section4, section5, section6, section7, section8, section9, section10];
}

// Generate pre-rendered HTML for the 10 sections
function generateCompletePageHtml() {
  const faqsHtml = '<div class="space-y-4">' + RELOCATION_FAQS.map((faq, idx) => {
    if (idx === 0) {
      return `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${faq.question}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 rotate-180 text-teal-deep"><path d="m6 9 6 6 6-6"></path></svg></button><div class="px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/50 pt-4 animate-fade-in-up">${faq.answer}</div></div>`;
    }
    return `<div class="border border-teal-border rounded-2xl overflow-hidden transition-all bg-white"><button class="w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft transition-colors"><span>${faq.question}</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 "><path d="m6 9 6 6 6-6"></path></svg></button></div>`;
  }).join('') + '</div>';

  return `<div class="font-body space-y-0 text-slate-800">
  <!-- 1. HERO SECTION -->
  <section class="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-20 sm:pb-24">
    <div class="absolute inset-0" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="International Pet Relocation Dubai" class="object-cover object-center w-full h-full absolute inset-0 text-transparent" />
      <div class="absolute inset-0 bg-navy/85"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="max-w-3xl space-y-5">
        <div class="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase border border-teal-bright/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4 text-teal-bright"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          INTERNATIONAL PET RELOCATION
        </div>
        <h1 class="text-3xl sm:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white">
          International Pet Relocation from Dubai, Made Simple
        </h1>
        <p class="text-base sm:text-xl text-slate-200 leading-relaxed font-body">
          Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.
        </p>
        <p class="text-sm sm:text-base text-teal-light font-medium leading-relaxed">
          Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.
        </p>
        <div class="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">IPATA Member*</span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">IATA-Compliant Handling*</span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">MOCCAE Support*</span>
          <span class="text-white/40">|</span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">International Pet Relocation</span>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
          <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base">
            <span>Request an Expert Quote</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
      <!-- Banner Copy 2 -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-1.5 max-w-2xl">
          <h3 class="text-xl sm:text-2xl font-black font-heading text-white">
            Moving Your Pet Across Borders?
          </h3>
          <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-body">
            From Dubai to the world and back again, we help coordinate the important details of your pet&#x27;s international journey.
          </p>
        </div>
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-teal-bright hover:bg-teal-light text-navy font-extrabold font-heading px-7 py-3.5 rounded-full shadow-md text-sm sm:text-base shrink-0 transition-all">
          <span>Get a Free Relocation Quote</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- 2. INTERNATIONAL PET RELOCATION QUOTE FORM -->
  <section class="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-16">
    <div id="international-quote-form" class="bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden">
      <div class="bg-navy text-white p-6 sm:p-8">
        <div class="flex items-center gap-3.5">
          <div class="p-3.5 bg-teal-bright/20 border border-teal-bright/30 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-7 h-7 text-teal-light"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 bg-teal-bright/20 text-teal-light text-xs px-3 py-1 rounded-full font-bold mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-3.5 h-3.5 text-amber-300"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
              DUBAI ↔ WORLDWIDE RELOCATION
            </div>
            <h2 class="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Tell Us About Your Pet&#x27;s Journey
            </h2>
            <p class="text-sm text-slate-300 font-body mt-1">
              Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote.
            </p>
          </div>
        </div>
      </div>
      <div class="p-6 sm:p-10 space-y-8">
        <form class="space-y-8">
          <div class="flex items-center justify-between border-b border-teal-border pb-4">
            <div class="flex space-x-3 text-sm font-extrabold font-heading">
              <button type="button" class="px-4 py-2 rounded-xl transition-all bg-teal-deep text-white shadow-sm">1. Route</button>
              <button type="button" class="px-4 py-2 rounded-xl transition-all bg-teal-soft text-slate-600 hover:text-navy">2. Pet &amp; Services</button>
              <button type="button" class="px-4 py-2 rounded-xl transition-all bg-teal-soft text-slate-600 hover:text-navy">3. Contact Info</button>
            </div>
          </div>
          <div class="space-y-8 animate-fade-in-up">
            <div class="space-y-3">
              <label class="fj-label">Relocation Direction</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" class="p-5 rounded-2xl border text-left transition-all border-teal-deep bg-teal-soft text-navy font-bold ring-2 ring-teal-deep/20 shadow-sm">
                  <div class="font-extrabold font-heading text-base flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5 text-teal-deep"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
                    Moving FROM Dubai / UAE — Exporting your pet to another country
                  </div>
                </button>
                <button type="button" class="p-5 rounded-2xl border text-left transition-all border-teal-border hover:border-slate-300 text-slate-600">
                  <div class="font-extrabold font-heading text-base flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5 text-teal-deep rotate-90"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
                    Moving INTO Dubai / UAE — Importing your pet into Dubai
                  </div>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5"><label class="fj-label">Origin Country *</label><input type="text" class="fj-input" value="United Arab Emirates" /></div>
              <div class="space-y-1.5"><label class="fj-label">Origin City *</label><input type="text" class="fj-input" value="Dubai" /></div>
              <div class="space-y-1.5"><label class="fj-label">Destination Country *</label><input type="text" class="fj-input" value="United Kingdom" /></div>
              <div class="space-y-1.5"><label class="fj-label">Destination City *</label><input type="text" class="fj-input" value="London" /></div>
            </div>
            <div class="space-y-1.5"><label class="fj-label">Tentative Travel Date</label><input type="date" class="fj-input max-w-md" /></div>
            <button type="button" class="w-full bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-base transition-all">
              <span>Continue to Pet Details &amp; Services →</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- 3. WHAT WE HELP WITH -->
  <section class="py-16 sm:py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          More Than a Flight. We Manage the Journey.
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          International pet relocation can involve several moving parts. Our role is to help coordinate the key stages of your pet&#x27;s journey, so you have a clear plan from preparation to arrival.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">Route &amp; Regulatory Planning</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Review the relocation route, destination requirements and travel considerations before the journey begins.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9"></path><path d="m14 13 1.11 1.11a2.18 2.18 0 0 0 3.07 0 2.18 2.18 0 0 0 0-3.07L16 9"></path></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">Veterinary Preparation</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Coordinate the required veterinary steps, including microchip, vaccinations, blood tests and health documentation where applicable.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box w-6 h-6"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">IATA Travel Crate</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Help with appropriate IATA-compliant crate sizing, preparation and travel arrangements based on your pet&#x27;s needs.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-6 h-6"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">Export &amp; Import Permits</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Support the required UAE export or Dubai import documentation and destination-country requirements, where applicable.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-6 h-6"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">Airline Coordination</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Coordinate airline travel arrangements and the appropriate live-animal transport option for the journey.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 flex flex-col justify-between hover:bg-white hover:shadow-fj-card hover:-translate-y-1 transition-all duration-300">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <h3 class="text-xl font-black font-heading text-navy">Customs &amp; Arrival Support</h3>
            <p class="text-sm text-slate-600 leading-relaxed font-body">Support the arrival process, including customs-related coordination and handover arrangements, based on the destination and service selected.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. PET EXPORT FROM DUBAI & PET IMPORT INTO DUBAI -->
  <section class="py-16 sm:py-20 bg-gradient-to-b from-[#F2F7F9] to-[#E7EFF3] border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="max-w-3xl space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-soft border border-teal-border text-teal-deep text-xs font-black font-heading tracking-widest uppercase">
          KNOW YOUR RELOCATION DIRECTION
        </span>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Exporting or Importing Your Pet? We Can Help You Plan the Right Journey.
        </h2>
        <p class="text-base text-slate-600 font-body leading-relaxed pt-1">
          The direction of your pet&#x27;s journey determines the documentation, veterinary requirements and arrival process involved.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Direction 1: Export -->
        <div class="rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">EXPORT ROUTE</span>
            <div class="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            </div>
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">Pet Export from Dubai / UAE</h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
            If your pet is travelling from Dubai or the UAE to another country, the journey is an export from the UAE. The relocation plan can include preparation for destination-country requirements, veterinary documentation, airline arrangements and departure formalities.
          </p>
          <div class="pt-2">
            <a href="#international-quote-form" class="inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm">
              <span>Select Export in Quote Form</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
        <!-- Direction 2: Import -->
        <div class="rounded-[28px] bg-white border-2 border-teal-border p-8 sm:p-10 space-y-5 shadow-fj-card hover:border-teal-deep transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">IMPORT ROUTE</span>
            <div class="w-11 h-11 rounded-2xl bg-teal-soft flex items-center justify-center text-teal-deep border border-teal-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane w-5 h-5 rotate-90"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>
            </div>
          </div>
          <h3 class="text-2xl font-black font-heading text-navy">Pet Import into Dubai / UAE</h3>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
            If your pet is travelling from another country into Dubai, the journey is an import into Dubai. The relocation plan can include preparation for UAE entry requirements, veterinary documentation, arrival coordination and destination handover.
          </p>
          <div class="pt-2">
            <a href="#international-quote-form" class="inline-flex items-center gap-2 text-teal-deep hover:text-teal-bright font-extrabold font-heading text-sm">
              <span>Select Import in Quote Form</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. HOW WE MANAGE YOUR PET'S INTERNATIONAL JOURNEY -->
  <section class="py-16 sm:py-20 bg-navy text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-2">
        <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-light">HOW IT WORKS</p>
        <h2 class="text-3xl sm:text-4xl font-black font-heading">
          A Clearer Path From First Planning to Safe Arrival
        </h2>
        <p class="text-base text-white/70 font-body leading-relaxed pt-1">
          Every route has its own requirements, but the overall process follows a structured journey designed to keep pet parents informed at each stage.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">01</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Route &amp; Requirement Review</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We review your origin, destination and travel plans to identify the key requirements for the journey.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">02</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Veterinary Preparation</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We help coordinate the veterinary documentation and health-related requirements applicable to your route.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">03</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Travel Crate &amp; Flight Preparation</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We help arrange the appropriate travel crate and prepare the pet&#x27;s travel requirements for the selected airline and route.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">04</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Export / Import Documentation</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We support the required export or import documentation and applicable government or destination requirements.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">05</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Airline &amp; Travel Coordination</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We coordinate the relevant airline arrangements and travel logistics for your pet&#x27;s journey.</p>
          </div>
        </div>
        <div class="rounded-[24px] bg-white/5 border border-white/10 p-7 space-y-3 flex flex-col justify-between">
          <div>
            <div class="text-teal-light font-black font-heading text-3xl font-mono">06</div>
            <h3 class="text-xl font-black font-heading text-white mt-3">Arrival &amp; Handover</h3>
            <p class="text-sm text-white/75 leading-relaxed font-body mt-2">We support the arrival process and coordinate the agreed handover so your pet can continue safely to their new destination.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. BEFORE THE INTERNATIONAL JOURNEY -->
  <section class="py-16 sm:py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-[32px] bg-gradient-to-r from-teal-soft via-white to-teal-soft/60 border border-teal-border p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="max-w-2xl space-y-3">
          <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-deep">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            LOCAL TRANSPORT &amp; APPOINTMENTS
          </div>
          <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
            Need Help Getting Your Pet Ready to Travel?
          </h2>
          <p class="text-base text-slate-700 font-body leading-relaxed">
            International relocation does not always start at the airport. If you are unavailable, selected local transportation and appointment support can help your pet reach grooming or health-related appointments before travel, subject to the service arrangement.
          </p>
          <p class="text-sm text-slate-600 font-body leading-relaxed pt-1">
            For customers relocating from Dubai, our local pet transportation services can also support the journey between home, appointments and the airport.
          </p>
        </div>
        <div class="shrink-0">
          <a href="/dubai-pet-taxi" class="inline-flex items-center gap-2.5 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-md text-base transition-all">
            <span>Explore Dubai Pet Taxi</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-5 h-5 text-teal-bright"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. INTERNATIONAL PET RELOCATION ROUTES -->
  <section class="py-16 sm:py-20 bg-[#F7FAFB] border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Pet Relocation from Dubai to Destinations Worldwide
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          Planning a move to another country? Global Pet Cab supports international pet relocation journeys from Dubai to destinations around the world, with route-specific planning based on your destination.
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <a href="/destinations/dubai-to-india" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Dubai ↔ India</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        <a href="/destinations/dubai-to-uk" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Dubai ↔ UK</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        <a href="/destinations/dubai-to-usa" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Dubai ↔ USA</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        <a href="/destinations/dubai-to-canada" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Dubai ↔ Canada</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        <a href="/destinations/dubai-to-australia" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Dubai ↔ Australia</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
        <a href="#international-quote-form" class="rounded-2xl bg-white border border-teal-border p-4 text-center hover:border-teal-deep hover:shadow-sm hover:-translate-y-0.5 transition-all">
          <div class="text-sm font-extrabold font-heading text-navy">Other destinations</div>
          <div class="text-[11px] text-teal-deep font-bold mt-1">Route Planning →</div>
        </a>
      </div>
    </div>
  </section>

  <!-- 8. WHY PET PARENTS TRUST GLOBAL PET CAB -->
  <section class="py-16 sm:py-20 bg-white border-t border-teal-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="max-w-3xl space-y-3">
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">
          Professional Planning. Personal Attention.
        </h2>
        <p class="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
          International pet travel can feel complicated when you are trying to coordinate airlines, veterinary requirements, paperwork and timing on your own. Global Pet Cab brings the different parts of the journey together so you have a clearer process and a dedicated point of support.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">International Pet Relocation</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">Support for cross-border pet journeys from Dubai and into Dubai.</p>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">Route-Specific Planning</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">Requirements can vary by destination, so each journey is planned around its route.</p>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9"></path><path d="m14 13 1.11 1.11a2.18 2.18 0 0 0 3.07 0 2.18 2.18 0 0 0 0-3.07L16 9"></path></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">Veterinary &amp; Travel Coordination</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">Support across the preparation and travel stages, based on the services selected.</p>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-6 h-6"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">Local + International Mobility</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">A connected service journey from local transportation to international relocation.</p>
        </div>
        <div class="rounded-[24px] bg-[#F7FAFB] border border-teal-border p-7 space-y-3 hover:bg-white hover:shadow-fj-card transition-all">
          <div class="w-12 h-12 rounded-2xl bg-white text-teal-deep flex items-center justify-center border border-teal-border shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-6 h-6"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          </div>
          <h3 class="text-xl font-black font-heading text-navy">IPATA Membership*</h3>
          <p class="text-sm text-slate-600 leading-relaxed font-body">A professional industry association membership that can be highlighted as a trust signal if confirmed.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 9. FAQ SECTION -->
  <section class="py-16 sm:py-20 bg-[#F6F8FA] border-t border-teal-border">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div class="text-center space-y-3">
        <span class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border">
          QUESTIONS PET PARENTS ASK
        </span>
        <h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">
          International Pet Relocation Questions, Answered
        </h2>
        <p class="text-base sm:text-lg font-body text-slate-600">
          Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process.
        </p>
      </div>
      ${faqsHtml}
    </div>
  </section>

  <!-- 10. FINAL CTA -->
  <section class="relative overflow-hidden text-white py-16 sm:py-20 bg-navy">
    <div class="absolute inset-0" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt="" class="object-cover object-center w-full h-full absolute inset-0 text-transparent" />
      <div class="absolute inset-0 bg-navy/88"></div>
    </div>
    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
      <div class="inline-flex items-center gap-1.5 text-xs font-black font-heading uppercase tracking-widest text-teal-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4 text-amber-300"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
        READY TO PLAN YOUR PET&#x27;S MOVE?
      </div>
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-white">
        Let&#x27;s Plan Your Pet&#x27;s Journey Together
      </h2>
      <p class="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-body leading-relaxed">
        Tell us where your pet is travelling from, where they are going and when you are planning to travel. Our team can review the route and help you understand the next steps.
      </p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
        <a href="#international-quote-form" class="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-4 rounded-full shadow-fj-coral transition-all text-base w-full sm:w-auto">
          <span>Get a Free Relocation Quote →</span>
        </a>
        <a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20Plan%20Pet%20Relocation" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-full transition-all text-base w-full sm:w-auto shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
          <span>WhatsApp the Relocation Team</span>
        </a>
      </div>
    </div>
  </section>
</div>`;
}

// 1. Patch Quote Form in chunk 50 and server chunks 916, 98
const textReplacements = [
  ['Dubai ↔ Worldwide Relocation', 'DUBAI ↔ WORLDWIDE RELOCATION'],
  ['International Pet Relocation — Request Expert Quote', "Tell Us About Your Pet's Journey"],
  ['Exporting pet to another country', 'Moving FROM Dubai / UAE — Exporting your pet to another country'],
  ['Importing pet into Dubai', 'Moving INTO Dubai / UAE — Importing your pet into Dubai'],
  ['Continue to Pet Details &amp; Services', 'Continue to Pet Details &amp; Services →'],
  ['Continue to Pet Details & Services', 'Continue to Pet Details & Services →'],
  ['Continue to Pet Details \\u0026 Services', 'Continue to Pet Details \\u0026 Services →'],
];

let patchedCount = 0;
const allFiles = walk(root);

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Global text replacements for Quote Form across all chunks
  if (file.includes('50-') || file.includes('916.js') || file.includes('98.js')) {
    for (const [from, to] of textReplacements) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
      }
    }
  }

  // Patch client chunk page-2baeffb38495d4a2.js for interactive FAQs
  if (file.includes('international-pet-relocation') && file.endsWith('.js') && file.includes('page-2baeffb38495d4a2')) {
    content = content.replace(/let\s+d\s*=\s*\[\{question:[^\]]+\];/, `let d=${faqsJsString};`);
    content = content.replace(/let\s+c\s*=\s*\[\{question:[^\]]+\];/, `let c=${faqsJsString};`);
    content = content.replaceAll('Dubai Pet Taxi Questions, Answered', 'International Pet Relocation Questions, Answered');
    content = content.replaceAll('Planning a ride for your pet? Here are some of the questions pet parents may have before booking.', 'Moving your pet internationally can raise a lot of questions. Here are the essentials to help you understand the process.');
  }

  // Patch international-pet-relocation.html
  if (file.endsWith('international-pet-relocation.html')) {
    // 1. Replace main HTML
    const mainRegex = /<main class="flex-grow">[\s\S]*?<\/main>/;
    if (mainRegex.test(content)) {
      const pageHtml = generateCompletePageHtml();
      content = content.replace(mainRegex, `<main class="flex-grow">${pageHtml}</main>`);
    }

    // 2. Replace RSC seed data in self.__next_f.push
    const matches = [...content.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
    if (matches.length >= 3) {
      const m2Raw = matches[2][1];
      try {
        const unescaped = JSON.parse('"' + m2Raw + '"');
        const parsed = JSON.parse(unescaped.slice(2)); // strip '0:'
        const pageElement = parsed[3].initialSeedData[1].children[1].children[2][0];
        
        // Build 10-section React elements tree for HTML ($L4 is QuoteForm, $L5 is FAQAccordion)
        const newSections = build10SectionsTree('$L4', '$L5');
        pageElement[1][3].children = newSections;

        const newUnescaped = '0:' + JSON.stringify(parsed);
        const newEscaped = JSON.stringify(newUnescaped).slice(1, -1);
        content = content.replace(m2Raw, newEscaped);
      } catch (err) {
        console.error('Error updating seed data in international-pet-relocation.html:', err);
      }
    }
  }

  // Patch international-pet-relocation.rsc
  if (file.endsWith('international-pet-relocation.rsc')) {
    try {
      const lines = content.split('\n');
      if (lines.length >= 6) {
        const line5 = lines[5];
        if (line5.startsWith('0:')) {
          const parsed = JSON.parse(line5.slice(2));
          // In .rsc, $L2 is QuoteForm, $L3 is FAQAccordion
          const newSections = build10SectionsTree('$L2', '$L3');
          const pageElement = parsed[1][0][1][1].children[1].children[2][0];
          pageElement[1][3].children = newSections;

          lines[5] = '0:' + JSON.stringify(parsed);
          content = lines.join('\n');
        }
      }
    } catch (err) {
      console.error('Error updating international-pet-relocation.rsc:', err);
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    patchedCount++;
    console.log(`Patched: ${path.relative(root, file)}`);
  }
}

console.log(`Successfully patched ${patchedCount} files under .next for International Pet Relocation`);
