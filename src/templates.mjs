// HTML templates. Plain template literals: zero runtime, zero framework.
// Everything a crawler or an AI agent needs is in the HTML; JavaScript only adds.

import { site, work, wa } from './site.config.mjs';
import { en as glossEn, terms as glossTerms, tr as glossTr } from './content/glossary.mjs';
import { services, en as svcEn, tr as svcTr } from './content/services.mjs';
import signature from './assets/signature.json' with { type: 'json' };
// One path per contour, so each stroke can be drawn in turn (a compound path restarts its dash pattern per contour).
const strokes = signature.d.split(/(?=M)/).map((d) => `<path pathLength="1" d="${d.trim()}"/>`).join('');

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** *word* → artist type · `word` → developer type */
export const rich = (s) =>
  s
    .replace(/\*([^*]+)\*/g, '<span class="art">$1</span>')
    .replace(/`([^`]+)`/g, '<span class="dev">$1</span>');

/** Strip markup → plain text (for meta, JSON-LD, llms.txt). */
export const plain = (s) =>
  String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/[*`]/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const phoneFor = (c) => (c.lang === 'tr' ? site.phone.display : site.phone.intl);

// ── Services: one source for every path, label and cross-link ────────────────
export const svcContent = (lang) => (lang === 'tr' ? svcTr : svcEn);
export const svcPath = (lang, id) => {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`unknown service "${id}"`);
  return `${svcContent(lang).path}${s.slug[lang]}/`;
};
const glossFor = (lang) => (lang === 'tr' ? glossTr : glossEn);
export const termName = (lang, id) => {
  const t = glossTerms.find((x) => x.id === id);
  if (!t) throw new Error(`unknown glossary term "${id}"`);
  return glossFor(lang).terms[id].name || t.name;
};

export const fill = (s, c) =>
  s
    .replaceAll('{wa}', esc(wa(c.wa.default)))
    .replaceAll('{tel}', `tel:${site.phone.e164}`)
    .replaceAll('{phone}', phoneFor(c))
    .replaceAll('{guide}', c.guidePath)
    .replaceAll('{glossary}', c.glossaryPath)
    .replaceAll('{services}', c.servicesPath)
    .replace(/\{svc:([\w-]+)\}/g, (_, id) => svcPath(c.lang, id));

const pad = (n) => String(n).padStart(2, '0');

/** "a · b · c" → each item unbreakable, and a separator can never start a line. Plain text stays fluid. */
const listy = (v) => {
  const parts = v.split(' · ');
  return parts.length > 1 ? parts.map((x) => `<span class="nw">${x}</span>`).join('&nbsp;· ') : v;
};

// ── Icons (inline SVG, currentColor) ──────────────────────────────────────────
export const icon = {
  wa: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 2.75a9.25 9.25 0 0 0-8 13.9L2.75 21.25l4.75-1.25A9.25 9.25 0 1 0 12 2.75Z"/><path fill="currentColor" d="M8.7 7.3c.2-.35.5-.4.8-.4h.55c.22 0 .43.1.52.35l.8 1.9c.1.24.05.5-.12.7l-.62.72a.45.45 0 0 0-.05.53 7.4 7.4 0 0 0 2.92 2.92c.18.1.39.08.53-.05l.72-.62c.2-.17.46-.22.7-.12l1.9.8c.25.1.35.3.35.52v.55c0 .3-.05.6-.4.8-.62.4-1.38.6-2.2.48-3.3-.48-6-3.18-6.48-6.48-.12-.82.08-1.58.48-2.2Z"/></svg>`,
  phone: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M5.2 3.5h3.1l1.6 4.2-2 1.4a11 11 0 0 0 7 7l1.4-2 4.2 1.6v3.1c0 .9-.8 1.7-1.7 1.7A16.8 16.8 0 0 1 3.5 5.2c0-.9.8-1.7 1.7-1.7Z"/></svg>`,
  arrowDown: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0-6-6m6 6 6-6"/></svg>`,
  arrowOut: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8.5 7H17v8.5"/></svg>`,
  arrowRight: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6"/></svg>`,
  search: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="m16 16 4.5 4.5"/></svg>`,
  copy: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>`,
  hash: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M9.5 4 8 20M16 4l-1.5 16M4.5 9h15M4 15h15"/></svg>`,
  book: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 6.5C10 5 7.5 4.5 4 4.5v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-14c-3.5 0-6 .5-8 2Zm0 0v14"/></svg>`,
  globe: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z"/></svg>`,
  file: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Zm0 0V9H19M8.5 13h7m-7 3.5h5"/></svg>`,
  up: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0-6 6m6-6 6 6"/></svg>`,
  scan: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4 9V6a2 2 0 0 1 2-2h3m6 0h3a2 2 0 0 1 2 2v3m0 6v3a2 2 0 0 1-2 2h-3m-6 0H6a2 2 0 0 1-2-2v-3m3-3h10"/></svg>`,
};

