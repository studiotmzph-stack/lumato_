# Subir a GitHub y publicar en Vercel

Versión **final**, sin sección de mensajes. Si más adelante querés sumar
capturas de clientes, la sección se puede volver a armar; por ahora no
está incluida en esta entrega.

No hice commit ni push. Los archivos están en:

```
C:\Users\zapat\Desktop\LUMATO-WEB-FINAL
```

El sitio es estático: no hay build, no hay npm, no hay variables de entorno.

---

## 1. Crear el repositorio en GitHub

1. Entrar a github.com → **New repository**.
2. Nombre sugerido: `lumato-web-final`.
3. Dejarlo **vacío**: sin README, sin `.gitignore`, sin licencia.
4. Copiar la URL que aparece (`https://github.com/TU-USUARIO/lumato-web-final.git`).

---

## 2. Subir los archivos

Git no está en el PATH de esta máquina. En PowerShell 5.1, pegar línea
por línea (no usar `&&`):

```powershell
$git = "C:\Users\zapat\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"
Set-Location "C:\Users\zapat\Desktop\LUMATO-WEB-FINAL"
& $git init
& $git add .
& $git commit -m "Lumato landing"
& $git remote add origin https://github.com/TU-USUARIO/lumato-web-final.git
& $git branch -M main
& $git push -u origin main
```

Si ya existe un repo y solo querés actualizar, saltá a `add`, `commit` y
`push`.

---

## 3. Conectar Vercel

1. Entrar a vercel.com → **Add New…** → **Project**.
2. **Import Git Repository** → elegir `lumato-web-final`.
3. Configuración:
   - Framework Preset: **Other**
   - Build Command: **vacío**
   - Output Directory: **vacío**
   - Root Directory: **`./`**
   - Install Command: **vacío**
4. **Deploy**. Queda online en `https://lumato-web-final-....vercel.app`.

Ya incluí un `vercel.json` mínimo, así que no hace falta agregar nada.

---

## 4. Dominio propio

En Vercel → **Settings** → **Domains** → agregar `lumato.com.ar`.
Después, en el registrador del dominio, cargar los DNS que indicó Vercel
(tipo A y CNAME).

---

## 5. Actualizar el sitio

Todo el contenido vivo está en `assets/js/data.js`:

- obras y coordenadas → `OBRAS`
- fotos de cada casa → carpeta en `assets/img/`
- services y contacto → `SERVICIOS` y `ESTUDIO`

Después de editar:

```powershell
& $git add .
& $git commit -m "Actualizar contenidos"
& $git push
```

Vercel vuelve a publicar solo, en unos segundos.

---

## 6. Alternativa sin GitHub

Arrastrar la carpeta `LUMATO-WEB-FINAL` completa a la pestaña **Deploy** de
Vercel. Sirve para probar, pero para actualizar hay que volver a subir
todo.

---

## Chequeo rápido antes de publicar

- [ ] `assets/img/retrato-hero.jpg` presente
- [ ] Las 8 carpetas de obras presentes
- [ ] Mail y WhatsApp correctos en `data.js`
- [ ] Las ubicaciones marcadas `porConfirmar` ya confirmadas
- [ ] El formulario apunta al mail deseado
