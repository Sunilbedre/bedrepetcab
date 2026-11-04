import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Home page colour options for the client to compare (home page only, nothing else changes).
 *   ?theme=a   Fresh teal      (the ChatGPT concept: teal, navy, soft white, mint, amber accent)
 *   ?theme=b   Navy & gold
 *   ?theme=c   Forest & orange
 *   (no theme) the current blue
 * Every compiled rule that uses the brand blues / teals / orange is copied once per theme with the colours re-hued
 * (lightness is kept, so contrast stays the same) and scoped to  body[data-gpc-theme="x"]:has(.gpc-hb)  so it can only apply
 * where the home banner exists. public/gpc-home-themes.js shows the switcher and sets the attribute.
 * Must run after every other css patch (it copies the stylesheet as it stands). Idempotent: it rebuilds its own block.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const START = '/*gpc-home-themes*/';
const END = '/*end-gpc-home-themes*/';

/* ---- colour maths ---- */
function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return [h, s, l];
}
function hsl2rgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t) => { t = (t + 1) % 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255));
}
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/*
 * navy  = the dark brand blues (lightness below .27)        -> hue nh, saturation x ns, lightness x nl
 * brand = the teal / cyan accents and their pale tints       -> hue th, saturation x ts, lightness x tl (only for l <= .8)
 * cta   = the orange call-to-action colours                  -> hue ch, saturation x cs, lightness x cl
 */
const THEMES = {
  a: { name: 'Fresh teal', nh: 209, ns: 0.72, nl: 1.12, th: 181, ts: 0.9, tl: 1.14, ch: 30, cs: 1, cl: 1.1 },
  b: { name: 'Navy & gold', nh: 220, ns: 0.78, nl: 0.95, th: 40, ts: 0.82, tl: 1.32, ch: 36, cs: 0.8, cl: 0.9 },
  d: { name: 'Dark', dark: true, nh: 210, ns: 0.85, nl: 0.9, th: 190, ts: 1, tl: 1.08, ch: 21, cs: 1, cl: 1.05 },
  e: { name: 'Ivory, teal & gold', warm: true, lh: 40, ls: 0.3, nh: 180, ns: 0.62, nl: 1.3, th: 176, ts: 0.55, tl: 1.0, ch: 42, cs: 0.68, cl: 1.1 },
  c: { name: 'Forest & orange', nh: 158, ns: 0.7, nl: 1.0, th: 158, ts: 0.78, tl: 1.1, ch: 20, cs: 1, cl: 1.12 },
};

function remap(r, g, b, T) {
  const [h, s, l] = rgb2hsl(r, g, b);
  if (s < 0.12) return [r, g, b];
  // orange / coral call-to-action colours
  if (h >= 8 && h <= 40 && s > 0.45 && l > 0.2 && l < 0.7) return hsl2rgb(T.ch, clamp(s * T.cs), clamp(l * T.cl));
  // blues and teals
  if (h >= 168 && h <= 238) {
    if (s < 0.3 && l < 0.7) return [r, g, b]; // slate greys used for text and borders
    if (s < 0.2 && l >= 0.7) return T.warm && l >= 0.85 && l < 0.995 ? hsl2rgb(T.lh, T.ls, l * 0.985) : [r, g, b]; // light greys (warm ivory in the ivory option)
    if (l < 0.27) return hsl2rgb(T.nh, clamp(s * T.ns), clamp(l * T.nl));
    if (l > 0.8 && T.warm) return hsl2rgb(T.lh, Math.min(s, T.ls), l * 0.985);
    if (l > 0.8) return hsl2rgb(T.th, clamp(Math.min(s, 0.55) * (T.ts > 0.85 ? 1 : 0.9)), l);
    return hsl2rgb(T.th, clamp(s * T.ts), clamp(l * T.tl, 0, 0.9));
  }
  return [r, g, b];
}