// ── The emblem: DevArt's "D" ──────────────────────────────────────────────────
// The letter is split down its spine. Left, the stem is built from cells on a grid:
// the developer, discrete and computed. Right, the bowl is one continuous superelliptic
// curve, heavier where a pen would press: the artist. Between them runs a night-blue needle,
// the tailor who joins the two halves (and, standing upright, a developer's caret).
// Construction on a 32-unit square: cap line 4, baseline 28, spine x = 16.
//   needle  1.5 wide, eye 0.5 × 3, head at y 1, point at y 31.2 (it passes through the letter)
//   gaps    0.6 either side of the needle, so both halves sit at the same distance
//   stem    2 × 8 cells of 2.6, spread exactly between cap line and baseline
//   bowl    outer superellipse n 2.4 with 0.25 overshoot (round forms must pass the flat
//           ones to look the same height); counter n 2.2, strokes 6.4 at the side, 3.6 at
//           the top and bottom
// Two optical sizes: the cell stem wherever there are pixels to show it, a solid stem for
// favicons and 1× screens, where 0.4-unit gaps would only blur into grey.
const EMBLEM = (() => {
  const f = (n) => +n.toFixed(2);
  const spine = 16;
  const top = 4;
  const base = 28;
  const nw = 1.5;
  const gap = 0.6;
  const stemR = spine - nw / 2 - gap;
  const bowlL = spine + nw / 2 + gap;
  const cell = 2.6;
  const pitch = (base - top - cell) / 7;
  const rows = Array.from({ length: 8 }, (_, r) =>
    [0, 1].map((c) => `M${f(stemR - c * pitch - cell)} ${f(top + r * pitch)}h${cell}v${cell}h-${cell}z`).join(''),
  );
  const solid = `M${f(stemR - pitch - cell)} ${top}H${f(stemR)}V${base}H${f(stemR - pitch - cell)}z`;
  const half = (a, b, n, steps = 40) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = -Math.PI / 2 + (Math.PI * i) / steps;
      const c = Math.cos(t);
      const s = Math.sin(t);
      return `${f(bowlL + a * Math.abs(c) ** (2 / n))} ${f(16 + b * Math.sign(s) * Math.abs(s) ** (2 / n))}`;
    });
  const a = 12 - gap;
  const b = 12.25;
  const bowl = `M${half(a, b, 2.4).join('L')}ZM${half(a - 6.4, b - 3.6, 2.2).reverse().join('L')}Z`;
  const x0 = spine - nw / 2;
  const needle = `M${x0} ${1 + nw / 2}a${nw / 2} ${nw / 2} 0 0 1 ${nw} 0V25.8L${spine} 31.2L${x0} 25.8z`;
  const eye = `M15.75 2.3h.5v3h-.5z`;
  // The canvas hugs the letter (0.3 of air either side), so the emblem's visible edge is its box
  // edge: it aligns to the page gutter and spaces against the wordmark with no hidden margin.
  const left = stemR - pitch - cell - 0.3;
  const right = bowlL + a + 0.3;
  const viewBox = `${f(left)} 0 ${f(right - left)} 32`;
  return { rows, solid, bowl, needle, eye, viewBox };
})();

/**
 * The emblem as inline SVG (fill: currentColor; the needle takes its night blue from CSS).
 * size: 'auto' carries both stems and lets CSS choose by screen resolution;
 * 'large' is the cell stem with the needle's eye; 'small' is the solid stem.
 */
export function logoMark(cls = 'logo__mark', title = '', { size = 'auto', ink = 'currentColor', seam = '' } = {}) {
  const e = EMBLEM;
  const cells = `<g class="logo__cells">${e.rows.map((d) => `<path d="${d}"/>`).join('')}</g>`;
  const solid = `<path class="logo__solid" d="${e.solid}"/>`;
  const stem = size === 'large' ? cells : size === 'small' ? solid.replace(' class="logo__solid"', '') : cells + solid;
  const needle = `<path class="logo__seam"${seam ? ` fill="${seam}"` : ''} fill-rule="evenodd" d="${e.needle}${size === 'small' ? '' : e.eye}"/>`;
  const a11y = title ? `role="img" aria-label="${esc(title)}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="${cls}" viewBox="${e.viewBox}" fill="${ink}" ${a11y}>${stem}<path fill-rule="evenodd" d="${e.bowl}"/>${needle}</svg>`;
}

// ── Shared chrome ────────────────────────────────────────────────────────────
function header(c, { home }) {
  const base = home ? '' : c.path;
  // Off the home page, "Services" leads to the services hub rather than back to an anchor.
  const navHref = (n) => (!home && n.id === c.services.id ? c.servicesPath : `${base}#${n.id}`);
  const navLinks = c.nav
    .map((n) => `<li><a href="${navHref(n)}"${navHref(n) === c.selfPath ? ' aria-current="page"' : ''}>${n.label}</a></li>`)
    .join('');
  const altPath = c.altPath;
  return `<header class="hdr" data-hdr>
<div class="hdr__in">
<a class="logo" href="${c.path}" aria-label="${esc(site.name)} — ${esc(c.ui.home)}">${logoMark()}<span class="logo__word"><span class="dev">Dev</span><span class="art">Art</span></span></a>
<nav class="nav" aria-label="${c.lang === 'tr' ? 'Ana menü' : 'Main'}"><ul>${navLinks}</ul></nav>
<div class="hdr__actions">
<a class="lang" href="${altPath}" hreflang="${c.alt.lang}" lang="${c.alt.lang}"><span aria-hidden="true">${c.alt.short}</span><span class="sr-only">${esc(c.alt.label)}</span></a>
<button class="kbd-btn" type="button" data-palette-open aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K"><span class="kbd-btn__menu">${c.ui.menu}</span><kbd class="kbd" data-kbd>⌘K</kbd><span class="sr-only">${c.ui.palette}</span></button>
<a class="btn btn--primary btn--sm hdr__wa" href="${esc(wa(c.wa.default))}" data-wa target="_blank" rel="noopener">${icon.wa}<span>${c.ui.whatsappShort}</span></a>
</div>
</div>
</header>`;
}

