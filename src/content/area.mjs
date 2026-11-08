// The service area: every province and district of Türkiye, from one verified dataset
// (src/data/turkiye.json). The page itself names the 81 provinces; the 973 districts arrive
// only when someone asks for them: by searching, or by opening a province.
// {d} district · {p} province · {n} number of districts · {place} "district, province"

export const area = {
  tr: {
    path: '/hizmet-bolgesi/',
    meta: {
      title: 'Hizmet bölgesi: 81 il, 973 ilçe | Eyüp DevArt',
      description:
        'Eyüp DevArt uzaktan çalışır: Türkiye’nin 81 ilindeki 973 ilçenin hepsinde ve yurt dışında web sitesi, SEO, AEO ve GEO. İlçenizi arayın, WhatsApp’tan yazın.',
      ogAlt: 'Hizmet bölgesi: Türkiye’nin 81 ili, 973 ilçesi. Eyüp DevArt',
    },
    crumb: 'Hizmet bölgesi',
    label: 'Hizmet bölgesi',
    og: 'Türkiye’nin 81 ili, 973 ilçesi',
    h1: 'Türkiye’nin *her ilçesi.*',
    intro:
      'Web sitesi işi uzaktan yürür: konuşmalar WhatsApp’ta ya da görüntülü görüşmede, tasarım ve kod ekranda. Bu yüzden 81 ilin 973 ilçesinin hepsinde ve yurt dışında çalışıyorum. İlçenizi yazın.',
    answerLabel: 'Kısa cevap',
    answer:
      'Evet, sizin ilçeniz de dahil. Eyüp DevArt, Türkiye’nin 81 ilindeki 973 ilçenin tamamında uzaktan web tasarım, web geliştirme, SEO, AEO ve GEO hizmeti verir; yurt dışından da çalışılır. İlk görüşme WhatsApp’ta olur.',
    find: {
      h: 'İlçenizi bulun',
      label: 'İl ya da ilçe',
      placeholder: 'Örneğin Erciş, Kadıköy, Rize',
      hint: 'Yazdıkça eşleşen il ve ilçeler çıkar.',
      none: 'Bu adla bir il ya da ilçe bulamadım. Yazımı kontrol edin; yurt dışındaysanız da yazabilirsiniz.',
      count: '{n} ilçe',
      province: 'il',
      district: '{d}, {p}: kapsamda.',
      whole: '{p} ve {n} ilçesinin hepsi kapsamda.',
      sub: 'Uzaktan çalışıyoruz; ilk adım WhatsApp’ta iki cümle.',
      cta: 'WhatsApp’tan yazın',
      open: '{p} ilçeleri',
      message: 'Merhaba Eyüp, eyupdevart.com’dan yazıyorum. Yerim: {place}. Bir proje için konuşmak isterim.',
      failed: 'İlçe listesi şu an yüklenemedi. Tam liste metin sürümünde:',
    },
    all: {
      h: '81 il, 973 ilçe',
      lead: 'Plaka sırasıyla. Bir ili açın, ilçeleri görünsün; bir ilçe seçin, mesajınız oradan başlasın.',
      metro: 'Büyükşehir',
      noscript: 'İlçe listeleri JavaScript ile açılır. Tam liste, JavaScript olmadan da okunan <a href="/hizmet-bolgesi/index.html.md">metin sürümünde</a>.',
    },
    note: 'Liste resmî idari yapıya göre kuruldu ve İçişleri Bakanlığı’nın sayılarıyla birebir doğrulandı: 81 il; 30 büyükşehirde 519 ilçe, diğer 51 ilde 403 ilçe ve 51 merkez ilçe, toplam 973. Mahalle bazında bir liste vermiyorum: iş uzaktan yürüdüğü için il ve ilçe yeter.',
    cta: {
      title: 'Neredeyseniz, *oradan.*',
      text: 'Ne yaptığınızı ve nerede olduğunuzu iki cümleyle yazın; gerisini birlikte konuşalım.',
      button: 'WhatsApp’tan yazın',
    },
  },
  en: {
    path: '/en/service-area/',
    meta: {
      title: 'Service area: 81 provinces, 973 districts | Eyüp DevArt',
      description:
        'Eyüp DevArt works remotely in all 973 districts of Türkiye’s 81 provinces, and abroad: websites, SEO, AEO and GEO. Find your district, message on WhatsApp.',
      ogAlt: 'Service area: all 81 provinces and 973 districts of Türkiye. Eyüp DevArt',
    },
    crumb: 'Service area',
    label: 'Service area',
    og: 'All 81 provinces, all 973 districts of Türkiye',
    h1: 'Every district of *Türkiye.*',
    intro:
      'Building a website is remote work: we talk on WhatsApp or a video call, and design and code happen on screen. So I work in all 973 districts of Türkiye’s 81 provinces, and abroad. Type your district.',
    answerLabel: 'Short answer',
    answer:
      'Yes, yours included. Eyüp DevArt provides web design, web development, SEO, AEO and GEO remotely in all 973 districts of Türkiye’s 81 provinces, and works with clients abroad. The first conversation happens on WhatsApp.',
    find: {
      h: 'Find your district',
      label: 'Province or district',
      placeholder: 'e.g. Erciş, Kadıköy, Rize',
      hint: 'Matching provinces and districts appear as you type.',
      none: 'No province or district by that name. Check the spelling; if you are abroad, write anyway.',
      count: '{n} districts',
      province: 'province',
      district: '{d}, {p}: covered.',
      whole: '{p} and all {n} of its districts: covered.',
      sub: 'We work remotely; the first step is two sentences on WhatsApp.',
      cta: 'Message on WhatsApp',
      open: 'Districts of {p}',
      message: 'Hi Eyüp, I’m writing from eyupdevart.com. I’m in {place}. I’d like to talk about a project.',
      failed: 'The district list could not load right now. The full list is in the text version:',
    },
    all: {
      h: '81 provinces, 973 districts',
      lead: 'In licence-plate order. Open a province to see its districts; pick a district to start your message from there.',
      metro: 'Metropolitan',
      noscript: 'District lists open with JavaScript. The full list is in the <a href="/en/service-area/index.html.md">text version</a>, readable without it.',
    },
    note: 'The list follows Türkiye’s official administrative structure and matches the Ministry of Interior’s counts exactly: 81 provinces; 519 districts in the 30 metropolitan provinces, 403 districts and 51 central districts in the other 51, 973 in all. There is no neighbourhood-level list: the work is remote, so the province and district are all that matter.',
    cta: {
      title: 'Wherever you are, *from there.*',
      text: 'Write two sentences: what you do and where you are. We will take it from there.',
      button: 'Message on WhatsApp',
    },
  },
};
