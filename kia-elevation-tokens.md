# Kia — Elevación (tokens y criterio de diseño)

- **Archivo de Figma:** FoundatiosKia (`FCrL9DSEDaT0EgGg5y3aJ5`)
- **Página:** Elevation (frame «Elevación»)
- **Fecha de lectura:** 2026-10-26
- **Pie de la página:** «KIA DS · Foundations · Elevación | Oct 23, 2026 · @Alejandro»
- **Fuente de verdad de los valores:** las variables de Figma (colección `Semantic`, modos dark y light) y los estilos locales.

---

## 1. Documentación de la página

### Cómo leer la elevación

> La elevación dice qué está por encima de qué. En KIA no la hace solo la sombra: cada nivel es un material (relleno y borde) más un efecto (desenfoque y sombras). El material dice qué es la capa; la sombra, a qué altura está.

> La app solo tiene modo oscuro: dark es el único modo en uso y sale de las pantallas reales. La columna light se mantiene como reserva con la misma lógica, pero no se implementa ni se valida hasta que haga falta.

> En esta página: 01 Los niveles · 02 Cuándo usar cada uno · 03 Tocable o no tocable · 04 Buenas prácticas · 05 Tokens · 06 Estilos y código

Notas:
- «Nombre: elevation/{nivel}/{propiedad} para los números, color/elevation/{nivel}/{capa} para el color de las sombras y color/material/glass/{nivel}/{capa} para el relleno y el borde.»
- «Valores: cada celda indica el primitivo al que apunta, igual que en Color semántico.»
- «Referencia: de bDS tomamos la idea de pocos niveles con significado. Nos separamos en dark: allí el vidrio separa las capas y la sombra suma profundidad, en vez de apagarse.»
- «Esta página manda: si un valor no coincide con Color semántico · 07 Elevación, vale el de aquí.»

### 01 Los niveles — 4 niveles

> De menos a más alto. Casi todo vive plano; la elevación se reserva para lo que se toca o para lo que tiene que levantarse del fondo. Raised y panel comparten el vidrio, pero no la intención: uno se presiona, el otro solo contiene.

Muestra de niveles (dark): Plano (sin sombra) · Elevado (elevation/raised) · Panel (elevation/panel) · Flotante (elevation/overlay).

| Nivel | Token | Qué es | Ejemplos en KIA |
|---|---|---|---|
| Plano | — | La pantalla y el contenido que no se separa del fondo | Fondo, títulos de sección, texto suelto |
| Elevado | elevation/raised | Vidrio con volumen que se presiona entero | Tarjetas con chevron (Manual del Propietario), botones glass |
| Panel | elevation/panel | Vidrio plano que se levanta más, pero solo contiene | Ficha del vehículo, bloque de Personalización, panel sobre mapa |
| Flotante | elevation/overlay | Capa por encima de todo que bloquea lo de atrás | Modales, hojas, menús, tooltips |

### 02 Cuándo usar cada uno — 4 reglas

> La sombra es información, no decoración: dice qué está por encima de qué y qué se puede presionar. Ante la duda, sube un nivel solo si cambia lo que el usuario puede hacer.

- «Plano. El estado normal. Si algo no se toca y no necesita agruparse, va plano.»
- «Elevado. Cuando el elemento entero es una acción: toda la tarjeta lleva a otra pantalla o ejecuta algo. Si lleva chevron, es raised.»
- «Panel. Cuando hay que agrupar información que pesa en la pantalla pero no se toca entera. Puede contener controles (un botón Editar), y esos controles sí son raised; el panel no.»
- «Flotante. Cuando algo aparece encima del contenido y pide atención antes de seguir. Detrás va color/surface/scrim con blur/scrim.»

### 03 Tocable o no tocable — raised vs panel

> Los dos son vidrio. Lo que los separa son las señales de volumen: el raised parece un objeto que se hunde al presionarlo; el panel, una lámina que flota más alto pero no invita a tocarla.

