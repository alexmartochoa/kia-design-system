# Kia — Sizing (tokens y criterio de diseño)

- **Archivo de Figma:** FoundatiosKia (`FCrL9DSEDaT0EgGg5y3aJ5`)
- **Página:** Sizing (frame «Sizing — Kia App»)
- **Fecha de lectura:** 2026-10-26
- **Fuente de verdad de los valores:** las variables de Figma (colecciones `size` y `platform`). Las tablas de la página se verificaron contra ellas.

---

## 1. Documentación de la página

### Encabezado — SIZING

> Los tamaños de iconos, botones, campos y barras salen de una escala fija de tokens. Todo lo que se toca respeta el área táctil mínima de su plataforma: 44 px en iOS, 48 px en Android y 40 px en web.

> Los tokens viven en dos colecciones de Figma: size (escala base, con modos default y expanded) y platform (valores por sistema, con modos iOS, Android y web).

### 01 Iconos

> Los iconos vienen en 6 pasos fijos. El de 24 px es el estándar; los demás son para casos puntuales y el de 8 px solo para indicadores.

Escala visual (etiquetas de la página): 2xs · 8 px / xs · 12 px / sm · 16 px / md · estándar · 24 px / lg · 32 px / xl · 40 px.

| Nombre | Token | Medida (px) | Uso principal |
|---|---|---|---|
| 2xs | size/icon/2xs | 8 | Indicadores (badges, puntos de estado) |
| xs | size/icon/xs | 12 | Muy chico, junto a texto pequeño |
| sm | size/icon/sm | 16 | Inline en texto y controles sm |
| md | size/icon/md | 24 | Estándar |
| lg | size/icon/lg | 32 | Grande |
| xl | size/icon/xl | 40 | Destacados |

### 02 Botones y campos

> La altura de botones y campos sale de la escala y cambia con la densidad: en modo expanded sm, md y el campo md suben 4 px. El área táctil no es la caja del control: lo que falta para llegar a la mínima lo pone hitSlop.

Muestras visuales: «Modo default» y «Modo expanded», con control xs (Tag), control sm / md / lg (Botón) y field md / lg (Campo), cada uno rotulado con su token.

| Elemento | Token | Default (px) | Expanded (px) | Uso |
|---|---|---|---|---|
| control xs | size/control/height/xs | 24 | 24 | Chips y tags |
| control sm | size/control/height/sm | 32 | 36 | Botón chico |
| control md | size/control/height/md | 44 | 48 | Botón estándar |
| control lg | size/control/height/lg | 56 | 56 | Botón grande |
| field md | size/field/height/md | 44 | 48 | Campo estándar |
| field lg | size/field/height/lg | 56 | 56 | Campo grande |
| ancho mínimo | size/control/min-width | 64 | 64 | Ancho mínimo de botón |

**hitSlop necesario**

> hitSlop = (área mínima de la plataforma − altura del control) ÷ 2 por lado. Ejemplo: un control sm de 32 px en Android necesita 8 px de hitSlop arriba y abajo para llegar a 48.

Ejemplos de la página (control sm, botón de 32 px):
- iOS · 44 px → hitSlop 6 px por lado
- Android · 48 px → hitSlop 8 px por lado
- web · 40 px → hitSlop 4 px por lado

### 03 Barras de progreso

> Tres grosores; el de 8 px es el estándar.

| Nombre | Token | Altura (px) | Uso |
|---|---|---|---|
| sm | size/bar/height/sm | 4 | Barra fina |
| md | size/bar/height/md | 8 | Barra estándar |
| lg | size/bar/height/lg | 12 | Barra gruesa |

### 04 Área táctil y valores por plataforma

> size/target/min (48 px) es el valor de diseño, el más exigente. En código se usa platform/size/target/min, que toma el mínimo que pide cada sistema.

Área mínima por plataforma (visual): iOS 44 px · Android 48 px · web 40 px.

| Token | iOS (px) | Android (px) | Web (px) |
|---|---|---|---|
| platform/size/target/min | 44 | 48 | 40 |
| platform/size/field/height | 52 | 56 | 56 |

> platform/size/field/height es la altura de la fila completa de un campo, no de la caja de texto.

### 05 Buenas prácticas

> Usa siempre el token de la escala y nunca un valor suelto: así iconos, controles y áreas táctiles quedan parejos en toda la app.

**Do**
- Todo lo que se toca tiene al menos el área mínima de su plataforma (44 · 48 · 40).
- Iconos en 24 salvo que haya una razón.
- Botón y campo alineados en la misma altura.
- En xs, sm y enlaces sueltos, suma hitSlop.

**Don't**
- Áreas táctiles más chicas que la mínima de la plataforma.
- Iconos a tamaños fuera de la escala.
- Mezclar alturas distintas en una misma fila.
- Dar el área por buena porque el control se ve grande: xs mide 24 y el enlace se ajusta al texto.

### 06 Referencia de tokens y exportación a Figma

> Los tokens se entregan en dos formatos dentro de sizing-tokens.zip; los dos tienen los mismos valores que las tablas de arriba. En este archivo ya están creados como variables en las colecciones size y platform.

| Colección | Modos | Archivos (import nativo) | Tokens |
|---|---|---|---|
| size | default · expanded | size.default.tokens.json, size.expanded.tokens.json | icon (6), control/height (4), control/min-width, field/height (2), bar/height (3), target/min |
| platform | iOS · Android · web | platform.ios / .android / .web.tokens.json | target/min, field/height |