function footer(c) {
  const year = site.updated.slice(0, 4);
  return `<footer class="ftr">
<div class="wrap ftr__in">
<div class="ftr__brand">
<a class="logo" href="${c.path}" aria-label="${esc(site.name)} — ${esc(c.ui.home)}">${logoMark()}<span class="logo__word"><span class="dev">Dev</span><span class="art">Art</span></span></a>
<p class="ftr__tag">${c.footer.tagline}</p>
</div>
<nav class="ftr__nav ftr__svc" aria-labelledby="ftr-svc"><p class="ftr__h" id="ftr-svc"><a href="${c.servicesPath}">${svcContent(c.lang).hub.crumb}</a></p><ul>
${services.map((s) => `<li><a href="${svcPath(c.lang, s.id)}">${svcContent(c.lang).items[s.id].crumb}</a></li>`).join('\n')}
</ul></nav>
<nav class="ftr__nav" aria-labelledby="ftr-res"><p class="ftr__h" id="ftr-res">${c.footer.resources}</p><ul>
<li><a href="${c.guidePath}">${c.footer.guide}</a></li>
<li><a href="${c.glossaryPath}">${c.footer.glossary}</a></li>
<li><a href="/llms.txt">${c.footer.llms}</a></li>
<li><a href="/sitemap.xml">${c.footer.sitemap}</a></li>
<li><a href="${c.altPath}" hreflang="${c.alt.lang}" lang="${c.alt.lang}">${c.alt.label}</a></li>
</ul></nav>
<div class="ftr__contact">
<p class="ftr__h">${c.contact.label}</p>
<address><a class="ftr__phone" href="tel:${site.phone.e164}">${phoneFor(c)}</a></address>
<button class="ftr__palette" type="button" data-palette-open aria-haspopup="dialog"><kbd class="kbd only-fine" data-kbd>⌘K</kbd> <span class="only-fine">${c.footer.palette}</span><span class="only-touch">${c.footer.menu}</span></button>
</div>
<p class="ftr__built">${c.footer.built}</p>
<p class="ftr__copy">© ${year} ${esc(site.name)}</p>
</div>
<svg class="ftr__sign" viewBox="${signature.viewBox}" aria-hidden="true" focusable="false">${strokes}</svg>
</footer>`;
}

function palette(c) {
  const k = c.commands;
  const go = c.nav.map((n, i) => ({ id: `go-${n.id}`, label: n.label, href: `${c.path}#${n.id}`, ic: icon.hash, kw: n.id }));
  const actions = [
    { id: 'wa', label: k.whatsapp, href: wa(c.wa.default), ic: icon.wa, kw: 'whatsapp mesaj message contact iletişim' },
    { id: 'call', label: k.call, href: `tel:${site.phone.e164}`, ic: icon.phone, kw: 'telefon phone ara call' },
    { id: 'copy', label: k.copy, action: 'copy', ic: icon.copy, kw: 'kopyala copy numara number' },
    { id: 'audit', label: k.audit, href: wa(c.wa.audit), ic: icon.scan, kw: 'seo audit denetim hız speed' },
  ];
  const more = [
    { id: 'guide', label: k.guide, href: c.guidePath, ic: icon.book, kw: 'aeo geo seo rehber guide' },
    { id: 'glossary', label: k.glossary, href: c.glossaryPath, ic: icon.file, kw: 'sözlük glossary terim term lcp inp cls schema' },
    { id: 'lang', label: k.lang, href: c.altPath, ic: icon.globe, kw: 'english türkçe language dil' },
    { id: 'llms', label: k.llms, href: '/llms.txt', ic: icon.file, kw: 'ai llm yapay zeka' },
    { id: 'share', label: k.share, action: 'share', ic: icon.arrowOut, kw: 'share paylaş gönder', hidden: true },
    { id: 'top', label: k.top, action: 'top', ic: icon.up, kw: 'top başa yukarı' },
  ];
  const sv = svcContent(c.lang);
  const svc = [
    { id: 'services', label: sv.ui.all, href: c.servicesPath, ic: icon.hash, kw: 'hizmetler services hizmet service' },
    ...services.map((s) => ({
      id: `svc-${s.id}`,
      label: sv.items[s.id].crumb,
      href: svcPath(c.lang, s.id),
      ic: icon.arrowRight,
      kw: `${svcTr.items[s.id].crumb} ${svcEn.items[s.id].crumb} ${s.id}`.toLowerCase(),
    })),
  ];
  const opt = (o) =>
    `<li role="option" id="cmd-${o.id}" class="palette__opt" aria-selected="false"${o.hidden ? ' hidden data-optional' : ''} ${o.href ? `data-href="${esc(o.href)}"` : `data-action="${o.action}"`} data-kw="${esc(o.kw)}">${o.ic}<span>${esc(o.label)}</span></li>`;
  return `<dialog class="palette" data-palette aria-label="${esc(c.ui.palette)}">
<div class="palette__box">
<div class="palette__grab" data-grab aria-hidden="true"><i></i></div>
<div class="palette__search" data-grab-zone>${icon.search}<input type="text" data-palette-input role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" aria-label="${esc(c.ui.paletteLabel)}" placeholder="${esc(c.ui.palettePlaceholder)}" autocomplete="off" spellcheck="false" enterkeyhint="go"><kbd class="kbd only-fine">esc</kbd><button class="icon-btn palette__close only-touch" type="button" data-palette-close aria-label="${esc(c.ui.close)}"><svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="m6.5 6.5 11 11m0-11-11 11"/></svg></button></div>
<ul id="palette-list" class="palette__list" role="listbox" aria-label="${esc(c.ui.palette)}">
<li role="presentation" class="palette__group">${k.groupActions}</li>
${actions.map(opt).join('')}
<li role="presentation" class="palette__group">${k.groupGo}</li>
${go.map(opt).join('')}${more.map(opt).join('')}
<li role="presentation" class="palette__group">${c.services.label}</li>
${svc.map(opt).join('')}
</ul>
<p class="palette__empty" data-palette-empty hidden>${esc(c.ui.paletteEmpty)}</p>
<p class="palette__foot" aria-hidden="true"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> <kbd class="kbd">↵</kbd> <kbd class="kbd">esc</kbd> <span>${c.ui.paletteHint}</span></p>
</div>
</dialog>
<div class="toast" role="status" aria-live="polite" data-toast data-phone="${phoneFor(c)}" data-msg="${esc(c.ui.copied)}" data-opening="${esc(c.ui.opening)}"></div>`;
}

