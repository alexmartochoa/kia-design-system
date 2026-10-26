# Spacing — Tokens y criterio de diseño (Kia App)

- **Fuente:** archivo de Figma `FoundatiosKia` (fileKey `FCrL9DSEDaT0EgGg5y3aJ5`), página `Spacing`, frame `Spacing — Kia App`.
- **Fecha de lectura:** 2026-10-26
- **Fuente de verdad de los valores:** las variables de Figma (colecciones `Spacing Primitives` y `Spacing`).

## 1. Documentación de la página

Textos originales, en orden de lectura (arriba→abajo, izquierda→derecha).

### SPACING

El espacio dentro y entre los elementos de la app de Kia sigue una escala en múltiplos de 4. Cuatro roles cubren cada trabajo: relleno, separación vertical, separación horizontal y columnas.

### 01  La escala base (15 pasos)

Todas las medidas de espacio salen de esta escala. De 4 en adelante van en múltiplos de 4, así todo encaja en la misma grilla y nada queda a mitad de píxel. El 2 es la única excepción: existe para separaciones ópticas mínimas, como el aire entre un ícono y su etiqueta. El 72 no es un rol de la app: lo usa la documentación (space/doc/xl) y algunas medidas de plataforma.

Pasos mostrados: `space/scale/0` (0 px), `2` (2 px), `4` (4 px), `8` (8 px), `12` (12 px), `16` (16 px), `20` (20 px), `24` (24 px), `32` (32 px), `40` (40 px), `48` (48 px), `64` (64 px), `72` (72 px), `80` (80 px), `96` (96 px).

### 02  Los cuatro roles (se adapta)

El mismo número de la escala hace trabajos distintos según dónde va. Por eso hay cuatro roles, y cada uno crece distinto en pantallas grandes. Los tres modos de pantalla son compact, regular y expanded, de menor a mayor ancho. Los puntos de corte exactos los define el equipo de producto.

**Diagrama «Los cuatro roles del espaciado»** (etiqueta: «Se adapta»)

> El mismo número de la escala hace trabajos distintos según dónde va. Por eso hay cuatro roles, y cada uno crece distinto en pantallas grandes.

Cabeceras del diagrama: «Contenido», «Espacio del rol».

| Rol | Etiqueta | Descripción | Ejemplo |
|---|---|---|---|
| inset | Dentro | Relleno dentro de un contenedor. | Ej. Interior de una tarjeta |
| stack | Eje vertical | Separación vertical entre bloques. | Ej. Título y descripción |
| inline | Eje horizontal | Separación horizontal entre elementos. | Ej. Ícono y etiqueta |
| gutter | Retícula | Separación entre columnas de la grilla. | Ej. Columnas de una página |

**El rol se mantiene. El espacio se adapta.**

Elige el rol por su función, no solo por su medida. Cada rol puede crecer de forma distinta según el ancho de pantalla.

Etiquetas de modo en el diagrama: compact, regular, expanded.

Pie del diagrama: «Diagramas conceptuales · Las proporciones ilustran la función de cada rol.» — «Espaciado / Roles».

**Tabla de roles** (Rol / Definición / Uso / Cómo crece):

| Rol | Definición / Uso | Cómo crece |
|---|---|---|
| inset | Relleno adentro de un contenedor: tarjetas, botones, campos, modales. | Crece en los tres modos. |
| stack | Separación vertical entre bloques: título y texto, tarjeta y tarjeta, secciones. | Crece desde md hacia arriba; xs y sm son fijos. |
| inline | Separación horizontal entre elementos: ícono y texto, chips, botones en fila. | Solo crece en expanded; xs y sm son fijos. |
| gutter | Separación entre columnas de la grilla. | Crece en los tres modos. |

### 03  Buenas prácticas

Reglas cortas para que el espacio quede parejo en toda la app de Kia.

**Do**
- Usa siempre un token de la escala, nunca un número suelto.
- inset para el relleno; stack e inline para separar.
- Deja que el espacio crezca en pantallas grandes.

**Don't**
- Poner márgenes a mano tipo 13 o 27.
- Usar el mismo rol para dos trabajos distintos.
- Espaciados distintos para elementos iguales.

### 04  Referencia de tokens (responsive)

