import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = process.cwd();

console.log('--- Applying Clean Hero Overlay with .intl-hero-gradient ---');

// 1. PATCH CLIENT CHUNK 50
const chunk50Path = path.join(root, '.next/static/chunks/50-13a8cbaeec2f91ec.js');
let chunk50 = fs.readFileSync(chunk50Path, 'utf8');

// Find the hero container div in chunk 50:
// (0,s.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[ ... ]})
const bgStart50 = chunk50.indexOf('(0,s.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[');
const bgEnd50 = chunk50.indexOf('(0,s.jsx)("div",{className:"relative z-10 max-w-7xl mx-auto px-4', bgStart50);

if (bgStart50 !== -1 && bgEnd50 !== -1) {
  const newBgBlock50 = `(0,s.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
      (0,s.jsx)("img",{
        alt:"International Pet Relocation Dubai",
        fetchPriority:"high",
        decoding:"async",
        className:"object-cover w-full h-full absolute inset-0",
        style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:"cover",objectPosition:"82% center",color:"transparent"},
        sizes:"100vw",
        srcSet:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75 3840w",
        src:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75"
      }),
      (0,s.jsx)("div",{className:"absolute inset-0 intl-hero-gradient"}),
      (0,s.jsx)("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"}})
    ]}),
    `;
  chunk50 = chunk50.slice(0, bgStart50) + newBgBlock50 + chunk50.slice(bgEnd50);
  fs.writeFileSync(chunk50Path, chunk50);
  console.log('✓ Successfully patched hero in chunk 50');
  execSync(`node --check ${chunk50Path}`);
  console.log('✓ Syntax valid for chunk 50');
} else {
  console.log('⚠ Could not find bg boundaries in chunk 50');
}

// 2. PATCH SERVER CHUNK 916
const chunk916Path = path.join(root, '.next/server/chunks/916.js');
let chunk916 = fs.readFileSync(chunk916Path, 'utf8');

const bgStart916 = chunk916.indexOf('(0,s.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[');
const bgEnd916 = chunk916.indexOf('s.jsx("div",{className:"relative z-10 max-w-7xl mx-auto px-4', bgStart916);

if (bgStart916 !== -1 && bgEnd916 !== -1) {
  const newBgBlock916 = `(0,s.jsxs)("div",{className:"absolute inset-0","aria-hidden":"true",children:[
      s.jsx("img",{
        alt:"International Pet Relocation Dubai",
        fetchPriority:"high",
        decoding:"async",
        className:"object-cover w-full h-full absolute inset-0",
        style:{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:"cover",objectPosition:"82% center",color:"transparent"},
        sizes:"100vw",
        srcSet:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75 3840w",
        src:"/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&w=3840&q=75"
      }),
      s.jsx("div",{className:"absolute inset-0 intl-hero-gradient"}),
      s.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"}})
    ]}),
    `;
  chunk916 = chunk916.slice(0, bgStart916) + newBgBlock916 + chunk916.slice(bgEnd916);
  fs.writeFileSync(chunk916Path, chunk916);
  console.log('✓ Successfully patched hero in chunk 916');
  execSync(`node --check ${chunk916Path}`);
  console.log('✓ Syntax valid for chunk 916');
} else {
  console.log('⚠ Could not find bg boundaries in chunk 916');
}

