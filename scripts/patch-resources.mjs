import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('=== Patching Resources / Guides Page for .next and live preview ===');

const ARTICLES = [
  {
    num: '01',
    category: 'UAE Pet Import',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'How to Relocate a Pet to Dubai/UAE: A Practical Step-by-Step Guide',
    description: 'Planning to bring your dog or cat into Dubai? Learn how to approach the pet import process, from microchip and vaccination preparation to veterinary documents, UAE entry requirements and airport arrival arrangements.',
    focus: 'What pet parents should prepare before travelling to the UAE; the difference between an import journey and an export journey; veterinary preparation; required documentation; travel arrangements; and what to expect around arrival at the UAE airport.',
    keywords: ['pet import Dubai', 'pet relocation Dubai', 'pet relocation services Dubai', 'international pet relocation'],
    href: '/get-a-quote',
  },
  {
    num: '02',
    category: 'UAE Pet Export',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Moving a Pet Out of Dubai: UAE Export & Travel Guide',
    description: 'Moving abroad with your pet? Understand the main steps involved in exporting a pet from Dubai/UAE, including veterinary preparation, export documentation, airline arrangements and destination requirements.',
    focus: 'How to start an export journey from Dubai; veterinary preparation; UAE export documentation; airline and crate planning; destination-country requirements; airport arrangements; and why requirements can differ from one destination to another.',
    keywords: ['pet export UAE', 'pet relocation Dubai', 'international pet relocation', 'pet relocation services Dubai'],
    href: '/get-a-quote',
  },
  {
    num: '03',
    category: 'Crate Guidance',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Choosing the Right IATA Travel Crate for Dogs & Cats',
    description: 'The right travel crate is an important part of an international pet journey. Learn how to think about crate size, ventilation, space and comfort when preparing your pet for air travel.',
    focus: 'How to measure your pet correctly; choosing the right crate size; ventilation and space; food and water arrangements; preparing your pet for the crate; and checking the airline requirements for the specific journey.',
    keywords: ['IATA pet crate', 'IATA travel crate', 'pet travel crate', 'international pet relocation', 'pet transport Dubai'],
    href: '/get-a-quote',
  },
  {
    num: '04',
    category: 'Dubai Pet Taxi',
    reviewLabel: 'Last reviewed: August 2026',
    title: 'Dubai Pet Taxi Guide: Getting Your Pet to the Vet, Groomer or Airport',
    description: "Need to take your pet across Dubai but don't have a suitable way to travel? Learn how Dubai pet taxi services work and what to expect when arranging a safe, climate-controlled door-to-door ride.",
    focus: 'Everyday urban pet transit across Dubai; door-to-door veterinary clinic runs; grooming drop-offs; airport transfers (DXB/DWC); and round-trip ride coordination.',
    keywords: ['Dubai pet taxi', 'pet transport Dubai', 'dog taxi Dubai', 'cat taxi Dubai', 'vet transportation'],
    href: '/dubai-pet-taxi',
  },
];

// 1. Build new DOM HTML for <main class="flex-grow">
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/'/g, '&#x27;');
}

