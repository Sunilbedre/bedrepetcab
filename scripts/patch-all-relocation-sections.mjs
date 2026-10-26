import fs from 'fs';
import path from 'path';

console.log('--- Applying Full Relocation Content (Hero + Sections 6-10) ---');

// 1. Patch Hero in .next/server/app/international-pet-relocation/page.js
const pageJsPath = '.next/server/app/international-pet-relocation/page.js';
let pageJs = fs.readFileSync(pageJsPath, 'utf8');

const heroBodyInPageJs = 'i.jsx("p",{className:"text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-body",children:"Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence."})';

const heroAdditionsInPageJs = `${heroBodyInPageJs},i.jsx("p",{className:"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto",children:"Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai."}),(0,i.jsxs)("div",{className:"flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light",children:[i.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IPATA Member*"}),i.jsx("span",{className:"text-white/40",children:"|"}),i.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"IATA-Compliant Handling*"}),i.jsx("span",{className:"text-white/40",children:"|"}),i.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"MOCCAE Support*"}),i.jsx("span",{className:"text-white/40",children:"|"}),i.jsx("span",{className:"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15",children:"International Pet Relocation"})]}),(0,i.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3",children:[i.jsx("a",{href:"#international-quote-form",className:"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-3.5 rounded-full shadow-fj-coral transition-all text-sm sm:text-base",children:"Request an Expert Quote"}),i.jsx("a",{href:"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-3.5 rounded-full transition-all text-sm sm:text-base shadow-sm",children:"WhatsApp Us"})]})`;

if (pageJs.includes(heroBodyInPageJs) && !pageJs.includes('IPATA Member*')) {
  pageJs = pageJs.replace(heroBodyInPageJs, heroAdditionsInPageJs);
  fs.writeFileSync(pageJsPath, pageJs);
  console.log('Successfully added Hero supporting line, trust points, and CTAs to page.js');
}

// 2. Patch Hero in .next/server/app/international-pet-relocation.rsc
const rscPath = '.next/server/app/international-pet-relocation.rsc';
let rsc = fs.readFileSync(rscPath, 'utf8');

const rscHeroBody = '["$","p",null,{"className":"text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-body","children":"Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence."}]';

const rscHeroAdditions = `${rscHeroBody},["$","p",null,{"className":"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto","children":"Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai."}],["$","div",null,{"className":"flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light","children":[["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":"IPATA Member*"}],["$","span",null,{"className":"text-white/40","children":"|"}],["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":"IATA-Compliant Handling*"}],["$","span",null,{"className":"text-white/40","children":"|"}],["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":"MOCCAE Support*"}],["$","span",null,{"className":"text-white/40","children":"|"}],["$","span",null,{"className":"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15","children":"International Pet Relocation"}]]}],["$","div",null,{"className":"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3","children":[["$","a",null,{"href":"#international-quote-form","className":"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-3.5 rounded-full shadow-fj-coral transition-all text-sm sm:text-base","children":"Request an Expert Quote"}],["$","a",null,{"href":"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry","target":"_blank","rel":"noopener noreferrer","className":"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-3.5 rounded-full transition-all text-sm sm:text-base shadow-sm","children":"WhatsApp Us"}]]}]`;

if (rsc.includes(rscHeroBody) && !rsc.includes('IPATA Member*')) {
  rsc = rsc.replace(rscHeroBody, rscHeroAdditions);
  fs.writeFileSync(rscPath, rsc);
  console.log('Successfully added Hero supporting line, trust points, and CTAs to international-pet-relocation.rsc');
}

// 3. Patch Hero Flight stream in .next/server/app/international-pet-relocation.html
const htmlPath = '.next/server/app/international-pet-relocation.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// In HTML Flight stream, quotes are escaped as `\"`
const htmlFlightHeroBody = '\"children\":\"Moving your pet across borders involves more than a flight. From route planning and veterinary preparation to travel crates, permits, airline coordination and arrival support, Global Pet Cab helps you manage the journey with greater clarity and confidence.\"}';

const htmlFlightHeroAdditions = `${htmlFlightHeroBody}],[\"$\",\"p\",null,{\"className\":\"text-sm sm:text-base text-teal-light font-medium leading-relaxed max-w-2xl mx-auto\",\"children\":\"Pet relocation services from Dubai to destinations worldwide, with support for both pet export from the UAE and pet import into Dubai.\"}],[\"$\",\"div\",null,{\"className\":\"flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-bold text-teal-light\",\"children\":[[\"$\",\"span\",null,{\"className\":\"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15\",\"children\":\"IPATA Member*\"}],[\"$\",\"span\",null,{\"className\":\"text-white/40\",\"children\":\"|\"}],[\"$\",\"span\",null,{\"className\":\"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15\",\"children\":\"IATA-Compliant Handling*\"}],[\"$\",\"span\",null,{\"className\":\"text-white/40\",\"children\":\"|\"}],[\"$\",\"span\",null,{\"className\":\"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15\",\"children\":\"MOCCAE Support*\"}],[\"$\",\"span\",null,{\"className\":\"text-white/40\",\"children\":\"|\"}],[\"$\",\"span\",null,{\"className\":\"inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15\",\"children\":\"International Pet Relocation\"}]]}],[\"$\",\"div\",null,{\"className\":\"flex flex-col sm:flex-row items-center justify-center gap-4 pt-3\",\"children\":[[\"$\",\"a\",null,{\"href\":\"#international-quote-form\",\"className\":\"inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading px-8 py-3.5 rounded-full shadow-fj-coral transition-all text-sm sm:text-base\",\"children\":\"Request an Expert Quote\"}],[\"$\",\"a\",null,{\"href\":\"https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%20-%20International%20Pet%20Relocation%20Enquiry\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer\",\"className\":\"inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-3.5 rounded-full transition-all text-sm sm:text-base shadow-sm\",\"children\":\"WhatsApp Us\"}]]}';

if (html.includes(htmlFlightHeroBody) && !html.includes('IPATA Member*\\\"')) {
  html = html.replace(htmlFlightHeroBody, htmlFlightHeroAdditions);
  fs.writeFileSync(htmlPath, html);
  console.log('Successfully updated Flight stream in international-pet-relocation.html');
}

console.log('Patch complete.');
