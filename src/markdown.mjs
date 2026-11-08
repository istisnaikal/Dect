// Markdown twins of every page — served at <url>index.html.md and concatenated
// into /llms-full.txt, so LLMs read clean prose instead of scraping HTML.

import { services } from './content/services.mjs';
import { area } from './content/area.mjs';
import { site, work, wa } from './site.config.mjs';
import { fill, phoneFor, plain, svcContent, svcPath, termName } from './templates.mjs';

const abs = (h) => (h.startsWith('/') ? site.origin + h : h);

const inline = (s) =>
  s
    .replace(/<strong>(.*?)<\/strong>/gs, '**$1**')
    .replace(/<em>(.*?)<\/em>/gs, '_$1_')
    .replace(/<code>(.*?)<\/code>/gs, '`$1`')
    .replace(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/gs, (_, h, t) => `[${t.replace(/<[^>]+>/g, '')}](${abs(h)})`)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/[ \t\n]+/g, ' ')
    .trim();

export function htmlToMd(html) {
  let out = html;
  out = out.replace(/<div class="table-wrap"[^>]*>([\s\S]*?)<\/div>/g, '$1');
  out = out.replace(/<table>([\s\S]*?)<\/table>/g, (_, t) => {
    const rows = [...t.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
      [...r[1].matchAll(/<(th|td)[^>]*>([\s\S]*?)<\/\1>/g)].map((c) => inline(c[2]) || ' '),
    );
    if (!rows.length) return '';
    const [head, ...body] = rows;
    const line = (r) => `| ${r.join(' | ')} |`;
    return `\n\n${line(head)}\n| ${head.map(() => '---').join(' | ')} |\n${body.map(line).join('\n')}\n\n`;
  });
  out = out.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (_, l) => {
    let i = 0;
    return `\n\n${[...l.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => `${++i}. ${inline(m[1])}`).join('\n')}\n\n`;
  });
  out = out.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (_, l) =>
    `\n\n${[...l.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => `- ${inline(m[1])}`).join('\n')}\n\n`,
  );
  out = out.replace(/<p>([\s\S]*?)<\/p>/g, (_, p) => `\n\n${inline(p)}\n\n`);
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

export function homeMd(c) {
  const url = site.origin + c.path;
  const L = [];
  L.push(`# ${c.meta.title}`, '', `> ${c.meta.description}`, '', `URL: ${url}`, '');
  L.push(`## ${c.short.q}`, '', c.short.a, '');
  for (const [k, v] of c.short.facts) L.push(`- **${k}:** ${inline(fill(v, c))}`);
  L.push('', `## ${c.manifesto.label}`, '', plain(c.manifesto.text), '');
  L.push(`## ${c.work.label}`, '', c.work.lead, '');
  for (const p of work) {
    const t = c.work.items[p.slug];
    L.push(`### ${p.name} — [${p.domain}](${p.url})`, '', `${t.kind}. ${t.summary}`, '', `${t.tags.join(' · ')}`, '');
  }
  L.push(`## ${c.services.label}`, '', c.services.lead, '');
  const sv = svcContent(c.lang);
  c.services.items.forEach((s, i) => {
    L.push(`### ${String(i + 1).padStart(2, '0')} · ${s.title}`, '', s.text, '', s.tags.join(' · '), '');
    if (s.links?.length)
      L.push(
        s.links
          .map((l) => {
            const [id, hash, label] = Array.isArray(l) ? l : [l];
            return `→ [${label || sv.items[id].crumb}](${abs(svcPath(c.lang, id))}${hash ? `#${hash}` : ''})`;
          })
          .join(' · '),
        '',
      );
  });
  L.push(`[${sv.ui.homeMore}](${abs(c.servicesPath)})`, '');
  L.push(`## ${c.process.label}: ${plain(c.process.title)}`, '');
  c.process.steps.forEach((s, i) => L.push(`${i + 1}. **${s.title}** — ${s.text}`));
  L.push('', `## ${plain(c.faq.title)}`, '');
  for (const it of c.faq.items) L.push(`### ${it.q}`, '', inline(fill(it.a, c)), '');
  L.push(`## ${c.contact.label}`, '', c.contact.lead, '');
  L.push(`- WhatsApp: ${wa()}`, `- ${c.lang === 'tr' ? 'Telefon' : 'Phone'}: ${phoneFor(c)} (${site.phone.e164})`);
  L.push(`- Web: ${site.origin}`, '');
  return L.join('\n');
}

