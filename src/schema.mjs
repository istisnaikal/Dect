// JSON-LD knowledge graph. One @graph per page; every node linked by @id so
// search engines and LLMs resolve "Eyüp", "DevArt", the site and the work into
// a single, unambiguous entity.

import { services } from './content/services.mjs';
import { site, work, wa } from './site.config.mjs';
import { fill, plain, svcContent, svcPath, termName } from './templates.mjs';

const O = site.origin;
const ID = {
  website: `${O}/#website`,
  person: `${O}/#person`,
  org: `${O}/#devart`,
  logo: `${O}/#logo`,
};

// Every concept is pinned to its Wikidata item, so "GEO" can never be read as geography
// and "DevArt" can never be confused with another studio. Ids verified on wikidata.org.
const WD = (q) => `https://www.wikidata.org/wiki/${q}`;
const thing = ([q, name]) => ({ '@type': 'Thing', name, sameAs: WD(q) });
const KNOWS = [
  ['Q190637', 'Web design'],
  ['Q386275', 'Web development'],
  ['Q4130556', 'Front-end development'],
  ['Q110245837', 'Back-end development'],
  ['Q135707', 'User interface design'],
  ['Q11248500', 'User experience design'],
  ['Q11285657', 'Art direction'],
  ['Q180711', 'Search engine optimization'],
  ['Q30324357', 'Local search engine optimization'],
  ['Q97171941', 'Answer engine optimization'],
  ['Q134083964', 'Generative engine optimization'],
  ['Q7978612', 'Web performance optimization'],
  ['Q104618838', 'Core Web Vitals'],
  ['Q808932', 'Web accessibility'],
  ['Q375913', 'WebGL'],
  ['Q17087654', 'Creative coding'],
  ['Q3475322', 'Schema.org'],
].map(thing);
const AREA = [{ '@type': 'Country', name: 'Türkiye', sameAs: WD('Q43') }, 'Worldwide'];
const svcUrl = (lang, id) => `${O}${svcPath(lang, id)}`;
const svcRef = (c, id) => ({ '@type': 'Service', '@id': `${svcUrl(c.lang, id)}#service`, name: svcContent(c.lang).items[id].name, url: svcUrl(c.lang, id) });

const sameAs = site.sameAs.length ? { sameAs: site.sameAs } : {};

function core(c) {
  return [
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: `${O}/`,
      name: site.name,
      alternateName: ['DevArt', 'eyupdevart'],
      description: c.meta.description,
      inLanguage: ['tr-TR', 'en'],
      publisher: { '@id': ID.org },
      author: { '@id': ID.person },
    },
    {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: `${O}/icon-512.png`,
      contentUrl: `${O}/icon-512.png`,
      width: 512,
      height: 512,
      caption: site.name,
    },
    {
      '@type': 'Person',
      '@id': ID.person,
      name: site.person.name,
      alternateName: site.person.alternateName,
      url: `${O}/`,
      image: { '@id': ID.logo },
      jobTitle: c.lang === 'tr' ? 'Web Geliştirici ve Dijital Sanatçı' : 'Web Developer & Digital Artist',
      hasOccupation: {
        '@type': 'Occupation',
        name: c.lang === 'tr' ? 'Web geliştirici ve tasarımcı' : 'Web developer and designer',
        occupationalCategory: '15-1254.00 Web Developers',
        sameAs: WD('Q6859454'),
        skills: 'Web design, web development, SEO, AEO, GEO, web performance, WebGL',
      },
      description: c.short.a,
      telephone: site.phone.e164,
      knowsAbout: KNOWS,
      knowsLanguage: ['tr', 'en'],
      address: { '@type': 'PostalAddress', addressCountry: site.country },
      worksFor: { '@id': ID.org },
      ...sameAs,
    },
    {
      '@type': 'Organization',
      '@id': ID.org,
      name: 'DevArt',
      alternateName: [site.name, 'Eyüp DevArt'],
      url: `${O}/`,
      logo: { '@id': ID.logo },
      image: `${O}/og/og-${c.lang}.jpg`,
      description: c.meta.description,
      slogan: c.lang === 'tr' ? 'Geliştirici + Sanatçı' : 'Developer + Artist',
      founder: { '@id': ID.person },
      telephone: site.phone.e164,
      address: { '@type': 'PostalAddress', addressCountry: site.country },
      areaServed: AREA,
      knowsAbout: KNOWS,
      knowsLanguage: ['tr', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: site.phone.e164,
        url: wa(),
        availableLanguage: ['Turkish', 'English'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        '@id': `${O}${c.servicesPath}#catalog`,
        name: svcContent(c.lang).hub.crumb,
        url: `${O}${c.servicesPath}`,
        itemListElement: services.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { ...svcRef(c, s.id), description: svcContent(c.lang).items[s.id].summary, provider: { '@id': ID.org } },
        })),
      },
      ...sameAs,
    },
  ];
}

