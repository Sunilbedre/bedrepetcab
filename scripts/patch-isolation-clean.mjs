import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

console.log('--- Step 1: Fixing Home Page FAQ Title in .next/server/app/page.js, chunk, and index.html ---');

// 1. Home page index.html
const indexHtmlPath = path.join(ROOT, '.next/server/app/index.html');
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  if (html.includes('Dubai Pet Taxi Questions, Answered</h2><p class="text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line" style="white-space:nowrap">Planning a ride for your pet? Here are some of the questions pet parents may have before booking.</p>')) {
    html = html.replace(
      'Dubai Pet Taxi Questions, Answered</h2><p class="text-base sm:text-lg font-body text-slate-600 max-w-4xl mx-auto md:whitespace-nowrap faq-subtitle-single-line" style="white-space:nowrap">Planning a ride for your pet? Here are some of the questions pet parents may have before booking.</p>',
      'Frequently Asked Questions</h2><p class="text-base sm:text-lg font-body text-slate-600">Everything you need to know about our Dubai local rides and global relocation services.</p>'
    );
    fs.writeFileSync(indexHtmlPath, html, 'utf8');
    console.log('Updated .next/server/app/index.html');
  } else {
    console.log('Target string not found in index.html, checking partial match...');
    if (html.includes('Dubai Pet Taxi Questions, Answered')) {
      html = html.replace('Dubai Pet Taxi Questions, Answered', 'Frequently Asked Questions');
      html = html.replace('Planning a ride for your pet? Here are some of the questions pet parents may have before booking.', 'Everything you need to know about our Dubai local rides and global relocation services.');
      fs.writeFileSync(indexHtmlPath, html, 'utf8');
      console.log('Updated .next/server/app/index.html (partial match)');
    }
  }
}

// 2. Home page server page.js
const serverPageJsPath = path.join(ROOT, '.next/server/app/page.js');
if (fs.existsSync(serverPageJsPath)) {
  let code = fs.readFileSync(serverPageJsPath, 'utf8');
  if (code.includes('children:"Dubai Pet Taxi Questions, Answered"')) {
    code = code.replace('children:"Dubai Pet Taxi Questions, Answered"', 'children:"Frequently Asked Questions"');
    code = code.replace(
      'children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."',
      'children:"Everything you need to know about our Dubai local rides and global relocation services."'
    );
    fs.writeFileSync(serverPageJsPath, code, 'utf8');
    console.log('Updated .next/server/app/page.js');
  }
}

// 3. Home page client chunk
const homeChunkPath = path.join(ROOT, '.next/static/chunks/app/page-1cf7b7243727573f.js');
if (fs.existsSync(homeChunkPath)) {
  let chunk = fs.readFileSync(homeChunkPath, 'utf8');
  if (chunk.includes('children:"Dubai Pet Taxi Questions, Answered"')) {
    chunk = chunk.replace('children:"Dubai Pet Taxi Questions, Answered"', 'children:"Frequently Asked Questions"');
    chunk = chunk.replace(
      'children:"Planning a ride for your pet? Here are some of the questions pet parents may have before booking."',
      'children:"Everything you need to know about our Dubai local rides and global relocation services."'
    );
    fs.writeFileSync(homeChunkPath, chunk, 'utf8');
    console.log('Updated .next/static/chunks/app/page-1cf7b7243727573f.js');
  }
}

console.log('\n--- Step 2: Isolating Pet Taxi Page FAQs in .next/server/app/dubai-pet-taxi.html, page.js, and chunk ---');

// 4. Pet Taxi HTML: Remove tab switcher
const taxiHtmlPath = path.join(ROOT, '.next/server/app/dubai-pet-taxi.html');
if (fs.existsSync(taxiHtmlPath)) {
  let html = fs.readFileSync(taxiHtmlPath, 'utf8');
  const tabStart = html.indexOf('<div class="flex justify-center mb-10"><div class="bg-teal-soft p-2 rounded-2xl');
  if (tabStart !== -1) {
    const tabEnd = html.indexOf('</div></div>', tabStart) + 12;
    html = html.substring(0, tabStart) + html.substring(tabEnd);
    fs.writeFileSync(taxiHtmlPath, html, 'utf8');
    console.log('Removed tab switcher from .next/server/app/dubai-pet-taxi.html');
  }
}

