# Lumato — estado y pendientes

Sitio: `C:\Users\zapat\Desktop\LUMATO-WEB-SIN-MENSAJES\`
Versión sin sección de mensajes.
Bloques: visión · mapa · qué hago · contacto.

---

## 1. Obras cargadas (15)

Salen de las carpetas que estaban en:
`OneDrive\Desktop\Marca personal\Cont. Visual-02\AA-Taller-ZZ\biblioteca\ARQ_ZAPATA\OBRAS`

Las fotos se copiaron optimizadas a `assets/img/`, 1600 px de ancho, JPG
progresivo. Las nuevas vinieron del Drive compartido (`obras`).
Total: **96 fotos**. (Se quitó la vista 07 repetida de San Matías.)

| Pin | Obra | Barrio | Partido | Fotos | Ubicación |
|---|---|---|---|---|---|
| 01 | Buquebus | Puerto Madero | CABA | 8 | **Por confirmar** |
| 02 | Casa Barrancas | Barrancas de San José | Tigre | 7 | **Por confirmar** |
| 03 | Casa El Aromo | El Aromo, Loma Verde | Escobar | 3 | Confirmada |
| 04 | Casa Golf 164 | Estancias Golf | Pilar | 7 | Confirmada |
| 05 | Casa Newman | Club Newman, Benavídez | Tigre | 5 | Confirmada |
| 06 | Casa Vitelli | Pilar Golf Club | Pilar | 8 | **Por confirmar** |
| 07 | Casa San Matías | San Matías | Escobar | 7 | Confirmada |
| 08 | Casa Golf 166 | Estancias Golf | Pilar | 5 | **Por confirmar** |
| 09 | Casa Golf 164 B | Estancias Golf | Pilar | 6 | Nueva, desde Drive |
| 10 | Casa Cabildo I | Calle Cabildo, Gral. Pacheco | Tigre | 6 | Nueva, desde Drive |
| 11 | Casa Cabildo II | Calle Cabildo, Gral. Pacheco | Tigre | 5 | Nueva, desde Drive |
| 12 | Casa Barrancas B | Barrancas de San José | Tigre | 6 | Nueva, desde Drive |
| 13 | Casa Barbarita | Barbarita | Tigre | 8 | Nueva, desde Drive |
| 14 | Casa San Eduardo | San Eduardo, Pilar del Este | Pilar | 6 | Nueva, desde Drive |
| 15 | Casa La Pionera | La Pionera, Estancias del Pilar | Pilar | 9 | Nueva, desde Drive |

Las ubicaciones dudosas están marcadas con `porConfirmar: true` en
`data.js`. Están puestas en el punto más probable para que el mapa se vea
completo, pero hay que validarlas.

---

## 2. Lo que necesito que confirmes

**Buquebus.** Las fotos son del interior de una terminal de Buquebus en
Puerto Madero, no de una casa. ¿Es una obra comercial, o el nombre viene
del cliente y la casa está en algún country? Si es comercial, ¿sale en el
mismo mapa o va aparte?

**Casa Barrancas.** Puse *Barrancas de San José*, en General Pacheco,
Tigre. ¿Es esa, o *Barrancas de Santa María*, *Barrancas del Lago*
(Nordelta) u otra?

**Casa Vitelli.** Puse *Pilar Golf Club* porque en las fotos se ve una
cancha de golf al fondo. ¿Es Pilar Golf, Estancias Golf, Newman u otro?

**Casa Golf 166 y Casa Golf 164.** Las dos carpetas dicen "estancias
golf" con números distintos (164 y 166). ¿Son dos casas dentro de
Estancias Golf o el número es otra cosa?

Con las cuatro respuestas ajusto las coordenadas en dos minutos.

---

## 3. Retrato del arquitecto — cargado

El retrato estaba en `OneDrive\Imagens\2026\2026-11-24\_RAZ9638.JPG`
(girado y oscuro). Se corrigió la orientación, se aclaró y se pasó a blanco
y negro. Quedaron tres archivos:

```
assets/img/retrato.jpg        ? retrato 4:5, 1186 × 1500
assets/img/retrato-hero.jpg   ? escritorio, 2400 × 1300
assets/img/retrato-movil.jpg  ? celular, 900 × 1300
```

En ambos tamaños la foto está al **100% de opacidad**, sin degradados ni
máscaras. La diferencia es solo de composición: en escritorio el retrato va
a la derecha y en celular va abajo, dejando siempre limpio el sector del
texto. No hay `opacity` ni `mask-image` aplicados a `.vision__bg`.

---

## 4. Contacto

| Dato | Valor cargado |
|---|---|
| Mail | `arcraz@gmail.com` (como lo escribiste; antes era `arqraz@gmail.com`) |
| WhatsApp | `5491148701010` → 11 4870-1010 |
| Instagram | `@arqraz` |

El formulario **no tiene backend**: al apretar *Escribir* se abre el mail
con el mensaje ya armado. Si querés que el formulario envíe solo, hay que
sumar un servicio (Formspree, Netlify Forms o similar).

---

## 5. Cómo se ve el mapa

- Un pin por obra, en el centro del barrio, nunca en la dirección de la casa.
- Al **pasar el cursor** se abre una carpeta con todas las fotos de esa
  casa, en columnas, con efecto de apertura escalonada. Al salir, se cierra.
- Un **clic** deja la carpeta abierta. *Ver todas* vuelve al encuadre general.
- En el celular la carpeta sube desde abajo.
- El mapa es el bloque principal, con márgenes laterales y altura reducida. La rueda del mouse no lo hace zoom: así la página se puede recorrer sin quedar trabada.

---

## 6. Cómo sumar una casa

1. Crear `assets/img/<nombre>/` con `01.jpg`, `02.jpg`, ...
2. Agregar una entrada en `OBRAS` en `assets/js/data.js`:

```js
{
  n: 9,
  nombre: "Casa Nueva",
  barrio: "Nordelta",
  partido: "Tigre",
  anio: null,
  m2: null,
  lat: -34.4083,
  lng: -58.6417,
  fotos: fotos("casa-nueva", 6)
}
```

3. Guardar y recargar. El pin, el contador y la carpeta se arman solos.

La tira del inicio es un **carrusel automático**: toma las dos primeras
fotos de cada obra, duplica la secuencia para que el loop no corte y se
desliza solo, sin intervención. El orden sale de `OBRAS`. Si querés cambiar
la velocidad, editá `animation:stripSlide 70s linear infinite` en
`assets/css/style.css`.

---

## 7. Textos a revisar

- **"Casas que se terminan cuando entra la luz."** Frase central.
- **"Proyecto y dirijo"** — confirmar que hace las dos cosas.
- **Marca:** hoy dice *Lumato*. Si el nombre para la landing es
  *Arc Zapata*, se cambia en un solo lugar.

---

## 8. Legal

- El mapa marca el centro del barrio, nunca la dirección exacta.
- Fotos de interiores con objetos personales: conviene un permiso simple.
- No hay base de datos: el formulario solo arma un mail.

---

## 9. Publicar

Ver `README.md`. Se arrastra la carpeta a Vercel, sin build.
