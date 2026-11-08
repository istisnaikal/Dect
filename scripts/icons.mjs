#!/usr/bin/env node
// Generates favicon.svg / .ico, apple-touch-icon, PWA + maskable icons from the emblem geometry.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { logoMark } from '../src/templates.mjs';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static');

// An ink tile, the emblem in paper, the needle in ember. Small sizes get the solid stem (cells
// would blur below ~48px); the large ones get the cell stem and the needle's eye.
// `inset` leaves room for maskable safe zones.
const tile = (size, inset = 0.16, radius = 0.22) => {
  const box = 32 * (1 - inset * 2);
  const o = 32 * inset;
  // The emblem's own (tight) viewBox in a square box: a nested <svg> centres it exactly.
  const mark = logoMark('m', '', { size, ink: '#f6f4ef', seam: '#ff5b22' })
    .replace(/^<svg class="m" /, `<svg x="${o}" y="${o}" width="${box}" height="${box}" `)
    .replace(' aria-hidden="true" focusable="false"', '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="${32 * radius}" fill="#141317"/>
${mark}
</svg>`;
};

await fs.mkdir(OUT, { recursive: true });
const favicon = tile('small', 0.1, 0.22);
await fs.writeFile(path.join(OUT, 'favicon.svg'), favicon);

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * (size / 32) * 1.2 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
await fs.writeFile(path.join(OUT, 'apple-touch-icon.png'), await png(tile('large', 0.12, 0), 180));
await fs.writeFile(path.join(OUT, 'icon-192.png'), await png(tile('large', 0.12, 0.22), 192));
await fs.writeFile(path.join(OUT, 'icon-512.png'), await png(tile('large', 0.12, 0.22), 512));
await fs.writeFile(path.join(OUT, 'icon-maskable-512.png'), await png(tile('large', 0.24, 0), 512));

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
