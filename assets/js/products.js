/* =====================================================================
   SİTE AYARLARI ve ÜRÜN LİSTESİ
   ---------------------------------------------------------------------
   Sitedeki fiyatları, ürünleri ve iletişim bilgilerini sadece bu
   dosyadan değiştirebilirsiniz. HTML'e dokunmanıza gerek yoktur.
   ===================================================================== */

window.SITE_CONFIG = {
  brandName: "Anafartadan",

  // WhatsApp numarası: ülke kodu ile, başında + ve boşluk OLMADAN.
  // Örnek: 0532 123 45 67  →  "905321234567"
  whatsappNumber: "905458787003",
  phoneDisplay: "+90 545 878 70 03",

  instagramUrl: "https://instagram.com/",
  address: "Büyükanafarta Köyü, Eceabat / Çanakkale",
  // "Yol tarifi" linki. Tam konumunuzu Google Haritalar'da Paylaş → Bağlantıyı kopyala ile buraya yapıştırabilirsiniz.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Büyükanafarta+Köyü,+Eceabat,+Çanakkale",
  workingHours: "Her gün 08:00 – 21:00",

  // Bu tutar ve üzeri siparişlerde kargo ücretsiz. Kapatmak için 0 yazın.
  freeShippingThreshold: 3000,
  shippingNote: "Siparişler 1–3 iş günü içinde kargoya verilir.",
  paymentOptions: ["Havale / EFT", "Kapıda / Elden Ödeme"],
  // Sepetteki teslimat seçenekleri. İkincisi yerinde teslimdir: seçilirse adres ve kargo sorulmaz.
  deliveryOptions: ["Kargo ile gönderilsin", "Köye gelip yerinde alacağım"],

  defaultMessage: "Merhaba, Büyükanafarta köy ürünleriniz hakkında bilgi almak istiyorum."
};

/* Ürünler
   - variants: Seçenekler (gramaj, litre, tatlı/acı vb.) ve fiyatları (TL)
   - compareAt: (isteğe bağlı) üstü çizili eski fiyat
   - featured: true olan ilk ürün ana sayfadaki "Bu hafta köyden" kartında görünür
   - image: assets/img klasöründeki fotoğraf. Kendi fotoğrafınızı aynı isimle koyabilirsiniz. */
