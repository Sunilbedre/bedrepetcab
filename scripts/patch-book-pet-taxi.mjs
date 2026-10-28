import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * New /book-pet-taxi page: a five-step booking wizard (ride type, ride details, your details, pet and trip, confirm) with a live quote.
 *  - page route cloned from the why-global-pet-cab bundle (own module ids), wizard is public/gpc-book.js (vanilla JS)
 *  - new API route /api/taxi/quote cloned from /api/taxi/calculate: distance-based fare plus the booking rules
 *    (airport and city-to-city rides, after-hours, return-trip waiting, unvaccinated pet fee, extra pets, VAT)
 *  - the booking itself is saved by the existing /api/taxi/enquiry and confirmed on WhatsApp
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const changed = [];

/* ---------- 1. quote API ---------- */
// The amounts below that are marked NEW are starting values to confirm with the business; the rest come from the admin pricing settings.
const HANDLER = String.raw`async function l(e){try{
const FEES={waitPerBlock:40,sanitization:100,intercityFactor:0.8,intercityMin:150};
const AIRPORT={DXB:[25.2532,55.3657,"Dubai International Airport"],DWC:[24.8962,55.1614,"Al Maktoum International Airport"],AUH:[24.4330,54.6511,"Abu Dhabi International Airport"],SHJ:[25.3286,55.5172,"Sharjah International Airport"],RKT:[25.6135,55.9388,"Ras Al Khaimah International Airport"],FJR:[25.1122,56.3240,"Fujairah International Airport"]};
const CITY={sharjah:32,abudhabi:145,hatta:135};
const b=await e.json();
const rt=["dubai","airport","city"].includes(b.rideType)?b.rideType:"dubai";
const ret=b.tripType==="return"||b.tripType==="round_trip";
const pets=Math.min(6,Math.max(1,parseInt(b.numPets,10)||1));
const wait=ret?Math.min(8,Math.max(0,parseInt(b.waitBlocks,10)||0)):0;
const P=String(b.pickupLocation||"").slice(0,200),D=String(b.dropLocation||"").slice(0,200);
if(rt!=="city"&&(P.trim().length<3||D.trim().length<3))return u.NextResponse.json({success:!1,message:"Pickup and drop-off are required."},{status:400});
let S={id:"default",baseFare:60,includedKm:5,perKmRate:4.5,minimumFare:80,additionalPetCharge:30,roundTripMultiplier:1.8,airportSurcharge:35,nightSurcharge:25,vatEnabled:!0,vatPercentage:5};
try{const row=await a(8194)._.pricingSettings.findUnique({where:{id:"default"}});if(row)S=row}catch(err){console.error("Pricing DB unavailable, using defaults:",err)}
const tf=async(url,opt,ms)=>{const c=new AbortController();const t=setTimeout(()=>c.abort(),ms||6000);try{return await fetch(url,Object.assign({},opt||{},{signal:c.signal}))}finally{clearTimeout(t)}};
const hav=(la,lo,lb,lc)=>{const r=Math.PI/180,dl=(lb-la)*r,dn=(lc-lo)*r,x=Math.sin(dl/2)**2+Math.cos(la*r)*Math.cos(lb*r)*Math.sin(dn/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))};
const geo1=async q=>{try{const r=await tf("https://photon.komoot.io/api/?limit=1&lat=25.2&lon=55.27&q="+encodeURIComponent(q),{headers:{"User-Agent":"GlobalPetCab/1.0"}},7000);if(!r.ok)return null;const j=await r.json();const c=j.features&&j.features[0]&&j.features[0].geometry&&j.features[0].geometry.coordinates;return c?{lat:c[1],lng:c[0]}:null}catch{return null}};
const geo=async q=>{const t=String(q).replace(/\s+/g," ").trim();const parts=t.split(",").map(x=>x.trim()).filter(Boolean);const tries=[t+" UAE",t+" Dubai",t];if(parts.length>1){tries.push(parts[parts.length-1]+" Dubai");tries.push(parts[0]+" Dubai")}for(const x of tries){const g=await geo1(x);if(g)return g}return null};
const gRoute=async(o,d)=>{const k=process.env.GOOGLE_MAPS_API_KEY;if(!k)return null;try{const r=await tf("https://routes.googleapis.com/directions/v2:computeRoutes",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":k,"X-Goog-FieldMask":"routes.distanceMeters"},body:JSON.stringify({origin:o,destination:d,travelMode:"DRIVE",regionCode:"AE"})},6000);if(!r.ok)return null;const j=await r.json();const m=j.routes&&j.routes[0]&&j.routes[0].distanceMeters;return m?m/1000:null}catch{return null}};
const osrm=async(p,q)=>{try{const r=await tf("https://router.project-osrm.org/route/v1/driving/"+p.lng+","+p.lat+";"+q.lng+","+q.lat+"?overview=false",{},6000);if(!r.ok)return null;const j=await r.json();const m=j.routes&&j.routes[0]&&j.routes[0].distance;return m?m/1000:null}catch{return null}};
let km=null,note="";
if(rt==="city"){km=CITY[b.route]||CITY.sharjah;note="intercity route"}
else{
 let ap=null,oAddr=P,dAddr=D;
 if(rt==="airport"){ap=AIRPORT[b.airport]||AIRPORT.DXB;if(b.direction==="from")oAddr=ap[2];else dAddr=ap[2]}
 const toLoc=(txt,isAp)=>isAp?{address:txt}:{address:txt+", UAE"};
 const oIsAp=rt==="airport"&&b.direction==="from",dIsAp=rt==="airport"&&b.direction!=="from";
 km=await gRoute(toLoc(oAddr,oIsAp),toLoc(dAddr,dIsAp));
 if(km)note="road distance";
 if(!km){
  const pa=oIsAp?{lat:ap[0],lng:ap[1]}:await geo(oAddr),pb=dIsAp?{lat:ap[0],lng:ap[1]}:await geo(dAddr);
  if(pa&&pb){km=await osrm(pa,pb);if(km)note="road distance";if(!km){km=Math.round(hav(pa.lat,pa.lng,pb.lat,pb.lng)*1.35*10)/10;note="estimated distance"}}
 }
 if(!km)return u.NextResponse.json({success:!1,message:"We could not locate those addresses. Please add the area or landmark, for example 'Dubai Marina'."},{status:422});
}
km=Math.max(rt==="city"?km:3,Math.round(km*10)/10);
const far=rt==="city"||km>60;
const perKm=far?Math.round(S.perKmRate*FEES.intercityFactor*100)/100:S.perKmRate;
const minFare=rt==="city"?Math.max(S.minimumFare,FEES.intercityMin):S.minimumFare;
const billable=Math.max(0,km-S.includedKm),distCharge=Math.round(billable*perKm*100)/100;
const extraPets=Math.max(0,pets-1)*S.additionalPetCharge;
const raw=S.baseFare+distCharge+extraPets;
const oneWay=Math.max(minFare,raw);
const lines=[];
lines.push({label:"Base fare (first "+S.includedKm+" km included)",amount:S.baseFare});
if(distCharge>0)lines.push({label:Math.round(billable*10)/10+" km extra at AED "+perKm+"/km",amount:distCharge});
if(extraPets>0)lines.push({label:"Additional pets ("+(pets-1)+")",amount:extraPets});
if(oneWay>raw)lines.push({label:"Minimum fare adjustment",amount:Math.round((oneWay-raw)*100)/100});
let sub=oneWay;
if(ret){const r2=Math.round(oneWay*(S.roundTripMultiplier-1)*100)/100;lines.push({label:"Return journey (30 min waiting included)",amount:r2});sub+=r2;if(wait>0){const w=wait*FEES.waitPerBlock;lines.push({label:"Extra waiting ("+wait*30+" min)",amount:w});sub+=w}}
if(rt==="airport"){lines.push({label:"Airport service fee",amount:S.airportSurcharge});sub+=S.airportSurcharge}
let night=!1;if(b.pickupTime){const h=parseInt(String(b.pickupTime).split(":")[0],10);night=h>=22||h<6}
if(night){lines.push({label:"After-hours service (10 PM to 6 AM)",amount:S.nightSurcharge});sub+=S.nightSurcharge}
if(b.vaccinated===!1){lines.push({label:"Sanitization fee (pet not vaccinated)",amount:FEES.sanitization});sub+=FEES.sanitization}
sub=Math.round(sub*100)/100;
const vp=S.vatEnabled?S.vatPercentage:0,vat=Math.round(sub*vp)/100;
const total=Math.ceil((sub+vat)/5)*5;
return u.NextResponse.json({success:!0,quote:{rideType:rt,distanceKm:km,distanceNote:note,lines,subtotal:sub,vatPercent:vp,vat,total}})
}catch(err){console.error("API Error in /api/taxi/quote:",err);return u.NextResponse.json({success:!1,message:"Server calculation error"},{status:500})}}
`;

