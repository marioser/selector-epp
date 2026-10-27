# Selector de EPP · Arco eléctrico

Aplicación web de una sola página para seleccionar EPP por arco eléctrico con el método de tablas de NFPA 70E-2024.
Calcula la corriente de cortocircuito, verifica el disparo instantáneo del interruptor y genera un informe PDF.
Funciona sin conexión una vez abierta, y se puede instalar en el celular como app.

Cada evaluación genera un **código QR con todos sus datos**. Al escanearlo con la cámara del celular se abre
la app con la evaluación cargada, sin volver a ingresar nada. La información viaja dentro del QR:
no se guarda en ningún servidor. La etiqueta de 100 × 150 mm con el QR se descarga desde el resultado.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación completa |
| `manifest.webmanifest` | Nombre e ícono de la app al instalarla |
| `sw.js` | Guarda la app en el teléfono para usarla sin señal |
| `icons/` | Íconos de la app |
| `fonts/` | Tipografías Barlow (licencia OFL, ver `OFL-LICENSE.txt`) |
| `vendor/jspdf.umd.min.js` | Librería que genera el PDF (licencia MIT, ver `jspdf-LICENSE.txt`) |
| `vendor/qrcode.js` | Librería que genera el código QR (licencia MIT, incluida en el archivo) |
| `.nojekyll` | Necesario para GitHub Pages |

## Publicar gratis en GitHub Pages

1. Cree una cuenta gratuita en https://github.com (si no la tiene).
2. Cree un repositorio nuevo, por ejemplo `selector-epp`, de tipo **Public**.
3. En el repositorio, pulse **Add file → Upload files** y arrastre **todo el contenido** de esta carpeta
   (incluidas las carpetas `icons`, `fonts` y `vendor`, y el archivo `.nojekyll`). Pulse **Commit changes**.
4. Vaya a **Settings → Pages**. En **Source** elija **Deploy from a branch**, rama **main**, carpeta **/ (root)**, y pulse **Save**.
5. En uno o dos minutos la app queda publicada en: `https://SU-USUARIO.github.io/selector-epp/`

## Otras opciones gratuitas

- **Netlify Drop**: entre a https://app.netlify.com/drop y arrastre la carpeta completa.
- **Cloudflare Pages**: Workers & Pages → Create → Pages → Upload assets, y suba la carpeta.

Cualquiera de las tres sirve. La app necesita HTTPS (todas lo dan) para funcionar sin conexión y poder instalarse.

## Instalar en el celular

- **Android (Chrome)**: abra el enlace y pulse **Instalar** en el encabezado, o menú ⋮ → **Instalar aplicación**.
- **iPhone (Safari)**: abra el enlace, pulse **Compartir** → **Agregar a pantalla de inicio**.

Después de abrirla una vez con internet, funciona sin señal.

## Publicar cambios

1. Reemplace los archivos modificados en el repositorio.
2. En `sw.js`, suba el número de versión (por ejemplo `selector-epp-v3` → `selector-epp-v4`).
   Con internet, la app siempre abre la última versión; sin señal, usa la guardada.

## Aviso

Herramienta de apoyo. Los valores de la Tabla 130.7(C)(15)(a) deben confirmarse contra la edición oficial de NFPA 70E-2024.
No reemplaza la etiqueta del equipo ni la evaluación de una persona calificada.
