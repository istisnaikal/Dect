// ─────────────────────────────────────────────────────────────────────────────
//  DevArt runtime. No framework, no dependencies, no ad trackers.
//  Every feature here is an enhancement: the HTML is complete without it.
// ─────────────────────────────────────────────────────────────────────────────

const d = document;
const root = d.documentElement;
const $ = (s, el = d) => el.querySelector(s);
const $$ = (s, el = d) => [...el.querySelectorAll(s)];
const lang = root.lang || 'tr';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
// Decimal comma for Turkish. (Intl.NumberFormat would cost ~10 ms of ICU setup for this.)
const nf = (n, digits = 0) => {
  const s = n.toFixed(digits);
  return lang === 'tr' ? s.replace('.', ',') : s;
};
const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 60));

/* ── Header: solid after the first scroll; on phones it glides away ─────────
   while you read down and returns the instant you scroll up. ─────────────── */
function header() {
  const hdr = $('[data-hdr]');
  if (!hdr || !('IntersectionObserver' in window)) return;
  // A 24px sentinel + IntersectionObserver: async, so it can never force layout.
  const s = d.createElement('div');
  s.setAttribute('aria-hidden', 'true');
  s.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
  d.body.prepend(s);
  new IntersectionObserver(([e]) => hdr.classList.toggle('is-solid', !e.isIntersecting)).observe(s);

  const phone = matchMedia('(max-width: 899px)');
  // Stay put for keyboard focus only: after a tap on Menu, the dialog hands focus back
  // to the button, and that alone should not pin the header over the text.
  const keyboardInside = () => {
    try {
      return !!hdr.querySelector(':focus-visible');
    } catch {
      return hdr.contains(d.activeElement);
    }
  };
  let lastY = 0;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY;
    const dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    hdr.classList.toggle('is-hidden', phone.matches && dy > 0 && y > innerHeight * 0.75 && !keyboardInside());
    lastY = y;
  };
  addEventListener('scroll', () => ticking || ((ticking = true), requestAnimationFrame(update)), { passive: true });
  hdr.addEventListener('focusin', () => hdr.classList.remove('is-hidden'));
}

/* ── Mobile dock: after the hero, out of the way of the contact block & footer ── */
function dock() {
  const el = $('[data-dock]');
  const hero = $('[data-hero]') || $('.guide__head');
  const away = $$('#iletisim, #contact, .cta-box, .ftr');
  if (!el || !hero || !('IntersectionObserver' in window)) return;
  const seen = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting));
    el.classList.toggle('is-on', !seen.get(hero) && !away.some((a) => seen.get(a)));
  });
  [hero, ...away].forEach((t) => io.observe(t));
}

/* ── The message follows the reader ─────────────────────────────────────────
   While a section crosses the middle of the screen, the always-present WhatsApp buttons
   (header, dock) carry the first line that fits it: the work and the services open with
   "here it is in two sentences", the live measurements with "could you look at my site's
   speed?". Elsewhere, the plain greeting. The visitor still writes the rest. */
function intent() {
  const zones = $$('[data-wa-intent]');
  const targets = $$('.dock__wa, .hdr__wa');
  if (!zones.length || !targets.length || !('IntersectionObserver' in window)) return;
  const base = targets.map((a) => a.getAttribute('href'));
  const seen = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      const z = zones.find((x) => seen.get(x));
      targets.forEach((a, i) => a.setAttribute('href', z ? z.dataset.waIntent : base[i]));
    },
    { rootMargin: '-38% 0px -38% 0px' },
  );
  zones.forEach((z) => io.observe(z));
}

/* ── Toast + copy ─────────────────────────────────────────────────────────── */
function toast(msg) {
  const t = $('[data-toast]');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('is-on'), 2400);
}

async function copyPhone(e) {
  const t = $('[data-toast]');
  const phone = t?.dataset.phone || '';
  // Read the button now: once the event has been dispatched, currentTarget is gone.
  const b = e?.currentTarget;
  try {
    await navigator.clipboard.writeText(phone);
    navigator.vibrate?.(12); // a single haptic tick where supported
    toast(`${t.dataset.msg} — ${phone}`);
    // The button itself confirms: the copy icon gives way to a check for a moment.
    if (b?.classList) {
      b.classList.add('is-done');
      clearTimeout(b.doneTimer);
      b.doneTimer = setTimeout(() => b.classList.remove('is-done'), 1800);
    }
  } catch {
    location.href = `tel:${phone.replace(/\s/g, '')}`;
  }
}