const QDIR = path.join(APP, 'api', 'taxi', 'quote');
if (!fs.existsSync(path.join(QDIR, 'route.js')) || !fs.readFileSync(path.join(QDIR, 'route.js'), 'utf8').includes('geo1')) {
  let s = fs.readFileSync(path.join(APP, 'api', 'taxi', 'calculate', 'route.js'), 'utf8');
  const must = (str, from, to) => { if (!str.includes(from)) throw new Error('patch-book-pet-taxi: not found: ' + from.slice(0, 50)); return str.split(from).join(to); };
  s = must(s, 'e.id=854,e.ids=[854]', 'e.id=940854,e.ids=[940854]');
  s = s.replace(/\b6773\b/g, '946773');
  s = must(s, '/api/taxi/calculate/route', '/api/taxi/quote/route');
  s = must(s, 'pathname:"/api/taxi/calculate"', 'pathname:"/api/taxi/quote"');
  s = must(s, 'taxi\\\\calculate\\\\route.ts', 'taxi\\\\quote\\\\route.ts');
  const a = s.indexOf('async function l(e){try{');
  const b = s.indexOf('let c=new i.AppRouteRouteModule(');
  if (a === -1 || b === -1) throw new Error('patch-book-pet-taxi: calculate handler not found');
  s = s.slice(0, a) + HANDLER.replace(/\n/g, '') .replace(/;\s*$/, '') + s.slice(b);
  fs.mkdirSync(QDIR, { recursive: true });
  fs.writeFileSync(path.join(QDIR, 'route.js'), s);
  changed.push('quote api');
}

