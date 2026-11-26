# Lumato — sitio

Landing de una sola página. Cuatro bloques: visión, mapa, qué hago y contacto.

Versión **final**. Sin sección de mensajes: se descartó para mantener
el recorrido reducido a visión, mapa, qué hago y contacto.
Sin build, sin dependencias instaladas, sin costo mensual.

## Archivos

```
index.html              estructura
assets/css/style.css    todo el diseño
assets/js/data.js       ← el único archivo que se edita
assets/js/app.js        tira de fotos, servicios, textos, contacto
assets/js/map.js        mapa, pines y carpeta de fotos
assets/img/             una carpeta por casa (fotos optimizadas)
DATOS-PENDIENTES.md     obras cargadas, dudas de ubicación y cómo sumar casas
DEPLOY.md               paso a paso para GitHub + Vercel
```

## Ver el sitio

Doble clic en `index.html`. Se abre en el navegador y funciona.
Necesita internet solo para las tipografías y el mapa.

Si preferís servidor local:

```
python -m http.server 8137
```

y abrir `http://localhost:8137`.

## Editar

Todo el contenido sale de `assets/js/data.js`: contacto, servicios, obras,
coordenadas y fotos. No hay que tocar HTML ni CSS.

## El mapa

- Cada obra tiene su pin en el centro del barrio.
- Al pasar el cursor por un pin se abre su **carpeta de fotos** con efecto
  de apertura; al salir se cierra. Un clic la deja abierta.
- En el celular la carpeta sube desde abajo.
- *Ver todas* vuelve al encuadre general.
- Las 15 obras salen de las carpetas de fotos (8 originales y 7 del Drive).
  No hay ejemplos inventados.

## Publicar en Vercel

Ver `DEPLOY.md` para el paso a paso con GitHub. Resumen abajo.

**Opción rápida (sin GitHub):**

1. Entrar a vercel.com → *Add New…* → *Project*.
2. Pestaña *Deploy* → arrastrar la carpeta `LUMATO-WEB-FINAL` completa.
3. Deploy. Queda online en un dominio `.vercel.app`.

**Opción con GitHub** (recomendada para actualizar sin reemplazar todo):

1. Crear un repositorio nuevo.
2. Subir el contenido de `LUMATO-WEB-FINAL` (no la carpeta, los archivos).
3. En Vercel: *Import Git Repository*, framework **Other**,
   build command vacío, output directory vacío.
4. Cada cambio en `data.js` se publica solo.

## Dominio

En Vercel → *Settings* → *Domains*. Se agrega `lumato.com.ar` y se
apuntan los DNS del registrador. Antes hay que comprar el dominio.

## Tecnología

- **MapLibre GL** + **OpenFreeMap** (estilo Positron): mapa vectorial,
  sin API key y sin límite de facturación.
- **Inter** desde Google Fonts.
- Sin frameworks, sin npm, sin build.

## Notas

- El mapa se tiñe por código para que coincida con el fondo del sitio.
- Los pines marcan el centro del barrio, no la dirección de la casa.
- Si se cae el mapa, la página sigue funcionando.
- El crédito del pie dice *Diseño y criterio — TALLER.ZZ*.
