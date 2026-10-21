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
  $$("[data-config-href]").forEach((el) => { if (C[el.dataset.configHref]) el.href = C[el.dataset.configHref]; });
  $$("[data-config-list]").forEach((el) => {
    const list = C[el.dataset.configList] || [];
    el.textContent = list.length > 1 ? list.slice(0, -1).join(", ") + " veya " + list.at(-1) : list.join("");
  });
  $$("[data-free-shipping-text]").forEach((el) => {
    el.textContent = C.freeShippingThreshold > 0 ? `${fmt(C.freeShippingThreshold)} ve üzeri siparişlerde kargo ücretsizdir.` : "";
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Yüklenemeyen görselleri gizle, altındaki yedek görünüm kalsın
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") e.target.classList.add("img-missing");
  }, true);
})();