/* ---------- 2. page route ---------- */
const BASE = path.join(APP, 'why-global-pet-cab', 'page.js');
const DIR = path.join(APP, 'book-pet-taxi');
const IDS = { chunk: 950607, entry: 951167, page: 956189 };
const pageModule = (P) => `${P}:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p,metadata:()=>h});var s=a(9510);let h={title:"Book a Pet Taxi in Dubai — Instant Quote | Global Pet Cab Dubai",description:"Book a pet taxi in Dubai, an airport transfer or a city-to-city ride in five easy steps. See your price first, then confirm on WhatsApp."};function p(){return (0,s.jsxs)("div",{className:"font-body gpc-book-page",children:[(0,s.jsxs)("section",{className:"gb-hero",children:[(0,s.jsxs)("div",{className:"gb-hero-in",children:[s.jsx("span",{className:"gb-badge",children:"PET TAXI BOOKING"}),s.jsx("h1",{className:"font-heading",children:"Book a Pet Taxi in Dubai"}),s.jsx("p",{children:"Within Dubai, to the airport or across the UAE. Five quick steps, your price up front, confirmation on WhatsApp."})]})]}),(0,s.jsxs)("section",{className:"gb-wrap",children:[s.jsx("div",{id:"gpc-book-root",className:"gb-root","aria-live":"polite"}),s.jsx("noscript",{children:"Please enable JavaScript to use the booking form, or message us on WhatsApp."})]}),s.jsx("script",{src:"/gpc-book.js?v=1",defer:!0})]})}}`;
if (!fs.existsSync(path.join(DIR, 'page.js')) || !fs.readFileSync(path.join(DIR, 'page.js'), 'utf8').includes('gpc-book-page')) {
  let s = fs.readFileSync(BASE, 'utf8');
  const must = (str, from, to) => { if (!str.includes(from)) throw new Error('patch-book-pet-taxi: not found: ' + from.slice(0, 60)); return str.split(from).join(to); };
  s = must(s, 'e.id=607,e.ids=[607]', `e.id=${IDS.chunk},e.ids=[${IDS.chunk}]`);
  s = s.replace(/\b1167\b/g, String(IDS.entry)).replace(/\b6189\b/g, String(IDS.page));
  s = must(s, '"/why-global-pet-cab/page"', '"/book-pet-taxi/page"');
  s = must(s, 'pathname:"/why-global-pet-cab"', 'pathname:"/book-pet-taxi"');
  s = must(s, '["why-global-pet-cab",{children:["__PAGE__"', '["book-pet-taxi",{children:["__PAGE__"');
  s = s.split('why-global-pet-cab\\\\page.tsx').join('book-pet-taxi\\\\page.tsx');
  const a = s.indexOf(`${IDS.page}:(e,t,a)=>{"use strict";a.r(t)`);
  const b = s.indexOf(';var t=require("../../webpack-runtime.js")');
  if (a === -1 || b === -1) throw new Error('patch-book-pet-taxi: page module boundaries not found');
  s = s.slice(0, a) + pageModule(IDS.page) + '}' + s.slice(b);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'page.js'), s);
  const mf = fs.readFileSync(path.join(APP, 'why-global-pet-cab', 'page_client-reference-manifest.js'), 'utf8');
  fs.writeFileSync(path.join(DIR, 'page_client-reference-manifest.js'), mf.split('"/why-global-pet-cab/page"').join('"/book-pet-taxi/page"').split('why-global-pet-cab\\\\page"').join('book-pet-taxi\\\\page"'));
  changed.push('page route');
}

