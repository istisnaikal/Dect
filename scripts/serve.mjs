#!/usr/bin/env node
// Production-like static server for dist/: brotli/gzip, clean URLs, 404 page,
// immutable caching for hashed assets. `npm run preview` → http://localhost:4321
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
const COMPRESSIBLE = /\.(html|js|css|json|webmanifest|txt|md|xml|svg)$/;

// Apply dist/_headers (Netlify / Cloudflare Pages format) so previews enforce the real CSP.
function headerRules() {
  const file = path.join(DIST, '_headers');
  if (!fs.existsSync(file)) return [];
  const rules = [];
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) rules.push({ re: new RegExp(`^${line.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`), h: {} });
    else if (rules.length) {
      const i = line.indexOf(':');
      rules.at(-1).h[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return rules;
}

function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.includes('\0')) return null;
  let file = path.join(DIST, p);
  if (!file.startsWith(DIST)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  else if (!path.extname(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
  return fs.existsSync(file) ? file : null;
}

http
  .createServer((req, res) => {
    const pathname = (req.url || '/').split('?')[0];
    if (!pathname.endsWith('/') && !path.extname(pathname) && fs.existsSync(path.join(DIST, pathname, 'index.html'))) {
      res.writeHead(301, { Location: `${pathname}/` });
      return res.end();
    }
    let file = resolve(req.url || '/');
    let status = 200;
    if (!file) {
      file = path.join(DIST, '404.html');
      status = 404;
    }
    const ext = path.extname(file);
    const headers = {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': /\/assets\//.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      Vary: 'Accept-Encoding',
    };
    for (const r of headerRules()) if (r.re.test(pathname)) Object.assign(headers, r.h);
    if (/\/assets\//.test(file)) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    let body = fs.readFileSync(file);
    const accept = String(req.headers['accept-encoding'] || '');
    if (COMPRESSIBLE.test(file)) {
      if (accept.includes('br')) {
        body = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
        headers['Content-Encoding'] = 'br';
      } else if (accept.includes('gzip')) {
        body = zlib.gzipSync(body, { level: 9 });
        headers['Content-Encoding'] = 'gzip';
      }
    }
    headers['Content-Length'] = body.length;
    res.writeHead(status, headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  })
  .listen(PORT, () => console.log(`  ▲ DevArt preview → http://localhost:${PORT}`));