/* ── Command palette (⌘K / Ctrl K / "/"); on phones it is the menu: a sheet ──
   that rises from the bottom, keeps the keyboard down, and swipes away. ──── */
function palette() {
  const dlg = $('[data-palette]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const box = $('.palette__box', dlg);
  const input = $('[data-palette-input]', dlg);
  const canShare = typeof navigator.share === 'function';
  const opts = $$('.palette__opt', dlg).filter((o) => !o.hasAttribute('data-optional') || canShare);
  const groups = $$('.palette__group', dlg);
  const empty = $('[data-palette-empty]', dlg);
  const touch = () => !finePointer.matches;
  let visible = opts;
  let active = 0;
  let closing = 0;

  const lower = (s) => s.toLocaleLowerCase(lang);
  const fold = (s) => lower(s).replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const list = $('.palette__list', dlg);
  const original = [...list.children];

  // Best match first: label prefix › a word in the label › anywhere in the label › keywords only.
  // Exact spelling outranks accent-folded spelling, so "hız" finds speed before "hizmetler".
  const tier = (label, kw, q) => {
    if (label.startsWith(q)) return 0;
    if (label.split(/[\s/·—–-]+/).some((w) => w.startsWith(q))) return 1;
    if (label.includes(q)) return 2;
    return kw.includes(q) ? 3 : -1;
  };
  // "Exact" tries Turkish and plain casing: in Turkish "UI" lowercases to "uı", yet the acronym is English.
  const best = (...r) => Math.min(...r.map((x) => (x < 0 ? Infinity : x)));
  const rank = (o, q) => {
    const t = o.textContent;
    const k = o.dataset.kw;
    const exact = best(tier(lower(t), lower(k), lower(q)), tier(t.toLowerCase(), k.toLowerCase(), q.toLowerCase()));
    const folded = tier(fold(t), fold(k), fold(q));
    if (exact < Infinity) return exact;
    return folded >= 0 ? folded + 4 : -1;
  };

  const select = (i, scroll = true) => {
    opts.forEach((o) => o.setAttribute('aria-selected', 'false'));
    if (!visible.length) return input.removeAttribute('aria-activedescendant');
    active = (i + visible.length) % visible.length;
    const o = visible[active];
    o.setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', o.id);
    if (scroll) o.scrollIntoView({ block: 'nearest' });
  };

  const filter = () => {
    const q = input.value.trim();
    const scored = opts.map((o, i) => [o, q ? rank(o, q) : 0, i]);
    scored.forEach(([o, r]) => (o.hidden = r < 0));
    visible = scored.filter(([, r]) => r >= 0).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(([o]) => o);
    // While searching the list shows results by rank; an empty query restores the authored order.
    list.append(...(q ? visible : original));
    groups.forEach((g) => (g.hidden = !!q));
    empty.hidden = visible.length > 0;
    select(0, !touch());
  };

  const open = () => {
    if (dlg.open) return;
    clearTimeout(closing);
    dlg.classList.remove('is-closing');
    box.style.transform = '';
    input.value = '';
    filter();
    // Thumbs get a menu, not a keyboard: the field only becomes editable when tapped.
    input.readOnly = touch();
    dlg.toggleAttribute('autofocus', touch());
    dlg.showModal();
    if (!touch()) input.focus();
  };

  const close = () => {
    if (!dlg.open || dlg.classList.contains('is-closing')) return;
    const done = () => {
      dlg.classList.remove('is-closing');
      box.style.transform = '';
      dlg.close();
    };
    if (reduced.matches) return done();
    box.style.transform = '';
    dlg.classList.add('is-closing');
    closing = setTimeout(done, 340);
  };

  const run = (o) => {
    if (!o) return;
    const href = o.dataset.href;
    const action = o.dataset.action;
    if (href) {
      const external = /^https?:/.test(href) && !href.startsWith(location.origin);
      if (external) window.open(href, '_blank', 'noopener');
      else location.href = href;
    } else if (action === 'copy') copyPhone();
    else if (action === 'share') navigator.share({ title: d.title, url: location.href.split('#')[0] }).catch(() => {});
    else if (action === 'top') scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
    close();
  };

  $$('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  $('[data-palette-close]', dlg)?.addEventListener('click', close);
  dlg.addEventListener('cancel', (e) => {
    e.preventDefault(); // Escape: leave with the same grace as everything else
    close();
  });
  addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dlg.open ? close() : open();
    } else if (e.key === '/' && !dlg.open && !typing) {
      e.preventDefault();
      open();
    }
  });
  input.addEventListener('pointerdown', () => (input.readOnly = false));
  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: visible.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(visible[active]);
    }
  });
  opts.forEach((o) => {
    o.addEventListener('click', () => run(o));
    o.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const i = visible.indexOf(o);
      if (i !== active) select(i, false);
    });
  });
  dlg.addEventListener('click', (e) => e.target === dlg && close());

  // Swipe the sheet down to dismiss: it follows the finger 1:1, then either
  // springs home or falls away depending on distance and flick velocity.
  let drag = null;
  $$('[data-grab], [data-grab-zone]', dlg).forEach((zone) =>
    zone.addEventListener('pointerdown', (e) => {
      if (!touch() || e.button > 0 || e.target.closest('input, button')) return;
      drag = { y: e.clientY, t: e.timeStamp, dy: 0, v: 0, id: e.pointerId };
      zone.setPointerCapture(e.pointerId);
      dlg.classList.add('is-dragging');
    }),
  );
  dlg.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = Math.max(0, e.clientY - drag.y);
    drag.v = (dy - drag.dy) / Math.max(1, e.timeStamp - drag.t);
    drag.t = e.timeStamp;
    drag.dy = dy;
    box.style.transform = `translate3d(0, ${dy}px, 0)`;
  });
  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { dy, v } = drag;
    drag = null;
    dlg.classList.remove('is-dragging');
    if (dy > box.offsetHeight * 0.28 || v > 0.55) close();
    else box.style.transform = '';
  };
  dlg.addEventListener('pointerup', release);
  dlg.addEventListener('pointercancel', release);

  $$('[data-copy]').forEach((b) => b.addEventListener('click', copyPhone));

  // Show the right shortcut for the platform.
  const mac = /Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform || '');
  if (!mac) $$('[data-kbd]').forEach((k) => (k.textContent = 'Ctrl K'));
}

