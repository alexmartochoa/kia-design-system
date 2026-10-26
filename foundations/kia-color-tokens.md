# KIA DS · Foundations · Color

Fuente: archivo de Figma **FoundatiosKia**, página **Color** (frames "Color primitivo" y "Color semántico", ambos fechados Oct 19, 2026). Los valores de las tablas salen de las variables de Figma (colecciones **Primitives** y **Semantic**), leídas el 26 de octubre de 2026. Los textos de las secciones "Documentación de la página" son los de los frames.

> **Nota de consistencia.** La documentación de la página y las variables no coinciden del todo en algunos puntos (por ejemplo, el blur del glass figura como 48 en el texto y como 20/24 en las variables numéricas, y el texto habla de una capa Brand que aún no existe como colección en el archivo: Semantic apunta directo a Primitives). En este documento, los valores de las tablas son la fuente de verdad.

---

# Parte 1 · Color primitivo

Colección **Primitives** · 1 modo (`Default`) · 182 variables de color.

## Documentación de la página

**Principio y arquitectura.** La colección Primitives tiene 12 rampas de 13 pasos (156 tokens), más 3 familias alpha y 2 static. Es la capa cruda: ninguna pantalla ni componente la consume directo; la consumen Brand y Semantic. El color comunica estado o jerarquía, nunca decora.

| Capa | Modos | Función en KIA |
|---|---|---|
| 1 · Primitives | 1 | Valores hex y alpha de este documento. Uso interno del equipo de sistema. |
| 2 · Brand | 1 (kia) | Alias de marca: qué rampa es "primaria", "acento", "principal de app". Se mantiene aunque haya una sola marca, para poder sumar sub-marcas (p. ej. línea EV) sin tocar Semantic. |
| 3 · Semantic | light, dark (+ mc/hc después) | Lo que consume la pantalla por intención: fondos, textos, acciones, bordes, feedback. |

**Nomenclatura.** Cada primitivo se nombra `familia-paso`, por ejemplo `midnight-975`. El nombre describe el color, nunca su uso: "primario", "éxito" o "fondo" son decisiones de Brand y Semantic.

| Tipo | Patrón | Ejemplo | Variable Figma | Token código |
|---|---|---|---|---|
| Rampa | familia-paso | forest-600 | `forest/600` | `--kia-forest-600` |
| Alpha | alpha-base-opacidad | alpha-white-80 | `alpha/white/80` | `--kia-alpha-white-80` |
| Static | static-nombre | static-white | `static/white` | `--kia-static-white` |

- **Pasos:** 13 por rampa, igual que bDS: 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 975. 25 es el más claro, 975 el más oscuro.
- **Ancla:** el hex oficial de KIA ocupa el paso cuya luminosidad le corresponde y no se redondea. El resto de la rampa se generó en OKLCH alrededor de esa ancla.
- **Familias:** nombres cortos en inglés, en minúscula y sin el prefijo "kia" (el prefijo lo pone la colección). midnight = Kia Midnight Black, live = Kia Live Red, forest = Kia Forest Green, yellow = Kia Afternoon Yellow, gray = escala de grises KIA.
- **Opacidades:** el número de un alpha es su opacidad en %. Los pasos de una rampa son siempre colores sólidos.

## Rampas de marca

Seis rampas salen de la guía KIA: las primarias (midnight y su escala de soporte gray), el acento (live) y las secundarias (forest, yellow, city). En todas, el paso 600 pasa AA (4,5:1) con texto blanco y el 500 con texto negro; live pasa ambos en el 500.

| Familia | Rol | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 | 975 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `midnight` | Primaria · neutro de la UI (ancla: 975) | #F8F8F8 | #F0F1F2 | #E6E8E9 | #CDD0D2 | #B4B8BC | #9BA1A5 | #828A8F | #697279 | #505B62 | #37434C | #23303A | #14222C | #05141F |
| `gray` | Primaria · escala de soporte | #FAFAFA | #F0F0F1 | #E0E0E1 | #C7C8CA | #AFB0B2 | #939598 | #7F8083 | #6D6E71 | #58595C | #454648 | #333436 | #252527 | #19191A |
| `live` | Acento | #FFF8F8 | #FFF2F0 | #FFE2DF | #FFC6C0 | #FF9A93 | #FF5D5B | #EA0029 | #C40021 | #A4001A | #880013 | #68000C | #4D0007 | #380004 |
| `forest` | Secundaria · verde de app | #F7FCF2 | #F1F8E8 | #E2EFD3 | #C9DFAE | #ABCA85 | #8FB162 | #759645 | #5D7D2B | #496619 | #38500D | #283B04 | #1C2B01 | #121E00 |
| `yellow` | Secundaria · Afternoon Yellow | #FFFAEF | #FFF4DE | #FFECC1 | #FFD97E | #F3C300 | #D0A400 | #A98700 | #866C00 | #6C5700 | #554500 | #3F3300 | #2D2500 | #1F1900 |
| `city` | Secundaria · Kia City Gray | #FAFAFA | #F4F5F5 | #E8EAEA | #D3D5D6 | #BABCBD | #9EA1A2 | #848788 | #6B6E6F | #575A5B | #454747 | #333435 | #242526 | #181A1A |

