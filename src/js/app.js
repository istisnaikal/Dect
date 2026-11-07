// ─────────────────────────────────────────────────────────────────────────────
//  DevArt runtime. No framework, no dependencies, no trackers.
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

/* ── Header: solid after the first scroll ─────────────────────────────────── */
// An IntersectionObserver on a 24px sentinel: async, so it can never force layout.
function header() {
  const hdr = $('[data-hdr]');
  if (!hdr || !('IntersectionObserver' in window)) return;
  const s = d.createElement('div');
  s.setAttribute('aria-hidden', 'true');
  s.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
  d.body.prepend(s);
  new IntersectionObserver(([e]) => hdr.classList.toggle('is-solid', !e.isIntersecting)).observe(s);
}

/* ── Mobile dock: appears after the hero, steps aside at the contact block ── */
function dock() {
  const el = $('[data-dock]');
  const hero = $('[data-hero]') || $('.guide__head');
  const contact = $('#iletisim, #contact, .cta-box');
  if (!el || !hero || !('IntersectionObserver' in window)) return;
  const seen = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting));
    el.classList.toggle('is-on', !seen.get(hero) && !seen.get(contact));
  });
  io.observe(hero);
  if (contact) io.observe(contact);
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
    toast(`${t.dataset.msg} — ${phone}`);
  } catch {
    location.href = `tel:${phone.replace(/\s/g, '')}`;
  }
}

/* ── Command palette (⌘K / Ctrl K / "/") ──────────────────────────────────── */
function palette() {
  const dlg = $('[data-palette]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const input = $('[data-palette-input]', dlg);
  const opts = $$('.palette__opt', dlg);
  const groups = $$('.palette__group', dlg);
  const empty = $('[data-palette-empty]', dlg);
  let visible = opts;
  let active = 0;

  const norm = (s) =>
    s.toLocaleLowerCase(lang).replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');

  const select = (i) => {
    opts.forEach((o) => o.setAttribute('aria-selected', 'false'));
    if (!visible.length) return input.removeAttribute('aria-activedescendant');
    active = (i + visible.length) % visible.length;
    const o = visible[active];
    o.setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', o.id);
    o.scrollIntoView({ block: 'nearest' });
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
    select(0);
  };

  const open = () => {
    if (dlg.open) return;
    input.value = '';
    filter();
    dlg.showModal();
    input.focus();
  };

  const run = (o) => {
    if (!o) return;
    dlg.close();
    const href = o.dataset.href;
    if (href) {
      const external = /^https?:/.test(href) && !href.startsWith(location.origin);
      external ? window.open(href, '_blank', 'noopener') : (location.href = href);
    } else if (o.dataset.action === 'copy') copyPhone();
    else if (o.dataset.action === 'top') scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
  };

  $$('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dlg.open ? dlg.close() : open();
    } else if (e.key === '/' && !dlg.open && !typing) {
      e.preventDefault();
      open();
    }
  });
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
    o.addEventListener('pointermove', () => {
      const i = visible.indexOf(o);
      if (i !== active) select(i);
    });
  });
  dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());

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
      ? 'Kaynağı okuyorsan aynı dili konuşuyoruz. Framework yok, takip yok, sadece el işçiliği.\n→ https://wa.me/905538115033'
      : 'If you are reading the source, we speak the same language. No framework, no tracking, just craft.\n→ https://wa.me/905538115033',
  );
}

// Critical: what the first interaction may need. Everything else waits for idle,
// each in its own task, so no single task ever blocks the main thread for long.
header();
palette();
vitals();
seam();
for (const fn of [dock, pointer, clock, hello]) idle(fn);
