# KIA DS — Página More (grosor de borde, opacidad y capas)

- **Archivo de Figma:** FoundatiosKia (`FCrL9DSEDaT0EgGg5y3aJ5`)
- **Página:** More (frame único: "More — Kia App")
- **Fecha de lectura:** 2026-10-26
- **Modo de lectura:** solo lectura. No se modificó nada en Figma.

---

## 1. Documentación de la página

Textos originales, en orden de lectura. Son 109 nodos de texto en total, ninguno oculto ni vacío.

### Encabezado

**MORE**

> Los tokens chicos que completan la base de KIA DS: grosor de borde, opacidad y orden de las capas. Son pocos valores, siempre los mismos, y cada uno tiene su rol para que ningún componente se resuelva a ojo.

### 01 Grosor de borde

> El ancho de líneas y bordes. Casi todo usa sm (1 px). md da presencia al foco, a la selección y a la caja de Checkbox y Radio. lg solo aparece en alto contraste. xs (0.5 px) es una línea de pelo decorativa. Colección: Border Primitives. Los componentes no usan estos valores directamente: usan los roles de la sección 04.

Escala visual (muestras en la página):

| Token | Valor |
|---|---|
| border/scale/none | 0 px |
| border/scale/xs | 0.5 px |
| border/scale/sm | 1 px |
| border/scale/md | 2 px |
| border/scale/lg | 3 px |

> Los trazos de iconos y de visualizaciones (anillos de carga, gauges, velocímetro) no son bordes y no usan estos tokens.

### 02 Opacidad

> KIA DS no tiene una escala de opacidad numérica. La transparencia de un color ya la cubren los primitivos alpha/white, alpha/midnight, alpha/black, alpha/forest y alpha/sage (5 a 80): para un tinte, un relleno translúcido o un vidrio se usa un token de color, no una opacidad. La opacidad de un elemento entero tiene un solo uso: opacity/disabled (60), para logos, fotos e ilustraciones apagadas.

Escala visual (muestras en la página):

| Muestra | Valor |
|---|---|
| Imagen activa | 100 |
| opacity/disabled | 60 |

> El texto y los iconos se apagan con su color (color/text/disabled, color/text/secondary), nunca con opacidad.

### 03 Capas

> El orden en que se apilan las cosas cuando se superponen, de abajo hacia arriba. Lo importante es el orden, no el número: la escala deja un hueco de 100 entre niveles para meter una capa nueva sin renumerar. Mismo valor en compact, regular y expanded. Colección: Layers.

| Capa | Valor | Para qué sirve |
|---|---|---|
| layer/sticky | 1000 | Cabeceras, tab bar y barras fijas. Es la capa más baja. |
| layer/popover | 1100 | Lo que se ancla a un control: menús, selects, autocompletar, Datepicker. |
| layer/scrim | 1200 | El fondo oscuro o glass detrás de un modal o bottom sheet (color/surface/scrim). |
| layer/modal | 1300 | Diálogos, alertas de confirmación y bottom sheets. |
| layer/toast | 1400 | Avisos efímeros: siempre por encima del modal. |
| layer/tooltip | 1500 | Tooltips y coachmarks: lo más alto del sistema. |

### 04 Los roles

> Los componentes nunca usan el primitivo: usan estos tokens de rol, que viven en la colección Semantic y cambian solos según el modo.

| Token | Light · Dark | mc* | hc* | Para qué sirve |
|---|---|---|---|---|
| border/width/default | 1 px | 1 px | 2 px | Campos y tarjetas activas |
| border/width/divider | 1 px | 1 px | 2 px | Divisores de listas y secciones |
| border/width/control-strong | 2 px | 2 px | 3 px | Caja de Checkbox y Radio |
| border/width/indicator | 2 px | 2 px | 3 px | Lo seleccionado: tab activa, fila elegida |
| border/width/focus | 2 px | 2 px | 3 px | Anillo de foco |
| opacity/disabled | 60 | 60 | 60 | Logos, fotos e ilustraciones apagadas |

> \* Los modos mc (contraste medio) y hc (alto contraste) todavía no existen en Semantic. Cuando se creen, los roles de borde se asignan como indica la tabla: en alto contraste el borde engorda porque, sin sombras ni tintes sutiles, es lo que separa las superficies. Cada rol se usa con su color: border/width/focus con color/border/focus, e indicator con color/border/selected.

### 05 En React Native