// The phone's dock: a glass capsule, a night-blue pill whose second line removes the effort
// ("the first line is written"), and a weightless call button behind a hairline.
function dock(c) {
  const d = c.ui.dock;
  return `<div class="dock" data-dock>
<a class="dock__wa" href="${esc(wa(c.wa.default))}" data-wa target="_blank" rel="noopener"><span class="dock__ic">${icon.wa}</span><span class="dock__txt"><span class="dock__label" data-label>${d.label}</span><span class="dock__sub" aria-hidden="true">${d.sub}</span></span></a>
<span class="dock__rule" aria-hidden="true"></span>
<a class="dock__call" href="tel:${site.phone.e164}" aria-label="${esc(c.ui.call)}: ${phoneFor(c)}">${icon.phone}</a>
</div>`;
}

const hook = (h, href) =>
  h ? `<p class="hook">${h.text} <a href="${esc(href)}" target="_blank" rel="noopener" data-wa>${h.link}<span class="hook__arrow" aria-hidden="true">→</span></a></p>` : '';

const secHead = (s, n, extra = '') => `<header class="sec-head">
<p class="sec-label"><span class="sec-label__n">${pad(n)}</span>${s.label}</p>
<h2 class="sec-title" id="${s.id}-title">${rich(s.title)}</h2>
${s.lead ? `<p class="sec-lead">${s.lead}</p>` : ''}${extra}
</header>`;

// ── Home ─────────────────────────────────────────────────────────────────────
function hero(c) {
  const h = c.hero;
  return `<section class="hero" aria-labelledby="hero-title" data-hero>
<div class="hero__bg" aria-hidden="true"><canvas class="hero__canvas" data-seam></canvas></div>
<div class="hero__in">
<p class="hero__eyebrow">${h.eyebrow.map((e) => `<span>${e}</span>`).join('<span class="hero__sep" aria-hidden="true">/</span>')}</p>
<div class="hero__stage" aria-hidden="true" data-stage><p class="wm"><span class="wm__dev" data-wm-dev>Dev</span><span class="wm__plus" data-wm-plus>+</span><span class="wm__art" data-wm-art>Art</span></p><p class="hero__hint" data-touch="${esc(h.hintTouch)}">${h.hint}</p></div>
<div class="hero__bottom">
<div class="hero__copy">
<h1 class="hero__title" id="hero-title">${rich(h.h1)}</h1>
<p class="hero__lead">${h.lead}</p>
<div class="hero__ctas">
<a class="btn btn--primary btn--lg" href="${esc(wa(c.wa.default))}" data-wa data-magnetic target="_blank" rel="noopener">${icon.wa}<span>${c.ui.whatsapp}</span></a>
<a class="btn btn--ghost btn--lg" href="#${c.work.id}"><span>${h.ctaSecondary}</span>${icon.arrowDown}</a>
</div>
</div>
<div class="hero__meta">
<p class="chip" data-load-chip data-tpl="${esc(h.chip)}"><span class="chip__dot" aria-hidden="true"></span><span data-load-text>${h.chipIdle}</span></p>
</div>
</div>
</div>
</section>`;
}

function marquee(c) {
  const items = c.services.items.map((s) => s.title).concat(['Core Web Vitals', 'WebGL', 'Schema.org']);
  const run = items.map((t) => `<span>${esc(t)}</span><span class="marquee__star">✦</span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee__track"><div class="marquee__run">${run}</div><div class="marquee__run">${run}</div></div></div>`;
}

function short(c) {
  const s = c.short;
  return `<section class="short wrap" id="${s.id}" aria-labelledby="${s.id}-q">
<p class="sec-label"><span class="sec-label__n">01</span>${s.label}</p>
<div class="short__grid">
<div class="short__main">
<h2 class="short__q" id="${s.id}-q">${s.q}</h2>
<p class="short__a" id="${s.id}-answer">${s.a}</p>
</div>
<dl class="facts">${s.facts.map(([k, v]) => `<div class="facts__row"><dt>${k}</dt><dd>${listy(fill(v, c))}</dd></div>`).join('')}</dl>
</div>
</section>`;
}

function manifesto(c) {
  // Lines break only where the copy says so (\n); words split on ordinary spaces only,
  // so a non-breaking space keeps a phrase together.
  const one = (w) => {
    const art = w.match(/^\*(.+)\*$/);
    const dev = w.match(/^`(.+)`$/);
    if (art) return `<span class="w art">${art[1]}</span>`;
    if (dev) return `<span class="w dev">${dev[1]}</span>`;
    return `<span class="w">${w}</span>`;
  };
  const word = (w) => w.split('\u00a0').map(one).join('\u00a0');
  const words = c.manifesto.text
    .split('\n')
    .map((line) => line.split(/ +/).filter(Boolean).map(word).join(' '))
    .join('<br>');
  return `<section class="manifesto" aria-labelledby="manifesto-label">
<div class="wrap">
<p class="sec-label" id="manifesto-label"><span class="sec-label__n">02</span>${c.manifesto.label}</p>
<p class="manifesto__text">${words}</p>
</div>
</section>`;
}

function workCover(p) {
  // Generative cover for projects without a screenshot: deterministic from the domain.
  let h = 2166136261;
  for (const ch of p.domain) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0), (h % 1000) / 1000);
  let lines = '';
  for (let i = 0; i < 26; i++) {
    const y = 16 + i * 15;
    const amp = 6 + rnd() * 22;
    const ph = rnd() * 6.28;
    let d = `M0 ${y}`;
    for (let x = 0; x <= 640; x += 40) d += `L${x} ${Math.round(y + Math.sin(x / 90 + ph + i * 0.22) * amp)}`;
    lines += `<path d="${d}"/>`;
  }
  return `<svg class="cover" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1">${lines}</g></svg><p class="cover__mono" aria-hidden="true">${esc(p.name[0])}</p>`;
}

