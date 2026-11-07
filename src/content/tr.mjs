// Türkçe içerik — sitedeki tüm metinler burada.
// Biçim: *kelime* → sanatçı yazısı (serif italik) · `kelime` → geliştirici yazısı (mono)
// {wa} → WhatsApp bağlantısı · {tel} → telefon bağlantısı · {phone} → numara

export default {
  lang: 'tr',
  htmlLang: 'tr',
  locale: 'tr_TR',
  inLanguage: 'tr-TR',
  path: '/',
  guidePath: '/rehber/aeo-geo/',
  alt: { lang: 'en', label: 'English', short: 'EN' },
  dateLocale: 'tr-TR',

  meta: {
    title: 'Eyüp DevArt — Web Tasarım, Yazılım ve SEO · AEO · GEO',
    description:
      'Geliştirici + sanatçı. Eyüp DevArt; anında açılan, Google’da ve yapay zekâ cevaplarında öne çıkan, müşteri kazandıran web siteleri tasarlar ve kodlar.',
    ogAlt: 'Eyüp DevArt — kod ile sanatın kesiştiği çizgi',
  },

  wa: {
    default: 'Merhaba Eyüp, eyupdevart.com üzerinden yazıyorum. Bir proje hakkında konuşmak istiyorum.',
    project: 'Merhaba Eyüp, projemi kısaca anlatmak istiyorum:',
    audit: 'Merhaba Eyüp, mevcut sitemin hız, SEO ve yapay zekâ görünürlüğünü değerlendirmenizi istiyorum. Site adresim:',
  },

  nav: [
    { id: 'isler', label: 'İşler' },
    { id: 'hizmetler', label: 'Hizmetler' },
    { id: 'kanit', label: 'Kanıt' },
    { id: 'surec', label: 'Süreç' },
    { id: 'sss', label: 'SSS' },
  ],

  ui: {
    skip: 'İçeriğe atla',
    home: 'Ana sayfa',
    menu: 'Menü',
    palette: 'Komut paleti',
    paletteLabel: 'Komut ara',
    palettePlaceholder: 'Nereye gidelim? Yazın…',
    paletteEmpty: 'Sonuç yok. Belki WhatsApp’tan sormak daha hızlı olur.',
    paletteHint: 'gezin · seç · kapat',
    copied: 'Numara kopyalandı',
    whatsapp: 'WhatsApp’tan yazın',
    whatsappShort: 'WhatsApp',
    call: 'Arayın',
    langSwitch: 'Switch to English',
    external: '(yeni sekmede açılır)',
    backTop: 'Başa dön',
    copyNumber: 'Numarayı kopyala',
    close: 'Kapat',
    rail: 'İşler — kaydırarak gezin',
  },

  commands: {
    groupActions: 'Eylemler',
    groupGo: 'Git',
    whatsapp: 'WhatsApp’tan yazın',
    call: 'Telefonla arayın',
    copy: 'Numarayı kopyalayın',
    audit: 'Ücretsiz site değerlendirmesi isteyin',
    guide: 'AEO ve GEO rehberi',
    lang: 'English version',
    llms: 'llms.txt — yapay zekâ için site özeti',
    top: 'Başa dön',
    share: 'Bu sayfayı paylaşın',
  },

  hero: {
    eyebrow: ['Eyüp', 'DevArt', 'Geliştirici + Sanatçı'],
    h1: '*Sanatçı* gibi tasarlar, `mühendis` gibi kodlarım.',
    lead: 'Anında açılan, Google’da ve yapay zekâ cevaplarında öne çıkan, ziyaretçiyi müşteriye çeviren web siteleri. Hazır şablon yok. Sıradanlık yok.',
    ctaSecondary: 'İşleri görün',
    hint: 'İmleci gezdirin — çizgi sizin elinizde',
    hintTouch: 'Sürükleyin — çizgi sizin elinizde',
    chip: 'Bu sayfa cihazınızda {t} sn’de açıldı',
    chipIdle: 'Cihazınızda ölçülüyor…',
    scroll: 'Kaydırın',
  },

  short: {
    id: 'kisaca',
    label: 'Kısaca',
    q: 'Eyüp DevArt kimdir?',
    a: 'Eyüp DevArt; sahne adı DevArt olan, web tasarımını ve yazılım geliştirmeyi tek elde birleştiren bir geliştirici ve dijital sanatçıdır. İşletmeler ve markalar için anında açılan, erişilebilir, Google’ın ve yapay zekâ asistanlarının kolayca anlayıp kaynak gösterebileceği web siteleri tasarlar ve kodlar.',
    facts: [
      ['Ad', 'Eyüp · sahne adı DevArt'],
      ['Uzmanlık', 'Web tasarım · Web geliştirme · SEO, AEO, GEO · Performans'],
      ['Yaklaşım', 'Şablonsuz. Elle kodlanmış. Ölçülebilir.'],
      ['Hizmet alanı', 'Türkiye merkezli · uzaktan dünya çapında'],
      ['Dil', 'Türkçe · İngilizce'],
      ['İletişim', 'WhatsApp ve telefon: <a href="{wa}">{phone}</a>'],
    ],
  },

  manifesto: {
    label: 'Manifesto',
    text: 'Çoğu web sitesi var olmak için yapılır. Benimkiler *kazanmak* için. Her piksel bir karar, her `milisaniye` bir rakip. `Kod` fırçam, tarayıcı *tuvalim* — ve o tuvalde sıradanlığa yer yok.',
  },

  work: {
    id: 'isler',
    label: 'Seçilmiş işler',
    title: 'Konuşan *işler.*',
    lead: 'Yayında, gerçek işletmeler için. Her biri kendi sektöründe çıtayı yükseltmek için tasarlandı.',
    visit: 'Siteyi ziyaret edin',
    items: {
      aksu: {
        kind: 'Yerel hizmet · Kurumsal site',
        summary:
          'Maltepe merkezli 7/24 oto çekici firması için yerel SEO odaklı, WhatsApp’a dönüşen kurumsal site. İlçe bazlı bölge sayfaları; mermer dokulu, serif tipografili premium sanat yönetimi.',
        tags: ['Yerel SEO', 'Schema.org', 'Next.js', 'AVIF'],
        alt: 'Aksu Oto Çekici web sitesinin ana sayfası: mermer dokulu arka plan, serif başlık ve çekici filosu fotoğrafı',
      },
      marchetti: {
        kind: 'Marka · Web deneyimi',
        summary:
          'DevArt imzalı marka sitesi: markanın karakterini taşıyan özgün bir görsel dil ve özenle kodlanmış bir deneyim.',
        tags: ['Marka', 'Tasarım', 'Geliştirme'],
      },
    },
    next: {
      label: 'Sıradaki',
      title: 'Sıradaki iş *sizinki.*',
      text: 'Projenizi iki cümleyle anlatın; gerisini birlikte kurgulayalım.',
      cta: 'Projenizi anlatın',
    },
  },

  services: {
    id: 'hizmetler',
    label: 'Hizmetler',
    title: 'Tasarımdan koda, koddan *zirveye.*',
    lead: 'Strateji, tasarım, geliştirme ve görünürlük — tek elden, tek imzayla.',
    items: [
      {
        title: 'Web tasarım & sanat yönetimi',
        text: 'Markanıza özel görsel dil, tipografi, hareket ve etkileşim. Şablon değil, imza.',
        tags: ['UI/UX', 'Sanat yönetimi', 'Hareket'],
      },
      {
        title: 'Web geliştirme',
        text: 'Elle yazılmış, hafif, güvenli ve erişilebilir kod. Tanıtım sitesinden web uygulamasına, WebGL deneyimlerinden yönetim panellerine.',
        tags: ['TypeScript', 'Next.js', 'WebGL', 'Vanilla JS'],
      },
      {
        title: 'SEO · AEO · GEO',
        text: 'Google’da üst sıralar; ChatGPT, Perplexity, Gemini ve Google AI Overviews cevaplarında kaynak gösterilen bir marka. Teknik SEO, Schema.org, llms.txt ve içerik mimarisi.',
        tags: ['Teknik SEO', 'Schema.org', 'llms.txt'],
      },
      {
        title: 'Performans mühendisliği',
        text: 'Core Web Vitals’ı yeşile, Lighthouse skorlarını zirveye taşıyan optimizasyon. Hız, dönüşümün sessiz ortağıdır.',
        tags: ['Core Web Vitals', 'Lighthouse', 'CDN'],
      },
      {
        title: 'Yerel işletme & dönüşüm',
        text: 'Telefona ve WhatsApp’a giden en kısa yol: hizmet bölgesi sayfaları, Google İşletme Profili uyumu, tek dokunuşla iletişim.',
        tags: ['Yerel SEO', 'WhatsApp', 'Dönüşüm'],
      },
      {
        title: 'Bakım & büyüme',
        text: 'Yayından sonra da yanınızdayım: ölçüm, güncelleme, güvenlik ve sürekli iyileştirme.',
        tags: ['Analitik', 'Güvenlik', 'Destek'],
      },
    ],
  },

  proof: {
    id: 'kanit',
    label: 'Kanıt',
    title: 'Bu sayfa, *kendi kanıtı.*',
    lead: 'Aşağıdaki değerler iddia değil. Şu anda, sizin cihazınızda, tarayıcınızın kendi ölçüm API’leriyle hesaplandı.',
    metrics: {
      ttfb: 'İlk bayt',
      fcp: 'İlk içerik',
      lcp: 'En büyük içerik',
      cls: 'Düzen kayması',
      inp: 'Etkileşim gecikmesi',
      weight: 'Aktarılan veri',
      requests: 'İstek',
      js: 'JavaScript',
    },
    status: {
      good: 'İyi',
      ni: 'Geliştirilmeli',
      poor: 'Zayıf',
      wait: 'Ölçülüyor',
      interact: 'Bir yere dokunun',
      na: 'Desteklenmiyor',
    },
    footnote:
      'Eşikler, Google’ın Core Web Vitals sınırlarıdır: LCP ≤ 2,5 sn · INP ≤ 200 ms · CLS ≤ 0,1. Değerler bağlantınıza ve cihazınıza göre değişir — tıpkı gerçek ziyaretçilerinizde olduğu gibi.',
    claims: ['Framework yok', 'Takip kodu yok', 'Çerez yok', 'Elle yazıldı'],
  },

  process: {
    id: 'surec',
    label: 'Süreç',
    title: 'Fikirden *yayına* dört adım.',
    steps: [
      {
        title: 'Keşif',
        text: 'WhatsApp’tan yazarsınız; hedefi, kitleyi ve rakipleri konuşuruz. Net bir kapsam ve takvimle başlarız.',
      },
      {
        title: 'Strateji & tasarım',
        text: 'İçerik mimarisi, arama ve soru haritası; ardından markanıza özel tasarım ve etkileşim prototipi.',
      },
      {
        title: 'Geliştirme',
        text: 'Elle kodlama, performans bütçesi, erişilebilirlik ve yapılandırılmış veri. Her satır bir sebeple orada.',
      },
      {
        title: 'Yayın & büyüme',
        text: 'Search Console, analitik ve yapay zekâ görünürlüğü takibi. Ölçer, öğrenir, iyileştiririz.',
      },
    ],
  },

  faq: {
    id: 'sss',
    label: 'SSS',
    title: 'Sık sorulan *sorular.*',
    items: [
      {
        q: 'Eyüp DevArt kimdir?',
        a: 'Eyüp DevArt, sahne adı DevArt olan bir geliştirici ve dijital sanatçıdır. Web tasarımını ve yazılım geliştirmeyi tek elde birleştirerek işletmeler ve markalar için hızlı, erişilebilir ve arama motorlarıyla yapay zekâ asistanlarının kolayca anlayabildiği web siteleri üretir.',
      },
      {
        q: 'Hangi hizmetleri veriyorsunuz?',
        a: 'Web tasarım ve sanat yönetimi, web geliştirme, teknik SEO ile AEO ve GEO çalışmaları, performans optimizasyonu, yerel işletmeler için dönüşüm odaklı siteler ile yayın sonrası bakım ve büyüme desteği.',
      },
      {
        q: 'AEO ve GEO nedir?',
        a: 'AEO (Answer Engine Optimization, cevap motoru optimizasyonu), içeriğinizin arama motorlarında ve sesli asistanlarda doğrudan cevap olarak seçilmesi için yapılan optimizasyondur. GEO (Generative Engine Optimization, üretken motor optimizasyonu) ise ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi yapay zekâ sistemlerinin cevaplarında markanızın kaynak olarak gösterilmesini hedefler. Ayrıntılar için <a href="{guide}">AEO ve GEO rehberine</a> göz atın.',
      },
      {
        q: 'Bir web sitesi ne kadar sürede hazır olur?',
        a: 'Kapsama göre değişir. İlk görüşmede net bir takvim paylaşırım ve her aşamayı birlikte onaylayarak ilerleriz; sürpriz yok.',
      },
      {
        q: 'Fiyatlandırma nasıl?',
        a: 'Her proje kendi kapsamına göre fiyatlandırılır; hazır paket satmıyorum. Projenizi WhatsApp’tan kısaca anlatın, size net bir teklif hazırlayayım.',
      },
      {
        q: 'Mevcut sitemi hızlandırabilir ya da SEO’sunu düzeltebilir misiniz?',
        a: 'Evet. Önce ölçerim: Core Web Vitals, taranabilirlik, indeksleme ve yapılandırılmış veri. Ardından etkisine göre sıralanmış bir yol haritası çıkarır, en kritik sorunlardan başlarız.',
      },
      {
        q: 'Neden hazır şablon kullanmıyorsunuz?',
        a: 'Şablonlar herkese uyabilmek için kullanılmayan kodla gelir; bu da yavaşlık ve sıradan bir görünüm demektir. Elle kodlanan bir site yalnızca ihtiyacınız olanı taşır: daha hızlı açılır, daha güvenlidir ve tamamen size aittir.',
      },
      {
        q: 'Türkiye dışından çalışabilir miyiz?',
        a: 'Elbette. Süreç tamamen uzaktan yürür; Türkçe veya İngilizce iletişim kurabiliriz.',
      },
      {
        q: 'Nasıl iletişime geçebilirim?',
        a: 'En hızlı yol WhatsApp: <a href="{wa}">{phone}</a>. Aynı numaradan <a href="{tel}">arayabilirsiniz</a> de.',
      },
    ],
  },

  contact: {
    id: 'iletisim',
    label: 'İletişim',
    title: 'Hadi *konuşalım.*',
    lead: 'Bir mesaj, bir fikir, bir hedef. Gerisini birlikte inşa ederiz.',
    prefilled: 'Mesaj hazır — yalnızca gönder’e basın.',
    qr: 'Telefonunuzla okutun; sohbet doğrudan açılsın.',
    clock: 'Türkiye’de saat',
  },

  footer: {
    tagline: 'Geliştirici + Sanatçı.',
    built: 'Bu site hiçbir framework kullanılmadan, elle yazıldı.',
    guide: 'AEO & GEO rehberi',
    llms: 'llms.txt',
    sitemap: 'Site haritası',
    palette: 'Komut paleti',
    menu: 'Menü',
  },

  notFound: {
    title: 'Sayfa bulunamadı — Eyüp DevArt',
    h1: 'Bu sayfa, çizginin *öbür tarafında* kaldı.',
    text: 'Aradığınız adres taşınmış ya da hiç var olmamış olabilir. Ama doğru yerdesiniz.',
    home: 'Ana sayfaya dönün',
  },

  guide: {
    meta: {
      title: 'AEO ve GEO Nedir? Yapay Zekâ Aramasında Görünür Olma Rehberi',
      description:
        'SEO, AEO ve GEO farkı, yapay zekâ motorlarının kaynak seçme mantığı ve ChatGPT, Perplexity, Gemini cevaplarında yer almak için uygulanabilir kontrol listesi.',
      ogAlt: 'AEO ve GEO rehberi — Eyüp DevArt',
    },
    crumb: 'AEO ve GEO rehberi',
    label: 'Rehber',
    h1: 'AEO ve GEO nedir? Yapay zekâ aramasında *görünür olma* rehberi',
    byline: 'Yazan',
    updated: 'Güncellendi',
    minutes: 'dk okuma',
    tldrLabel: 'Kısa cevap',
    tldr: 'AEO (Answer Engine Optimization), içeriğinizin arama motorlarında ve asistanlarda doğrudan cevap olarak seçilmesini; GEO (Generative Engine Optimization) ise ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi üretken yapay zekâ sistemlerinin cevaplarında kaynak olarak gösterilmenizi hedefler. İkisi de sağlam bir SEO temeli üzerine kurulur: hızlı, taranabilir, yapılandırılmış ve güvenilir içerik.',
    tocLabel: 'Bu rehberde',
    sections: [
      {
        id: 'fark',
        h2: 'SEO, AEO ve GEO: farkı ne?',
        html: `<p>Üçü de aynı soruya cevap arar: <strong>birisi sizin alanınızda bir şey sorduğunda, cevap neden siz olasınız?</strong> Fark, cevabın nerede ve nasıl gösterildiğindedir.</p>
<div class="table-wrap" role="region" aria-label="SEO, AEO ve GEO karşılaştırması" tabindex="0"><table>
<thead><tr><th scope="col"></th><th scope="col">SEO</th><th scope="col">AEO</th><th scope="col">GEO</th></tr></thead>
<tbody>
<tr><th scope="row">Hedef</th><td>Arama sonuçlarında üst sıralar</td><td>Doğrudan cevap olarak seçilmek</td><td>Yapay zekâ cevaplarında kaynak gösterilmek</td></tr>
<tr><th scope="row">Nerede</th><td>Google ve Bing sonuç sayfaları</td><td>Öne çıkan snippet’ler, “Diğer sorular”, sesli asistanlar</td><td>ChatGPT, Perplexity, Gemini, Copilot, Google AI Overviews</td></tr>
<tr><th scope="row">Başarı ölçütü</th><td>Sıralama ve tıklama</td><td>Cevap kutusunda yer almak</td><td>Alıntılanmak ve marka olarak anılmak</td></tr>
<tr><th scope="row">Ana araçlar</th><td>Anahtar kelime, teknik SEO, bağlantılar</td><td>Soru-cevap yapısı, net tanımlar, FAQ şeması</td><td>Kaynak gösterilebilir olgular, varlık tutarlılığı, yapılandırılmış veri, llms.txt</td></tr>
</tbody></table></div>
<p>Kısacası: <strong>SEO bulunmanızı, AEO seçilmenizi, GEO ise alıntılanmanızı</strong> sağlar. Birbirinin alternatifi değil, üst üste binen katmanlardır.</p>`,
      },
      {
        id: 'nasil-secer',
        h2: 'Yapay zekâ motorları kaynak seçerken neye bakar?',
        html: `<p>Perplexity, ChatGPT arama özelliği ve Google AI Overviews gibi sistemlerin çoğu iki adımda çalışır: önce bir arama dizininden ilgili sayfaları <em>getirir</em>, ardından bir dil modeli bu sayfalardaki pasajlardan bir cevap <em>sentezler</em> ve kaynak gösterir. Bu yüzden üç koşulu aynı anda sağlamanız gerekir:</p>
<ol>
<li><strong>Bulunabilir olun.</strong> Sayfanız taranamıyor ya da dizinde değilse, modele hiç ulaşmaz.</li>
<li><strong>Alıntılanabilir olun.</strong> Model, tek başına anlaşılır, net ve olgu içeren pasajları tercih eder. Bağlama muhtaç, süslü cümleler kolay alıntılanmaz.</li>
<li><strong>Güvenilir olun.</strong> Kim olduğunuz, ne yaptığınız ve nerede olduğunuz her yerde tutarlı olmalı; iddialarınız kaynaklarla desteklenmeli.</li>
</ol>
<p>Bu alandaki en çok atıf alan çalışmalardan biri olan <a href="https://arxiv.org/abs/2311.09735" rel="noopener">“GEO: Generative Engine Optimization”</a> (Aggarwal ve ark., 2023), kaynak göstermenin, alıntı eklemenin ve istatistik kullanmanın içeriğin üretken motor cevaplarındaki görünürlüğünü belirgin biçimde artırabildiğini gösterdi; çalışmada <strong>%40’a varan</strong> artışlar raporlandı.</p>`,
      },
      {
        id: 'kontrol-listesi',
        h2: 'Kontrol listesi: 12 adımda görünür olun',
        html: `<ol class="checklist">
<li><strong>Cevabı ilk cümlede verin.</strong> Her bölüm, sorunun doğrudan cevabıyla başlasın; ayrıntı sonra gelsin.</li>
<li><strong>Gerçek soruları başlık yapın.</strong> Kitlenizin sorduğu biçimde: “… nedir?”, “… ne kadar sürer?”, “… nasıl seçilir?”</li>
<li><strong>Kendi başına anlaşılır bloklar yazın.</strong> Her paragraf, sayfanın geri kalanı olmadan da anlam taşısın.</li>
<li><strong>Olgu, rakam ve kaynak ekleyin.</strong> Ölçülebilir iddialar ve güvenilir kaynaklara bağlantılar alıntılanma şansını artırır.</li>
<li><strong>Varlığınızı tanımlayın.</strong> Ad, ne yaptığınız, nerede olduğunuz ve iletişim bilgileriniz sitede, Google İşletme Profili’nde ve sosyal profillerde birebir aynı olsun.</li>
<li><strong>Schema.org yapılandırılmış verisi kullanın.</strong> Organization veya Person, Service, FAQPage, Article ve BreadcrumbList’i tek bir <code>@graph</code> içinde, <code>@id</code>’lerle birbirine bağlayın.</li>
<li><strong>Kimliğinizi <code>sameAs</code> ile bağlayın.</strong> Resmî profillerinizi işaret ederek modellerin sizi doğru varlıkla eşleştirmesini sağlayın.</li>
<li><strong><code>llms.txt</code> yayımlayın.</strong> Yapay zekâ ajanlarına sitenizin özetini ve önemli sayfalarını Markdown olarak sunan önerilmiş bir standarttır (Jeremy Howard, 2024). Desteği motordan motora değişir, ancak maliyeti çok düşüktür.</li>
<li><strong>Yapay zekâ tarayıcılarını bilinçli yönetin.</strong> <code>robots.txt</code> dosyanızda GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot ve Google-Extended gibi ajanlara ne izin verdiğinizi açıkça belirtin.</li>
<li><strong>İçeriği HTML’de sunun.</strong> Birçok yapay zekâ tarayıcısı JavaScript çalıştırmaz; kritik metin, sunucudan gelen HTML’de yer almalı.</li>
<li><strong>Hızlı olun.</strong> Core Web Vitals eşiklerini geçin: LCP ≤ 2,5 sn, INP ≤ 200 ms, CLS ≤ 0,1.</li>
<li><strong>Güncel tutun ve tarih verin.</strong> Görünür bir güncelleme tarihi ve şemada <code>dateModified</code> kullanın.</li>
</ol>`,
      },
      {
        id: 'core-web-vitals',
        h2: 'Teknik temel: Core Web Vitals',
        html: `<p>Hız hem sıralama sinyalidir hem de ziyaretçinin sabrıdır. Google’ın “iyi” kabul ettiği eşikler, sayfa ziyaretlerinin 75. yüzdelik dilimine göre ölçülür:</p>
<div class="table-wrap" role="region" aria-label="Core Web Vitals eşikleri" tabindex="0"><table>
<thead><tr><th scope="col">Metrik</th><th scope="col">Neyi ölçer?</th><th scope="col">İyi</th></tr></thead>
<tbody>
<tr><th scope="row">LCP</th><td>Sayfanın ana içeriğinin ne kadar hızlı göründüğü</td><td>≤ 2,5 sn</td></tr>
<tr><th scope="row">INP</th><td>Tıklama ve dokunuşlara ne kadar hızlı tepki verildiği</td><td>≤ 200 ms</td></tr>
<tr><th scope="row">CLS</th><td>Sayfa yüklenirken içeriğin ne kadar kaydığı</td><td>≤ 0,1</td></tr>
</tbody></table></div>`,
      },
      {
        id: 'bu-sitede',
        h2: 'Bu sitede nasıl uyguladım?',
        html: `<p>eyupdevart.com bu rehberin canlı örneğidir. Kaynağını tarayıcınızda açıp inceleyebilirsiniz:</p>
<ul>
<li>Ana sayfadaki “Kısaca” bloğu, “Eyüp DevArt kimdir?” sorusunu ilk cümlede cevaplar ve <code>SpeakableSpecification</code> ile işaretlidir.</li>
<li>Tek bir JSON-LD <code>@graph</code>: WebSite, Person, ProfessionalService, FAQPage, Article ve BreadcrumbList birbirine <code>@id</code> ile bağlıdır.</li>
<li><a href="/llms.txt">/llms.txt</a> ve <a href="/llms-full.txt">/llms-full.txt</a> dosyaları, sitenin tamamını yapay zekâ için Markdown olarak sunar.</li>
<li><code>robots.txt</code>, arama ve yapay zekâ tarayıcılarına açıkça izin verir; Türkçe ve İngilizce sürümler <code>hreflang</code> ile eşleşir.</li>
<li>Sıfır framework, satır içi kritik CSS ve metrikleri eşlenmiş yazı tipleri sayesinde düzen kayması sıfırdır.</li>
<li>Tüm içerik JavaScript olmadan da HTML’de eksiksiz durur.</li>
</ul>`,
      },
    ],
    faqTitle: 'Sık sorulanlar',
    faq: [
      {
        q: 'GEO, SEO’nun yerini mi alıyor?',
        a: 'Hayır. GEO, SEO temeli üzerine kurulur. Yapay zekâ arama sistemlerinin çoğu, cevap üretmeden önce kaynakları bir arama dizininden çeker; dizinde güçlü olmayan bir sayfanın alıntılanma şansı düşüktür.',
      },
      {
        q: 'llms.txt zorunlu mu?',
        a: 'Hayır. llms.txt, 2024’te önerilmiş bir standarttır ve desteği motordan motora değişir. Hazırlaması kolay ve maliyeti düşük olduğu için eklemek mantıklıdır, ancak tek başına bir sihirli değnek değildir.',
      },
      {
        q: 'Sonuçlar ne zaman görülür?',
        a: 'Değişir. Yeni içeriğin taranması, dizine eklenmesi ve yapay zekâ sistemlerinin kaynaklarına yansıması zaman alır. Gelişimi Search Console verileri ve düzenli yapay zekâ sorgu testleriyle ölçeriz.',
      },
      {
        q: 'Kendi sitemde nereden başlamalıyım?',
        a: 'Önce teknik temel: indekslenebilirlik ve hız. Ardından cevabı ilk cümlede veren içerik ve yapılandırılmış veri. Site adresinizi WhatsApp’tan gönderirseniz birlikte bakabiliriz.',
      },
    ],
    cta: {
      title: 'Siteniz yapay zekâ cevaplarında *görünüyor mu?*',
      text: 'Adresi gönderin; hız, SEO ve yapay zekâ görünürlüğünü birlikte değerlendirelim.',
      button: 'Değerlendirme isteyin',
    },
  },
};