| Rasgo | Elevado · tocable | Panel · no tocable |
|---|---|---|
| Relleno | Degradado vertical: alpha-white-15 arriba, alpha-midnight-20 abajo (luz desde arriba) | Plano: alpha-white-10, igual que surface/glass |
| Borde | Especular en degradado: alpha-white-60 arriba a la izquierda, alpha-white-5 al centro, alpha-white-15 abajo a la derecha | Uniforme: alpha-white-10 |
| Sombra cercana | De contacto, corta y nítida: y 2 · blur 4 · alpha-black-25 | Difusa, sin contacto: y 6 · blur 16 · alpha-black-15 |
| Sombra lejana | y 16 · blur 40 · spread −8 · alpha-black-40 | Más alta y amplia: y 24 · blur 56 · spread −12 · alpha-black-40 |
| Brillo interior | Línea arriba alpha-white-30 y sombra abajo alpha-black-25 (volumen convexo) | Solo línea arriba alpha-white-10, sin volumen |
| Desenfoque de fondo | 20 | 24 (más esmerilado: se lee como material) |
| Altura percibida | Baja: pegado a la superficie | Media: flota sobre el fondo |

> Por qué la sombra de contacto significa “tocable”. Una sombra corta y nítida pega el elemento a la superficie y el ojo entiende que se puede hundir. El degradado y el borde especular refuerzan ese volumen de botón. El panel cambia la sombra de contacto por una difusa y quita el volumen: se ve más alto, pero no presionable.

### 04 Buenas prácticas — Do · Don’t

> Reglas cortas para que la elevación signifique algo.

**Do**
- Usa solo estos cuatro niveles.
- Aplica siempre el trío completo del nivel: efecto, relleno y borde.
- Mismo nivel para elementos del mismo tipo.
- Si una tarjeta lleva chevron o abre algo, es raised.
- Si un contenedor agrupa datos o controles sueltos, es panel.
- Si el vidrio cae sobre una foto o un mapa claro, pon debajo alpha-midnight-40.

**Don’t**
- Inventar sombras nuevas o más oscuras.
- Poner raised a algo que no se toca “para que se vea lindo”.
- Anidar raised dentro de raised. Un botón raised dentro de un panel sí está bien.
- Mezclar el relleno de un nivel con la sombra de otro.
- Usar el efecto Glass nativo de Figma en diseños para desarrollo: no tiene equivalente directo en código.

### 05 Tokens — 17 de color · 23 numéricos

> El color viaja en tokens de color; el desenfoque, el desplazamiento y la expansión, en tokens numéricos aparte. Así se puede afinar la receta sin tocar el color.

> Todos viven en la colección Semantic, modos dark y light.

**Color** (tabla de la página; los valores son alias a primitivos)

| Token | dark | light | Uso |
|---|---|---|---|
| color/elevation/raised/inner-bottom | alpha-black-25 | alpha-midnight-5 | Sombra interior en la base: da volumen convexo. |
| color/elevation/raised/inner-top | alpha-white-30 | alpha-white-30 | Línea de luz en el canto superior. |
| color/elevation/raised/shadow-far | alpha-black-40 | alpha-midnight-20 | Sombra ambiental. Hace flotar la tarjeta. |
| color/elevation/raised/shadow-near | alpha-black-25 | alpha-midnight-10 | Sombra de contacto. Pega la tarjeta a la superficie y comunica que se puede presionar. |
| color/material/glass/raised/edge-highlight | alpha-white-60 | static-white | Borde especular: esquina iluminada (arriba izquierda). |
| color/material/glass/raised/edge-mid | alpha-white-5 | alpha-white-30 | Borde especular: tramo central casi invisible. |
| color/material/glass/raised/edge-reflect | alpha-white-15 | alpha-white-60 | Borde especular: reflejo en la esquina opuesta. |
| color/material/glass/raised/tint-bottom | alpha-midnight-20 | alpha-white-60 | Final del degradado: más oscuro abajo para dar volumen. |
| color/material/glass/raised/tint-top | alpha-white-15 | alpha-white-80 | Inicio del degradado vertical del vidrio tocable (luz desde arriba). Neutro: el tinte verde queda solo para botones glass. |
| color/elevation/panel/inner-top | alpha-white-10 | alpha-white-60 | Luz uniforme y tenue en el canto superior, sin brillo especular. |
| color/elevation/panel/shadow-far | alpha-black-40 | alpha-midnight-20 | Sombra ambiental amplia: más altura que raised. |
| color/elevation/panel/shadow-near | alpha-black-15 | alpha-midnight-5 | Sombra media difusa. Sin sombra de contacto: el panel no se presiona. |
| color/material/glass/panel/border | alpha-white-10 | alpha-midnight-10 | Borde uniforme del panel, sin brillo direccional. |
| color/material/glass/panel/fill | alpha-white-10 | alpha-white-80 | Relleno plano del panel: mismo valor que color/surface/glass. Sin degradado, no sugiere volumen presionable. |
| color/elevation/overlay/inner-top | alpha-white-10 | alpha-white-10 | Línea de luz en el canto superior de lo que flota. |
| color/elevation/overlay/shadow-far | alpha-black-40 | alpha-midnight-20 | Sombra lejana: separa la capa flotante de todo lo de atrás. |
| color/elevation/overlay/shadow-near | alpha-black-25 | alpha-midnight-10 | Sombra cercana de modales, hojas y menús. |