function workCard(p, c, i) {
  const t = c.work.items[p.slug];
  const media = p.shot
    ? `<picture>
<source type="image/avif" srcset="/assets/work/${p.shot}-640.avif 640w, /assets/work/${p.shot}-960.avif 960w, /assets/work/${p.shot}-1280.avif 1280w" sizes="(min-width: 1000px) 46vw, 92vw">
<source type="image/webp" srcset="/assets/work/${p.shot}-640.webp 640w, /assets/work/${p.shot}-960.webp 960w, /assets/work/${p.shot}-1280.webp 1280w" sizes="(min-width: 1000px) 46vw, 92vw">
<img class="shot-${p.shot}" src="/assets/work/${p.shot}-960.webp" alt="${esc(t.alt || p.name)}" width="1280" height="${p.shotHeight || 2400}" loading="lazy" decoding="async">
</picture>`
    : workCover(p);
  return `<li class="work-card card${p.shot ? '' : ' work-card--gen'}" data-spot>
<div class="work-card__media">
<div class="browser"><div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i><span class="browser__url">${esc(p.domain)}</span></div>
<div class="browser__view">${media}</div></div>
</div>
<div class="work-card__body">
<p class="work-card__kind"><span class="work-card__n">${pad(i + 1)}</span><span>${listy(t.kind)}</span></p>
<h3 class="work-card__title"><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}${icon.arrowOut}<span class="sr-only"> ${c.ui.external}</span></a></h3>
<p class="work-card__text">${t.summary}</p>
<ul class="tags" aria-label="${c.lang === 'tr' ? 'Kullanılanlar' : 'Built with'}">${t.tags.map((x) => `<li>${x}</li>`).join('')}</ul>
</div>
</li>`;
}

function workSection(c) {
  const n = c.work.next;
  return `<section class="work wrap" id="${c.work.id}" aria-labelledby="${c.work.id}-title">
${secHead(c.work, 3)}
<ol class="work__list" aria-label="${esc(c.ui.rail)}">
${work.map((p, i) => workCard(p, c, i)).join('\n')}
<li class="work-card invite card" data-spot data-invite>
<div class="work-card__media invite__media" aria-hidden="true">
<div class="browser invite__frame"><div class="browser__bar"><i></i><i></i><i></i><span class="browser__url invite__url"><span class="invite__caret"></span></span></div>
<div class="browser__view invite__sky"><span class="invite__light"></span><span class="invite__horizon"></span></div></div>
</div>
<div class="work-card__body invite__body">
<p class="work-card__kind"><span class="work-card__n">${pad(work.length + 1)}</span><span>${n.label}</span></p>
<h3 class="invite__title">${rich(n.title)}</h3>
<p class="work-card__text">${n.text}</p>
<a class="btn btn--primary btn--lg" href="${esc(wa(c.wa.project))}" data-wa data-magnetic target="_blank" rel="noopener">${icon.wa}<span>${n.cta}</span></a>
<p class="invite__note">${n.note}</p>
</div>
</li>
</ol>
<div class="rail-progress" aria-hidden="true"><i></i></div>
</section>`;
}

/** Each home service points at the page(s) that go deeper: 'id' or [id, fragment, label]. */
function svcLinks(links, c) {
  if (!links?.length) return '';
  const sv = svcContent(c.lang);
  const a = (l) => {
    const [id, hash, label] = Array.isArray(l) ? l : [l];
    return `<a href="${svcPath(c.lang, id)}${hash ? `#${hash}` : ''}">${label || sv.items[id].crumb}<span aria-hidden="true">→</span></a>`;
  };
  return `<p class="svc__more">${links.map(a).join('')}</p>`;
}

function servicesSection(c) {
  const s = c.services;
  return `<section class="services wrap" id="${s.id}" aria-labelledby="${s.id}-title">
${secHead(s, 4)}
<ol class="svc">
${s.items
  .map(
    (it, i) => `<li class="svc__item" data-spot>
<span class="svc__n" aria-hidden="true">${pad(i + 1)}</span>
<h3 class="svc__title">${it.title}</h3>
<div class="svc__body"><p>${it.text}</p><ul class="tags">${it.tags.map((t) => `<li>${t}</li>`).join('')}</ul>${svcLinks(it.links, c)}</div>
</li>`,
  )
  .join('\n')}
</ol>
<p class="svc__all"><a class="btn btn--ghost btn--lg" href="${c.servicesPath}"><span>${svcContent(c.lang).ui.homeMore}</span>${icon.arrowRight}</a></p>
</section>`;
}

