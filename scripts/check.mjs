#!/usr/bin/env node
// Integrity checks for dist/ — run after every build (`npm run check`).
// Guards the machine-readable layer that SEO / AEO / GEO depend on.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const ORIGIN = 'https://eyupdevart.com';
const errors = [];
const warn = [];
const fail = (f, m) => errors.push(`${f}: ${m}`);

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/index\.html$/, '');
const exists = (u) => {
  const p = decodeURIComponent(u.split('#')[0].split('?')[0]);
  const f = path.join(DIST, p);
  return fs.existsSync(f) && (fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html')));
};
const pages = new Map(html.map((f) => [urlOf(f), fs.readFileSync(f, 'utf8')]));
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="?([^"\\s>]*)"?`))?.[1];

for (const [url, src] of pages) {
  const f = url || '/';
  const ids = new Set([...src.matchAll(/\sid="?([^"\s>]+)"?/g)].map((m) => m[1]));
  const is404 = url === '/404.html';

  // Head essentials
  const title = src.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const desc = src.match(/<meta name="?description"? content="([^"]*)"/)?.[1] || '';
  if (!title) fail(f, 'missing <title>');
  if ([...title].length > 65) warn.push(`${f}: title ${[...title].length} chars (>65 may truncate)`);
  if (!desc) fail(f, 'missing meta description');
  if ([...desc].length > 165) warn.push(`${f}: description ${[...desc].length} chars (>165 may truncate)`);
  if (!is404 && !src.includes('rel="canonical"') && !src.includes('rel=canonical')) fail(f, 'missing canonical');
  // Identity: canonical, og:url and hreflang alternates name this origin only, never a fragment.
  for (const m of src.matchAll(/<link\b[^>]*\srel="?(?:canonical|alternate)"?[^>]*>|<meta\b[^>]*\sproperty="?og:url"?[^>]*>/g)) {
    const u = attr(m[0], 'href') ?? attr(m[0], 'content');
    if (u && /^https?:/.test(u) && (!u.startsWith(`${ORIGIN}/`) || u.includes('#'))) fail(f, `identity URL outside ${ORIGIN}: ${u}`);
  }
  const h1s = (src.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(f, `expected exactly one <h1>, found ${h1s}`);

  // Heading levels never skip (h2 → h4)
  let prev = 1;
  for (const m of src.matchAll(/<h([1-6])[\s>]/g)) {
    const lvl = +m[1];
    if (lvl > prev + 1) fail(f, `heading jumps h${prev} → h${lvl}`);
    prev = lvl;
  }

  // Images carry alt + dimensions
  for (const m of src.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(m[0])) fail(f, `img without alt: ${m[0].slice(0, 80)}`);
    if (!/\swidth=/.test(m[0]) || !/\sheight=/.test(m[0])) fail(f, `img without width/height (CLS): ${m[0].slice(0, 80)}`);
  }

  // Internal links + fragments resolve
  for (const m of src.matchAll(/\shref="?([^"\s>]+)"?/g)) {
    const h = m[1];
    if (h.startsWith('#')) {
      if (h.length > 1 && !ids.has(h.slice(1))) fail(f, `broken fragment ${h}`);
    } else if (h.startsWith('/')) {
      if (!exists(h)) fail(f, `broken link ${h}`);
      const [p, frag] = h.split('#');
      if (frag) {
        const target = pages.get(p);
        if (target && !new RegExp(`\\sid="?${frag}"?[\\s>]`).test(target)) fail(f, `broken cross-page fragment ${h}`);
      }
    } else if (h.startsWith(ORIGIN)) {
      if (!exists(h.slice(ORIGIN.length) || '/')) fail(f, `broken absolute link ${h}`);
    }
  }
  for (const m of src.matchAll(/\ssrcset="([^"]+)"/g))
    for (const part of m[1].split(','))
      if (!exists(part.trim().split(/\s+/)[0])) fail(f, `missing srcset image ${part.trim()}`);

  // JSON-LD: parses, and every {"@id"} reference resolves inside the graph
  for (const m of src.matchAll(/<script type="?application\/ld\+json"?>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      fail(f, `JSON-LD does not parse: ${e.message}`);
      continue;
    }
    const defined = new Set();
    const refs = [];
    const visit = (o) => {
      if (Array.isArray(o)) return o.forEach(visit);
      if (o && typeof o === 'object') {
        const keys = Object.keys(o);
        if (o['@id'] && keys.length === 1) refs.push(o['@id']);
        else if (o['@id']) defined.add(o['@id']);
        keys.forEach((k) => k !== '@id' && visit(o[k]));
      }
    };
    visit(data);
    for (const r of refs) if (!defined.has(r)) fail(f, `JSON-LD @id reference not defined in graph: ${r}`);
    const types = (data['@graph'] || []).map((n) => [].concat(n['@type']).join('+'));
    if (!is404 && !types.includes('Person')) fail(f, 'JSON-LD graph lacks Person');
  }

  // Speakable selectors point at something real (an AI reading the page aloud gets text, not nothing)
  for (const m of src.matchAll(/"cssSelector":\[([^\]]*)\]/g))
    for (const sel of JSON.parse(`[${m[1]}]`)) {
      const ok = sel.startsWith('#') ? ids.has(sel.slice(1)) : sel.startsWith('.') ? src.includes(sel.slice(1)) : new RegExp(`<${sel}[\\s>]`).test(src);
      if (!ok) fail(f, `speakable selector ${sel} matches nothing`);
    }

  // The social card each page promises exists
  const og = src.match(/<meta property="?og:image"? content="([^"]+)"/)?.[1];
  if (og && !exists(og.replace(ORIGIN, ''))) fail(f, `og:image missing: ${og}`);

  // No template placeholder survives the build
  const left = src.match(/\{(?:wa|tel|phone|guide|glossary|services|jsKB|svc:[\w-]+)\}/);
  if (left) fail(f, `unfilled placeholder ${left[0]}`);

  // hreflang: every alternate exists and links back (reciprocity)
  for (const m of src.matchAll(/<link rel="?alternate"? hreflang="?([\w-]+)"? href="?([^"\s>]+)"?/g)) {
    const [, lang, href] = m;
    const target = pages.get(href.replace(ORIGIN, ''));
    if (!target) fail(f, `hreflang ${lang} → missing page ${href}`);
    else if (!target.includes(`href="${ORIGIN}${url}"`) && !target.includes(`href=${ORIGIN}${url}`))
      fail(f, `hreflang ${lang} → ${href} does not link back`);
  }
}