- **midnight** es el neutro de la interfaz. Se construye mezclando #05141F con blanco: el paso 800 es 80 %, el 600 es 60 %, y así hasta el 25 (3 %). Arriba se afina (900 = 88 %, 950 = 94 %) para tener las elevaciones del modo oscuro.
- **gray** es la escala gris neutra de la guía (sin tinte azul). Queda para soporte de layout e ilustración; la UI usa midnight.
- **live** se reserva para énfasis puntual, respetando el máximo de 30 % de la guía. No es el color de error.
- **forest** es el verde principal de la app (Kia Forest Green). No es el color de éxito: ese es emerald.
- **yellow** no sirve para texto sobre blanco (1,7:1). Sobre midnight-975 llega a 11,2:1.
- **city** es Kia City Gray, un gris con un leve tinte frío. Es muy cercano a gray, así que conviene darle un papel propio, por ejemplo fondos y calles de mapa.

### Uso de los secundarios en digital

En producto digital, Forest Green, Afternoon Yellow y City Gray sí pueden usarse en tipografía, iconos y logos. Es una excepción a la guía de marca, que en piezas de comunicación los limita a fotografía e ilustración. El resto de reglas de la guía se mantienen: logo, motivo y titular comparten color, y no se resaltan palabras de un titular con otro color.

## Rampas de feedback

Tres rampas nuevas para estados del sistema, separadas de los colores de marca para que un éxito no se confunda con el verde principal ni un error con el rojo de énfasis.

| Familia | Rol | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 | 975 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `emerald` | Éxito (ref. en 700) | #F2FDF6 | #E8FBEF | #D2F3DF | #ADE5C3 | #7FD3A4 | #57BA86 | #339E6A | #058452 | #006B41 | #005533 | #003F25 | #002E19 | #002010 |
| `amber` | Advertencia | #FFF9F3 | #FFF3E7 | #FFE4C9 | #FBCC9B | #EFAF67 | #D99139 | #BD7500 | #9B5F00 | #7E4C00 | #643C00 | #4C2C00 | #371F00 | #271400 |
| `red` | Error | #FFF8F7 | #FFF2EE | #FFE2DA | #FFC7B7 | #FFA289 | #FC744F | #DE552E | #C03809 | #9E2A00 | #7F1F00 | #601600 | #470E00 | #340700 |

- **emerald vs forest.** Son dos verdes distintos, cada uno con su rampa: forest es el verde de marca y de acciones principales; emerald se usa solo para estados de éxito. Forest es un verde oliva (tono OKLCH 128°); emerald es un verde azulado (158°) y más limpio. Un botón principal y un mensaje de éxito se distinguen sin depender del texto.
- **red vs live.** red está girado hacia el naranja (36° frente a 25° de Live Red) y es más oscuro en su paso de referencia. Si marca prefiere usar Live Red también para errores, red se puede eliminar sin afectar al resto.
- **amber** no reutiliza yellow: así Afternoon Yellow queda libre para destacar en mapas y agenda sin leerse como advertencia.
- **Información** no tiene rampa propia: Semantic la resuelve con steel.

## Secundarias para mapas y agendamiento

Tres rampas frías y apagadas que siguen el tono de KIA (sobrio, urbano, natural) y llenan el círculo cromático donde la guía no tiene color: azul, turquesa y violeta.

| Familia | Rol | 25 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 | 975 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `steel` | Posición / selección · información | #F6FBFF | #EDF7FF | #DAECFB | #BAD8F1 | #94BFE1 | #72A2C8 | #5889AF | #417297 | #325E7F | #244A66 | #18374E | #0F283A | #081B29 |
| `teal` | Talleres · mantenimiento | #F3FCFE | #EAF8FB | #D5EFF4 | #B2DFE7 | #89CAD6 | #65B1BE | #4595A2 | #287B88 | #146470 | #08505A | #013C44 | #002B31 | #001E23 |
| `plum` | Rutas alternativas · prueba de manejo | #FBF9FF | #F7F3FF | #EEE4FF | #DDCCFB | #C9B0F0 | #AF93DB | #9477BF | #7B5EA4 | #644A89 | #4F396E | #3C2955 | #2B1D3F | #1E132D |

**Usos sugeridos** (se fijan después en Semantic):

| Necesidad | Mapas | Agendamiento |
|---|---|---|
| Posición / selección | steel (ya es el pointer del vehículo) | Día o franja seleccionada: steel |
| Puntos de interés | Concesionarios: forest · Talleres: teal | — |
| Categorías | Rutas o zonas alternativas: plum | Tipo de cita: mantenimiento teal, prueba de manejo plum, entrega yellow |
| Destacado puntual | — | Hoy / próxima cita: yellow sobre midnight |
| Estado | — | Confirmada emerald · Pendiente amber · Cancelada red |

En mapas, cada categoría debe llevar además icono o forma: el color nunca es la única señal.

## Alpha y static

Los alpha sirven para capas sobre fotografía, scrims y estados sobre superficies; los static no cambian entre modo claro y oscuro (logo, texto sobre foto). Los alpha de midnight cubren el mismo rango que los de white (5 a 80 %), para que el modo claro y el oscuro tengan overlays equivalentes.