**Numéricos**

| Token numérico | Raised | Panel | Overlay | Scrim |
|---|---|---|---|---|
| elevation/{nivel}/glass-blur | 20 | 24 | — | 24 |
| elevation/{nivel}/near-y | 2 | 6 | 1 | — |
| elevation/{nivel}/near-blur | 4 | 16 | 8 | — |
| elevation/{nivel}/far-y | 16 | 24 | 20 | — |
| elevation/{nivel}/far-blur | 40 | 56 | 40 | — |
| elevation/{nivel}/far-spread | −8 | −12 | — | — |
| elevation/{nivel}/inner-top-y | 1 | 1 | 1 | — |
| elevation/{nivel}/inner-top-blur | 1 | — | — | — |
| elevation/{nivel}/inner-bottom-y | −2 | — | — | — |
| elevation/{nivel}/inner-bottom-blur | 6 | — | — | — |

> Cambios respecto a la versión anterior de raised. glass-blur baja de 48 a 20, para que se vea el fondo; near-blur de 8 a 4; far-y de 9 a 16 y far-blur de 24 a 40, con un spread −8 nuevo; inner-bottom pasa de una luz alpha-white-5 a una sombra alpha-black-25 con y −2 y blur 6. Los botones glass heredan estos valores.

### 06 Estilos y código — 8 estilos

> Los estilos ya enlazan los tokens: aplicar el estilo del nivel basta, y cambian solos con el modo. Cada nivel se aplica con su trío completo.

| Estilo | Tipo | Qué lleva |
|---|---|---|
| elevation/raised | Efecto | Desenfoque 20, sombra de contacto, sombra lejana, línea de luz arriba y sombra interior abajo |
| material/glass/raised | Relleno | Degradado vertical tint-top → tint-bottom |
| material/glass/raised-edge | Borde | Degradado especular, 1 px interior |
| elevation/panel | Efecto | Desenfoque 24, sombra difusa, sombra lejana amplia y línea de luz arriba |
| material/glass/panel | Relleno | Sólido, igual que surface/glass |
| material/glass/panel-border | Borde | Sólido, 1 px interior |
| elevation/overlay | Efecto | Dos sombras y línea de luz arriba; relleno surface/overlay y borde border/subtle |
| blur/scrim | Efecto | Desenfoque 24 detrás de un modal u hoja |

> En código (web). backdrop-filter: blur() para el desenfoque; un solo box-shadow con las capas del nivel, usando inset para los brillos interiores; el borde en degradado con un pseudo-elemento y una máscara. Todo sale de los tokens de esta página.

> En iOS nativo. Si la app usa el material del sistema, estos tokens documentan la intención (qué se toca, qué contiene, a qué altura está) y no el valor exacto en píxeles.

> Glass sobre fotos o mapas. Los contrastes se miden con el vidrio sobre la base. Si una tarjeta cae sobre una foto clara o un mapa, debajo va alpha-midnight-40 (o un degradado con alpha-midnight-60).

**Decisiones / pendientes declarados:** light queda como reserva, sin implementar ni validar «hasta que haga falta». No hay otros pendientes explícitos.

---

## 2. Índice de tokens

Colección **Semantic** (modos `light`, `dark`; 110 variables en total, de las cuales 40 pertenecen a Elevación). Los de color son alias a la colección Primitives (se muestra la ruta del primitivo, p. ej. `alpha/black/25`; no se consultó su hex). Los numéricos son `FLOAT` literales, iguales en dark y light.

### 2.1 Color — elevación (17 variables, tipo COLOR)

