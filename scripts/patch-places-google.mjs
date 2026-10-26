import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'server', 'app', 'api', 'places', 'search', 'route.js');
let s = fs.readFileSync(file, 'utf8');

if (s.includes('places.googleapis.com')) {
  console.log('already patched');
  process.exit(0);
}

// Google Places API (New) autocomplete, server-side so the key never reaches the browser.
const google = `async function gplaces(q,sc){let k=process.env.GOOGLE_MAPS_API_KEY;if(!k)return[];let b={input:q,languageCode:"en"};if("dubai"===sc||"uae"===sc){b.includedRegionCodes=["ae"];b.locationBias={circle:{center:{latitude:25.2048,longitude:55.2708},radius:"dubai"===sc?30000:50000}}}"city"===sc&&(b.includedPrimaryTypes=["locality"]);let r=await fetch("https://places.googleapis.com/v1/places:autocomplete",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":k},body:JSON.stringify(b)});if(!r.ok)return[];let d=await r.json(),o=[];for(let e of d.suggestions||[]){let p=e.placePrediction;if(!p)continue;let f=p.structuredFormat||{},l=String(f.mainText&&f.mainText.text||p.text&&p.text.text||"").trim();if(!l)continue;o.push({label:l,subtitle:String(f.secondaryText&&f.secondaryText.text||"").trim()||void 0})}return o}`;

const a = 'async function p(e){';
if (!s.includes(a)) throw new Error('route.js layout changed');
s = s.replace(a, google + a);

// try Google first (>=2 chars), then Photon as before
const b = 'if(t.trim().length>=3&&"country"!==r)try{';
if (!s.includes(b)) throw new Error('route.js layout changed');
s = s.replace(b, 'if(t.trim().length>=2)try{for(let e of(await gplaces(t.trim(),r))){let t=e.label.toLowerCase();i.has(t)||(i.add(t),o.push(e))}}catch{}if(o.length<5&&t.trim().length>=3&&"country"!==r)try{');

fs.writeFileSync(file, s);
console.log('patched');
