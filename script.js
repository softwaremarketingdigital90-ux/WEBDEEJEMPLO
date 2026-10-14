/* ============================================================
   CONFIGURACIÓN: cambia estos datos para cada cliente
   ============================================================ */
const CONFIG = {
  restaurante: "Cevichería Marea",
  // WhatsApp del restaurante: código de país + número, sin "+" ni espacios
  whatsapp: "593963615550",
  // Tu WhatsApp, para el botón "Quiero una página así" de la barra demo
  whatsappContacto: "593963615550",
  mensajeContacto: "Hola, vi la página de ejemplo para restaurantes y quiero una para mi negocio.",
  zonaHoraria: "America/Guayaquil",
  // Domicilio: costo fijo, y monto desde el cual el envío es gratis (0 = nunca gratis)
  envio: { costo: 1.5, gratisDesde: 20, tiempo: "25 a 35 min" },
  // Redes sociales: deja "" para ocultar una
  redes: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/"
  },
  // Horario por día de la semana (0 = domingo). null = cerrado. Formato 24 h.
  horario: {
    0: [11, 18],
    1: null,
    2: [11, 20],
    3: [11, 20],
    4: [11, 20],
    5: [11, 22],
    6: [11, 22]
  }
};

/* ============================================================
   CARTA: edita platos y precios aquí
   cat:  combos | ceviches | fuertes | entradas | bebidas
   fav:  true = aparece en "Los favoritos" del inicio
   tags: top (Más pedido) | picante | nuevo
   antes: precio sin descuento (solo combos): calcula "Ahorras $X"
   Foto real: guarda img/<id>.jpg y reemplaza a la ilustración
   ============================================================ */
const CATEGORIAS = {
  todo: "Todo",
  combos: "Combos",
  ceviches: "Ceviches",
  fuertes: "Platos fuertes",
  entradas: "Entradas",
  bebidas: "Bebidas y postres"
};

const MENU = [
  { id: "k1", cat: "combos", name: "Combo Marea para 2", desc: "Ceviche de camarón, ceviche mixto y dos limonadas de la casa.", price: 19, antes: 25.5, tags: ["top"], combo: true },
  { id: "k2", cat: "combos", name: "Almuerzo Marea", desc: "Encebollado, chifles con ají y una limonada. Rápido y completo.", price: 8.5, antes: 11.5, combo: true },
  { id: "k3", cat: "combos", name: "Combo familiar (4 personas)", desc: "2 ceviches mixtos, 2 corvinas fritas, 4 limonadas y chifles.", price: 46, antes: 59, combo: true },
  { id: "c1", cat: "ceviches", name: "Ceviche de camarón", desc: "Camarón fresco, limón, cebolla morada y cilantro. Con chifles.", price: 9.5, fav: true, tags: ["top"] },
  { id: "c2", cat: "ceviches", name: "Ceviche mixto Marea", desc: "Camarón, pescado y concha negra. Nuestro plato más pedido.", price: 11, fav: true, tags: ["top"] },
  { id: "c3", cat: "ceviches", name: "Ceviche de concha", desc: "Concha negra, tomate y el ají de la casa.", price: 10, tags: ["picante"] },
  { id: "c4", cat: "ceviches", name: "Ceviche de pescado", desc: "Corvina en cubos, limón sutil y cebolla encurtida.", price: 8.5 },
  { id: "f1", cat: "fuertes", name: "Encebollado", desc: "Albacora, yuca y cebolla encurtida. El caldo que cura todo.", price: 6, fav: true },
  { id: "f2", cat: "fuertes", name: "Arroz con camarón", desc: "Arroz al sofrito con camarones y ensalada fresca.", price: 10.5 },
  { id: "f3", cat: "fuertes", name: "Corvina frita", desc: "Entera, con patacones, arroz y ensalada.", price: 12, fav: true },
  { id: "f4", cat: "fuertes", name: "Pulpo al ajillo", desc: "Pulpo salteado con ajo, aceite de oliva y papas.", price: 13, tags: ["nuevo"] },
  { id: "e1", cat: "entradas", name: "Chifles con ají", desc: "Plátano verde en láminas, recién fritos.", price: 3, tags: ["picante"] },
  { id: "e2", cat: "entradas", name: "Empanadas de camarón", desc: "Tres empanadas con salsa de ají.", price: 5.5 },
  { id: "e3", cat: "entradas", name: "Bolitas de verde", desc: "Rellenas de queso, con ají criollo.", price: 4.5 },
  { id: "b1", cat: "bebidas", name: "Limonada de la casa", desc: "Limón sutil, hierbaluisa y hielo.", price: 2.5 },
  { id: "b2", cat: "bebidas", name: "Jugo de maracuyá", desc: "Natural, sin azúcar añadida.", price: 2.75 },
  { id: "b3", cat: "bebidas", name: "Tres leches de coco", desc: "Bizcocho esponjoso con crema de coco.", price: 4 }
];

