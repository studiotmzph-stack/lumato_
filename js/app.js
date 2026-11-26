/* ============================================================
   LUMATO — app.js
   Tira de fotos, servicios, contadores, contacto y formulario.
   Todo sale de data.js.
   ============================================================ */

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad2 = (n) => String(n).padStart(2, "0");

  const lista = (typeof VISIBLES !== "undefined") ? VISIBLES : OBRAS;

  /* ---------- contacto ---------- */

  const mail = document.getElementById("link-mail");
  if (mail) { mail.textContent = ESTUDIO.email; mail.href = "mailto:" + ESTUDIO.email; }

  const wa = document.getElementById("link-wa");
  if (wa) {
    wa.href = "https://wa.me/" + ESTUDIO.whatsapp +
      "?text=" + encodeURIComponent("Hola Ricardo, tengo un terreno en Zona Norte y quería consultarte por el proyecto.");
  }

  const ig = document.getElementById("link-ig");
  if (ig) {
    ig.href = "https://instagram.com/" + ESTUDIO.instagram;
    ig.textContent = "@" + ESTUDIO.instagram;
  }

  const base = document.getElementById("meta-base");
  if (base) base.textContent = ESTUDIO.base;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- formulario (sin backend: arma un mail) ---------- */

  const form = document.getElementById("form-contacto");
  const note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const nombre = String(d.get("nombre") || "").trim();
      const email = String(d.get("email") || "").trim();
      const barrio = String(d.get("barrio") || "").trim();
      const mensaje = String(d.get("mensaje") || "").trim();

      const asunto = "Consulta por casa en " + (barrio || "Zona Norte");
      const cuerpo = [
        "Hola Ricardo,",
        "",
        nombre ? "Soy " + nombre + "." : null,
        barrio ? "El terreno está en " + barrio + "." : null,
        "",
        mensaje || "Quisiera consultarte por un proyecto.",
        "",
        "Email: " + email
      ].filter(x => x !== null).join("\n");

      window.location.href = "mailto:" + ESTUDIO.email +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);

      if (note) note.textContent = "Se abrió tu mail. Si no pasa nada, escribinos a " + ESTUDIO.email;
    });
  }

  /* ---------- contador del mapa ---------- */

  const partidos = [...new Set(lista.map(o => o.partido))];
  const fotos = lista.reduce((a, o) => a + (o.fotos ? o.fotos.length : 0), 0);
  const sub = document.getElementById("mapa-sub");
  if (sub) {
    sub.textContent = partidos.length + " partidos · " + fotos + " fotos";
  }

  /* ---------- qué hago ---------- */

  const listaServ = document.getElementById("servicios-list");
  if (listaServ && typeof SERVICIOS !== "undefined") {
    listaServ.innerHTML = SERVICIOS.map(s => `
      <li class="servicio">
        <span class="servicio__n">${s.n}</span>
        <h3 class="servicio__title">${s.titulo}</h3>
        <p class="servicio__text">${s.texto}</p>
      </li>`).join("");
  }

  /* ---------- tira de fotos ---------- */

  const strip = document.getElementById("strip");

  if (strip) {
    /* una foto por obra, y una copia de todo para que el loop no corte */
    let items = [];

    OBRAS.forEach((o) => {
      if (!o.fotos || !o.fotos.length) return;
      items.push({ src: o.fotos[0].src, vista: o.barrio, titulo: o.nombre, n: o.n });
    });

    if (!items.length) {
      items = OBRAS.slice(0, 4).map(o => ({
        src: "", vista: o.barrio, titulo: o.nombre, n: o.n
      }));
    }

    const card = (t, i) => `
      <a class="tile" href="#mapa" data-n="${t.n}">
        <span class="tile__plate" aria-hidden="true"></span>
        ${t.src ? `<img src="${t.src}" alt="${t.titulo} — ${t.vista}" loading="lazy">` : ""}
        <span class="tile__n">${pad2((i % items.length) + 1)}</span>
        <span class="tile__cap">
          <b>${t.vista}</b>
          <span>${t.titulo}</span>
        </span>
        <span class="tile__cta">Tocar para ver más</span>
      </a>`;

    const loop = items.concat(items);
    strip.innerHTML = `<div class="strip__track">${loop.map(card).join("")}</div>`;

    strip.querySelectorAll("img").forEach((img) => {
      const tile = img.closest(".tile");
      img.addEventListener("load", () => tile.classList.add("has-photo"));
      img.addEventListener("error", () => img.remove());
    });

    strip.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (!tile || !window.LUMATO_MAP) return;
      const n = tile.dataset.n;
      setTimeout(() => window.LUMATO_MAP.focus(n, true), 500);
    });
  }

  /* ---------- entrada suave ---------- */

  const items2 = $$(".vision__head, .vision__meta, .strip, .mapa__head, .servicios__head, .servicios__list, .contacto__title, .contacto__box");
  items2.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    items2.forEach(el => io.observe(el));
  } else {
    items2.forEach(el => el.classList.add("in"));
  }

  /* la píldora se apaga al entrar al mapa, para no tapar */
  const pill = $(".pill");
  const mapa = document.getElementById("mapa");
  if (pill && mapa && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      pill.style.opacity = e.isIntersecting ? "0" : "1";
      pill.style.pointerEvents = e.isIntersecting ? "none" : "auto";
    }, { threshold: 0.35 }).observe(mapa);
  }
})();