function buildMainHtml() {
  const cardsHtml = ARTICLES.map((art) => `
    <div class="bg-white p-7 sm:p-9 rounded-[28px] border border-teal-border shadow-fj-card space-y-6 flex flex-col justify-between hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all">
      <div class="space-y-5">
        <div class="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div class="flex items-center gap-2">
            <span class="text-xs font-black font-heading text-teal-deep bg-teal-soft/80 px-2.5 py-1 rounded-lg">
              ${art.num}
            </span>
            <span class="bg-teal-soft text-teal-deep font-extrabold px-3 py-1 rounded-full border border-teal-border text-xs sm:text-sm">
              ${escapeHtml(art.category)}
            </span>
          </div>
          <span class="text-slate-500 font-medium flex items-center gap-1.5 text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-3.5 h-3.5 text-slate-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${escapeHtml(art.reviewLabel)}
          </span>
        </div>

        <h2 class="text-xl sm:text-2xl font-black font-heading text-navy leading-snug">
          ${escapeHtml(art.title)}
        </h2>

        <p class="text-sm sm:text-base font-body text-slate-700 leading-relaxed">
          ${escapeHtml(art.description)}
        </p>

        <div class="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5">
          <span class="text-xs font-extrabold font-heading uppercase tracking-wider text-teal-deep flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 w-3.5 h-3.5 text-teal-deep"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            Recommended Article Focus
          </span>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
            ${escapeHtml(art.focus)}
          </p>
        </div>

        <div class="space-y-1.5 pt-1">
          <span class="text-[11px] font-extrabold font-heading uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag w-3 h-3 text-slate-400"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
            SEO Keywords
          </span>
          <div class="flex flex-wrap gap-1.5">
            ${art.keywords.map(kw => `<span class="inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-100/90 rounded-md px-2.5 py-1 border border-slate-200/50">${escapeHtml(kw)}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="pt-5 border-t border-slate-100">
        <a href="${art.href}" class="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold font-heading text-teal-deep hover:text-navy group transition-colors">
          <span>Read the full guide &amp; request assistance</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  `).join('');

  return `<main class="flex-grow"><div class="font-body">
    <section class="relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
      <div class="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy to-navy-light opacity-95"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div class="inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase tracking-[0.16em] border border-teal-bright/30 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-4 h-4 text-teal-bright"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
          KNOWLEDGE BASE
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-[52px] font-black font-heading tracking-tight text-white leading-[1.15]">
          Pet Travel &amp; Relocation Guides
        </h1>
        <p class="text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-body">
          Practical guides for pet parents planning a move, preparing for international travel, or simply trying to get their pet around Dubai safely. Find clear information on UAE pet import and export, travel crates, Dubai pet taxi services and the practical steps that come before travel day.
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${cardsHtml}
      </div>
    </section>
  </div></main>`;
}

// 2. Build RSC children structure
function buildRscChildren(linkRef) {
  const cardsRsc = ARTICLES.map((art) => [
    "$", "div", art.num, {
      className: "bg-white p-7 sm:p-9 rounded-[28px] border border-teal-border shadow-fj-card space-y-6 flex flex-col justify-between hover:shadow-fj-card-hover hover:border-teal-deep/50 hover:-translate-y-1 transition-all",
      children: [
        ["$", "div", null, {
          className: "space-y-5",
          children: [
            ["$", "div", null, {
              className: "flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm",
              children: [
                ["$", "div", null, {
                  className: "flex items-center gap-2",
                  children: [
                    ["$", "span", null, {
                      className: "text-xs font-black font-heading text-teal-deep bg-teal-soft/80 px-2.5 py-1 rounded-lg",
                      children: art.num
                    }],
                    ["$", "span", null, {
                      className: "bg-teal-soft text-teal-deep font-extrabold px-3 py-1 rounded-full border border-teal-border text-xs sm:text-sm",
                      children: art.category
                    }]
                  ]
                }],
                ["$", "span", null, {
                  className: "text-slate-500 font-medium flex items-center gap-1.5 text-xs sm:text-sm",
                  children: [
                    ["$", "svg", null, {
                      xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-clock w-3.5 h-3.5 text-slate-400",
                      children: [["$", "circle", "1", { cx: 12, cy: 12, r: 10 }], ["$", "polyline", "2", { points: "12 6 12 12 16 14" }]]
                    }],
                    art.reviewLabel
                  ]
                }]
              ]
            }],
            ["$", "h2", null, {
              className: "text-xl sm:text-2xl font-black font-heading text-navy leading-snug",
              children: art.title
            }],
            ["$", "p", null, {
              className: "text-sm sm:text-base font-body text-slate-700 leading-relaxed",
              children: art.description
            }],
            ["$", "div", null, {
              className: "rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5",
              children: [
                ["$", "span", null, {
                  className: "text-xs font-extrabold font-heading uppercase tracking-wider text-teal-deep flex items-center gap-1.5",
                  children: [
                    ["$", "svg", null, {
                      xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-check-circle-2 w-3.5 h-3.5 text-teal-deep",
                      children: [["$", "circle", "1", { cx: 12, cy: 12, r: 10 }], ["$", "path", "2", { d: "m9 12 2 2 4-4" }]]
                    }],
                    "Recommended Article Focus"
                  ]
                }],
                ["$", "p", null, {
                  className: "text-xs sm:text-sm text-slate-600 leading-relaxed font-body",
                  children: art.focus
                }]
              ]
            }],
            ["$", "div", null, {
              className: "space-y-1.5 pt-1",
              children: [
                ["$", "span", null, {
                  className: "text-[11px] font-extrabold font-heading uppercase tracking-wider text-slate-400 flex items-center gap-1",
                  children: [
                    ["$", "svg", null, {
                      xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-tag w-3 h-3 text-slate-400",
                      children: [["$", "path", "1", { d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" }], ["$", "circle", "2", { cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" }]]
                    }],
                    "SEO Keywords"
                  ]
                }],
                ["$", "div", null, {
                  className: "flex flex-wrap gap-1.5",
                  children: art.keywords.map((kw, ki) => ["$", "span", String(ki), {
                    className: "inline-flex items-center text-[11px] font-semibold text-slate-600 bg-slate-100/90 rounded-md px-2.5 py-1 border border-slate-200/50",
                    children: kw
                  }])
                }]
              ]
            }]
          ]
        }],
        ["$", "div", null, {
          className: "pt-5 border-t border-slate-100",
          children: [
            ["$", linkRef, null, {
              href: art.href,
              className: "inline-flex items-center gap-2 text-sm sm:text-base font-extrabold font-heading text-teal-deep hover:text-navy group transition-colors",
              children: [
                ["$", "span", null, { children: "Read the full guide & request assistance" }],
                ["$", "svg", null, {
                  xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-arrow-right w-4 h-4 transform group-hover:translate-x-1 transition-transform",
                  children: [["$", "path", "1", { d: "M5 12h14" }], ["$", "path", "2", { d: "m12 5 7 7-7 7" }]]
                }]
              ]
            }]
          ]
        }]
      ]
    }
  ]);

  return [
    ["$", "section", null, {
      className: "relative overflow-hidden bg-navy text-white pt-16 sm:pt-20 pb-20 sm:pb-24 text-center",
      children: [
        ["$", "div", null, { className: "absolute inset-0 bg-gradient-to-r from-navy-dark via-navy to-navy-light opacity-95" }],
        ["$", "div", null, {
          className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",
          children: [
            ["$", "div", null, {
              className: "inline-flex items-center gap-2 bg-teal-bright/20 text-teal-light text-xs sm:text-sm px-4 py-1.5 rounded-full font-extrabold font-heading uppercase tracking-[0.16em] border border-teal-bright/30 backdrop-blur-sm",
              children: [
                ["$", "svg", null, {
                  xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-book-open w-4 h-4 text-teal-bright",
                  children: [["$", "path", "1", { d: "M12 7v14" }], ["$", "path", "2", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }]]
                }],
                "KNOWLEDGE BASE"
              ]
            }],
            ["$", "h1", null, {
              className: "text-3xl sm:text-5xl lg:text-[52px] font-black font-heading tracking-tight text-white leading-[1.15]",
              children: "Pet Travel & Relocation Guides"
            }],
            ["$", "p", null, {
              className: "text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-body",
              children: "Practical guides for pet parents planning a move, preparing for international travel, or simply trying to get their pet around Dubai safely. Find clear information on UAE pet import and export, travel crates, Dubai pet taxi services and the practical steps that come before travel day."
            }]
          ]
        }]
      ]
    }],
    ["$", "section", null, {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20",
      children: [
        ["$", "div", null, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8",
          children: cardsRsc
        }]
      ]
    }]
  ];
}

// -------------------------------------------------------------
// STEP A: Patch .next/server/app/resources.html
// -------------------------------------------------------------
const htmlPath = path.join(root, '.next/server/app/resources.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const mainStart = html.indexOf('<main class="flex-grow">');
const mainEnd = html.indexOf('</main>');
if (mainStart !== -1 && mainEnd !== -1) {
  html = html.substring(0, mainStart) + buildMainHtml() + html.substring(mainEnd + 7);
  console.log('Replaced DOM <main> in resources.html');
}

// Replace Script 2 flight payload in resources.html
const scripts = html.match(/<script>self\.__next_f\.push\(.*?\)<\/script>/g) || [];
if (scripts.length >= 3) {
  let targetScript = scripts[2];
  let payload;
  const self = { __next_f: { push: (arg) => { payload = arg; } } };
  eval(targetScript.replace('<script>', '').replace('<\/script>', ''));
  const jsonStr = payload[1].substring(2);
  const data = JSON.parse(jsonStr.trim());

  // Inject updated sections into flight seed data
  data[3].initialSeedData[1].children[1].children[2][0][1][3].children = buildRscChildren("$L4");

  const newScriptContent = '<script>self.__next_f.push([1,' + JSON.stringify('0:' + JSON.stringify(data) + '\n') + '])</script>';
  html = html.replace(targetScript, newScriptContent);
  console.log('Replaced script 2 flight payload in resources.html');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved .next/server/app/resources.html');

// -------------------------------------------------------------
// STEP B: Patch .next/server/app/resources.rsc
// -------------------------------------------------------------
const rscPath = path.join(root, '.next/server/app/resources.rsc');
let rsc = fs.readFileSync(rscPath, 'utf8');
const rscLines = rsc.split('\n');
const rsc0Idx = rscLines.findIndex(l => l.startsWith('0:'));
if (rsc0Idx !== -1) {
  const rscData = JSON.parse(rscLines[rsc0Idx].substring(2));
  rscData[1][0][1][1].children[1].children[2][0][1][3].children = buildRscChildren("$L2");
  rscLines[rsc0Idx] = '0:' + JSON.stringify(rscData);
  fs.writeFileSync(rscPath, rscLines.join('\n'), 'utf8');
  console.log('Saved .next/server/app/resources.rsc');
}

console.log('=== Resources / Guides Patch Completed Successfully ===');