/* ── Live Web Vitals, measured by the visitor's own browser ───────────────── */
function vitals() {
  const box = $('[data-proof]');
  const chip = $('[data-load-chip]');
  if (!box && !chip) return;
  const S = box ? JSON.parse(box.dataset.statusText) : {};
  const T = { lcp: [2500, 4000], fcp: [1800, 3000], ttfb: [800, 1800], cls: [0.1, 0.25], inp: [200, 500] };
  const types = PerformanceObserver.supportedEntryTypes || [];
  const nav = performance.getEntriesByType('navigation')[0];
  const act = nav?.activationStart || 0; // prerendered pages count from activation

  const set = (k, v) => {
    const el = box && $(`[data-metric="${k}"]`, box);
    if (!el) return;
    const [good, poor] = T[k];
    const state = v <= good ? 'good' : v <= poor ? 'ni' : 'poor';
    el.dataset.state = state;
    $('[data-val]', el).textContent =
      k === 'cls' ? nf(v, 3) : k === 'lcp' || k === 'fcp' ? nf(v / 1000, 2) : nf(Math.round(v));
    $('[data-status]', el).textContent = S[state];
    $('[data-bar]', el).style.setProperty('--p', Math.max(0.02, Math.min(1, v / poor)).toFixed(3));
  };
  const note = (k, text) => {
    const el = box && $(`[data-metric="${k}"] [data-status]`, box);
    if (el) el.textContent = text;
  };
  const observe = (type, cb, opts = {}) => {
    if (!types.includes(type)) return false;
    new PerformanceObserver((list) => cb(list.getEntries())).observe({ type, buffered: true, ...opts });
    return true;
  };

  if (nav) set('ttfb', Math.max(0, nav.responseStart - act));

  let fcp = 0;
  let lcp = 0;
  observe('paint', (es) =>
    es.forEach((e) => e.name === 'first-contentful-paint' && set('fcp', (fcp = Math.max(0, e.startTime - act)))),
  );
  if (!observe('largest-contentful-paint', (es) => set('lcp', (lcp = Math.max(0, es.at(-1).startTime - act)))))
    note('lcp', S.na);

  // CLS — session windows (1 s gap, 5 s cap), as defined by Google.
  let cls = 0, win = 0, first = 0, last = 0;
  if (observe('layout-shift', (es) => {
    for (const e of es) {
      if (e.hadRecentInput) continue;
      if (win && e.startTime - last < 1000 && e.startTime - first < 5000) win += e.value;
      else (win = e.value), (first = e.startTime);
      last = e.startTime;
      cls = Math.max(cls, win);
    }
    set('cls', cls);
  })) set('cls', cls);
  else note('cls', S.na);

  // INP — worst interaction latency so far.
  const seen = new Map();
  let inp = 0;
  if (observe('event', (es) => {
    for (const e of es) {
      if (!e.interactionId) continue;
      const v = Math.max(seen.get(e.interactionId) || 0, e.duration);
      seen.set(e.interactionId, v);
      if (v > inp) set('inp', (inp = v));
    }
  }, { durationThreshold: 16 })) note('inp', S.interact);
  else note('inp', S.na);

  // Page weight, requests, JavaScript — straight from Resource Timing.
  const tally = () => {
    if (!box) return;
    const res = performance.getEntriesByType('resource');
    let bytes = nav ? nav.transferSize || nav.encodedBodySize || 0 : 0;
    let js = 0;
    for (const r of res) {
      const b = r.transferSize || r.encodedBodySize || 0;
      bytes += b;
      if (r.initiatorType === 'script' || /\.m?js(\?|$)/.test(r.name)) js += r.encodedBodySize || b;
    }
    $('[data-weight]', box).textContent = nf(bytes / 1024, 1);
    $('[data-requests]', box).textContent = res.length + 1;
    $('[data-js]', box).textContent = nf(js / 1024, 1);
  };
  observe('resource', tally);

  // Hero chip: "this page opened in X s on your device".
  const finish = () => {
    tally();
    if (!chip) return;
    const t = lcp || fcp || (nav ? nav.domContentLoadedEventEnd - act : 0);
    if (!t) return;
    $('[data-load-text]', chip).textContent = chip.dataset.tpl.replace('{t}', nf(t / 1000, 2));
    chip.classList.add('is-done');
  };
  const later = () => setTimeout(finish, 300);
  d.readyState === 'complete' ? later() : addEventListener('load', later, { once: true });
}

