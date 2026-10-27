# Radius — Kia App (tokens y criterio de diseño)

- **Fuente:** archivo de Figma `FoundatiosKia` (key `FCrL9DSEDaT0EgGg5y3aJ5`), página `Radius`, frame `Radius — Kia App` (27:6510).
- **Fecha de lectura:** 2026-10-26
- **Colecciones relacionadas:** `Radius Primitives` (8 variables, modo Default), `Radius` (33 variables, modos compact / regular / expanded). La colección `platform` solo tiene 2 variables de tamaño (no de radio); se menciona en Inconsistencias.
- **Fuente de verdad:** las variables de Figma. El texto de la página es documentación.

---

## 1. Documentación de la página

> Texto original de la página, en orden de lectura.

### RADIUS

El redondeo de esquinas en la app de Kia usa una familia fija de 8 radios, de 0 px a pastilla completa. Cuatro roles cubren cada tipo de superficie: superficie, campo, control y acción.

### 01  La escala

El redondeo de esquinas en la app de Kia usa una familia fija de 8 radios, de 0 px a pastilla completa. Cada componente toma uno de ellos, nunca un número inventado. Supuesto: la escala replica la de tu referencia. Los valores por rol de las secciones siguientes son una propuesta más sobria para Kia, a validar con diseño de marca.

| Token | Valor |
|---|---|
| radius/scale/none | 0 px |
| radius/scale/xs | 2 px |
| radius/scale/sm | 4 px |
| radius/scale/md | 8 px |
| radius/scale/lg | 12 px |
| radius/scale/xl | 16 px |
| radius/scale/2xl | 24 px |
| radius/scale/full | 9999 px (pastilla) |

### 02  Los roles

Cada tipo de superficie tiene su radio, así una tarjeta, un campo y un botón se ven de la misma familia sin pensarlo. Hay cuatro roles.

| Rol | Qué cubre | Regla de plataforma |
|---|---|---|
| surface | Tarjetas, hojas y modales | Crece con el tamaño de pantalla: compact < regular = expanded |
| field | Campos de texto, TextArea, OTP y búsqueda | 8 px en iOS y web, 4 px en Android (Material 3). Búsqueda: cápsula en iOS y Android, 8 px en web |
| control | Controles chicos como el Checkbox | 4 px en iOS y web, 2 px en Android |
| action | Botones, chips y avatares | Botón: 16 px en las tres plataformas. Chips y avatares: pastilla (full) |

El anillo de foco siempre mide el radio del componente más 2 px, para que el contorno quede concéntrico.

### 03  Buenas prácticas

Usa siempre el token del rol y nunca un valor suelto: así las curvas quedan parejas en toda la app.

**Do**
- Usa el radio del rol, no un número suelto.
- Mismo radio para superficies del mismo tipo.
- Superficie anidada: radio interior = radio exterior − padding (regla concéntrica, radius.surface.xs).
- Botón y campo siguen su regla de plataforma; chips y avatares van en pastilla.

**Don't**
- Mezclar radios distintos en la misma tarjeta.
- Redondear de más un contenedor grande.
- Poner esquinas vivas donde todo es redondeado.
- Inventar un radio de foco: siempre es radio + 2 px.

### 04  Referencia de tokens

Estos son los 19 radios por rol, con su valor en los tres modos de pantalla. Los que cambian por plataforma muestran iOS · Android · web. En Figma, la barra / agrupa las variables en carpetas.

