// Services: /hizmetler/… and /en/services/…
// One page per real search intent, never one page per keyword. Every page opens
// with a self-contained answer (the passage search engines and AI assistants can
// quote as-is), then what is included, how the work runs, and the questions people
// actually ask. Ids are shared across languages, so twins and links always match.
//
// Placeholders (resolved by templates.fill): {guide} {glossary} {svc:<id>} {jsKB}
// Wikidata ids were looked up on wikidata.org, not recalled: they tie each page to the
// exact concept it is about, which is how knowledge graphs disambiguate.

export const services = [
  {
    id: 'web',
    slug: { tr: 'web-sitesi-yapimi', en: 'website-design-development' },
    wikidata: [['Q190637', 'Web design'], ['Q386275', 'Web development']],
    related: ['uiux', 'frontend', 'seo'],
    terms: ['core-web-vitals', 'structured-data', 'wcag'],
  },
  {
    id: 'uiux',
    slug: { tr: 'ui-ux-tasarim', en: 'ui-ux-design' },
    wikidata: [['Q135707', 'User interface design'], ['Q11248500', 'User experience design'], ['Q11285657', 'Art direction']],
    related: ['web', 'frontend', 'speed'],
    terms: ['wcag', 'inp', 'cls'],
  },
  {
    id: 'frontend',
    slug: { tr: 'frontend-gelistirme', en: 'front-end-development' },
    wikidata: [['Q4130556', 'Front-end development'], ['Q375913', 'WebGL'], ['Q808932', 'Web accessibility']],
    related: ['fullstack', 'uiux', 'speed'],
    terms: ['lcp', 'inp', 'cls', 'wcag'],
  },
  {
    id: 'fullstack',
    slug: { tr: 'full-stack-gelistirme', en: 'full-stack-development' },
    wikidata: [['Q110245837', 'Back-end development'], ['Q4130556', 'Front-end development']],
    related: ['frontend', 'web', 'aeo-geo'],
    terms: ['structured-data', 'sitemap', 'core-web-vitals'],
  },
  {
    id: 'seo',
    slug: { tr: 'seo', en: 'seo' },
    wikidata: [['Q180711', 'Search engine optimization'], ['Q30324357', 'Local search engine optimization']],
    related: ['aeo-geo', 'speed', 'web'],
    terms: ['canonical', 'sitemap', 'hreflang', 'eeat'],
  },
  {
    id: 'aeo-geo',
    slug: { tr: 'aeo-geo', en: 'aeo-geo' },
    wikidata: [['Q97171941', 'Answer engine optimization'], ['Q134083964', 'Generative engine optimization']],
    related: ['seo', 'fullstack', 'web'],
    terms: ['aeo', 'geo', 'entity', 'json-ld', 'llms-txt'],
  },
  {
    id: 'speed',
    slug: { tr: 'site-hizlandirma', en: 'website-speed-optimization' },
    wikidata: [['Q7978612', 'Web performance optimization'], ['Q104618838', 'Core Web Vitals']],
    related: ['frontend', 'seo', 'web'],
    terms: ['core-web-vitals', 'lcp', 'inp', 'cls'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export const tr = {
  path: '/hizmetler/',
  ui: {
    label: 'Hizmet',
    answer: 'Kısaca',
    facts: 'Bir bakışta',
    toc: 'Bu sayfada',
    faq: 'Sık sorulanlar',
    related: 'İlgili hizmetler',
    terms: 'Sözlükten',
    all: 'Tüm hizmetler',
    more: 'Ayrıntılar',
    homeMore: 'Tüm hizmetler, ayrıntılarıyla',
    inPractice: 'Uygulamada',
    rows: { for: 'Kimler için', includes: 'Neler dahil', stack: 'Teknolojiler', measure: 'Ölçüt', start: 'Başlangıç' },
    hook: 'Uzun uzun anlatmanız gerekmez.',
  },

  hub: {
    meta: {
      title: 'Hizmetler — Web Tasarım, Yazılım, SEO, AEO, GEO | Eyüp DevArt',
      description:
        'Web sitesi yapımı, UI/UX, frontend, full-stack, SEO, AEO, GEO ve site hızlandırma: her hizmetin ne olduğu, neleri kapsadığı ve kimin işine yaradığı.',
      ogAlt: 'Eyüp DevArt hizmetleri',
    },
    crumb: 'Hizmetler',
    label: 'Hizmetler',
    h1: 'Bir siteye *ne* `gerekiyorsa`.',
    intro:
      'Tasarım, kod, hız ve görünürlük çoğu zaman dört ayrı ekibe dağılır. Burada hepsi aynı elde. Her birinin ne olduğu, neyi kapsadığı ve kimin işine yaradığı aşağıda; nereden başlayacağınızı bilmiyorsanız sormanız yeter.',
    answer:
      'Eyüp DevArt yedi hizmet sunar: web sitesi yapımı, UI/UX tasarım, frontend geliştirme, full-stack ve backend geliştirme, SEO (yerel SEO dahil), AEO ve GEO, web sitesi hızlandırma. Hepsi tek elden yürür; Türkiye’nin her yerinden ve yurt dışından müşterilerle, uzaktan, Türkçe ya da İngilizce.',
    faq: [
      {
        q: 'Hangi hizmetle başlamalıyım?',
        a: 'Siteniz yoksa web sitesi yapımıyla. Siteniz var ama bulunmuyorsa SEO ile. Bulunuyor ama yavaşsa hızlandırmayla. Emin değilseniz adresi gönderin; ölçer, birlikte karar veririz.',
      },
      {
        q: 'Hangi şehirlerde hizmet veriyorsunuz?',
        a: 'İşin tamamı uzaktan yürüdüğü için İstanbul’dan Ankara’ya, İzmir’den Van’a, Türkiye’nin her ilinden ve yurt dışından müşterilerle çalışıyorum. Konuşmalar WhatsApp’ta ya da görüntülü görüşmede; Türkçe ya da İngilizce.',
      },
      {
        q: 'Hizmetleri ayrı ayrı alabilir miyim?',
        a: 'Evet. Yalnızca bir SEO denetimi, yalnızca hızlandırma ya da yalnızca tasarım da olur. Ama hepsi aynı elde olduğunda biri öbürünü bozmaz: hız için yapılan bir değişiklik SEO’yu, SEO için yapılan bir değişiklik tasarımı zorlamaz.',
      },
    ],
    cta: {
      title: 'Nereden *başlayalım?*',
      text: 'Ne yaptığınızı ve neye ihtiyaç duyduğunuzu iki cümleyle yazın; doğru yerden başlayalım.',
      button: 'WhatsApp’tan yazın',
    },
  },

  items: {
    // ── Web sitesi yapımı ──────────────────────────────────────────────────
    web: {
      meta: {
        title: 'Web Sitesi Yapımı — Kurumsal Web Tasarım | Eyüp DevArt',
        description:
          'Kurumsal web sitesi yapımı: şablonsuz, elle yazılmış, hızlı açılan ve Google’da bulunan siteler. Tasarımdan yayına tek elden. Kapsamı WhatsApp’tan konuşalım.',
      },
      crumb: 'Web sitesi yapımı',
      name: 'Web sitesi yapımı',
      serviceType: 'Web tasarım ve web geliştirme',
      summary: 'Şablonsuz, elle yazılmış kurumsal siteler: tasarım, kod ve Google görünürlüğü tek elden.',
      h1: 'Web sitesi yapımı: *ölçüye göre,* `elle yazılmış`.',
      answer:
        'Web sitesi yapımı, bir işletmenin internetteki adresini baştan sona kurmaktır: içerik planı, tasarım, kodlama, hız, SEO ve yayın. Ben bunların hepsini tek elden ve hazır şablon kullanmadan yapıyorum. Sonuç, sizin için yazılmış, çabuk açılan ve hem Google’ın hem de yapay zekâ asistanlarının kolayca anladığı bir site.',
      facts: {
        for: 'Kurumsal firmalar · Yerel işletmeler · Markalar · Kişisel siteler',
        includes: 'İçerik planı · Tasarım · Kodlama · SEO · Yayın',
        measure: 'Core Web Vitals · Lighthouse · Arama görünürlüğü',
        start: 'WhatsApp’tan iki cümle',
      },
      sections: [
        {
          id: 'neler-dahil',
          h2: 'Web sitesi yaptırırken neler dahil?',
          html: `<p>Bir site, ekranda gördüğünüz sayfalardan ibaret değildir. Yaptığım her projede şunlar baştan vardır; sonradan “ek paket” olarak gelmez:</p>
<ul>
<li><strong>İçerik ve sayfa planı.</strong> Müşterileriniz sizi hangi kelimelerle arıyor, hangi soruları soruyor? Sayfalar bu haritaya göre kurulur.</li>
<li><strong>Özgün tasarım.</strong> Tipografi, renk, boşluk ve hareket markanıza göre çizilir; masaüstünde de telefonda da ayrı ayrı prova edilir.</li>
<li><strong>Elle yazılmış kod.</strong> Gereksiz eklenti yok, kullanılmayan kütüphane yok. Sayfa yalnızca ihtiyacı olanı taşır.</li>
<li><strong>Teknik SEO ve yapılandırılmış veri.</strong> Başlıklar, meta etiketleri, site haritası, Schema.org işaretlemesi ve <code>llms.txt</code> ilk günden yerindedir.</li>
<li><strong>Erişilebilirlik.</strong> Klavyeyle gezilebilen, ekran okuyucunun anladığı, kontrastı yeterli bir arayüz; hedef <a href="{glossary}#wcag">WCAG</a> 2.2 AA.</li>
<li><strong>Hız ve güvenlik.</strong> <a href="{glossary}#core-web-vitals">Core Web Vitals</a> yeşil, güvenlik başlıkları ayarlı, site dünyanın her yerine yakın bir CDN’de.</li>
<li><strong>Yayın ve ölçüm.</strong> Alan adı, barındırma, Google Search Console ve analitik kurulumu.</li>
</ul>
<p>Okuduğunuz bu sayfa da aynı kurallarla yapıldı.</p>`,
        },
        {
          id: 'sablon-mu-ozel-mi',
          h2: 'Hazır şablon mu, özel yazılım mı?',
          html: `<p>İkisinin de yeri var, ama aynı işi yapmazlar. Kısa bir karşılaştırma:</p>
<div class="table-wrap" role="region" aria-label="Hazır şablon ile elle yazılmış site karşılaştırması" tabindex="0"><table>
<thead><tr><th scope="col"></th><th scope="col">Hazır şablon, site kurucu</th><th scope="col">Elle yazılmış site</th></tr></thead>
<tbody>
<tr><th scope="row">Hız</th><td>Kullanılmayan kodla gelir; çoğu zaman yavaştır</td><td>Yalnızca gerekeni taşır; anında açılır</td></tr>
<tr><th scope="row">Görünüm</th><td>Başka sitelerde de gördüğünüz bir kalıp</td><td>Markanıza göre çizilmiş, size ait</td></tr>
<tr><th scope="row">SEO</th><td>Eklentilere ve şablonun izin verdiğine bağlı</td><td>İlk satırdan kurgulanır</td></tr>
<tr><th scope="row">Güvenlik ve bakım</th><td>Eklenti güncellemeleri, eklentilerden gelen açıklar</td><td>Az parça, az risk</td></tr>
<tr><th scope="row">Başlangıç maliyeti</th><td>Düşük</td><td>Daha yüksek, ama bir kere</td></tr>
</tbody></table></div>
<p>Kısacası: deneme amaçlı, kısa ömürlü bir sayfa için şablon yeter. Müşteri getirmesi beklenen bir site için ölçüye göre dikileni öneririm.</p>`,
        },
        {
          id: 'surec',
          h2: 'Süreç nasıl işliyor?',
          html: `<ol>
<li><strong>Tanışma.</strong> WhatsApp’tan yazarsınız; ne yaptığınızı, kime yaptığınızı ve sitenin ne işe yarayacağını konuşuruz.</li>
<li><strong>Kapsam ve takvim.</strong> Sayfalar, özellikler ve tarihler yazıya geçer. Neye “evet” dediğinizi bilirsiniz.</li>
<li><strong>Tasarım.</strong> Önce bir yön, sonra tıklanabilir bir prototip. Onayınız olmadan koda geçmem.</li>
<li><strong>Geliştirme.</strong> Her sayfa bir performans bütçesiyle yazılır; erişilebilirlik ve SEO yolda eklenmez, baştan vardır.</li>
<li><strong>Yayın.</strong> Site yayına girer, ölçümler kurulur; ilk haftalarda nasıl çalıştığını birlikte izleriz.</li>
</ol>`,
        },
      ],
      faq: [
        {
          q: 'Web sitesi yaptırmak ne kadar sürer?',
          a: 'Kapsama göre değişir. Birkaç sayfalık bir kurumsal siteyle çok dilli, yönetim panelli bir site aynı takvimde bitmez. İlk görüşmede sayfaları ve özellikleri netleştirir, size yazılı bir takvim veririm.',
        },
        {
          q: 'Web sitesi fiyatı neye göre belirlenir?',
          a: 'Sayfa sayısı, tasarımın ne kadar özgün olacağı, dil sayısı, içerik yönetimi ihtiyacı ve entegrasyonlar. Paket satmıyorum; kapsamınızı dinleyip net bir teklif hazırlıyorum.',
        },
        {
          q: 'Siteyi sonradan kendim güncelleyebilir miyim?',
          a: 'Evet. İçerik sık değişecekse baştan bir yönetim paneli planlarız. Nadiren değişecekse, neyin değişeceğini yazmanız yeter.',
        },
        {
          q: 'Mevcut sitemi yeniden yapabilir misiniz?',
          a: 'Evet. Önce mevcut sitenin hangi sayfalarının trafik ve sıralama getirdiğini ölçerim; yeni sitede bu adresleri ya korur ya da 301 yönlendirmeyle taşırım. Böylece site yenilenirken Google’daki emeğiniz kaybolmaz.',
        },
      ],
      wa: 'Merhaba Eyüp, bir web sitesi yaptırmak istiyorum. Kısaca işimiz:',
      cta: {
        title: 'Siteniz *nasıl* olsun?',
        text: 'Ne yaptığınızı iki cümleyle yazın; kapsamı ve takvimi birlikte çıkaralım.',
        button: 'Projeyi anlatın',
      },
    },

    // ── UI/UX tasarım ──────────────────────────────────────────────────────
    uiux: {
      meta: {
        title: 'UI/UX Tasarım — Arayüz ve Kullanıcı Deneyimi | Eyüp DevArt',
        description:
          'UI/UX tasarım: ziyaretçinin aradığını düşünmeden bulduğu, markanın ilk bakışta tanındığı arayüzler. Araştırma, prototip ve koda birebir geçen tasarım.',
      },
      crumb: 'UI/UX tasarım',
      name: 'UI/UX tasarım',
      serviceType: 'Kullanıcı arayüzü ve kullanıcı deneyimi tasarımı',
      summary: 'Ziyaretçiyi yormayan, markayı ilk bakışta tanıtan ve koda birebir geçen arayüzler.',
      h1: 'UI/UX tasarım: güzel *görünsün,* kolay `çalışsın`.',
      answer:
        'UI (kullanıcı arayüzü) tasarımı ekranda ne gördüğünüzü, UX (kullanıcı deneyimi) tasarımı ise o ekranda ne yaşadığınızı belirler. İyi bir UI/UX, ziyaretçinin aradığını düşünmeden bulmasını ve markanın ilk bakışta tanınmasını sağlar. Tasarımı kodlayan kişi de ben olduğum için çizdiğim her şey ekranda tam çizildiği gibi çalışır.',
      facts: {
        for: 'Yeni site kuranlar · Yenilenmek isteyenler · Uygulama arayüzleri',
        includes: 'Araştırma · Bilgi mimarisi · Tasarım sistemi · Prototip',
        measure: 'Görev tamamlama · Erişilebilirlik · Dönüşüm',
        start: 'Sitenizin adresi ya da bir fikir',
      },
      sections: [
        {
          id: 'ui-ux-farki',
          h2: 'UI ile UX arasındaki fark ne?',
          html: `<p>Kısa cevap: <strong>UI kapının koludur, UX o kapıdan geçmenin ne kadar kolay olduğu.</strong> Kol çok güzel olabilir; ama itmeniz gereken bir kapıya çekme kolu takılmışsa deneyim kötüdür.</p>
<ul>
<li><strong>UI:</strong> tipografi, renk, boşluk, ikonlar, düğmeler, hareket. Görsel dil.</li>
<li><strong>UX:</strong> sayfaların sırası, menünün mantığı, bir formun kaç adım sürdüğü, bir şey ters gittiğinde ne olduğu. Akış.</li>
</ul>
<p>Biri olmadan öbürü eksik kalır. Bu yüzden ikisini ayrı ayrı değil, birlikte tasarlarım.</p>`,
        },
        {
          id: 'neler-dahil',
          h2: 'Bir UI/UX projesinde neler yapılır?',
          html: `<ol>
<li><strong>Anlamak.</strong> Kullanıcılarınız kim, neden geliyorlar, nerede takılıyorlar? Varsa analitik verisine ve mevcut sitenize bakarım.</li>
<li><strong>Bilgi mimarisi.</strong> Sayfalar, menü ve içeriğin sırası. Ziyaretçinin en çok aradığı şey en kısa yolda durmalı.</li>
<li><strong>Tasarım sistemi.</strong> Renkler, yazı ölçekleri, boşluklar ve bileşenler bir kurala bağlanır; site büyüdükçe dağılmaz.</li>
<li><strong>Prototip.</strong> Tıklanabilir bir taslak; telefonda ve masaüstünde ayrı ayrı denenir.</li>
<li><strong>Koda geçiş.</strong> Tasarımı başkasına devretmem, kendim kodlarım. Çizimle ekran arasında hiçbir şey kaybolmaz.</li>
</ol>`,
        },
        {
          id: 'erisilebilirlik',
          h2: 'Erişilebilirlik neden tasarımın parçası?',
          html: `<p>Ekran okuyucuyla gezen, yalnızca klavye kullanan, ekranı güneş altında okuyan ya da sadece acelesi olan biri için tasarlanmamış bir arayüz, aslında kimse için iyi tasarlanmamıştır. Hedefim <a href="{glossary}#wcag">WCAG</a> 2.2 AA: yeterli kontrast, görünür odak, anlamlı başlıklar ve hareketten rahatsız olanlar için sakin bir sürüm.</p>
<p>Bu site de aynı kurallarla yapıldı; otomatik erişilebilirlik testinde (axe, WCAG 2.2 AA) sıfır ihlal veriyor.</p>`,
        },
      ],
      faq: [
        {
          q: 'UI/UX tasarım ile web tasarım aynı şey mi?',
          a: 'Çok yakınlar ama aynı değiller. Web tasarım çoğu zaman sitenin görünümünü anlatır; UI/UX ise görünümün yanında ziyaretçinin sitede nasıl dolaştığını, nerede takıldığını ve hedefine nasıl ulaştığını da kapsar. Benim işimde ikisi bir arada gelir.',
        },
        {
          q: 'Yalnızca tasarım yaptırıp kodlamayı başka bir ekibe verebilir miyim?',
          a: 'Verebilirsiniz; tasarımı, geliştiricinin doğrudan kullanabileceği bir tasarım sistemi ve prototip olarak teslim ederim. Yine de en iyi sonucu, tasarımı çizen elin kodlamasıyla alırsınız.',
        },
        {
          q: 'Mevcut sitemin kullanıcı deneyimini iyileştirebilir misiniz?',
          a: 'Evet. Önce ziyaretçilerin nerede takıldığını bulurum: analitik verisi, hız ve erişilebilirlik ölçümleri ve telefonda gerçek bir deneme. Sonra değişiklikleri etkisine göre sıralar, en çok kazandıracak olandan başlarım.',
        },
        {
          q: 'Tasarımı ne zaman görürüm?',
          a: 'Koda geçmeden önce. Önce bir yön, ardından tıklanabilir bir prototip görürsünüz; onayınız olmadan geliştirmeye başlamam.',
        },
      ],
      wa: 'Merhaba Eyüp, UI/UX tasarım için yazıyorum. Kısaca:',
      cta: {
        title: 'Ziyaretçileriniz *nerede* takılıyor?',
        text: 'Sitenizin adresini ya da fikrinizi gönderin; akışa birlikte bakalım.',
        button: 'Tasarımı konuşalım',
      },
    },

    // ── Frontend geliştirme ────────────────────────────────────────────────
    frontend: {
      meta: {
        title: 'Frontend Geliştirme — Freelance Frontend Developer | DevArt',
        description:
          'Frontend geliştirme: tasarımı piksel piksel koda dökerim; hızlı, erişilebilir ve her ekranda doğru. HTML, CSS, TypeScript, Next.js ve WebGL ile, elle.',
      },
      crumb: 'Frontend geliştirme',
      name: 'Frontend geliştirme',
      serviceType: 'Frontend web geliştirme',
      summary: 'Tasarımın tarayıcıdaki hâli: hızlı, erişilebilir ve her ekranda doğru çalışan arayüz kodu.',
      h1: 'Frontend geliştirme: tasarımın *tarayıcıdaki* `hâli`.',
      answer:
        'Frontend geliştirme, bir web sitesinin ya da uygulamanın kullanıcının gördüğü ve dokunduğu kısmını kodlamaktır: HTML, CSS ve JavaScript ile arayüz, etkileşim ve hareket. İyi frontend kodu tasarımı birebir yansıtır, her ekranda ve tarayıcıda doğru çalışır, çabuk açılır ve herkes tarafından kullanılabilir. Ben bu kodu elle yazıyorum; işin gerektirdiğine göre saf JavaScript, TypeScript ya da Next.js ile.',
      facts: {
        for: 'Ajanslar · Tasarımcılar · Ürün ekipleri · İşletmeler',
        stack: 'HTML · CSS · TypeScript · Next.js · WebGL',
        measure: 'Core Web Vitals · WCAG 2.2 AA · Tarayıcı uyumu',
        start: 'Bir tasarım dosyası ya da bir fikir',
      },
      sections: [
        {
          id: 'neler-yapiyorum',
          h2: 'Frontend tarafında neler yapıyorum?',
          html: `<ul>
<li><strong>Tasarımı koda dökmek.</strong> Bir tasarım dosyasından ya da kendi tasarımımdan; her ekran genişliğinde, her yazı boyutunda birebir.</li>
<li><strong>Etkileşim ve hareket.</strong> Kaydırmaya bağlı animasyonlar, sayfa geçişleri, mikro etkileşimler. Hareketten rahatsız olanlar için hepsi kendiliğinden sakinleşir.</li>
<li><strong>WebGL ve yaratıcı kodlama.</strong> Bu sitenin girişindeki çizgi gibi, tarayıcıda gerçek zamanlı çizilen özgün görseller.</li>
<li><strong>Performans.</strong> Kritik CSS’in sayfaya gömülmesi, yazı tiplerinin kayma yaratmadan yüklenmesi, görsellerin AVIF ve WebP olarak doğru boyutta sunulması.</li>
<li><strong>Erişilebilirlik.</strong> Anlamlı HTML, klavyeyle kullanım, ekran okuyucu etiketleri, yeterli kontrast.</li>
</ul>`,
        },
        {
          id: 'framework',
          h2: 'Framework şart mı?',
          html: `<p>Hayır. Framework bir araçtır, amaç değil. Etkileşimi yoğun bir uygulamada React ya da Next.js zaman kazandırır; bir kurumsal sitede ise çoğu zaman yükten başka bir şey getirmez.</p>
<p>Okuduğunuz bu sayfa hiçbir framework kullanmıyor; sitenin kendi JavaScript’inin tamamı, sıkıştırılmış hâliyle {jsKB} KB. Hangi aracın gerektiğine işin kendisine bakarak karar veririm, alışkanlığa bakarak değil.</p>`,
        },
        {
          id: 'kalite',
          h2: 'İyi frontend kodu nasıl anlaşılır?',
          html: `<p>Dışarıdan bakınca üç şeyden: <strong>hız, istikrar, erişim.</strong> Sayfa çabuk açılıyor mu (<a href="{glossary}#lcp">LCP</a>), dokunduğunuzda hemen tepki veriyor mu (<a href="{glossary}#inp">INP</a>), yüklenirken içerik zıplıyor mu (<a href="{glossary}#cls">CLS</a>)? Bir de klavyeyle gezmeyi deneyin: odak nerede, görünüyor mu?</p>
<p>İçeriden bakınca: az bağımlılık, okunur kod, anlamlı HTML. Bu sitenin kaynak kodunu açıp bakmanızı isterim; saklayacak bir şeyi yok.</p>`,
        },
      ],
      faq: [
        {
          q: 'Hazır bir tasarımı koda dökebilir misiniz?',
          a: 'Evet. Tasarım dosyasını gönderin; hangi ekranlar ve hangi etkileşimler olduğunu konuşalım. Tasarımda çoğu zaman unutulan durumları (hata mesajları, boş ekranlar, yükleniyor anları) da geliştirme başlamadan birlikte tamamlarız.',
        },
        {
          q: 'Ajanslarla ya da ekiplerle çalışıyor musunuz?',
          a: 'Evet. Bir ajansın ya da ürün ekibinin içinde frontend tarafını üstlenebilirim; mevcut kod tabanınıza ve kurallarınıza uyarak.',
        },
        {
          q: 'Mevcut sitemin frontend performansını düzeltebilir misiniz?',
          a: 'Evet. Önce ölçerim, sonra en çok etkisi olan sorundan başlarım. En büyük kazanç çoğu zaman görsellerden, yazı tiplerinden ve gereksiz JavaScript’ten gelir. Ayrıntılar <a href="{svc:speed}">site hızlandırma</a> sayfasında.',
        },
        {
          q: 'Hangi tarayıcıları destekliyorsunuz?',
          a: 'Chrome, Safari, Firefox ve Edge’in güncel sürümlerini; iPhone ve Android dahil. Yeni bir tarayıcı özelliği kullandığımda eski tarayıcılarda da sayfa eksiksiz çalışır; yalnızca süs eksik kalır.',
        },
      ],
      wa: 'Merhaba Eyüp, frontend geliştirme için yazıyorum. Kısaca:',
      cta: {
        title: 'Tasarım hazır, *kod* mu eksik?',
        text: 'Dosyayı ya da fikri gönderin; ekranları ve etkileşimleri birlikte çıkaralım.',
        button: 'Frontend’i konuşalım',
      },
    },

    // ── Full-stack ve backend ──────────────────────────────────────────────
    fullstack: {
      meta: {
        title: 'Full-Stack ve Backend Geliştirme — Web Uygulaması | DevArt',
        description:
          'Full-stack geliştirme: arayüzden sunucuya, veritabanından yönetim paneline web uygulamaları. Hızlı, güvenli, büyümeye hazır; baştan sona tek elden.',
      },
      crumb: 'Full-stack geliştirme',
      name: 'Full-stack ve backend geliştirme',
      serviceType: 'Full-stack web uygulaması geliştirme',
      summary: 'Arayüzden sunucuya, veritabanından yönetim paneline: baştan sona tek elden web uygulamaları.',
      h1: 'Full-stack geliştirme: *ekrandan* `sunucuya` tek el.',
      answer:
        'Full-stack geliştirme, bir web uygulamasının hem kullanıcının gördüğü ön yüzünü (frontend) hem de arkada çalışan sunucu, veritabanı ve API katmanını (backend) birlikte kurmaktır. Tek elden yapıldığında iki taraf arasında hiçbir şey kaybolmaz: veri doğru yerden gelir, sayfa sunucuda hazırlanıp çabuk açılır, güvenlik ilk günden planın parçasıdır. Rezervasyon sistemleri, yönetim panelleri, müşteri portalları ve entegrasyonlar bu işin konusudur.',
      facts: {
        for: 'Girişimler · İşletmeler · İç araç isteyen ekipler',
        includes: 'Arayüz · API · Veritabanı · Kimlik doğrulama · Yönetim paneli',
        stack: 'TypeScript · Node.js · Next.js · Edge',
        start: 'Uygulamanın ne yapacağını anlatan bir paragraf',
      },
      sections: [
        {
          id: 'backend',
          h2: 'Backend tarafında neler var?',
          html: `<p>Kullanıcının hiç görmediği ama her tıklamada çalışan kısım:</p>
<ul>
<li><strong>API’ler.</strong> Ön yüzün veri alıp gönderdiği uç noktalar; net, belgelenmiş ve sürümlenmiş.</li>
<li><strong>Veritabanı.</strong> Verinin nasıl saklanacağı, nasıl sorgulanacağı ve nasıl yedekleneceği.</li>
<li><strong>Kimlik doğrulama ve yetki.</strong> Kim girebilir, kim neyi görebilir; parolalar ve oturumlar güvenli biçimde.</li>
<li><strong>Yönetim paneli.</strong> İçeriği, siparişleri ya da randevuları kendinizin yönetebileceği sade bir ekran.</li>
<li><strong>Entegrasyonlar.</strong> E-posta, WhatsApp, harita, ödeme ya da zaten kullandığınız başka bir servis.</li>
</ul>`,
        },
        {
          id: 'sunucuda-hazirlama',
          h2: 'Sayfalar neden sunucuda hazırlanmalı?',
          html: `<p>Çünkü arama motorlarının ve yapay zekâ tarayıcılarının bir kısmı JavaScript çalıştırmaz. İçeriği yalnızca tarayıcıda, JavaScript ile oluşan bir sayfa onlar için neredeyse boştur.</p>
<p>Bu yüzden içeriği sunucuda ya da yayından önce, derleme sırasında, düz HTML olarak hazırlarım. Sayfa hem daha çabuk açılır hem de Google’ın, ChatGPT’nin ve Perplexity’nin okuyabileceği hâlde gelir. Etkileşim bunun üstüne eklenir. Ayrıntılar <a href="{svc:aeo-geo}">AEO ve GEO</a> sayfasında.</p>`,
        },
        {
          id: 'guvenlik',
          h2: 'Güvenliği nasıl ele alıyorsunuz?',
          html: `<p>Sonradan eklenen bir katman olarak değil, mimarinin parçası olarak. Kullanıcıdan gelen her veri doğrulanır, parolalar asla düz metin olarak saklanmaz, yetkiler “en az ayrıcalık” ilkesiyle verilir.</p>
<p>Tarayıcı tarafında sıkı bir içerik güvenliği politikası (CSP) ve HSTS kullanırım. Bu sitenin politikası, sayfaya gömülü betiklerden yalnızca özeti (hash) önceden bilinenlerin çalışmasına izin verir; araya sızan bir satır çalışmaz.</p>`,
        },
      ],
      faq: [
        {
          q: 'Full-stack geliştirici ile ayrı frontend ve backend ekipleri arasındaki fark ne?',
          a: 'Ayrı ekipler büyük projelerde iş bölümü sağlar, ama aradaki her devir teslim bir yanlış anlaşılma riskidir. Tek bir full-stack geliştirici, ön yüzün neye ihtiyaç duyduğunu bildiği için arka tarafı ona göre kurar. Küçük ve orta ölçekli projelerde bu, daha hızlı ve daha tutarlı bir sonuç demektir.',
        },
        {
          q: 'Var olan bir sisteme entegrasyon yapabilir misiniz?',
          a: 'Çoğu zaman evet. Sistemin bir API’si ya da veri dışa aktarma yolu varsa, verisini sitenize ya da panelinize bağlayabiliriz. Önce neye erişebildiğimize birlikte bakarız.',
        },
        {
          q: 'Uygulama nerede barındırılacak?',
          a: 'İhtiyaca göre. Çoğu proje için içeriği dünyanın her yerine yakından sunan bir CDN ve gerektiğinde sunucusuz (edge) fonksiyonlar yeterli ve ekonomiktir. Daha ağır işler için klasik bir sunucu planlarız.',
        },
        {
          q: 'Yayından sonra bakım yapıyor musunuz?',
          a: 'Evet. Güncellemeleri, yedekleri ve güvenlik yamalarını takip ederim; bir şey ters giderse kime yazacağınızı bilirsiniz.',
        },
      ],
      wa: 'Merhaba Eyüp, bir web uygulaması için yazıyorum. Ne yapması gerektiğini kısaca anlatayım:',
      cta: {
        title: 'Uygulamanız *ne* yapsın?',
        text: 'Bir paragrafla anlatın; ekranları, veriyi ve takvimi birlikte çıkaralım.',
        button: 'Uygulamayı anlatın',
      },
    },

    // ── SEO ────────────────────────────────────────────────────────────────
    seo: {
      meta: {
        title: 'SEO Hizmeti — Teknik SEO ve Yerel SEO | Eyüp DevArt',
        description:
          'SEO hizmeti: teknik SEO, içerik yapısı, yapılandırılmış veri ve yerel SEO ile Google’da bulunur olun. Önce ölçüm, sonra etkisine göre sıralanmış iş.',
      },
      crumb: 'SEO',
      name: 'SEO hizmeti',
      serviceType: 'Arama motoru optimizasyonu',
      summary: 'Teknik SEO, içerik yapısı ve yerel SEO: Google’ın sizi bulmasını, anlamasını ve önermesini sağlayan iş.',
      h1: 'SEO hizmeti: önce *bulunmak,* sonra `seçilmek`.',
      answer:
        'SEO (arama motoru optimizasyonu), bir sitenin Google ve Bing gibi arama motorlarında kendi alanındaki aramalarda üst sıralarda görünmesi için yapılan teknik, içerik ve itibar çalışmasıdır. Benim yaklaşımım önce ölçmek: site taranıyor mu, dizine giriyor mu, ne kadar hızlı, nasıl kurulmuş. Sonra sorunları etkisine göre sıralar, en çok kazandıracak olandan başlarım. Kimse birinci sırayı garanti edemez; garanti edenden uzak durun.',
      facts: {
        for: 'Kurumsal siteler · Yerel işletmeler · E-ticaret · Yeni siteler',
        includes: 'Teknik SEO · İçerik yapısı · Yapılandırılmış veri · Yerel SEO',
        measure: 'Search Console · Gösterim ve tıklama · Sıralama',
        start: 'Sitenizin adresi',
      },
      sections: [
        {
          id: 'teknik-seo',
          h2: 'Teknik SEO’da neye bakıyorum?',
          html: `<p>İçerik ne kadar iyi olursa olsun, Google sayfayı tarayamıyor ya da anlayamıyorsa sıralama gelmez. Teknik tarafta ilk baktıklarım:</p>
<ul>
<li><strong>Tarama ve dizin.</strong> <code>robots.txt</code>, <a href="{glossary}#sitemap">site haritası</a>, <a href="{glossary}#canonical">canonical</a> etiketleri, yönlendirme zincirleri ve dizine girmeyen sayfalar.</li>
<li><strong>Hız.</strong> Core Web Vitals; özellikle telefonda.</li>
<li><strong>Yapı.</strong> Başlık hiyerarşisi, iç bağlantılar ve her sayfanın ana sayfaya kaç tık uzaklıkta olduğu.</li>
<li><strong>Yapılandırılmış veri.</strong> İşletmenin, hizmetlerin, soruların ve sayfa yolunun Schema.org ile makinelerin anlayacağı dilde işaretlenmesi.</li>
<li><strong>Çok dilli siteler.</strong> <a href="{glossary}#hreflang">hreflang</a> eşleşmeleri: Türkçe sayfa Türkçe arayana, İngilizce sayfa İngilizce arayana gitsin.</li>
</ul>`,
        },
        {
          id: 'yerel-seo',
          h2: 'Yerel SEO: “yakınımda” aramalarında görünmek',
          html: `<p>“Maltepe çekici”, “yakınımdaki diş hekimi”, “Kadıköy kahvaltı”: bu aramalarda sonuçları büyük ölçüde <strong>Google İşletme Profili</strong>, işletmenin konumu ve hakkındaki yorumlar belirler. Site bu sinyallere eşlik eder ve onları güçlendirir:</p>
<ul>
<li>İşletme adı, adres ve telefonun her yerde harfi harfine aynı yazılması.</li>
<li><code>LocalBusiness</code> yapılandırılmış verisi; çalışma saatleri ve hizmet bölgesiyle.</li>
<li>Gerçekten hizmet verdiğiniz her bölge için, o bölgeye özgü bir şey anlatan bir sayfa.</li>
<li>Telefonda tek dokunuşla arama, yol tarifi ve WhatsApp.</li>
</ul>
<p>Bir uyarı: hizmet vermediğiniz onlarca şehir ve ilçe için birbirinin kopyası sayfalar üretmek, Google’ın <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener">spam politikalarında</a> adıyla geçen bir yöntemdir (“doorway” sayfalar) ve bütün sitenin güvenilirliğini düşürür. Bölge sayfası, ancak o bölgeye gerçekten bir şey söylüyorsa işe yarar. Yerel bir işletme için nasıl göründüğünü <a href="https://maltepeaksuotocekici.com" rel="noopener">Aksu Oto Çekici</a> sitesinde görebilirsiniz.</p>`,
        },
        {
          id: 'nasil-calisiyorum',
          h2: 'Nasıl çalışıyorum?',
          html: `<ol>
<li><strong>Ölçüm.</strong> Search Console, tarama, hız ve yapılandırılmış veri denetimi. Nerede durduğunuzu sayılarla görürüz.</li>
<li><strong>Öncelik listesi.</strong> Sorunları etkisine ve zahmetine göre sıralarım. İlk iş, en büyük kazancı en az emekle getiren iş olur.</li>
<li><strong>Uygulama.</strong> Teknik düzeltmeleri kendim yaparım; içerik tarafında neyin yazılması gerektiğine birlikte karar veririz.</li>
<li><strong>Takip.</strong> Gösterim, tıklama ve sıralamadaki değişimi izler, neyin işe yaradığını açıkça raporlarım.</li>
</ol>`,
        },
      ],
      faq: [
        {
          q: 'SEO ne kadar sürede sonuç verir?',
          a: 'Teknik düzeltmelerin etkisi, Google sayfaları yeniden taradıkça birkaç hafta içinde görünmeye başlar. Rekabetin yoğun olduğu aramalarda kalıcı sonuç aylar sürer. Kestirme vadeden SEO, çoğu zaman sonradan pahalıya patlar.',
        },
        {
          q: 'Birinci sırayı garanti ediyor musunuz?',
          a: 'Hayır, kimse edemez; sıralamaya Google karar verir. Benim garanti edebileceğim şey, sitenizin teknik olarak eksiksiz, içeriğinin doğru kurulmuş ve sonuçların ölçülebilir olmasıdır. Birinci sıra garantisi veren birine rastlarsanız, nasıl yaptığını sorun.',
        },
        {
          q: 'Yerel SEO için Google İşletme Profili şart mı?',
          a: 'Haritada ve “yakınımda” sonuçlarında görünmek istiyorsanız evet; yerel aramalarda en güçlü sinyal odur. Site profili tamamlar: aynı bilgiyi tutarlı biçimde tekrar eder ve ziyaretçiyi tek dokunuşla size ulaştırır.',
        },
        {
          q: 'Mevcut sitem için SEO denetimi yapabilir misiniz?',
          a: 'Evet. Adresi gönderin; tarama, dizin, hız ve yapılandırılmış veri açısından bakar, size öncelik sırasına dizilmiş kısa bir liste çıkarırım.',
        },
      ],
      wa: 'Merhaba Eyüp, sitemin SEO’su için yazıyorum. Adresi:',
      cta: {
        title: 'Google sizi *nasıl* görüyor?',
        text: 'Adresi gönderin; taramadan hıza, nerede durduğunuza birlikte bakalım.',
        button: 'SEO denetimi isteyin',
      },
    },

    // ── AEO ve GEO ─────────────────────────────────────────────────────────
    'aeo-geo': {
      meta: {
        title: 'AEO ve GEO Hizmeti — Yapay Zekâ Cevaplarında Yer Alın | DevArt',
        description:
          'AEO ve GEO hizmeti: ChatGPT, Perplexity, Gemini ve Google AI Overviews cevaplarında kaynak olarak anılmak için içerik, varlık ve yapılandırılmış veri işi.',
      },
      crumb: 'AEO ve GEO',
      name: 'AEO ve GEO hizmeti',
      serviceType: 'Cevap motoru ve üretken motor optimizasyonu',
      summary: 'ChatGPT, Perplexity, Gemini ve Google AI Overviews cevaplarında kaynak olarak anılmak için yapılan iş.',
      h1: 'AEO ve GEO: yapay zekâya *sorulduğunda* adınız `geçsin`.',
      answer:
        'AEO ve GEO hizmeti, markanızın yapay zekâ destekli aramalarda cevap olarak seçilmesi ve kaynak olarak anılması için yapılan çalışmadır: alıntılanmaya uygun yazılmış içerik, her yerde aynı biçimde tanımlanmış bir işletme kimliği, yapılandırılmış veri, llms.txt ve yapay zekâ tarayıcılarına açık bir site. Kavramların kendisini merak ediyorsanız önce <a href="{guide}">AEO ve GEO rehberine</a> bakın; bu sayfa, o işin sizin için nasıl yapıldığını anlatır.',
      facts: {
        for: 'Uzmanlık satan firmalar · Yerel işletmeler · Markalar · Danışmanlar',
        includes: 'Alıntılanabilir içerik · Varlık tutarlılığı · Schema.org · llms.txt',
        measure: 'Yapay zekâ sorgu testleri · Kaynak gösterilme · Marka anılması',
        start: 'Sitenizin adresi ve size en çok sorulan üç soru',
      },
      sections: [
        {
          id: 'neler-dahil',
          h2: 'AEO ve GEO çalışmasında neler yapıyorum?',
          html: `<ul>
<li><strong>Soru haritası.</strong> Müşterileriniz sizin alanınızda yapay zekâya ne soruyor? Gerçek sorulardan bir liste çıkarırım.</li>
<li><strong>Alıntılanabilir içerik.</strong> Her soruya ilk cümlede net cevap veren, tek başına anlam taşıyan bölümler. Bir modelin olduğu gibi alıp kaynak göstereceği türden.</li>
<li><strong>Varlık tutarlılığı.</strong> Adınız, ne yaptığınız, nerede olduğunuz ve size nasıl ulaşılacağı; sitede, Google İşletme Profili’nde ve sosyal profillerde birebir aynı. Modeller sizi doğru <a href="{glossary}#entity">varlıkla</a> eşleştirsin diye.</li>
<li><strong>Yapılandırılmış veri.</strong> Tek bir <a href="{glossary}#json-ld">JSON-LD</a> grafiğinde işletme, hizmetler, sorular ve sayfalar; birbirine <code>@id</code> ile bağlı, kavramlar Wikidata’ya bağlanmış.</li>
<li><strong>Yapay zekâ tarayıcılarına açık kapı.</strong> Bilinçli <code>robots.txt</code> kuralları, <a href="{glossary}#llms-txt">llms.txt</a> ve her sayfanın Markdown kopyası.</li>
</ul>`,
        },
        {
          id: 'olcum',
          h2: 'Sonuç nasıl ölçülür?',
          html: `<p>Yapay zekâ cevaplarındaki görünürlüğün henüz Search Console gibi tek bir paneli yok. Bu yüzden ölçümü kendim kurarım:</p>
<ol>
<li>Alanınızdaki gerçek sorulardan sabit bir liste hazırlarım.</li>
<li>Bu soruları belirli aralıklarla ChatGPT’ye, Perplexity’ye, Gemini’ye ve Google AI Overviews’a sorarım.</li>
<li>Adınızın geçip geçmediğini, hangi sayfanızın kaynak gösterildiğini ve rakiplerin nerede durduğunu kaydederim.</li>
</ol>
<p>Analitikte yapay zekâdan gelen ziyaretleri de ayrıca izleriz. Bu trafik henüz az, ama soruyu sormuş ve cevabı okumuş insanlardan gelir.</p>`,
        },
        {
          id: 'bu-site',
          h2: 'Bu site neden bir örnek?',
          html: `<p>Çünkü burada anlattığım her şey bu sitede uygulanmış durumda ve kaynak kodunda görülebilir:</p>
<ul>
<li>Her sayfa ilk cümlesinde cevap verir; bu cevaplar <code>SpeakableSpecification</code> ile işaretlidir.</li>
<li>İşletme, hizmetler, sözlük terimleri ve sorular tek bir bilgi grafiğinde, birbirine bağlıdır.</li>
<li><a href="/llms.txt">llms.txt</a> ve her sayfanın Markdown kopyası, yapay zekâ ajanları için hazırdır.</li>
<li><code>robots.txt</code> arama ve yapay zekâ tarayıcılarını açıkça davet eder; yeni sayfalar IndexNow ile anında bildirilir.</li>
</ul>`,
        },
      ],
      faq: [
        {
          q: 'Yapay zekânın beni önermesini garanti edebilir misiniz?',
          a: 'Hayır. Hiçbir model, neyi kaynak göstereceğini bir sözleşmeyle belirlemez. Benim yaptığım, önerilmeniz için gereken koşulları eksiksiz sağlamak: bulunabilir, alıntılanabilir ve güvenilir olmak. Sonra bunun etkisini düzenli sorgu testleriyle ölçmek.',
        },
        {
          q: 'Yapay zekâ tarayıcılarına izin vermek içeriğimi riske atar mı?',
          a: 'Bu bir tercih. İçeriğinizin yapay zekâ cevaplarında görünmesine izin vermek ile modellerin eğitiminde kullanılmasına izin vermek ayrı şeylerdir ve robots.txt’de ayrı ayrı belirtilebilir. Hangisini istediğinize birlikte karar veririz.',
        },
        {
          q: 'Küçük bir işletme için de anlamlı mı?',
          a: 'Evet, hatta daha da anlamlı. “Yakınımdaki en iyi …” gibi sorular artık yapay zekâya da soruluyor ve cevapta birkaç isimden fazlası geçmiyor. Bilgisi tutarlı, cevapları net ve yorumları iyi olan küçük bir işletme, büyük ama dağınık bir rakibin önüne geçebilir.',
        },
      ],
      wa: 'Merhaba Eyüp, yapay zekâ cevaplarında görünürlük (AEO ve GEO) için yazıyorum. Sitem:',
      cta: {
        title: 'Yapay zekâ sizi *tanıyor* mu?',
        text: 'Adresi ve size en çok sorulan üç soruyu gönderin; nerede durduğunuzu birlikte test edelim.',
        button: 'Görünürlüğü test edelim',
      },
    },

    // ── Site hızlandırma ───────────────────────────────────────────────────
    speed: {
      meta: {
        title: 'Web Sitesi Hızlandırma — Core Web Vitals | Eyüp DevArt',
        description:
          'Web sitesi hızlandırma: LCP, INP ve CLS’yi yeşile taşıyan, ölçüme dayalı performans işi. Görseller, yazı tipleri, JavaScript ve sunucu; tek tek.',
      },
      crumb: 'Site hızlandırma',
      name: 'Web sitesi hızlandırma',
      serviceType: 'Web performans optimizasyonu',
      summary: 'Ölçüme dayalı performans işi: Core Web Vitals yeşil, sayfa siz göz kırpmadan hazır.',
      h1: 'Site hızlandırma: siz göz *kırpmadan* `hazır`.',
      answer:
        'Web sitesi hızlandırma, bir sayfanın daha çabuk açılması, dokunuşa daha hızlı tepki vermesi ve yüklenirken kaymaması için yapılan, ölçüme dayalı bir çalışmadır. Google bunu Core Web Vitals ile ölçer: LCP 2,5 saniyenin, INP 200 milisaniyenin, CLS 0,1’in altında olmalı. Ben önce gerçek ölçümü alır, sonra en çok zaman kaybettiren kalemden başlarım.',
      facts: {
        for: 'Yavaş açılan siteler · Telefonda zorlanan sayfalar · E-ticaret',
        includes: 'Görseller · Yazı tipleri · JavaScript · Önbellek ve CDN',
        measure: 'LCP ≤ 2,5 sn · INP ≤ 200 ms · CLS ≤ 0,1',
        start: 'Sitenizin adresi',
      },
      sections: [
        {
          id: 'neden-onemli',
          h2: 'Hız neden bu kadar önemli?',
          html: `<p>Çünkü ziyaretçi beklemeyi sevmez ve bunu söylemez; sadece gider. Hızın parayla bağı da ölçülmüş durumda: Vodafone’un web.dev’de yayımlanan A/B testinde, en büyük içeriğin açılma süresini (<a href="{glossary}#lcp">LCP</a>) yüzde 31 iyileştirmek <a href="https://web.dev/case-studies/vodafone" rel="noopener">satışları yüzde 8 artırdı</a>.</p>
<p>Hız aynı zamanda bir sıralama sinyalidir: Google, <a href="https://developers.google.com/search/docs/appearance/core-web-vitals" rel="noopener">Core Web Vitals’ın sıralama sistemlerinde kullanıldığını</a> açıkça belirtiyor. Kısacası yavaş bir site hem ziyaretçiyi hem sırayı kaybeder.</p>`,
        },
        {
          id: 'nasil-hizlandiriyorum',
          h2: 'Bir siteyi nasıl hızlandırıyorum?',
          html: `<p>En sık karşılaştığım beş sorun, belirtileri ve çözümleri:</p>
<div class="table-wrap" role="region" aria-label="Yavaşlık sorunları, belirtileri ve çözümleri" tabindex="0"><table>
<thead><tr><th scope="col">Sorun</th><th scope="col">Belirti</th><th scope="col">Çözüm</th></tr></thead>
<tbody>
<tr><th scope="row">Büyük görseller</th><td>Ana görsel geç geliyor (LCP yüksek)</td><td>AVIF ve WebP, doğru boyut, öncelikli yükleme</td></tr>
<tr><th scope="row">Yazı tipleri</th><td>Metin geç beliriyor ya da yüklenince zıplıyor</td><td>Alt küme, ön yükleme, ölçüleri eşleştirilmiş yedek yazı tipi</td></tr>
<tr><th scope="row">Fazla JavaScript</th><td>Dokunuşa geç tepki (INP yüksek)</td><td>Gereksizi silmek, kalanı bölmek ve ertelemek</td></tr>
<tr><th scope="row">Boyutu belirsiz öğeler</th><td>İçerik yüklenirken kayıyor (CLS yüksek)</td><td>Görsellere ve gömülü alanlara sabit boyut</td></tr>
<tr><th scope="row">Yavaş sunucu</th><td>İlk bayt geç geliyor (TTFB yüksek)</td><td>Önbellek, CDN, statik üretim</td></tr>
</tbody></table></div>
<p>Her biri önce ölçülür, sonra düzeltilir, sonra yeniden ölçülür. Tahminle hızlandırma olmaz.</p>`,
        },
        {
          id: 'kanit',
          h2: 'Bu sayfa ne kadar hızlı?',
          html: `<p>Ana sayfadaki <a href="/#kanit">Kanıt</a> bölümü, sayfa sizin cihazınızda açılırken ölçülen gerçek değerleri gösterir; rakamları ben yazmıyorum, tarayıcınız ölçüyor. Laboratuvar testinde (Lighthouse) bu sitenin her sayfası performans, erişilebilirlik, en iyi uygulamalar ve SEO’da 100 alıyor.</p>`,
        },
      ],
      faq: [
        {
          q: 'Sitemin hızını nasıl ölçebilirim?',
          a: 'En kolayı Google’ın PageSpeed Insights aracı: adresi yazın; hem gerçek kullanıcı verisini hem laboratuvar testini görün. Gerçek kullanıcı verisi daha önemlidir, çünkü ziyaretçilerinizin gerçekte ne yaşadığını gösterir.',
        },
        {
          q: 'WordPress ya da hazır şablonla yapılmış bir siteyi hızlandırabilir misiniz?',
          a: 'Çoğu zaman belirgin ölçüde, evet: görseller, eklentiler, önbellek ve gereksiz betikler düzeltilebilir. Ama şablonun kendisi ağırsa bir tavan vardır; o noktada yeniden yapmanın maliyetini ve kazancını dürüstçe konuşuruz.',
        },
        {
          q: 'Hız için sitemi baştan yaptırmam gerekir mi?',
          a: 'Genellikle hayır. Önce mevcut sitede yapılabilecekleri yaparız; en büyük kazanç çoğu zaman birkaç düzeltmeden gelir. Yeniden yapmayı ancak ölçümler bunun daha ekonomik olduğunu gösterirse öneririm.',
        },
        {
          q: 'Hızlandırma SEO’yu etkiler mi?',
          a: 'Etkiler, ama tek başına mucize yaratmaz. Core Web Vitals bir sıralama sinyalidir; asıl büyük etkisi ziyaretçide görülür: daha az terk, daha çok mesaj ve satış. Hız, iyi içeriğin önündeki engeli kaldırır.',
        },
      ],
      wa: 'Merhaba Eyüp, sitemin hızı için yazıyorum. Adresi:',
      cta: {
        title: 'Siteniz *kaç* saniyede açılıyor?',
        text: 'Adresi gönderin; ölçelim, nerede zaman kaybettiğini birlikte görelim.',
        button: 'Hızı ölçelim',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
export const en = {
  path: '/en/services/',
  ui: {
    label: 'Service',
    answer: 'In short',
    facts: 'At a glance',
    toc: 'On this page',
    faq: 'Frequently asked',
    related: 'Related services',
    terms: 'From the glossary',
    all: 'All services',
    more: 'Details',
    homeMore: 'Every service, in detail',
    inPractice: 'In practice',
    rows: { for: 'For', includes: 'Included', stack: 'Stack', measure: 'Measured by', start: 'To start' },
    hook: 'No need for a long brief.',
  },

  hub: {
    meta: {
      title: 'Services — Web Design, Development, SEO, AEO & GEO | DevArt',
      description:
        'Website design and development, UI/UX, front-end, full-stack, SEO, AEO, GEO and speed optimization: what each service is, what it covers and who it’s for.',
      ogAlt: 'Eyüp DevArt services',
    },
    crumb: 'Services',
    label: 'Services',
    h1: 'Whatever a *website* `needs`.',
    intro:
      'Design, code, speed and visibility usually live with four different teams. Here they’re in one pair of hands. Below is what each one is, what it covers and who it helps; if you’re not sure where to start, just ask.',
    answer:
      'Eyüp DevArt offers seven services: website design and development, UI/UX design, front-end development, full-stack and back-end development, SEO (including local SEO), AEO and GEO, and website speed optimization. All of them come from one pair of hands, for clients anywhere in Türkiye or abroad, remotely, in English or Turkish.',
    faq: [
      {
        q: 'Which service should I start with?',
        a: 'If you don’t have a site, with design and development. If you have one but nobody finds it, with SEO. If people find it but it’s slow, with speed optimization. Not sure? Send me the address; I’ll measure it and we’ll decide together.',
      },
      {
        q: 'Where do you work?',
        a: 'Everywhere, remotely: from Istanbul to Ankara, İzmir to Van, every province of Türkiye, and abroad. We talk on WhatsApp or a video call, in English or Turkish.',
      },
      {
        q: 'Can I hire you for just one service?',
        a: 'Yes. Just an SEO audit, just speed work or just design is fine. But when it’s all in one pair of hands, one part never undoes another: a change made for speed doesn’t hurt SEO, and a change made for SEO doesn’t bend the design.',
      },
    ],
    cta: {
      title: 'Where shall we *start?*',
      text: 'Tell me what you do and what you need, in two sentences; we’ll start in the right place.',
      button: 'Message me on WhatsApp',
    },
  },

  items: {
    web: {
      meta: {
        title: 'Website Design & Development, Hand-Coded | Eyüp DevArt',
        description:
          'Custom websites, designed and coded by hand: fast, accessible, and easy to find on Google and in AI answers. From first sketch to launch, one pair of hands.',
      },
      crumb: 'Website design & development',
      name: 'Website design and development',
      serviceType: 'Web design and web development',
      summary: 'Custom, hand-coded websites for businesses and brands: design, code and search visibility from one desk.',
      h1: 'Websites, made to *measure* and `written by hand`.',
      answer:
        'Website design and development means building a business’s home on the web from end to end: content plan, design, code, speed, SEO and launch. I do all of it myself, without templates. The result is a site written for you, one that opens fast and that both Google and AI assistants understand at a glance.',
      facts: {
        for: 'Companies · Local businesses · Brands · Personal sites',
        includes: 'Content plan · Design · Code · SEO · Launch',
        measure: 'Core Web Vitals · Lighthouse · Search visibility',
        start: 'Two sentences on WhatsApp',
      },
      sections: [
        {
          id: 'whats-included',
          h2: 'What’s included when you have a website built?',
          html: `<p>A website is more than the pages you see on screen. Every project I take on includes all of this from the start; none of it arrives later as an “add-on”:</p>
<ul>
<li><strong>A content and page plan.</strong> Which words do your customers use to look for you, and what do they ask? The pages are built on that map.</li>
<li><strong>Original design.</strong> Type, colour, white space and motion drawn for your brand, and tried separately on desktop and on phones.</li>
<li><strong>Hand-written code.</strong> No unnecessary plugins, no unused libraries. Each page carries only what it needs.</li>
<li><strong>Technical SEO and structured data.</strong> Headings, meta tags, a sitemap, Schema.org markup and <code>llms.txt</code> are there from day one.</li>
<li><strong>Accessibility.</strong> An interface you can use with a keyboard, that screen readers understand, with enough contrast; the target is <a href="{glossary}#wcag">WCAG</a> 2.2 AA.</li>
<li><strong>Speed and security.</strong> <a href="{glossary}#core-web-vitals">Core Web Vitals</a> in the green, security headers in place, and the site served from a CDN close to everyone.</li>
<li><strong>Launch and measurement.</strong> Domain, hosting, Google Search Console and analytics set up.</li>
</ul>
<p>The page you’re reading was built by the same rules.</p>`,
        },
        {
          id: 'template-or-custom',
          h2: 'Template or custom-built?',
          html: `<p>Both have their place, but they don’t do the same job. A short comparison:</p>
<div class="table-wrap" role="region" aria-label="Template versus hand-coded website" tabindex="0"><table>
<thead><tr><th scope="col"></th><th scope="col">Template, site builder</th><th scope="col">Hand-coded site</th></tr></thead>
<tbody>
<tr><th scope="row">Speed</th><td>Ships with code you never use; often slow</td><td>Carries only what it needs; opens instantly</td></tr>
<tr><th scope="row">Look</th><td>A pattern you’ve seen on other sites</td><td>Drawn for your brand, and yours alone</td></tr>
<tr><th scope="row">SEO</th><td>Depends on plugins and on what the template allows</td><td>Planned from the first line</td></tr>
<tr><th scope="row">Security and upkeep</th><td>Plugin updates, plugin vulnerabilities</td><td>Few moving parts, little risk</td></tr>
<tr><th scope="row">Upfront cost</th><td>Low</td><td>Higher, but paid once</td></tr>
</tbody></table></div>
<p>In short: for a trial page with a short life, a template will do. For a site that’s expected to bring in customers, I recommend the one cut to measure.</p>`,
        },
        {
          id: 'process',
          h2: 'How does the process work?',
          html: `<ol>
<li><strong>Getting to know each other.</strong> You message me on WhatsApp; we talk about what you do, who it’s for and what the site needs to achieve.</li>
<li><strong>Scope and timeline.</strong> Pages, features and dates go down in writing. You know exactly what you’ve said “yes” to.</li>
<li><strong>Design.</strong> First a direction, then a clickable prototype. I don’t start coding without your sign-off.</li>
<li><strong>Development.</strong> Every page is written against a performance budget; accessibility and SEO aren’t added along the way, they’re there from the start.</li>
<li><strong>Launch.</strong> The site goes live and measurement is set up; we watch how it performs together over the first weeks.</li>
</ol>`,
        },
      ],
      faq: [
        {
          q: 'How long does it take to build a website?',
          a: 'It depends on the scope. A company site of a few pages and a multilingual site with an admin panel don’t keep the same calendar. In our first conversation I pin down the pages and features and give you a written timeline.',
        },
        {
          q: 'What determines the price of a website?',
          a: 'The number of pages, how original the design needs to be, the number of languages, whether you need content management, and integrations. I don’t sell packages; I listen to your scope and prepare a clear quote.',
        },
        {
          q: 'Can I update the site myself later?',
          a: 'Yes. If the content will change often, we plan an admin panel from the start. If it will rarely change, just tell me what should change.',
        },
        {
          q: 'Can you rebuild my current site?',
          a: 'Yes. First I measure which pages of your current site bring traffic and rankings; on the new site those addresses are either kept or moved with 301 redirects. That way, the work you’ve already earned on Google isn’t lost in the rebuild.',
        },
      ],
      wa: 'Hi Eyüp, I’d like a website built. In short, here’s what we do:',
      cta: {
        title: 'What should your site *feel* like?',
        text: 'Tell me what you do in two sentences; we’ll work out the scope and the timeline together.',
        button: 'Tell me about the project',
      },
    },

    uiux: {
      meta: {
        title: 'UI/UX Design — Interface & User Experience | Eyüp DevArt',
        description:
          'UI/UX design: interfaces where people find what they came for without thinking and know the brand at a glance. Research, prototype, and design that ships as code.',
      },
      crumb: 'UI/UX design',
      name: 'UI/UX design',
      serviceType: 'User interface and user experience design',
      summary: 'Interfaces that never tire the visitor, show the brand at first glance and ship as code, exactly as drawn.',
      h1: 'UI/UX design: beautiful to *look at,* easy to `use`.',
      answer:
        'UI (user interface) design decides what you see on the screen; UX (user experience) design decides what happens to you there. Good UI/UX lets visitors find what they came for without thinking, and lets them recognise the brand at first glance. Because I also write the code, everything I draw works on screen exactly as it was drawn.',
      facts: {
        for: 'New sites · Redesigns · App interfaces',
        includes: 'Research · Information architecture · Design system · Prototype',
        measure: 'Task completion · Accessibility · Conversion',
        start: 'Your current site’s address, or an idea',
      },
      sections: [
        {
          id: 'ui-vs-ux',
          h2: 'What’s the difference between UI and UX?',
          html: `<p>The short answer: <strong>UI is the door handle; UX is how easy it is to get through the door.</strong> The handle can be beautiful, but if it says “pull” on a door you have to push, the experience is bad.</p>
<ul>
<li><strong>UI:</strong> type, colour, white space, icons, buttons, motion. The visual language.</li>
<li><strong>UX:</strong> the order of the pages, the logic of the menu, how many steps a form takes, what happens when something goes wrong. The flow.</li>
</ul>
<p>Each is incomplete without the other, which is why I design them together, not one after the other.</p>`,
        },
        {
          id: 'whats-included',
          h2: 'What does a UI/UX project involve?',
          html: `<ol>
<li><strong>Understanding.</strong> Who are your users, why do they come, where do they get stuck? I look at your analytics, if you have them, and at your current site.</li>
<li><strong>Information architecture.</strong> The pages, the menu and the order of the content. Whatever visitors look for most should sit on the shortest path.</li>
<li><strong>A design system.</strong> Colours, type scales, spacing and components bound by rules, so the site doesn’t fall apart as it grows.</li>
<li><strong>Prototype.</strong> A clickable draft, tried separately on phones and on desktop.</li>
<li><strong>Into code.</strong> I don’t hand the design over to someone else; I build it myself. Nothing gets lost between the drawing and the screen.</li>
</ol>`,
        },
        {
          id: 'accessibility',
          h2: 'Why is accessibility part of the design?',
          html: `<p>An interface that wasn’t designed for someone using a screen reader, someone on a keyboard only, someone reading in bright sunlight or someone simply in a hurry wasn’t really designed well for anyone. My target is <a href="{glossary}#wcag">WCAG</a> 2.2 AA: enough contrast, visible focus, meaningful headings, and a calm version for people who prefer less motion.</p>
<p>This site follows the same rules; it returns zero violations in automated accessibility testing (axe, WCAG 2.2 AA).</p>`,
        },
      ],
      faq: [
        {
          q: 'Is UI/UX design the same as web design?',
          a: 'They’re close, but not the same. Web design usually describes how a site looks; UI/UX also covers how visitors move through it, where they get stuck and how they reach their goal. In my work, the two come together.',
        },
        {
          q: 'Can I get the design only and hand the build to another team?',
          a: 'You can; I deliver the design as a design system and a prototype a developer can use directly. Still, you get the best result when the hand that drew it also builds it.',
        },
        {
          q: 'Can you improve the user experience of my current site?',
          a: 'Yes. First I find where visitors get stuck: analytics, speed and accessibility measurements, and a real try-out on a phone. Then I rank the changes by impact and start with the one that will win you the most.',
        },
        {
          q: 'When do I get to see the design?',
          a: 'Before any code is written. You see a direction first, then a clickable prototype; I don’t start development without your sign-off.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about UI/UX design. In short:',
      cta: {
        title: 'Where do your visitors *get stuck?*',
        text: 'Send me your site’s address, or your idea; we’ll walk through the flow together.',
        button: 'Let’s talk design',
      },
    },

    frontend: {
      meta: {
        title: 'Front-End Development — Freelance Front-End Developer | DevArt',
        description:
          'Front-end development: I turn designs into fast, accessible code that’s right on every screen. HTML, CSS, TypeScript, Next.js and WebGL, written by hand.',
      },
      crumb: 'Front-end development',
      name: 'Front-end development',
      serviceType: 'Front-end web development',
      summary: 'The design, alive in the browser: fast, accessible interface code that works on every screen.',
      h1: 'Front-end development: the design, *alive* in the `browser`.',
      answer:
        'Front-end development is coding the part of a website or app that people see and touch: the interface, its interactions and its motion, in HTML, CSS and JavaScript. Good front-end code matches the design exactly, works on every screen and in every browser, opens fast and can be used by everyone. I write it by hand, in plain JavaScript, TypeScript or Next.js, depending on what the job needs.',
      facts: {
        for: 'Agencies · Designers · Product teams · Businesses',
        stack: 'HTML · CSS · TypeScript · Next.js · WebGL',
        measure: 'Core Web Vitals · WCAG 2.2 AA · Browser support',
        start: 'A design file, or an idea',
      },
      sections: [
        {
          id: 'what-i-do',
          h2: 'What do I do on the front end?',
          html: `<ul>
<li><strong>Turning design into code.</strong> From a design file or from my own design; exact at every screen width and every type size.</li>
<li><strong>Interaction and motion.</strong> Scroll-driven animation, page transitions, micro-interactions. For people who prefer less motion, all of it calms down on its own.</li>
<li><strong>WebGL and creative coding.</strong> Original visuals drawn in real time in the browser, like the line at the top of this site.</li>
<li><strong>Performance.</strong> Critical CSS inlined, fonts that load without shifting the page, images served as AVIF and WebP at the right size.</li>
<li><strong>Accessibility.</strong> Meaningful HTML, keyboard use, labels for screen readers, enough contrast.</li>
</ul>`,
        },
        {
          id: 'framework',
          h2: 'Do you need a framework?',
          html: `<p>No. A framework is a tool, not a goal. In an app full of interaction, React or Next.js saves time; on a company website, it usually brings nothing but weight.</p>
<p>The page you’re reading uses no framework at all; all of this site’s own JavaScript adds up to {jsKB} KB, compressed. I choose tools by looking at the job, not out of habit.</p>`,
        },
        {
          id: 'quality',
          h2: 'How can you tell good front-end code?',
          html: `<p>From the outside, by three things: <strong>speed, stability and access.</strong> Does the page open quickly (<a href="{glossary}#lcp">LCP</a>), does it respond the moment you tap (<a href="{glossary}#inp">INP</a>), does the content jump while it loads (<a href="{glossary}#cls">CLS</a>)? Then try it with a keyboard: where is the focus, and can you see it?</p>
<p>From the inside: few dependencies, readable code, meaningful HTML. I’d love you to open this site’s source and look; it has nothing to hide.</p>`,
        },
      ],
      faq: [
        {
          q: 'Can you build from an existing design?',
          a: 'Yes. Send the design file and we’ll talk through the screens and interactions. Before development starts we also fill in the states designs often forget: error messages, empty screens, loading moments.',
        },
        {
          q: 'Do you work with agencies and teams?',
          a: 'Yes. I can take on the front end inside an agency or a product team, working to your existing codebase and conventions.',
        },
        {
          q: 'Can you fix my current site’s front-end performance?',
          a: 'Yes. I measure first, then start with the problem that has the biggest impact. The biggest win usually comes from images, fonts and unnecessary JavaScript. More on the <a href="{svc:speed}">website speed optimization</a> page.',
        },
        {
          q: 'Which browsers do you support?',
          a: 'Current versions of Chrome, Safari, Firefox and Edge, on iPhone and Android too. When I use a new browser feature, the page still works fully in older browsers; only the ornament is missing.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about front-end development. In short:',
      cta: {
        title: 'Design ready, *code* missing?',
        text: 'Send the file, or the idea; we’ll map out the screens and interactions together.',
        button: 'Let’s talk front end',
      },
    },

    fullstack: {
      meta: {
        title: 'Full-Stack & Back-End Development — Web Apps | Eyüp DevArt',
        description:
          'Full-stack development: web apps from interface to server, database to admin panel. Fast, secure and ready to grow; one pair of hands, end to end.',
      },
      crumb: 'Full-stack development',
      name: 'Full-stack and back-end development',
      serviceType: 'Full-stack web application development',
      summary: 'From interface to server, database to admin panel: web applications built end to end by one pair of hands.',
      h1: 'Full-stack development: from the *screen* to the `server`.',
      answer:
        'Full-stack development means building both sides of a web application together: the front end people see, and the back end behind it, with its server, database and APIs. When one person builds both, nothing gets lost between them: data comes from the right place, pages are prepared on the server and open fast, and security is part of the plan from day one. Booking systems, admin panels, customer portals and integrations are what this work is made of.',
      facts: {
        for: 'Start-ups · Businesses · Teams that need internal tools',
        includes: 'Interface · API · Database · Authentication · Admin panel',
        stack: 'TypeScript · Node.js · Next.js · Edge',
        start: 'A paragraph on what the app should do',
      },
      sections: [
        {
          id: 'back-end',
          h2: 'What lives on the back end?',
          html: `<p>The part users never see, but which runs on every click:</p>
<ul>
<li><strong>APIs.</strong> The endpoints the front end reads from and writes to; clear, documented and versioned.</li>
<li><strong>Database.</strong> How data is stored, how it’s queried and how it’s backed up.</li>
<li><strong>Authentication and permissions.</strong> Who can sign in and who can see what, with passwords and sessions handled safely.</li>
<li><strong>Admin panel.</strong> A simple screen where you manage content, orders or bookings yourself.</li>
<li><strong>Integrations.</strong> Email, WhatsApp, maps, payments, or any other service you already use.</li>
</ul>`,
        },
        {
          id: 'server-rendering',
          h2: 'Why should pages be rendered on the server?',
          html: `<p>Because some search engines and AI crawlers don’t run JavaScript. A page whose content only appears in the browser, through JavaScript, is close to empty for them.</p>
<p>So I prepare content as plain HTML, on the server or ahead of time at build. The page opens faster and arrives in a form Google, ChatGPT and Perplexity can read; interaction is layered on top. More on the <a href="{svc:aeo-geo}">AEO & GEO</a> page.</p>`,
        },
        {
          id: 'security',
          h2: 'How do you handle security?',
          html: `<p>As part of the architecture, not a layer added later. Every piece of user input is validated, passwords are never stored in plain text, and permissions follow the principle of least privilege.</p>
<p>In the browser I use a strict Content Security Policy (CSP) and HSTS. This site’s policy only lets an embedded script run if its hash is known in advance; a line slipped in by anyone else simply doesn’t run.</p>`,
        },
      ],
      faq: [
        {
          q: 'What’s the difference between a full-stack developer and separate front-end and back-end teams?',
          a: 'Separate teams divide the work on large projects, but every hand-off between them is a chance for misunderstanding. A single full-stack developer builds the back end around what the front end actually needs. On small and mid-sized projects, that means a faster, more consistent result.',
        },
        {
          q: 'Can you integrate with an existing system?',
          a: 'Usually, yes. If the system has an API or a way to export data, we can connect it to your site or panel. First, we look together at what we can access.',
        },
        {
          q: 'Where will the app be hosted?',
          a: 'It depends on the need. For most projects, a CDN that serves content close to everyone, plus serverless (edge) functions where needed, is enough and economical. For heavier work we plan a classic server.',
        },
        {
          q: 'Do you maintain it after launch?',
          a: 'Yes. I keep track of updates, backups and security patches; if something goes wrong, you know who to message.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about a web app. Here’s briefly what it needs to do:',
      cta: {
        title: 'What should your app *do?*',
        text: 'Describe it in a paragraph; we’ll map out the screens, the data and the timeline together.',
        button: 'Describe the app',
      },
    },

    seo: {
      meta: {
        title: 'SEO Services — Technical SEO & Local SEO | Eyüp DevArt',
        description:
          'SEO services: technical SEO, content structure, structured data and local SEO to get found on Google. Measurement first, then work ranked by impact.',
      },
      crumb: 'SEO',
      name: 'SEO services',
      serviceType: 'Search engine optimization',
      summary: 'Technical SEO, content structure and local SEO: the work that lets Google find you, understand you and recommend you.',
      h1: 'SEO services: first get *found,* then get `chosen`.',
      answer:
        'SEO (search engine optimization) is the technical, content and reputation work that helps a site appear high in search engines such as Google and Bing for the searches in its field. My approach starts with measurement: is the site crawled, is it indexed, how fast is it, how is it built? Then I rank the problems by impact and start with the one that wins you the most. Nobody can guarantee the top spot; steer clear of anyone who does.',
      facts: {
        for: 'Company sites · Local businesses · E-commerce · New sites',
        includes: 'Technical SEO · Content structure · Structured data · Local SEO',
        measure: 'Search Console · Impressions & clicks · Rankings',
        start: 'Your site’s address',
      },
      sections: [
        {
          id: 'technical-seo',
          h2: 'What do I look at in technical SEO?',
          html: `<p>However good the content, if Google can’t crawl or understand a page, the rankings won’t come. On the technical side, the first things I check:</p>
<ul>
<li><strong>Crawling and indexing.</strong> <code>robots.txt</code>, the <a href="{glossary}#sitemap">sitemap</a>, <a href="{glossary}#canonical">canonical</a> tags, redirect chains and pages left out of the index.</li>
<li><strong>Speed.</strong> Core Web Vitals, on phones above all.</li>
<li><strong>Structure.</strong> Heading hierarchy, internal links, and how many clicks each page sits from the home page.</li>
<li><strong>Structured data.</strong> The business, its services, its questions and its breadcrumbs marked up with Schema.org, in a language machines understand.</li>
<li><strong>Multilingual sites.</strong> <a href="{glossary}#hreflang">hreflang</a> pairs, so the Turkish page reaches Turkish searchers and the English page reaches English ones.</li>
</ul>`,
        },
        {
          id: 'local-seo',
          h2: 'Local SEO: showing up for “near me”',
          html: `<p>“Emergency plumber near me”, “dentist in Kadıköy”, “tow truck Maltepe”: for searches like these, the results are largely decided by the <strong>Google Business Profile</strong>, the business’s location and its reviews. The website accompanies those signals and strengthens them:</p>
<ul>
<li>The business name, address and phone number written exactly the same everywhere.</li>
<li><code>LocalBusiness</code> structured data, with opening hours and service area.</li>
<li>For each area you genuinely serve, a page that says something specific about that area.</li>
<li>One-tap calling, directions and WhatsApp on phones.</li>
</ul>
<p>A warning: producing near-identical pages for dozens of cities and districts you don’t actually serve is a tactic Google’s <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener">spam policies</a> name outright (“doorway” pages), and it drags down trust in the whole site. An area page only works if it genuinely tells that area something. To see what it looks like for a local business, visit <a href="https://maltepeaksuotocekici.com" rel="noopener">Aksu Oto Çekici</a>.</p>`,
        },
        {
          id: 'how-i-work',
          h2: 'How do I work?',
          html: `<ol>
<li><strong>Measure.</strong> Search Console, crawling, speed and a structured-data audit. We see where you stand, in numbers.</li>
<li><strong>A priority list.</strong> I rank the problems by impact and effort. The first job is the one that brings the biggest gain for the least work.</li>
<li><strong>Do the work.</strong> I make the technical fixes myself; on the content side, we decide together what needs writing.</li>
<li><strong>Follow up.</strong> I track changes in impressions, clicks and rankings, and report plainly on what worked.</li>
</ol>`,
        },
      ],
      faq: [
        {
          q: 'How long does SEO take to work?',
          a: 'The effect of technical fixes starts to show within a few weeks, as Google recrawls the pages. In competitive searches, lasting results take months. SEO that promises shortcuts usually turns out expensive later.',
        },
        {
          q: 'Do you guarantee the number one spot?',
          a: 'No, and nobody can; Google decides the rankings. What I can guarantee is a site that’s technically sound, content that’s structured properly and results you can measure. If someone guarantees you the top spot, ask them how.',
        },
        {
          q: 'Do I need a Google Business Profile for local SEO?',
          a: 'If you want to appear on the map and in “near me” results, yes; it’s the strongest signal in local search. The website completes the profile: it repeats the same information consistently and brings visitors to you in a single tap.',
        },
        {
          q: 'Can you audit my current site’s SEO?',
          a: 'Yes. Send me the address; I’ll look at crawling, indexing, speed and structured data, and give you a short list ranked by priority.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about my site’s SEO. The address is:',
      cta: {
        title: 'How does Google *see* you?',
        text: 'Send me the address; from crawling to speed, we’ll look at where you stand together.',
        button: 'Request an SEO audit',
      },
    },

    'aeo-geo': {
      meta: {
        title: 'AEO & GEO Services — Get Cited in AI Answers | Eyüp DevArt',
        description:
          'AEO and GEO services: content, entity and structured-data work to get your brand cited in ChatGPT, Perplexity, Gemini and Google AI Overviews answers.',
      },
      crumb: 'AEO & GEO',
      name: 'AEO and GEO services',
      serviceType: 'Answer engine and generative engine optimization',
      summary: 'The work that gets your brand cited as a source in ChatGPT, Perplexity, Gemini and Google AI Overviews.',
      h1: 'AEO & GEO: when someone asks *AI,* your `name` comes up.',
      answer:
        'AEO and GEO services are the work that gets your brand chosen as the answer, and cited as a source, in AI-powered search: content written to be quoted, a business identity defined the same way everywhere, structured data, llms.txt and a site that’s open to AI crawlers. If you’d like the concepts first, read the <a href="{guide}">AEO & GEO guide</a>; this page is about how the work gets done for you.',
      facts: {
        for: 'Expertise-led firms · Local businesses · Brands · Consultants',
        includes: 'Quotable content · Entity consistency · Schema.org · llms.txt',
        measure: 'AI query tests · Citations · Brand mentions',
        start: 'Your site’s address and the three questions you’re asked most',
      },
      sections: [
        {
          id: 'whats-included',
          h2: 'What does AEO and GEO work involve?',
          html: `<ul>
<li><strong>A question map.</strong> What do your customers ask AI in your field? I build a list from real questions.</li>
<li><strong>Quotable content.</strong> Sections that answer each question clearly in the first sentence and make sense on their own; the kind a model can lift as-is and cite.</li>
<li><strong>Entity consistency.</strong> Your name, what you do, where you are and how to reach you, identical on your site, your Google Business Profile and your social profiles, so models match you to the right <a href="{glossary}#entity">entity</a>.</li>
<li><strong>Structured data.</strong> The business, its services, its questions and its pages in a single <a href="{glossary}#json-ld">JSON-LD</a> graph, linked by <code>@id</code>, with concepts tied to Wikidata.</li>
<li><strong>An open door for AI crawlers.</strong> Deliberate <code>robots.txt</code> rules, <a href="{glossary}#llms-txt">llms.txt</a> and a Markdown copy of every page.</li>
</ul>`,
        },
        {
          id: 'measuring',
          h2: 'How are results measured?',
          html: `<p>Visibility in AI answers doesn’t have a single dashboard like Search Console yet, so I build the measurement myself:</p>
<ol>
<li>I prepare a fixed list of real questions from your field.</li>
<li>At regular intervals I put those questions to ChatGPT, Perplexity, Gemini and Google AI Overviews.</li>
<li>I record whether your name comes up, which of your pages is cited and where your competitors stand.</li>
</ol>
<p>We also track visits from AI in your analytics. That traffic is still small, but it comes from people who asked the question and read the answer.</p>`,
        },
        {
          id: 'this-site',
          h2: 'Why is this site an example?',
          html: `<p>Because everything described here is applied on this site, and you can see it in the source:</p>
<ul>
<li>Every page answers in its first sentence, and those answers are marked up with <code>SpeakableSpecification</code>.</li>
<li>The business, its services, the glossary terms and the questions all sit in one knowledge graph, linked to each other.</li>
<li><a href="/llms.txt">llms.txt</a> and a Markdown copy of every page are ready for AI agents.</li>
<li><code>robots.txt</code> openly invites search and AI crawlers, and new pages are announced instantly through IndexNow.</li>
</ul>`,
        },
      ],
      faq: [
        {
          q: 'Can you guarantee AI will recommend me?',
          a: 'No. No model decides what to cite by contract. What I do is meet every condition for being recommended: being findable, quotable and trustworthy. Then I measure the effect with regular query tests.',
        },
        {
          q: 'Does letting AI crawlers in put my content at risk?',
          a: 'It’s a choice. Letting your content appear in AI answers and letting models train on it are separate things, and robots.txt can state each one separately. We decide together which you want.',
        },
        {
          q: 'Does it make sense for a small business?',
          a: 'Yes, even more so. Questions like “the best … near me” are now asked of AI too, and the answer names only a handful. A small business with consistent information, clear answers and good reviews can get ahead of a bigger but scattered competitor.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about visibility in AI answers (AEO & GEO). My site is:',
      cta: {
        title: 'Does AI *know* who you are?',
        text: 'Send the address and the three questions you’re asked most; we’ll test where you stand together.',
        button: 'Let’s test your visibility',
      },
    },

    speed: {
      meta: {
        title: 'Website Speed Optimization — Core Web Vitals | Eyüp DevArt',
        description:
          'Website speed optimization: measurement-led performance work that turns LCP, INP and CLS green. Images, fonts, JavaScript and server, one by one.',
      },
      crumb: 'Website speed optimization',
      name: 'Website speed optimization',
      serviceType: 'Web performance optimization',
      summary: 'Measurement-led performance work: Core Web Vitals in the green, and the page ready before you blink.',
      h1: 'Website speed: ready before you can *blink.*',
      answer:
        'Website speed optimization is measurement-led work that makes a page open sooner, respond to taps faster and stop shifting while it loads. Google measures it with Core Web Vitals: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1. I start from real measurements, then fix whatever costs the most time first.',
      facts: {
        for: 'Slow sites · Pages that struggle on phones · E-commerce',
        includes: 'Images · Fonts · JavaScript · Caching & CDN',
        measure: 'LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1',
        start: 'Your site’s address',
      },
      sections: [
        {
          id: 'why-it-matters',
          h2: 'Why does speed matter so much?',
          html: `<p>Because visitors don’t like waiting, and they won’t tell you; they just leave. The link between speed and money has been measured, too: in a Vodafone A/B test published on web.dev, improving the time to the largest content (<a href="{glossary}#lcp">LCP</a>) by 31% <a href="https://web.dev/case-studies/vodafone" rel="noopener">increased sales by 8%</a>.</p>
<p>Speed is also a ranking signal: Google states plainly that <a href="https://developers.google.com/search/docs/appearance/core-web-vitals" rel="noopener">Core Web Vitals are used by its ranking systems</a>. In short, a slow site loses both the visitor and the ranking.</p>`,
        },
        {
          id: 'how',
          h2: 'How do I make a site faster?',
          html: `<p>The five problems I meet most often, with their symptoms and fixes:</p>
<div class="table-wrap" role="region" aria-label="Slowness problems, symptoms and fixes" tabindex="0"><table>
<thead><tr><th scope="col">Problem</th><th scope="col">Symptom</th><th scope="col">Fix</th></tr></thead>
<tbody>
<tr><th scope="row">Large images</th><td>The main image arrives late (high LCP)</td><td>AVIF and WebP, the right size, priority loading</td></tr>
<tr><th scope="row">Fonts</th><td>Text appears late, or jumps once loaded</td><td>Subsetting, preloading, a metric-matched fallback font</td></tr>
<tr><th scope="row">Too much JavaScript</th><td>Slow response to taps (high INP)</td><td>Delete what’s unneeded, split and defer the rest</td></tr>
<tr><th scope="row">Elements without a size</th><td>Content shifts while loading (high CLS)</td><td>Fixed dimensions for images and embeds</td></tr>
<tr><th scope="row">A slow server</th><td>The first byte arrives late (high TTFB)</td><td>Caching, a CDN, static generation</td></tr>
</tbody></table></div>
<p>Each one is measured, then fixed, then measured again. Guesswork doesn’t make a site faster.</p>`,
        },
        {
          id: 'proof',
          h2: 'How fast is this page?',
          html: `<p>The <a href="/en/#proof">Proof</a> section on the home page shows real values, measured while the page opened on your own device; I don’t write those numbers, your browser does. In lab testing (Lighthouse), every page of this site scores 100 for performance, accessibility, best practices and SEO.</p>`,
        },
      ],
      faq: [
        {
          q: 'How can I measure my site’s speed?',
          a: 'The easiest way is Google’s PageSpeed Insights: enter the address and you see both real-user data and a lab test. The real-user data matters more, because it shows what your visitors actually experience.',
        },
        {
          q: 'Can you speed up a WordPress or template-based site?',
          a: 'Often noticeably, yes: images, plugins, caching and unnecessary scripts can all be fixed. But if the template itself is heavy, there’s a ceiling; at that point we talk honestly about the cost and the gain of a rebuild.',
        },
        {
          q: 'Do I need a rebuild to get a fast site?',
          a: 'Usually not. First we do what can be done on the current site; the biggest gain often comes from a handful of fixes. I only recommend a rebuild if the measurements show it’s the more economical path.',
        },
        {
          q: 'Does speed affect SEO?',
          a: 'It does, but it won’t work miracles on its own. Core Web Vitals are a ranking signal; the bigger effect shows in your visitors: fewer people leaving, more messages and sales. Speed clears the way for good content.',
        },
      ],
      wa: 'Hi Eyüp, I’m writing about my site’s speed. The address is:',
      cta: {
        title: 'How many *seconds* does your site take?',
        text: 'Send me the address; we’ll measure it and see together where the time goes.',
        button: 'Let’s measure it',
      },
    },
  },
};
