#!/usr/bin/env node
// Captures each portfolio site (src/site.config.mjs → work[].shot) as a tall
// 1280×2400 "scroll preview" in AVIF + WebP at 640/960/1280 widths.
// Needs Playwright with Chromium: `npm i -D playwright && npx playwright install chromium`.
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { work } from '../src/site.config.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'work');
const only = process.argv.slice(2);

await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
for (const p of work.filter((w) => w.shot && (!only.length || only.includes(w.slug)))) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60_000 });
    // Walk the page so lazy images and scroll reveals fire, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < 3200; y += 300) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const png = await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: 1440, height: 2700 } });
    for (const w of [640, 960, 1280]) {
      const img = sharp(png).resize(w, Math.round((w * 2400) / 1280), { fit: 'cover', position: 'top' });
      await img.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${p.shot}-${w}.avif`));
      await img.clone().webp({ quality: 74, effort: 6 }).toFile(path.join(OUT, `${p.shot}-${w}.webp`));
    }
    console.log('✓', p.domain);
  } catch (e) {
    console.warn('✗', p.domain, e.message);
  } finally {
    await page.close();
  }
}
await browser.close();
