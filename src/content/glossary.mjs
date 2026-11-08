// The glossary: /sozluk/ and /en/glossary/.
// Every term opens with a single, self-contained sentence — the passage search
// engines and AI assistants can quote as-is. Detail follows. Ids are shared
// across languages so anchors match (…/sozluk/#lcp ↔ …/en/glossary/#lcp).
// `service`: the service page that puts the term to work (knowledge → practice, one link each).

export const terms = [
  // ── Visibility ──
  { id: 'seo', group: 'visibility', name: 'SEO', service: 'seo' },
  { id: 'aeo', group: 'visibility', name: 'AEO', service: 'aeo-geo' },
  { id: 'geo', group: 'visibility', name: 'GEO', service: 'aeo-geo' },
  { id: 'ai-overviews', group: 'visibility', name: 'Google AI Overviews', service: 'aeo-geo' },
  { id: 'featured-snippet', group: 'visibility', service: 'aeo-geo' },
  { id: 'rag', group: 'visibility', name: 'RAG', service: 'aeo-geo' },
  { id: 'eeat', group: 'visibility', name: 'E-E-A-T', service: 'seo' },
  // ── The layer machines read ──
  { id: 'structured-data', group: 'machines', service: 'seo' },
  { id: 'json-ld', group: 'machines', name: 'JSON-LD', service: 'seo' },
  { id: 'entity', group: 'machines', service: 'aeo-geo' },
  { id: 'llms-txt', group: 'machines', name: 'llms.txt', service: 'aeo-geo' },
  { id: 'robots-txt', group: 'machines', name: 'robots.txt', service: 'seo' },
  { id: 'sitemap', group: 'machines', service: 'seo' },
  { id: 'canonical', group: 'machines', service: 'seo' },
  { id: 'hreflang', group: 'machines', name: 'hreflang', service: 'seo' },
  { id: 'crawl-budget', group: 'machines', service: 'seo' },
  { id: 'indexnow', group: 'machines', name: 'IndexNow', service: 'seo' },
  // ── Speed & experience ──
  { id: 'core-web-vitals', group: 'experience', name: 'Core Web Vitals', service: 'speed' },
  { id: 'lcp', group: 'experience', name: 'LCP', service: 'speed' },
  { id: 'inp', group: 'experience', name: 'INP', service: 'speed' },
  { id: 'cls', group: 'experience', name: 'CLS', service: 'speed' },
  { id: 'wcag', group: 'experience', name: 'WCAG', service: 'uiux' },
];