| Token | compact | regular | expanded | Para qué sirve |
|---|---|---|---|---|
| radius/surface/xs | 4 px | 4 px | 4 px | Superficie anidada (regla concéntrica) |
| radius/surface/sm | 8 px | 12 px | 12 px | Tarjeta chica |
| radius/surface/md | 12 px | 16 px | 16 px | Tarjeta / modal |
| radius/surface/lg | 16 px | 24 px | 24 px | Hoja grande |
| radius/field/sm | 8 · 4 · 8 | 8 · 4 · 8 | 8 · 4 · 8 | TextArea y OTP · iOS · Android · web |
| radius/field/md | 8 · 4 · 8 | 8 · 4 · 8 | 8 · 4 · 8 | Campo · iOS · Android · web |
| radius/control/xs | 2 px | 2 px | 2 px | Marcas de gráfico muy angostas |
| radius/control/sm | 4 · 2 · 4 | 4 · 2 · 4 | 4 · 2 · 4 | Checkbox y control pequeño · iOS · Android · web |
| radius/action | 16 px | 16 px | 16 px | Botón · igual en iOS, Android y web |
| radius/action/icon | full | full | full | Botón de icono |
| radius/pill | full | full | full | Chip / etiqueta / avatar |
| radius/search | full · full · 8 | full · full · 8 | full · full · 8 | Búsqueda · iOS · Android · web |
| radius/focus/surface | 14 px | 18 px | 18 px | Anillo de foco de una tarjeta |
| radius/focus/field | 10 · 6 · 10 | 10 · 6 · 10 | 10 · 6 · 10 | Foco de un campo · iOS · Android · web |
| radius/focus/field-compact | 10 · 6 · 10 | 10 · 6 · 10 | 10 · 6 · 10 | Foco de TextArea y OTP · iOS · Android · web |
| radius/focus/action | 20 px | 20 px | 20 px | Anillo de foco del botón · igual en iOS, Android y web |
| radius/focus/control | 6 px | 6 px | 6 px | Anillo de foco de las filas de Menu |
| radius/focus/search | full · full · 10 | full · full · 10 | full · full · 10 | Foco de búsqueda · iOS · Android · web |
| radius/focus/pill | full | full | full | Foco de chips y avatares |

### 05  Tokens para Figma

Estos son los valores en px que un diseñador usa en Figma, separados por lo que cambia: el tamaño de pantalla o la plataforma. En Figma crea una colección de variables numéricas llamada Radius; full equivale a 9999 px.

**Superficies: cambian según el tamaño de pantalla**

| Componente | Token | compact | regular | expanded | Foco (radio + 2 px) |
|---|---|---|---|---|---|
| Superficie anidada | radius/surface/xs | 4 | 4 | 4 | — |
| Tarjeta chica | radius/surface/sm | 8 | 12 | 12 | — |
| Tarjeta / modal | radius/surface/md | 12 | 16 | 16 | 14 · 18 · 18 |
| Hoja grande | radius/surface/lg | 16 | 24 | 24 | — |

**Campos, botones y controles: cambian según la plataforma, igual en las tres pantallas**

| Componente | Token | iOS | Android | Web | Foco iOS · Android · Web |
|---|---|---|---|---|---|
| Campo de texto | radius/field/md | 8 | 4 | 8 | 10 · 6 · 10 |
| TextArea y OTP | radius/field/sm | 8 | 4 | 8 | 10 · 6 · 10 |
| Búsqueda | radius/search | full | full | 8 | full · full · 10 |
| Botón | radius/action | 16 | 16 | 16 | 20 (radio + 4: 2 de separación y 2 de anillo) |
| Botón de icono | radius/action/icon | full | full | full | — |
| Chip, etiqueta y avatar | radius/pill | full | full | full | full |
| Checkbox y control pequeño | radius/control/sm | 4 | 2 | 4 | — |
| Marcas de gráfico angostas | radius/control/xs | 2 | 2 | 2 | — |

Las filas de Menu usan un anillo de foco de 6 px (radius/focus/control) en todas las plataformas.

---

## 2. Índice de tokens (variables de Figma)

Todas las variables tienen scope `CORNER_RADIUS` y tipo `FLOAT`. `full` = 9999.

### 2.1 Colección `Radius Primitives` (modo: Default) — 8 variables

| Token | Tipo | Valor | Descripción |
|---|---|---|---|
| radius/scale/none | FLOAT | 0 | — |
| radius/scale/xs | FLOAT | 2 | — |
| radius/scale/sm | FLOAT | 4 | — |
| radius/scale/md | FLOAT | 8 | — |
| radius/scale/lg | FLOAT | 12 | — |
| radius/scale/xl | FLOAT | 16 | — |
| radius/scale/2xl | FLOAT | 24 | — |
| radius/scale/full | FLOAT | 9999 | — |

### 2.2 Colección `Radius` (modos: compact / regular / expanded) — 33 variables

Alias = primitivo en `Radius Primitives`. Si no hay alias, el valor es literal (no apunta a primitivo).

**Surface (4) — varía por modo de pantalla**

