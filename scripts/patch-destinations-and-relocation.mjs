import fs from 'fs';
import path from 'path';

console.log('--- Patching Destinations and International Relocation ---');

// 1. Patch InternationalQuoteForm header in chunks
const chunkServer916 = '.next/server/chunks/916.js';
if (fs.existsSync(chunkServer916)) {
  let content = fs.readFileSync(chunkServer916, 'utf8');
  content = content.replace(
    'children:"Tell Us About Your Pet\'s Journey"',
    'children:"Tell Us Where Your Pet Is Going"'
  );
  content = content.replace(
    'children:"Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote."',
    'children:"Every pet relocation is different. Your starting point, destination, pet, travel date and travel requirements all affect the journey. Share the basics with us and our team can understand what you need before preparing your relocation quote."'
  );
  fs.writeFileSync(chunkServer916, content);
  console.log('Updated .next/server/chunks/916.js');
}

const chunkStatic50 = '.next/static/chunks/50-13a8cbaeec2f91ec.js';
if (fs.existsSync(chunkStatic50)) {
  let content = fs.readFileSync(chunkStatic50, 'utf8');
  content = content.replace(
    'children:"Tell Us About Your Pet\'s Journey"',
    'children:"Tell Us Where Your Pet Is Going"'
  );
  content = content.replace(
    'children:"Every international pet move is different. Share your route, travel date and pet details, and our relocation team can review your requirements and prepare a tailored quote."',
    'children:"Every pet relocation is different. Your starting point, destination, pet, travel date and travel requirements all affect the journey. Share the basics with us and our team can understand what you need before preparing your relocation quote."'
  );
  fs.writeFileSync(chunkStatic50, content);
  console.log('Updated .next/static/chunks/50-13a8cbaeec2f91ec.js');
}

console.log('Quote form chunks updated.');
