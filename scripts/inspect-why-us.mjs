import fs from 'fs';

const html = fs.readFileSync('.next/server/app/why-global-pet-cab.html', 'utf8');
const mainStart = html.indexOf('<main class="flex-grow">');
const mainEnd = html.indexOf('</main>');

console.log('Main start:', mainStart, 'Main end:', mainEnd);
const mainContent = html.substring(mainStart, mainEnd + 7);
console.log('Length of main:', mainContent.length);

const sections = mainContent.split('<section');
console.log('Number of sections in main:', sections.length - 1);
sections.slice(1).forEach((sec, idx) => {
  console.log(`--- Section ${idx + 1} ---`);
  console.log(sec.substring(0, 300));
});