| Token | compact | regular | expanded | Descripción |
|---|---|---|---|---|
| radius/surface/xs | →scale/sm (4) | →scale/sm (4) | →scale/sm (4) | Superficie anidada (regla concéntrica) |
| radius/surface/sm | →scale/md (8) | →scale/lg (12) | →scale/lg (12) | Tarjeta chica |
| radius/surface/md | →scale/lg (12) | →scale/xl (16) | →scale/xl (16) | Tarjeta / modal |
| radius/surface/lg | →scale/xl (16) | →scale/2xl (24) | →scale/2xl (24) | Hoja grande |

**Field (6) — varía por plataforma (sufijo en el nombre); igual en los 3 modos**

| Token | compact = regular = expanded | Descripción |
|---|---|---|
| radius/field/sm/ios | →scale/md (8) | TextArea y OTP · iOS |
| radius/field/sm/android | →scale/sm (4) | TextArea y OTP · Android |
| radius/field/sm/web | →scale/md (8) | TextArea y OTP · web |
| radius/field/md/ios | →scale/md (8) | Campo de texto · iOS |
| radius/field/md/android | →scale/sm (4) | Campo de texto · Android |
| radius/field/md/web | →scale/md (8) | Campo de texto · web |

**Control (4)**

| Token | compact = regular = expanded | Descripción |
|---|---|---|
| radius/control/xs | →scale/xs (2) | Marcas de gráfico muy angostas |
| radius/control/sm/ios | →scale/sm (4) | Checkbox y control pequeño · iOS |
| radius/control/sm/android | →scale/xs (2) | Checkbox y control pequeño · Android |
| radius/control/sm/web | →scale/sm (4) | Checkbox y control pequeño · web |

**Action / pill (3)**

| Token | compact = regular = expanded | Descripción |
|---|---|---|
| radius/action | →scale/xl (16) | Botón · iOS, Android y web (un solo radio en las tres) |
| radius/action/icon | →scale/full (9999) | Botón de icono |
| radius/pill | →scale/full (9999) | Chip, etiqueta y avatar |

**Search (3)**

| Token | compact = regular = expanded | Descripción |
|---|---|---|
| radius/search/ios | →scale/full (9999) | Campo de búsqueda · iOS |
| radius/search/android | →scale/full (9999) | Campo de búsqueda · Android |
| radius/search/web | →scale/md (8) | Campo de búsqueda · web |

**Focus (13) — valores literales salvo los `full`**

| Token | compact | regular | expanded | Alias | Descripción |
|---|---|---|---|---|---|
| radius/focus/surface | 14 | 18 | 18 | literal | Anillo de foco de una tarjeta (radio + 2 px) |
| radius/focus/field/ios | 10 | 10 | 10 | literal | Foco de un campo · iOS |
| radius/focus/field/android | 6 | 6 | 6 | literal | Foco de un campo · Android |
| radius/focus/field/web | 10 | 10 | 10 | literal | Foco de un campo · web |
| radius/focus/field-compact/ios | 10 | 10 | 10 | literal | Foco de TextArea y OTP · iOS |
| radius/focus/field-compact/android | 6 | 6 | 6 | literal | Foco de TextArea y OTP · Android |
| radius/focus/field-compact/web | 10 | 10 | 10 | literal | Foco de TextArea y OTP · web |
| radius/focus/action | 20 | 20 | 20 | literal | Anillo de foco del botón · iOS, Android y web (radio + 4) |
| radius/focus/control | 6 | 6 | 6 | literal | Foco de las filas de Menu |
| radius/focus/search/ios | 9999 | 9999 | 9999 | →scale/full | Foco de búsqueda · iOS |
| radius/focus/search/android | 9999 | 9999 | 9999 | →scale/full | Foco de búsqueda · Android |
| radius/focus/search/web | 10 | 10 | 10 | literal | Foco de búsqueda · web |
| radius/focus/pill | 9999 | 9999 | 9999 | →scale/full | Foco de chips y avatares |

### 2.3 Colección `platform` (relacionada, no es de radio)

Modos iOS / Android / web. No se usa en los tokens de Radius (la plataforma se resuelve por sufijo en el nombre, no por modo).