/* ---------- 3. manifests ---------- */
const updateJson = (file, fn) => {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = JSON.stringify(j);
  fn(j);
  if (JSON.stringify(j) !== before) { fs.writeFileSync(file, JSON.stringify(j, null, 2)); changed.push('manifest: ' + path.basename(file)); }
};
updateJson(path.join(ROOT, 'server', 'app-paths-manifest.json'), (j) => { j['/book-pet-taxi/page'] = 'app/book-pet-taxi/page.js'; j['/api/taxi/quote/route'] = 'app/api/taxi/quote/route.js'; });
updateJson(path.join(ROOT, 'app-path-routes-manifest.json'), (j) => { j['/book-pet-taxi/page'] = '/book-pet-taxi'; j['/api/taxi/quote/route'] = '/api/taxi/quote'; });
updateJson(path.join(ROOT, 'app-build-manifest.json'), (j) => { j.pages['/book-pet-taxi/page'] = j.pages['/why-global-pet-cab/page']; });
updateJson(path.join(ROOT, 'routes-manifest.json'), (j) => {
  for (const route of ['/book-pet-taxi', '/api/taxi/quote']) {
    if (j.staticRoutes.some((r) => r.page === route)) continue;
    const esc = route.replace(/-/g, '\\-');
    j.staticRoutes.push({ page: route, regex: `^${esc}(?:/)?$`, routeKeys: {}, namedRegex: `^${esc}(?:/)?$` });
  }
});

