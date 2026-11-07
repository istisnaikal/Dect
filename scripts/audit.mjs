#!/usr/bin/env node
// Lighthouse every page, mobile + desktop, against a production-like local server.
// `npm run build && npm run audit` (downloads lighthouse via npx on first run).
// `npm run audit -- /sozluk/ /en/`  audits only the pages given.
// Needs Chrome/Chromium: set CHROME_PATH if it isn't found automatically.
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

process.env.PORT = process.env.AUDIT_PORT || '4398';
await import('./serve.mjs');
const base = `http://localhost:${process.env.PORT}`;
const all = ['/', '/en/', '/rehber/aeo-geo/', '/en/guide/aeo-geo/', '/sozluk/', '/en/glossary/'];
const pages = process.argv.length > 2 ? process.argv.slice(2) : all;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'devart-lh-'));
const short = { performance: 'perf', accessibility: 'a11y', 'best-practices': 'bp', seo: 'seo', 'agentic-browsing': 'agent' };
let worst = 100;

for (const page of pages) {
  for (const preset of ['mobile', 'desktop']) {
    const out = path.join(tmp, 'r.json');
    const args = ['--yes', 'lighthouse@13', base + page, '--output=json', `--output-path=${out}`, '--quiet', '--chrome-flags=--headless=new --no-sandbox'];
    if (preset === 'desktop') args.push('--preset=desktop');
    // Async on purpose: the preview server lives in this process and must keep answering.
    // One retry: Lighthouse's trace recording is occasionally flaky (NO_NAVSTART, NO_FCP).
    for (let attempt = 1; ; attempt++) {
      const err = await promisify(execFile)('npx', args).then(() => null, (e) => e);
      if (!err) break;
      if (attempt === 2) {
        console.error(err.stderr || err.message);
        process.exit(1);
      }
    }
    const r = JSON.parse(fs.readFileSync(out, 'utf8'));
    const scores = Object.values(r.categories).map((c) => {
      const s = Math.round(c.score * 100);
      worst = Math.min(worst, s);
      return `${short[c.id] || c.id} ${String(s).padStart(3)}`;
    });
    const a = r.audits;
    console.log(
      `${page.padEnd(22)} ${preset.padEnd(8)} ${scores.join('  ')}   LCP ${a['largest-contentful-paint'].displayValue}  TBT ${a['total-blocking-time'].displayValue}  CLS ${a['cumulative-layout-shift'].displayValue}`,
    );
  }
}
process.exit(worst === 100 ? 0 : 1);