// 5. Pet Taxi client chunk: Remove tab switcher from client component module 2633
const taxiChunkPath = path.join(ROOT, '.next/static/chunks/app/dubai-pet-taxi/page-90801651df4e3acb.js');
if (fs.existsSync(taxiChunkPath)) {
  let chunk = fs.readFileSync(taxiChunkPath, 'utf8');
  // In module 2633:
  // It renders: (0,n.jsx)("div",{className:"flex justify-center mb-10",children:...})
  // and: ("taxi"===e?c:d).map(...)
  // We can change ("taxi"===e?c:d) to (c) so it always uses taxi FAQs,
  // and replace the tab switcher with null
  const tabSearch = '(0,n.jsx)("div",{className:"flex justify-center mb-10",children:(0,n.jsxs)("div",{className:"bg-teal-soft p-2 rounded-2xl flex space-x-3 border border-teal-border",children:[(0,n.jsxs)("button",{onClick:()=>{t("taxi"),u(0)},className:"flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ".concat("taxi"===e?"bg-teal-deep text-white shadow-sm":"text-slate-600 hover:text-navy"),children:[(0,n.jsx)(s.Z,{className:"w-4 h-4"}),"Dubai Pet Taxi FAQs"]}),(0,n.jsxs)("button",{onClick:()=>{t("international"),u(0)},className:"flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ".concat("international"===e?"bg-navy text-white shadow-sm":"text-slate-600 hover:text-navy"),children:[(0,n.jsx)(o.Z,{className:"w-4 h-4"}),"International Relocation FAQs"]})]})}),';
  
  if (chunk.includes(tabSearch)) {
    chunk = chunk.replace(tabSearch, '');
    chunk = chunk.replace('("taxi"===e?c:d)', 'c');
    fs.writeFileSync(taxiChunkPath, chunk, 'utf8');
    console.log('Removed tab switcher and international FAQs from .next/static/chunks/app/dubai-pet-taxi/page-90801651df4e3acb.js');
  } else {
    console.log('Exact tabSearch not matched in taxi client chunk, trying regex...');
    const re = /\(0,n\.jsx\)\("div",\{className:"flex justify-center mb-10",children:\(0,n\.jsxs\)\("div",\{className:"bg-teal-soft p-2 rounded-2xl flex space-x-3 border border-teal-border".*?\}\)\}\),/;
    if (re.test(chunk)) {
      chunk = chunk.replace(re, '');
      chunk = chunk.replace('("taxi"===e?c:d)', 'c');
      fs.writeFileSync(taxiChunkPath, chunk, 'utf8');
      console.log('Removed tab switcher via regex from taxi chunk');
    }
  }
}

// 6. Pet Taxi server page.js: Remove tab switcher from module 4766
const taxiServerPath = path.join(ROOT, '.next/server/app/dubai-pet-taxi/page.js');
if (fs.existsSync(taxiServerPath)) {
  let code = fs.readFileSync(taxiServerPath, 'utf8');
  const tabSearch = 's.jsx("div",{className:"flex justify-center mb-10",children:(0,s.jsxs)("div",{className:"bg-teal-soft p-2 rounded-2xl flex space-x-3 border border-teal-border",children:[(0,s.jsxs)("button",{onClick:()=>{t("taxi"),x(0)},className:`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ${"taxi"===e?"bg-teal-deep text-white shadow-sm":"text-slate-600 hover:text-navy"}`,children:[s.jsx(n.Z,{className:"w-4 h-4"}),"Dubai Pet Taxi FAQs"]}),(0,s.jsxs)("button",{onClick:()=>{t("international"),x(0)},className:`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold font-heading transition-all ${"international"===e?"bg-navy text-white shadow-sm":"text-slate-600 hover:text-navy"}`,children:[s.jsx(l.Z,{className:"w-4 h-4"}),"International Relocation FAQs"]})]})}),';

  if (code.includes(tabSearch)) {
    code = code.replace(tabSearch, '');
    code = code.replace('("taxi"===e?d:c)', 'd');
    fs.writeFileSync(taxiServerPath, code, 'utf8');
    console.log('Removed tab switcher and international FAQs from .next/server/app/dubai-pet-taxi/page.js');
  } else {
    console.log('Exact tabSearch not matched in taxi server page.js, trying regex...');
    const re = /s\.jsx\("div",\{className:"flex justify-center mb-10",children:\(0,s\.jsxs\)\("div",\{className:"bg-teal-soft p-2 rounded-2xl flex space-x-3 border border-teal-border".*?\}\)\}\),/;
    if (re.test(code)) {
      code = code.replace(re, '');
      code = code.replace('("taxi"===e?d:c)', 'd');
      fs.writeFileSync(taxiServerPath, code, 'utf8');
      console.log('Removed tab switcher via regex from taxi server page.js');
    }
  }
}

console.log('\n--- Step 3: Verifying all patched JS files for valid syntax ---');
