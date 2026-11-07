#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
//  eyupdevart.com build — src/ → dist/
//  · hashes & copies fonts, bundles JS (esbuild, code-split), inlines CSS
//  · renders TR + EN pages, guide, 404 from content files
//  · emits the machine-readable layer: JSON-LD, sitemap (hreflang), robots,
//    llms.txt / llms-full.txt, Markdown twins, manifest, CSP-hashed headers
//  Usage: node scripts/build.mjs [--watch]
// ─────────────────────────────────────────────────────────────────────────────

import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fss from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

import { build as esbuild, transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
import QRCode from 'qrcode';

import tr from '../src/content/tr.mjs';
import en from '../src/content/en.mjs';
import { guideMd, homeMd, llmsTxt } from '../src/markdown.mjs';
import { guideGraph, homeGraph } from '../src/schema.mjs';
import { site, wa } from '../src/site.config.mjs';
import { esc, guideBody, homeBody, notFoundBody, plain } from '../src/templates.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const O = site.origin;

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
const sha256 = (s) => `'sha256-${crypto.createHash('sha256').update(s, 'utf8').digest('base64')}'`;
const write = async (rel, data) => {
  const file = path.join(DIST, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
};
const exists = (p) => fss.existsSync(p);
const copyDir = async (from, to) => exists(from) && fs.cp(from, path.join(DIST, to), { recursive: true });

async function build() {
  const t0 = performance.now();
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  // ── Fonts: content-hashed, immutable, with metric-matched fallbacks ───────
  const metrics = JSON.parse(await fs.readFile(path.join(SRC, 'assets/fonts/metrics.json'), 'utf8'));
  const fontUrls = {};
  let fontCss = '';
  for (const m of Object.values(metrics)) {
    const buf = await fs.readFile(path.join(SRC, 'assets/fonts', m.file));
    const name = m.file.replace('.woff2', `.${hash(buf)}.woff2`);
    await write(`assets/fonts/${name}`, buf);
    fontUrls[m.file] = `/assets/fonts/${name}`;
    const fb = m.fallback;
    fontCss += `@font-face{font-family:"${m.family}";src:url(${fontUrls[m.file]}) format("woff2");font-weight:${m.weight};font-style:${m.style};font-display:swap}`;
    fontCss += `@font-face{font-family:"${m.family} Fallback";src:${fb.local.map((l) => `local("${l}")`).join(',')};font-style:${m.style};size-adjust:${fb.sizeAdjust}%;ascent-override:${fb.ascentOverride}%;descent-override:${fb.descentOverride}%;line-gap-override:${fb.lineGapOverride}%}`;
  }
  await fs.cp(path.join(SRC, 'assets/fonts'), path.join(DIST, 'assets/fonts'), {
    recursive: true,
    filter: (f) => !f.endsWith('.woff2') && !f.endsWith('.json'),
  });

  // ── JavaScript: one tiny entry, the WebGL hero split into a lazy chunk ────
  const js = await esbuild({
    entryPoints: [path.join(SRC, 'js/app.js')],
    bundle: true,
    splitting: true,
    format: 'esm',
    minify: true,
    target: 'es2022',
    outdir: path.join(DIST, 'assets'),
    entryNames: '[name].[hash]',
    chunkNames: '[name].[hash]',
    metafile: true,
    legalComments: 'none',
    logLevel: 'warning',
  });
  const appOut = Object.entries(js.metafile.outputs).find(([, o]) => o.entryPoint?.endsWith('app.js'))[0];
  const appUrl = `/${path.relative(DIST, path.resolve(ROOT, appOut)).split(path.sep).join('/')}`;

  // ── CSS: font faces + design system, minified and inlined ─────────────────
  const rawCss = fontCss + (await fs.readFile(path.join(SRC, 'styles/main.css'), 'utf8'));
  const css = (await transform(rawCss, { loader: 'css', minify: true, logLevel: 'error' })).code.trim();

  // ── Static assets ─────────────────────────────────────────────────────────
  await copyDir(path.join(SRC, 'static'), '.');
  await copyDir(path.join(SRC, 'assets/work'), 'assets/work');
  await copyDir(path.join(SRC, 'assets/og'), 'og');

  // ── QR (desktop → phone hand-off) ─────────────────────────────────────────
  const qrSvg = (await QRCode.toString(wa(), {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#060608', light: '#0000' },
  }))
    .replace(/<\?xml[^>]*>/, '')
    .replace('<svg', '<svg role="img" aria-label="WhatsApp QR"')
    .trim();

  // ── Pages ─────────────────────────────────────────────────────────────────
  const pages = [];
  const words = {};
  for (const c0 of [tr, en]) {
    const other = c0 === tr ? en : tr;
    const dateLabel = new Intl.DateTimeFormat(c0.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(`${site.updated}T12:00:00Z`),
    );
    const guideText = [c0.guide.tldr, ...c0.guide.sections.map((s) => plain(s.html)), ...c0.guide.faq.map((f) => `${f.q} ${f.a}`)].join(' ');
    words[c0.lang] = guideText.split(/\s+/).length;
    const readMinutes = Math.max(1, Math.round(words[c0.lang] / 200));

    const home = { ...c0, altPath: other.path };
    pages.push({
      file: `${c0.path}index.html`,
      url: O + c0.path,
      lang: c0,
      alt: { [c0.lang]: O + c0.path, [other.lang]: O + other.path, 'x-default': O + tr.path },
      title: c0.meta.title,
      description: c0.meta.description,
      ogType: 'website',
      ogImage: `${O}/og/og-${c0.lang}.jpg`,
      ogAlt: c0.meta.ogAlt,
      jsonld: homeGraph(home, O + c0.path),
      body: homeBody(home, { qr: qrSvg }),
      bodyClass: 'is-home',
      md: homeMd(home),
      priority: c0 === tr ? '1.0' : '0.9',
    });
    const guide = { ...c0, altPath: other.guidePath };
    pages.push({
      file: `${c0.guidePath}index.html`,
      url: O + c0.guidePath,
      lang: c0,
      alt: { [c0.lang]: O + c0.guidePath, [other.lang]: O + other.guidePath, 'x-default': O + tr.guidePath },
      title: c0.guide.meta.title,
      description: c0.guide.meta.description,
      ogType: 'article',
      ogImage: `${O}/og/og-${c0.lang}-guide.jpg`,
      ogAlt: c0.guide.meta.ogAlt,
      jsonld: guideGraph(guide, O + c0.guidePath, { words: words[c0.lang], homeUrl: O + c0.path }),
      body: guideBody(guide, { readMinutes, dateLabel }),
      bodyClass: 'is-guide',
      md: guideMd(guide, dateLabel),
      priority: '0.8',
    });
  }

  const speculation = JSON.stringify({
    prerender: [
      {
        where: {
          and: [
            { href_matches: '/*' },
            { not: { href_matches: ['/*.txt', '/*.xml', '/*.md', '/*.webmanifest'] } },
            { not: { selector_matches: '[target=_blank], [data-wa]' } },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  });

  const preloads = ['geist.woff2', 'geist-mono.woff2', 'instrument-serif-italic.woff2']
    .map((f) => `<link rel="preload" href="${fontUrls[f]}" as="font" type="font/woff2" crossorigin>`)
    .join('');

  const head = (p) => {
    const c = p.lang;
    const alternates = Object.entries(p.alt)
      .map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}">`)
      .join('');
    const article =
      p.ogType === 'article'
        ? `<meta property="article:published_time" content="${site.published}"><meta property="article:modified_time" content="${site.updated}"><meta property="article:author" content="${O}/">`
        : '';
    return `<!doctype html>
<html lang="${c.htmlLang}" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
${preloads}
<style>${css}</style>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${p.url}">
${alternates}
<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<meta name="author" content="${esc(site.name)}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
${p.md ? `<link rel="alternate" type="text/markdown" href="${p.url}index.html.md" title="Markdown">` : ''}
<link rel="author" href="/humans.txt">
<meta property="og:type" content="${p.ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${c.locale}">
<meta property="og:locale:alternate" content="${c === tr ? en.locale : tr.locale}">
<meta property="og:url" content="${p.url}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${p.ogImage}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.ogAlt)}">
${article}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${p.ogImage}">
<meta name="twitter:image:alt" content="${esc(p.ogAlt)}">
${p.jsonld ? `<script type="application/ld+json">${JSON.stringify(p.jsonld).replace(/</g, '\\u003c')}</script>` : ''}
<script type="speculationrules">${speculation}</script>
<script type="module" src="${appUrl}"></script>
</head>`;
  };

  const htmlFor = (p) => `${head(p)}
<body class="${p.bodyClass}">
<a class="skip" href="#main">${p.lang.ui.skip}</a>
${p.body}
</body>
</html>`;

  const notFound = {
    file: '404.html',
    url: `${O}/404.html`,
    lang: { ...tr },
    alt: {},
    title: tr.notFound.title,
    description: tr.notFound.text,
    ogType: 'website',
    ogImage: `${O}/og/og-tr.jpg`,
    ogAlt: tr.meta.ogAlt,
    noindex: true,
    body: notFoundBody(tr, en),
    bodyClass: 'is-404',
  };

  const hashes = { style: new Set(), script: new Set() };
  const report = [];
  for (const p of [...pages, notFound]) {
    const html = await minify(htmlFor(p), {
      collapseWhitespace: true,
      removeComments: true,
      collapseBooleanAttributes: true,
      decodeEntities: false,
      minifyCSS: false,
      minifyJS: false,
      keepClosingSlash: false,
    });
    for (const m of html.matchAll(/<style>([\s\S]*?)<\/style>/g)) hashes.style.add(sha256(m[1]));
    for (const m of html.matchAll(/<script type="?speculationrules"?>([\s\S]*?)<\/script>/g)) hashes.script.add(sha256(m[1]));
    await write(p.file, html);
    if (p.md) await write(`${p.file}.md`, p.md);
    report.push(p.file);
  }

  // ── Machine-readable layer ────────────────────────────────────────────────
  await write('llms.txt', llmsTxt(tr, en, words));
  await write(
    'llms-full.txt',
    [`# ${site.name} — full content`, '', `> ${en.short.a}`, '', `Source: ${O}/llms.txt`, '', ...pages.map((p) => `\n---\n\n${p.md}`)].join('\n'),
  );

  const aiBots = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-SearchBot',
    'Claude-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'MistralAI-User',
    'meta-externalagent', 'Amazonbot', 'CCBot', 'cohere-ai', 'YouBot',
  ];
  await write(
    'robots.txt',
    `# ${site.origin} — humans, search engines and AI answer engines are all welcome.
# Content summary for LLMs: ${O}/llms.txt

User-agent: *
Allow: /

# AI & answer engines — explicitly invited (GEO)
${aiBots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${O}/sitemap.xml
`,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${site.updated}</lastmod>
    <priority>${p.priority}</priority>
${Object.entries(p.alt)
  .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`)
  .join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  await write('sitemap.xml', sitemap);

  await write(
    'manifest.webmanifest',
    JSON.stringify(
      {
        name: site.name,
        short_name: 'DevArt',
        description: tr.meta.description,
        lang: 'tr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: site.themeColor,
        theme_color: site.themeColor,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [{ name: tr.ui.whatsapp, url: wa(tr.wa.default) }],
      },
      null,
      2,
    ),
  );

  await write(
    'humans.txt',
    `/* TEAM */
Developer + Artist: Eyüp — DevArt
Contact: WhatsApp ${site.phone.intl}
Site: ${O}
From: Türkiye

/* SITE */
Last update: ${site.updated.replaceAll('-', '/')}
Language: Türkçe / English
Standards: HTML, CSS, JavaScript (ES2022), WebGL2, Schema.org
Components: none — zero frameworks, zero ad trackers, zero cookies
Fonts: Geist, Geist Mono (Vercel, OFL) · Instrument Serif (OFL)
`,
  );

  // ── Security & caching headers (Netlify / Cloudflare Pages + Apache) ──────
  const edge = site.edge || {};
  const insights = edge.cloudflareWebAnalytics ? ' https://static.cloudflareinsights.com' : '';
  const csp = [
    "default-src 'self'",
    // Hashes and 'unsafe-inline' can't coexist (browsers ignore the latter when a hash is present),
    // so zone-injected bot detection means dropping to 'unsafe-inline'. See site.config.mjs → edge.
    edge.cloudflareJsDetections ? `script-src 'self' 'unsafe-inline'${insights}` : `script-src 'self' ${[...hashes.script].join(' ')}${insights}`,
    `style-src 'self' ${[...hashes.style].join(' ')}`,
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${edge.cloudflareWebAnalytics ? ' https://cloudflareinsights.com' : ''}`,
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
  const security = {
    'Content-Security-Policy': csp,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
  };
  await write(
    '_headers',
    `/*
${Object.entries(security).map(([k, v]) => `  ${k}: ${v}`).join('\n')}

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=604800

/*.md
  Content-Type: text/markdown; charset=utf-8

/llms*.txt
  Content-Type: text/plain; charset=utf-8
`,
  );
  await write(
    '.htaccess',
    `# eyupdevart.com — Apache config (generated by scripts/build.mjs)
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Force HTTPS + apex domain
  RewriteCond %{HTTPS} !=on [OR]
  RewriteCond %{HTTP_HOST} ^www\\. [NC]
  RewriteRule ^ https://${new URL(O).host}%{REQUEST_URI} [L,R=301]
</IfModule>

AddType text/markdown .md
AddType application/manifest+json .webmanifest
AddType image/avif .avif
AddType font/woff2 .woff2
AddDefaultCharset utf-8
AddCharset utf-8 .txt .md .xml .webmanifest

<IfModule mod_headers.c>
${Object.entries(security).map(([k, v]) => `  Header always set ${k} "${v}"`).join('\n')}
  <FilesMatch "\\.(woff2|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(avif|webp|png|jpg|svg|ico)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>
  <FilesMatch "\\.(html|md|txt|xml)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/html text/css text/plain text/markdown text/xml application/javascript application/json application/manifest+json image/svg+xml
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/markdown text/xml application/javascript application/json application/manifest+json image/svg+xml
</IfModule>
`,
  );

  // Permanent (301) redirects for slashless URLs — the edge's default is a temporary 307.
  await write(
    '_redirects',
    [...pages.map((p) => p.url.slice(O.length)).filter((u) => u !== '/').map((u) => `${u.slice(0, -1)} ${u} 301`), '/index.html / 301']
      .join('\n') + '\n',
  );

  // Apache-only config must not be served as a public file from the Cloudflare edge.
  await write('.assetsignore', '.htaccess\n');

  // ── Report ────────────────────────────────────────────────────────────────
  const size = (buf) => ({
    raw: buf.length,
    br: zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
  });
  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  const lines = [];
  let critical = 0;
  for (const f of report) {
    const s = size(await fs.readFile(path.join(DIST, f)));
    if (f === '/index.html') critical += s.br;
    lines.push(`  ${f.padEnd(34)} ${kb(s.raw).padStart(9)}  →  ${kb(s.br).padStart(8)} br`);
  }
  for (const out of Object.keys(js.metafile.outputs)) {
    const s = size(await fs.readFile(path.resolve(ROOT, out)));
    const rel = path.relative(DIST, path.resolve(ROOT, out));
    if (rel.startsWith('assets/app.')) critical += s.br;
    lines.push(`  ${rel.padEnd(34)} ${kb(s.raw).padStart(9)}  →  ${kb(s.br).padStart(8)} br`);
  }
  const fontBytes = Object.values(metrics).reduce((a, m) => a + m.bytes, 0);
  console.log(`\n  DevArt build · ${Math.round(performance.now() - t0)} ms\n${lines.join('\n')}`);
  console.log(`  fonts (3 families, woff2)            ${kb(fontBytes).padStart(9)}`);
  console.log(`\n  Home critical path: ${kb(critical + fontBytes)} (HTML+CSS+JS brotli + fonts)\n`);
}

// ── Watch mode: rebuild in a fresh process on change, and serve dist/ ──────
if (process.argv.includes('--watch')) {
  let timer = null;
  let running = false;
  const rebuild = () => {
    if (running) return;
    running = true;
    const child = spawn(process.execPath, [fileURLToPath(import.meta.url)], { stdio: 'inherit' });
    child.on('exit', () => (running = false));
  };
  rebuild();
  fss.watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 120);
  });
  await import('./serve.mjs');
} else {
  await build();
}