const hex2 = (n) => n.toString(16).padStart(2, '0');
function recolor(text, T, post) {
  const map = (r, g, b, alpha) => { const c = remap(r, g, b, T); return post ? post(c, alpha) : c; };
  text = text.replace(/#([0-9a-fA-F]{6})\b/g, (m, x) => {
    const [r, g, b] = map(parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16), false);
    return '#' + hex2(r) + hex2(g) + hex2(b);
  });
  text = text.replace(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])\b/g, (m, a2, b2, c) => {
    const [r, g, b] = map(parseInt(a2 + a2, 16), parseInt(b2 + b2, 16), parseInt(c + c, 16), false);
    return '#' + hex2(r) + hex2(g) + hex2(b);
  });
  text = text.replace(/(rgba?)\(\s*(\d+)(\s*,\s*|\s+)(\d+)(\s*,\s*|\s+)(\d+)(\s*[,/]\s*[\d.%]+)?/g, (m, fn, r, s1, g, s2, b, al) => {
    const [nr, ng, nb] = map(+r, +g, +b, !!al);
    return fn + '(' + nr + s1 + ng + s2 + nb + (al || '');
  });
  return text;
}

/* ---- the dark option: surfaces go dark, dark text goes light, light borders go dark (decided per css property) ---- */
const DARK_BG = (c) => { const [h, s, l] = rgb2hsl(...c); if (l >= 0.995) return hsl2rgb(212, 0.4, 0.14); if (l > 0.8 && s < 0.9 + 1) return hsl2rgb(212, 0.42, 0.085 + (l - 0.8) * 0.1); return c; };
const DARK_TEXT = (c) => { const [h, s, l] = rgb2hsl(...c); if (l >= 0.6) return c; if (h >= 8 && h <= 50 && s > 0.45) return c; return hsl2rgb(h, clamp(s * 0.8), clamp(1 - l * 0.85, 0, 0.95)); };
const DARK_BORDER = (c, alpha) => { if (alpha) return c; const [h, s, l] = rgb2hsl(...c); return l > 0.7 ? hsl2rgb(212, 0.3, 0.24) : c; };
function splitDecls(body) {
  const parts = []; let d = 0, cur = '', q = null;
  for (let k = 0; k < body.length; k++) {
    const c = body[k];
    if (q) { cur += c; if (c === '\\') cur += body[++k]; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === '(') d++; else if (c === ')') d--;
    if (c === ';' && d === 0) { parts.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) parts.push(cur);
  return parts;
}
function recolorBody(body, T) {
  if (!T.dark) return recolor(body, T);
  return splitDecls(body).map((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return decl;
    const prop = decl.slice(0, i).trim().toLowerCase();
    let post = null;
    if (/^(background|background-color|background-image|--tw-gradient-(from|to|via|stops)|--tw-ring-offset-color)$/.test(prop)) post = DARK_BG;
    else if (/^(color|fill|stroke|caret-color|text-decoration-color|-webkit-text-fill-color)$/.test(prop)) post = DARK_TEXT;
    else if (/^(border|outline|--tw-ring-color|column-rule)/.test(prop) && /color|^border$|^outline$/.test(prop) || /^border-(top|right|bottom|left)(-color)?$/.test(prop)) post = DARK_BORDER;
    return decl.slice(0, i + 1) + recolor(decl.slice(i + 1), T, post);
  }).join(';');
}

/* ---- css parsing (rules and nested @media / @supports blocks) ---- */
function parse(css) {
  const out = [];
  let i = 0;
  const n = css.length;
  const skipString = (q) => { i++; while (i < n && css[i] !== q) { if (css[i] === '\\') i++; i++; } i++; };
  const block = () => { // i at '{' -> index after the matching '}'
    let d = 0;
    for (; i < n; i++) {
      const c = css[i];
      if (c === '"' || c === "'") { skipString(c); i--; continue; }
      if (c === '/' && css[i + 1] === '*') { i = css.indexOf('*/', i + 2) + 1; continue; }
      if (c === '{') d++;
      else if (c === '}') { d--; if (d === 0) { i++; return; } }
    }
  };
  while (i < n) {
    while (i < n && /\s/.test(css[i])) i++;
    if (i >= n) break;
    if (css[i] === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); out.push({ type: 'comment', text: css.slice(i, e + 2) }); i = e + 2; continue; }
    const start = i;
    // prelude up to '{' or ';'
    while (i < n && css[i] !== '{' && css[i] !== ';') { if (css[i] === '"' || css[i] === "'") { skipString(css[i]); continue; } i++; }
    if (css[i] === ';') { out.push({ type: 'raw', text: css.slice(start, i + 1) }); i++; continue; }
    const prelude = css.slice(start, i).trim();
    const bs = i;
    block();
    const body = css.slice(bs + 1, i - 1);
    if (prelude.startsWith('@')) {
      if (/^@(media|supports|layer|container)/.test(prelude)) out.push({ type: 'group', prelude, children: parse(body) });
      else out.push({ type: 'raw', text: css.slice(start, i) });
    } else out.push({ type: 'rule', selector: prelude, body });
  }
  return out;
}

