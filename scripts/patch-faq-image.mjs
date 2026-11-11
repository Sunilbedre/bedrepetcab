import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page questions section ("Pre-cooled fleet"): the dog close-up is replaced by the Global Pet Cab pet taxi photo
 * (public/banners/faq-street.webp, previously faq-van.jpg). Server render only: that section lives in the home page's server bundle.
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'page.js');
let s = fs.readFileSync(file, 'utf8');

const OLD = 's.jsx(i.default,{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1800&q=80",alt:"Pet travelling comfortably in a climate-controlled Dubai pet cab",fill:!0,className:"object-cover object-center",sizes:"100vw"})';
const PREV = 's.jsx("img",{src:"/banners/faq-van.jpg",alt:"A Global Pet Cab pet taxi with a golden retriever and the driver",width:"1448",height:"1086",loading:"lazy",decoding:"async",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"50% 42%"}})';
const NEW = 's.jsx("img",{src:"/banners/faq-street.webp",alt:"A Global Pet Cab pet taxi on a sunny street: a woman and her golden retriever being welcomed by the driver",width:"2000",height:"667",loading:"lazy",decoding:"async",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"62% 50%"}})';

if (s.includes(NEW)) console.log('faq image: already');
else if (s.includes(PREV)) { fs.writeFileSync(file, s.replace(PREV, () => NEW)); console.log('faq image: updated to street photo'); }
else if (!s.includes(OLD)) throw new Error('patch-faq-image: original image not found');
else { fs.writeFileSync(file, s.replace(OLD, () => NEW)); console.log('faq image: replaced'); }