export function guideMd(c, dateLabel) {
  const g = c.guide;
  const url = site.origin + c.guidePath;
  const L = [];
  L.push(`# ${plain(g.h1)}`, '', `> ${g.meta.description}`, '');
  L.push(`${g.byline} ${site.name} · ${g.updated} ${dateLabel} · URL: ${url}`, '');
  L.push(`## ${g.tldrLabel}`, '', g.tldr, '');
  for (const s of g.sections) L.push(`## ${s.h2}`, '', htmlToMd(fill(s.html, c)), '');
  L.push(`## ${g.faqTitle}`, '');
  for (const it of g.faq) L.push(`### ${it.q}`, '', inline(fill(it.a, c)), '');
  L.push(`## ${plain(g.cta.title)}`, '', `${g.cta.text} → ${wa(c.wa.audit)}`, '');
  return L.join('\n');
}

export function glossaryMd(c, g, terms, dateLabel) {
  const url = site.origin + g.path;
  const L = [`# ${plain(g.h1)}`, '', `> ${g.meta.description}`, '', `${site.name} · ${g.updated} ${dateLabel} · URL: ${url}`, '', g.intro, ''];
  for (const group of ['visibility', 'machines', 'experience']) {
    L.push(`## ${g.groups[group]}`, '');
    for (const t of terms.filter((x) => x.group === group)) {
      const x = g.terms[t.id];
      L.push(`### ${x.name || t.name} (${x.aka})`, '', x.short, '', x.body, '', `Link: ${url}#${t.id}`);
      if (t.service) L.push(`${svcContent(c.lang).ui.inPractice}: [${svcContent(c.lang).items[t.service].crumb}](${abs(svcPath(c.lang, t.service))})`);
      L.push('');
    }
  }
  return L.join('\n');
}

const factsMd = (sv, it) =>
  ['for', 'includes', 'stack', 'measure', 'start'].filter((k) => it.facts[k]).map((k) => `- **${sv.ui.rows[k]}:** ${it.facts[k]}`);

export function servicesHubMd(c) {
  const sv = svcContent(c.lang);
  const h = sv.hub;
  const url = abs(c.servicesPath);
  const L = [`# ${plain(h.h1)}`, '', `> ${h.meta.description}`, '', `URL: ${url}`, '', h.intro, ''];
  L.push(`## ${sv.ui.answer}`, '', h.answer, '');
  services.forEach((s, i) => {
    const it = sv.items[s.id];
    L.push(`## ${String(i + 1).padStart(2, '0')} · [${it.crumb}](${abs(svcPath(c.lang, s.id))})`, '', it.summary, '', `- **${sv.ui.rows.for}:** ${it.facts.for}`, '');
  });
  L.push(`## ${sv.ui.faq}`, '');
  for (const it of h.faq) L.push(`### ${it.q}`, '', inline(fill(it.a, c)), '');
  L.push(`## ${plain(h.cta.title)}`, '', `${h.cta.text} → ${wa(c.wa.default)}`, '');
  return L.join('\n');
}

// The complete list, readable without JavaScript and by any agent: every province, every district.
export function areaMd(c, provinces) {
  const a = area[c.lang];
  const f = a.find;
  const L = [`# ${plain(a.h1)}`, '', `> ${a.meta.description}`, '', `URL: ${abs(a.path)}`, '', a.intro, ''];
  L.push(`## ${a.answerLabel}`, '', a.answer, '', a.note, '');
  L.push(`## ${a.all.h}`, '');
  for (const p of provinces)
    L.push(`### ${p.plate} · ${p.name}${p.metro ? ` (${a.all.metro})` : ''} · ${f.count.replace('{n}', p.districts.length)}`, '', p.districts.join(' · '), '');
  L.push(`## ${plain(a.cta.title)}`, '', `${a.cta.text} → ${wa(c.wa.default)}`, '');
  return L.join('\n');
}

