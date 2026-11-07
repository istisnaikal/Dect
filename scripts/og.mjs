#!/usr/bin/env node
// Renders the 1200×630 social cards from the real WebGL hero (`?og` lifts the GPU
// gate and renders one high-quality still), then overlays the page's title.
// Run after a build: `npm run build && npm run assets:og && npm run build`.
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import en from '../src/content/en.mjs';
import tr from '../src/content/tr.mjs';
import { plain } from '../src/templates.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'og');
process.env.PORT = process.env.OG_PORT || '4399';
await import('./serve.mjs');
await fs.mkdir(OUT, { recursive: true });

const cards = [
  { file: 'og-tr.jpg', c: tr, kicker: 'Geliştirici + Sanatçı', title: 'Web tasarım · Yazılım · SEO · AEO · GEO' },
  { file: 'og-en.jpg', c: en, kicker: 'Developer + Artist', title: 'Web design · Engineering · SEO · AEO · GEO' },
  { file: 'og-tr-guide.jpg', c: tr, kicker: 'Rehber', title: plain(tr.guide.h1) },
  { file: 'og-en-guide.jpg', c: en, kicker: 'Guide', title: plain(en.guide.h1) },
];

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
for (const card of cards) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  // Layout for the card goes in before the page's own scripts, so the shader lays out the wordmark for it.
  const css = `.hdr,.hero__eyebrow,.hero__bottom,.marquee,.dock{display:none!important}
      .hero__in{grid-template-rows:1fr!important;padding-bottom:120px!important}
      .og{position:fixed;inset:0;padding:44px 56px;display:flex;flex-direction:column;justify-content:space-between;z-index:9;font-family:Geist,sans-serif;color:#ece8df}
      .og__top{display:flex;justify-content:space-between;align-items:center;font:500 18px/1 "Geist Mono",monospace;letter-spacing:.12em;text-transform:uppercase}
      .og__top b{color:#ff5b22;font-weight:500}
      .og__title{font-size:${card.file.includes('guide') ? 46 : 40}px;line-height:1.05;letter-spacing:-.04em;font-weight:500;max-width:1000px;text-wrap:balance}
      .og__kicker{display:block;margin-bottom:12px;font:italic 400 34px/1 "Instrument Serif",serif;letter-spacing:0;color:#ff7a45}`;
  await page.addInitScript((css) => {
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = css;
      document.head.append(s);
    });
  }, css);
  await page.goto(`http://localhost:${process.env.PORT}${card.c.path}?og`, { waitUntil: 'load' });
  await page.waitForSelector('.hero.is-live', { timeout: 30_000 });
  await page.evaluate(({ kicker, title }) => {
    const el = document.createElement('div');
    el.className = 'og';
    el.innerHTML = `<div class="og__top"><span>Eyüp <b>/</b> DevArt</span><span>eyupdevart.com</span></div><div class="og__title"><span class="og__kicker"></span><span class="og__t"></span></div>`;
    el.querySelector('.og__kicker').textContent = kicker;
    el.querySelector('.og__t').textContent = title;
    document.body.append(el);
  }, card);
  await page.waitForTimeout(1600);
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, card.file));
  console.log('✓', card.file);
  await page.close();
}
await browser.close();
process.exit(0);