export const tr = {
  path: '/sozluk/',
  meta: {
    title: 'SEO, AEO, GEO Sözlüğü — Web ve Yapay Zekâ Araması Terimleri',
    description:
      'SEO, AEO, GEO, llms.txt, Core Web Vitals, JSON-LD, hreflang ve fazlası: web görünürlüğünün temel terimleri, kısa ve doğru tanımlarla.',
    ogAlt: 'Bulunmanın sözlüğü — Eyüp DevArt',
  },
  crumb: 'Sözlük',
  label: 'Sözlük',
  h1: 'Bulunmanın *sözlüğü.*',
  intro:
    'Sektörde en çok kullanılan, en az açıklanan terimler. Her biri tek cümlelik bir tanımla başlar; ayrıntı hemen arkasından gelir.',
  count: 'terim',
  updated: 'Güncellendi',
  groups: {
    visibility: 'Görünürlük',
    machines: 'Makinelerin okuduğu katman',
    experience: 'Hız ve deneyim',
  },
  cta: {
    title: 'Bu terimler sitenizde *çalışıyor mu?*',
    text: 'Adresi gönderin; hangilerinin yerinde, hangilerinin eksik olduğuna birlikte bakalım.',
    button: 'Sitenize bakayım',
  },
  terms: {
    seo: {
      aka: 'Arama motoru optimizasyonu · Search Engine Optimization',
      short: 'SEO, bir web sitesinin Google ve Bing gibi arama motorlarının organik sonuçlarında daha görünür olması için yapılan teknik, içerik ve bağlantı çalışmalarının bütünüdür.',
      body: 'Üç ayağı vardır: arama motorunun sayfayı tarayıp anlayabilmesi, aranan soruya en iyi cevabın verilmesi ve başka sitelerin size güvenmesi. AEO ve GEO bu temelin üstüne kurulur.',
    },
    aeo: {
      aka: 'Cevap motoru optimizasyonu · Answer Engine Optimization',
      short: 'AEO, içeriğin arama motorlarında, öne çıkan snippet’lerde ve sesli asistanlarda doğrudan cevap olarak seçilmesi için optimize edilmesidir.',
      body: 'Gerçek soruları başlık yapmak, cevabı ilk cümlede vermek ve FAQPage gibi yapılandırılmış veriler kullanmak AEO’nun temel araçlarıdır.',
    },
    geo: {
      aka: 'Üretken motor optimizasyonu · Generative Engine Optimization',
      short: 'GEO, ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi üretken yapay zekâ sistemlerinin cevaplarında bir markanın kaynak olarak gösterilmesini hedefleyen optimizasyondur.',
      body: 'Terim, 2023’te yayımlanan “GEO: Generative Engine Optimization” çalışmasıyla yaygınlaştı. Alıntılanabilir olgular, tutarlı bir varlık tanımı ve sağlam bir SEO temeli GEO’nun yapı taşlarıdır.',
    },
    'ai-overviews': {
      aka: 'Yapay zekâ özetleri',
      short: 'Google AI Overviews, Google arama sonuçlarının üstünde yapay zekâyla üretilen ve kaynak bağlantıları içeren özet cevaplardır.',
      body: 'Bu özetlerde kaynak olarak geçmek, klasik sıralamanın yanında yeni bir görünürlük alanı açar; GEO çalışmalarının başlıca hedeflerinden biridir.',
    },
    'featured-snippet': {
      name: 'Öne çıkan snippet',
      aka: 'Featured snippet',
      short: 'Öne çıkan snippet, Google’ın bir sorunun cevabını organik sonuçların üstünde, bir sayfadan alıntılanmış kısa bir blok olarak göstermesidir.',
      body: 'Soruyu net bir başlıkla sormak ve hemen altında kısa, kendi başına anlaşılır bir cevap vermek seçilme şansını artırır.',
    },
    rag: {
      aka: 'Retrieval-Augmented Generation · Getirmeyle güçlendirilmiş üretim',
      short: 'RAG, bir dil modelinin cevap üretmeden önce bir arama dizininden ya da belge deposundan ilgili kaynakları getirip cevabını bu kaynaklara dayandırmasıdır.',
      body: 'Yapay zekâlı arama ürünlerinin çoğu bu yaklaşımla çalışır; bu yüzden önce bulunabilir olmak, alıntılanmanın ön koşuludur.',
    },
    eeat: {
      aka: 'Deneyim · Uzmanlık · Otorite · Güvenilirlik',
      short: 'E-E-A-T, Google’ın arama kalitesi değerlendirme yönergelerinde içeriği tartmak için kullandığı deneyim, uzmanlık, otorite ve güvenilirlik ölçütlerinin kısaltmasıdır.',
      body: 'Doğrudan bir sıralama sinyali değil, kaliteli içeriğin neye benzediğini anlatan bir çerçevedir. Baştaki “deneyim” ölçütü 2022’nin sonunda eklendi.',
    },
    'structured-data': {
      name: 'Yapılandırılmış veri',
      aka: 'Structured data · Schema.org',
      short: 'Yapılandırılmış veri, bir sayfanın içeriğini (kişi, işletme, hizmet, soru-cevap, makale) Schema.org sözlüğüyle makinelerin anlayacağı biçimde etiketlemektir.',
      body: 'Arama motorları bu veriyi zengin sonuçlar ve bilgi grafiği için kullanır; yapay zekâ sistemleri için de bir sayfanın neyi anlattığını kesinleştirir.',
    },
    'json-ld': {
      aka: 'JavaScript Object Notation for Linked Data',
      short: 'JSON-LD, yapılandırılmış veriyi sayfanın HTML’ine ayrı bir betik bloğu olarak ekleyen ve Google’ın önerdiği biçimdir.',
      body: 'Düğümler @id ile birbirine bağlanarak tek bir bilgi grafiği oluşturabilir. Bu sitede kişi, marka, sayfalar, işler ve bu sözlükteki terimler böyle bağlıdır.',
    },
    entity: {
      name: 'Varlık',
      aka: 'Entity',
      short: 'Varlık, arama motorlarının ve yapay zekâ sistemlerinin tekil olarak tanıyabildiği bir kişi, kurum, yer ya da kavramdır.',
      body: 'Bir markanın adı, işi, konumu ve iletişim bilgileri her yerde aynı olduğunda ve resmî profilleri sameAs ile bağlandığında sistemler onu doğru varlıkla eşleştirir.',
    },
    'llms-txt': {
      aka: 'LLM’ler için site özeti',
      short: 'llms.txt, bir web sitesinin özetini ve önemli sayfalarını yapay zekâ modellerinin kolayca okuyabileceği Markdown biçiminde sunan, sitenin kök dizinine konan bir dosyadır.',
      body: '2024’te Jeremy Howard tarafından önerildi. Desteği motordan motora değişir; maliyeti çok düşük olduğu için giderek yaygınlaşıyor.',
    },
    'robots-txt': {
      aka: 'Tarayıcı yönergeleri',
      short: 'robots.txt, sitenin kök dizininde duran ve tarayıcı botlara sitenin hangi bölümlerini tarayabileceklerini söyleyen metin dosyasıdır.',
      body: 'GPTBot, ClaudeBot ve PerplexityBot gibi yapay zekâ tarayıcıları da bu dosyadaki kurallarla yönetilir.',
    },
    sitemap: {
      name: 'Site haritası',
      aka: 'XML sitemap',
      short: 'Site haritası, bir sitede dizine eklenmesi istenen sayfaların listesini arama motorlarına sunan XML dosyasıdır.',
      body: 'Sayfaların son güncellenme tarihlerini, dil alternatiflerini ve görsellerini de taşıyabilir.',
    },
    canonical: {
      name: 'Kanonik URL',
      aka: 'Canonical URL',
      short: 'Kanonik URL, aynı ya da çok benzer içeriğe ulaşan birden fazla adres olduğunda arama motorlarına hangisinin asıl sürüm olduğunu bildiren adrestir.',
      body: 'rel="canonical" etiketiyle ya da kalıcı (301) yönlendirmelerle belirtilir.',
    },
    hreflang: {
      aka: 'Dil ve bölge eşlemesi',
      short: 'hreflang, bir sayfanın farklı dil ya da bölge sürümlerini arama motorlarına bildiren bir HTML veya site haritası işaretidir.',
      body: 'Her sürüm diğerlerini karşılıklı olarak göstermelidir; bu site Türkçe ve İngilizce sürümlerini böyle eşler.',
    },
    'crawl-budget': {
      name: 'Tarama bütçesi',
      aka: 'Crawl budget',
      short: 'Tarama bütçesi, bir arama motorunun belirli bir sürede bir siteyi taramaya ayırdığı sayfa ve kaynak miktarıdır.',
      body: 'Hızlı yanıt veren, yinelenen adresleri olmayan ve temiz bir iç bağlantı yapısı kuran siteler bu bütçeyi verimli kullanır.',
    },
    indexnow: {
      aka: 'Anlık dizin bildirimi',
      short: 'IndexNow, bir sitedeki sayfalar eklendiğinde ya da değiştiğinde bunu Bing ve Yandex gibi arama motorlarına anında bildiren açık bir protokoldür.',
      body: 'Bing, Microsoft Copilot gibi yapay zekâ ürünlerinin de dayandığı bir dizin olduğundan, güncel içeriğin bu cevaplara daha çabuk yansımasına yardımcı olur. Bu site her yayında IndexNow ile bildirim gönderir.',
    },
    'core-web-vitals': {
      aka: 'Temel web metrikleri',
      short: 'Core Web Vitals, Google’ın gerçek kullanıcı deneyimini ölçmek için kullandığı üç metriktir: LCP, INP ve CLS.',
      body: 'Ziyaretlerin %75’inde “iyi” eşiğin içinde kalmak hedeflenir: LCP ≤ 2,5 sn, INP ≤ 200 ms, CLS ≤ 0,1.',
    },
    lcp: {
      aka: 'Largest Contentful Paint · En büyük içerik boyaması',
      short: 'LCP, sayfanın görünen alanındaki en büyük metin ya da görsel bloğunun ekrana çizildiği anı ölçer; iyi değer 2,5 saniye ve altıdır.',
      body: 'Kullanıcının “sayfa açıldı” hissini en iyi temsil eden metriktir.',
    },
    inp: {
      aka: 'Interaction to Next Paint · Etkileşimden sonraki boyama',
      short: 'INP, bir tıklama, dokunma ya da tuş basışından sonra sayfanın görsel olarak tepki vermesinin ne kadar sürdüğünü ölçer; iyi değer 200 milisaniye ve altıdır.',
      body: 'Mart 2024’te FID’in yerini alarak Core Web Vitals’a girdi.',
    },
    cls: {
      aka: 'Cumulative Layout Shift · Kümülatif düzen kayması',
      short: 'CLS, sayfa yüklenirken içeriğin beklenmedik biçimde ne kadar kaydığını ölçer; iyi değer 0,1 ve altıdır.',
      body: 'Boyutu belirtilmemiş görseller, geç yüklenen yazı tipleri ve sonradan araya giren bloklar en yaygın nedenlerdir.',
    },
    wcag: {
      aka: 'Web İçeriği Erişilebilirlik Yönergeleri',
      short: 'WCAG, web içeriğinin engelli kullanıcılar dahil herkes tarafından kullanılabilmesi için W3C’nin yayımladığı uluslararası erişilebilirlik yönergeleridir.',
      body: 'AA düzeyinde normal metin için en az 4,5:1 renk kontrastı istenir; bu sitedeki her metin bu eşiği geçer.',
    },
  },
};

