// JSON-LD knowledge graph. One @graph per page; every node linked by @id so
// search engines and LLMs resolve "Eyüp", "DevArt", the site and the work into
// a single, unambiguous entity.

import { site, work, wa } from './site.config.mjs';
import { plain, fill } from './templates.mjs';

const O = site.origin;
const ID = {
  website: `${O}/#website`,
  person: `${O}/#person`,
  org: `${O}/#devart`,
  logo: `${O}/#logo`,
};

const KNOWS = [
  'Web design',
  'Web development',
  'Search engine optimization (SEO)',
  'Answer engine optimization (AEO)',
  'Generative engine optimization (GEO)',
  'Core Web Vitals',
  'Web performance',
  'WebGL',
  'Creative coding',
  'Schema.org structured data',
  'Accessibility',
  'UI/UX design',
  'Local SEO',
];

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
      areaServed: [{ '@type': 'Country', name: 'Türkiye' }, 'Worldwide'],
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
        name: c.services.label,
        itemListElement: c.services.items.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: plain(s.title),
            description: plain(s.text),
            provider: { '@id': ID.org },
            areaServed: 'Worldwide',
          },
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
        significantLink: [`${O}${c.guidePath}`, `${O}${c.glossaryPath}`],
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