function splitSelectors(sel) {
  const parts = [];
  let depth = 0, cur = '', q = null;
  for (let k = 0; k < sel.length; k++) {
    const c = sel[k];
    if (q) { cur += c; if (c === '\\') { cur += sel[++k]; } else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    if (c === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function scope(selector, key) {
  const SC = `body[data-gpc-theme="${key}"]:has(.gpc-hb)`;
  const res = [];
  for (const sel of splitSelectors(selector)) {
    // the preflight reset (*, ::before, ::after) must keep its original, low specificity
    if (/^(:root|html$|html:|html\[|\*|::?(before|after|backdrop)$)/.test(sel)) continue;
    if (/^html\s+body(?![\w-])/.test(sel)) res.push('html ' + sel.replace(/^html\s+body/, SC));
    else if (/^body(?![\w-])/.test(sel)) res.push(sel.replace(/^body/, SC));
    else if (/^html\s/.test(sel)) res.push(SC + ' ' + sel.replace(/^html\s+/, ''));
    else res.push(SC + ' ' + sel);
  }
  return res.join(',');
}

function emit(nodes, key, T) {
  let out = '';
  for (const nd of nodes) {
    if (nd.type === 'rule') {
      const rec = recolorBody(nd.body, T);
      if (rec === nd.body) continue;
      const sel = scope(nd.selector, key);
      if (sel) out += `${sel}{${rec}}\n`;
    } else if (nd.type === 'group') {
      const inner = emit(nd.children, key, T);
      if (inner) out += `${nd.prelude}{\n${inner}}\n`;
    }
  }
  return out;
}

/* ---- run ---- */
const cssDir = path.join(ROOT, 'static', 'css');
let total = 0;
for (const f of fs.readdirSync(cssDir).filter((x) => x.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(END) + END.length);
  t = t.trimEnd();
  const nodes = parse(t);
  let block = START + '\n';
  for (const [key, T] of Object.entries(THEMES)) {
    block += `/*theme ${key}: ${T.name}*/\n` + emit(nodes, key, T);
    // the banner photos have a blue wash baked in on the left: cover it with this theme's navy
    const [nr, ng, nb] = T.dark ? [8, 18, 33] : remap(5, 45, 73, T);
    const sc = `body[data-gpc-theme="${key}"]:has(.gpc-hb)`;
    block += `${sc} .gpc-hb-shade{background:linear-gradient(90deg,rgba(${nr},${ng},${nb},.94) 0%,rgba(${nr},${ng},${nb},.8) 34%,rgba(${nr},${ng},${nb},.35) 56%,rgba(${nr},${ng},${nb},0) 74%)}\n`;
    block += `@media (max-width:767px){${sc} .gpc-hb-slide{background:rgb(${nr},${ng},${nb})}}\n`;
    // dark option: the logo image has dark lettering, so it sits on a white chip (like the footer); page base colours
    if (T.dark) block += `${sc} header img[alt*="Global"],${sc} header a[href="/"] img{background:#fff;border-radius:.8rem;padding:.2rem .55rem}\n${sc}{background:#0b1626;color:#e2e8f0}\n`;
  }
  block += END;
  total += block.length;
  fs.writeFileSync(fp, t + '\n' + block + '\n');
}
console.log(`home themes: ${Object.keys(THEMES).length} themes, ${Math.round(total / 1024)} KB of css`);