**Import nativo de Figma (variables)**
> 1. Crea la colección size con los modos default y expanded.
> 2. En el panel de variables, importa cada archivo de figma-native/ en su modo correspondiente.
> 3. Repite con la colección platform y sus modos iOS, Android y web.

**Tokens Studio**
> Importa sizing.tokens-studio.json como un solo archivo. Trae los sets y los temas (grupos size y platform) listos para exportar a variables de Figma.

> Los archivos usan el formato W3C Design Tokens (DTCG), así que también sirven para Style Dictionary si después se generan tokens para iOS, Android y web.

**Decisiones tomadas / pendientes:** la página no declara decisiones pendientes ni «próximos pasos» explícitos.

---

## 2. Índice de tokens

Todas las variables son de tipo `FLOAT`, con scope `WIDTH_HEIGHT`. **Ninguna es alias**: los valores son literales (no apuntan a primitivos ni a otro token). Las colecciones `Spacing Primitives` y `Radius Primitives` no intervienen en Sizing.

### Colección `size` — modos: default · expanded — 17 variables

| Token | Default | Expanded | Descripción (Figma) |
|---|---|---|---|
| size/icon/2xs | 8 | 8 | Icono mínimo, indicadores |
| size/icon/xs | 12 | 12 | Icono muy chico |
| size/icon/sm | 16 | 16 | Icono inline en texto y controles sm |
| size/icon/md | 24 | 24 | Icono estándar |
| size/icon/lg | 32 | 32 | Icono grande |
| size/icon/xl | 40 | 40 | Icono destacados |
| size/control/height/xs | 24 | 24 | Control mínimo, chips y tags |
| size/control/height/sm | 32 | **36** | Botón chico |
| size/control/height/md | 44 | **48** | Botón estándar |
| size/control/height/lg | 56 | 56 | Botón grande |
| size/control/min-width | 64 | 64 | Ancho mínimo de botón |
| size/field/height/md | 44 | **48** | Campo estándar |
| size/field/height/lg | 56 | 56 | Campo grande |
| size/bar/height/sm | 4 | 4 | Barra de progreso fina |
| size/bar/height/md | 8 | 8 | Barra de progreso estándar |
| size/bar/height/lg | 12 | 12 | Barra de progreso gruesa |
| size/target/min | 48 | 48 | Área táctil mínima (valor de diseño) |

### Colección `platform` — modos: iOS · Android · web — 2 variables

| Token | iOS | Android | web | Descripción (Figma) |
|---|---|---|---|---|
| platform/size/target/min | 44 | 48 | 40 | Área táctil mínima de la plataforma |
| platform/size/field/height | 52 | 56 | 56 | Altura de la fila de un campo |

---

## 3. Reglas para la IA

1. Nunca uses un valor suelto de tamaño: toma siempre el token de la escala `size/*` (iconos, controles, campos, barras).
2. Iconos: usa `size/icon/md` (24) por defecto; `2xs` (8) solo para indicadores (badges, puntos de estado); no uses tamaños fuera de los 6 pasos.
3. Botones: `size/control/height/md` es el estándar; `sm` para botón chico, `lg` para grande, `xs` solo para chips y tags. Respeta `size/control/min-width` (64).
4. Campos: `size/field/height/md` o `lg`; alinea botón y campo a la misma altura y no mezcles alturas distintas en una fila.
5. El modo `expanded` solo cambia `control sm` (32→36), `control md` (44→48) y `field md` (44→48); el resto de la escala es idéntica en ambos modos.
6. En código, el área táctil mínima sale de `platform/size/target/min` (iOS 44, Android 48, web 40), no de `size/target/min` (48 es el valor de diseño, el más exigente).
7. La caja del control no es el área táctil: calcula `hitSlop = (platform/size/target/min − altura del control) ÷ 2` por lado. Aplícalo siempre en xs, sm y enlaces sueltos.
8. No des el área táctil por buena porque el control se ve grande: xs mide 24 y un enlace se ajusta al texto.
9. `platform/size/field/height` es la altura de la fila completa del campo (etiqueta/contexto incluidos), no la de la caja de texto; no lo uses para dimensionar la caja (esa es `size/field/height/*`).
10. Barras de progreso: `size/bar/height/md` (8) es el estándar; `sm` (4) fina, `lg` (12) gruesa.

---

## 4. Inconsistencias

Las variables son la fuente de verdad.

- **Texto de página vs. variables:** no se encontraron diferencias de valores. Las tres tablas (iconos, controles/campos, barras), la tabla de plataforma y los conteos de la sección 06 coinciden con las variables.
- **Descripciones:** el «Uso» de la tabla para `size/control/height/xs` dice «Chips y tags», mientras la descripción de la variable dice «Control mínimo, chips y tags». Diferencia solo de redacción.
- **Observación (no es contradicción):** el ejemplo de hitSlop solo cubre `control sm`. Con los valores actuales, `control md` en default (44) también queda por debajo del mínimo de Android (48) y necesitaría hitSlop de 2 px por lado; la página solo pide hitSlop explícito en «xs, sm y enlaces sueltos».
- **Observación:** `size/target/min` (48) tiene el mismo valor en ambos modos y no depende de `platform`; la página lo declara como valor de diseño, y el valor por plataforma está solo en `platform/size/target/min`.

## 5. Elementos no leídos

Se leyeron los 212 textos del frame, sin secciones ilegibles. Los textos dentro de las muestras visuales (Tag, Botón, Campo) se incluyeron como rótulos. No se leyeron los archivos `sizing-tokens.zip` mencionados en la sección 06 (no están en Figma).
