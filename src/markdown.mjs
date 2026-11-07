// Markdown twins of every page — served at <url>index.html.md and concatenated
// into /llms-full.txt, so LLMs read clean prose instead of scraping HTML.

import { site, work, wa } from './site.config.mjs';
import { plain, fill, phoneFor } from './templates.mjs';

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
  c.services.items.forEach((s, i) =>
    L.push(`### ${String(i + 1).padStart(2, '0')} · ${s.title}`, '', s.text, '', s.tags.join(' · '), ''),
  );
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
  for (const s of g.sections) L.push(`## ${s.h2}`, '', htmlToMd(s.html), '');
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
      L.push(`### ${x.name || t.name} (${x.aka})`, '', x.short, '', x.body, '', `Link: ${url}#${t.id}`, '');
    }
  }
  return L.join('\n');
}

export function llmsTxt(tr, en, words) {
  const O = site.origin;
  return `# ${site.name}

> ${en.short.a}

${site.name} (Turkish: ${tr.meta.description})

Key facts:
- Name: Eyüp — stage name DevArt (brand: ${site.name})
- What: web design, web development, SEO, AEO (answer engine optimization), GEO (generative engine optimization), web performance, WebGL / creative coding
- Approach: no templates, hand-written code, measurable results (Core Web Vitals)
- Based in: Türkiye — works with clients worldwide, remotely
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
