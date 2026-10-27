import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Hostinger's git build expects a Next.js "standalone" server (.next/standalone/server.js) after the build command.
 * This project does not rebuild with `next build` (that would overwrite the patched, committed .next), so this script
 * assembles the same layout from the committed build instead:
 *
 *   .next/standalone/server.js        the project's server.js
 *   .next/standalone/.next/           the committed build (without cache and without the standalone folder itself)
 *   .next/standalone/public/          static assets
 *   .next/standalone/node_modules/    installed dependencies (run after `prisma generate`)
 *
 * GPC_STANDALONE_LINK=1 links node_modules instead of copying it (local testing only).
 * Never copies .env: environment variables come from the host.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.next', 'standalone');

// a node_modules link left by a local test must be unlinked, never followed
const oldNm = path.join(OUT, 'node_modules');
try { if (fs.lstatSync(oldNm).isSymbolicLink()) fs.rmdirSync(oldNm); } catch { /* none */ }
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const copy = (from, to, filter) => {
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, to, { recursive: true, dereference: false, filter });
};

copy(path.join(ROOT, 'server.js'), path.join(OUT, 'server.js'));
copy(path.join(ROOT, 'package.json'), path.join(OUT, 'package.json'));
copy(path.join(ROOT, 'next.config.mjs'), path.join(OUT, 'next.config.mjs'));
copy(path.join(ROOT, 'public'), path.join(OUT, 'public'));
copy(path.join(ROOT, 'prisma', 'schema.prisma'), path.join(OUT, 'prisma', 'schema.prisma'));

// copy the build entry by entry (cp refuses to copy a folder into its own subfolder)
for (const name of fs.readdirSync(path.join(ROOT, '.next'))) {
  if (name === 'standalone' || name === 'cache') continue;
  copy(path.join(ROOT, '.next', name), path.join(OUT, '.next', name), (src) => !src.endsWith('.bak'));
}
fs.mkdirSync(path.join(OUT, '.next', 'cache'), { recursive: true });

const nm = path.join(ROOT, 'node_modules');
if (fs.existsSync(nm)) {
  if (process.env.GPC_STANDALONE_LINK === '1') fs.symlinkSync(nm, path.join(OUT, 'node_modules'), 'junction');
  else copy(nm, path.join(OUT, 'node_modules'));
}

if (!fs.existsSync(path.join(OUT, 'server.js'))) throw new Error('prepare-standalone: server.js missing');
console.log('standalone ready: ' + path.relative(ROOT, OUT));
