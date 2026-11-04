import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page questions section ("Pre-cooled fleet"): the dog close-up is replaced by the Global Pet Cab pet taxi photo
 * (public/banners/faq-van.jpg). Server render only: that section lives in the home page's server bundle.
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'page.js');
let s = fs.readFileSync(file, 'utf8');

const OLD = 's.jsx(i.default,{src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1800&q=80",alt:"Pet travelling comfortably in a climate-controlled Dubai pet cab",fill:!0,className:"object-cover object-center",sizes:"100vw"})';
const NEW = 's.jsx("img",{src:"/banners/faq-van.jpg",alt:"A Global Pet Cab pet taxi with a golden retriever and the driver",width:"1448",height:"1086",loading:"lazy",decoding:"async",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"50% 42%"}})';

if (s.includes(NEW)) console.log('faq image: already');
else if (!s.includes(OLD)) throw new Error('patch-faq-image: original image not found');
else { fs.writeFileSync(file, s.replace(OLD, () => NEW)); console.log('faq image: replaced'); }
