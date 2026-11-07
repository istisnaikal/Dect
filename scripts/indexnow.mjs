#!/usr/bin/env node
// Tell IndexNow engines (Bing → Copilot and others, Yandex, Seznam, Naver…) that
// every URL in the sitemap is fresh. Runs after `wrangler deploy` in `npm run deploy`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site.config.mjs';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const urls = [...fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const host = new URL(site.origin).host;
// A courtesy ping: the deploy has already succeeded, so a failure here only warns.
try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: site.indexNowKey, keyLocation: `${site.origin}/${site.indexNowKey}.txt`, urlList: urls }),
  });
  console.log(`  ${res.ok ? '✓' : '⚠'} IndexNow → ${res.status} ${res.statusText} · ${urls.length} URLs`);
} catch (e) {
  console.log(`  ⚠ IndexNow unreachable (${e.message}); search engines will still find the sitemap.`);
}
