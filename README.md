# Deck of Many More Things

Aplicación de escritorio para sacar cartas del *Deck of Many More Things*. Proyecto personal, hecho como hobby y para experimentar con herramientas de inteligencia artificial (IA).

La aplicación está disponible en español e inglés. Permite elegir entre el mazo original de 22 cartas, el ampliado de 44 cartas o el mazo completo de 66 cartas, y guardar sesiones con el historial de cartas extraídas.

## Naturaleza del proyecto y propiedad intelectual

Este es un proyecto personal, creado por hobby y para experimentar con IA. **No tiene fines de lucro ni comerciales**: no se cobra por descargarlo o usarlo, y no se ofrece como producto comercial.

Dungeons & Dragons, D&D y *Deck of Many Things*, junto con sus marcas, nombres y materiales asociados, pertenecen a sus respectivos titulares, incluido Wizards of the Coast cuando corresponda. Este proyecto es independiente, no está afiliado, patrocinado ni aprobado por Wizards of the Coast ni por sus empresas relacionadas.

El proyecto puede contener nombres, conceptos u otros materiales asociados con Dungeons & Dragons. Su carácter gratuito y no comercial no significa que esos materiales sean de dominio público ni garantiza por sí solo que su uso o distribución esté autorizado. Si eres titular de derechos y consideras que algún contenido debe modificarse o retirarse, contacta al mantenedor mediante los canales de este repositorio. Esta aclaración no sustituye asesoramiento legal ni concede derechos sobre materiales de terceros.

## Descargar e instalar

Descarga el instalador correspondiente a tu sistema desde [GitHub Releases](../../releases/latest). No descargues instaladores adjuntos a comentarios, mensajes o sitios de terceros.

### Windows

1. Descarga el archivo `.exe` de la última publicación.
2. Ábrelo y sigue los pasos del instalador.
3. Inicia **Deck of Many More Things** desde el menú Inicio.

El instalador puede mostrar una advertencia de Microsoft Defender SmartScreen porque este proyecto personal no tiene firma digital. No la ignores a menos que hayas descargado el archivo desde la sección **Releases** de este repositorio y confíes en su procedencia. Si prefieres no continuar ante esa advertencia, cancela la instalación.

### Linux

Hay dos formatos posibles en la sección **Releases**:

**AppImage**

1. Descarga el archivo `.AppImage`.
2. En una terminal, ve a la carpeta donde lo descargaste y dale permiso de ejecución:

   ```bash
   chmod +x ./*.AppImage
   ```

3. Ejecútalo:

   ```bash
   ./*.AppImage
   ```

Ejecuta los comandos en la carpeta donde descargaste el AppImage (si hay varios, sustituye `./*.AppImage` por el nombre exacto del archivo). También puedes marcarlo como ejecutable desde las propiedades del archivo en tu entorno de escritorio y abrirlo desde allí. En algunas distribuciones, AppImage requiere FUSE.

**Debian y distribuciones compatibles con `.deb`**

1. Descarga el archivo `.deb`.
2. Abre una terminal en la carpeta donde se descargó y ejecuta:

   ```bash
   sudo apt install ./nombre-exacto-del-paquete.deb
   ```

3. Abre la aplicación desde el menú de aplicaciones.

Reemplaza `nombre-exacto-del-paquete.deb` por el nombre del archivo descargado. El gestor de paquetes podría necesitar descargar dependencias del sistema si no están instaladas. Eso ocurre durante la instalación del paquete, no durante el uso normal de la aplicación.

## Uso sin conexión

Una vez instalada, la app carga la interfaz y los datos de las cartas desde los archivos incluidos en el paquete. No necesita conexión a internet para sacar cartas, cambiar de sesión o consultar el historial. La descarga inicial desde GitHub sí requiere internet.

## Sesiones y datos

Las sesiones se guardan localmente en un archivo `data/sessions.json` junto a la aplicación si esa carpeta permite escritura. Si la ubicación de instalación es de solo lectura —algo habitual con paquetes Linux y AppImage— se usa la carpeta de datos de la aplicación del usuario que proporciona el sistema operativo.

El archivo de sesiones no está cifrado. No guardes información personal o sensible en los nombres de sesión. Borrar una sesión desde la aplicación elimina esa sesión y su historial del archivo local.

## Seguridad y transparencia

- Este es un proyecto de hobby y experimentación con IA; se ofrece tal cual, sin garantías ni soporte profesional.
- La versión de escritorio empaquetada usa recursos incluidos localmente. El proceso principal de Electron sirve la aplicación local y expone al frontend únicamente operaciones de lectura y escritura para los datos de las sesiones.
- La app no incluye una función de actualización automática ni ejecuta comandos del sistema como parte de su uso normal.
- El instalador de Windows no está firmado digitalmente. SmartScreen puede advertirlo; verifica siempre que el archivo venga de **GitHub Releases** de este repositorio.
- Como con cualquier programa descargado, no existe una garantía de riesgo cero. Puedes revisar el código fuente de este repositorio y generar el paquete tú mismo si no quieres usar los binarios publicados.

## Generar instaladores desde el código fuente

Para generar instaladores se necesita Node.js (20.19+, 22.12+ o 24+) y npm. La primera instalación de dependencias y la descarga del runtime de Electron pueden requerir internet. Después de generada e instalada la aplicación, no se necesita internet para usarla.

### Windows

En PowerShell, desde la carpeta del proyecto:

```powershell
npm.cmd install
npm.cmd run desktop:package
```

El instalador se crea en `release/`. Ejecútalo para instalar la aplicación.

### Linux

En un equipo Linux, desde la carpeta del proyecto:

```bash
npm install
npm run desktop:package:linux
```

El comando genera los paquetes AppImage y `.deb` en `release/`. Conviene crear los paquetes Linux en Linux; el proyecto no configura compilación cruzada desde Windows para esos formatos.

### Ejecutar durante el desarrollo

```bash
npm install
npm run desktop:dev
```

El modo de desarrollo levanta un servidor local de Angular en la computadora del desarrollador. Esa conexión local solo se utiliza para trabajar en el código y no es necesaria en la aplicación instalada.

## Reutilización del código

Este repositorio no incluye actualmente un archivo de licencia. No se concede permiso explícito para reutilizar o redistribuir el código; consulta al autor antes de hacerlo.