| Token | iOS | Android | web | Descripción |
|---|---|---|---|---|
| platform/size/target/min | 44 | 48 | 40 | Área táctil mínima de la plataforma |
| platform/size/field/height | 52 | 56 | 56 | Altura de la fila de un campo |

---

## 3. Reglas para la IA

1. Nunca uses un número suelto de radio: toma siempre el token del rol (surface, field, control, action/pill/search).
2. Superficies (tarjetas, modales, hojas) usan `radius/surface/*` y **cambian por modo de pantalla**: compact < regular = expanded. Elige el modo según el tamaño de pantalla, no la plataforma.
3. Campos, botones, búsqueda y controles pequeños cambian **por plataforma** (sufijo `/ios`, `/android`, `/web`) y son iguales en los 3 modos de pantalla.
4. Campo de texto = `radius/field/md/{plataforma}`; TextArea y OTP = `radius/field/sm/{plataforma}`. Ambos: 8 en iOS y web, 4 en Android.
5. Botón = `radius/action` (16, sin sufijo de plataforma: es igual en las tres); su foco = `radius/focus/action` (20); botón de icono = `radius/action/icon` (pastilla); chips, etiquetas y avatares = `radius/pill`.
6. Búsqueda = `radius/search/{plataforma}`: pastilla en iOS y Android, 8 en web.
7. Checkbox y controles pequeños = `radius/control/sm/{plataforma}` (4 · 2 · 4); marcas de gráfico muy angostas = `radius/control/xs` (2).
8. El anillo de foco usa el token `radius/focus/*` del componente (radio + 2 px, concéntrico). Nunca inventes un radio de foco. Filas de Menu: `radius/focus/control` (6) en todas las plataformas.
9. Superficie anidada: radio interior = radio exterior − padding; usa `radius/surface/xs` (4) como referencia. No mezcles radios distintos en la misma tarjeta ni dejes esquinas vivas donde todo es redondeado.
10. Los alias a primitivos (`radius/scale/*`) son solo para la capa de tokens; los componentes consumen la colección `Radius`, no `Radius Primitives`. `full` = 9999.

---

## 4. Inconsistencias

Las variables son la fuente de verdad.

1. **Cantidad de tokens:** el texto dice "19 radios por rol"; la colección `Radius` tiene **33 variables**: 19 roles, de los cuales 7 se dividen en `/ios`, `/android`, `/web` (12 sin dividir + 7×3 = 33). `radius/action` y `radius/focus/action` dejaron de dividirse el 2026-10-26, cuando el botón pasó a 16 en las tres plataformas.
2. **Nombres con plataforma:** la página muestra `radius/field/md`, `radius/search`, `radius/control/sm`, `radius/focus/field`, `radius/focus/field-compact`, `radius/focus/search` sin sufijo. En Figma esos nombres **no existen solos**: existen como `.../ios`, `.../android`, `.../web`.
3. **Plataforma vía nombre, no vía modo:** el texto dice "cambian según la plataforma", pero la colección `Radius` solo tiene modos de pantalla (compact/regular/expanded); la plataforma se codifica en el nombre. La colección `platform` (modos iOS/Android/web) no contiene ningún radio.
4. **Notación del texto:** en Buenas prácticas se escribe `radius.surface.xs` (puntos); el token real es `radius/surface/xs`.
5. **Regla "foco = radio + 2 px" con excepciones:** `radius/focus/control` es 6 para todas las plataformas, pero `radius/control/sm` es 4 · 2 · 4 (radio + 2 daría 6 · 4 · 6). Está documentado como foco de filas de Menu, no del checkbox, así que no hay token de foco para `radius/control/sm`. Tampoco hay foco definido para `surface/sm` ni `surface/lg` (la tabla muestra "—"); solo `radius/focus/surface` (14 · 18 · 18), que corresponde a `surface/md`.
6. **Foco de búsqueda web:** 10 = 8 + 2, consistente con `radius/search/web`.
7. **Pendiente declarado en la página:** "Supuesto: la escala replica la de tu referencia. Los valores por rol… son una propuesta más sobria para Kia, a validar con diseño de marca." Los valores por rol aún no están validados por marca.
8. **Descripciones de primitivos:** las 8 variables de `Radius Primitives` no tienen descripción en Figma.

No encontré otras diferencias entre el texto y los valores: todas las filas de las secciones 04 y 05 coinciden con las variables.
