# Anafartadan · Büyükanafarta Köy Ürünleri

Büyükanafarta (Eceabat / Çanakkale) köyünde Mustafa ve Emine Döner'in ürettiği ceviz, zeytinyağı, domates ve biber salçasının satıldığı, siparişlerin WhatsApp üzerinden alındığı tek sayfalık web sitesi.

Kurulum veya sunucu gerekmez. `index.html` dosyasını tarayıcıda açmanız yeterli.

## Ayarlar

Bütün ayarlar **`assets/js/products.js`** dosyasındadır:

| Ayar | Açıklama |
|---|---|
| `whatsappNumber` | Siparişlerin geleceği WhatsApp numarası (şu an +90 545 878 70 03). Ülke koduyla, boşluksuz yazılır: `905458787003` |
| `phoneDisplay` | Sitede görünecek telefon numarası |
| `instagramUrl`, `address`, `workingHours` | Footer'daki iletişim bilgileri |
| `mapsUrl` | "Yol tarifi al" linki. Google Haritalar'dan kendi konumunuzun paylaşım linkini yapıştırın |
| `freeShippingThreshold` | Bu tutar ve üzerinde kargo ücretsiz olur. Kapatmak için `0` yazın |
| `paymentOptions` | Sepette gösterilen ödeme seçenekleri |
| `deliveryOptions` | Teslimat seçenekleri. İkincisi "köye gelip yerinde alma"dır; seçilirse adres ve kargo sorulmaz |
| `PRODUCTS` | Ürünler, seçenekler (gramaj, litre) ve **fiyatlar** |
| Küçük boylar | Her ürünün `variants` listesindeki küçük gramajlar (150 g, 100 ml, 300 g…). Fiyatları büyük boyun kilo/litre fiyatından hesaplanmıştır; büyük boy fiyatı değişirse bunları da güncelleyin. `default: true` olan boy kartta seçili gelir |
| Fiyatı belirlenmemiş ürün | Seçeneğin fiyatını `price: null` yazarsanız kartta "Fiyatı henüz belli değil" yazar ve sepet yerine WhatsApp'tan ön sipariş butonu çıkar. Şu an zeytinler böyle |
| `availableFrom` | Ürün henüz hazır değilse gönderim tarihi (örn. `"10 Kasım'dan itibaren (tahmini)"`). Kartta, sepette ve sipariş mesajında görünür. Ürün hazır olunca satırı silin |
| `HARVEST` | Hasat takvimindeki aylar |

Tanışma Paketi ve Aile Paketi'nin fiyatı, içindeki ürünlerin gramaj fiyatlarının toplamıdır.

## Müşteri yorumları

Yorumlar **`assets/js/yorumlar.js`** dosyasındadır. Müşteri, Yorumlar sayfasındaki formu doldurduğunda yorumu WhatsApp ile size gelir. Yayınlamak istediğiniz yorumu dosyadaki listenin en üstüne ekleyin:

```js
{ name: "Ayşe Yılmaz", city: "İstanbul", product: "Kabuklu Ceviz", rating: 5, date: "2026-10", text: "Yorum metni" },
```

Adı tam yazın; site otomatik olarak **Ay\*\*\* Yı\*\*\*** şeklinde gizler. İlk yorum eklendiğinde ana sayfadaki "Müşterilerimiz ne diyor?" bölümü de kendiliğinden görünür hale gelir. Yalnızca gerçek müşterilerden gelen ve yayın izni verilmiş yorumları ekleyin.

## Fotoğraflar

`assets/img/` klasöründeki fotoğraflar Pexels'ten alınmıştır. Ücretsiz ve ticari kullanıma açıktır (bkz. `assets/img/CREDITS.md`). Köyden çekeceğiniz gerçek ürün fotoğraflarını **aynı dosya adıyla** bu klasöre koyarsanız sitede otomatik olarak onlar görünür. Gerçek kavanoz, şişe ve köy fotoğrafları güveni ciddi şekilde artırır.

Önerilen ölçü: yatay, en az 1400 px genişlik, 400 KB'ın altında JPG.

## Nasıl çalışır?

1. Müşteri ürünleri seçip sepete ekler. Sepet tarayıcıda saklanır.
2. Teslimat şeklini seçer: kargo ile gönderim ya da köye gelip yerinde alma.
3. "WhatsApp ile Sipariş Ver" butonuna dokunur.
4. Ürünler, adetler, toplam tutar ve (doldurduysa) teslimat bilgileri hazır bir mesaj olarak WhatsApp'ta açılır.
5. Siparişi WhatsApp'tan onaylar, ödeme bilgilerini iletirsiniz.

## Yayın

Site GitHub Pages üzerinde yayında: **https://anilacartr.github.io/anafartadan/**

Kaynak kod: https://github.com/anilacartr/anafartadan

Bir değişikliği yayına almak için dosyaları düzenleyip `main` dalına göndermeniz yeterli. GitHub Pages siteyi 1–2 dakika içinde günceller:

```bash
git add -A
git commit -m "Fiyatlar güncellendi"
git push
```

Kendi alan adınızı (örneğin `anafartadan.com`) bağlamak isterseniz deponun **Settings → Pages → Custom domain** bölümünü kullanın. Ardından `index.html` içindeki `og:url`, `og:image` ve `canonical` adreslerini yeni alan adıyla değiştirin.