Cada rol en sus tamaños, con la medida en los tres modos de pantalla. Elige el rol y el tamaño; el valor lo pone el modo. Los space/doc/* son solo para armar documentación.

Tabla de la página (Token / compact / regular / expanded / Para qué sirve):

| Token | compact | regular | expanded | Para qué sirve |
|---|---|---|---|---|
| space/inset/xs | 4 px | 4 px | 8 px | Relleno interno |
| space/inset/sm | 8 px | 8 px | 12 px | Relleno interno |
| space/inset/md | 12 px | 16 px | 16 px | Relleno interno |
| space/inset/lg | 16 px | 24 px | 24 px | Relleno interno |
| space/inset/xl | 24 px | 32 px | 40 px | Relleno interno |
| space/inset/2xl | 32 px | 40 px | 48 px | Relleno interno |
| space/inset/3xl | 48 px | 48 px | 48 px | Relleno interno amplio |
| space/stack/xs | 4 px | 4 px | 4 px | Separación vertical |
| space/stack/sm | 8 px | 8 px | 8 px | Separación vertical |
| space/stack/md | 12 px | 16 px | 16 px | Separación vertical |
| space/stack/lg | 16 px | 24 px | 24 px | Separación vertical |
| space/stack/xl | 24 px | 32 px | 40 px | Separación vertical |
| space/stack/2xl | 32 px | 48 px | 64 px | Separación vertical |
| space/inline/xs | 4 px | 4 px | 4 px | Separación horizontal |
| space/inline/sm | 8 px | 8 px | 8 px | Separación horizontal |
| space/inline/md | 12 px | 12 px | 16 px | Separación horizontal |
| space/inline/lg | 16 px | 16 px | 24 px | Separación horizontal |
| space/inline/xl | 24 px | 24 px | 32 px | Separación horizontal |
| space/inline/2xl | 32 px | 32 px | 40 px | Separación horizontal |
| space/gutter/sm | 8 px | 12 px | 16 px | Columnas de grilla |
| space/gutter/md | 16 px | 24 px | 24 px | Columnas de grilla |
| space/gutter/lg | 24 px | 32 px | 40 px | Columnas de grilla |
| space/doc/xl | 72 px | 72 px | 72 px | Solo documentación |

## 2. Índice de tokens

### Colección `Spacing Primitives` (modo: Default) — 15 variables, FLOAT, scopes WIDTH_HEIGHT + GAP, sin descripción

| Token | Valor |
|---|---|
| space/scale/0 | 0 px |
| space/scale/2 | 2 px |
| space/scale/4 | 4 px |
| space/scale/8 | 8 px |
| space/scale/12 | 12 px |
| space/scale/16 | 16 px |
| space/scale/20 | 20 px |
| space/scale/24 | 24 px |
| space/scale/32 | 32 px |
| space/scale/40 | 40 px |
| space/scale/48 | 48 px |
| space/scale/64 | 64 px |
| space/scale/72 | 72 px |
| space/scale/80 | 80 px |
| space/scale/96 | 96 px |

### Colección `Spacing` (modos: compact / regular / expanded) — 23 variables, FLOAT

Todas son alias a `Spacing Primitives`. Scopes: GAP (excepto `space/doc/xl`, sin scopes). Ninguna tiene descripción en Figma; el uso viene del texto de la página.

#### inset (7) — Relleno interno

| Token | compact | regular | expanded |
|---|---|---|---|
| space/inset/xs | space/scale/4 (4) | space/scale/4 (4) | space/scale/8 (8) |
| space/inset/sm | space/scale/8 (8) | space/scale/8 (8) | space/scale/12 (12) |
| space/inset/md | space/scale/12 (12) | space/scale/16 (16) | space/scale/16 (16) |
| space/inset/lg | space/scale/16 (16) | space/scale/24 (24) | space/scale/24 (24) |
| space/inset/xl | space/scale/24 (24) | space/scale/32 (32) | space/scale/40 (40) |
| space/inset/2xl | space/scale/32 (32) | space/scale/40 (40) | space/scale/48 (48) |
| space/inset/3xl | space/scale/48 (48) | space/scale/48 (48) | space/scale/48 (48) |

#### stack (6) — Separación vertical

| Token | compact | regular | expanded |
|---|---|---|---|
| space/stack/xs | space/scale/4 (4) | space/scale/4 (4) | space/scale/4 (4) |
| space/stack/sm | space/scale/8 (8) | space/scale/8 (8) | space/scale/8 (8) |
| space/stack/md | space/scale/12 (12) | space/scale/16 (16) | space/scale/16 (16) |
| space/stack/lg | space/scale/16 (16) | space/scale/24 (24) | space/scale/24 (24) |
| space/stack/xl | space/scale/24 (24) | space/scale/32 (32) | space/scale/40 (40) |
| space/stack/2xl | space/scale/32 (32) | space/scale/48 (48) | space/scale/64 (64) |

#### inline (6) — Separación horizontal

| Token | compact | regular | expanded |
|---|---|---|---|
| space/inline/xs | space/scale/4 (4) | space/scale/4 (4) | space/scale/4 (4) |
| space/inline/sm | space/scale/8 (8) | space/scale/8 (8) | space/scale/8 (8) |
| space/inline/md | space/scale/12 (12) | space/scale/12 (12) | space/scale/16 (16) |
| space/inline/lg | space/scale/16 (16) | space/scale/16 (16) | space/scale/24 (24) |
| space/inline/xl | space/scale/24 (24) | space/scale/24 (24) | space/scale/32 (32) |
| space/inline/2xl | space/scale/32 (32) | space/scale/32 (32) | space/scale/40 (40) |

#### gutter (3) — Columnas de grilla

| Token | compact | regular | expanded |
|---|---|---|---|
| space/gutter/sm | space/scale/8 (8) | space/scale/12 (12) | space/scale/16 (16) |
| space/gutter/md | space/scale/16 (16) | space/scale/24 (24) | space/scale/24 (24) |
| space/gutter/lg | space/scale/24 (24) | space/scale/32 (32) | space/scale/40 (40) |

#### doc (1) — Solo documentación

| Token | compact | regular | expanded |
|---|---|---|---|
| space/doc/xl | space/scale/72 (72) | space/scale/72 (72) | space/scale/72 (72) |

Total: 15 + 23 = 38 variables.

## 3. Reglas para la IA

1. Usa siempre un token `space/<rol>/<tamaño>` de la colección `Spacing`; nunca un número suelto (13, 27…) ni un margen a mano.
2. Elige el rol por su función: `inset` = relleno interno (tarjetas, botones, campos, modales); `stack` = separación vertical; `inline` = separación horizontal (ícono-texto, chips, botones en fila); `gutter` = columnas de grilla.
3. No uses el mismo rol para dos trabajos distintos ni valores distintos para elementos iguales.
4. No referencies `space/scale/*` directamente en componentes; son primitivos, y los roles son los que se adaptan por modo. Elige rol y tamaño: el valor lo pone el modo (compact / regular / expanded).
5. Deja que el espacio crezca en pantallas grandes: no fijes valores por modo a mano; cambia el modo de la colección `Spacing`.
6. Crecimiento por rol: `inset` crece en casi todos los tamaños (`3xl` fijo en 48); `stack` crece desde `md` (xs y sm fijos); `inline` solo crece en expanded (xs y sm fijos); `gutter` crece según la tabla de variables.
7. Usa `space/scale/2` solo para separaciones ópticas mínimas (p. ej. aire entre ícono y etiqueta); no pertenece a ningún rol.
8. `space/doc/*` (72 px) es solo para documentación; no lo uses en la UI de la app.
9. Los puntos de corte de compact/regular/expanded los define el equipo de producto; no los inventes.
10. Ante cualquier discrepancia entre texto y valores, manda el valor de la variable en Figma.

## 4. Inconsistencias

Las variables son la fuente de verdad. Comparada la tabla de la página con las variables, **los 23 tokens × 3 modos coinciden**. Diferencias solo en el texto:

- **inset «Crece en los tres modos»**: `space/inset/3xl` es 48/48/48 (no crece) y `space/inset/xs` y `sm` solo cambian en expanded.
- **gutter «Crece en los tres modos»**: `space/gutter/md` es 16/24/24 (no crece de regular a expanded).
- **Escala de 15 pasos**: `space/scale/20`, `80` y `96` existen pero ningún token de rol los referencia y la página no explica su uso. El 72 solo lo usa `space/doc/xl`; el texto menciona además «algunas medidas de plataforma», que no se verificaron en esta página.
- Las variables no tienen descripción en Figma; la descripción solo existe en el texto de la página.
- El párrafo del diagrama de roles repite la primera parte del párrafo de la sección 02 (duplicado en la propia página; se conserva).
