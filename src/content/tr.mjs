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
  glossaryPath: '/sozluk/',
  servicesPath: '/hizmetler/',
  areaPath: '/hizmet-bolgesi/',
  alt: { lang: 'en', label: 'English', short: 'EN' },
  dateLocale: 'tr-TR',

  meta: {
    title: 'Eyüp DevArt — Web Tasarım, Yazılım ve SEO · AEO · GEO',
    description:
      'Eyüp DevArt, web sitelerini elle ve ölçüye göre yapar: anında açılır, Google’da bulunur, yapay zekâ cevaplarında adı geçer. WhatsApp’tan yazın.',
    ogAlt: 'Eyüp DevArt — kod ile sanatın buluştuğu çizgi',
  },

  wa: {
    default: 'Merhaba Eyüp, eyupdevart.com’dan yazıyorum. Bir proje için konuşmak isterim.',
    project: 'Merhaba Eyüp, iki cümleyle anlatayım:',
    audit: 'Merhaba Eyüp, sitemin hızına, SEO’suna ve yapay zekâ görünürlüğüne bir göz atar mısınız? Adresi:',
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
    palettePlaceholder: 'Nereye gidelim?',
    paletteEmpty: 'Burada yok. WhatsApp’tan sormak daha çabuk olabilir.',
    paletteHint: 'gezin · seç · kapat',
    copied: 'Numara kopyalandı',
    opening: 'WhatsApp açılıyor…',
    dock: { label: 'WhatsApp’tan yazın', sub: 'İlk satırı ben yazdım' },
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
    audit: 'Sitenize bir göz atayım',
    guide: 'AEO ve GEO rehberi',
    glossary: 'Sözlük: SEO, AEO, GEO terimleri',
    area: 'Hizmet bölgesi: 81 il, 973 ilçe',
    lang: 'English version',
    llms: 'llms.txt — yapay zekâ için site özeti',
    top: 'Başa dön',
    share: 'Bu sayfayı paylaşın',
  },

  hero: {
    eyebrow: ['Eyüp', 'DevArt', 'Geliştirici + Sanatçı'],
    h1: '*Sanatçı* gibi tasarlar, `mühendis` gibi kodlarım.',
    lead: 'Web sitelerini elle, ölçüye göre yapıyorum: açıldığı anda güven veren, Google’da kolayca bulunan, ChatGPT’nin bile adını andığı siteler.',
    ctaSecondary: 'Önce işlere bakın',
    hint: 'İmleci gezdirin — çizgi sizin elinizde',
    hintTouch: 'Sürükleyin — çizgi sizin elinizde',
    chip: 'Bu sayfa cihazınızda {t} saniyede açıldı',
    chipIdle: 'Cihazınızda ölçülüyor…',
    scroll: 'Kaydırın',
  },

  short: {
    id: 'kisaca',
    label: 'Kısaca',
    q: 'Eyüp DevArt kimdir?',
    a: 'Eyüp DevArt, web sitelerini hem tasarlayan hem de kodlayan bir geliştirici ve dijital sanatçıdır; DevArt, Eyüp’ün sahne adı. Markalar ve işletmeler için çalışır; tasarımı, kodu, hızı ve arama görünürlüğünü tek elde toplar. Ortaya çıkan siteyi ziyaretçi de, Google da, yapay zekâ asistanları da ilk bakışta anlar.',
    facts: [
      ['Ad', 'Eyüp · sahne adı DevArt'],
      ['Uzmanlık', '<a href="{svc:web}">Web tasarım</a> · <a href="{svc:fullstack}">Web geliştirme</a> · <a href="{svc:seo}">SEO</a>, <a href="{svc:aeo-geo}">AEO, GEO</a> · <a href="{svc:speed}">Performans</a>'],
      ['Yaklaşım', 'Hazır şablon yok; her site sıfırdan, elle yazılır'],
      ['Hizmet alanı', '<a href="{area}">Türkiye’den dünyanın her yerine</a>, uzaktan'],
      ['Dil', 'Türkçe · İngilizce'],
      ['İletişim', 'WhatsApp ya da telefon: <a href="{wa}">{phone}</a>'],
    ],
  },

  manifesto: {
    label: 'Manifesto',
    // \n → a deliberate line break · \u00a0 → words that must never be parted
    text: 'Hazır şablon herkese uyar; o\u00a0yüzden kimseye *yakışmaz.* Ben siteleri terzi gibi yaparım: ölçü alırım, prova ederim, fazla `milisaniyeleri` keserim.\nYavaş dikilir, *çabuk*\u00a0açılır.',
  },

  work: {
    id: 'isler',
    label: 'Seçilmiş işler',
    title: 'Laf değil, *iş.*',
    lead: 'Hepsi yayında, hepsi gerçek işletmeler için. Adresler kartların üstünde; tıklayıp kendiniz bakın.',
    visit: 'Siteyi ziyaret edin',
    items: {
      aksu: {
        kind: 'Yerel hizmet · Kurumsal site',
        summary:
          'Maltepe’de gece gündüz çalışan bir oto çekici firması. Yolda kalan biri onlara tek dokunuşla ulaşabilsin diye tasarlandı: WhatsApp’a giden kısa bir yol, İstanbul’un 39 ilçesinin her biri için ayrı bir sayfa ve mermer dokusuyla, serif harfleriyle sakin bir güven.',
        tags: ['Yerel SEO', 'Schema.org', 'Next.js', 'AVIF'],
        alt: 'Aksu Oto Çekici web sitesinin ana sayfası: mermer dokulu arka plan, serif başlık ve çekici filosu fotoğrafı',
      },
      marchetti: {
        kind: 'Marka · Web deneyimi',
        summary: 'DevArt imzalı bir marka sitesi. Görsel dili de kodu da markanın karakterine göre, sıfırdan biçildi.',
        tags: ['Marka', 'Tasarım', 'Geliştirme'],
      },
    },
    next: {
      label: 'Sıradaki',
      title: 'Sıradaki iş *sizinki.*',
      text: 'Ne yaptığınızı ve ne istediğinizi iki cümleyle yazın; gerisini birlikte düşünürüz.',
      cta: 'İki cümle yazın',
      note: 'Bir mesaj sizi hiçbir şeye bağlamaz.',
    },
  },

  services: {
    id: 'hizmetler',
    label: 'Hizmetler',
    title: 'Her şey *tek* masada.',
    lead: 'Tasarım, kod, hız ve görünürlük çoğu zaman dört ayrı ekibe dağılır. Burada aynı masada, aynı kafada buluşur; el değiştirirken hiçbir şey kaybolmaz.',
    items: [
      {
        title: 'Web tasarım & sanat yönetimi',
        text: 'Markanızın sesini görsele çeviririm: tipografi, renk, hareket, boşluk. Sayfayı açan kişi, logoyu görmeden kim olduğunuzu anlamalı.',
        tags: ['UI/UX', 'Sanat yönetimi', 'Hareket'],
        links: ['uiux', 'web'],
      },
      {
        title: 'Web geliştirme',
        text: 'Kodun görünmeyen tarafı da görünen tarafı kadar özen ister. Tanıtım sitesi, web uygulaması, WebGL deneyimi ya da yönetim paneli; hepsi hafif, güvenli ve herkesin kullanabileceği biçimde.',
        tags: ['TypeScript', 'Next.js', 'WebGL', 'Vanilla JS'],
        links: ['web', 'frontend', 'fullstack'],
      },
      {
        title: 'SEO · AEO · GEO',
        text: 'Google’da üst sıralarda olmak iyidir. ChatGPT’ye, Perplexity’ye ya da Gemini’ye sorulduğunda adınızın geçmesi daha iyi. Teknik SEO, yapılandırılmış veri, llms.txt ve sağlam kurulmuş içerikle ikisini birden hedeflerim.',
        tags: ['Teknik SEO', 'Schema.org', 'llms.txt'],
        links: ['seo', 'aeo-geo'],
      },
      {
        title: 'Performans mühendisliği',
        text: 'Yavaş bir site, daha açılmadan müşteri kaybeder. Core Web Vitals’ı yeşile, Lighthouse’u zirveye taşırım; sayfa, siz göz kırpmadan hazır olur.',
        tags: ['Core Web Vitals', 'Lighthouse', 'CDN'],
        links: ['speed'],
      },
      {
        title: 'Yerel işletme & dönüşüm',
        text: 'Bir çekici, bir diş hekimi, bir restoran: müşteri sizi telefonundan arar ve acelesi vardır. Ona en kısa yolu çizerim; bölge sayfaları, Google İşletme Profili uyumu, tek dokunuşla arama ve WhatsApp.',
        tags: ['Yerel SEO', 'WhatsApp', 'Dönüşüm'],
        links: [['seo', 'yerel-seo', 'Yerel SEO']],
      },
      {
        title: 'Bakım & büyüme',
        text: 'Site yayına girdiği gün işim bitmez. Ölçerim, güncellerim, güvenliğini takip ederim; siz büyüdükçe site de sizinle büyür.',
        tags: ['Analitik', 'Güvenlik', 'Destek'],
      },
    ],
  },

  proof: {
    id: 'kanit',
    label: 'Kanıt',
    title: 'Bu sayfa, *kendi kanıtı.*',
    lead: 'Bu rakamları ben yazmadım. Sayfa açılırken tarayıcınız ölçtü; şu\u00a0an, sizin cihazınızda.',
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
      'Eşikler, Google’ın Core Web Vitals sınırlarıdır: LCP ≤ 2,5 sn · INP ≤ 200 ms · CLS ≤ 0,1. Bağlantınız ve cihazınız değiştikçe sonuçlar da değişir; gerçek ziyaretçilerinizde olduğu gibi.',
    claims: ['Framework yok', 'Reklam takibi yok', 'Çerez yok', 'Her satırı elle'],
    hook: { text: 'Kendi sitenizin rakamlarını merak ediyor musunuz?', link: 'Adresini gönderin, aynı ölçümü yapayım' },
  },

  process: {
    id: 'surec',
    label: 'Süreç',
    title: 'Dört adım, *sürpriz* yok.',
    steps: [
      {
        title: 'Keşif',
        text: 'WhatsApp’tan yazarsınız, konuşuruz: ne yapıyorsunuz, kime yapıyorsunuz, kimlerle yarışıyorsunuz. Görüşmeden net bir kapsam ve takvimle çıkarsınız.',
      },
      {
        title: 'Strateji & tasarım',
        text: 'İnsanlar sizi nasıl arıyor, neyi soruyor? Önce bunun haritasını çıkarırım. Tasarım bu haritanın üstüne kurulur; siz onu tıklanabilir bir prototip olarak görürsünüz.',
      },
      {
        title: 'Geliştirme',
        text: 'Her şey elle yazılır, bir performans bütçesine sadık kalarak. Erişilebilirlik ve yapılandırılmış veri sona eklenen birer süs değildir; ilk satırdan oradadır.',
      },
      {
        title: 'Yayın & büyüme',
        text: 'Yayından sonra Search Console’u, analitiği ve yapay zekâ cevaplarındaki görünürlüğünüzü izlerim. Neyin işe yaradığını görür, onu keskinleştiririz.',
      },
    ],
  },

  faq: {
    id: 'sss',
    label: 'SSS',
    title: 'Merak *edilenler.*',
    hook: { text: 'Sorunuz burada yok mu?', link: 'Doğrudan sorun' },
    items: [
      {
        q: 'Eyüp DevArt kimdir?',
        a: 'Eyüp DevArt, web sitelerini hem tasarlayan hem de kodlayan bir geliştirici ve dijital sanatçıdır; DevArt, Eyüp’ün sahne adı. İşletmeler ve markalar için hızlı, erişilebilir ve hem arama motorlarının hem de yapay zekâ asistanlarının zahmetsizce anladığı siteler yapar.',
      },
      {
        q: 'Hangi hizmetleri veriyorsunuz?',
        a: 'Web tasarım ve sanat yönetimi, web geliştirme, teknik SEO ile birlikte AEO ve GEO, performans çalışması, yerel işletmeler için dönüşüm odaklı siteler ve yayından sonraki bakım. Kısacası bir web sitesinin ilk eskizden yayından çok sonrasına kadar ihtiyaç duyduğu her şey. Her birinin ayrıntısı <a href="{services}">hizmetler sayfasında</a>.',
      },
      {
        q: 'AEO ve GEO nedir?',
        a: 'AEO (Answer Engine Optimization, cevap motoru optimizasyonu), arama motorlarının ve sesli asistanların doğrudan cevap olarak sizin içeriğinizi seçmesini sağlar. GEO (Generative Engine Optimization, üretken motor optimizasyonu) ise ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi yapay zekâ sistemlerinin yazdığı cevaplarda markanızın kaynak olarak geçmesini hedefler. Ayrıntılar <a href="{guide}">AEO ve GEO rehberinde</a>.',
      },
      {
        q: 'Bir web sitesi ne kadar sürede hazır olur?',
        a: 'Kapsama göre değişir; tek sayfalık bir siteyle kapsamlı bir web uygulaması aynı takvimde bitmez. İlk görüşmede net bir takvim paylaşırım, her aşamayı birlikte onaylarız. Sürprizi sevmem.',
      },
      {
        q: 'Fiyatlandırma nasıl?',
        a: 'Her proje kendi kapsamına göre fiyatlanır. Paket satmıyorum, çünkü iki işletme birbirine benzemez. Sizinkini WhatsApp’tan kısaca anlatın, size net bir teklif hazırlayayım.',
      },
      {
        q: 'Mevcut sitemi hızlandırabilir ya da SEO’sunu düzeltebilir misiniz?',
        a: 'Evet. Önce ölçerim: Core Web Vitals, taranabilirlik, dizine eklenme, yapılandırılmış veri. Sonra sorunları etkisine göre sıralar, size en çok kazandıracak olandan başlarım. Ayrıntılar <a href="{svc:speed}">site hızlandırma</a> ve <a href="{svc:seo}">SEO</a> sayfalarında.',
      },
      {
        q: 'Neden hazır şablon kullanmıyorsunuz?',
        a: 'Şablonlar herkese uysun diye yapılır; bu yüzden kimsenin kullanmadığı kodlarla gelir. Sonuç, yavaşlık ve yüz başka sitede görmüş olduğunuz bir görünümdür. Elle yazılan bir site yalnızca size gerekeni taşır: daha hızlı açılır, daha güvenlidir ve tamamen sizindir.',
      },
      {
        q: 'Türkiye dışından çalışabilir miyiz?',
        a: 'Elbette. Her şey uzaktan yürür; Türkçe ya da İngilizce, hangisi size rahatsa.',
      },
      {
        q: 'Nasıl iletişime geçebilirim?',
        a: 'En hızlısı WhatsApp: <a href="{wa}">{phone}</a>. İsterseniz aynı numaradan <a href="{tel}">arayın</a>.',
      },
    ],
  },

  contact: {
    id: 'iletisim',
    label: 'İletişim',
    title: 'Bir *merhaba* yeter.',
    lead: 'Ne yaptığınızı ve nereye varmak istediğinizi yazın. Gerisini konuşa konuşa buluruz.',
    prefilled: 'Mesajın ilk cümlesini ben yazdım; gerisi sizde.',
    assure: 'Bir mesaj sizi hiçbir şeye bağlamaz. Önce dinlerim; birbirimize uygun olup olmadığımıza birlikte karar veririz.',
    qr: 'Kameranızı buraya tutun, sohbet telefonunuzda açılsın.',
    clock: 'Türkiye’de saat',
    // Beside the clock: what the hour means, never a promise of speed.
    hours: {
      open: 'Şu an mesai saati.',
      closed: 'Mesai dışı; yine de yazın, ilk fırsatta dönerim.',
      weekend: 'Hafta sonu; yine de yazın, ilk fırsatta dönerim.',
    },
    // What happens after the message: uncertainty is what makes people hesitate.
    next: {
      label: 'Sonra ne olur?',
      steps: ['Siz yazarsınız; iki cümle yeter.', 'Ben dinler, birkaç soru sorarım.', 'Net bir kapsam ve teklifle dönerim.'],
    },
  },

  footer: {
    tagline: 'Geliştirici + Sanatçı.',
    built: 'Bu site satır satır, elle yazıldı. Framework kullanılmadı; gerek de olmadı.',
    guide: 'AEO & GEO rehberi',
    glossary: 'Sözlük',
    area: 'Hizmet bölgesi',
    llms: 'llms.txt',
    sitemap: 'Site haritası',
    resources: 'Kaynaklar',
    palette: 'Komut paleti',
    menu: 'Menü',
  },

  notFound: {
    title: 'Sayfa bulunamadı — Eyüp DevArt',
    h1: 'Bu sayfa, çizginin *öbür tarafında* kaldı.',
    text: 'Bu adres taşınmış ya da hiç var olmamış. Ama siz doğru siteye geldiniz.',
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
    glossaryLink: 'Terimler sözlüğü',
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
</ol>
<p>Bu listenin teknik kısmı <a href="{svc:seo}">SEO</a>, hız kısmı <a href="{svc:speed}">site hızlandırma</a>, gerisi <a href="{svc:aeo-geo}">AEO ve GEO</a> işidir.</p>`,
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
</tbody></table></div>
<p>Üç eşiğin altına nasıl inileceği <a href="{svc:speed}">site hızlandırma</a> sayfasında.</p>`,
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
