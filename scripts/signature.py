#!/usr/bin/env python3
"""
The site's signature: "Dev" (Geist Mono) + "Art" (Instrument Serif Italic) as
vector outlines, so the footer can trace them like a pen signing the page.

    pip install fonttools brotli
    python3 scripts/signature.py        → src/assets/signature.json
"""
import json
import pathlib

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'src' / 'assets' / 'fonts'


def run(font_file, text, x0, scale, glyph_set_out, cmds):
    font = TTFont(FONTS / font_file)
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font['head'].unitsPerEm
    x = x0
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs, ntos=lambda v: str(round(v)))
        # font units → our units (1000/em), y flipped for SVG
        s = scale * 1000 / upem
        t = (s, 0, 0, -s, x, 0)
        gs[name].draw(TransformPen(pen, t))
        bp = BoundsPen(gs)
        gs[name].draw(TransformPen(bp, t))
        if bp.bounds:
            BOUNDS.append(bp.bounds)
        cmds.append(pen.getCommands())
        x += gs[name].width * s
    return x


cmds = []
BOUNDS = []
x = run('geist-mono.woff2', 'Dev', 0, 0.86, None, cmds)
x += 40  # the seam's breath between the two voices
x_end = run('instrument-serif-italic.woff2', 'Art', x, 1.16, None, cmds)

d = ' '.join(c for c in cmds if c)
x0 = min(b[0] for b in BOUNDS); y0 = min(b[1] for b in BOUNDS)
x1 = max(b[2] for b in BOUNDS); y1 = max(b[3] for b in BOUNDS)
pad = 24
vb = [round(x0 - pad), round(y0 - pad), round(x1 - x0 + 2 * pad), round(y1 - y0 + 2 * pad)]
out = {'viewBox': ' '.join(map(str, vb)), 'd': d}
(ROOT / 'src' / 'assets' / 'signature.json').write_text(json.dumps(out))
print('signature:', len(d), 'chars of path data, viewBox', out['viewBox'])