/* ============================================================
   Utilidades
   ============================================================ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toFixed(2);
const waLink = (numero, texto) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
const arte = p => (window.ARTE && (ARTE[p.id] || (p.combo && ARTE.combo) || ARTE.cat[p.cat])) || "";
const ETIQUETAS = { top: "Más pedido", picante: "Picante", nuevo: "Nuevo" };

/* ============================================================
   Fotos opcionales: cualquier elemento con data-foto="img/x.jpg"
   usa la foto si el archivo existe; si no, queda la ilustración.
   ============================================================ */
function activarFotos(scope = document) {
  return Promise.all($$("[data-foto]", scope).map(el => el._foto || (el._foto = new Promise(ok => {
    const im = new Image();
    im.onload = () => { el.style.setProperty("--foto", `url("${el.dataset.foto}")`); el.classList.add("con-foto"); ok(true); };
    im.onerror = () => ok(false);
    im.src = el.dataset.foto;
  }))));
}

/* ============================================================
   Menú móvil
   ============================================================ */
const toggle = $(".menu-toggle");
const nav = $("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", abierto);
  });
}

/* ============================================================
   Enlaces de WhatsApp: <a data-wa="mensaje"> y <a data-wa-contacto>
   ============================================================ */
$$("[data-wa]").forEach(a => {
  a.href = waLink(CONFIG.whatsapp, a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});
$$("[data-wa-contacto]").forEach(a => {
  a.href = waLink(CONFIG.whatsappContacto, CONFIG.mensajeContacto);
  a.target = "_blank";
  a.rel = "noopener";
});
$$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

/* ============================================================
   Redes sociales (pie de página)
   ============================================================ */
const ICONOS_RED = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500c0-.3.2-.5.5-.5z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.500a3.500 3.500 0 1 1-3.500-3.500"/><path d="M14 3c.5 3 2.500 5 5.500 5.200"/></svg>'
};
$$("[data-redes]").forEach(box => {
  box.innerHTML = Object.entries(CONFIG.redes).filter(([, url]) => url)
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)}">${ICONOS_RED[k]}</a>`).join("");
});

/* ============================================================
   Datos de domicilio (inicio)
   ============================================================ */
const pe = $("#perk-envio"), pg = $("#perk-gratis"), pt = $("#perk-tiempo");
if (pe) pe.textContent = money(CONFIG.envio.costo);
if (pg) pg.textContent = CONFIG.envio.gratisDesde ? `Envío gratis desde ${money(CONFIG.envio.gratisDesde)}` : "Domicilio a tu puerta";
if (pt) pt.textContent = CONFIG.envio.tiempo;

/* ============================================================
   Abierto ahora / Cerrado
   ============================================================ */
function ahoraEnZona() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.zonaHoraria, weekday: "short", hour: "numeric", minute: "numeric", hour12: false
  }).formatToParts(new Date());
  const get = t => partes.find(p => p.type === t).value;
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dia: dias[get("weekday")], hora: parseInt(get("hour"), 10) % 24 + parseInt(get("minute"), 10) / 60 };
}
const hh = h => String(h).padStart(2, "0") + ":00";

