import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

console.log('=== STARTING SURGICAL RESOLUTION FOR ALL THREE GLITCHES ===');

// =====================================================================================
// GLITCH 1: FIX InternationalQuoteForm IN CLIENT CHUNK 50 (NO _isIntlPage WRAPPER!)
// =====================================================================================
const chunk50Path = path.join(root, '.next/static/chunks/50-13a8cbaeec2f91ec.js');
if (fs.existsSync(chunk50Path)) {
  let content = fs.readFileSync(chunk50Path, 'utf8');

  // Find where _isIntlPage is introduced
  const intlCheckIdx = content.indexOf('let _isIntlPage = typeof window !== "undefined"');
  if (intlCheckIdx !== -1) {
    // Look for where _formInner begins
    const formInnerDecl = 'let _formInner = (0,s.jsxs)("div",{id:"international-quote-form"';
    const formInnerIdx = content.indexOf(formInnerDecl, intlCheckIdx);
    
    // Look for the if (_isIntlPage) condition
    const ifIntlIdx = content.indexOf('if (_isIntlPage) {', formInnerIdx);
    
    // Look for return _formInner;}}}]);
    const returnEndIdx = content.indexOf('return _formInner;}}}]);', ifIntlIdx);

    if (formInnerIdx !== -1 && ifIntlIdx !== -1 && returnEndIdx !== -1) {
      // Instead of let _formInner = ...; if (_isIntlPage) ... return _formInner;
      // We do: return (0,s.jsxs)("div",{id:"international-quote-form" ... }}}]);
      const before = content.slice(0, intlCheckIdx);
      const formInnerCode = content.slice(formInnerIdx + 'let _formInner = '.length, ifIntlIdx).trim();
      // Remove trailing semicolon if present
      const cleanFormCode = formInnerCode.replace(/;\s*$/, '');
      const after = 'return ' + cleanFormCode + ';}}}]);';

      content = before + after;
      fs.writeFileSync(chunk50Path, content);
      console.log('SUCCESS: Cleaned InternationalQuoteForm in chunk 50 (removed _isIntlPage wrapper).');
      execSync(`node --check ${chunk50Path}`);
    } else {
      console.error('Could not find all delimiters for chunk 50');
    }
  } else {
    console.log('chunk 50 already has no _isIntlPage');
  }
}

