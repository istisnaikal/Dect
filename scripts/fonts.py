#!/usr/bin/env python3
"""
Font pipeline for eyupdevart.com
--------------------------------
Subsets the three brand typefaces down to exactly what Turkish + English copy
needs, trims the variable axis to the weights we actually use, and computes
metric-matched fallback faces (size-adjust / ascent-override / ...) so the swap
from system font to web font causes zero layout shift (CLS = 0).

Usage:
    pip install fonttools brotli
    python3 scripts/fonts.py <dir-with-source-ttfs>

Expected source files (any sub-folder of <dir>):
    Geist-Variable.ttf, GeistMono-Variable.ttf     (npm: geist)
    InstrumentSerif_400Regular_Italic.ttf          (npm: @expo-google-fonts/instrument-serif)

Writes:
    src/assets/fonts/*.woff2
    src/assets/fonts/metrics.json   (consumed by scripts/build.mjs)
"""
import json
import pathlib
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "fonts"

# Basic Latin, Latin-1, Turkish (Ğğ İı Şş), typographic punctuation, arrows, maths.
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [0x11E, 0x11F, 0x130, 0x131, 0x15E, 0x15F, 0x152, 0x153, 0x178]
    + list(range(0x2010, 0x2028))
    + list(range(0x2030, 0x203B))
    + [0x2044, 0x20AC, 0x20BA, 0x2116, 0x2122, 0x2190, 0x2191, 0x2192, 0x2193,
       0x2196, 0x2197, 0x2198, 0x2199, 0x2212, 0x2215, 0x2248, 0x2260, 0x2264, 0x2265,
       0x25CF, 0x25CB, 0x2713, 0x2715]
)

FEATURES = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "tnum", "case", "ss01", "zero"]

# Letter frequencies (English, a-z + space) — same approach capsize uses to derive
# an "average character width" that predicts real line lengths.
FREQ = {
    " ": 0.1874, "e": 0.0960, "t": 0.0702, "a": 0.0621, "o": 0.0584, "i": 0.0522,
    "n": 0.0521, "h": 0.0487, "s": 0.0477, "r": 0.0443, "d": 0.0352, "l": 0.0320,
    "u": 0.0225, "m": 0.0194, "c": 0.0188, "w": 0.0182, "g": 0.0166, "f": 0.0162,
    "y": 0.0156, "p": 0.0131, "b": 0.0119, "k": 0.0074, "v": 0.0071, "j": 0.0018,
    "x": 0.0012, "q": 0.0008, "z": 0.0008,
}

FALLBACKS = {
    "sans": ("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf", ["Arial", "Helvetica Neue", "Helvetica"]),
    "serif": ("/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf", ["Times New Roman Italic", "TimesNewRomanPS-ItalicMT", "Times New Roman", "Georgia"]),
    "mono": ("/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf", ["Courier New", "Menlo", "Consolas"]),
}

FONTS = [
    # family, source, output, kind, axis limits
    ("Geist", "Geist-Variable.ttf", "geist.woff2", "sans", {"wght": (300, 700)}),
    ("Geist Mono", "GeistMono-Variable.ttf", "geist-mono.woff2", "mono", {"wght": (400, 600)}),
    ("Instrument Serif", "InstrumentSerif_400Regular_Italic.ttf", "instrument-serif-italic.woff2", "serif", None),
]


def avg_width(font: TTFont) -> float:
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    upem = font["head"].unitsPerEm
    total = 0.0
    for ch, f in FREQ.items():
        gid = cmap.get(ord(ch))
        if gid is None:
            continue
        total += hmtx[gid][0] / upem * f
    return total / sum(FREQ.values())


def vmetrics(font: TTFont):
    upem = font["head"].unitsPerEm
    os2 = font["OS/2"]
    if os2.fsSelection & (1 << 7):
        return os2.sTypoAscender / upem, abs(os2.sTypoDescender) / upem, os2.sTypoLineGap / upem
    hhea = font["hhea"]
    return hhea.ascent / upem, abs(hhea.descent) / upem, hhea.lineGap / upem


def find(src: pathlib.Path, name: str) -> pathlib.Path:
    hits = list(src.rglob(name))
    if not hits:
        sys.exit(f"missing source font: {name}")
    return hits[0]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = pathlib.Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    metrics = {}
    for family, source, out, kind, limits in FONTS:
        font = TTFont(find(src, source), lazy=False)
        opts = subset.Options()
        opts.drop_tables += ["meta", "DSIG"]
        opts.layout_features = FEATURES
        opts.name_IDs = [0, 1, 2, 3, 4, 5, 6]
        opts.notdef_outline = True
        opts.hinting = False
        opts.desubroutinize = True
        sub = subset.Subsetter(options=opts)
        sub.populate(unicodes=UNICODES)
        sub.subset(font)
        if limits:
            font = instancer.instantiateVariableFont(font, limits)
        path = OUT / out
        font.flavor = "woff2"
        font.save(path)

        asc, desc, gap = vmetrics(font)
        fb_path, fb_local = FALLBACKS[kind]
        fb = TTFont(fb_path)
        size_adjust = avg_width(font) / avg_width(fb)
        metrics[out] = {
            "family": family,
            "kind": kind,
            "file": out,
            "bytes": path.stat().st_size,
            "weight": f"{limits['wght'][0]} {limits['wght'][1]}" if limits else "400",
            "style": "italic" if kind == "serif" else "normal",
            "fallback": {
                "local": fb_local,
                "sizeAdjust": round(size_adjust * 100, 3),
                "ascentOverride": round(asc / size_adjust * 100, 3),
                "descentOverride": round(desc / size_adjust * 100, 3),
                "lineGapOverride": round(gap / size_adjust * 100, 3),
            },
        }
        print(f"{out:34} {path.stat().st_size / 1024:6.1f} KB  size-adjust {size_adjust * 100:.2f}%")
    (OUT / "metrics.json").write_text(json.dumps(metrics, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