| Variable Figma | Valor | Opacidad | Uso típico (según la página) |
|---|---|---|---|
| `alpha/white/5` | #FFFFFF0D | 5 % | Hover sobre oscuro |
| `alpha/white/10` | #FFFFFF1A | 10 % | Pressed sobre oscuro, divisores |
| `alpha/white/15` | #FFFFFF26 | 15 % | `surface/glass-strong` y estado activado (nuevo) |
| `alpha/white/20` | #FFFFFF33 | 20 % | Bordes sobre oscuro (nuevo) |
| `alpha/white/30` | #FFFFFF4C | 30 % | Brillo interior |
| `alpha/white/60` | #FFFFFF99 | 60 % | Texto secundario sobre foto, borde fuerte |
| `alpha/white/80` | #FFFFFFCC | 80 % | Superficies translúcidas |
| `alpha/midnight/5` | #05141F0D | 5 % | Hover sobre claro |
| `alpha/midnight/10` | #05141F1A | 10 % | Pressed sobre claro, divisores |
| `alpha/midnight/20` | #05141F33 | 20 % | Bordes sobre claro |
| `alpha/midnight/40` | #05141F66 | 40 % | Scrim de modales |
| `alpha/midnight/60` | #05141F99 | 60 % | Degradado sobre foto |
| `alpha/midnight/80` | #05141FCC | 80 % | Superficies translúcidas oscuras |
| `alpha/forest/10` | #5D7D2B1A | 10 % | Fondo de selección |
| `alpha/forest/20` | #5D7D2B33 | 20 % | Hover sobre selección |
| `alpha/forest/50` | #5D7D2B80 | 50 % | Elementos deshabilitados en verde |
| `alpha/black/15` | #00000026 | 15 % | Sombra cercana de Raised (nuevo) |
| `alpha/black/25` | #00000040 | 25 % | Sombra cercana de Overlay (nuevo) |
| `alpha/black/35` | #00000059 | 35 % | Sombra lejana de Raised (nuevo; hoy 33 %) |
| `alpha/black/40` | #00000066 | 40 % | Sombra lejana de Overlay (nuevo) |
| `alpha/sage/5` | #DAE8E00D | 5 % | Reserva para el glass verde en estados suaves (nuevo) |
| `alpha/sage/10` | #DAE8E01A | 10 % | Final del degradado del botón glass (nuevo) |
| `alpha/sage/15` | #DAE8E026 | 15 % | Inicio del degradado del botón glass (nuevo) |
| `alpha/sage/25` | #DAE8E040 | 25 % | Borde del botón glass (nuevo) |
| `static/white` | #FFFFFF | 100 % | Blanco que no cambia con el tema |
| `static/midnight` | #05141F | 100 % | Midnight que no cambia con el tema |

## Contraste y próximos pasos

Las 12 rampas cumplen la misma regla, sin excepciones: 600 o más oscuro con texto blanco, 500 o más claro con texto negro (AA, 4,5:1). En bDS, 6 de 26 rampas eran excepción.

Sobre fondo midnight-975 (modo oscuro) los colores de marca se aclaran un paso o dos:

| Color | Sobre midnight-975 | Usar en oscuro |
|---|---|---|
| live-500 | 4,0:1 (no pasa) | live-400 (6,2:1) |
| forest-600 | 3,9:1 (no pasa) | forest-400 (7,7:1) |
| emerald-600 | — | emerald-400 (7,8:1) |
| steel-400 | 6,9:1 | — |
| yellow-300 | 11,2:1 | — |

**Próximos pasos (estado en la página):**
- ☐ Validar con marca las 6 rampas nuevas (emerald, amber, red, steel, teal, plum) y la excepción de uso digital de los secundarios.
- ☑ Cargar la colección Primitives en Figma (1 modo, oculta al publicar la librería).
- ☐ Crear Brand con 1 modo: brand/primary → midnight, brand/main → forest, brand/accent → live.
- ☐ Crear Semantic empezando por light y dark; mc y hc después, con la misma lógica de bDS.

---

# Parte 2 · Color semántico

Colección **Semantic** · 2 modos (`light`, `dark`) · 81 variables de color (las 29 variables numéricas de la colección, como blur y desplazamiento de elevación, anchos de borde y opacidad, no se incluyen aquí). Cada celda muestra el primitivo al que apunta el token y su valor resuelto.

## Documentación de la página

### Cómo leer los tokens

Cada color de la interfaz viene de un token que ya resolvió el tema. El color comunica estado o jerarquía, nunca decora.

La app solo tiene modo oscuro: **dark es el único modo en uso** y está sacado de las pantallas reales. La columna light se mantiene como reserva, con la misma lógica, pero no existe en la app ni está prevista; no se implementa ni se valida hasta que haga falta.