export const en = {
  path: '/en/glossary/',
  meta: {
    title: 'SEO, AEO & GEO Glossary — Web and AI Search Terms',
    description:
      'SEO, AEO, GEO, llms.txt, Core Web Vitals, JSON-LD, hreflang and more: the core terms of web visibility, defined briefly and accurately.',
    ogAlt: 'A glossary of being found — Eyüp DevArt',
  },
  crumb: 'Glossary',
  label: 'Glossary',
  h1: 'A glossary of being *found.*',
  intro:
    'The industry’s most used and least explained terms. Each one opens with a single-sentence definition; the detail follows.',
  count: 'terms',
  updated: 'Updated',
  groups: {
    visibility: 'Visibility',
    machines: 'The layer machines read',
    experience: 'Speed and experience',
  },
  cta: {
    title: 'Are these working on *your site?*',
    text: 'Send me the address and we’ll look at which ones are in place and which are missing.',
    button: 'Have me look at your site',
  },
  terms: {
    seo: {
      aka: 'Search Engine Optimization',
      short: 'SEO is the combined technical, content and link work that makes a website more visible in the organic results of search engines such as Google and Bing.',
      body: 'It stands on three legs: search engines being able to crawl and understand the page, the page answering the query best, and other sites trusting it. AEO and GEO are built on top of it.',
    },
    aeo: {
      aka: 'Answer Engine Optimization',
      short: 'AEO is optimising content so that search engines, featured snippets and voice assistants select it as the direct answer.',
      body: 'Turning real questions into headings, answering in the first sentence and using structured data such as FAQPage are its main tools.',
    },
    geo: {
      aka: 'Generative Engine Optimization',
      short: 'GEO is optimisation aimed at getting a brand cited as a source in answers produced by generative AI systems such as ChatGPT, Perplexity, Gemini and Google AI Overviews.',
      body: 'The term spread with the 2023 paper “GEO: Generative Engine Optimization”. Citable facts, a consistent entity definition and a solid SEO foundation are its building blocks.',
    },
    'ai-overviews': {
      aka: 'AI-generated summaries in Google Search',
      short: 'Google AI Overviews are AI-generated summary answers, with links to their sources, shown above Google’s search results.',
      body: 'Being cited in them opens a new kind of visibility alongside classic rankings, and it is one of the main targets of GEO work.',
    },
    'featured-snippet': {
      name: 'Featured snippet',
      aka: 'Answer box',
      short: 'A featured snippet is a short block, quoted from a single page, that Google shows above the organic results to answer a question directly.',
      body: 'Asking the question in a clear heading and answering it directly underneath, in a passage that stands on its own, improves the odds of being chosen.',
    },
    rag: {
      aka: 'Retrieval-Augmented Generation',
      short: 'RAG is a technique in which a language model retrieves relevant sources from a search index or document store before answering, then grounds its answer in them.',
      body: 'Most AI search products work this way, which is why being findable is the precondition for being quoted.',
    },
    eeat: {
      aka: 'Experience · Expertise · Authoritativeness · Trustworthiness',
      short: 'E-E-A-T is the acronym for the experience, expertise, authoritativeness and trustworthiness criteria that Google’s search quality rater guidelines use to weigh content.',
      body: 'It is not a direct ranking signal but a framework describing what quality content looks like. The leading “experience” criterion was added at the end of 2022.',
    },
    'structured-data': {
      name: 'Structured data',
      aka: 'Schema.org markup',
      short: 'Structured data is markup that labels a page’s content (people, businesses, services, Q&A, articles) with the Schema.org vocabulary so machines can understand it.',
      body: 'Search engines use it for rich results and the knowledge graph; for AI systems it pins down exactly what a page is about.',
    },
    'json-ld': {
      aka: 'JavaScript Object Notation for Linked Data',
      short: 'JSON-LD is the format, recommended by Google, that adds structured data to a page’s HTML as a separate script block.',
      body: 'Nodes can be linked with @id into a single knowledge graph. On this site the person, the brand, the pages, the work and the terms in this glossary are linked that way.',
    },
    entity: {
      name: 'Entity',
      aka: 'Thing with a distinct identity',
      short: 'An entity is a person, organisation, place or concept that search engines and AI systems can recognise as one distinct thing.',
      body: 'When a brand’s name, work, location and contact details match everywhere, and its official profiles are linked with sameAs, systems match it to the right entity.',
    },
    'llms-txt': {
      aka: 'A site summary for LLMs',
      short: 'llms.txt is a file in a website’s root that presents a summary of the site and its key pages in Markdown that AI models can read easily.',
      body: 'It was proposed by Jeremy Howard in 2024. Support varies by engine, but it costs almost nothing and is spreading quickly.',
    },
    'robots-txt': {
      aka: 'Crawler directives',
      short: 'robots.txt is a text file in a website’s root that tells crawlers which parts of the site they may crawl.',
      body: 'AI crawlers such as GPTBot, ClaudeBot and PerplexityBot are managed with the rules in this file too.',
    },
    sitemap: {
      name: 'Sitemap',
      aka: 'XML sitemap',
      short: 'A sitemap is an XML file that lists the pages of a site its owner wants indexed, for search engines to read.',
      body: 'It can also carry each page’s last-modified date, its language alternates and its images.',
    },
    canonical: {
      name: 'Canonical URL',
      aka: 'rel="canonical"',
      short: 'A canonical URL tells search engines which address is the main version when several addresses lead to the same or very similar content.',
      body: 'It is declared with a rel="canonical" tag or with permanent (301) redirects.',
    },
    hreflang: {
      aka: 'Language and region mapping',
      short: 'hreflang is an HTML or sitemap annotation that tells search engines about the different language or regional versions of a page.',
      body: 'Every version must point to the others in return; this site pairs its Turkish and English versions that way.',
    },
    'crawl-budget': {
      name: 'Crawl budget',
      aka: 'Crawl capacity and demand',
      short: 'Crawl budget is the number of pages and resources a search engine is willing to crawl on a site within a given period.',
      body: 'Sites that respond fast, avoid duplicate addresses and keep a clean internal link structure use it efficiently.',
    },
    indexnow: {
      aka: 'Instant index notification',
      short: 'IndexNow is an open protocol that tells search engines such as Bing and Yandex immediately when pages on a site are added or changed.',
      body: 'Because Bing is also the index behind AI products such as Microsoft Copilot, it helps fresh content reach those answers sooner. This site sends an IndexNow notification on every release.',
    },
    'core-web-vitals': {
      aka: 'Google’s user-experience metrics',
      short: 'Core Web Vitals are the three metrics Google uses to measure real user experience: LCP, INP and CLS.',
      body: 'The goal is to stay within the “good” threshold for 75% of visits: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.',
    },
    lcp: {
      aka: 'Largest Contentful Paint',
      short: 'LCP measures when the largest text or image block in the visible area of a page is painted; a good value is 2.5 seconds or less.',
      body: 'It is the metric that best represents the moment a visitor feels the page has opened.',
    },
    inp: {
      aka: 'Interaction to Next Paint',
      short: 'INP measures how long a page takes to respond visually after a click, tap or key press; a good value is 200 milliseconds or less.',
      body: 'It replaced FID as a Core Web Vital in March 2024.',
    },
    cls: {
      aka: 'Cumulative Layout Shift',
      short: 'CLS measures how much the content of a page shifts unexpectedly while it loads; a good value is 0.1 or less.',
      body: 'Images without set dimensions, late-loading fonts and blocks injected after the fact are the most common causes.',
    },
    wcag: {
      aka: 'Web Content Accessibility Guidelines',
      short: 'WCAG are the international accessibility guidelines published by the W3C so that web content can be used by everyone, including people with disabilities.',
      body: 'At level AA, normal text needs a colour contrast of at least 4.5:1; every piece of text on this site clears it.',
    },
  },
};