// =====================================================================================
// GLITCH 1 (Part B): FIX International Relocation Client Page Chunk (page-2baeffb38495d4a2.js)
// =====================================================================================
const intlClientPagePath = path.join(root, '.next/static/chunks/app/international-pet-relocation/page-2baeffb38495d4a2.js');
if (fs.existsSync(intlClientPagePath)) {
  let content = fs.readFileSync(intlClientPagePath, 'utf8');

  // Module 2633 in this chunk had `if (_isIntlPage) { return [sections 4-9] }`
  // We want module 2633 to be ONLY the relocation FAQ accordion!
  const intlCheckIdx = content.indexOf('let _isIntlPage = typeof window !== "undefined" && window.location.pathname === "/international-pet-relocation";');
  if (intlCheckIdx !== -1) {
    const fnStart = content.lastIndexOf('function u(){', intlCheckIdx);
    // Find where return (0,n.jsx)("section",{className:"py-20 bg-white border-t border-teal-border" is (the old fallback)
    const fallbackStart = content.indexOf('return (0,n.jsx)("section",{className:"py-20 bg-white border-t border-teal-border"', fnStart);
    const modEnd = content.indexOf('}}},function(e){', fallbackStart);

    if (fnStart !== -1 && fallbackStart !== -1 && modEnd !== -1) {
      // 10 Relocation FAQs
      const relocationFaqs = [
        { q: "What is international pet relocation?", a: "It is the process of moving a pet between countries while coordinating the travel, veterinary, documentation and other requirements that apply to the route." },
        { q: "Do you handle pet export and pet import?", a: "Global Pet Cab's international service is designed to support both directions. A pet travelling from the UAE to another country is an export journey, while a pet entering the UAE from another country is an import journey." },
        { q: "Can you relocate my pet from Dubai to another country?", a: "Yes. Global Pet Cab's international relocation service supports journeys from Dubai/UAE to destinations worldwide, with the exact requirements depending on the destination and travel plan." },
        { q: "Can you help bring my pet into Dubai?", a: "Yes. Pet import into Dubai can involve country-of-origin requirements, veterinary preparation, documentation, airline arrangements and arrival procedures. The exact requirements depend on the route." },
        { q: "What documents will my pet need?", a: "Requirements vary by destination and route. Depending on the journey, they may include vaccination records, microchip information, veterinary certificates, permits and other travel documents." },
        { q: "Does my pet need a travel crate?", a: "International airline travel may require an airline-approved or IATA-compliant travel crate. The correct crate and preparation depend on your pet, airline and route." },
        { q: "Can you help with airline arrangements?", a: "Airline and travel coordination can form part of the relocation service, subject to the route, airline and selected service." },
        { q: "Can you help with airport transfers in Dubai?", a: "Yes. Local pet transportation can connect your home or another agreed pickup point with the airport as part of the wider travel journey." },
        { q: "What if I cannot take my pet to a grooming or health appointment before travel?", a: "Selected local transportation and appointment support may be available when the pet parent cannot be there, subject to the service arrangement." },
        { q: "How do I get a quote?", a: "Start with the relocation form and share your origin, destination and tentative travel date. The team can then review the route and the services your pet may need." }
      ];

      const faqItemsJsx = relocationFaqs.map((faq, idx) => `(()=>{
        let isOpen = activeFaq === ${idx};
        return (0,n.jsxs)("div",{className:"border border-teal-border rounded-2xl overflow-hidden transition-all bg-white shadow-sm",children:[
          (0,n.jsxs)("button",{type:"button",onClick:()=>setActiveFaq(isOpen ? null : ${idx}),className:"w-full p-6 text-left flex justify-between items-center font-extrabold font-heading text-base sm:text-lg text-navy hover:bg-teal-soft/50 transition-colors",children:[
            (0,n.jsx)("span",{children:${JSON.stringify(faq.q)}}),
            (0,n.jsx)(l.Z,{className:"w-6 h-6 text-slate-400 transition-transform duration-200 shrink-0 " + (isOpen ? "rotate-180 text-teal-deep" : "")})
          ]}),
          isOpen ? (0,n.jsx)("div",{className:"px-6 pb-6 text-sm sm:text-base font-body text-slate-700 leading-relaxed border-t border-teal-border/40 pt-4 animate-fade-in-up",children:${JSON.stringify(faq.a)}}) : null
        ]});
      })()`).join(',');

      const cleanU = `function u(){
        let [activeFaq, setActiveFaq] = (0,i.useState)(0);
        return (0,n.jsx)("section",{className:"py-20 sm:py-24 bg-white border-t border-teal-border/40",children:
          (0,n.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",children:[
            (0,n.jsxs)("div",{className:"text-center mb-14 space-y-3",children:[
              (0,n.jsx)("div",{className:"inline-flex items-center gap-2 text-xs sm:text-sm font-black font-heading text-teal-deep uppercase tracking-widest bg-teal-soft px-4 py-2 rounded-full border border-teal-border",children:"QUESTIONS PET PARENTS ASK"}),
              (0,n.jsx)("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"International Pet Relocation Questions, Answered"}),
              (0,n.jsx)("p",{className:"text-base sm:text-lg font-body text-slate-600 max-w-2xl mx-auto",children:"Every international move has its own requirements. These answers give you a starting point before you request a route-specific quote."})
            ]}),
            (0,n.jsx)("div",{className:"space-y-4",children:[${faqItemsJsx}]})
          ]})
        });
      }`;

      content = content.slice(0, fnStart) + cleanU + content.slice(modEnd);
      fs.writeFileSync(intlClientPagePath, content);
      console.log('SUCCESS: Cleaned module 2633 in international client page chunk (pure 10-item FAQ accordion).');
      execSync(`node --check ${intlClientPagePath}`);
    } else {
      console.error('Could not locate module boundaries in intlClientPagePath');
    }
  }
}

// =====================================================================================
// GLITCH 2 & 3: FIX PET TAXI PAGE (REMOVE INTERNATIONAL TAB & CONTENT!)
// =====================================================================================
const taxiFiles = [
  path.join(root, '.next/static/chunks/app/dubai-pet-taxi/page-90801651df4e3acb.js'),
  path.join(root, '.next/server/app/dubai-pet-taxi/page.js'),
  path.join(root, '.next/server/app/dubai-pet-taxi.html')
];

// In client chunk page-90801651df4e3acb.js:
const taxiClientPath = path.join(root, '.next/static/chunks/app/dubai-pet-taxi/page-90801651df4e3acb.js');
if (fs.existsSync(taxiClientPath)) {
  let content = fs.readFileSync(taxiClientPath, 'utf8');
  // It has module 2633 which has:
  // let[e,t]=(0,i.useState)("taxi"),[a,u]=(0,i.useState)(0);
  // and buttons for "Dubai Pet Taxi FAQs" and "International Relocation FAQs"
  const tabStart = content.indexOf('(0,n.jsx)("div",{className:"flex justify-center mb-10"');
  if (tabStart !== -1) {
    const tabEnd = content.indexOf('(0,n.jsx)("div",{className:"space-y-4"', tabStart);
    if (tabEnd !== -1) {
      // Remove the tab switcher completely:
      content = content.slice(0, tabStart) + content.slice(tabEnd);
      // Replace ternary ("taxi"===e?c:d) with simply c (the taxi faqs)
      content = content.replace('("taxi"===e?c:d)', 'c');
      fs.writeFileSync(taxiClientPath, content);
      console.log('SUCCESS: Removed International tab from Dubai Pet Taxi client chunk.');
      execSync(`node --check ${taxiClientPath}`);
    }
  }
}