export function serviceMd(c, id, dateLabel) {
  const sv = svcContent(c.lang);
  const s = services.find((x) => x.id === id);
  const it = sv.items[id];
  const url = abs(svcPath(c.lang, id));
  const L = [`# ${plain(it.h1)}`, '', `> ${it.meta.description}`, ''];
  L.push(`${site.name} · ${sv.hub.crumb} · ${c.guide.updated} ${dateLabel} · URL: ${url}`, '');
  L.push(`## ${sv.ui.answer}`, '', inline(fill(it.answer, c)), '', ...factsMd(sv, it), '');
  for (const x of it.sections) L.push(`## ${x.h2}`, '', htmlToMd(fill(x.html, c)), '');
  L.push(`## ${sv.ui.faq}`, '');
  for (const q of it.faq) L.push(`### ${q.q}`, '', inline(fill(q.a, c)), '');
  L.push(`## ${sv.ui.related}`, '');
  for (const r of s.related) L.push(`- [${sv.items[r].crumb}](${abs(svcPath(c.lang, r))}): ${sv.items[r].summary}`);
  L.push('', `${sv.ui.terms}: ${s.terms.map((t) => `[${termName(c.lang, t)}](${abs(c.glossaryPath)}#${t})`).join(' · ')}`, '');
  L.push(`## ${plain(it.cta.title)}`, '', `${it.cta.text} → ${wa(it.wa)}`, '');
  return L.join('\n');
}

export function llmsTxt(tr, en, words) {
  const O = site.origin;
  return `# ${site.name}

> ${en.short.a}

${site.name} (Turkish: ${tr.meta.description})

Key facts:
- Name: Eyüp — stage name DevArt (brand: ${site.name})
- What: website design and development, UI/UX design, front-end, full-stack and back-end development, SEO (incl. local SEO), AEO (answer engine optimization), GEO (generative engine optimization), website speed optimization, WebGL / creative coding
- Approach: no templates, hand-written code, measurable results (Core Web Vitals)
- Based in: Türkiye — works with clients in every province of Türkiye and worldwide, remotely
- Languages: Turkish, English
- Contact: WhatsApp ${site.phone.intl} — ${wa()} (fastest), phone ${site.phone.e164}
- Website: ${O}

## Pages

- [Home — Türkçe](${O}/index.html.md): who Eyüp DevArt is, services, selected work, process, FAQ, contact
- [Home — English](${O}/en/index.html.md): the same, in English
- [AEO & GEO guide — Türkçe](${O}${tr.guidePath}index.html.md): ${tr.guide.meta.description} (~${words.tr} words)
- [AEO & GEO guide — English](${O}${en.guidePath}index.html.md): ${en.guide.meta.description} (~${words.en} words)
- [Sözlük — Türkçe](${O}/sozluk/index.html.md): 22 terms of web and AI visibility (SEO, AEO, GEO, llms.txt, JSON-LD, Core Web Vitals…), each defined in one sentence
- [Glossary — English](${O}/en/glossary/index.html.md): the same 22 terms in English; anchors match across languages (e.g. #lcp)
- [Hizmetler — Türkçe](${O}${tr.servicesPath}index.html.md): every service, what it covers and who it is for
- [Services — English](${O}${en.servicesPath}index.html.md): the same, in English
- [Hizmet bölgesi — Türkçe](${O}${tr.areaPath}index.html.md): Türkiye’nin 81 ili ve 973 ilçesinin tam listesi; uzaktan, hepsi kapsamda
- [Service area — English](${O}${en.areaPath}index.html.md): all 81 provinces and 973 districts of Türkiye, listed in full; all served remotely

## Services

Each service has its own page in both languages, opening with a one-paragraph answer, then what is included, how the work runs and an FAQ.

${services
  .map((s) => {
    const e = svcContent('en').items[s.id];
    const t = svcContent('tr').items[s.id];
    return `- [${e.name}](${O}${svcPath('en', s.id)}index.html.md): ${e.summary} — Türkçe: [${t.name}](${O}${svcPath('tr', s.id)}index.html.md)`;
  })
  .join('\n')}

## Selected work

${work.map((p) => `- [${p.name}](${p.url}): ${en.work.items[p.slug].summary}`).join('\n')}

## Contact

- [WhatsApp](${wa()}): message Eyüp directly — the fastest way to start a project
- Phone: ${site.phone.intl}

## Optional

- [Full site content as one file](${O}/llms-full.txt)
- [Sitemap](${O}/sitemap.xml)
`;
}