/* ── Pointer delight: magnetic CTAs + card spotlight (fine pointers only) ── */
// Where the light gathers inside a button: the point under the hand (or the finger).
const lightAt = (b, e) => {
  const r = b.getBoundingClientRect();
  b.style.setProperty('--bx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  b.style.setProperty('--by', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
};

/* ── Press: every button answers the finger where it lands. An empty touchstart
   listener is what lets iOS Safari apply :active at all. ─────────────────── */
function press() {
  d.addEventListener('touchstart', () => {}, { passive: true });
  d.addEventListener(
    'pointerdown',
    (e) => {
      const b = e.target.closest?.('.btn');
      if (b) lightAt(b, e);
    },
    { passive: true },
  );
}

function pointer() {
  if (!finePointer.matches || reduced.matches) return;
  $$('.btn--primary, .btn--ghost').forEach((b) => b.addEventListener('pointermove', (e) => lightAt(b, e), { passive: true }));
  $$('[data-magnetic]').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
      b.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
    });
    b.addEventListener('pointerleave', () => {
      b.style.setProperty('--mx', '0px');
      b.style.setProperty('--my', '0px');
    });
  });
  d.addEventListener(
    'pointermove',
    (e) => {
      const el = e.target.closest?.('[data-spot]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', `${e.clientX - r.left}px`);
      el.style.setProperty('--py', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/* ── After a tap on WhatsApp the button answers: "opening…" ──────────────────
   The app switch takes a moment on phones; a silent button feels broken, a
   button that confirms feels safe. The width is held, so nothing around it moves. */
function relief() {
  const label = $('[data-toast]')?.dataset.opening;
  if (!label) return;
  d.addEventListener('click', (e) => {
    const a = e.target.closest?.('a.btn[data-wa], a.dock__wa');
    if (!a || a.classList.contains('is-opening')) return;
    // The small header button has no room for words: there only the icon breathes.
    const text = a.classList.contains('btn--sm') ? null : $('[data-label]', a) || $('span:last-of-type', a);
    const was = text?.textContent;
    a.style.minWidth = `${a.offsetWidth}px`;
    a.classList.add('is-opening');
    if (text) text.textContent = label;
    const done = () => {
      if (text) text.textContent = was;
      a.classList.remove('is-opening');
      a.style.minWidth = '';
    };
    setTimeout(done, 2600);
  });
}

/* ── The invitation's light turns toward the hand ─────────────────────────
   Only the position is set here; @property lets CSS ease it, so it drifts like breath. */
function invite() {
  const card = $('[data-invite]');
  const sky = card && $('.invite__sky', card);
  if (!sky || !finePointer.matches || reduced.matches) return;
  const clamp = (v) => Math.max(-10, Math.min(110, v));
  card.addEventListener('pointermove', (e) => {
    const r = sky.getBoundingClientRect();
    card.style.setProperty('--lx', `${clamp(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--ly', `${clamp(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--lx');
    card.style.removeProperty('--ly');
  });
}

/* ── Local time in Türkiye (fixed UTC+3 since 2016 — no timezone tables needed) ──
   Beside it, one honest line on what the hour means: no countdowns, no promises of speed. */
function clock() {
  const el = $('[data-clock]');
  if (!el) return;
  const note = $('[data-clock-note]');
  const hours = note ? JSON.parse(note.dataset.hours) : null;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const t = new Date(Date.now() + 3 * 3600e3);
    const h = t.getUTCHours();
    el.textContent = `${pad(h)}:${pad(t.getUTCMinutes())}`;
    if (!hours) return;
    const weekend = t.getUTCDay() === 0 || t.getUTCDay() === 6;
    note.textContent = weekend ? hours.weekend : h >= 9 && h < 19 ? hours.open : hours.closed;
    note.hidden = false;
  };
  tick();
  setInterval(tick, 10_000);
}

/* ── The thread: a stitch down the margin that ends tied to the CTA ─────────
   Built from section boxes + computed padding only (never the inside of a
   content-visibility-skipped section), rebuilt whenever anything resizes. */
function thread() {
  const el = $('[data-thread]');
  const main = $('main');
  const hero = $('[data-hero]');
  if (!el || !main || !hero || !('ResizeObserver' in window)) return;
  const [route, stitch] = $$('path', el);
  const knot = $('.thread__knot', el);
  const contact = $('#iletisim, #contact');
  const cta = contact && $('.btn--primary', contact);
  const sections = $$('main > section').filter((s) => s !== hero && $('.sec-label', s));
  let samples = [];
  let endY = Infinity;
  let mainTop = 0;
  let contactNear = false;
  let tied = false;

  const build = () => {
    const mr = main.getBoundingClientRect();
    mainTop = mr.top + scrollY;
    const edge = $('.hero__in', hero).getBoundingClientRect().left - mr.left;
    const amp = Math.max(4, Math.min(30, edge * 0.55));
    const x = edge - Math.min(14, edge * 0.45);
    const inward = Math.max(0, Math.min(amp * 0.55, edge - 4 - x));
    const pts = [{ x, y: hero.getBoundingClientRect().bottom - mr.top - 36 }];
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      pts.push({ x, y: r.top - mr.top + parseFloat(getComputedStyle(s).paddingTop) + 6 });
    }
    let end = null;
    if (cta && contactNear) {
      const b = cta.getBoundingClientRect();
      end = { x: b.left - mr.left - 2, y: b.top - mr.top + b.height / 2 };
    }
    let d = `M${pts[0].x} ${pts[0].y}`;
    const curves = [];
    const curve = (a, p, q, b) => {
      curves.push([a, p, q, b]);
      d += ` C${p.x} ${p.y} ${q.x} ${q.y} ${b.x} ${b.y}`;
    };
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const dy = b.y - a.y;
      // Weave: out into the margin, then back towards the text, never touching it.
      const off = i % 2 ? -amp : inward;
      curve(a, { x: a.x + off, y: a.y + dy * 0.38 }, { x: b.x + off, y: b.y - dy * 0.38 }, b);
    }
    if (end) {
      const a = pts[pts.length - 1];
      curve(a, { x: a.x - amp * 0.6, y: a.y + (end.y - a.y) * 0.6 }, { x: end.x - 70, y: end.y }, end);
    }
    route.setAttribute('d', d);
    stitch.setAttribute('d', d);
    // Sample the curves once, by their own arithmetic, so the knot can follow the
    // reading position cheaply. (Asking the SVG path for a thousand points with
    // getPointAtLength cost ~100 ms of main thread; this costs well under one.)
    samples = [];
    for (const [a, p, q, b] of curves) {
      const n = Math.max(8, Math.ceil(Math.abs(b.y - a.y) / 10));
      for (let k = samples.length ? 1 : 0; k <= n; k++) {
        const t = k / n;
        const u = 1 - t;
        const w0 = u * u * u;
        const w1 = 3 * u * u * t;
        const w2 = 3 * u * t * t;
        const w3 = t * t * t;
        samples.push([w0 * a.x + w1 * p.x + w2 * q.x + w3 * b.x, w0 * a.y + w1 * p.y + w2 * q.y + w3 * b.y]);
      }
    }
    endY = end ? end.y : Infinity;
    el.classList.add('is-ready');
    update();
  };

  const update = () => {
    const head = scrollY + innerHeight * 0.62 - mainTop;
    el.style.setProperty('--head', `${Math.round(head)}px`);
    let i = 0;
    while (i < samples.length - 1 && samples[i][1] < head) i++;
    const [kx, ky] = samples[i] || [-99, -99];
    el.style.setProperty('--kx', `${kx.toFixed(1)}px`);
    el.style.setProperty('--ky', `${ky.toFixed(1)}px`);
    const now = head >= endY;
    if (now !== tied) {
      tied = now;
      el.classList.toggle('is-tied', tied);
      if (tied) cta.classList.add('is-caught'); // one breath; the class stays so it never repeats
    }
  };

  let rt = 0;
  const later = () => {
    clearTimeout(rt);
    rt = setTimeout(build, 120);
  };
  new ResizeObserver(later).observe(main);
  if (contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting !== contactNear) {
        contactNear = e.isIntersecting;
        later();
      }
    }, { rootMargin: '50% 0px' }).observe(contact);
  }
  let ticking = false;
  addEventListener('scroll', () => ticking || ((ticking = true), requestAnimationFrame(() => ((ticking = false), update()))), { passive: true });
  build();
}