// In server page.js for dubai-pet-taxi:
const taxiServerPath = path.join(root, '.next/server/app/dubai-pet-taxi/page.js');
if (fs.existsSync(taxiServerPath)) {
  let content = fs.readFileSync(taxiServerPath, 'utf8');
  // In module 4766:
  const tabStart = content.indexOf('s.jsx("div",{className:"flex justify-center mb-10"');
  if (tabStart !== -1) {
    const tabEnd = content.indexOf('s.jsx("div",{className:"space-y-4"', tabStart);
    if (tabEnd !== -1) {
      content = content.slice(0, tabStart) + content.slice(tabEnd);
      content = content.replace('("taxi"===e?d:c)', 'd');
      fs.writeFileSync(taxiServerPath, content);
      console.log('SUCCESS: Removed International tab from Dubai Pet Taxi server page.js.');
      execSync(`node --check ${taxiServerPath}`);
    }
  }
}

// In server HTML for dubai-pet-taxi.html:
const taxiHtmlPath = path.join(root, '.next/server/app/dubai-pet-taxi.html');
if (fs.existsSync(taxiHtmlPath)) {
  let content = fs.readFileSync(taxiHtmlPath, 'utf8');
  // Remove the tab switcher HTML
  const tabHtmlStart = content.indexOf('<div class="flex justify-center mb-10">');
  if (tabHtmlStart !== -1) {
    const tabHtmlEnd = content.indexOf('<div class="space-y-4">', tabHtmlStart);
    if (tabHtmlEnd !== -1) {
      content = content.slice(0, tabHtmlStart) + content.slice(tabHtmlEnd);
      fs.writeFileSync(taxiHtmlPath, content);
      console.log('SUCCESS: Removed tab switcher from dubai-pet-taxi.html.');
    }
  }
}

// =====================================================================================
// GLITCH 2: HOME PAGE FAQ HEADING ("Frequently Asked Questions" not "Dubai Pet Taxi Questions, Answered")
// =====================================================================================
const homeServerPagePath = path.join(root, '.next/server/app/page.js');
if (fs.existsSync(homeServerPagePath)) {
  let content = fs.readFileSync(homeServerPagePath, 'utf8');
  // In module 4766 inside page.js:
  // s.jsx("h2",{className:"text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight",children:"Dubai Pet Taxi Questions, Answered"})
  // Change children to "Frequently Asked Questions"
  if (content.includes('children:"Dubai Pet Taxi Questions, Answered"')) {
    content = content.replace(
      'children:"Dubai Pet Taxi Questions, Answered"',
      'children:"Frequently Asked Questions"'
    );
    // Also subtitle:
    content = content.replace(
      'children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."',
      'children:"Everything you need to know about our Dubai local rides and global relocation services."'
    );
    fs.writeFileSync(homeServerPagePath, content);
    console.log('SUCCESS: Updated Home Page FAQ title to "Frequently Asked Questions".');
    execSync(`node --check ${homeServerPagePath}`);
  }
}

const homeHtmlPath = path.join(root, '.next/server/app/index.html');
if (fs.existsSync(homeHtmlPath)) {
  let content = fs.readFileSync(homeHtmlPath, 'utf8');
  if (content.includes('Dubai Pet Taxi Questions, Answered')) {
    content = content.replace(
      '<h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">Dubai Pet Taxi Questions, Answered</h2>',
      '<h2 class="text-3xl sm:text-4xl font-black font-heading text-navy tracking-tight">Frequently Asked Questions</h2>'
    );
    content = content.replace(
      'Planning a ride for your pet? Here are some of the questions pet parents may have before booking.',
      'Everything you need to know about our Dubai local rides and global relocation services.'
    );
    // Also in the RSC payload at bottom of index.html:
    content = content.replaceAll('Dubai Pet Taxi Questions, Answered', 'Frequently Asked Questions');
    fs.writeFileSync(homeHtmlPath, content);
    console.log('SUCCESS: Updated index.html FAQ title to "Frequently Asked Questions".');
  }
}

console.log('=== SURGICAL RESOLUTION SCRIPT FINISHED ===');
