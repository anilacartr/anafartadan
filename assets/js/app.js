(() => {
  "use strict";

  const C = window.SITE_CONFIG;
  const PRODUCTS = window.PRODUCTS;
  const HARVEST = window.HARVEST || [];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  const MONTHS_LONG = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("tr-TR") + " ₺";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const waLink = (text) => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`;
  const displayName = (p) => (p.trialOf ? "Deneme · " : "") + p.name;

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* gizli sekme vb. */ }
    }
  };

  // Duyuru şeridini mobilde kesintisiz kaydırmak için kopyala
  const track = $(".announce-track");
  if (track) {
    const sep = () => Object.assign(document.createElement("span"), { className: "dot", textContent: "•" });
    const originals = [...track.children];
    const dups = [sep(), ...originals.map((el) => el.cloneNode(true)), sep()];
    dups.forEach((el) => { el.classList.add("dup"); el.setAttribute("aria-hidden", "true"); });
    track.append(...dups);
  }

  /* ---------- Header ---------- */
  const header = $("#siteHeader");
  const menuBtn = $("#menuBtn");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  };
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Ürün kartları ---------- */
  const mediaHTML = (p, eager = false) => {
    const loading = eager ? "" : ' loading="lazy"';
    const inner = p.collage
      ? `<span class="collage">${p.collage.map((src) => `<img src="${esc(src)}" alt=""${loading}>`).join("")}</span>`
      : `<img src="${esc(p.image)}" alt="${esc(p.name)}"${loading}>`;
    return `<span class="media-fallback" aria-hidden="true">${p.emoji || ""}</span>${inner}`;
  };

  const variantsHTML = (p, scope) => {
    if (p.variants.length < 2) return "";
    return `<fieldset class="variants"><legend class="sr-only">Seçenek</legend>${p.variants
      .map((v, i) => `<label class="variant"><input type="radio" name="v-${scope}-${p.id}" value="${i}"${i === 0 ? " checked" : ""}><span>${esc(v.label)}</span></label>`)
      .join("")}</fieldset>`;
  };

  const priceHTML = (v) => `${fmt(v.price)}${v.compareAt ? `<s>${fmt(v.compareAt)}</s>` : ""}`;

  const buyHTML = (p) => `
    <div class="buy-row">
      <div class="qty" role="group" aria-label="Adet">
        <button type="button" data-step="-1" aria-label="Azalt">${icon("i-minus")}</button>
        <input type="number" inputmode="numeric" min="1" max="99" value="1" aria-label="Adet" data-qty>
        <button type="button" data-step="1" aria-label="Arttır">${icon("i-plus")}</button>
      </div>
      <button type="button" class="btn btn-add" data-add>${icon("i-bag")} Sepete Ekle</button>
    </div>`;

  const cardHTML = (p) => {
    const v = p.variants[0];
    const wide = p.wide ? " card--wide" : "";
    return `
    <article class="card${wide}" data-product="${p.id}" data-category="${p.category}" data-reveal>
      <button type="button" class="card-media tone-${p.tone}" data-detail aria-label="${esc(p.name)} detayları">
        ${p.badge ? `<span class="badge${p.featured ? " gold" : ""}">${esc(p.badge)}</span>` : ""}
        ${mediaHTML(p)}
      </button>
      <div class="card-body">
        <span class="card-cat">${esc(p.categoryLabel)}</span>
        <h3 class="card-title"><button type="button" data-detail>${esc(p.name)}</button></h3>
        <p class="card-tagline">${esc(p.tagline)}</p>
        <p class="card-desc">${esc(p.description)}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${icon("i-check")}${esc(t)}</li>`).join("")}</ul>
        ${variantsHTML(p, "card")}
        <div class="card-foot">
          <div class="price-row">
            <span class="price" data-price>${priceHTML(v)}</span>
            <button type="button" class="detail-link" data-detail>Detaylı bilgi ${icon("i-arrow")}</button>
          </div>
          ${buyHTML(p)}
        </div>
      </div>
    </article>`;
  };

  const grid = $("#productGrid");
  grid.innerHTML = PRODUCTS.filter((p) => p.category !== "deneme").map(cardHTML).join("");

  // Deneme paketleri: kutu büyük kartta, küçük boylar kompakt kartlarda
  const trialCardHTML = (p) => {
    const v = p.variants[0];
    return `
    <article class="tcard" data-product="${p.id}" data-reveal>
      <button type="button" class="tcard-media tone-${p.tone}" data-detail aria-label="${esc(p.name)} hakkında bilgi">
        <span class="badge gold">Deneme</span>
        ${mediaHTML(p)}
      </button>
      <div class="tcard-body">
        <h3 class="tcard-title">${esc(p.name)}</h3>
        ${p.unitNote ? `<p class="tcard-unit">${esc(p.unitNote)}</p>` : ""}
        ${p.variants.length > 1 ? variantsHTML(p, "trial") : `<span class="tcard-size">${esc(v.label)}</span>`}
        <div class="tcard-foot">
          <span class="price" data-price>${priceHTML(v)}</span>
          <button type="button" class="btn btn-add" data-add aria-label="${esc(p.name)} deneme paketini sepete ekle">${icon("i-plus")} Ekle</button>
        </div>
      </div>
    </article>`;
  };
  const trials = PRODUCTS.filter((p) => p.category === "deneme");
  $("#trialFeatured").innerHTML = trials.filter((p) => p.wide).map(cardHTML).join("");
  $("#trialGrid").innerHTML = trials.filter((p) => !p.wide).map(trialCardHTML).join("");

  // Hero'daki öne çıkan ürün kartı
  const featured = PRODUCTS.find((p) => p.featured) || PRODUCTS[0];
  const heroCard = $("#heroCard");
  if (heroCard && featured) {
    const v = featured.variants[0];
    heroCard.dataset.product = featured.id;
    heroCard.innerHTML = `
      <div class="hero-card-media tone-${featured.tone}">
        <span class="badge gold">${esc(featured.badge || "Yeni")}</span>
        ${mediaHTML(featured, true)}
      </div>
      <div class="hero-card-body">
        <span class="hero-card-label">bu hafta köyden</span>
        <p class="hero-card-title">${esc(featured.name)}</p>
        <p class="hero-card-price"><b>${fmt(v.price)}</b> / ${esc(v.label)}</p>
        <div class="hero-card-actions">
          <button type="button" class="btn btn-dark" data-add>${icon("i-bag")} Sepete Ekle</button>
          <button type="button" class="btn btn-gold" data-detail>İncele</button>
        </div>
      </div>`;
  }

  /* ---------- Filtreler ---------- */
  const chips = $$(".chip[data-filter]");
  const applyFilter = (cat) => {
    chips.forEach((c) => {
      const on = c.dataset.filter === cat;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    $$(".card", grid).forEach((card) => { card.hidden = cat !== "all" && card.dataset.category !== cat; });
  };
  chips.forEach((c) => c.addEventListener("click", () => applyFilter(c.dataset.filter)));
  $$("[data-filter-link]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.filterLink)));

  /* ---------- Ürün kontrolleri (kart, modal, hero) ---------- */
  const readSelection = (scopeEl) => {
    const checked = $('input[type="radio"]:checked', scopeEl);
    const qtyEl = $("[data-qty]", scopeEl);
    return {
      v: checked ? Number(checked.value) : 0,
      qty: qtyEl ? clampQty(qtyEl.value) : 1
    };
  };
  const clampQty = (n) => Math.min(99, Math.max(1, parseInt(n, 10) || 1));

  document.addEventListener("click", (e) => {
    const scopeEl = e.target.closest("[data-product]");
    if (!scopeEl) return;
    const p = byId[scopeEl.dataset.product];

    const stepBtn = e.target.closest("[data-step]");
    if (stepBtn) {
      const input = $("[data-qty]", stepBtn.closest(".qty"));
      input.value = clampQty(Number(input.value) + Number(stepBtn.dataset.step));
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      const { v, qty } = readSelection(scopeEl);
      addToCart(p.id, v, qty);
      if (!addBtn.dataset.label) addBtn.dataset.label = addBtn.innerHTML;
      addBtn.classList.add("added");
      addBtn.innerHTML = `${icon("i-check")} Eklendi`;
      clearTimeout(addBtn._t);
      addBtn._t = setTimeout(() => { addBtn.classList.remove("added"); addBtn.innerHTML = addBtn.dataset.label; }, 1400);
      return;
    }
    if (e.target.closest("[data-detail]")) openProduct(p.trialOf || p.id);
  });

  document.addEventListener("change", (e) => {
    const input = e.target;
    const scopeEl = input.closest("[data-product]");
    if (!scopeEl) return;
    if (input.type === "radio") {
      const p = byId[scopeEl.dataset.product];
      const priceEl = $("[data-price]", scopeEl);
      if (priceEl) priceEl.innerHTML = priceHTML(p.variants[Number(input.value)]);
    }
    if (input.matches("[data-qty]")) input.value = clampQty(input.value);
  });

  /* ---------- Ürün detay modalı ---------- */
  const productDialog = $("#productDialog");
  const productInner = $("#productDialogInner");

  function openProduct(id) {
    const p = byId[id];
    const v = p.variants[0];
    const ask = `Merhaba, ${p.name} hakkında bilgi almak istiyorum.`;
    productInner.dataset.product = p.id;
    productInner.innerHTML = `
      <button class="icon-btn modal-close" type="button" data-close aria-label="Kapat">${icon("i-x")}</button>
      <div class="modal-media tone-${p.tone}">
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        ${mediaHTML(p, true)}
      </div>
      <div class="modal-body">
        <span class="card-cat">${esc(p.categoryLabel)}</span>
        <h2 id="pdTitle">${esc(p.name)}</h2>
        <p class="card-tagline">${esc(p.tagline)}</p>
        <p>${esc(p.description)}</p>
        ${variantsHTML(p, "modal")}
        <div class="card-foot">
          <div class="price-row"><span class="price" data-price>${priceHTML(v)}</span></div>
          ${buyHTML(p)}
          <a class="modal-ask" href="${waLink(ask)}" target="_blank" rel="noopener">${icon("i-wa")} Bu ürünü WhatsApp'tan sorun</a>
        </div>
        <dl class="spec">${Object.entries(p.details || {}).map(([k, val]) => `<div><dt>${esc(k)}</dt><dd>${esc(val)}</dd></div>`).join("")}</dl>
        ${p.difference ? `<div class="callout"><strong>${icon("i-leaf")} Marketten farkı</strong>${esc(p.difference)}</div>` : ""}
      </div>`;
    productDialog.showModal();
    productInner.scrollTop = 0;
  }

  /* ---------- Sepet ---------- */
  const CART_KEY = "anafarta_cart";
  const CUSTOMER_KEY = "anafarta_customer";
  let cart = store.get(CART_KEY, []).filter((it) => byId[it.id] && byId[it.id].variants[it.v]);

  const cartDialog = $("#cartDialog");
  const els = {
    items: $("#cartItems"),
    empty: $("#cartEmpty"),
    form: $("#checkoutForm"),
    foot: $("#cartFoot"),
    subtotal: $("#cartSubtotal"),
    shipping: $("#cartShipping"),
    shipBox: $("#shipProgress"),
    shipText: $("#shipText"),
    shipBar: $("#shipBar"),
    bar: $("#cartBar"),
    toast: $("#toast"),
    toastText: $("#toastText")
  };

  const lineOf = (it) => {
    const p = byId[it.id];
    const v = p.variants[it.v];
    return { p, v, total: v.price * it.qty };
  };
  const cartCount = () => cart.reduce((s, it) => s + it.qty, 0);
  const cartTotal = () => cart.reduce((s, it) => s + lineOf(it).total, 0);

  function addToCart(id, v, qty) {
    const found = cart.find((it) => it.id === id && it.v === v);
    if (found) found.qty = clampQty(found.qty + qty);
    else cart.push({ id, v, qty });
    saveCart();
    const { p, v: variant } = lineOf({ id, v, qty });
    showToast(`${displayName(p)} (${variant.label}) sepete eklendi`);
    $$("[data-cart-count]").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
  }

  function saveCart() {
    store.set(CART_KEY, cart);
    renderCart();
  }

  function renderCart() {
    const count = cartCount();
    const total = cartTotal();

    $$("[data-cart-count]").forEach((b) => { b.textContent = count; b.hidden = count === 0; });
    $$("[data-cart-summary]").forEach((s) => { s.textContent = `${count} ürün · ${fmt(total)}`; });
    els.bar.hidden = count === 0;
    document.body.classList.toggle("has-cart-bar", count > 0);

    els.empty.hidden = count > 0;
    els.form.hidden = count === 0;
    els.foot.hidden = count === 0;

    els.items.innerHTML = cart.map((it, i) => {
      const { p, v, total: line } = lineOf(it);
      const thumb = p.collage ? p.collage[0] : p.image;
      return `
        <li class="cart-item" data-index="${i}">
          <div class="cart-thumb tone-${p.tone}"><span class="media-fallback" aria-hidden="true">${p.emoji || ""}</span><img src="${esc(thumb)}" alt=""></div>
          <div class="cart-item-info">
            <strong>${esc(displayName(p))}</strong>
            <small>${esc(v.label)} · ${fmt(v.price)}</small>
            <div class="qty" role="group" aria-label="Adet">
              <button type="button" data-cart-step="-1" aria-label="Azalt">${icon("i-minus")}</button>
              <input type="number" inputmode="numeric" min="1" max="99" value="${it.qty}" aria-label="Adet" data-cart-qty>
              <button type="button" data-cart-step="1" aria-label="Arttır">${icon("i-plus")}</button>
            </div>
          </div>
          <div class="cart-item-side">
            <button type="button" class="remove-btn" data-cart-remove aria-label="${esc(p.name)} ürününü sepetten çıkar">${icon("i-trash")}</button>
            <b>${fmt(line)}</b>
          </div>
        </li>`;
    }).join("");

    els.subtotal.textContent = fmt(total);
    updateShipping();
  }

  const isPickup = () => $('input[name="delivery"]:checked', els.form)?.value === (C.deliveryOptions || [])[1];

  function updateShipping() {
    const total = cartTotal();
    const limit = C.freeShippingThreshold;
    const pickup = isPickup();
    $$("[data-ship-only]", els.form).forEach((el) => { el.hidden = pickup; });
    els.shipping.classList.remove("free");

    if (pickup) {
      els.shipBox.hidden = true;
      els.shipping.textContent = "Yok, köyden teslim";
    } else if (limit > 0 && cart.length) {
      const left = limit - total;
      els.shipBox.hidden = false;
      els.shipBar.style.width = Math.min(100, (total / limit) * 100) + "%";
      els.shipText.textContent = left > 0
        ? `Ücretsiz kargoya ${fmt(left)} kaldı.`
        : "Tebrikler! Siparişinizde kargo ücretsiz. 🎉";
      els.shipping.textContent = left > 0 ? "WhatsApp'ta bildirilecek" : "Ücretsiz";
      els.shipping.classList.toggle("free", left <= 0);
    } else {
      els.shipBox.hidden = true;
      els.shipping.textContent = "WhatsApp'ta bildirilecek";
    }
  }

  els.items.addEventListener("click", (e) => {
    const row = e.target.closest(".cart-item");
    if (!row) return;
    const it = cart[Number(row.dataset.index)];
    const step = e.target.closest("[data-cart-step]");
    if (step) {
      const next = it.qty + Number(step.dataset.cartStep);
      if (next < 1) cart.splice(Number(row.dataset.index), 1);
      else it.qty = clampQty(next);
      saveCart();
    } else if (e.target.closest("[data-cart-remove]")) {
      cart.splice(Number(row.dataset.index), 1);
      saveCart();
    }
  });
  els.items.addEventListener("change", (e) => {
    if (!e.target.matches("[data-cart-qty]")) return;
    cart[Number(e.target.closest(".cart-item").dataset.index)].qty = clampQty(e.target.value);
    saveCart();
  });

  $("#clearCart").addEventListener("click", () => {
    if (confirm("Sepetteki tüm ürünler silinsin mi?")) { cart = []; saveCart(); }
  });

  /* Teslimat formu: yazılanları hatırla */
  const radioGroup = (box, name, options) => {
    box.innerHTML = options.map((opt, i) =>
      `<label class="variant"><input type="radio" name="${name}" value="${esc(opt)}"${i === 0 ? " checked" : ""}><span>${esc(opt)}</span></label>`
    ).join("");
  };
  radioGroup($("#deliveryOptions"), "delivery", C.deliveryOptions || []);
  radioGroup($("#payOptions"), "payment", C.paymentOptions || []);

  const customer = store.get(CUSTOMER_KEY, {});
  Object.entries(customer).forEach(([k, val]) => {
    if (k === "payment" || k === "delivery") {
      const match = $$(`input[name="${k}"]`, els.form).find((r) => r.value === val);
      if (match) match.checked = true;
    } else if (els.form.elements[k]) {
      els.form.elements[k].value = val;
    }
  });
  els.form.addEventListener("input", () => store.set(CUSTOMER_KEY, Object.fromEntries(new FormData(els.form))));
  els.form.addEventListener("change", (e) => { if (e.target.name === "delivery") updateShipping(); });
  els.form.addEventListener("submit", (e) => e.preventDefault());

  function buildOrderMessage() {
    const data = Object.fromEntries(new FormData(els.form));
    const total = cartTotal();
    const pickup = isPickup();
    const lines = [`Merhaba, ${C.brandName} sitesinden sipariş vermek istiyorum. 🌿`, "", "*SİPARİŞ*"];
    cart.forEach((it, i) => {
      const { p, v, total: line } = lineOf(it);
      lines.push(`${i + 1}. ${displayName(p)} (${v.label}) × ${it.qty} = ${fmt(line)}`);
    });
    lines.push("", `*Ürün toplamı:* ${fmt(total)}`);
    if (!pickup && C.freeShippingThreshold > 0 && total >= C.freeShippingThreshold) lines.push("*Kargo:* Ücretsiz");

    const info = [
      ["Ad Soyad", data.name],
      ["Telefon", data.phone],
      ["Teslimat", data.delivery],
      ...(pickup ? [] : [["İl / İlçe", data.city], ["Adres", data.address]]),
      ["Ödeme", data.payment],
      ["Not", data.note]
    ].filter(([, val]) => val && String(val).trim());
    if (info.length) {
      lines.push("", "*TESLİMAT BİLGİLERİ*");
      info.forEach(([k, val]) => lines.push(`${k}: ${String(val).trim()}`));
    }
    lines.push("", "Teşekkürler!");
    return lines.join("\n");
  }

  $("#sendOrder").addEventListener("click", () => {
    if (!cart.length) return;
    const url = waLink(buildOrderMessage());
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  });

  /* ---------- Dialoglar ---------- */
  const openCart = () => {
    if (productDialog.open) productDialog.close();
    setMenu(false);
    hideToast();
    renderCart();
    cartDialog.showModal();
  };
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));

  [cartDialog, productDialog].forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) { dlg.close(); return; }
      const closer = e.target.closest("[data-close]");
      if (closer) {
        dlg.close();
        if (closer.dataset.goto) document.querySelector(closer.dataset.goto)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------- Bildirim ---------- */
  let toastTimer;
  function showToast(text) {
    els.toastText.textContent = text;
    els.toast.hidden = false;
    els.toast.style.animation = "none";
    void els.toast.offsetWidth;
    els.toast.style.animation = "";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3800);
  }
  function hideToast() { els.toast.hidden = true; }

  /* ---------- Hasat takvimi ---------- */
  const cal = $("#calendarGrid");
  if (cal) {
    const now = new Date().getMonth() + 1;
    const cells = () => MONTHS.map((_, i) => `<span class="cell${i + 1 === now ? " now" : ""}" style="grid-column:${i + 1}"></span>`).join("");
    const head = `
      <div class="cal-row cal-months" role="row">
        <div class="cal-label" role="columnheader"><span class="sr-only">Ürün</span></div>
        <div class="cal-track">${MONTHS.map((m, i) => `<span class="m${i + 1 === now ? " now" : ""}" style="grid-column:${i + 1}" role="columnheader">${m}</span>`).join("")}</div>
      </div>`;
    const rows = HARVEST.map((h) => `
      <div class="cal-row" role="row">
        <div class="cal-label" role="rowheader"><strong>${esc(h.name)}</strong><small>${MONTHS_LONG[h.from - 1]} – ${MONTHS_LONG[h.to - 1]} · ${esc(h.note)}</small></div>
        <div class="cal-track" role="cell">
          ${cells()}
          <span class="cal-bar ${h.tone}" style="grid-column:${h.from} / ${h.to + 1}">${esc(h.note)}</span>
        </div>
      </div>`).join("");
    cal.innerHTML = head + rows;

    const active = HARVEST.filter((h) => now >= h.from && now <= h.to).map((h) => h.name);
    $("#calendarNow").innerHTML = active.length
      ? `<span>Şu an <b>${MONTHS_LONG[now - 1]}</b>: ${esc(active.join(" ve "))} zamanı</span>`
      : `<span>Şu an <b>${MONTHS_LONG[now - 1]}</b>: stoktaki ürünlerimiz gönderime hazır</span>`;
  }

  /* ---------- Görünme animasyonu ---------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  renderCart();
})();