// Every title and description is unique (duplicates make pages compete with each other)
const seen = { title: new Map(), description: new Map() };
for (const [url, src] of pages) {
  if (url === '/404.html') continue;
  const vals = { title: src.match(/<title>(.*?)<\/title>/)?.[1], description: src.match(/<meta name="?description"? content="([^"]*)"/)?.[1] };
  for (const k of ['title', 'description']) {
    if (seen[k].has(vals[k])) fail(url, `duplicate ${k} (same as ${seen[k].get(vals[k])})`);
    else seen[k].set(vals[k], url);
  }
}

// Crawl architecture: every page in the sitemap, every sitemap URL a page, nothing deeper than 2 clicks from /
const sitemapUrls = [...fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ''));
const pageUrls = [...pages.keys()].filter((u) => u !== '/404.html');
for (const u of pageUrls) if (!sitemapUrls.includes(u)) fail(u, 'page missing from sitemap.xml');
const depth = new Map([['/', 0]]);
for (let queue = ['/']; queue.length; ) {
  const u = queue.shift();
  for (const m of (pages.get(u) || '').matchAll(/\shref="?(\/[^"\s>#?]*)/g)) {
    const t = m[1];
    if (pages.has(t) && !depth.has(t)) depth.set(t, depth.get(u) + 1), queue.push(t);
  }
}
for (const u of sitemapUrls) {
  if (!depth.has(u)) fail(u, 'unreachable from the home page (orphan)');
  else if (depth.get(u) > 2) fail(u, `${depth.get(u)} clicks from the home page (max 2)`);
}
const deepest = Math.max(...sitemapUrls.map((u) => depth.get(u) ?? 99));

// Markdown twins: every page that announces one has one, with no placeholder left in it
for (const [url, src] of pages) {
  const md = src.match(/<link rel="?alternate"? type="?text\/markdown"? href="([^"]+)"/)?.[1];
  if (!md) continue;
  const file = path.join(DIST, md.replace(ORIGIN, ''));
  if (!fs.existsSync(file)) fail(url, `Markdown twin missing: ${md}`);
  else if (/\{(?:wa|tel|phone|guide|glossary|services|jsKB|svc:[\w-]+)\}/.test(fs.readFileSync(file, 'utf8'))) fail(md, 'unfilled placeholder');
}

