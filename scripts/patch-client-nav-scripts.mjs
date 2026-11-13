import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Page scripts that were only loaded by the page's own prerendered html never ran when the page was reached by clicking a link
 * (client-side navigation), so /dubai-pet-taxi showed its "Choose your ride" placeholder until a second, full load.
 * Scripts affected: /dubai-pet-taxi -> gpc-taxi-rides.js + gpc-taxi-steps.js ; /why-global-pet-cab -> gpc-why-reveal.js ; /pet-import-cost-uae -> gpc-import-cost.js ;
 * /book-pet-taxi -> gpc-book.js ; both relocation booking pages -> gpc-reloc.js ; home -> gpc-home-banners.js.
 * (A <script> that React renders during client navigation is created by React and never runs, so those pages only worked on a full load.)
 * A small loader in the browser layout chunk (next to the phone bar, which re-renders on every navigation) injects them on arrival.
 * The first render of a full page load is skipped (the html already carries the tags). The scripts are safe to run again (they guard per card).
 * Idempotent.
 */
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'static', 'chunks', 'app');
const LOADER = 'function gpcLoad(){if(typeof window==="undefined")return;var p=location.pathname;if(window.__gpcP0===undefined){window.__gpcP0=p;return}if(window.__gpcLP===p)return;window.__gpcLP=p;var S={"/dubai-pet-taxi":["/gpc-taxi-rides.js","/gpc-taxi-steps.js"],"/why-global-pet-cab":["/gpc-why-reveal.js"],"/pet-import-cost-uae":["/gpc-import-cost.js"],"/book-pet-taxi":["/gpc-book.js"],"/book-pet-relocation-from-dubai":["/gpc-reloc.js"],"/book-pet-relocation-to-dubai":["/gpc-reloc.js"],"/":["/gpc-home-banners.js"]}[p];if(!S)return;S.forEach(function(u){var d=document.createElement("script");d.src=u+"?n="+Date.now();d.defer=!0;document.head.appendChild(d)})}';
const OLD = 'function k(){return(0,a.jsx)("div",{className:"lg:hidden fixed bottom-0';
const NEW = LOADER + 'function k(){typeof window!=="undefined"&&setTimeout(gpcLoad,80);return(0,a.jsx)("div",{className:"lg:hidden fixed bottom-0';
const done = [];
for (const n of fs.readdirSync(dir).filter((x) => /^layout-.*\.js$/.test(x))) {
  const fp = path.join(dir, n);
  const t = fs.readFileSync(fp, 'utf8');
  if (t.includes(LOADER)) continue;
  if (t.includes('function gpcLoad(')) { // an older version of the loader is installed: replace it
    const a = t.indexOf('function gpcLoad(');
    const b = t.indexOf('function k(){', a);
    fs.writeFileSync(fp, t.slice(0, a) + LOADER + t.slice(b));
    done.push(n + ' (updated)');
    continue;
  }
  if (!t.includes(OLD)) throw new Error('patch-client-nav-scripts: phone bar function not found in ' + n);
  fs.writeFileSync(fp, t.replace(OLD, () => NEW));
  done.push(n);
}
console.log('client-nav scripts: ' + (done.length ? done.join(', ') : 'already'));