function proof(c) {
  const p = c.proof;
  const m = p.metrics;
  const row = (key, abbr, unit, extra = '') =>
    `<div class="metric" data-metric="${key}"${extra}><dt><abbr title="${esc(m[key])}">${abbr}</abbr><span>${m[key]}</span></dt><dd><span class="metric__val"><span data-val>—</span><small>${unit}</small></span><span class="metric__status" data-status>${p.status.wait}</span><span class="metric__bar" aria-hidden="true"><i data-bar></i></span></dd></div>`;
  return `<section class="proof" id="${p.id}" aria-labelledby="${p.id}-title">
<div class="wrap">
${secHead(p, 5)}
<div class="proof__grid">
<div class="term card" data-proof data-status-text="${esc(JSON.stringify(p.status))}">
<div class="term__bar"><span class="term__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="term__file">~/eyupdevart.com — performance.log</span><span class="term__live">LIVE</span></div>
<dl class="metrics">
${row('lcp', 'LCP', c.lang === 'tr' ? 'sn' : 's')}
${row('inp', 'INP', 'ms')}
${row('cls', 'CLS', '')}
${row('fcp', 'FCP', c.lang === 'tr' ? 'sn' : 's')}
${row('ttfb', 'TTFB', 'ms')}
</dl>
<dl class="budget">
<div><dt>${m.weight}</dt><dd><span data-weight>—</span> <small>KB</small></dd></div>
<div><dt>${m.requests}</dt><dd><span data-requests>—</span></dd></div>
<div><dt>${m.js}</dt><dd><span data-js>—</span> <small>KB</small></dd></div>
</dl>
</div>
<div class="proof__side">
<ul class="claims">${p.claims.map((x) => `<li>${x}</li>`).join('')}</ul>
<p class="proof__note">${p.footnote}</p>
</div>
</div>
${hook(p.hook, wa(c.wa.audit))}
</div>
</section>`;
}

function processSection(c) {
  const p = c.process;
  return `<section class="process wrap" id="${p.id}" aria-labelledby="${p.id}-title">
${secHead(p, 6)}
<ol class="steps">
${p.steps.map((s, i) => `<li class="step"><span class="step__n" aria-hidden="true">${pad(i + 1)}</span><h3 class="step__title">${s.title}</h3><p>${s.text}</p></li>`).join('\n')}
</ol>
</section>`;
}

/** After the message, in three quiet steps: knowing what comes next is what makes it easy to begin. */
export const nextSteps = (c) => {
  const n = c.contact.next;
  return `<div class="next"><p class="next__label">${n.label}</p><ol class="next__steps">${n.steps.map((x) => `<li>${x}</li>`).join('')}</ol></div>`;
};

export function faqList(items, c, name) {
  return items
    .map(
      (it, i) => `<details class="qa" name="${name}"${i === 0 ? ' open' : ''}>
<summary><h3 class="qa__q">${it.q}</h3><span class="qa__icon" aria-hidden="true"></span></summary>
<div class="qa__a"><p>${fill(it.a, c)}</p></div>
</details>`,
    )
    .join('\n');
}

function faq(c) {
  const f = c.faq;
  return `<section class="faq wrap" id="${f.id}" aria-labelledby="${f.id}-title">
${secHead(f, 7)}
<div class="faq__list">
${faqList(f.items, c, 'faq')}
${hook(f.hook, wa(c.wa.default))}
</div>
</section>`;
}

function contact(c, qr) {
  const k = c.contact;
  return `<section class="contact" id="${k.id}" aria-labelledby="${k.id}-title">
<div class="wrap contact__in">
<p class="sec-label"><span class="sec-label__n">08</span>${k.label}</p>
<h2 class="contact__title" id="${k.id}-title">${rich(k.title)}</h2>
<p class="contact__lead">${k.lead}</p>
<address class="contact__actions">
<a class="btn btn--primary btn--xl" href="${esc(wa(c.wa.default))}" data-wa data-magnetic target="_blank" rel="noopener">${icon.wa}<span>${c.ui.whatsapp}</span></a>
<span class="contact__phone-row"><a class="contact__phone" href="tel:${site.phone.e164}">${icon.phone}<span>${phoneFor(c)}</span></a><button class="icon-btn" type="button" data-copy aria-label="${esc(c.ui.copyNumber)}">${icon.copy}</button></span>
</address>
<p class="contact__note">${k.prefilled}</p>
<p class="contact__assure">${k.assure}</p>
${nextSteps(c)}
<div class="contact__aside">
<figure class="qr"><div class="qr__code">${qr}</div><figcaption>${k.qr}</figcaption></figure>
<p class="clock"><span>${k.clock}</span><time data-clock>--:--</time><small class="clock__note" data-clock-note data-hours="${esc(JSON.stringify(k.hours))}" hidden></small></p>
</div>
</div>
</section>`;
}

export function homeBody(c, { qr }) {
  return `${header(c, { home: true })}
<main id="main">
<div class="thread" aria-hidden="true" data-thread><svg class="thread__route"><path/></svg><svg class="thread__stitch"><defs><linearGradient id="thread-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100%"><stop offset="0" stop-color="#2c2f78"/><stop offset=".6" stop-color="#3557b8"/><stop offset="1" stop-color="#8a76c4"/></linearGradient></defs><path/></svg><span class="thread__knot"></span></div>
${hero(c)}
${marquee(c)}
${short(c)}
${manifesto(c)}
${workSection(c)}
${servicesSection(c)}
${proof(c)}
${processSection(c)}
${faq(c)}
${contact(c, qr)}
</main>
${footer(c)}
${dock(c)}
${palette(c)}`;
}