/* ---------- 4. css ---------- */
const CSS_START = '/*gpc-book*/';
const CSS_END = '/*end-gpc-book*/';
const R = '.gpc-book-page';
const CSS = [
  CSS_START,
  `${R}{background:#f4f7f9;min-height:60vh}`,
  '.gb-hero{background:linear-gradient(90deg,rgba(3,31,51,.94),rgba(5,45,73,.8)),url("/gallery/pet-4.jpg") center 35%/cover no-repeat,#052d49;color:#fff;padding:3rem 1rem 5.5rem;text-align:center}',
  '.gb-hero-in{max-width:46rem;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:.85rem}',
  '.gb-badge{font-size:.72rem;font-weight:900;letter-spacing:.14em;color:#8fe1f5;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);padding:.45rem 1rem;border-radius:999px}',
  '.gb-hero h1{font-size:clamp(1.8rem,4.4vw,2.7rem);line-height:1.15;font-weight:900;margin:0;text-wrap:balance}',
  '.gb-hero p{margin:0;color:rgba(255,255,255,.86);font-size:1.0625rem;line-height:1.6;text-wrap:pretty}',
  '.gb-wrap{max-width:68rem;margin:-3.25rem auto 0;padding:0 1rem 4.5rem;position:relative}',
  '.gb-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:1.25rem;align-items:start}',
  '@media (min-width:960px){.gb-grid{grid-template-columns:minmax(0,1fr) 20rem}.gb-side{position:sticky;top:7rem}}',
  '.gb-card{background:#fff;border:1px solid rgba(14,115,150,.16);border-radius:1.5rem;padding:1.5rem 1.25rem;box-shadow:0 24px 50px -30px rgba(5,45,73,.4)}',
  '@media (min-width:640px){.gb-card{padding:2rem}}',
  '.gb-steps{display:flex;gap:.35rem;list-style:none;margin:0 0 1.5rem;padding:0}',
  '.gb-steps li{flex:1;display:flex;flex-direction:column;gap:.35rem;align-items:center;font-size:.72rem;font-weight:700;color:#94a3b8}',
  '.gb-steps li span{width:1.9rem;height:1.9rem;border-radius:999px;background:#e2e8f0;color:#64748b;display:grid;place-items:center;font-weight:800;font-size:.85rem}',
  '.gb-steps li.on span{background:#c2410c;color:#fff}.gb-steps li.on{color:#052d49}.gb-steps li.done span{background:#0e7396;color:#fff}.gb-steps li.done{color:#0e7396}',
  '.gb-steps em{font-style:normal}','.gb-steps li{cursor:pointer;transition:transform .15s}.gb-steps li:hover{transform:translateY(-2px)}.gb-steps li:hover span{box-shadow:0 0 0 4px rgba(14,115,150,.15)}',
  '.gb-body h2{font-size:1.45rem;font-weight:900;color:#052d49;margin:0 0 .35rem;font-family:inherit}',
  '.gb-sub{color:#475569;margin:0 0 1.1rem}',
  '.gb-rides{display:grid;gap:.75rem;margin-top:1rem}',
  '@media (min-width:640px){.gb-rides{grid-template-columns:repeat(3,minmax(0,1fr))}}',
  '.gb-ride{display:flex;flex-direction:column;gap:.35rem;align-items:flex-start;text-align:left;padding:1.1rem;border-radius:1.1rem;border:2px solid rgba(14,115,150,.2);background:#fff;cursor:pointer;transition:border-color .2s,box-shadow .2s,transform .2s}',
  '.gb-ride:hover{border-color:#0e7396;transform:translateY(-2px);box-shadow:0 14px 28px -20px rgba(5,45,73,.5)}',
  '.gb-ride.on{border-color:#0e7396;background:#eaf7fb}',
  '.gb-ride .ic{font-size:1.6rem}.gb-ride b{color:#052d49;font-size:1.05rem}.gb-ride small{color:#475569;font-size:.85rem;line-height:1.4}',
  '.gb-help{margin:1.1rem 0 0;color:#475569;font-size:.9rem}.gb-help a{color:#0e7396;font-weight:700;text-decoration:underline}',
  '.gb-f{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}',
  '.gb-f label{font-weight:700;color:#0f172a;font-size:.9rem}.gb-f label i{color:#c2410c;font-style:normal}',
  '.gb-f input,.gb-f select,.gb-f textarea{width:100%;padding:.8rem .95rem;border-radius:.9rem;border:1.5px solid #cbd5e1;background:#fff;font-size:1rem;color:#0f172a;font-family:inherit}',
  '.gb-f input:focus,.gb-f select:focus,.gb-f textarea:focus{outline:none;border-color:#0e7396;box-shadow:0 0 0 3px rgba(14,115,150,.18)}',
  '.gb-f small{color:#64748b;font-size:.8rem}',
  '.gb-two{display:grid;gap:0 1rem}@media (min-width:640px){.gb-two{grid-template-columns:1fr 1fr}}',
  '.gb-seg{display:flex;flex-wrap:wrap;gap:.5rem}',
  '.gb-seg button{flex:1;min-width:7rem;padding:.75rem .9rem;border-radius:.9rem;border:1.5px solid #cbd5e1;background:#fff;color:#334155;font-weight:700;cursor:pointer;line-height:1.25}',
  '.gb-seg button.on{border-color:#0e7396;background:#eaf7fb;color:#052d49;box-shadow:inset 0 0 0 1px #0e7396}',
  '.gb-seg button small{font-weight:600;color:#64748b}',
  '.gb-pl{position:relative}',
  '.gb-sug{position:absolute;z-index:20;left:0;right:0;top:calc(100% + .25rem);margin:0;padding:.25rem;list-style:none;background:#fff;border:1px solid #cbd5e1;border-radius:.9rem;box-shadow:0 18px 36px -18px rgba(5,45,73,.45);max-height:16rem;overflow:auto}',
  '.gb-sug[hidden]{display:none}',
  '.gb-sug li{padding:.6rem .75rem;border-radius:.65rem;cursor:pointer;display:flex;flex-direction:column}.gb-sug li:hover{background:#eaf7fb}.gb-sug li b{color:#052d49;font-size:.95rem}.gb-sug li small{color:#64748b}',
  '.gb-note{color:#475569;font-size:.88rem;background:#f1f7fa;border-radius:.8rem;padding:.7rem .9rem;margin:.25rem 0 0}',
  '.gb-sum{margin:.5rem 0 1rem}.gb-sum div{display:flex;gap:1rem;padding:.65rem 0;border-bottom:1px solid #e2e8f0}.gb-sum dt{flex:0 0 7rem;color:#64748b;font-weight:700;font-size:.9rem}.gb-sum dd{margin:0;color:#0f172a;font-weight:600;min-width:0;overflow-wrap:anywhere}',
  '.gb-terms{display:flex;gap:.6rem;align-items:flex-start;color:#334155;font-size:.92rem;line-height:1.5}.gb-terms input{margin-top:.25rem;width:1.1rem;height:1.1rem;flex:none}',
  '.gb-err{color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:.8rem;padding:.7rem .9rem;margin:1rem 0 0;font-weight:600}',
  '.gb-nav{display:flex;justify-content:space-between;align-items:center;gap:.75rem;margin-top:1.4rem}',
  '.gb-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.95rem 1.6rem;border-radius:999px;border:0;background:#c2410c;color:#fff;font-weight:800;font-size:1rem;cursor:pointer;text-decoration:none;box-shadow:0 14px 26px -14px rgba(194,65,12,.75);transition:background .2s,transform .2s}',
  '.gb-btn:hover{background:#9a3412;transform:translateY(-1px)}.gb-btn[disabled]{opacity:.6;cursor:wait}',
  '.gb-btn.ghost{background:transparent;color:#052d49;box-shadow:none;border:1.5px solid #cbd5e1}.gb-btn.ghost:hover{background:#f1f5f9}',
  '.gb-btn.wa{background:#10b981;box-shadow:0 14px 26px -14px rgba(16,185,129,.75)}.gb-btn.wa:hover{background:#059669}',
  '.gb-quote{background:linear-gradient(160deg,#052d49,#0a4d6e);color:#fff;border-radius:1.5rem;padding:1.4rem;box-shadow:0 24px 50px -28px rgba(5,45,73,.6)}',
  '.gb-q-h{display:flex;justify-content:space-between;align-items:center;font-weight:800;margin-bottom:.6rem}.gb-q-h em{font-style:normal;font-size:.72rem;background:rgba(255,255,255,.14);padding:.25rem .6rem;border-radius:999px;font-weight:700}',
  '.gb-q-t{font-size:2.3rem;font-weight:900;line-height:1.1}.gb-q-d{color:rgba(255,255,255,.75);font-size:.85rem;margin:.2rem 0 .8rem}',
  '.gb-q-m{color:rgba(255,255,255,.85);margin:.2rem 0}.gb-q-m.err{color:#fecaca}',
  '.gb-q-pol{margin:.8rem 0 0;padding-left:1.1rem;color:rgba(255,255,255,.75);font-size:.85rem;line-height:1.6}',
  '.gb-q-l{list-style:none;margin:0;padding:.6rem 0 0;border-top:1px solid rgba(255,255,255,.18)}.gb-q-l li{display:flex;justify-content:space-between;gap:.75rem;padding:.3rem 0;font-size:.88rem;color:rgba(255,255,255,.9)}.gb-q-l b{white-space:nowrap}.gb-q-l b.neg{color:#86efac}',
  '.gb-q-v{display:flex;justify-content:space-between;padding:.55rem 0 0;margin-top:.4rem;border-top:1px solid rgba(255,255,255,.18);font-size:.85rem;color:rgba(255,255,255,.8)}',
  '.gb-q-n{font-size:.76rem;color:rgba(255,255,255,.65);margin:.7rem 0 0;line-height:1.5}',
  '.gb-mbar{display:none}',
  '@media (max-width:959px){.gb-side{order:-1}.gb-side .gb-quote{padding:1.1rem}.gb-side .gb-q-l,.gb-side .gb-q-n,.gb-side .gb-q-pol{display:none}.gb-q-t{font-size:1.9rem}}',
  '.gb-done{text-align:center;padding:1rem .5rem;display:flex;flex-direction:column;align-items:center;gap:.9rem}.gb-done .tick{width:4rem;height:4rem;border-radius:999px;background:#10b981;color:#fff;display:grid;place-items:center;font-size:2rem;font-weight:900}.gb-done h2{margin:0;color:#052d49;font-size:1.6rem;font-weight:900}.gb-done p{margin:0;color:#475569;max-width:32rem;line-height:1.6}',
  CSS_END,
].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
changed.push('css');
console.log('book pet taxi:\n  ' + changed.join('\n  '));