// 3. PATCH PRE-RENDERED HTML (.next/server/app/international-pet-relocation.html)
const htmlPath = path.join(root, '.next/server/app/international-pet-relocation.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const bgStartHtml = html.indexOf('<div class="absolute inset-0" aria-hidden="true">');
const bgEndHtml = html.indexOf('<div class="relative z-10 max-w-7xl mx-auto px-4', bgStartHtml);

if (bgStartHtml !== -1 && bgEndHtml !== -1) {
  const newBgBlockHtml = `<div class="absolute inset-0" aria-hidden="true">
      <img alt="International Pet Relocation Dubai" fetchPriority="high" decoding="async" class="object-cover w-full h-full absolute inset-0" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;object-position:82% center;color:transparent" sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75" />
      <div class="absolute inset-0 intl-hero-gradient"></div>
      <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%);"></div>
    </div>
    `;
  html = html.slice(0, bgStartHtml) + newBgBlockHtml + html.slice(bgEndHtml);
  console.log('✓ Successfully replaced hero bg in international-pet-relocation.html');
} else {
  console.log('⚠ Could not find bg boundaries in html');
}

// Add preload link to <head> if not present
const preloadTag = `<link rel="preload" as="image" imageSrcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80&amp;w=3840&amp;q=75 3840w" imageSizes="100vw" fetchPriority="high"/>`;

if (!html.includes('imageSrcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb')) {
  html = html.replace('<link rel="preload" as="image" href="/logo.png?v=3" fetchPriority="high"/>', `<link rel="preload" as="image" href="/logo.png?v=3" fetchPriority="high"/>${preloadTag}`);
  console.log('✓ Added hero image preload tag in head');
}

fs.writeFileSync(htmlPath, html);
console.log('✓ Saved updated international-pet-relocation.html');

// 4. UPDATE scripts/apply-full-redesign.mjs
const applyScriptPath = path.join(root, 'scripts/apply-full-redesign.mjs');
let applyScript = fs.readFileSync(applyScriptPath, 'utf8');

const oldHeroJsxApply = `      \${jsxSingle}("div",{className:"absolute inset-0 hidden sm:block",style:{background:"linear-gradient(to right, #041a2c 0%, #041a2c 34%, rgba(4,26,44,0.92) 50%, rgba(4,26,44,0.55) 68%, rgba(4,26,44,0.15) 86%, transparent 100%)"}}),
      \${jsxSingle}("div",{className:"absolute inset-0 block sm:hidden",style:{background:"linear-gradient(to bottom, rgba(4,26,44,0.95) 0%, rgba(4,26,44,0.85) 60%, rgba(4,26,44,0.95) 100%)"}}),
      \${jsxSingle}("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"}})`;

const newHeroJsxApply = `      \${jsxSingle}("div",{className:"absolute inset-0 intl-hero-gradient"}),
      \${jsxSingle}("div",{className:"absolute inset-0",style:{background:"linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)"}})`;

if (applyScript.includes(oldHeroJsxApply)) {
  applyScript = applyScript.replace(oldHeroJsxApply, newHeroJsxApply);
  fs.writeFileSync(applyScriptPath, applyScript);
  console.log('✓ Updated apply-full-redesign.mjs');
}

// 5. UPDATE src/app/international-pet-relocation/page.tsx
const pageTsxPath = path.join(root, 'src/app/international-pet-relocation/page.tsx');
let pageTsx = fs.readFileSync(pageTsxPath, 'utf8');

const oldOverlayPageTsx = `          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                'linear-gradient(to right, #041a2c 0%, #041a2c 34%, rgba(4,26,44,0.92) 50%, rgba(4,26,44,0.55) 68%, rgba(4,26,44,0.15) 86%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 block sm:hidden"
            style={{
              background:
                'linear-gradient(to bottom, rgba(4,26,44,0.95) 0%, rgba(4,26,44,0.85) 60%, rgba(4,26,44,0.95) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)',
            }}
          />`;

const newOverlayPageTsx = `          <div className="absolute inset-0 intl-hero-gradient" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(4,26,44,0.7) 0%, transparent 22%)',
            }}
          />`;

if (pageTsx.includes(oldOverlayPageTsx)) {
  pageTsx = pageTsx.replace(oldOverlayPageTsx, newOverlayPageTsx);
  fs.writeFileSync(pageTsxPath, pageTsx);
  console.log('✓ Updated page.tsx');
}

console.log('--- ALL FILES SUCCESSFULLY PATCHED ---');
