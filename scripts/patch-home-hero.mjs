import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page hero polish (CSS only, appended to the compiled stylesheet).
 * Scoped to the home hero: the only section that has both the #052D49 background and the lg:pb-32 padding.
 */

const cssDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'static', 'css');

const START = '/*gpc-home-hero*/';
const END = '/*end-gpc-home-hero*/';

const H = 'section[class*="bg-[#052D49]"][class*="lg:pb-32"]';
const LEFT = '[class*="lg:col-span-7"]';
const RIGHT = '[class*="lg:col-span-5"]';

const CSS = [
  START,
  // photo: keep the building on the illustration side, calm the text side
  `${H}>div.absolute img{object-position:82% 50%}`,
  `${H}::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,23,38,.95) 0%,rgba(4,26,44,.84) 44%,rgba(5,45,73,.34) 100%)}`,
  `${H}::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(50% 65% at 76% 42%,rgba(26,168,212,.22),transparent 70%)}`,
  // heading + copy
  `${H} h1{font-size:clamp(2.2rem,3.5vw,3.1rem)!important;line-height:1.08!important;letter-spacing:-.025em;text-wrap:balance}`,
  `${H} ${LEFT}>p{font-size:1.0625rem;line-height:1.65;color:rgba(255,255,255,.9);max-width:40rem;text-wrap:pretty}`,
  `${H} ${LEFT}>p .block{font-size:1rem;color:#9fdcf0}`,
  // pills
  `${H} ${LEFT} div.flex-wrap>div{background:rgba(255,255,255,.07)!important;border:1px solid rgba(126,215,240,.4)!important;padding:.6rem 1.15rem;font-size:.85rem}`,
  // buttons
  `${H} ${LEFT}>div:last-child{margin-top:.75rem}`,
  `${H} ${LEFT} a.bg-coral{padding:1.1rem 2rem!important;font-size:1.05rem;box-shadow:0 20px 44px -16px rgba(234,88,12,.75)}`,
  `${H} ${LEFT} a[class*="bg-white/5"]{padding:1.1rem 1.9rem!important;font-size:1.05rem;border:1.5px solid rgba(37,211,102,.65)!important;background:rgba(37,211,102,.1)!important}`,
  `${H} ${LEFT} a[class*="bg-white/5"]:hover{background:rgba(37,211,102,.22)!important}`,
  // illustration: larger, with a soft ring of light behind it
  `${RIGHT}>div:first-child{max-width:540px!important}`,
  `${H} ${RIGHT}>div:first-child::before{content:"";position:absolute;left:50%;top:44%;width:112%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(26,168,212,.26) 0%,rgba(26,168,212,.08) 45%,transparent 68%);z-index:-1;pointer-events:none}`,
  END,
].join('\n');

for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const p = path.join(cssDir, f);
  let s = fs.readFileSync(p, 'utf8');
  const a = s.indexOf(START);
  if (a !== -1) s = s.slice(0, a) + s.slice(s.indexOf(END) + END.length);
  fs.writeFileSync(p, s.trimEnd() + '\n' + CSS + '\n');
  console.log('patched', f);
}
