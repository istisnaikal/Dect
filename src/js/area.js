// ─────────────────────────────────────────────────────────────────────────────
//  The service area: find a province or a district, or open a province to see
//  its districts, then write from there. The 973 district names are not in the
//  page: they arrive in one small file the first time anyone asks (a focus on the
//  search, or a province opened), and stay in memory. Every node is built with
//  DOM APIs, so the page's Trusted Types policy never has to bend.
// ─────────────────────────────────────────────────────────────────────────────

const d = document;
const $ = (s, el = d) => el.querySelector(s);
const make = (tag, cls, text) => {
  const e = d.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
// Turkish-aware matching: "ercis" finds Erciş, "IGDIR" finds Iğdır, "istanbul" finds İstanbul.
const fold = (s) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const fmt = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
const calm = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
// Put a fresh card where it can be read and used: never under the header or the floating buttons.
const reveal = (box) => requestAnimationFrame(() => box.scrollIntoView({ block: 'nearest', behavior: calm() }));
const MAX = 8;

export function start(root) {
  const t = JSON.parse(root.dataset.t);
  const input = $('#area-q', root);
  const list = $('#area-opts', root);
  const result = $('[data-area-result]', root);
  const waIcon = $('.cta-box .btn .i', root);
  let provinces = null;
  let index = [];
  let loading = null;
  let shown = [];
  let active = -1;

  const load = () =>
    (loading ||= fetch(root.dataset.src)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rows) => {
        provinces = rows.map(([plate, name, metro, ds]) => ({ plate, name, metro, ds }));
        index = provinces.flatMap((p) => [
          { p, key: fold(p.name) },
          ...p.ds.map((dn) => ({ p, dn, key: fold(dn === t.merkez ? `${p.name} ${dn}` : dn) })),
        ]);
        return provinces;
      })
      .catch((e) => {
        loading = null;
        throw e;
      }));

  const place = (it) => (it.dn ? `${it.dn}, ${it.p.name}` : it.p.name);
  const waHref = (where) => `https://wa.me/${root.dataset.waTo}?text=${encodeURIComponent(fmt(t.message, { place: where }))}`;

  // A card that says, in one line, that the place is covered, and offers the next step.
  const card = (it) => {
    const box = make('div', 'area__card');
    const ok = make('p', 'area__ok');
    ok.append(make('span', 'area__mark'), make('span', null, it.dn ? fmt(t.district, { d: it.dn, p: it.p.name }) : fmt(t.whole, { p: it.p.name, n: it.p.ds.length })));
    box.append(ok, make('p', 'area__sub', t.sub));
    const actions = make('div', 'area__actions');
    const a = make('a', 'btn btn--primary');
    a.href = waHref(place(it));
    a.target = '_blank';
    a.rel = 'noopener';
    a.dataset.wa = '';
    if (waIcon) a.append(waIcon.cloneNode(true));
    const label = make('span', null, t.cta);
    label.dataset.label = '';
    a.append(label);
    actions.append(a);
    if (!it.dn) {
      const open = make('button', 'btn btn--ghost', fmt(t.open, { p: it.p.name }));
      open.type = 'button';
      open.addEventListener('click', () => {
        const det = d.getElementById(`il-${it.p.plate}`);
        if (!det) return;
        det.open = true;
        det.scrollIntoView({ block: 'start', behavior: calm() });
        $('summary', det).focus({ preventScroll: true });
      });
      actions.append(open);
    }
    box.append(actions);
    return box;
  };

  // ── Search: a combobox over 81 provinces and 973 districts ──
  const close = () => {
    list.hidden = true;
    list.replaceChildren();
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    shown = [];
    active = -1;
  };
  const mark = (i) => {
    active = i;
    [...list.children].forEach((o, j) => o.setAttribute('aria-selected', String(j === i)));
    if (i < 0) return input.removeAttribute('aria-activedescendant');
    input.setAttribute('aria-activedescendant', list.children[i].id);
    list.children[i].scrollIntoView({ block: 'nearest' });
  };
  // Best first: the whole name › its start › the start of a word › anywhere; a province before
  // its namesake district, a shorter name before a longer one.
  const tier = (key, q) => (key === q ? 0 : key.startsWith(q) ? 1 : key.split(' ').some((w) => w.startsWith(q)) ? 2 : key.includes(q) ? 3 : -1);
  const search = () => {
    const q = fold(input.value);
    if (!q) {
      close();
      result.replaceChildren();
      return;
    }
    shown = index
      .map((it, i) => [it, tier(it.key, q), i])
      .filter(([, r]) => r >= 0)
      .sort((a, b) => a[1] - b[1] || !!a[0].dn - !!b[0].dn || a[0].key.length - b[0].key.length || a[2] - b[2])
      .slice(0, MAX)
      .map(([it]) => it);
    if (!shown.length) {
      close();
      result.replaceChildren(make('p', 'area__none', t.none));
      return;
    }
    result.replaceChildren();
    list.replaceChildren(
      ...shown.map((it, i) => {
        const o = make('li', 'area__opt');
        o.id = `area-o-${i}`;
        o.setAttribute('role', 'option');
        o.setAttribute('aria-selected', 'false');
        o.append(
          make('span', 'area__opt-name', it.dn ? (it.dn === t.merkez ? `${it.p.name} ${it.dn}` : it.dn) : it.p.name),
          make('span', 'area__opt-meta', it.dn ? it.p.name : `${t.province} · ${fmt(t.count, { n: it.p.ds.length })}`),
        );
        return o;
      }),
    );
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    mark(0);
  };
  const choose = (i) => {
    const it = shown[i];
    if (!it) return;
    input.value = place(it);
    close();
    const box = card(it);
    result.replaceChildren(box);
    reveal(box);
  };

  const ready = () => load().then(search, () => result.replaceChildren(failed()));
  input.addEventListener('focus', () => load().catch(() => {}), { once: true });
  input.addEventListener('input', ready);
  input.addEventListener('keydown', (e) => {
    const open = !list.hidden;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return ready();
      mark((active + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length);
    } else if (e.key === 'Enter') {
      if (open) {
        e.preventDefault();
        choose(Math.max(0, active));
      }
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        close();
      } else if (input.value) {
        e.preventDefault();
        input.value = '';
        result.replaceChildren();
      }
    } else if (e.key === 'Tab') close();
  });
  input.addEventListener('blur', () => setTimeout(() => d.activeElement !== input && close(), 120));
  // Keep focus in the field while an option is chosen with a pointer.
  list.addEventListener('pointerdown', (e) => e.preventDefault());
  list.addEventListener('click', (e) => {
    const o = e.target.closest('[role=option]');
    if (o) choose([...list.children].indexOf(o));
  });

  // ── Provinces: districts appear when one is opened ──
  const failed = () => {
    const p = make('p', 'area__none', `${t.failed} `);
    const a = make('a', null, t.md);
    a.href = t.md;
    p.append(a);
    return p;
  };
  const fill = (det) => {
    const body = $('.prov__body', det);
    if (!body || body.childElementCount) return;
    const plate = det.id.slice(3);
    load().then(
      () => {
        const p = provinces.find((x) => x.plate === plate);
        if (!p || body.childElementCount) return;
        const ul = make('ul', 'prov__list');
        const slot = make('div', 'prov__result');
        slot.setAttribute('aria-live', 'polite');
        for (const dn of p.ds) {
          const li = make('li');
          const b = make('button', 'prov__d', dn);
          b.type = 'button';
          b.addEventListener('click', () => {
            ul.querySelectorAll('[aria-pressed=true]').forEach((x) => x.setAttribute('aria-pressed', 'false'));
            b.setAttribute('aria-pressed', 'true');
            const box = card({ p, dn });
            slot.replaceChildren(box);
            reveal(box);
          });
          b.setAttribute('aria-pressed', 'false');
          li.append(b);
          ul.append(li);
        }
        body.append(ul, slot);
      },
      () => body.replaceChildren(failed()),
    );
  };
  // `toggle` does not bubble; a capturing listener on the page hears every province.
  root.addEventListener('toggle', (e) => e.target.matches?.('.prov[open]') && fill(e.target), true);
  root.querySelectorAll('.prov[open]').forEach(fill);
  // The hand is on its way to a province: fetch now, so its districts are there when it opens.
  const grid = $('.area__grid', root);
  for (const ev of ['pointerover', 'focusin']) grid?.addEventListener(ev, () => load().catch(() => {}), { once: true });
  if (input.value) ready();
}
