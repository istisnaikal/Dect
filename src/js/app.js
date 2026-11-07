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
  let lastY = 0;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY;
    const dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    hdr.classList.toggle('is-hidden', phone.matches && dy > 0 && y > innerHeight * 0.75 && !hdr.contains(d.activeElement));
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

/* ── Toast + copy ─────────────────────────────────────────────────────────── */
function toast(msg) {
  const t = $('[data-toast]');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('is-on'), 2400);
}

async function copyPhone() {
  const t = $('[data-toast]');
  const phone = t?.dataset.phone || '';
  try {
    await navigator.clipboard.writeText(phone);
    navigator.vibrate?.(12); // a single haptic tick where supported
    toast(`${t.dataset.msg} — ${phone}`);
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

  const norm = (s) =>
    s.toLocaleLowerCase(lang).replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');

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
    const q = norm(input.value.trim());
    visible = opts.filter((o) => {
      const hit = !q || norm(`${o.textContent} ${o.dataset.kw}`).includes(q);
      o.hidden = !hit;
      return hit;
    });
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
function pointer() {
  if (!finePointer.matches || reduced.matches) return;
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

/* ── Local time in Türkiye (fixed UTC+3 since 2016 — no timezone tables needed) ── */
function clock() {
  const el = $('[data-clock]');
  if (!el) return;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const t = new Date(Date.now() + 3 * 3600e3);
    el.textContent = `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}`;
  };
  tick();
  setInterval(tick, 10_000);
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
    'font:300 22px system-ui;color:#ff5b22',
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
palette();
vitals();
seam();
for (const fn of [dock, pointer, clock, hello]) idle(fn);