// Machine-readable files
for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', 'manifest.webmanifest', 'humans.txt', 'favicon.ico', 'favicon.svg', '_headers', '.htaccess'])
  if (!fs.existsSync(path.join(DIST, f))) fail(f, 'missing');
const sec = fs.existsSync(path.join(DIST, '.well-known/security.txt')) ? fs.readFileSync(path.join(DIST, '.well-known/security.txt'), 'utf8') : '';
if (!/^Contact: /m.test(sec)) fail('.well-known/security.txt', 'missing or has no Contact');
const exp = sec.match(/^Expires: (.+)$/m)?.[1];
if (!exp || !(new Date(exp) > new Date())) fail('.well-known/security.txt', `Expires missing or in the past (${exp})`);
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) if (!exists(m[1].replace(ORIGIN, '') || '/')) fail('sitemap.xml', `dead URL ${m[1]}`);
// Identity: every URL the sitemap names (pages, hreflang alternates, images) is on this origin,
// with no fragment and no query, and robots.txt points only at this origin's sitemap.
for (const m of sitemap.matchAll(/(?:<loc>|<image:loc>|\shref=")([^<"]+)/g))
  if (!m[1].startsWith(`${ORIGIN}/`) || /[#?]/.test(m[1])) fail('sitemap.xml', `URL outside ${ORIGIN} or with a fragment/query: ${m[1]}`);
for (const m of fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8').matchAll(/^Sitemap:\s*(\S+)/gim))
  if (m[1] !== `${ORIGIN}/sitemap.xml`) fail('robots.txt', `Sitemap line outside this origin: ${m[1]}`);
const llms = fs.readFileSync(path.join(DIST, 'llms.txt'), 'utf8');
for (const m of llms.matchAll(/\]\((https:\/\/eyupdevart\.com[^)]*)\)/g)) if (!exists(m[1].replace(ORIGIN, '') || '/')) fail('llms.txt', `dead link ${m[1]}`);
if (!/Sitemap: https:\/\/eyupdevart\.com\/sitemap\.xml/.test(fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8'))) fail('robots.txt', 'no Sitemap line');
const manifest = JSON.parse(fs.readFileSync(path.join(DIST, 'manifest.webmanifest'), 'utf8'));
for (const i of manifest.icons) if (!exists(i.src)) fail('manifest', `missing icon ${i.src}`);

warn.forEach((w) => console.log(`  ⚠ ${w}`));
if (errors.length) {
  errors.forEach((e) => console.log(`  ✗ ${e}`));
  console.log(`\n  ${errors.length} problem(s) across ${pages.size} pages.\n`);
  process.exit(1);
}
console.log(
  `  ✓ ${pages.size} pages · links, fragments, JSON-LD @id graph, speakable, hreflang, unique titles, sitemap ⇄ pages (one origin, no fragments), crawl depth ≤ ${deepest}, OG cards, Markdown twins, llms.txt, security.txt — all good.`,
);