function estadoLocal() {
  const { dia, hora } = ahoraEnZona();
  const hoy = CONFIG.horario[dia];
  if (hoy && hora >= hoy[0] && hora < hoy[1]) return { abierto: true, texto: "Abierto ahora", detalle: "Cerramos a las " + hh(hoy[1]), dia };
  for (let i = 0; i < 7; i++) {
    const d = (dia + i) % 7;
    const h = CONFIG.horario[d];
    if (h && (i > 0 || hora < h[0])) {
      const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][d];
      return { abierto: false, texto: "Cerrado ahora", detalle: `Abrimos ${cuando} a las ${hh(h[0])}`, dia };
    }
  }
  return { abierto: false, texto: "Cerrado", detalle: "", dia };
}

const estado = estadoLocal();
$$(".open-pill").forEach(p => {
  p.classList.add(estado.abierto ? "is-open" : "is-closed");
  p.innerHTML = `<i></i><span><b>${estado.texto}</b> <small>${estado.detalle}</small></span>`;
});
const filaHoy = $(`.hours tr[data-dia="${estado.dia}"]`);
if (filaHoy) filaHoy.classList.add("today");

/* ============================================================
   Tarjetas de platos (inicio y carta)
   ============================================================ */
function etiquetas(p) {
  const t = (p.tags || []).map(k => `<span class="tag tag-${k}">${ETIQUETAS[k]}</span>`);
  if (p.antes) t.unshift(`<span class="tag tag-ahorro">Ahorras ${money(p.antes - p.price)}</span>`);
  return t.length ? `<div class="tags">${t.join("")}</div>` : "";
}

function tarjeta(p, conCarrito) {
  const accion = conCarrito
    ? `<div class="act" data-act="${p.id}"></div>`
    : `<a class="add" href="carta.html${p.cat === "combos" ? "#combos" : ""}">Pedir</a>`;
  const precio = (p.antes ? `<s>${money(p.antes)}</s>` : "") + money(p.price);
  return `<article class="dish${p.combo ? " is-combo" : ""}" data-cat="${p.cat}" data-name="${(p.name + " " + p.desc).toLowerCase()}">
    <div class="dish-art cat-${p.cat}" data-foto="img/${p.id}.jpg">${arte(p)}${etiquetas(p)}</div>
    <div class="dish-body">
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="dish-foot"><span class="price">${precio}</span>${accion}</div>
    </div></article>`;
}

const favs = $("#favoritos");
if (favs) favs.innerHTML = MENU.filter(p => p.fav).slice(0, 4).map(p => tarjeta(p, false)).join("");
const combosHome = $("#combos-home");
if (combosHome) combosHome.innerHTML = MENU.filter(p => p.cat === "combos").map(p => tarjeta(p, false)).join("");

/* ============================================================
   Carta con filtros, búsqueda y pedido por WhatsApp
   ============================================================ */