// ── Guide ────────────────────────────────────────────────────────────────────
export function guideBody(c, { readMinutes, dateLabel }) {
  const g = c.guide;
  const toc = g.sections.map((s) => `<li><a href="#${s.id}">${s.h2}</a></li>`).join('') +
    `<li><a href="#${c.lang === 'tr' ? 'sss' : 'faq'}">${g.faqTitle}</a></li>`;
  return `${header(c, { home: false })}
<div class="progress" aria-hidden="true"></div>
<main id="main">
<article class="guide">
<header class="guide__head wrap">
<nav class="crumbs" aria-label="${c.lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'}"><ol><li><a href="${c.path}">${c.ui.home}</a></li><li><span aria-current="page">${g.crumb}</span></li></ol></nav>
<p class="sec-label"><span class="sec-label__n">${c.lang === 'tr' ? 'TR' : 'EN'}</span>${g.label}</p>
<h1 class="guide__title">${rich(g.h1)}</h1>
<p class="byline">${g.byline} <a href="${c.path}" rel="author">${esc(site.name)}</a><span aria-hidden="true"> · </span>${g.updated} <time datetime="${site.updated}">${dateLabel}</time><span aria-hidden="true"> · </span>${readMinutes} ${g.minutes}</p>
</header>
<div class="guide__layout wrap">
<aside class="toc" aria-labelledby="toc-title"><h2 class="toc__title" id="toc-title">${g.tocLabel}</h2><ol>${toc}<li><a class="toc__out" href="${c.glossaryPath}">${g.glossaryLink} →</a></li><li><a class="toc__out" href="${svcPath(c.lang, 'aeo-geo')}">${svcContent(c.lang).items['aeo-geo'].name} →</a></li></ol></aside>
<div class="prose">
<section class="tldr" aria-labelledby="tldr-title"><h2 id="tldr-title">${g.tldrLabel}</h2><p id="tldr-answer">${g.tldr}</p></section>
${g.sections.map((s) => `<section id="${s.id}" aria-labelledby="${s.id}-h"><h2 id="${s.id}-h">${s.h2}</h2>\n${fill(s.html, c)}\n</section>`).join('\n')}
<section id="${c.lang === 'tr' ? 'sss' : 'faq'}" aria-labelledby="guide-faq-h"><h2 id="guide-faq-h">${g.faqTitle}</h2>
<div class="faq__list">${faqList(g.faq, c, 'gfaq')}</div>
</section>
${ctaBox(g.cta, wa(c.wa.audit), c)}
</div>
</div>
</article>
</main>
${footer(c)}
${dock(c)}
${palette(c)}`;
}

// ── Glossary ─────────────────────────────────────────────────────────────────
export function glossaryBody(c, g, { terms, dateLabel }) {
  const groups = ['visibility', 'machines', 'experience'];
  const nameOf = (t) => g.terms[t.id].name || t.name;
  const toc = groups.map((k) => `<li><a href="#${k}">${g.groups[k]}</a></li>`).join('');
  const sections = groups
    .map(
      (k) => `<section class="gloss__group" id="${k}" aria-labelledby="${k}-h">
<h2 id="${k}-h">${g.groups[k]}</h2>
<dl class="gterms">
${terms
  .filter((t) => t.group === k)
  .map((t) => {
    const x = g.terms[t.id];
    const sv = t.service && svcContent(c.lang);
    const practice = sv ? `<p class="gterm__svc"><a href="${svcPath(c.lang, t.service)}">${sv.ui.inPractice}: ${sv.items[t.service].crumb}<span aria-hidden="true">→</span></a></p>` : '';
    return `<div class="gterm" id="${t.id}"><dt><a class="gterm__name" href="#${t.id}">${esc(nameOf(t))}</a><span class="gterm__aka">${esc(x.aka)}</span></dt><dd><p class="gterm__short">${x.short}</p><p class="gterm__body">${x.body}</p>${practice}</dd></div>`;
  })
  .join('\n')}
</dl>
</section>`,
    )
    .join('\n');
  return `${header(c, { home: false })}
<div class="progress" aria-hidden="true"></div>
<main id="main">
<article class="guide gloss">
<header class="guide__head wrap">
<nav class="crumbs" aria-label="${c.lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'}"><ol><li><a href="${c.path}">${c.ui.home}</a></li><li><span aria-current="page">${g.crumb}</span></li></ol></nav>
<p class="sec-label"><span class="sec-label__n">${terms.length}</span>${g.label}</p>
<h1 class="guide__title">${rich(g.h1)}</h1>
<p class="gloss__intro">${g.intro}</p>
<p class="byline">${c.guide.byline} <a href="${c.path}" rel="author">${esc(site.name)}</a><span aria-hidden="true"> · </span>${g.updated} <time datetime="${site.updated}">${dateLabel}</time><span aria-hidden="true"> · </span>${terms.length} ${g.count}</p>
</header>
<div class="guide__layout wrap">
<aside class="toc" aria-labelledby="toc-title"><h2 class="toc__title" id="toc-title">${c.lang === 'tr' ? 'Bu sözlükte' : 'In this glossary'}</h2><ol>${toc}<li><a class="toc__out" href="${c.guidePath}">${c.guide.crumb} →</a></li><li><a class="toc__out" href="${c.servicesPath}">${svcContent(c.lang).hub.crumb} →</a></li></ol></aside>
<div class="prose">
${sections}
${ctaBox(g.cta, wa(c.wa.audit), c)}
</div>
</div>
</article>
</main>
${footer(c)}
${dock(c)}
${palette(c)}`;
}

// ── Services ─────────────────────────────────────────────────────────────────
const crumbs = (c, trail) =>
  `<nav class="crumbs" aria-label="${c.lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'}"><ol><li><a href="${c.path}">${c.ui.home}</a></li>${trail
    .map(([label, href]) => (href ? `<li><a href="${href}">${label}</a></li>` : `<li><span aria-current="page">${label}</span></li>`))
    .join('')}</ol></nav>`;

const ctaBox = (cta, href, c) => `<aside class="cta-box card" aria-labelledby="cta-box-title">
<h2 class="cta-box__title" id="cta-box-title">${rich(cta.title)}</h2>
<p>${cta.text}</p>
<a class="btn btn--primary btn--lg" href="${esc(href)}" data-wa data-magnetic target="_blank" rel="noopener">${icon.wa}<span>${cta.button}</span></a>
${nextSteps(c)}
</aside>`;

const answerBox = (label, html) =>
  `<section class="tldr" aria-labelledby="answer-title"><h2 id="answer-title">${label}</h2><p id="answer">${html}</p></section>`;

