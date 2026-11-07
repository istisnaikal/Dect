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
  alt: { lang: 'tr', label: 'Türkçe', short: 'TR' },
  dateLocale: 'en-GB',

  meta: {
    title: 'Eyüp DevArt — Web Design, Development & SEO · AEO · GEO',
    description:
      'Developer + artist. Eyüp DevArt designs and engineers websites that load instantly, rank on Google, get cited by AI answer engines and win clients.',
    ogAlt: 'Eyüp DevArt — the line where code meets art',
  },

  wa: {
    default: 'Hi Eyüp, I found you on eyupdevart.com and I’d like to talk about a project.',
    project: 'Hi Eyüp, here’s my project in a nutshell:',
    audit: 'Hi Eyüp, I’d like a speed, SEO and AI-visibility review of my current website. The URL is:',
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
    palettePlaceholder: 'Where to? Start typing…',
    paletteEmpty: 'Nothing here. Asking on WhatsApp might be faster.',
    paletteHint: 'navigate · select · close',
    copied: 'Number copied',
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
    audit: 'Request a free site review',
    guide: 'The AEO & GEO guide',
    lang: 'Türkçe sürüm',
    llms: 'llms.txt — the site, summarised for AI',
    top: 'Back to top',
    share: 'Share this page',
  },

  hero: {
    eyebrow: ['Eyüp', 'DevArt', 'Developer + Artist'],
    h1: 'I design like an *artist* and code like an `engineer`.',
    lead: 'Websites that open instantly, rank on Google, get cited by AI answer engines — and turn visitors into clients. No templates. Nothing ordinary.',
    ctaSecondary: 'See the work',
    hint: 'Move your cursor — the line is yours',
    hintTouch: 'Drag it — the line is yours',
    chip: 'Loaded in {t} s on your device',
    chipIdle: 'Measuring on your device…',
    scroll: 'Scroll',
  },

  short: {
    id: 'in-short',
    label: 'In short',
    q: 'Who is Eyüp DevArt?',
    a: 'Eyüp DevArt — stage name DevArt — is a developer and digital artist who unites web design and software engineering in a single pair of hands. Eyüp designs and builds websites for businesses and brands that load instantly, are accessible, and are easy for Google and AI assistants to understand and cite.',
    facts: [
      ['Name', 'Eyüp · stage name DevArt'],
      ['Expertise', 'Web design · Web development · SEO, AEO, GEO · Performance'],
      ['Approach', 'No templates. Hand-coded. Measurable.'],
      ['Based', 'Türkiye · working worldwide, remotely'],
      ['Languages', 'Turkish · English'],
      ['Contact', 'WhatsApp & phone: <a href="{wa}">{phone}</a>'],
    ],
  },

  manifesto: {
    label: 'Manifesto',
    text: 'Most websites are built to exist. Mine are built to *win.* Every pixel is a decision, every `millisecond` a rival. `Code` is my brush, the browser my *canvas* — and there is no room on it for ordinary.',
  },

  work: {
    id: 'work',
    label: 'Selected work',
    title: 'Work that *speaks.*',
    lead: 'Live, for real businesses. Each one built to raise the bar in its own industry.',
    visit: 'Visit site',
    items: {
      aksu: {
        kind: 'Local service · Company site',
        summary:
          'Local-SEO-first website for a 24/7 tow and roadside-assistance company based in Maltepe, Istanbul — district landing pages, WhatsApp-first conversion and a marble-and-serif art direction.',
        tags: ['Local SEO', 'Schema.org', 'Next.js', 'AVIF'],
        alt: 'Home page of the Aksu Oto Çekici website: marble texture background, serif headline and a photo of the tow-truck fleet',
      },
      marchetti: {
        kind: 'Brand · Web experience',
        summary:
          'A DevArt-signed brand website: an original visual language built around the brand’s character, carefully engineered.',
        tags: ['Brand', 'Design', 'Engineering'],
      },
    },
    next: {
      label: 'Next',
      title: 'The next one is *yours.*',
      text: 'Tell me about your project in two sentences — we’ll shape the rest together.',
      cta: 'Tell me about it',
    },
  },

  services: {
    id: 'services',
    label: 'Services',
    title: 'From design to code, from code to the *top.*',
    lead: 'Strategy, design, engineering and visibility — one pair of hands, one signature.',
    items: [
      {
        title: 'Web design & art direction',
        text: 'A visual language, typography, motion and interaction made for your brand. Not a template — a signature.',
        tags: ['UI/UX', 'Art direction', 'Motion'],
      },
      {
        title: 'Web development',
        text: 'Hand-written, lightweight, secure and accessible code. From brochure sites to web apps, from WebGL experiences to admin panels.',
        tags: ['TypeScript', 'Next.js', 'WebGL', 'Vanilla JS'],
      },
      {
        title: 'SEO · AEO · GEO',
        text: 'Top positions on Google, and a brand that ChatGPT, Perplexity, Gemini and Google AI Overviews cite as a source. Technical SEO, Schema.org, llms.txt and content architecture.',
        tags: ['Technical SEO', 'Schema.org', 'llms.txt'],
      },
      {
        title: 'Performance engineering',
        text: 'Optimisation that turns Core Web Vitals green and pushes Lighthouse to the top. Speed is conversion’s silent partner.',
        tags: ['Core Web Vitals', 'Lighthouse', 'CDN'],
      },
      {
        title: 'Local business & conversion',
        text: 'The shortest path to a call or a WhatsApp message: service-area pages, Google Business Profile alignment, one-tap contact.',
        tags: ['Local SEO', 'WhatsApp', 'Conversion'],
      },
      {
        title: 'Care & growth',
        text: 'I stay after launch: measurement, updates, security and continuous improvement.',
        tags: ['Analytics', 'Security', 'Support'],
      },
    ],
  },

  proof: {
    id: 'proof',
    label: 'Proof',
    title: 'This page is its *own proof.*',
    lead: 'These numbers aren’t claims. They were measured just now, on your device, by your own browser’s performance APIs.',
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
      'Thresholds are Google’s Core Web Vitals limits: LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1. Values vary with your connection and device — exactly as they do for your real visitors.',
    claims: ['Zero frameworks', 'Zero trackers', 'Zero cookies', 'Hand-written'],
  },

  process: {
    id: 'process',
    label: 'Process',
    title: 'Four steps from idea to *launch.*',
    steps: [
      {
        title: 'Discovery',
        text: 'You message me on WhatsApp; we talk goals, audience and competitors, then start with a clear scope and timeline.',
      },
      {
        title: 'Strategy & design',
        text: 'Content architecture and a search-and-question map, then a design and interaction prototype made for your brand.',
      },
      {
        title: 'Engineering',
        text: 'Hand-written code, a performance budget, accessibility and structured data. Every line is there for a reason.',
      },
      {
        title: 'Launch & growth',
        text: 'Search Console, analytics and AI-visibility tracking. We measure, learn and keep improving.',
      },
    ],
  },

  faq: {
    id: 'faq',
    label: 'FAQ',
    title: 'Frequently asked *questions.*',
    items: [
      {
        q: 'Who is Eyüp DevArt?',
        a: 'Eyüp DevArt is a developer and digital artist whose stage name is DevArt. Uniting web design and software engineering, Eyüp builds fast, accessible websites for businesses and brands that search engines and AI assistants can easily understand.',
      },
      {
        q: 'What services do you offer?',
        a: 'Web design and art direction, web development, technical SEO together with AEO and GEO, performance optimisation, conversion-focused sites for local businesses, and post-launch care and growth.',
      },
      {
        q: 'What are AEO and GEO?',
        a: 'AEO (Answer Engine Optimization) is optimising your content so search engines and voice assistants pick it as the direct answer. GEO (Generative Engine Optimization) aims to get your brand cited as a source in answers generated by AI systems such as ChatGPT, Perplexity, Gemini and Google AI Overviews. Read the <a href="{guide}">AEO & GEO guide</a> for the details.',
      },
      {
        q: 'How long does a website take?',
        a: 'It depends on scope. I share a clear timeline in our first conversation and we approve every stage together — no surprises.',
      },
      {
        q: 'How does pricing work?',
        a: 'Every project is priced on its own scope; I don’t sell packages. Describe your project briefly on WhatsApp and I’ll prepare a clear quote.',
      },
      {
        q: 'Can you speed up my current site or fix its SEO?',
        a: 'Yes. I measure first — Core Web Vitals, crawlability, indexing and structured data — then build a roadmap ranked by impact and start with the most critical issues.',
      },
      {
        q: 'Why don’t you use templates?',
        a: 'Templates ship code nobody uses so they can fit everyone, which means slowness and a look that’s seen everywhere. A hand-coded site carries only what you need: it loads faster, is more secure and is entirely yours.',
      },
      {
        q: 'Do you work with clients outside Türkiye?',
        a: 'Absolutely. The whole process runs remotely, in English or Turkish.',
      },
      {
        q: 'How do I get in touch?',
        a: 'The fastest way is WhatsApp: <a href="{wa}">{phone}</a>. You can also <a href="{tel}">call</a> the same number.',
      },
    ],
  },

  contact: {
    id: 'contact',
    label: 'Contact',
    title: 'Let’s *talk.*',
    lead: 'One message, one idea, one goal. We build the rest together.',
    prefilled: 'The message is pre-written — just hit send.',
    qr: 'Scan with your phone to open the chat instantly.',
    clock: 'Local time in Türkiye',
  },

  footer: {
    tagline: 'Developer + Artist.',
    built: 'This site was hand-written without a single framework.',
    guide: 'AEO & GEO guide',
    llms: 'llms.txt',
    sitemap: 'Sitemap',
    palette: 'Command palette',
    menu: 'Menu',
  },

  notFound: {
    title: 'Page not found — Eyüp DevArt',
    h1: 'This page fell to the *other side* of the line.',
    text: 'The address may have moved, or never existed. But you’re in the right place.',
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
</ol>`,
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
</tbody></table></div>`,
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
