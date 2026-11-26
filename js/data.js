/* ============================================================
   LUMATO — datos del estudio y de las obras
   ------------------------------------------------------------
   ÚNICO ARCHIVO QUE HAY QUE EDITAR.

   Las obras salen de las carpetas de fotos. Cada pin del mapa
   abre la carpeta completa de esa casa.

   Para agregar una casa:
     1. Copiar las fotos en assets/img/<nombre-de-la-casa>/
        como 01.jpg, 02.jpg, ...
     2. Agregar una entrada en OBRAS con n, nombre, barrio,
        partido, lat, lng y fotos: fotos("<nombre>", cant).
     3. Guardar y recargar. El mapa se recalcula solo.
   ============================================================ */

const ESTUDIO = {
  estudio: "Lumato",
  arquitecto: "Ricardo Alejandro Zapata",
  base: "Zona Norte, Buenos Aires",

  email: "arqraz@gmail.com",
  whatsapp: "5491148701010",   // 11 4870-1010
  instagram: "arqraz"
};

/* ------------------------------------------------------------
   QUÉ HAGO
   ------------------------------------------------------------ */
const SERVICIOS = [
  { n: "01", titulo: "Anteproyecto", texto: "Terreno, programa y presupuesto. Decidimos qué entra antes de dibujar una pared: orientación, luz y metros posibles." },
  { n: "02", titulo: "Proyecto", texto: "Documentación completa: plantas, cortes, detalles y especificación. Lo que se construye es lo que se aprobó." },
  { n: "03", titulo: "Dirección de obra", texto: "Visitas diarias, control de calidad y decisiones en el momento. El proyecto no se pierde en el camino." },
  { n: "04", titulo: "Gestión", texto: "Permisos, municipio y reglamento del barrio. Los trámites los llevo yo, no el dueño." }
];

/* ------------------------------------------------------------
   FOTOS — una carpeta por obra.
   Se numeran desde 01 y se muestran en orden.
   ------------------------------------------------------------ */
function fotos(slug, cantidad) {
  return Array.from({ length: cantidad }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: "assets/img/" + slug + "/" + n + ".jpg", vista: "Vista " + n };
  });
}

/* ------------------------------------------------------------
   TIRA DEL INICIO — cuatro fotos, { n: obra, i: foto }
   ------------------------------------------------------------ */
const TIRA = [
  { n: 6, i: 0 },
  { n: 7, i: 0 },
  { n: 8, i: 0 },
  { n: 3, i: 0 }
];

/* ------------------------------------------------------------
   OBRAS
   Coordenadas: centro del barrio, nunca la dirección de la casa.
   porConfirmar: ubicación provisoria, a validar con el arquitecto.
   ------------------------------------------------------------ */
const OBRAS = [
  {
    n: 1,
    nombre: "Buquebus",
    barrio: "Puerto Madero",
    partido: "CABA",
    anio: null,
    m2: null,
    lat: -34.6085,
    lng: -58.3650,
    porConfirmar: true,
    fotos: fotos("buquebus", 8)
  },
  {
    n: 2,
    nombre: "Casa Barrancas",
    barrio: "Barrancas de San José",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.44819,
    lng: -58.64811,
    porConfirmar: true,
    fotos: fotos("casa-barrancas", 7)
  },
  {
    n: 3,
    nombre: "Casa El Aromo",
    barrio: "El Aromo",
    partido: "Escobar",
    anio: null,
    m2: null,
    lat: -34.33525,
    lng: -58.84498,
    fotos: fotos("casa-el-aromo", 3)
  },
  {
    n: 4,
    nombre: "Casa Golf 164",
    barrio: "Estancias Golf",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.49121,
    lng: -58.99686,
    fotos: fotos("estancias-golf-164", 7)
  },
  {
    n: 5,
    nombre: "Casa Newman",
    barrio: "Club Newman",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.41094,
    lng: -58.71286,
    fotos: fotos("casa-newman", 5)
  },
  {
    n: 6,
    nombre: "Casa Vitelli",
    barrio: "Pilar Golf Club",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.4372,
    lng: -58.8931,
    porConfirmar: true,
    fotos: fotos("casa-vitelli", 8)
  },
  {
    n: 7,
    nombre: "Casa San Matías",
    barrio: "San Matías",
    partido: "Escobar",
    anio: null,
    m2: null,
    lat: -34.35461,
    lng: -58.75693,
    fotos: fotos("san-matias", 7)
  },
  {
    n: 8,
    nombre: "Casa Golf 166",
    barrio: "Estancias Golf",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.49240,
    lng: -58.99820,
    porConfirmar: true,
    fotos: fotos("estancias-golf-166", 5)
  },
  {
    n: 9,
    nombre: "Casa Golf 164 B",
    barrio: "Estancias Golf",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.49080,
    lng: -58.99750,
    fotos: fotos("golf-164-b", 6)
  },
  {
    n: 10,
    nombre: "Casa Cabildo I",
    barrio: "Calle Cabildo, General Pacheco",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.45260,
    lng: -58.64000,
    fotos: fotos("casa-cabildo-1", 6)
  },
  {
    n: 11,
    nombre: "Casa Cabildo II",
    barrio: "Calle Cabildo, General Pacheco",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.45340,
    lng: -58.64150,
    fotos: fotos("casa-cabildo-2", 5)
  },
  {
    n: 12,
    nombre: "Casa Barrancas B",
    barrio: "Barrancas de San José",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.44819,
    lng: -58.64811,
    fotos: fotos("casa-barrancas-b", 6)
  },
  {
    n: 13,
    nombre: "Casa Barbarita",
    barrio: "Barbarita",
    partido: "Tigre",
    anio: null,
    m2: null,
    lat: -34.42282,
    lng: -58.62387,
    fotos: fotos("casa-barbarita", 8)
  },
  {
    n: 14,
    nombre: "Casa San Eduardo",
    barrio: "San Eduardo, Pilar del Este",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.38649,
    lng: -58.86252,
    fotos: fotos("casa-san-eduardo", 6)
  },
  {
    n: 15,
    nombre: "Casa La Pionera",
    barrio: "La Pionera, Estancias del Pilar",
    partido: "Pilar",
    anio: null,
    m2: null,
    lat: -34.48826,
    lng: -58.98326,
    fotos: fotos("casa-la-pionera", 9)
  }
];

const VISIBLES = OBRAS;
