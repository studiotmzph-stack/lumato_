/* ============================================================
   LUMATO — map.js
   MapLibre GL + OpenFreeMap (Positron). Sin API key, sin costo.
   Cada pin abre, al pasar el cursor, la carpeta de fotos de
   esa casa. Al salir, se cierra. Un clic la deja abierta.
   ============================================================ */

(function () {
  const host = document.getElementById("map");
  if (!host) return;

  const lista = (typeof VISIBLES !== "undefined") ? VISIBLES : OBRAS;

  if (typeof maplibregl === "undefined") {
    host.innerHTML = '<p class="mapa__fallback">No se pudo cargar el mapa.</p>';
    return;
  }

  const pad2 = (n) => String(n).padStart(2, "0");

  const lats = lista.map(o => o.lat);
  const lngs = lista.map(o => o.lng);
  const bbox = [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)]
  ];

  const map = new maplibregl.Map({
    container: host,
    style: "https://tiles.openfreemap.org/styles/positron",
    bounds: bbox,
    fitBoundsOptions: { padding: { top: 70, bottom: 70, left: 70, right: 70 }, maxZoom: 11.3 },
    minZoom: 9,
    maxZoom: 16,
    scrollZoom:false,
    maxBounds: [[-59.30, -34.85], [-58.05, -34.05]],
    attributionControl: { compact: true },
    dragRotate: false,
    pitchWithRotate: false
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  const canvas = document.getElementById("mapa-canvas");
  const eco = document.getElementById("ecosystem");
  const pins = {};

  let active = null;
  let sticky = false;
  let closeTimer = null;

  /* ---------- zoom de fotos ---------- */

  let zoom = document.getElementById("eco-zoom");
  if (!zoom) {
    zoom = document.createElement("div");
    zoom.className = "eco-zoom";
    zoom.id = "eco-zoom";
    zoom.setAttribute("aria-hidden", "true");
    zoom.innerHTML = '<button class="eco-zoom__close" type="button" aria-label="Cerrar">×</button><img src="" alt="">';
    document.body.appendChild(zoom);
  }
  const zoomImg = zoom.querySelector("img");

  function closeZoom() {
    zoom.classList.remove("on");
    zoom.setAttribute("aria-hidden", "true");
  }

  zoom.addEventListener("click", closeZoom);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeZoom(); });

  /* ---------- tinte del mapa ---------- */

  map.on("load", () => {
    const style = map.getStyle();
    const paint = (id, prop, value) => { if (map.getLayer(id)) map.setPaintProperty(id, prop, value); };

    paint("background", "background-color", "#EDEDEB");
    paint("water", "fill-color", "#DCDCD8");
    paint("park", "fill-color", "#E6E6E2");
    paint("landcover", "fill-color", "#EAEAE6");
    paint("building", "fill-color", "#E5E5E1");
    paint("building", "fill-outline-color", "#DEDEDA");

    style.layers.forEach((layer) => {
      const id = layer.id;
      if (/poi|airport|transit|housenumber|road_shield|ferry/i.test(id)) {
        try { map.setLayoutProperty(id, "visibility", "none"); } catch (e) { /* sin capa */ }
      }
      if (layer.type === "symbol") {
        try {
          map.setPaintProperty(id, "text-color", "#6A6A63");
          map.setPaintProperty(id, "text-halo-color", "#EDEDEB");
          map.setPaintProperty(id, "text-halo-width", 1.1);
        } catch (e) { /* sin texto */ }
      }
    });
  });

  /* ---------- ecosistema de fotos ---------- */

  function detalle(o) {
    return [o.anio, o.m2 ? o.m2 + " m²" : null].filter(Boolean).join(" · ");
  }

  function renderEco(o) {
    if (!eco) return;
    const fotos = o.fotos || [];
    const det = detalle(o);

    eco.innerHTML = `
      <div class="eco__head">
        <div>
          <span class="eco__n">Obra ${pad2(o.n)}</span>
          <h3 class="eco__name">${o.nombre}</h3>
          <p class="eco__meta">${o.barrio} · ${o.partido}${det ? "<br>" + det : ""}</p>
        </div>
        <button class="eco__close" type="button" aria-label="Cerrar carpeta">×</button>
      </div>

      <div class="eco__body">
        ${fotos.length
          ? fotos.map((f, i) => `
            <figure class="shot" style="--i:${i}">
              <div class="shot__frame">
                <span class="shot__plate" aria-hidden="true"><span>${f.vista}</span></span>
                <img src="${f.src}" alt="${o.nombre} — ${f.vista}" loading="lazy">
              </div>
              <figcaption>${f.vista}</figcaption>
            </figure>`).join("")
          : `<p class="eco__empty">Esta casa todavía no tiene fotos cargadas.</p>`}
      </div>

      <div class="eco__foot">
        <span>${fotos.length} ${fotos.length === 1 ? "foto" : "fotos"}</span>
        <a href="https://wa.me/${ESTUDIO.whatsapp}?text=${encodeURIComponent(
          "Hola Ricardo, me interesa " + o.nombre + " en " + o.barrio + "."
        )}" target="_blank" rel="noopener">Consultar</a>
      </div>`;

    eco.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => img.remove());
    });

    eco.querySelectorAll(".shot img").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        zoomImg.src = img.currentSrc || img.src;
        zoomImg.alt = img.alt;
        zoom.classList.add("on");
        zoom.setAttribute("aria-hidden", "false");
      });
    });

    eco.querySelector(".eco__close").addEventListener("click", (e) => {
      e.stopPropagation();
      sticky = false;
      closeEco(true);
    });

    eco.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    eco.addEventListener("mouseleave", () => { if (!sticky) closeEco(); });
  }

  function positionEco(pinEl) {
    if (!eco || !canvas || !pinEl || window.innerWidth <= 720) return;
    const p = pinEl.getBoundingClientRect();
    const c = canvas.getBoundingClientRect();
    const w = eco.offsetWidth;
    const h = eco.offsetHeight;
    const x = p.left - c.left;
    const y = p.top - c.top;

    let left = x + 20;
    if (left + w > c.width - 12) left = x - w - 20;
    left = Math.max(12, Math.min(left, c.width - w - 12));

    let top = y - 48;
    top = Math.max(12, Math.min(top, c.height - h - 12));

    eco.style.left = Math.round(left) + "px";
    eco.style.top = Math.round(top) + "px";
  }

  function openEco(o, pinEl, keepOpen) {
    if (!eco) return;
    clearTimeout(closeTimer);

    const same = active === String(o.n);
    if (!same) renderEco(o);

    active = String(o.n);
    sticky = !!keepOpen;

    Object.entries(pins).forEach(([key, p]) => p.el.classList.toggle("is-active", key === active));

    eco.classList.add("open");
    eco.setAttribute("aria-hidden", "false");

    if (pinEl) positionEco(pinEl);
  }

  function closeEco(now) {
    clearTimeout(closeTimer);
    const doIt = () => {
      if (!eco) return;
      eco.classList.remove("open");
      eco.setAttribute("aria-hidden", "true");
      Object.values(pins).forEach(p => p.el.classList.remove("is-active"));
      active = null;
      sticky = false;
    };
    if (now) doIt();
    else closeTimer = setTimeout(doIt, 180);
  }

  function focusObra(o) {
    const wide = window.innerWidth > 900;
    const padding = wide
      ? { top: 40, bottom: 40, left: 40, right: Math.min(440, host.clientWidth * 0.45) }
      : { top: 40, bottom: Math.round(host.clientHeight * 0.5), left: 40, right: 40 };

    map.easeTo({
      center: [o.lng, o.lat],
      zoom: Math.max(map.getZoom(), 12.2),
      padding,
      duration: 700
    });
  }

  /* ---------- pines ---------- */

  lista.forEach((o) => {
    const el = document.createElement("span");
    el.className = "pin";
    el.dataset.label = o.barrio;
    el.title = o.nombre + " · " + o.barrio;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", o.nombre + ", " + o.barrio + ", " + o.partido);

    el.addEventListener("mouseenter", () => openEco(o, el, false));
    el.addEventListener("mouseleave", () => { if (!sticky) closeEco(); });
    el.addEventListener("focus", () => openEco(o, el, false));
    el.addEventListener("blur", () => { if (!sticky) closeEco(); });

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sticky && active === String(o.n)) closeEco(true);
      else { openEco(o, el, true); focusObra(o); }
    });

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEco(o, el, true);
        focusObra(o);
      }
    });

    new maplibregl.Marker({ element: el, anchor: "center" })
      .setLngLat([o.lng, o.lat])
      .addTo(map);

    pins[o.n] = { el, obra: o };
  });

  map.on("click", () => { sticky = false; closeEco(true); });

  map.on("move", () => {
    if (active && pins[active]) positionEco(pins[active].el);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { sticky = false; closeEco(true); }
  });

  window.LUMATO_MAP = {
    focus(n, keepOpen) {
      const o = lista.find(x => String(x.n) === String(n));
      if (!o) return;
      openEco(o, pins[o.n] ? pins[o.n].el : null, keepOpen !== false);
      focusObra(o);
    },
    reset() {
      sticky = false;
      closeEco(true);
      map.fitBounds(bbox, { padding: 70, maxZoom: 11.3, duration: 600 });
    }
  };

  const reset = document.getElementById("map-reset");
  if (reset) reset.addEventListener("click", () => window.LUMATO_MAP.reset());

  /* ---------- si el estilo no carga, avisar sin romper ---------- */

  let loaded = false;
  map.on("load", () => { loaded = true; });
  map.on("error", () => {
    if (loaded) return;
    host.insertAdjacentHTML("beforeend",
      '<p class="mapa__fallback">El mapa no cargó. Las obras siguen disponibles en el sitio.</p>');
  });
})();