| Token | Alias dark | Alias light | Descripción en Figma |
|---|---|---|---|
| color/elevation/raised/shadow-near | alpha/black/25 | alpha/midnight/10 | Sombra de contacto. Pega la tarjeta a la superficie y comunica que se puede presionar. |
| color/elevation/raised/shadow-far | alpha/black/40 | alpha/midnight/20 | Sombra ambiental. Hace flotar la tarjeta. Antes: midnight/10 · black/35 |
| color/elevation/raised/inner-top | alpha/white/30 | alpha/white/30 | Línea de luz en el canto superior. |
| color/elevation/raised/inner-bottom | alpha/black/25 | alpha/midnight/5 | Sombra interior en la base: da volumen convexo. Antes: white/5 |
| color/elevation/panel/shadow-near | alpha/black/15 | alpha/midnight/5 | Sombra media difusa. Sin sombra de contacto: el panel no se presiona. |
| color/elevation/panel/shadow-far | alpha/black/40 | alpha/midnight/20 | Sombra ambiental amplia: más altura que raised. |
| color/elevation/panel/inner-top | alpha/white/10 | alpha/white/60 | Luz uniforme y tenue en el canto superior, sin brillo especular. |
| color/elevation/overlay/shadow-near | alpha/black/25 | alpha/midnight/10 | Sombra cercana de modales, hojas y menús. |
| color/elevation/overlay/shadow-far | alpha/black/40 | alpha/midnight/20 | Sombra lejana: separa la capa flotante de todo lo de atrás. |
| color/elevation/overlay/inner-top | alpha/white/10 | alpha/white/10 | Línea de luz en el canto superior de lo que flota. |
| color/material/glass/raised/tint-top | alpha/white/15 | alpha/white/80 | Inicio del degradado vertical del vidrio tocable (luz desde arriba). Neutro: el tinte verde queda solo para botones glass. |
| color/material/glass/raised/tint-bottom | alpha/midnight/20 | alpha/white/60 | Final del degradado: más oscuro abajo para dar volumen. |
| color/material/glass/raised/edge-highlight | alpha/white/60 | static/white | Borde especular: esquina iluminada (arriba izquierda). |
| color/material/glass/raised/edge-mid | alpha/white/5 | alpha/white/30 | Borde especular: tramo central casi invisible. |
| color/material/glass/raised/edge-reflect | alpha/white/15 | alpha/white/60 | Borde especular: reflejo en la esquina opuesta. |
| color/material/glass/panel/fill | alpha/white/10 | alpha/white/80 | Relleno plano del panel: mismo valor que color/surface/glass. Sin degradado, no sugiere volumen presionable. |
| color/material/glass/panel/border | alpha/white/10 | alpha/midnight/10 | Borde uniforme del panel, sin brillo direccional. |

(Son 10 `color/elevation/*` + 7 `color/material/glass/*` = 17.)

### 2.2 Numéricos — elevación (23 variables, tipo FLOAT; dark = light)

| Token | Valor | Descripción en Figma |
|---|---|---|
| elevation/raised/glass-blur | 20 | Desenfoque de fondo del vidrio. Antes: 48 |
| elevation/raised/near-y | 2 | |
| elevation/raised/near-blur | 4 | Antes: 8 |
| elevation/raised/far-y | 16 | Antes: 9 |
| elevation/raised/far-blur | 40 | Antes: 24 |
| elevation/raised/far-spread | −8 | Negativo para que la sombra quede bajo la tarjeta y no asome por los lados. |
| elevation/raised/inner-top-y | 1 | |
| elevation/raised/inner-top-blur | 1 | |
| elevation/raised/inner-bottom-y | −2 | Antes: -1 |
| elevation/raised/inner-bottom-blur | 6 | |
| elevation/panel/glass-blur | 24 | Más esmerilado que raised: se lee como material, no como botón. |
| elevation/panel/near-y | 6 | |
| elevation/panel/near-blur | 16 | |
| elevation/panel/far-y | 24 | |
| elevation/panel/far-blur | 56 | |
| elevation/panel/far-spread | −12 | |
| elevation/panel/inner-top-y | 1 | |
| elevation/overlay/near-y | 1 | |
| elevation/overlay/near-blur | 8 | |
| elevation/overlay/far-y | 20 | |
| elevation/overlay/far-blur | 40 | |
| elevation/overlay/inner-top-y | 1 | |
| elevation/scrim/glass-blur | 24 | |

