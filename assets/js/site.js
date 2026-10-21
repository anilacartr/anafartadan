/* Tüm sayfalarda ortak: ayarlardan gelen metinler ve WhatsApp linkleri */
(() => {
  "use strict";

  const C = window.SITE_CONFIG;
  const $$ = (s) => [...document.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("tr-TR") + " ₺";
  const waLink = (text) => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`;

  $$("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa || C.defaultMessage);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-config]").forEach((el) => { if (C[el.dataset.config] != null) el.textContent = C[el.dataset.config]; });
  $$("[data-config-href]").forEach((el) => {
    if (C[el.dataset.configHref]) el.href = C[el.dataset.configHref];
    else el.remove();
  });
  $$("[data-free-shipping-text]").forEach((el) => {
    el.textContent = C.freeShippingThreshold > 0
      ? `${fmt(C.freeShippingThreshold)} ve üzeri siparişlerde kargo ücretsizdir. Daha küçük siparişlerde kargo ücretini, paketin ağırlığına göre WhatsApp'ta bildiririz.`
      : "Kargo ücretini, paketin ağırlığına göre WhatsApp'ta bildiririz.";
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Yüklenemeyen görselleri gizle, altındaki yedek görünüm kalsın
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") e.target.classList.add("img-missing");
  }, true);
})();