const image = (url, c, alt, kind = '') => ({
  '@type': 'ImageObject',
  '@id': `${url}#primaryimage`,
  url: `${O}/og/og-${c.lang}${kind ? `-${kind}` : ''}.jpg`,
  contentUrl: `${O}/og/og-${c.lang}${kind ? `-${kind}` : ''}.jpg`,
  width: 1200,
  height: 630,
  caption: alt || c.meta.ogAlt,
  creditText: site.name,
  copyrightNotice: `© ${site.updated.slice(0, 4)} ${site.name}`,
});

// The other-language twin of a page, declared as a translation (TR is the original).
const twin = (c, type, trUrl, enUrl, frag) =>
  c.lang === 'tr'
    ? { workTranslation: { '@type': type, '@id': `${enUrl}${frag}`, url: enUrl, inLanguage: 'en' } }
    : { translationOfWork: { '@type': type, '@id': `${trUrl}${frag}`, url: trUrl, inLanguage: 'tr-TR' } };

const GLOSSARY = { tr: `${O}/sozluk/`, en: `${O}/en/glossary/` };
const glossaryTerm = (c, id, name) => ({
  '@type': 'DefinedTerm',
  '@id': `${GLOSSARY[c.lang]}#${id}`,
  name,
  url: `${GLOSSARY[c.lang]}#${id}`,
  inDefinedTermSet: { '@id': `${GLOSSARY[c.lang]}#terms` },
});

const faqNode = (url, items, c, inLanguage) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  url,
  inLanguage,
  isPartOf: { '@id': ID.website },
  mainEntity: items.map((it) => ({
    '@type': 'Question',
    name: plain(it.q),
    acceptedAnswer: { '@type': 'Answer', text: plain(fill(it.a, c)) },
  })),
});

export function homeGraph(c, url) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, '', ''),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.person },
        mainEntity: { '@id': ID.person },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        datePublished: site.published,
        dateModified: site.updated,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [`#${c.short.id}-q`, `#${c.short.id}-answer`],
        },
        hasPart: [{ '@id': `${url}#faq` }, { '@id': `${url}#work` }],
        significantLink: [`${O}${c.servicesPath}`, `${O}${c.guidePath}`, `${O}${c.glossaryPath}`],
        ...twin(c, 'ProfilePage', `${O}/`, `${O}/en/`, '#webpage'),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#work`,
        name: c.work.label,
        itemListElement: work.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebSite',
            name: p.name,
            url: p.url,
            description: plain(c.work.items[p.slug].summary),
            creator: { '@id': ID.person },
            publisher: { '@type': 'Organization', name: p.name },
          },
        })),
      },
      faqNode(url, c.faq.items, c, c.inLanguage),
    ],
  };
}

export function guideGraph(c, url, { words, homeUrl }) {
  const g = c.guide;
  const terms = [
    ['seo', 'SEO'],
    ['aeo', 'AEO'],
    ['geo', 'GEO'],
    ['llms-txt', 'llms.txt'],
    ['core-web-vitals', 'Core Web Vitals'],
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, g.meta.ogAlt, 'guide'),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: g.meta.title,
        description: g.meta.description,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': ID.website },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        datePublished: site.published,
        dateModified: site.updated,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#tldr-answer'] },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.ui.home, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: g.crumb, item: url },
        ],
      },
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: plain(g.h1),
        alternativeHeadline: g.meta.title,
        description: g.meta.description,
        abstract: g.tldr,
        inLanguage: c.inLanguage,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        image: { '@id': `${url}#primaryimage` },
        author: { '@id': ID.person },
        publisher: { '@id': ID.org },
        datePublished: site.published,
        dateModified: site.updated,
        wordCount: words,
        isAccessibleForFree: true,
        proficiencyLevel: 'Beginner',
        about: terms.map(([id, name]) => glossaryTerm(c, id, name)),
        ...twin(c, 'TechArticle', `${O}/rehber/aeo-geo/`, `${O}/en/guide/aeo-geo/`, '#article'),
        citation: [
          {
            '@type': 'ScholarlyArticle',
            name: 'GEO: Generative Engine Optimization',
            author: 'Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan, Ameet Deshpande',
            datePublished: '2023',
            url: 'https://arxiv.org/abs/2311.09735',
          },
          { '@type': 'CreativeWork', name: 'The /llms.txt file', url: 'https://llmstxt.org/' },
          { '@type': 'CreativeWork', name: 'Web Vitals', url: 'https://web.dev/articles/vitals' },
        ],
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${GLOSSARY[c.lang]}#terms`,
        url: GLOSSARY[c.lang],
        name: c.lang === 'tr' ? 'Bulunmanın sözlüğü' : 'A glossary of being found',
      },
      faqNode(url, g.faq, c, c.inLanguage),
    ],
  };
}