window.PRODUCTS = [
  {
    id: "kabuklu-ceviz",
    category: "ceviz",
    categoryLabel: "Ceviz",
    name: "Kabuklu Ceviz",
    tagline: "Yeni hasat, ince kabuklu köy cevizi",
    description:
      "Ailemizin bahçesindeki yaşlı ceviz ağaçlarından elle silkelenen, yeşil kabuğundan ayrıldıktan sonra havadar ortamda doğal yollarla kurutulan ceviz. Kabuğu ağartılmaz; rengi doğaldır, içi dolgun ve tatlıdır.",
    image: "assets/img/ceviz.jpg",
    emoji: "🌰",
    tone: "walnut",
    badge: "Yeni Hasat",
    featured: true,
    tags: ["Ağartılmamış", "Doğal kurutma"],
    variants: [
      { label: "1 kg", price: 300 },
      { label: "2 kg", price: 600 },
      { label: "5 kg", price: 1500 }
    ],
    details: {
      "İçerik": "%100 ceviz. Hiçbir kimyasal işlem görmemiştir.",
      "Hasat": "Eylül sonu – Ekim. Ağaçtan silkelenip elle toplanır.",
      "Saklama": "Serin, kuru ve havadar bir yerde, file ya da bez torbada saklayın.",
      "Kullanım": "Kahvaltıda, tatlılarda, salatalarda, muhammara ve cevizli tariflerde."
    },
    difference:
      "Markette satılan kabuklu cevizlerin kabuğu açık renkli görünsün diye ağartılabilir. Bizim cevizimizin kabuğu doğal rengindedir; biraz lekeli olabilir ama içi tertemiz ve tatlıdır."
  },
  {
    id: "ic-ceviz",
    category: "ceviz",
    categoryLabel: "Ceviz",
    name: "İç Ceviz",
    tagline: "Elle kırılıp tek tek ayıklanır",
    description:
      "Kendi cevizlerimizden; kabukları elle kırılan, içleri tek tek ayıklanan, açık renkli, dolgun ve tatlı iç ceviz. Koyu renkli ve kusurlu taneler ayrılır, size sadece en iyisi gelir.",
    image: "assets/img/ic-ceviz.jpg",
    emoji: "🌰",
    tone: "walnut",
    badge: "Çok Satan",
    tags: ["Elle ayıklandı", "Açık renk"],
    variants: [
      { label: "500 g", price: 380 },
      { label: "1 kg", price: 750 }
    ],
    details: {
      "İçerik": "%100 iç ceviz.",
      "Hazırlık": "Küçük partiler halinde kırılır, böylece bekleyip acılaşmaz.",
      "Saklama": "Hava almayan kapta buzdolabında aylarca, dondurucuda bir yıla kadar tazeliğini korur.",
      "Kullanım": "Kahvaltı, granola, kek, baklava, cevizli erişte ve salatalar."
    },
    difference:
      "Uzun süre depoda bekleyen iç ceviz kararır ve acılaşır. Acı, kuru veya kâğıt gibi tat, cevizin bayatladığını gösterir. Bizim cevizimiz taze kırılır."
  },
  {
    id: "zeytinyagi-yeni-hasat",
    category: "zeytinyagi",
    categoryLabel: "Zeytinyağı",
    name: "Yeni Hasat Zeytinyağı",
    tagline: "Bu sezonun zeytininden, soğuk sıkım",
    description:
      "Bu sezon kendi zeytinliğimizden topladığımız zeytinler bekletilmeden soğuk sıkımla yağa dönüştürülür. Taze ve meyvemsi kokulu; damakta hafif acılık, boğazda tatlı bir yakıcılık bırakır.",
    image: "assets/img/zeytinyagi.jpg",
    emoji: "🫒",
    tone: "gold",
    badge: "Yeni Hasat",
    tags: ["Bu sezonun hasadı", "Soğuk sıkım"],
    variants: [
      { label: "1 L", price: 500 },
      { label: "5 L teneke", price: 2500 }
    ],
    details: {
      "İçerik": "%100 zeytinyağı. Rafine ya da başka bir yağ karıştırılmaz.",
      "Hasat": "Ekim – Aralık. Zeytinler hasattan sonra bekletilmeden soğuk sıkımla işlenir.",
      "Lezzet": "Taze, meyvemsi koku; belirgin acılık ve boğazda tatlı bir yakıcılık.",
      "Saklama": "Işık almayan, serin bir dolapta, kapağı kapalı saklayın. Tenekeden cam şişeye aktararak kullanın."
    },
    difference:
      "Market raflarındaki “riviera” yağlar rafine zeytinyağıyla karıştırılır; kokusu ve aroması zayıftır. Yeni hasat yağdaki acılık ve boğazdaki yakıcılık, yağın taze olduğunu ve polifenol açısından zengin olduğunu gösterir."
  },
  {
    id: "zeytinyagi-eski-hasat",
    category: "zeytinyagi",
    categoryLabel: "Zeytinyağı",
    name: "Eski Hasat Zeytinyağı",
    tagline: "Geçen sezondan, yumuşak içimli",
    description:
      "Geçen sezon kendi zeytinliğimizden toplanıp aynı özenle sıkılmış zeytinyağı. Dinlendikçe acılığı yumuşar; yemeklerde ve günlük kullanımda daha ekonomik bir tercihtir.",
    image: "assets/img/zeytin.jpg",
    emoji: "🫒",
    tone: "olive",
    badge: "Ekonomik",
    tags: ["Yumuşak içim", "Yemeklik"],
    variants: [
      { label: "1 L", price: 400 },
      { label: "5 L teneke", price: 2000 }
    ],
    details: {
      "İçerik": "%100 zeytinyağı. Rafine ya da başka bir yağ karıştırılmaz.",
      "Hasat": "Geçen sezon (Ekim – Aralık).",
      "Lezzet": "Dinlenmiş, yumuşak ve dengeli; acılığı azalmıştır.",
      "Kullanım": "Sıcak yemekler, zeytinyağlılar, kızartma ve günlük kullanım."
    },
    difference:
      "Market rafındaki zeytinyağlarının çoğunda hasat yılı yazmaz. Biz hangi sezonun yağını sattığımızı açıkça söylüyoruz: yeni hasat mı, eski hasat mı, siz seçersiniz."
  },
  {
    id: "domates-salcasi",
    category: "salca",
    categoryLabel: "Salça",
    name: "Ev Yapımı Domates Salçası",
    tagline: "Güneşte kurutuldu, sadece domates ve tuz",
    description:
      "Kendi bahçemizde olgunlaşan domatesler kaynatılıp süzülür, geniş tepsilerde günlerce güneş altında karıştırılarak koyulaştırılır. Derin aromalı, koyu kırmızı, gerçek ev salçası.",
    image: "assets/img/domates-salcasi.jpg",
    emoji: "🍅",
    tone: "terra",
    badge: "Güneş Salçası",
    tags: ["Katkısız", "Güneşte kurutma"],
    variants: [
      { label: "3 kg", price: 750 },
      { label: "6 kg", price: 1400 }
    ],
    details: {
      "İçerik": "Domates, tuz. Koruyucu, renklendirici, nişasta ve şeker yoktur.",
      "Üretim": "Ağustos – Eylül. Güneş altında, tepside, elle karıştırılarak koyulaştırılır.",
      "Saklama": "Açtıktan sonra buzdolabında saklayın. Üzerine bir kaşık zeytinyağı gezdirirseniz uzun süre bozulmaz.",
      "Kullanım": "Yemekler, çorbalar, soslar ve kahvaltılık ezmeler."
    },
    difference:
      "Fabrika salçası yüksek ısıda hızla koyulaştırılır. Bakanlığın taklit-tağşiş listelerinde zaman zaman nişasta veya boya katılmış salçalara rastlanır. Güneş salçasının kokusu yoğundur, rengi doğaldır, bir kaşığı yeter."
  },
  {
    id: "biber-salcasi",
    category: "salca",
    categoryLabel: "Salça",
    name: "Ev Yapımı Biber Salçası",
    tagline: "Tatlı ya da acı, güneşte olgunlaştı",
    description:
      "Kendi bahçemizde güneşte olgunlaşan kırmızı biberler ayıklanır, çekilir ve tepsilerde güneşte kurutulur. Tatlı ve acı olmak üzere iki çeşit. Mutfağınızın en çok aranan lezzeti olacak.",
    image: "assets/img/biber-salcasi.jpg",
    emoji: "🌶️",
    tone: "terra",
    badge: "Tatlı & Acı",
    tags: ["Katkısız", "Boya yok"],
    variants: [
      { label: "Tatlı · 3 kg", price: 950 },
      { label: "Acı · 3 kg", price: 950 },
      { label: "Tatlı · 5 kg", price: 1800 },
      { label: "Acı · 5 kg", price: 1800 }
    ],
    details: {
      "İçerik": "Kırmızı biber, tuz. Acı çeşitte acı biber oranı yüksektir.",
      "Üretim": "Ağustos – Eylül. Biberler çekilir, güneşte tepside koyulaştırılır.",
      "Saklama": "Açtıktan sonra buzdolabında, üzeri zeytinyağı ile örtülü saklayın.",
      "Kullanım": "Mercimek köftesi, kahvaltılık ezmeler, yemekler, çorbalar ve kızartma sosları."
    },
    difference:
      "Biber salçasının rengi doğal olarak koyu kırmızıdır. Parlak ve yapay görünen bir kırmızı, boya katıldığına işaret edebilir. Bizim salçamızda sadece biber ve tuz var."
  },
  {
    id: "tanisma-paketi",
    category: "paket",
    categoryLabel: "Paket",
    name: "Köyün Tadı Tanışma Paketi",
    tagline: "Dört imza lezzet bir arada",
    description:
      "Ailemizin ürünleriyle tanışmanın en güzel yolu: 1 L yeni hasat zeytinyağı, 1 kg kabuklu ceviz, 3 kg domates salçası ve 3 kg biber salçası (tatlı ya da acı). Sevdiklerinize hediye olarak da gönderebilirsiniz.",
    collage: [
      "assets/img/zeytinyagi.jpg",
      "assets/img/ceviz.jpg",
      "assets/img/domates-salcasi.jpg",
      "assets/img/biber-salcasi.jpg"
    ],
    emoji: "🧺",
    tone: "olive",
    wide: true,
    badge: "4'ü Bir Arada",
    tags: ["Hediye için ideal", "4 ürün"],
    // 500 (1 L yeni hasat) + 300 (1 kg ceviz) + 750 (3 kg domates) + 950 (3 kg biber) = 2.500 TL
    variants: [
      { label: "Tatlı biber salçalı", price: 2500 },
      { label: "Acı biber salçalı", price: 2500 }
    ],
    details: {
      "İçindekiler": "1 L yeni hasat zeytinyağı, 1 kg kabuklu ceviz, 3 kg domates salçası, 3 kg biber salçası (tatlı ya da acı).",
      "Paketleme": "Kırılmaya karşı korumalı kutuda, özenle paketlenir.",
      "Kimler için": "İlk kez sipariş verenler, sevdiklerine köy lezzeti göndermek isteyenler."
    },
    difference:
      "Market sepetinde bu dört ürünü aynı aileden ve bu sezonun hasadından bir arada bulmanız mümkün değil."
  },

  /* ---------- DENEME PAKETLERİ ----------
     Fiyatlar büyük boyun kilo/litre fiyatına göre hesaplanmıştır.
     Büyük boy fiyatı değişirse deneme fiyatlarını da güncelleyin.
     trialOf: "Detay" tıklanınca açılacak asıl ürün */
  {
    id: "deneme-kutusu",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Deneme Kutusu",
    tagline: "Hepsinden biraz, önce tadına bakın",
    description:
      "Ürünlerimizi ilk kez deneyecekler için: 150 g kabuklu ceviz, 100 g iç ceviz, 100 ml yeni hasat ve 100 ml eski hasat zeytinyağı, 300 g domates salçası ve 300 g biber salçası. İki zeytinyağını yan yana tadıp farkı kendiniz görün.",
    collage: [
      "assets/img/ic-ceviz.jpg",
      "assets/img/zeytin.jpg",
      "assets/img/domates-salcasi.jpg",
      "assets/img/biber-salcasi.jpg"
    ],
    emoji: "🧺",
    tone: "olive",
    wide: true,
    badge: "Deneme Kutusu",
    tags: ["6 ürün", "Kilo fiyatına göre"],
    // 45 + 75 + 50 + 40 + 75 + 95 = 380 TL
    variants: [
      { label: "Tatlı biber salçalı", price: 380 },
      { label: "Acı biber salçalı", price: 380 }
    ],
    details: {
      "İçindekiler": "150 g kabuklu ceviz, 100 g iç ceviz, 100 ml yeni hasat zeytinyağı, 100 ml eski hasat zeytinyağı, 300 g domates salçası, 300 g biber salçası (tatlı ya da acı).",
      "Fiyat": "Her ürün, büyük boyunun kilo ya da litre fiyatına göre hesaplanmıştır.",
      "Kimler için": "Köy ürünlerimizi önce az miktarda denemek isteyenler."
    }
  },
  {
    id: "deneme-kabuklu-ceviz",
    trialOf: "kabuklu-ceviz",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Kabuklu Ceviz",
    unitNote: "kg fiyatı 300 ₺",
    image: "assets/img/ceviz.jpg",
    emoji: "🌰",
    tone: "walnut",
    variants: [{ label: "150 g", price: 45 }]
  },
  {
    id: "deneme-ic-ceviz",
    trialOf: "ic-ceviz",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "İç Ceviz",
    unitNote: "kg fiyatı 750 ₺",
    image: "assets/img/ic-ceviz.jpg",
    emoji: "🌰",
    tone: "walnut",
    variants: [{ label: "100 g", price: 75 }]
  },
  {
    id: "deneme-yeni-hasat",
    trialOf: "zeytinyagi-yeni-hasat",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Yeni Hasat Zeytinyağı",
    unitNote: "litre fiyatı 500 ₺",
    image: "assets/img/zeytinyagi.jpg",
    emoji: "🫒",
    tone: "gold",
    variants: [{ label: "100 ml", price: 50 }]
  },
  {
    id: "deneme-eski-hasat",
    trialOf: "zeytinyagi-eski-hasat",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Eski Hasat Zeytinyağı",
    unitNote: "litre fiyatı 400 ₺",
    image: "assets/img/zeytin.jpg",
    emoji: "🫒",
    tone: "olive",
    variants: [{ label: "100 ml", price: 40 }]
  },
  {
    id: "deneme-domates-salcasi",
    trialOf: "domates-salcasi",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Domates Salçası",
    unitNote: "3 kg 750 ₺ üzerinden",
    image: "assets/img/domates-salcasi.jpg",
    emoji: "🍅",
    tone: "terra",
    variants: [{ label: "300 g", price: 75 }]
  },
  {
    id: "deneme-biber-salcasi",
    trialOf: "biber-salcasi",
    category: "deneme",
    categoryLabel: "Deneme",
    name: "Biber Salçası",
    unitNote: "3 kg 950 ₺ üzerinden",
    image: "assets/img/biber-salcasi.jpg",
    emoji: "🌶️",
    tone: "terra",
    variants: [
      { label: "Tatlı · 300 g", price: 95 },
      { label: "Acı · 300 g", price: 95 }
    ]
  }
];

/* Hasat takvimi (ay numaraları 1 = Ocak … 12 = Aralık) */
window.HARVEST = [
  { name: "Domates & Biber Salçası", from: 8, to: 9, tone: "terra", note: "Güneşte kurutma" },
  { name: "Ceviz", from: 9, to: 10, tone: "walnut", note: "Silkeleme & kurutma" },
  { name: "Zeytin & Zeytinyağı", from: 10, to: 12, tone: "gold", note: "Hasat & soğuk sıkım" }
];
