// English content — every word on the /en/ pages lives here.
// Markup: *word* → artist type (serif italic) · `word` → developer type (mono)
// {wa} → WhatsApp link · {tel} → phone link · {phone} → number

export default {
  lang: 'en',
  htmlLang: 'en',
  locale: 'en_US',
  inLanguage: 'en',
  path: '/en/',
  guidePath: '/en/guide/aeo-geo/',
  glossaryPath: '/en/glossary/',
  servicesPath: '/en/services/',
  alt: { lang: 'tr', label: 'Türkçe', short: 'TR' },
  dateLocale: 'en-GB',

  meta: {
    title: 'Eyüp DevArt — Web Design, Development & SEO · AEO · GEO',
    description:
      'Eyüp DevArt builds websites by hand, made to measure: they open instantly, get found on Google and come up in AI answers. Say hello on WhatsApp.',
    ogAlt: 'Eyüp DevArt — the line where code meets art',
  },

  wa: {
    default: 'Hi Eyüp, I’m writing from eyupdevart.com. I’d love to talk about a project.',
    project: 'Hi Eyüp, here it is in two sentences:',
    audit: 'Hi Eyüp, could you take a look at my site’s speed, SEO and AI visibility? Here’s the address:',
  },

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'proof', label: 'Proof' },
    { id: 'process', label: 'Process' },
    { id: 'faq', label: 'FAQ' },
  ],

  ui: {
    skip: 'Skip to content',
    home: 'Home',
    menu: 'Menu',
    palette: 'Command palette',
    paletteLabel: 'Search commands',
    palettePlaceholder: 'Where to?',
    paletteEmpty: 'Nothing here. WhatsApp might be quicker.',
    paletteHint: 'navigate · select · close',
    copied: 'Number copied',
    opening: 'Opening WhatsApp…',
    whatsapp: 'Message me on WhatsApp',
    whatsappShort: 'WhatsApp',
    call: 'Call',
    langSwitch: 'Türkçeye geç',
    external: '(opens in a new tab)',
    backTop: 'Back to top',
    copyNumber: 'Copy number',
    close: 'Close',
    rail: 'Work — swipe to browse',
  },

  commands: {
    groupActions: 'Actions',
    groupGo: 'Go to',
    whatsapp: 'Message on WhatsApp',
    call: 'Call by phone',
    copy: 'Copy phone number',
    audit: 'Have me look at your site',
    guide: 'The AEO & GEO guide',
    glossary: 'Glossary: SEO, AEO, GEO terms',
    lang: 'Türkçe sürüm',
    llms: 'llms.txt — the site, summarised for AI',
    top: 'Back to top',
    share: 'Share this page',
  },

  hero: {
    eyebrow: ['Eyüp', 'DevArt', 'Developer + Artist'],
    h1: 'I design like an *artist* and code like an `engineer`.',
    lead: 'I build websites by hand, made to measure. They earn trust the moment they open, they’re easy to find on Google, and they come up when people ask ChatGPT.',
    ctaSecondary: 'See the work first',
    hint: 'Move your cursor — the line is yours',
    hintTouch: 'Drag it — the line is yours',
    chip: 'Opened in {t} seconds on your device',
    chipIdle: 'Measuring on your device…',
    scroll: 'Scroll',
  },

  short: {
    id: 'in-short',
    label: 'In short',
    q: 'Who is Eyüp DevArt?',
    a: 'Eyüp DevArt is a developer and digital artist who both designs and builds websites; DevArt is Eyüp’s stage name. Working with brands and businesses, Eyüp keeps design, code, speed and search visibility in a single pair of hands, so visitors, Google and AI assistants all understand the result at first glance.',
    facts: [
      ['Name', 'Eyüp · stage name DevArt'],
      ['Expertise', '<a href="{svc:web}">Web design</a> · <a href="{svc:fullstack}">Web development</a> · <a href="{svc:seo}">SEO</a>, <a href="{svc:aeo-geo}">AEO, GEO</a> · <a href="{svc:speed}">Performance</a>'],
      ['Approach', 'No templates; every site written from scratch, by hand'],
      ['Based', 'Türkiye, working with clients anywhere, remotely'],
      ['Languages', 'Turkish · English'],
      ['Contact', 'WhatsApp or phone: <a href="{wa}">{phone}</a>'],
    ],
  },

  manifesto: {
    label: 'Manifesto',
    text: 'A template fits everyone, which is exactly why it *suits* no one. I make websites the way a tailor makes a suit: measurements, fittings, every spare `millisecond`\u00a0trimmed.\nSlow to make. *Quick*\u00a0to\u00a0open.',
  },

  work: {
    id: 'work',
    label: 'Selected work',
    title: 'Work, not *words.*',
    lead: 'All live, all for real businesses. The addresses are right there on the cards; go and look for yourself.',
    visit: 'Visit site',
    items: {
      aksu: {
        kind: 'Local service · Company site',
        summary:
          'A tow company in Maltepe, Istanbul, that works around the clock. Built so that someone stranded by the roadside can reach them in a single tap: a short path to WhatsApp, a page for every district, and the calm trust of marble textures and serif type.',
        tags: ['Local SEO', 'Schema.org', 'Next.js', 'AVIF'],
        alt: 'Home page of the Aksu Oto Çekici website: marble texture background, serif headline and a photo of the tow-truck fleet',
      },
      marchetti: {
        kind: 'Brand · Web experience',
        summary: 'A DevArt-signed brand site. Its visual language and its code were both cut from scratch, to the brand’s own measure.',
        tags: ['Brand', 'Design', 'Engineering'],
      },
    },
    next: {
      label: 'Next',
      title: 'The next one could be *yours.*',
      text: 'Tell me what you do and what you’re after, in two sentences. We’ll think the rest through together.',
      cta: 'Send two sentences',
    },
  },

  services: {
    id: 'services',
    label: 'Services',
    title: 'All of it, at *one* desk.',
    lead: 'Design, code, speed and visibility usually live with four different teams. Here they share one desk and one head, so nothing gets lost in the hand-offs.',
    items: [
      {
        title: 'Web design & art direction',
        text: 'I turn your brand’s voice into something you can see: type, colour, motion, white space. Whoever opens the page should know who you are before they spot the logo.',
        tags: ['UI/UX', 'Art direction', 'Motion'],
        links: ['uiux', 'web'],
      },
      {
        title: 'Web development',
        text: 'The code nobody sees deserves as much care as the parts everyone does. Brochure sites, web apps, WebGL pieces or admin panels; all of them light, secure and usable by anyone.',
        tags: ['TypeScript', 'Next.js', 'WebGL', 'Vanilla JS'],
        links: ['web', 'frontend', 'fullstack'],
      },
      {
        title: 'SEO · AEO · GEO',
        text: 'Ranking on Google is good. Being the name that comes up when someone asks ChatGPT, Perplexity or Gemini is better. With technical SEO, structured data, llms.txt and well-built content, I aim for both.',
        tags: ['Technical SEO', 'Schema.org', 'llms.txt'],
        links: ['seo', 'aeo-geo'],
      },
      {
        title: 'Performance engineering',
        text: 'A slow site loses customers before it has even appeared. I get Core Web Vitals green and Lighthouse to the top, so the page is ready before you’ve had time to blink.',
        tags: ['Core Web Vitals', 'Lighthouse', 'CDN'],
        links: ['speed'],
      },
      {
        title: 'Local business & conversion',
        text: 'A tow truck, a dentist, a restaurant: customers look you up on their phones, and they’re in a hurry. I draw them the shortest route, with area pages, Google Business Profile alignment, and one-tap calls and WhatsApp.',
        tags: ['Local SEO', 'WhatsApp', 'Conversion'],
        links: [['seo', 'local-seo', 'Local SEO']],
      },
      {
        title: 'Care & growth',
        text: 'My job doesn’t end on launch day. I measure, update and keep an eye on security, so the site keeps growing as you do.',
        tags: ['Analytics', 'Security', 'Support'],
      },
    ],
  },

  proof: {
    id: 'proof',
    label: 'Proof',
    title: 'This page is its *own proof.*',
    lead: 'I didn’t write these numbers. Your browser measured them while this page was opening, just now, on your own device.',
    metrics: {
      ttfb: 'Time to first byte',
      fcp: 'First contentful paint',
      lcp: 'Largest contentful paint',
      cls: 'Layout shift',
      inp: 'Interaction latency',
      weight: 'Data transferred',
      requests: 'Requests',
      js: 'JavaScript',
    },
    status: {
      good: 'Good',
      ni: 'Needs work',
      poor: 'Poor',
      wait: 'Measuring',
      interact: 'Tap anywhere',
      na: 'Not supported',
    },
    footnote:
      'Thresholds are Google’s Core Web Vitals limits: LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1. Results shift with your connection and device, just as they do for your real visitors.',
    claims: ['Zero frameworks', 'Zero ad tracking', 'Zero cookies', 'Every line by hand'],
    hook: { text: 'Curious about your own site’s numbers?', link: 'Send the address and I’ll measure it the same way' },
  },

  process: {
    id: 'process',
    label: 'Process',
    title: 'Four steps, no *surprises.*',
    steps: [
      {
        title: 'Discovery',
        text: 'You message me and we talk: what you do, who it’s for, who you’re up against. You come away with a clear scope and a timeline.',
      },
      {
        title: 'Strategy & design',
        text: 'How do people search for you, and what do they ask? I map that first. The design is built on top of the map, and you click through it as a prototype.',
      },
      {
        title: 'Engineering',
        text: 'Everything is written by hand, against a performance budget. Accessibility and structured data aren’t bolted on at the end; they’re there from the first line.',
      },
      {
        title: 'Launch & growth',
        text: 'After launch I watch Search Console, analytics and how you show up in AI answers. We see what works, and sharpen it.',
      },
    ],
  },

  faq: {
    id: 'faq',
    label: 'FAQ',
    title: 'Fair *questions.*',
    hook: { text: 'Your question isn’t here?', link: 'Just ask' },
    items: [
      {
        q: 'Who is Eyüp DevArt?',
        a: 'Eyüp DevArt is a developer and digital artist who both designs and builds websites; DevArt is Eyüp’s stage name. For businesses and brands, that means fast, accessible sites that search engines and AI assistants understand without effort.',
      },
      {
        q: 'What services do you offer?',
        a: 'Web design and art direction, web development, technical SEO together with AEO and GEO, performance work, conversion-focused sites for local businesses, and care after launch. In short, everything a website needs, from the first sketch to long after go-live. Each one is described in detail on the <a href="{services}">services page</a>.',
      },
      {
        q: 'What are AEO and GEO?',
        a: 'AEO (Answer Engine Optimization) makes your content the answer that search engines and voice assistants pick. GEO (Generative Engine Optimization) gets your brand cited inside answers written by AI systems such as ChatGPT, Perplexity, Gemini and Google AI Overviews. The <a href="{guide}">AEO & GEO guide</a> goes into the details.',
      },
      {
        q: 'How long does a website take?',
        a: 'It depends on the scope; a one-page site and a full web app don’t keep the same calendar. You get a clear timeline in our first conversation, and we sign off every stage together. I don’t like surprises.',
      },
      {
        q: 'How does pricing work?',
        a: 'Every project is priced on its own scope. I don’t sell packages, because no two businesses are alike. Tell me about yours on WhatsApp and I’ll send you a clear quote.',
      },
      {
        q: 'Can you speed up my current site or fix its SEO?',
        a: 'Yes. I measure first: Core Web Vitals, crawlability, indexing and structured data. Then I rank the problems by impact and start with whatever will win you the most. More on the <a href="{svc:speed}">speed</a> and <a href="{svc:seo}">SEO</a> pages.',
      },
      {
        q: 'Why don’t you use templates?',
        a: 'Templates are built to fit everyone, so they ship with code nobody uses. That means slowness, and a look you’ve already seen on a hundred other sites. A hand-written site carries only what you need: it opens faster, it’s more secure, and it’s entirely yours.',
      },
      {
        q: 'Do you work with clients outside Türkiye?',
        a: 'Of course. Everything runs remotely, in English or Turkish, whichever suits you.',
      },
      {
        q: 'How do I get in touch?',
        a: 'WhatsApp is quickest: <a href="{wa}">{phone}</a>. You can also <a href="{tel}">call</a> the same number.',
      },
    ],
  },

  contact: {
    id: 'contact',
    label: 'Contact',
    title: 'A *hello* will do.',
    lead: 'Tell me what you do and where you’d like to get to. We’ll find the rest by talking it through.',
    prefilled: 'I’ve written the first line for you. The rest is yours.',
    assure: 'A message commits you to nothing. I listen first, and we decide together whether we’re a good fit.',
    qr: 'Point your phone’s camera here and the chat opens there.',
    clock: 'Local time in Türkiye',
    // Beside the clock: what the hour means, never a promise of speed.
    hours: {
      open: 'It’s working hours here.',
      closed: 'Outside working hours; write anyway, I’ll reply at the first chance.',
      weekend: 'It’s the weekend here; write anyway, I’ll reply at the first chance.',
    },
    // What happens after the message: uncertainty is what makes people hesitate.
    next: {
      label: 'What happens next?',
      steps: ['You write; two sentences will do.', 'I listen and ask a few questions.', 'I come back with a clear scope and a quote.'],
    },
  },

  footer: {
    tagline: 'Developer + Artist.',
    built: 'Written by hand, line by line. No framework was used, and none was needed.',
    guide: 'AEO & GEO guide',
    glossary: 'Glossary',
    llms: 'llms.txt',
    sitemap: 'Sitemap',
    resources: 'Resources',
    palette: 'Command palette',
    menu: 'Menu',
  },

  notFound: {
    title: 'Page not found — Eyüp DevArt',
    h1: 'This page fell to the *other side* of the line.',
    text: 'That address has moved, or never existed. You’re on the right site, though.',
    home: 'Back to the home page',
  },

  guide: {
    meta: {
      title: 'What Are AEO and GEO? A Guide to Visibility in AI Search',
      description:
        'How SEO, AEO and GEO differ, how AI engines choose their sources, and a practical checklist for getting cited by ChatGPT, Perplexity and Gemini.',
      ogAlt: 'The AEO & GEO guide — Eyüp DevArt',
    },
    crumb: 'AEO & GEO guide',
    label: 'Guide',
    h1: 'What are AEO and GEO? A guide to *being seen* in AI search',
    byline: 'By',
    updated: 'Updated',
    minutes: 'min read',
    tldrLabel: 'Short answer',
    tldr: 'AEO (Answer Engine Optimization) gets your content chosen as the direct answer in search engines and assistants; GEO (Generative Engine Optimization) gets you cited as a source inside answers generated by AI systems such as ChatGPT, Perplexity, Gemini and Google AI Overviews. Both stand on a solid SEO foundation: fast, crawlable, structured and trustworthy content.',
    tocLabel: 'In this guide',
    glossaryLink: 'Glossary of terms',
    sections: [
      {
        id: 'difference',
        h2: 'SEO, AEO and GEO: what’s the difference?',
        html: `<p>All three chase the same question: <strong>when someone asks something in your field, why should the answer be you?</strong> The difference is where — and how — that answer is shown.</p>
<div class="table-wrap" role="region" aria-label="SEO, AEO and GEO compared" tabindex="0"><table>
<thead><tr><th scope="col"></th><th scope="col">SEO</th><th scope="col">AEO</th><th scope="col">GEO</th></tr></thead>
<tbody>
<tr><th scope="row">Goal</th><td>Rank high in search results</td><td>Be chosen as the direct answer</td><td>Be cited as a source in AI answers</td></tr>
<tr><th scope="row">Where</th><td>Google and Bing result pages</td><td>Featured snippets, “People also ask”, voice assistants</td><td>ChatGPT, Perplexity, Gemini, Copilot, Google AI Overviews</td></tr>
<tr><th scope="row">Success metric</th><td>Rankings and clicks</td><td>Owning the answer box</td><td>Citations and brand mentions</td></tr>
<tr><th scope="row">Main levers</th><td>Keywords, technical SEO, links</td><td>Q&amp;A structure, crisp definitions, FAQ schema</td><td>Citable facts, entity consistency, structured data, llms.txt</td></tr>
</tbody></table></div>
<p>In short: <strong>SEO gets you found, AEO gets you chosen, GEO gets you quoted.</strong> They aren’t alternatives — they’re layers that stack.</p>`,
      },
      {
        id: 'how-ai-chooses',
        h2: 'How do AI engines choose their sources?',
        html: `<p>Most systems — Perplexity, ChatGPT search, Google AI Overviews — work in two steps: they first <em>retrieve</em> relevant pages from a search index, then a language model <em>synthesises</em> an answer from passages on those pages and cites them. So you have to meet three conditions at once:</p>
<ol>
<li><strong>Be findable.</strong> If your page can’t be crawled or isn’t indexed, it never reaches the model.</li>
<li><strong>Be quotable.</strong> Models prefer passages that stand on their own and are clear and factual. Ornate sentences that depend on context are hard to quote.</li>
<li><strong>Be trustworthy.</strong> Who you are, what you do and where you are must be consistent everywhere, and your claims should be backed by sources.</li>
</ol>
<p>One of the most-cited studies in the field, <a href="https://arxiv.org/abs/2311.09735" rel="noopener">“GEO: Generative Engine Optimization”</a> (Aggarwal et al., 2023), showed that citing sources, adding quotations and including statistics can noticeably raise a page’s visibility in generative engine answers, reporting improvements of <strong>up to 40%</strong>.</p>`,
      },
      {
        id: 'checklist',
        h2: 'The checklist: 12 steps to being seen',
        html: `<ol class="checklist">
<li><strong>Answer in the first sentence.</strong> Open every section with the direct answer; details come after.</li>
<li><strong>Turn real questions into headings.</strong> Phrase them the way your audience asks: “What is…?”, “How long does… take?”, “How do I choose…?”</li>
<li><strong>Write self-contained blocks.</strong> Each paragraph should make sense without the rest of the page.</li>
<li><strong>Add facts, numbers and sources.</strong> Measurable claims and links to credible sources raise your odds of being quoted.</li>
<li><strong>Define your entity.</strong> Your name, what you do, where you are and how to reach you should match exactly across your site, Google Business Profile and social profiles.</li>
<li><strong>Use Schema.org structured data.</strong> Connect Organization or Person, Service, FAQPage, Article and BreadcrumbList inside one <code>@graph</code>, linked by <code>@id</code>.</li>
<li><strong>Link your identity with <code>sameAs</code>.</strong> Point to your official profiles so models match you to the right entity.</li>
<li><strong>Publish <code>llms.txt</code>.</strong> A proposed standard (Jeremy Howard, 2024) that gives AI agents a Markdown summary of your site and its key pages. Support varies by engine, but the cost is tiny.</li>
<li><strong>Manage AI crawlers deliberately.</strong> State in <code>robots.txt</code> what you allow agents such as GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended to do.</li>
<li><strong>Serve content in HTML.</strong> Many AI crawlers don’t execute JavaScript; critical text belongs in the HTML your server sends.</li>
<li><strong>Be fast.</strong> Pass the Core Web Vitals thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.</li>
<li><strong>Stay current and date it.</strong> Show a visible “updated” date and use <code>dateModified</code> in your schema.</li>
</ol>
<p>The technical part of this list is <a href="{svc:seo}">SEO</a>, the speed part is <a href="{svc:speed}">speed optimization</a>, and the rest is <a href="{svc:aeo-geo}">AEO &amp; GEO</a>.</p>`,
      },
      {
        id: 'core-web-vitals',
        h2: 'The technical foundation: Core Web Vitals',
        html: `<p>Speed is both a ranking signal and your visitor’s patience. Google’s “good” thresholds are measured at the 75th percentile of page visits:</p>
<div class="table-wrap" role="region" aria-label="Core Web Vitals thresholds" tabindex="0"><table>
<thead><tr><th scope="col">Metric</th><th scope="col">What it measures</th><th scope="col">Good</th></tr></thead>
<tbody>
<tr><th scope="row">LCP</th><td>How fast the main content appears</td><td>≤ 2.5 s</td></tr>
<tr><th scope="row">INP</th><td>How quickly the page responds to taps and clicks</td><td>≤ 200 ms</td></tr>
<tr><th scope="row">CLS</th><td>How much content shifts while loading</td><td>≤ 0.1</td></tr>
</tbody></table></div>
<p>How to get under all three thresholds: <a href="{svc:speed}">website speed optimization</a>.</p>`,
      },
      {
        id: 'on-this-site',
        h2: 'How this site applies it',
        html: `<p>eyupdevart.com is a live example of this guide. Open the source in your browser and inspect it:</p>
<ul>
<li>The “In short” block on the home page answers “Who is Eyüp DevArt?” in its first sentence and is marked up with <code>SpeakableSpecification</code>.</li>
<li>One JSON-LD <code>@graph</code>: WebSite, Person, ProfessionalService, FAQPage, Article and BreadcrumbList are linked by <code>@id</code>.</li>
<li><a href="/llms.txt">/llms.txt</a> and <a href="/llms-full.txt">/llms-full.txt</a> serve the entire site to AI as Markdown.</li>
<li><code>robots.txt</code> explicitly welcomes search and AI crawlers; Turkish and English versions are paired with <code>hreflang</code>.</li>
<li>Zero frameworks, inlined critical CSS and metric-matched fallback fonts keep layout shift at zero.</li>
<li>All content is complete in the HTML, even without JavaScript.</li>
</ul>`,
      },
    ],
    faqTitle: 'Frequently asked',
    faq: [
      {
        q: 'Is GEO replacing SEO?',
        a: 'No. GEO is built on top of SEO. Most AI search systems pull their sources from a search index before generating an answer, so a page that is weak in the index is unlikely to be cited.',
      },
      {
        q: 'Is llms.txt required?',
        a: 'No. llms.txt is a standard proposed in 2024 and support varies by engine. It’s cheap and easy to add, so it’s worth having — but it isn’t a magic wand on its own.',
      },
      {
        q: 'When will I see results?',
        a: 'It varies. New content needs to be crawled, indexed and then reflected in the sources AI systems draw on. We track progress with Search Console data and regular AI query tests.',
      },
      {
        q: 'Where should I start on my own site?',
        a: 'The technical foundation first: indexability and speed. Then answer-first content and structured data. Send your URL on WhatsApp and we can look at it together.',
      },
    ],
    cta: {
      title: 'Does your site show up in *AI answers?*',
      text: 'Send me the URL and we’ll review speed, SEO and AI visibility together.',
      button: 'Request a review',
    },
  },
};