export function glossaryGraph(c, g, url, { terms, homeUrl }) {
  const nameOf = (t) => g.terms[t.id].name || t.name;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, g.meta.ogAlt, 'glossary'),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: g.meta.title,
        description: g.meta.description,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': ID.website },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: { '@id': `${url}#terms` },
        author: { '@id': ID.person },
        datePublished: site.updated,
        dateModified: site.updated,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.gterm__short'] },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.ui.home, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: g.crumb, item: url },
        ],
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${url}#terms`,
        url,
        name: plain(g.h1),
        description: g.meta.description,
        inLanguage: c.inLanguage,
        creator: { '@id': ID.person },
        publisher: { '@id': ID.org },
        ...twin(c, 'DefinedTermSet', GLOSSARY.tr, GLOSSARY.en, '#terms'),
        hasDefinedTerm: terms.map((t) => ({
          '@type': 'DefinedTerm',
          '@id': `${url}#${t.id}`,
          name: nameOf(t),
          alternateName: g.terms[t.id].aka,
          description: plain(g.terms[t.id].short),
          url: `${url}#${t.id}`,
          inDefinedTermSet: { '@id': `${url}#terms` },
        })),
      },
    ],
  };
}

const SERVICES = { tr: `${O}/hizmetler/`, en: `${O}/en/services/` };
const crumbList = (url, items) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

export function servicesHubGraph(c, url, { homeUrl }) {
  const h = svcContent(c.lang).hub;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, h.meta.ogAlt, 'services'),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: h.meta.title,
        description: h.meta.description,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.org },
        mainEntity: { '@id': `${url}#catalog` },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        significantLink: services.map((s) => svcUrl(c.lang, s.id)),
        datePublished: site.updated,
        dateModified: site.updated,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#answer'] },
        ...twin(c, 'CollectionPage', SERVICES.tr, SERVICES.en, '#webpage'),
      },
      crumbList(url, [[c.ui.home, homeUrl], [h.crumb, url]]),
      faqNode(url, h.faq, c, c.inLanguage),
    ],
  };
}

export function serviceGraph(c, id, url, { homeUrl }) {
  const sv = svcContent(c.lang);
  const s = services.find((x) => x.id === id);
  const it = sv.items[id];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, it.name, `svc-${id}`),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: it.meta.title,
        description: it.meta.description,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': ID.website },
        mainEntity: { '@id': `${url}#service` },
        about: [...s.wikidata.map(thing), ...s.terms.map((t) => glossaryTerm(c, t, termName(c.lang, t)))],
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        relatedLink: s.related.map((r) => svcUrl(c.lang, r)),
        datePublished: site.updated,
        dateModified: site.updated,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#answer'] },
        ...twin(c, 'WebPage', svcUrl('tr', id), svcUrl('en', id), '#webpage'),
      },
      crumbList(url, [[c.ui.home, homeUrl], [sv.hub.crumb, SERVICES[c.lang]], [it.crumb, url]]),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: it.name,
        serviceType: it.serviceType,
        description: plain(fill(it.answer, c)),
        disambiguatingDescription: it.summary,
        url,
        image: { '@id': `${url}#primaryimage` },
        provider: { '@id': ID.org },
        areaServed: AREA,
        audience: { '@type': 'Audience', audienceType: it.facts.for.replaceAll(' · ', ', ') },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: wa(it.wa),
          servicePhone: { '@type': 'ContactPoint', telephone: site.phone.e164, contactType: 'sales' },
          availableLanguage: ['Turkish', 'English'],
        },
        isRelatedTo: s.related.map((r) => svcRef(c, r)),
        subjectOf: { '@id': `${url}#faq` },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${GLOSSARY[c.lang]}#terms`,
        url: GLOSSARY[c.lang],
        name: c.lang === 'tr' ? 'Bulunmanın sözlüğü' : 'A glossary of being found',
      },
      faqNode(url, it.faq, c, c.inLanguage),
    ],
  };
}