const grid = $("#carta-grid");
if (grid) {
  grid.innerHTML = MENU.map(p => tarjeta(p, true)).join("");

  // Filtros
  const chips = $("#chips");
  chips.innerHTML = Object.entries(CATEGORIAS)
    .map(([k, v], i) => `<button class="chip${i === 0 ? " is-active" : ""}" data-filter="${k}">${v}</button>`).join("");
  let filtro = "todo", texto = "";
  const aplicar = () => {
    let visibles = 0;
    $$(".dish", grid).forEach(d => {
      const ok = (filtro === "todo" || d.dataset.cat === filtro) && d.dataset.name.includes(texto);
      d.hidden = !ok;
      if (ok) visibles++;
    });
    $("#empty").classList.toggle("show", visibles === 0);
  };
  const elegir = k => {
    filtro = k;
    $$(".chip", chips).forEach(x => x.classList.toggle("is-active", x.dataset.filter === k));
    aplicar();
  };
  chips.addEventListener("click", e => {
    const c = e.target.closest(".chip");
    if (c) elegir(c.dataset.filter);
  });
  $("#buscar").addEventListener("input", e => { texto = e.target.value.trim().toLowerCase(); aplicar(); });
  const desdeEnlace = location.hash.slice(1);
  if (CATEGORIAS[desdeEnlace] && desdeEnlace !== "todo") {
    elegir(desdeEnlace);
    setTimeout(() => $("#carta").scrollIntoView(), 50);
  }

  // Carrito
  let carrito = {};
  try { carrito = JSON.parse(localStorage.getItem("marea-carrito")) || {}; } catch (_) {}
  const guardar = () => { try { localStorage.setItem("marea-carrito", JSON.stringify(carrito)); } catch (_) {} };

  const form = $("#order-form");
  try { form.nombre.value = localStorage.getItem("marea-nombre") || ""; } catch (_) {}

  const drawer = $("#drawer"), overlay = $("#overlay"), cartbar = $("#cartbar");
  const abrir = () => { drawer.classList.add("show"); overlay.classList.add("show"); drawer.setAttribute("aria-hidden", "false"); $("#close-cart").focus(); };
  const cerrar = () => { drawer.classList.remove("show"); overlay.classList.remove("show"); drawer.setAttribute("aria-hidden", "true"); };
  $("#open-cart").addEventListener("click", abrir);
  $("#close-cart").addEventListener("click", cerrar);
  overlay.addEventListener("click", cerrar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

  const costoEnvio = sub => {
    if (form.tipo.value !== "Domicilio" || sub <= 0) return 0;
    const g = CONFIG.envio.gratisDesde;
    return g && sub >= g ? 0 : CONFIG.envio.costo;
  };

  function pintar(animar) {
    const ids = Object.keys(carrito).filter(id => carrito[id] > 0 && MENU.some(p => p.id === id));
    const cantidad = ids.reduce((s, id) => s + carrito[id], 0);
    const sub = ids.reduce((s, id) => s + carrito[id] * MENU.find(p => p.id === id).price, 0);
    const envio = costoEnvio(sub);
    const domicilio = form.tipo.value === "Domicilio";

    cartbar.hidden = cantidad === 0;
    document.body.classList.toggle("has-cart", cantidad > 0);
    $("#cart-count").textContent = cantidad;
    $("#cart-total").textContent = money(sub);
    $("#cart-sub").textContent = money(sub);
    $("#cart-total-big").textContent = money(sub + envio);
    $("#row-envio").hidden = !domicilio;
    $("#cart-envio").textContent = envio ? money(envio) : "Gratis";
    $("#dir-wrap").hidden = !domicilio;

    // Barra de envío gratis
    const meta = CONFIG.envio.gratisDesde, nota = $("#envio-nota");
    nota.hidden = !(domicilio && meta && sub > 0);
    if (!nota.hidden) {
      const falta = meta - sub;
      $("#envio-texto").textContent = falta > 0 ? `Agrega ${money(falta)} más y el envío es gratis` : "Tu envío es gratis";
      $("#envio-barra").style.width = Math.min(100, sub / meta * 100) + "%";
    }

    $("#cart-lines").innerHTML = ids.length
      ? ids.map(id => {
          const p = MENU.find(x => x.id === id);
          return `<li class="line"><strong>${p.name}</strong><span class="sub">${money(p.price * carrito[id])}</span>
            <span class="qty"><button type="button" data-menos="${id}" aria-label="Quitar uno">−</button><span>${carrito[id]}</span><button type="button" data-mas="${id}" aria-label="Agregar uno">+</button></span></li>`;
        }).join("")
      : '<li class="cart-empty">Aún no agregaste platos.</li>';
    $("#send-order").disabled = ids.length === 0;

    // Botón "Agregar" o selector de cantidad en cada tarjeta
    $$("[data-act]", grid).forEach(box => {
      const id = box.dataset.act, q = carrito[id] || 0;
      box.innerHTML = q > 0
        ? `<div class="stepper"><button type="button" data-menos="${id}" aria-label="Quitar uno">−</button><b>${q}</b><button type="button" data-mas="${id}" aria-label="Agregar uno">+</button></div>`
        : `<button type="button" class="add" data-add="${id}">Agregar</button>`;
    });
    if (animar) { const c = $("#cart-count"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
    guardar();
    if (ids.length === 0) cerrar();
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]"), mas = e.target.closest("[data-mas]"), menos = e.target.closest("[data-menos]");
    if (a) carrito[a.dataset.add] = (carrito[a.dataset.add] || 0) + 1;
    else if (mas) carrito[mas.dataset.mas] = (carrito[mas.dataset.mas] || 0) + 1;
    else if (menos) carrito[menos.dataset.menos] = Math.max(0, (carrito[menos.dataset.menos] || 0) - 1);
    else return;
    pintar(true);
  });
  form.tipo.addEventListener("change", () => pintar(false));

  // Enviar pedido por WhatsApp
  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#order-error"), domicilio = form.tipo.value === "Domicilio";
    const ids = Object.keys(carrito).filter(id => carrito[id] > 0);
    if (!form.nombre.value.trim()) { err.textContent = "Escribe tu nombre para enviar el pedido."; err.hidden = false; return; }
    if (domicilio && !form.direccion.value.trim()) { err.textContent = "Escribe la dirección de entrega."; err.hidden = false; return; }
    err.hidden = true;
    try { localStorage.setItem("marea-nombre", form.nombre.value.trim()); } catch (_) {}
    let sub = 0;
    const lineas = ids.map(id => {
      const p = MENU.find(x => x.id === id);
      sub += p.price * carrito[id];
      return `• ${carrito[id]} x ${p.name} (${money(p.price * carrito[id])})`;
    });
    const envio = costoEnvio(sub);
    const msg = `Hola, quiero hacer un pedido en ${CONFIG.restaurante}:\n\n${lineas.join("\n")}\n\nSubtotal: ${money(sub)}` +
      (domicilio ? `\nEnvío: ${envio ? money(envio) : "Gratis"}` : "") +
      `\nTotal: ${money(sub + envio)}\nNombre: ${form.nombre.value.trim()}\nTipo: ${form.tipo.value}` +
      (domicilio ? `\nDirección: ${form.direccion.value.trim()}` : "") +
      (form.notas.value.trim() ? `\nNotas: ${form.notas.value.trim()}` : "");
    window.open(waLink(CONFIG.whatsapp, msg), "_blank", "noopener");
  });

  pintar(false);
}

