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

const image = (url, c, alt) => ({
  '@type': 'ImageObject',
  '@id': `${url}#primaryimage`,
  url: `${O}/og/og-${c.lang}${alt ? '-guide' : ''}.jpg`,
  contentUrl: `${O}/og/og-${c.lang}${alt ? '-guide' : ''}.jpg`,
  width: 1200,
  height: 630,
  caption: alt || c.meta.ogAlt,
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
      image(url, c),
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
    ['Search Engine Optimization', 'SEO'],
    ['Answer Engine Optimization', 'AEO'],
    ['Generative Engine Optimization', 'GEO'],
    ['llms.txt', 'llms.txt'],
    ['Core Web Vitals', 'CWV'],
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...core(c),
      image(url, c, g.meta.ogAlt),
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
        about: terms.map(([name]) => ({ '@id': `${url}#term-${name.toLowerCase().replace(/[^a-z]+/g, '-')}` })),
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
        '@id': `${url}#terms`,
        name: c.lang === 'tr' ? 'Arama ve yapay zekâ görünürlüğü terimleri' : 'Search & AI visibility terms',
        hasDefinedTerm: terms.map(([name, code]) => ({
          '@type': 'DefinedTerm',
          '@id': `${url}#term-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`,
          name,
          termCode: code,
          inDefinedTermSet: { '@id': `${url}#terms` },
        })),
      },
      faqNode(url, g.faq, c, c.inLanguage),
    ],
  };
}