- **Nombre:** `color/{propiedad}/{rol}/{variante}/{estado}`, por ejemplo `color/text/action/primary/ghost/default`. Las propiedades son surface, fill, text, icon, border y overlay.
- **Valores:** cada celda indica el primitivo al que apunta. Los colores de marca (acción primaria y selección) pasan por Brand: en Figma, forest-600 se escribe `brand/main/600`. Feedback, neutros y alpha apuntan directo a Primitives.
- **Contraste:** las cifras son WCAG sobre el fondo indicado. Texto pide 4,5:1; iconos, bordes de controles y rellenos gráficos piden 3:1.
- **Fondos de referencia en dark:** base midnight-975 (#05141F) y glass (alpha-white-10 sobre base = #1E2C35). Todo texto se verifica sobre los dos.

### 01 Superficies (6 tokens)

Dónde se apoya el contenido. En KIA la superficie principal no es un color sólido sino el glass: una capa translúcida con desenfoque que se repite en tarjetas, botones y contenedores. Las tarjetas usan un glass neutro; el tinte verde queda solo para los botones glass (04 Acción), así se distingue qué se toca y qué solo contiene.

**Por qué el glass no es un color sólido.** Al ser translúcido, toma el tono de lo que tiene detrás y funciona igual sobre el fondo, sobre un mapa o sobre una foto del vehículo. Sobre el fondo base se ve como #1E2C35 (glass) y #2A3741 (glass-strong); esos son los valores contra los que se mide el contraste del texto.

Usos: `surface/base` → fondo de la pantalla · `surface/sunken` → zonas rehundidas detrás de las tarjetas · `surface/glass` → tarjetas y contenedores glass · `surface/glass-strong` → tarjeta destacada, pill "Estacionado" · `surface/overlay` → bottom sheet, modal · `surface/scrim` → velo detrás del modal.

### 02 Bordes (5 tokens)

Cuatro bordes ordenados por fuerza, más el indicador de selección. `subtle` y `default` solo separan y no necesitan contraste. `strong` es el borde de un control que se identifica por él (outline, input) y por eso tiene que llegar a 3:1 contra su fondo.

| Token | Contraste dark (base / glass) | Uso |
|---|---|---|
| `border/subtle` | 1,3 / 1,4 | Divisores dentro de una tarjeta |
| `border/default` | 1,8 / 1,9 | Contorno de tarjetas glass |
| `border/strong` | 7,1 / 6,2 | Inputs y controles que se identifican por su borde |
| `border/focus` | 6,9 / 5,3 | Foco de teclado |
| `border/selected` | 7,7 / 5,9 | Indicador de seleccionado y activado (el velo solo no alcanza 3:1) |

**Por qué strong usa alpha-white-60.** Con alpha-white-30 el borde daría 2,6:1 y no llegaría al 3:1 que WCAG 1.4.11 exige para controles. El botón secundario no usa este token: lleva su propio borde blanco, `border/action/primary/outline/default`.

### 03 Texto e iconos (9 tokens)

Tres niveles de texto y nada más: los ocho blancos verdosos y grises sueltos de las pantallas se reducen a primary, secondary y tertiary. Todo texto pasa AA sobre la base y sobre el glass.

| Token | Contraste dark (base / glass) | Contraste light | Uso |
|---|---|---|---|
| `text/primary` | 17,6 / 13,5 | 18,6 | Títulos y datos |
| `text/secondary` | 12,0 / 9,2 | 7,0 | Subtítulos, tab bar |
| `text/tertiary` | 7,1 / 5,5 | 4,9 | Labels y textos de apoyo |
| `text/disabled` | sin requisito | — | Texto deshabilitado |
| `text/on-fill` | — | — | Texto sobre rellenos sólidos de color |
| `icon/default` | 15,2 / 11,6 | 10,1 | Iconos principales |
| `icon/subtle` | — | — | Iconos secundarios |
| `icon/highlight` | 11,2 / 8,6 | 3,4 | Acento puntual ("Pedir Asistencia") |
| `text/link` | 9,6 / 7,4 | 6,9 | Enlaces dentro de texto |

**Hallazgo de accesibilidad.** Los labels de Revisión anual ("Documento oficial", "Fecha", "Vehículo") usan hoy midnight-600: 3,8:1 sobre la base y 2,9:1 sobre glass, no pasan. Al conectarlos a `text/tertiary` suben a 7,1 y 5,5.

**Los enlaces van siempre subrayados.** `text/link` (steel-300) solo da 1,8:1 contra `text/primary`: el color no basta para distinguir un enlace dentro de un párrafo (WCAG 1.4.1), así que el subrayado es obligatorio.

### 04 Acción (2 intenciones)

Lo que se puede tocar. Primary es la acción principal de la pantalla, en el verde de marca; danger avisa que algo se borra o no tiene vuelta atrás. Son dos intenciones y nada más: la jerarquía se baja con la apariencia, no con otra intención.

| Intención | Token por defecto | Valor | Rol |
|---|---|---|---|
| Primary | `fill/action/primary/default` | forest-600 #5D7D2B | Acción principal. Texto blanco 4,7:1 |
| Danger | `fill/action/danger/default` | red-600 #C03809 | Eliminar, acciones irreversibles. Texto blanco 5,5:1 |

| Apariencia | Jerarquía | Cómo se ve |
|---|---|---|
| fill | Principal | Relleno verde, texto blanco |
| outline | Secundario | Solo borde blanco, texto blanco, sin relleno |
| glass | Botones glass | Glass con tinte verde, borde verdoso, texto blanco |
| ghost | Terciario | Solo texto e icono en verde |

`live` no entra en Acción: queda para énfasis puntual de marca.

**Primary por apariencia.** Contraste dark: 3,9 contra la base (gráfico, pasa 3:1). `fill/action/primary/pressed` → texto blanco 6,6. `text/action/primary/default` → 4,7 sobre forest-600. `border/action/primary/outline/default` → 18,6 base / 14,3 glass. `fill/action/primary/outline/pressed` → velo al presionar. `fill/action/primary/glass/default` → inicio del degradado. `fill/action/primary/glass/gradient-end` → final del degradado. `border/action/primary/glass/default` → decorativo (2,0). `text/action/primary/glass/default` → 12,1 sobre el glass verde. `fill/action/primary/ghost/pressed` → velo de marca al presionar.

**El glass verde es solo para botones.** alpha-sage toma el tono del glass actual (#DAE8E0, verde menta) para que los botones glass conserven su brillo verdoso. Las tarjetas siguen en el glass neutro de 01 Superficies: así se distingue a simple vista qué se toca y qué solo contiene. El botón glass se identifica por su texto, por eso su borde puede ser decorativo; un botón glass solo con icono necesita nombre accesible y el icono en `icon/default` (más de 10:1).

**En dark el verde se aclara para texto.** forest-600 sobre la base da 3,9:1: sirve como relleno, no como texto. Por eso ghost usa forest-400.

**Danger por apariencia.** Repite el juego de Primary, sin glass: una acción destructiva nunca se presenta como un botón glass. `fill/action/danger/pressed` → red-700 #9E2A00 (texto blanco 7,5). `border/action/danger/outline/default` → red-400 #FC744F. `text/action/danger/outline/default` → red-300 #FFA289 (9,6 / 7,3).

**Qué cambia en las pantallas.**
- El botón "Cancelar" ya es un outline con borde blanco: queda igual, conectado a `border/action/primary/outline/default`.
- La tab activa y "Gestionar mi Kia", que hoy usan relleno claro con texto oscuro, dejan de hacerlo: la tab activa pasa al estado Activated (06) y "Gestionar mi Kia" a outline o glass según su jerarquía.

### 05 Feedback (4 tokens)

Cuatro mensajes, y solo cuatro. Success confirma, Warning advierte, Danger detiene e Info aclara. Cada uno significa lo mismo en toda la app y sale de su propia rampa, separada de los colores de marca.

| Feedback | Token | Propósito |
|---|---|---|
| Success | `fill/success/default` | Confirma una acción exitosa. |
| Warning | `fill/warning/default` | Advierte sobre una condición o precaución. |
| Danger | `fill/danger/default` | Detiene o señala un error crítico. |
| Info | `fill/info/default` | Aclara o da contexto. |

Cada tipo trae cinco tokens (`{tipo}` = success, warning, danger o info):

| Token | dark | light | Contraste |
|---|---|---|---|
| `fill/{tipo}/default` | paso 600 | paso 600 | texto blanco 4,7 a 5,5 |
| `fill/{tipo}/subtle` | paso 950 | paso 50 | — |
| `text/{tipo}` | paso 300 | paso 700 | dark ≥ 7,8 sobre subtle · light ≥ 6,1 sobre subtle |
| `icon/{tipo}` | paso 400 | paso 600 | dark ≥ 6,9 sobre base · light ≥ 4,7 sobre blanco |
| `border/{tipo}` | igual que icon | igual que icon | — |

| Tipo | Rampa | fill/default | Texto blanco | Diferencia con marca |
|---|---|---|---|---|
| Success | emerald | #058452 | 4,7:1 | Verde azulado (158°), no el oliva de forest (128°) |
| Warning | amber | #9B5F00 | 5,2:1 | No reutiliza Afternoon Yellow |
| Danger | red | #C03809 | 5,5:1 | Girado al naranja (36°) frente a Live Red (25°) |
| Info | steel | #417297 | 5,1:1 | Mismo azul que posición y selección en mapas |

**Por qué Info no es más claro en el fondo sólido.** El azul claro de Info (steel-400, el del pointer del vehículo) vive en `icon/info` y `border/info`, que es donde aparece casi siempre. El fondo sólido `fill/info/default` va en steel-600 porque tiene que sostener texto blanco, igual que los otros tres: ahí mide 5,1:1, entre el 4,7 de Success y el 5,2 de Warning. Si se aclarara, Info sería el único que pide texto oscuro y la alerta tendría que preguntar su tipo antes de pintar la etiqueta.

**Texto sobre la franja tenue.** En dark el texto usa el paso 300 (≥ 7,8:1) y deja el 400 para iconos y bordes. En light (reserva) va en el paso 700: con el 600, Success daría 4,4:1 sobre emerald-50.

En pantallas actuales, "Aprobado ✓" de Revisión anual debe pasar de blanco a `text/success`.

**El color nunca va solo.** Todo mensaje de feedback lleva icono y texto. Quien no distingue rojo de verde tiene que poder leer "Aprobado" o "Error" sin depender del tono.

### 06 Interacción (7 estados)

El mismo control en sus siete estados más comunes. Los estados no son colores nuevos: son un velo que se apila sobre el fondo que ya está, por eso funcionan sobre la base, el glass o un mapa sin inventar un token por combinación. La fuerza del velo sube con la permanencia del estado: activado es el más marcado porque señala un único lugar fijo; seleccionado es más callado porque puede haber muchos a la vez. Hover existe solo en web.

| Estado | Token | dark | light | Comportamiento |
|---|---|---|---|---|
| Default | `fill/action/primary/glass/default` (en el control glass) | alpha-sage-15 | — | Reposo |
| Hover | `overlay/state/hover` | alpha-white-5 | alpha-midnight-5 | Cursor encima (solo web) |
| Pressed | `overlay/state/pressed` | alpha-white-10 | alpha-midnight-10 | Pulsación activa |
| Selected | `overlay/state/selected` + `border/selected` | alpha-forest-20 + forest-400 | alpha-forest-10 + forest-600 | Selección múltiple o toggle |
| Activated | `overlay/on-fill/activated` + `border/selected` | alpha-white-15 (nuevo) + forest-400 | alpha-midnight-20 + forest-600 | Único lugar fijo (tab activa) |
| Focus | `border/focus` | steel-400 (6,9 / 5,3) | steel-600 (5,1) | Teclado y lector de pantalla |
| Disabled | `fill/disabled` + `text/disabled` | alpha-white-5 + midnight-600 | midnight-50 + midnight-400 | No interactivo |

- **Selected y Activated nunca van solo con el velo.** El velo verde da 1,2:1 contra la base y el blanco al 15 %, 1,5:1: no alcanzan el 3:1 que pide un indicador de estado (WCAG 1.4.11). Por eso los dos suman `border/selected` (7,7:1): un borde en selección múltiple, una barra o subrayado en la tab activa. En la tab, el texto pasa además de `text/secondary` a `text/primary`.
- **El foco va con separación.** Anillo de 2 px a 2 px del control, sobre el fondo (6,9:1). Pegado al botón primario no se vería: steel-400 contra forest-600 da solo 1,7:1.
- **El foco va en steel, no en verde.** Así se distingue del botón primario, y steel ya es el color de "posición y selección" en mapas y agenda.
- **Disabled en alpha-white-5.** Con 10 % un control deshabilitado se vería igual que el glass y que un botón presionado. El texto deshabilitado no tiene requisito de contraste, pero el control debe exponerse como deshabilitado al lector de pantalla.

### 07 Elevación (3 niveles)

Aquí KIA se separa de bDS. En bDS, en dark la sombra se vuelve invisible y el fondo se aclara al subir de capa. En KIA el glass hace las dos cosas a la vez: separa capas con translucidez, desenfoque, borde y brillo interior, y la sombra suma profundidad. En light la receta se reduce a fondo blanco y sombra, porque ahí las superficies son casi todas el mismo blanco.

| Nivel | Fondo | Borde | Sombra cercana | Sombra lejana | Brillo interior |
|---|---|---|---|---|---|
| Raised · dark | `surface/glass` | `border/default` | alpha-black-15 | alpha-black-35 | arriba alpha-white-30 · abajo alpha-white-5 |
| Raised · light | `surface/base` | `border/subtle` | — | — | — |
| Overlay · dark | `surface/overlay` | — | alpha-black-25 | alpha-black-40 | arriba alpha-white-10 |
| Overlay · light | `surface/overlay` | — | — | — | — |
| Scrim | `surface/scrim` | — | — | — | — |

**Estructura de elevación.** Cada nivel es fondo más borde más sombras. El color viaja en los tokens de color; el desenfoque y el desplazamiento viajan como tokens numéricos aparte (`elevation/{nivel}/glass-blur`, `near-y`, `near-blur`, `far-y`, `far-blur`, `inner-y`), para poder afinar la receta sin tocar el color.

Los botones glass usan la receta de Raised con su fondo propio, `fill/action/primary/glass/*` (glass verde), y su borde `border/action/primary/glass/default`. La sombra cercana pierde su tinte verdoso (#092C2B) y pasa a negro.

**Glass sobre fotos o mapas.** Los contrastes de esta página se miden con el glass sobre la base. Si una tarjeta o un botón glass cae sobre una foto clara o un mapa, debajo tiene que ir alpha-midnight-40 (o un degradado con alpha-midnight-60) para que el texto no pierda contraste.

### Cambios en Primitives y Brand

Para que todos los valores de esta página existan hay que sumar 10 primitivos alpha y crear Brand: alpha-white-15 (surface/glass-strong y estado activado), alpha-white-20, #000000 al 15 % (sombra cercana de Raised), 25 % (sombra cercana de Overlay), 35 % (sombra lejana de Raised, hoy 33 %), 40 % (sombra lejana de Overlay), alpha-sage-10 (final del degradado del botón glass), alpha-sage-15 (inicio del degradado), alpha-sage-25 (borde del botón glass) y alpha-sage-5 (reserva para el glass verde en estados suaves). Todos ya existen en la colección Primitives (ver tabla de alpha arriba).

**Brand** (1 modo, kia): tres alias de rampa, 13 pasos cada uno (39 variables). `brand/primary` → midnight, `brand/main` → forest, `brand/accent` → live. Semantic apunta a Brand para acción primaria y selección; a Primitives para feedback, neutros, alpha y static.

### Decisiones tomadas

- **Modo light.** No existe en la app ni está previsto. Se documenta como reserva, sin implementar.
- **Botón claro sobre oscuro.** Se descarta. El principal es el verde (fill) y el secundario es un outline con borde blanco.
- **Info.** Usa steel y no tiene rampa propia. Si en el futuro hace falta, se crea sin tocar el resto.
- **Tinte verde del glass.** Se crea alpha-sage para los botones glass. Las tarjetas siguen en glass neutro.
- **Mejoras de accesibilidad.** Borde fuerte a 3:1, indicadores de selección y activado, foco con separación, enlaces subrayados, feedback con icono y texto, y velo bajo el glass sobre fotos.

---

## Tokens semánticos (81 variables de color)

Formato de celda: `primitivo` → valor resuelto. Se muestra **dark** primero porque es el modo en uso; **light** es reserva.

### Surface

| Token | dark | light |
|---|---|---|
| `color/surface/base` | midnight/975 → #05141F | static/white → #FFFFFF |
| `color/surface/sunken` | midnight/950 → #14222C | midnight/25 → #F8F8F8 |
| `color/surface/glass` | alpha/white/10 → #FFFFFF1A | alpha/white/80 → #FFFFFFCC |
| `color/surface/glass-strong` | alpha/white/15 → #FFFFFF26 | static/white → #FFFFFF |
| `color/surface/overlay` | midnight/950 → #14222C | static/white → #FFFFFF |
| `color/surface/scrim` | alpha/midnight/60 → #05141F99 | alpha/midnight/40 → #05141F66 |

### Border

| Token | dark | light |
|---|---|---|
| `color/border/subtle` | alpha/white/10 → #FFFFFF1A | alpha/midnight/10 → #05141F1A |
| `color/border/default` | alpha/white/20 → #FFFFFF33 | alpha/midnight/20 → #05141F33 |
| `color/border/strong` | alpha/white/60 → #FFFFFF99 | midnight/500 → #828A8F |
| `color/border/focus` | steel/400 → #72A2C8 | steel/600 → #417297 |
| `color/border/selected` | forest/400 → #8FB162 | forest/600 → #5D7D2B |
| `color/border/action/primary/outline/default` | static/white → #FFFFFF | midnight/975 → #05141F |
| `color/border/action/primary/glass/default` | alpha/sage/25 → #DAE8E040 | alpha/midnight/10 → #05141F1A |
| `color/border/action/danger/outline/default` | red/400 → #FC744F | red/600 → #C03809 |
| `color/border/success` | emerald/400 → #57BA86 | emerald/600 → #058452 |
| `color/border/warning` | amber/400 → #D99139 | amber/600 → #9B5F00 |
| `color/border/danger` | red/400 → #FC744F | red/600 → #C03809 |
| `color/border/info` | steel/400 → #72A2C8 | steel/600 → #417297 |

### Text

| Token | dark | light |
|---|---|---|
| `color/text/primary` | midnight/25 → #F8F8F8 | midnight/975 → #05141F |
| `color/text/secondary` | midnight/200 → #CDD0D2 | midnight/700 → #505B62 |
| `color/text/tertiary` | midnight/400 → #9BA1A5 | midnight/600 → #697279 |
| `color/text/disabled` | midnight/600 → #697279 | midnight/400 → #9BA1A5 |
| `color/text/on-fill` | static/white → #FFFFFF | static/white → #FFFFFF |
| `color/text/link` | steel/300 → #94BFE1 | steel/700 → #325E7F |
| `color/text/action/primary/default` | static/white → #FFFFFF | static/white → #FFFFFF |
| `color/text/action/primary/outline/default` | midnight/25 → #F8F8F8 | midnight/975 → #05141F |
| `color/text/action/primary/glass/default` | midnight/25 → #F8F8F8 | midnight/975 → #05141F |
| `color/text/action/primary/ghost/default` | forest/400 → #8FB162 | forest/700 → #496619 |
| `color/text/action/danger/default` | static/white → #FFFFFF | static/white → #FFFFFF |
| `color/text/action/danger/outline/default` | red/300 → #FFA289 | red/700 → #9E2A00 |
| `color/text/action/danger/ghost/default` | red/300 → #FFA289 | red/700 → #9E2A00 |
| `color/text/success` | emerald/300 → #7FD3A4 | emerald/700 → #006B41 |
| `color/text/warning` | amber/300 → #EFAF67 | amber/700 → #7E4C00 |
| `color/text/danger` | red/300 → #FFA289 | red/700 → #9E2A00 |
| `color/text/info` | steel/300 → #94BFE1 | steel/700 → #325E7F |

### Icon

| Token | dark | light |
|---|---|---|
| `color/icon/default` | midnight/100 → #E6E8E9 | midnight/800 → #37434C |
| `color/icon/subtle` | midnight/400 → #9BA1A5 | midnight/600 → #697279 |
| `color/icon/highlight` | yellow/300 → #F3C300 | yellow/500 → #A98700 |
| `color/icon/action/primary/ghost/default` | forest/400 → #8FB162 | forest/600 → #5D7D2B |
| `color/icon/success` | emerald/400 → #57BA86 | emerald/600 → #058452 |
| `color/icon/warning` | amber/400 → #D99139 | amber/600 → #9B5F00 |
| `color/icon/danger` | red/400 → #FC744F | red/600 → #C03809 |
| `color/icon/info` | steel/400 → #72A2C8 | steel/600 → #417297 |

### Fill

| Token | dark | light |
|---|---|---|
| `color/fill/action/primary/default` | forest/600 → #5D7D2B | forest/600 → #5D7D2B |
| `color/fill/action/primary/pressed` | forest/700 → #496619 | forest/700 → #496619 |
| `color/fill/action/primary/outline/pressed` | alpha/white/10 → #FFFFFF1A | alpha/midnight/10 → #05141F1A |
| `color/fill/action/primary/glass/default` | alpha/sage/15 → #DAE8E026 | forest/50 → #F1F8E8 |
| `color/fill/action/primary/glass/gradient-end` | alpha/sage/10 → #DAE8E01A | forest/50 → #F1F8E8 |
| `color/fill/action/primary/ghost/pressed` | alpha/forest/20 → #5D7D2B33 | alpha/forest/10 → #5D7D2B1A |
| `color/fill/action/danger/default` | red/600 → #C03809 | red/600 → #C03809 |
| `color/fill/action/danger/pressed` | red/700 → #9E2A00 | red/700 → #9E2A00 |
| `color/fill/success/default` | emerald/600 → #058452 | emerald/600 → #058452 |
| `color/fill/success/subtle` | emerald/950 → #002E19 | emerald/50 → #E8FBEF |
| `color/fill/warning/default` | amber/600 → #9B5F00 | amber/600 → #9B5F00 |
| `color/fill/warning/subtle` | amber/950 → #371F00 | amber/50 → #FFF3E7 |
| `color/fill/danger/default` | red/600 → #C03809 | red/600 → #C03809 |
| `color/fill/danger/subtle` | red/950 → #470E00 | red/50 → #FFF2EE |
| `color/fill/info/default` | steel/600 → #417297 | steel/600 → #417297 |
| `color/fill/info/subtle` | steel/950 → #0F283A | steel/50 → #EDF7FF |
| `color/fill/disabled` | alpha/white/5 → #FFFFFF0D | midnight/50 → #F0F1F2 |

### Overlay (estados)

| Token | dark | light |
|---|---|---|
| `color/overlay/state/hover` | alpha/white/5 → #FFFFFF0D | alpha/midnight/5 → #05141F0D |
| `color/overlay/state/pressed` | alpha/white/10 → #FFFFFF1A | alpha/midnight/10 → #05141F1A |
| `color/overlay/state/selected` | alpha/forest/20 → #5D7D2B33 | alpha/forest/10 → #5D7D2B1A |
| `color/overlay/on-fill/activated` | alpha/white/15 → #FFFFFF26 | alpha/midnight/20 → #05141F33 |

### Elevation (colores)

| Token | dark | light | Descripción en Figma |
|---|---|---|---|
| `color/elevation/raised/shadow-near` | alpha/black/25 → #00000040 | alpha/midnight/10 → #05141F1A | Sombra de contacto. Pega la tarjeta a la superficie y comunica que se puede presionar. |
| `color/elevation/raised/shadow-far` | alpha/black/40 → #00000066 | alpha/midnight/20 → #05141F33 | Sombra ambiental. Hace flotar la tarjeta. Antes: midnight/10 · black/35 |
| `color/elevation/raised/inner-top` | alpha/white/30 → #FFFFFF4C | alpha/white/30 → #FFFFFF4C | Línea de luz en el canto superior. |
| `color/elevation/raised/inner-bottom` | alpha/black/25 → #00000040 | alpha/midnight/5 → #05141F0D | Sombra interior en la base: da volumen convexo. Antes: white/5 |
| `color/elevation/overlay/shadow-near` | alpha/black/25 → #00000040 | alpha/midnight/10 → #05141F1A | Sombra cercana de modales, hojas y menús. |
| `color/elevation/overlay/shadow-far` | alpha/black/40 → #00000066 | alpha/midnight/20 → #05141F33 | Sombra lejana: separa la capa flotante de todo lo de atrás. |
| `color/elevation/overlay/inner-top` | alpha/white/10 → #FFFFFF1A | alpha/white/10 → #FFFFFF1A | Línea de luz en el canto superior de lo que flota. |
| `color/elevation/panel/shadow-near` | alpha/black/15 → #00000026 | alpha/midnight/5 → #05141F0D | Sombra media difusa. Sin sombra de contacto: el panel no se presiona. |
| `color/elevation/panel/shadow-far` | alpha/black/40 → #00000066 | alpha/midnight/20 → #05141F33 | Sombra ambiental amplia: más altura que raised. |
| `color/elevation/panel/inner-top` | alpha/white/10 → #FFFFFF1A | alpha/white/60 → #FFFFFF99 | Luz uniforme y tenue en el canto superior, sin brillo especular. |

### Material · glass

| Token | dark | light | Descripción en Figma |
|---|---|---|---|
| `color/material/glass/raised/tint-top` | alpha/white/15 → #FFFFFF26 | alpha/white/80 → #FFFFFFCC | Inicio del degradado vertical del vidrio tocable (luz desde arriba). Neutro: el tinte verde queda solo para botones glass. |
| `color/material/glass/raised/tint-bottom` | alpha/midnight/20 → #05141F33 | alpha/white/60 → #FFFFFF99 | Final del degradado: más oscuro abajo para dar volumen. |
| `color/material/glass/raised/edge-highlight` | alpha/white/60 → #FFFFFF99 | static/white → #FFFFFF | Borde especular: esquina iluminada (arriba izquierda). |
| `color/material/glass/raised/edge-mid` | alpha/white/5 → #FFFFFF0D | alpha/white/30 → #FFFFFF4C | Borde especular: tramo central casi invisible. |
| `color/material/glass/raised/edge-reflect` | alpha/white/15 → #FFFFFF26 | alpha/white/60 → #FFFFFF99 | Borde especular: reflejo en la esquina opuesta. |
| `color/material/glass/panel/fill` | alpha/white/10 → #FFFFFF1A | alpha/white/80 → #FFFFFFCC | Relleno plano del panel: mismo valor que `color/surface/glass`. Sin degradado, no sugiere volumen presionable. |
| `color/material/glass/panel/border` | alpha/white/10 → #FFFFFF1A | alpha/midnight/10 → #05141F1A | Borde uniforme del panel, sin brillo direccional. |