/* ── Rest: the endless loops (the horizon, the invitation's light, the live dot,
   the front door's breath) pause while out of sight. Nobody sees them, so no frame
   is made for them. Far off-screen, the horizon's drift alone kept the main thread
   painting sixty frames a second; at rest, it paints none. ─────────────────── */
function rest() {
  const els = $$('[data-hero], .marquee, [data-invite], [data-proof]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle('is-away', !e.isIntersecting)),
    { rootMargin: '200px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/* ── The Seam: WebGL hero, loaded only when the main thread is idle ───────── */
function seam() {
  const canvas = $('[data-seam]');
  if (!canvas || navigator.connection?.saveData) return;
  const go = () =>
    import('./seam.js')
      .then((m) => m.start(canvas))
      .catch(() => {});
  const ready = () => (d.readyState === 'complete' ? idle(go) : addEventListener('load', () => idle(go), { once: true }));
  d.prerendering ? d.addEventListener('prerenderingchange', ready, { once: true }) : ready();
}

/* ── For the curious ones reading the console ─────────────────────────────── */
function hello() {
  console.log(
    '%cDev%c+%cArt',
    'font:400 34px ui-monospace,monospace;color:#ece8df',
    'font:300 22px system-ui;color:#3557b8',
    'font:italic 400 40px Georgia,serif;color:#ece8df',
  );
  console.log(
    lang === 'tr'
      ? 'Kaynağı okuyorsan aynı dili konuşuyoruz. Framework yok, çerez yok, sadece el işçiliği.\n→ https://wa.me/905538115033'
      : 'If you are reading the source, we speak the same language. No framework, no cookies, just craft.\n→ https://wa.me/905538115033',
  );
}

// Critical: what the first interaction may need. Everything else waits for idle,
// each in its own task, so no single task ever blocks the main thread for long.
header();
press();
palette();
vitals();
seam();
for (const fn of [dock, pointer, clock, thread, relief, invite, intent, rest, hello]) idle(fn);