- Opacidad: RN usa una escala de 0 a 1, así que opacity/disabled = 60 se exporta como 0.6.
- Bordes: borderWidth acepta los valores tal cual. 0.5 puede verse distinto según la densidad de pantalla, por eso xs nunca comunica estado.
- Capas: se aplican con zIndex, que solo ordena entre hermanos de una misma vista padre. En Android hay que acompañarlo con elevation, porque si no la sombra puede dibujarse por encima de la capa.
- El componente Modal de RN se monta en una ventana nativa propia y ya queda por encima de todo. Ahí los tokens layer/* ordenan lo que va dentro del modal (un toast o tooltip sobre un bottom sheet) y lo que se renderiza en un portal o host de overlays propio.

### 06 Buenas prácticas

> Reglas cortas para que estos valores chicos no se usen a ojo.

**Do**
- Usa el token de rol (border/width/default, layer/modal), nunca el primitivo ni un número suelto.
- Apaga texto e iconos con su color disabled. opacity/disabled es solo para logos e imágenes.
- Usa un color alpha/* para cualquier relleno translúcido, en vez de bajar la opacidad del relleno.
- Deja que el token engorde el borde en alto contraste. No lo resuelvas a mano.
- Si hace falta una capa nueva, usa el hueco de 100 entre niveles en vez de renumerar.

**Don't**
- Bajar la opacidad de un botón entero para deshabilitarlo.
- Apagar un texto secundario con opacidad al 80%: usa color/text/secondary.
- Marcar lo seleccionado con border/width/focus. Foco y selección son señales distintas: usa indicator.
- Inventar un zIndex como 9999 para ganarle a otra capa.
- Comunicar estado o foco con xs (0.5 px): en pantalla no se percibe.
- Dejar grosores fraccionarios (0.88, 1.05…) que vienen de escalar un frame: el borde es 1 px.

### 07 Pendiente en los diseños

> Auditoría de las 17 pantallas de esta página (26/10/2026).

- ~70 bordes con valores fraccionarios (0.885, 0.886, 0.889, 1.007, 1.04, 1.056) → pasarlos a border/width/default.
- ~30 textos apagados con opacidad de capa (80%, 60%, 50%) en Perfil, Gestionar mi kia, home e iPhone 16 - 148/149 → pasarlos a color/text/secondary o color/text/tertiary.
- Rellenos translúcidos con valores sueltos (5, 7, 8, 11, 67, 74, 90…) → mapearlos al alpha/* más cercano.
- Ningún borde ni opacidad está ligado a variables todavía.

---

## 2. Índice de tokens

Colecciones de la página: **Border Primitives** (5), **Layers** (6), y dentro de **Semantic** los 6 tokens de rol `border/width/*` y `opacity/disabled`. Como referencia se incluyen los primitivos `alpha/*` de **Primitives** que cita la sección 02.

### 2.1 Border Primitives (1 modo: Default) — 5 tokens

Todos FLOAT, scope `STROKE_FLOAT`.

| Token | Valor | Descripción en Figma |
|---|---|---|
| border/scale/none | 0 | 0 px · Sin borde. |
| border/scale/xs | 0.5 | 0.5 px · Línea de pelo. Nunca para estado o foco. |
| border/scale/sm | 1 | 1 px · El borde de casi todo. |
| border/scale/md | 2 | 2 px · Presencia: foco, selección, Checkbox y Radio. |
| border/scale/lg | 3 | 3 px · Solo alto contraste. |

### 2.2 Layers (1 modo: Default) — 6 tokens

Todos FLOAT, sin scope definido (`[]`). Mismo valor en la única modalidad (la página dice "Mismo valor en compact, regular y expanded"; la colección tiene solo el modo Default).

| Token | Valor | Descripción en Figma |
|---|---|---|
| layer/sticky | 1000 | Cabeceras, tab bar y barras fijas. La capa más baja. |
| layer/popover | 1100 | Lo que se ancla a un control: menús, selects, autocompletar, Datepicker. |
| layer/scrim | 1200 | Fondo oscuro o glass detrás de un modal o bottom sheet. |
| layer/modal | 1300 | Diálogos, alertas y bottom sheets. |
| layer/toast | 1400 | Avisos efímeros: siempre por encima del modal. |
| layer/tooltip | 1500 | Tooltips y coachmarks: lo más alto del sistema. |

### 2.3 Semantic (modos: light, dark) — 6 tokens relacionados (de 110)

Solo existen los modos `light` y `dark`; no hay `mc` ni `hc`.

| Token | Tipo | Alias (light y dark) | Light | Dark | Scope | Descripción en Figma |
|---|---|---|---|---|---|---|
| border/width/default | FLOAT | border/scale/sm | 1 | 1 | STROKE_FLOAT | Campos y tarjetas activas. |
| border/width/divider | FLOAT | border/scale/sm | 1 | 1 | STROKE_FLOAT | Divisores de listas y secciones. |
| border/width/control-strong | FLOAT | border/scale/md | 2 | 2 | STROKE_FLOAT | Caja de Checkbox y Radio. |
| border/width/indicator | FLOAT | border/scale/md | 2 | 2 | STROKE_FLOAT | Lo seleccionado: tab activa, fila elegida. No usar para foco. |
| border/width/focus | FLOAT | border/scale/md | 2 | 2 | STROKE_FLOAT | Anillo de foco. No usar para selección. |
| opacity/disabled | FLOAT | — (valor literal, sin alias) | 60 | 60 | OPACITY | 60 · Solo logos, fotos e ilustraciones apagadas. Texto e iconos usan su color disabled. |

### 2.4 Primitives — `alpha/*` citados por la sección 02 (referencia; 25 tokens, 1 modo: Default)

COLOR, scope `ALL_SCOPES`, sin descripción. Son parte de la colección Primitives (182 tokens), no de esta página.

| Familia | Color base | Pasos (alfa resuelto) |
|---|---|---|
| alpha/white | #ffffff | 5 (0.051), 10 (0.102), 15 (0.149), 20 (0.2), 30 (0.298), 60 (0.6), 80 (0.8) |
| alpha/midnight | #05141f | 5 (0.051), 10 (0.102), 20 (0.2), 40 (0.4), 60 (0.6), 80 (0.8) |
| alpha/black | #000000 | 15 (0.149), 25 (0.251), 35 (0.349), 40 (0.4) |
| alpha/forest | #5d7d2b | 10 (0.102), 20 (0.2), 50 (0.502) |
| alpha/sage | #dae8e0 | 5 (0.051), 10 (0.102), 15 (0.149), 25 (0.251) |

### 2.5 Tokens de color que la página cita (no son de esta página)

`color/text/disabled`, `color/text/secondary`, `color/text/tertiary`, `color/surface/scrim`, `color/border/focus`, `color/border/selected`. Los seis existen en Semantic (no se leyeron sus valores).

---

## 3. Reglas para la IA

1. Los componentes usan siempre el rol de Semantic (`border/width/*`, `opacity/disabled`) o `layer/*`. Nunca `border/scale/*` ni números sueltos.
2. Borde estándar de campos y tarjetas: `border/width/default`. Divisores de listas y secciones: `border/width/divider`. En ambos casos 1 px.
3. Foco y selección son señales distintas. Anillo de foco: `border/width/focus` con `color/border/focus`. Seleccionado (tab activa, fila elegida): `border/width/indicator` con `color/border/selected`. Nunca uses `focus` para marcar selección.
4. Caja de Checkbox y Radio: `border/width/control-strong`.
5. Nunca uses `border/scale/xs` (0.5 px) para comunicar estado o foco. Es solo línea de pelo decorativa.
6. Los trazos de iconos y de visualizaciones (anillos de carga, gauges, velocímetro) no son bordes y no usan tokens `border/*`.
7. Para deshabilitar texto o iconos usa su color (`color/text/disabled`, `color/text/secondary`), nunca opacidad. `opacity/disabled` (60 → 0.6 en RN) es solo para logos, fotos e ilustraciones. Nunca bajes la opacidad de un botón entero.
8. Para tintes, rellenos translúcidos o vidrio usa un color `alpha/*` o un token de color. No existe escala de opacidad numérica.
9. Orden de apilado, de abajo hacia arriba: sticky 1000 → popover 1100 → scrim 1200 → modal 1300 → toast 1400 → tooltip 1500. Usa `layer/*`, nunca un zIndex inventado (9999). Para una capa nueva usa el hueco de 100.
10. En React Native, `zIndex` solo ordena entre hermanos del mismo padre. En Android acompáñalo con `elevation`. El `Modal` nativo de RN ya queda por encima de todo, y `layer/*` ordena lo que va dentro de él o en un portal de overlays.
11. Modos: hoy Semantic solo tiene light y dark, con valores idénticos para los bordes. Los modos mc/hc aún no existen. Cuando existan, el engrosamiento en hc (+1 px) lo resuelve el token, no se hace a mano.
12. Los grosores fraccionarios (0.88, 1.05…) vienen de escalar un frame. Son un error: el borde es 1 px.

---

## 4. Inconsistencias

Las variables de Figma son la fuente de verdad.

1. **Rango de los alpha (sección 02).** El texto dice "alpha/white, alpha/midnight, alpha/black, alpha/forest y alpha/sage (5 a 80)". En las variables solo white y midnight llegan a 80. Black va de 15 a 40, forest de 10 a 50 y sage de 5 a 25. Además, en Primitives no hay `alpha/black/5` ni `alpha/black/10`.
2. **Columnas mc* y hc* (sección 04).** La tabla muestra valores para mc y hc, pero Semantic solo tiene los modos light y dark. La propia página lo avisa con el asterisco. Las columnas son propuesta, no estado actual.
3. **"Mismo valor en compact, regular y expanded" (sección 03).** Layers tiene un solo modo (Default), no esos tres. No hay contradicción de valores, pero la colección no tiene esos modos.
4. **`opacity/disabled`.** Es un valor literal 60 en Semantic, sin alias a un primitivo. No hay primitivo de opacidad (coherente con "no hay escala de opacidad numérica"). Su valor es 60, no 0.6, y RN lo convierte a 0.6.
5. **"Auditoría de las 17 pantallas de esta página" (sección 07).** La página solo contiene el frame de documentación ("More — Kia App"), con encabezado y 7 secciones. No hay pantallas en ella, así que esa auditoría no se puede comprobar desde aquí.
6. **"Ningún borde ni opacidad está ligado a variables todavía" (sección 07).** No se verificó en las pantallas. Solo se leyó la documentación y las variables.
7. **Alias de `layer/scrim`.** La página cita `color/surface/scrim` como el color del fondo. Existe en Semantic, pero no hay vínculo en las variables entre `layer/scrim` y ese color. Es solo una referencia de uso.
