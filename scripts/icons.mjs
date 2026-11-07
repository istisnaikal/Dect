#!/usr/bin/env node
// Generates favicon.svg / .ico, apple-touch-icon, PWA + maskable icons from the logo geometry.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { logoMark } from '../src/templates.mjs';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static');
const mark = logoMark('m').replaceAll('fill="currentColor"', 'fill="#ece8df"').replace('<svg class="m" viewBox="0 0 32 32" aria-hidden="true" focusable="false">', '').replace('</svg>', '');

// A dark tile with the bone mark and the ember seam. `inset` leaves room for maskable safe zones.
const tile = (inset = 0.18, radius = 0.22) => {
  const s = 32 * (1 - inset * 2);
  const o = 32 * inset;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="${32 * radius}" fill="#060608"/>
<g transform="translate(${o} ${o}) scale(${s / 32})" fill="#ece8df">${mark.replace('class="logo__seam"', 'fill="#ff5b22"')}</g>
</svg>`;
};

await fs.mkdir(OUT, { recursive: true });
const favicon = tile(0.12, 0.22);
await fs.writeFile(path.join(OUT, 'favicon.svg'), favicon);

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * (size / 32) * 1.2 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
await fs.writeFile(path.join(OUT, 'apple-touch-icon.png'), await png(tile(0.16, 0), 180));
await fs.writeFile(path.join(OUT, 'icon-192.png'), await png(tile(0.14, 0.22), 192));
await fs.writeFile(path.join(OUT, 'icon-512.png'), await png(tile(0.14, 0.22), 512));
await fs.writeFile(path.join(OUT, 'icon-maskable-512.png'), await png(tile(0.24, 0), 512));

// favicon.ico with 16/32/48 PNG frames.
const frames = await Promise.all([16, 32, 48].map((s) => png(favicon, s)));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((f, i) => {
  const size = [16, 32, 48][i];
  const e = 6 + i * 16;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(f.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += f.length;
});
await fs.writeFile(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...frames]));
console.log('icons →', OUT);