/* ============================================================
   Reserva por WhatsApp
   ============================================================ */
const reserva = $("#reserva-form");
if (reserva) {
  const hoy = new Date().toISOString().split("T")[0];
  reserva.fecha.min = hoy;
  reserva.addEventListener("submit", e => {
    e.preventDefault();
    const f = reserva, err = $("#form-error");
    if (!f.nombre.value.trim() || !f.fecha.value || !f.hora.value || !f.personas.value) {
      err.textContent = "Completa nombre, fecha, hora y personas para enviar la reserva.";
      err.hidden = false; return;
    }
    if (f.fecha.value < hoy) { err.textContent = "Elige una fecha de hoy en adelante."; err.hidden = false; return; }
    err.hidden = true;
    const [a, m, d] = f.fecha.value.split("-");
    const msg = `Hola, quiero reservar en ${CONFIG.restaurante}.\nNombre: ${f.nombre.value.trim()}\nFecha: ${d}/${m}/${a}\nHora: ${f.hora.value}\nPersonas: ${f.personas.value}` +
      (f.notas.value.trim() ? `\nNotas: ${f.notas.value.trim()}` : "");
    window.open(waLink(CONFIG.whatsapp, msg), "_blank", "noopener");
  });
}

/* ============================================================
   Fotos (al final, cuando ya existen las tarjetas)
   ============================================================ */
activarFotos();
const galeria = $("[data-galeria]");
if (galeria) activarFotos(galeria).then(r => { galeria.hidden = !r.some(Boolean); });
