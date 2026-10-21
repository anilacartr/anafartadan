/* Müşteri yorumları: dönen slayt, yorum listesi ve yorum gönderme formu */
(() => {
  "use strict";

  const C = window.SITE_CONFIG;
  const REVIEWS = (window.REVIEWS || []).filter((r) => r && r.name && r.text);
  const MONTHS_LONG = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const waLink = (text) => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`;

  // "Ayşe Yılmaz" → "Ay*** Yı***"
  const maskName = (full) => String(full).trim().split(/\s+/).map((part) => {
    const chars = [...part];
    return chars.slice(0, chars.length > 2 ? 2 : 1).join("") + "***";
  }).join(" ");

  const ratingOf = (r) => {
    const n = Math.round(Number(r.rating));
    return n >= 1 && n <= 5 ? n : 0;
  };

  const fmtDate = (d) => {
    const m = /^(\d{4})-(\d{1,2})/.exec(d || "");
    return m ? `${MONTHS_LONG[Number(m[2]) - 1]} ${m[1]}` : "";
  };

  const reviewInner = (r) => {
    const name = maskName(r.name);
    const rating = ratingOf(r);
    const meta = [r.city, r.product, fmtDate(r.date)].filter(Boolean).map(esc).join(" · ");
    return `
      ${rating ? `<div class="rv-stars" role="img" aria-label="5 üzerinden ${rating} puan">${"★".repeat(rating)}<span>${"★".repeat(5 - rating)}</span></div>` : ""}
      <blockquote class="rv-text">${esc(r.text)}</blockquote>
      <figcaption class="rv-author">
        <span class="rv-avatar" aria-hidden="true">${esc([...name][0])}</span>
        <span><strong>${esc(name)}</strong>${meta ? `<small>${meta}</small>` : ""}</span>
      </figcaption>`;
  };

  /* ---------- Görünürlük: yorum varsa göster, yoksa boş durum ---------- */
  const has = REVIEWS.length > 0;
  $$("[data-reviews-home], [data-reviews-list-wrap]").forEach((el) => { el.hidden = !has; });
  $$("[data-reviews-empty]").forEach((el) => { el.hidden = has; });

  const rated = REVIEWS.map(ratingOf).filter(Boolean);
  $$("[data-reviews-summary]").forEach((el) => {
    if (!has) { el.hidden = true; return; }
    const avg = rated.length ? (rated.reduce((a, b) => a + b, 0) / rated.length).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) : null;
    el.innerHTML = `${avg ? `<span class="rv-stars-sm">★</span> <b>${avg}</b> / 5 · ` : ""}${REVIEWS.length} yorum`;
  });

  /* ---------- Yorum listesi ---------- */
  $$("[data-reviews-list]").forEach((el) => {
    el.innerHTML = REVIEWS.map((r) => `<figure class="rv-card">${reviewInner(r)}</figure>`).join("");
  });

  /* ---------- Dönen slayt ---------- */
  $$("[data-reviews-slider]").forEach((root) => {
    if (!has) return;
    const n = REVIEWS.length;
    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carousel");
    root.setAttribute("aria-label", "Müşteri yorumları");
    root.innerHTML = `
      <div class="rv-viewport">
        ${REVIEWS.map((r, i) => `<figure class="rv-slide" role="group" aria-roledescription="slayt" aria-label="${i + 1} / ${n}"${i ? " hidden" : ""}>${reviewInner(r)}</figure>`).join("")}
      </div>
      ${n > 1 ? `
      <div class="rv-controls">
        <button type="button" class="icon-btn" data-rv-step="-1" aria-label="Önceki yorum">${icon("i-arrow", "ic flip")}</button>
        <div class="rv-dots">${REVIEWS.map((_, i) => `<button type="button" data-rv-dot="${i}" aria-label="${i + 1}. yorum"${i ? "" : ' aria-current="true"'}></button>`).join("")}</div>
        <button type="button" class="icon-btn" data-rv-step="1" aria-label="Sonraki yorum">${icon("i-arrow")}</button>
      </div>` : ""}`;

    const slides = $$(".rv-slide", root);
    const dots = $$("[data-rv-dot]", root);
    let index = 0;
    let timer;
    const show = (i) => {
      index = (i + n) % n;
      slides.forEach((s, k) => { s.hidden = k !== index; });
      dots.forEach((d, k) => { if (k === index) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = () => {
      clearInterval(timer);
      if (!reduceMotion && n > 1) timer = setInterval(() => show(index + 1), 6000);
    };
    const pause = () => clearInterval(timer);

    root.addEventListener("click", (e) => {
      const step = e.target.closest("[data-rv-step]");
      const dot = e.target.closest("[data-rv-dot]");
      if (step) show(index + Number(step.dataset.rvStep));
      else if (dot) show(Number(dot.dataset.rvDot));
      else return;
      play();
    });
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", play);
    play();
  });

  /* ---------- Yorum formu → WhatsApp ---------- */
  const form = document.getElementById("reviewForm");
  if (!form) return;

  const productNames = (window.PRODUCTS || []).filter((p) => p.category !== "deneme").map((p) => p.name);
  form.elements.product.innerHTML =
    `<option value="">Genel / birden fazla ürün</option>` + productNames.map((name) => `<option>${esc(name)}</option>`).join("");

  const errorBox = form.querySelector("[data-form-error]");
  const okBox = form.querySelector("[data-form-ok]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const missing = [
      [!String(d.name || "").trim(), "Ad Soyad", "name"],
      [!d.rating, "Puan", "rating"],
      [!String(d.text || "").trim(), "Yorum", "text"],
      [!d.consent, "Yayın izni", "consent"]
    ].filter(([bad]) => bad);

    $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
    okBox.hidden = true;
    if (missing.length) {
      missing.forEach(([, , field]) => $$(`[name="${field}"]`, form).forEach((el) => el.setAttribute("aria-invalid", "true")));
      errorBox.textContent = `Lütfen eksik alanları doldurun: ${missing.map(([, label]) => label).join(", ")}.`;
      errorBox.hidden = false;
      return;
    }
    errorBox.hidden = true;

    const rating = Number(d.rating);
    const lines = [
      `Merhaba, ${C.brandName} için yorumum var. 🌿`,
      "",
      "*YORUM*",
      `Ad Soyad: ${d.name.trim()}`,
      d.city && d.city.trim() ? `İl / İlçe: ${d.city.trim()}` : null,
      `Ürün: ${d.product || "Genel"}`,
      `Puan: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
      `Yorum: ${d.text.trim()}`,
      "",
      "Yorumumun, adımın ve soyadımın bir kısmı gizlenerek sitede yayınlanmasına izin veriyorum."
    ].filter((l) => l !== null);

    const url = waLink(lines.join("\n"));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    okBox.hidden = false;
  });
})();
