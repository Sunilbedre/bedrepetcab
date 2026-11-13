import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

/*
 * Cache busting for the assets the patch scripts edit in place.
 * Next serves /_next/static/* with a one-year "immutable" cache, so a browser (or CDN) that already has e.g. layout-<hash>.js keeps using it even after
 * the file's content changed. That hides every change made to these files: new menus, scripts, styles. This gives the edited assets a new name derived from
 * their content (the hash part of the file name) and rewrites every reference to the old name. Run LAST in sync:live. Idempotent: nothing changes
 * until the content changes again.
 *   - the stylesheet                      static/css/<hash>.css
 *   - the browser layout chunk            static/chunks/app/layout-<hash>.js
 *   - the home page chunk                 static/chunks/app/page-<hash>.js
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const dirs = { css: path.join(ROOT, 'static', 'css'), app: path.join(ROOT, 'static', 'chunks', 'app') };
const targets = [
  ...fs.readdirSync(dirs.css).filter((f) => /^[0-9a-f]{16}\.css$/.test(f)).map((f) => ({ dir: dirs.css, file: f, re: /^([0-9a-f]{16})(\.css)$/ })),
  ...fs.readdirSync(dirs.app).filter((f) => /^layout-[0-9a-f]{16}\.js$/.test(f)).map((f) => ({ dir: dirs.app, file: f, re: /^(layout-)([0-9a-f]{16})(\.js)$/ })),
  ...fs.readdirSync(dirs.app).filter((f) => /^page-[0-9a-f]{16}\.js$/.test(f)).map((f) => ({ dir: dirs.app, file: f, re: /^(page-)([0-9a-f]{16})(\.js)$/ })),
];

const renames = [];
for (const t of targets) {
  const fp = path.join(t.dir, t.file);
  const oldHash = t.file.match(/([0-9a-f]{16})\.(css|js)$/)[1];
  const newHash = crypto.createHash('sha256').update(fs.readFileSync(fp)).digest('hex').slice(0, 16);
  if (oldHash === newHash) continue;
  const newFile = t.file.replace(oldHash, newHash);
  fs.renameSync(fp, path.join(t.dir, newFile));
  renames.push([oldHash, newHash, t.file, newFile]);
}

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (['cache', 'node_modules'].includes(e.name) ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
let touched = 0;
if (renames.length) {
  for (const f of walk(ROOT).filter((x) => /\.(js|json|html|rsc|meta|css|txt)$/.test(x))) {
    let t = fs.readFileSync(f, 'utf8');
    let u = t;
    for (const [o, n] of renames) if (u.includes(o)) u = u.split(o).join(n);
    if (u !== t) { fs.writeFileSync(f, u); touched++; }
  }
}
console.log('asset cache busting: ' + (renames.length ? renames.map((r) => r[2] + ' -> ' + r[3]).join(', ') + ` (${touched} files updated)` : 'nothing to rename'));