### 2.3 Tokens relacionados citados por la página (fuera de los 40)

| Token | Alias dark | Alias light |
|---|---|---|
| color/surface/glass | alpha/white/10 | alpha/white/80 |
| color/surface/glass-strong | alpha/white/15 | static/white |
| color/surface/overlay | midnight/950 | static/white |
| color/surface/scrim | alpha/midnight/60 | alpha/midnight/40 |
| color/border/subtle | alpha/white/10 | alpha/midnight/10 |

### 2.4 Estilos locales (8)

Efectos (4), con valores de Figma: `elevation/raised` (blur de fondo 20; sombras y 2/blur 4, y 16/blur 40/spread −8; interiores y 1/blur 1, y −2/blur 6), `elevation/panel` (blur 24; y 6/blur 16, y 24/blur 56/spread −12; interior y 1/blur 0), `elevation/overlay` (y 1/blur 8, y 20/blur 40; interior y 1/blur 0), `blur/scrim` (blur de fondo 24).
Rellenos/bordes (4): `material/glass/raised`, `material/glass/raised-edge`, `material/glass/panel`, `material/glass/panel-border`.

---

## 3. Reglas para la IA

1. Usa solo cuatro niveles: plano (sin token), `elevation/raised`, `elevation/panel`, `elevation/overlay`. No inventes sombras nuevas ni más oscuras.
2. Aplica siempre el trío completo del nivel (efecto + relleno + borde); nunca mezcles el relleno de un nivel con la sombra de otro.
3. Elemento entero que se presiona (lleva chevron o abre/ejecuta algo) → raised. Contenedor que agrupa datos o controles sueltos → panel. Capa que aparece encima y pide atención (modal, hoja, menú, tooltip) → overlay.
4. Nunca pongas raised a algo que no se toca. No anides raised dentro de raised; un botón raised dentro de un panel sí es válido.
5. Si no se toca y no necesita agruparse, va plano. Ante la duda, sube de nivel solo si cambia lo que el usuario puede hacer.
6. Detrás de un overlay usa `color/surface/scrim` con `blur/scrim` (`elevation/scrim/glass-blur` = 24).
7. Si el vidrio cae sobre una foto o mapa claro, pon debajo `alpha-midnight-40` (o degradado con `alpha-midnight-60`).
8. Implementa en dark: es el único modo en uso. No implementes ni valides light hasta que se pida.
9. En código web: `backdrop-filter: blur()` para el desenfoque, un solo `box-shadow` con las capas del nivel (inset para brillos interiores) y el borde en degradado con pseudo-elemento y máscara. No uses el efecto Glass nativo de Figma en diseños para desarrollo.
10. En iOS nativo con material del sistema, los tokens documentan la intención, no el valor exacto en píxeles.

---

## 4. Inconsistencias

Las variables son la fuente de verdad.

- **Valores:** las tablas de la página (17 de color en dark y light, 23 numéricos y 8 estilos) coinciden con las variables y estilos de Figma. No hay diferencias de valor.
- **Notación:** la página escribe los primitivos con guion (`alpha-white-10`); en las variables son rutas con barra (`alpha/white/10`, `static/white`). Es solo notación.
- **Raised en dark:** `inner-bottom` baja de `white/5` a `black/25` y `shadow-far` de `midnight/10 · black/35` a `black/40`. Figma lo guarda como descripción «Antes: …»; la página solo documenta el cambio de inner-bottom (no el de shadow-far).
- **Nombre sin nivel propio:** `elevation/scrim/glass-blur` existe como token numérico y la página lo lista como columna «Scrim», pero Scrim no es uno de los 4 niveles.
- **Overlay sin relleno ni borde propios:** no hay tokens `color/material/glass/overlay/*`; el relleno y el borde de overlay salen de `color/surface/overlay` y `color/border/subtle`, no de los 40 tokens de esta página. Light de `color/surface/overlay` es `static/white` mientras dark es `midnight/950`.
- **Referencia cruzada no verificada:** la nota «Esta página manda: si un valor no coincide con Color semántico · 07 Elevación» remite a otra sección que no se comparó aquí.

## 5. Elementos no leídos

Se leyeron los 259 textos del frame «Elevación»; no hay secciones ilegibles. No se consultó el valor hexadecimal de los primitivos (solo el alias). No se verificó que «los botones glass heredan estos valores» (afirmación sobre otros componentes).