export function serviceBody(c, id) {
  const sv = svcContent(c.lang);
  const s = services.find((x) => x.id === id);
  const it = sv.items[id];
  const faqId = c.lang === 'tr' ? 'sss' : 'faq';
  const toc = [...it.sections.map((x) => [x.id, x.h2]), [faqId, sv.ui.faq], ['related', sv.ui.related]]
    .map(([h, t]) => `<li><a href="#${h}">${t}</a></li>`)
    .join('');
  const rows = ['for', 'includes', 'stack', 'measure', 'start']
    .filter((k) => it.facts[k])
    .map((k) => `<div class="facts__row"><dt>${sv.ui.rows[k]}</dt><dd>${listy(it.facts[k])}</dd></div>`)
    .join('');
  const related = s.related
    .map(
      (r) =>
        `<li><a class="svc-rel__card card" href="${svcPath(c.lang, r)}" data-spot><span class="svc-rel__name">${sv.items[r].crumb}</span><span class="svc-rel__text">${sv.items[r].summary}</span>${icon.arrowRight}</a></li>`,
    )
    .join('');
  const terms = s.terms.map((t) => `<a href="${c.glossaryPath}#${t}">${esc(termName(c.lang, t))}</a>`).join('<span aria-hidden="true"> · </span>');
  return `${header(c, { home: false })}
<div class="progress" aria-hidden="true"></div>
<main id="main">
<article class="guide svc-page">
<header class="guide__head wrap">
${crumbs(c, [[sv.hub.crumb, sv.path], [it.crumb]])}
<p class="sec-label"><span class="sec-label__n">${pad(services.indexOf(s) + 1)}</span>${sv.ui.label}</p>
<h1 class="guide__title">${rich(it.h1)}</h1>
</header>
<div class="guide__layout wrap">
<aside class="toc" aria-labelledby="toc-title"><h2 class="toc__title" id="toc-title">${sv.ui.toc}</h2><ol>${toc}<li><a class="toc__out" href="${sv.path}">${sv.ui.all} →</a></li></ol></aside>
<div class="prose">
${answerBox(sv.ui.answer, fill(it.answer, c))}
<dl class="facts svc-facts">${rows}</dl>
${hook({ text: sv.ui.hook, link: c.ui.whatsapp }, wa(it.wa))}
${it.sections.map((x) => `<section id="${x.id}" aria-labelledby="${x.id}-h"><h2 id="${x.id}-h">${x.h2}</h2>\n${fill(x.html, c)}\n</section>`).join('\n')}
<section id="${faqId}" aria-labelledby="svc-faq-h"><h2 id="svc-faq-h">${sv.ui.faq}</h2>
<div class="faq__list">${faqList(it.faq, c, 'sfaq')}</div>
</section>
<section id="related" class="svc-rel" aria-labelledby="related-h"><h2 id="related-h">${sv.ui.related}</h2>
<ul class="svc-rel__list">${related}</ul>
<p class="svc-terms"><span class="svc-terms__k">${sv.ui.terms}</span> ${terms}</p>
</section>
${ctaBox(it.cta, wa(it.wa), c)}
</div>
</div>
</article>
</main>
${footer(c)}
${dock(c)}
${palette(c)}`;
}

export function servicesHubBody(c) {
  const sv = svcContent(c.lang);
  const h = sv.hub;
  const faqId = c.lang === 'tr' ? 'sss' : 'faq';
  const items = services
    .map((s, i) => {
      const it = sv.items[s.id];
      return `<li class="svc__item" data-spot>
<span class="svc__n" aria-hidden="true">${pad(i + 1)}</span>
<h2 class="svc__title"><a class="svc__link" href="${svcPath(c.lang, s.id)}">${it.crumb}</a></h2>
<div class="svc__body"><p>${it.summary}</p><p class="svc__for"><span>${sv.ui.rows.for}</span> ${listy(it.facts.for)}</p><span class="svc__go" aria-hidden="true">${sv.ui.more}${icon.arrowRight}</span></div>
</li>`;
    })
    .join('\n');
  return `${header(c, { home: false })}
<main id="main">
<article class="guide svc-hub">
<header class="guide__head wrap">
${crumbs(c, [[h.crumb]])}
<p class="sec-label"><span class="sec-label__n">${pad(services.length)}</span>${h.label}</p>
<h1 class="guide__title">${rich(h.h1)}</h1>
<p class="gloss__intro">${h.intro}</p>
</header>
<div class="wrap svc-hub__in">
<div class="prose">${answerBox(sv.ui.answer, h.answer)}</div>
<ol class="svc svc--hub">
${items}
</ol>
<div class="prose">
<section id="${faqId}" aria-labelledby="hub-faq-h"><h2 id="hub-faq-h">${sv.ui.faq}</h2>
<div class="faq__list">${faqList(h.faq, c, 'hfaq')}</div>
</section>
${ctaBox(h.cta, wa(c.wa.default), c)}
</div>
</div>
</article>
</main>
${footer(c)}
${dock(c)}
${palette(c)}`;
}

// ── 404 ──────────────────────────────────────────────────────────────────────
export function notFoundBody(tr, en) {
  return `<main id="main" class="nf">
<div class="nf__in wrap">
<a class="logo" href="/" aria-label="${esc(site.name)}">${logoMark()}<span class="logo__word"><span class="dev">Dev</span><span class="art">Art</span></span></a>
<p class="nf__code" aria-hidden="true"><span class="dev">4</span><span class="nf__seam"></span><span class="art">04</span></p>
<h1 class="nf__title">${rich(tr.notFound.h1)}</h1>
<p>${tr.notFound.text}</p>
<p lang="en" class="nf__en">${rich(en.notFound.h1)} ${en.notFound.text}</p>
<div class="nf__actions">
<a class="btn btn--primary btn--lg" href="/">${tr.notFound.home}</a>
<a class="btn btn--ghost btn--lg" href="/en/" lang="en" hreflang="en">${en.notFound.home}</a>
</div>
</div>
</main>`;
}
