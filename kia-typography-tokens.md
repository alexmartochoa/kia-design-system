# KIA App · Typography — criterio de diseño y tokens

- **Fuente:** archivo de Figma `FoundatiosKia` (fileKey `FCrL9DSEDaT0EgGg5y3aJ5`), página **Typography**, frame `Typography — Kia App`.
- **Fecha de lectura:** 2026-10-26.
- **Colección de variables:** `Typography` (1 modo: `Default`, 40 variables). Además, 25 estilos de texto locales `text/*` enlazados a esas variables.
- **Fuente de verdad:** las variables y los estilos de texto de Figma. Este documento captura el *criterio* de uso; los valores también están en el JSON de tokens.

---

## 1. Documentación de la página (texto original)

### Introducción

KIA usa una sola familia, Kia Signature, en iOS, Android y web, con tres pesos: Light, Regular y Bold. El código y los identificadores usan IBM Plex Mono. No hay itálicas ni pesos intermedios, así que la jerarquía se construye con tamaño, peso y color, en ese orden.

### 01 Principios

Cada peso tiene un trabajo y no se solapan.

| Peso | Trabajo |
|---|---|
| **Regular · 400** | Para leer: cuerpo, descripciones, valores, etiquetas. |
| **Bold · 600** | Para jerarquía y acción: títulos, botones, tab activa, overlines, cifras destacadas. |
| **Light · 300** | Peso de marca, solo a 24 px o más: nombre del modelo, porcentaje de batería, saludo hero. Por debajo pierde contraste, sobre todo en fondo oscuro. |

Cuando algo pequeño necesita quedar en segundo plano, se baja el color, no el peso. Un texto de 14 px en Regular con color secundario se lee mejor que el mismo texto en Light.

Se elige el estilo por su trabajo, no por cómo se ve. Si un texto es el título de la pantalla es heading/lg aunque sea corto; si es un párrafo es body/md aunque sea importante. La fuente viene espaciada de forma generosa, por eso los títulos llevan tracking negativo y el cuerpo va en 0: no se ajusta a mano.

Respecto a bDS: desaparece la capa de plataforma (ya no hay SF Pro ni Roboto), los roles title, label y link se absorben en heading y body, y aparecen dos estilos en Light.

### 02 La escala a simple vista

Ocho tamaños, del 32 al 10. El tamaño no cambia con la pantalla: KIA es una app y no hay modos responsive. Los interlineados son múltiplos de 4 para encajar en la retícula de espaciado. Cada fila es un estilo de texto del archivo (text/*), enlazado a las variables de la colección Typography.

| Estilo | Especificación (tal como figura en la página) | Ejemplo en la página |
|---|---|---|
| text/display/lg | 32 / 40 · Kia Signature Bold · −2 % | 78 % |
| text/display/lg-light | 32 / 40 · Kia Signature Light · −2 % | EV2 |
| text/heading/lg | 24 / 32 · Kia Signature Bold · −1 % | Mis servicios |
| text/heading/lg-light | 24 / 32 · Kia Signature Light · −1 % | Hola, Alejandro |
| text/heading/md | 20 / 28 · Kia Signature Bold · −1 % | Elige el taller |
| text/heading/sm | 18 / 24 · Kia Signature Bold · −1 % | Revisión anual |
| text/body/lg/default | 16 / 24 · Kia Signature Regular · 0 % | Tu próxima revisión es el 14 de noviembre. |
| text/body/lg/strong | 16 / 24 · Kia Signature Bold · 0 % | Agendar cita |
| text/body/md/default | 14 / 20 · Kia Signature Regular · 0 % | Tu próxima revisión es el 14 de noviembre. |
| text/body/md/strong | 14 / 20 · Kia Signature Bold · 0 % | 14 de noviembre |
| text/body/sm/default | 12 / 16 · Kia Signature Regular · 0 % | Orden #BO-10234 · KIA Bogotá Norte |
| text/body/sm/strong | 12 / 16 · Kia Signature Bold · 0 % | Pendiente |
| text/caption/sm/default | 10 / 16 · Kia Signature Regular · +1,5 % | Placa · Actualizado hace 2 h |
| text/caption/sm/strong | 10 / 16 · Kia Signature Bold · +1,5 % | Inicio |
| text/overline/default | 10 / 16 · Kia Signature Bold · +8 % | Orden de servicio |
| text/amount/hero | 32 / 40 · Kia Signature Bold · −2 % | 32 |
| text/amount/lg | 24 / 32 · Kia Signature Bold · −1 % | 31 |
| text/amount/md | 16 / 24 · Kia Signature Regular · 0 % | 24.380 |
| text/amount/sm | 14 / 20 · Kia Signature Regular · 0 % | $ 189.000 |
| text/unit/md | 14 / 20 · Kia Signature Bold · 0 % | psi |
| text/unit/sm | 12 / 16 · Kia Signature Bold · 0 % | km |
| text/otp/default | 24 / 32 · Kia Signature Bold · +8 % | 482915 |
| text/code/md | 16 / 24 · IBM Plex Mono Regular · 0 % | KNAE35LC9M6012345 |
| text/code/sm | 14 / 20 · IBM Plex Mono Regular · 0 % | KNAE35LC9M6012345 |
| text/code/xs | 12 / 16 · IBM Plex Mono Regular · 0 % | KNAE35LC9M6012345 |

**Tres límites que la escala lleva dentro**

- El cuerpo nunca baja de 12 px. Si un texto se lee, es body/sm como mínimo.
- 10 px solo en caption, overline y tab bar. Nunca para información que la persona necesita para decidir.
- Light solo a 24 y 32. No existe heading/md/light ni nada más pequeño en Light.

Tracking: display y amount/hero a −2 %, heading y amount/lg a −1 %, cuerpo a 0, caption a +1,5 %, overline y otp a +8 %. Ya está dentro de cada estilo; no se toca.

### 03 Cuándo usar cada rol

Nueve roles. Cada uno tiene un trabajo, un ejemplo real de KIA y una cosa que no se hace con él.

| Rol | Para qué | Ejemplo en KIA | No se hace |
|---|---|---|---|
| **display** — lg · lg-light | Lo más grande y expresivo de la pantalla. Bold para contadores y KPIs; Light para el nombre del modelo y el saludo. | EV2 · 78 % · Hola, Alejandro | Usarlo como título de una pantalla operativa: ahí va heading. Más de un display por pantalla. |
| **heading** — lg · lg-light · md · sm | Títulos. lg es el título de la pantalla o del modal, md el de una sección, sm el de una tarjeta o cabecera. | Mis servicios · Elige el taller · Revisión anual | Saltar niveles: una pantalla tiene un solo heading/lg. Usar heading/sm como texto de lectura. |
| **body** — lg · md · sm × default · strong | Todo lo que se lee. lg para datos principales, botones e inputs; md para el texto base; sm para metadatos y filas de detalle. strong resalta una palabra o el valor de una fila. | Tu próxima revisión es el 14 de noviembre. · Orden #BO-10234 | Agrandar body para simular un título. Poner una frase entera en strong. |
| **caption** — sm · default · strong | Etiquetas de campo, tab bar, ayudas y fechas. Siempre en color secundario; strong para la tab activa. | Placa · Actualizado hace 2 h | Información que la persona necesita para decidir. Más de una línea. |
| **overline** — default | Antetítulo en mayúsculas sobre un título o un grupo. Siempre acompaña a algo. | ORDEN DE SERVICIO · DOCUMENTO OFICIAL | Usarlo como título. Párrafos en mayúsculas. |
| **amount** — hero · lg · md · sm | Cifras con unidad: presión de neumáticos, kilómetros, precios. hero en la tarjeta del vehículo, lg por rueda, md en fila, sm en lista. | 32 psi · 1.250 km · $ 189.000 | Cortar una cifra con puntos suspensivos. Mezclar tamaños dentro de la misma cifra. |
| **unit** — md · sm | La unidad junto a la cifra. Siempre Bold, siempre al lado de un amount. md con hero y lg, sm con md y sm. | psi · bar · km · % | Usar unit solo, sin cifra. Usarlo para dinero: el símbolo va dentro del amount. |
| **otp** — default | Los dígitos de una clave de un solo uso, una caja por dígito. | 4 8 2 9 1 5 | Usarlo fuera del campo OTP. |
| **code** — md · sm · xs | Identificadores que la persona copia o compara: VIN, placa, número de orden largo. IBM Plex Mono: el ancho parejo evita confundir 0 con O y 1 con l. | KNAE35LC9M6012345 | Usarlo en texto de lectura o en títulos. |

Los roles title, label y link de bDS no existen en KIA. Un título de tarjeta es heading/sm; el texto de un botón es body/lg/strong; una etiqueta de campo es caption/sm; un enlace es body del mismo tamaño en strong con color de enlace y, dentro de un párrafo, subrayado.

### 04 Dónde: estilo por componente

La pregunta de cada día: "¿qué estilo lleva esto?". Si un componente no aparece, se busca el más parecido por función, no por tamaño.

| Componente | Elemento | Estilo | Color |
|---|---|---|---|
| Barra de navegación | Título de pantalla | heading/lg | primario |
| Barra de navegación | Acción de texto ("Cerrar", "Listo") | body/lg/strong | enlace |
| Tab bar | Label de tab activa | caption/sm/strong | primario |
| Tab bar | Label de tab inactiva | caption/sm/default | secundario |
| Tarjeta del vehículo | Nombre del modelo | display/lg-light | primario |
| Tarjeta del vehículo | Batería o autonomía | display/lg + unit/md | primario |
| Tarjeta de neumáticos | Presión destacada | amount/hero + unit/md | primario |
| Tarjeta de neumáticos | Presión por rueda | amount/lg + unit/md | primario |
| Tarjeta | Título | heading/sm | primario |
| Tarjeta | Descripción | body/md/default | secundario |
| Tarjeta | Antetítulo | overline/default | secundario |
| Botón primario y secundario | Texto | body/lg/strong | según variante |
| Botón pequeño o chip | Texto | body/md/strong | según variante |
| Input | Etiqueta de campo | caption/sm/default | secundario |
| Input | Valor y placeholder | body/lg/default | primario · terciario |
| Input | Mensaje de ayuda o error | body/sm/default | secundario · error |
| Lista | Título de fila | body/lg/default | primario |
| Lista | Subtítulo o metadato | body/sm/default | secundario |
| Lista | Valor a la derecha (precio, km) | amount/sm + unit/sm, alineado a la derecha | primario |
| Lista | Valor destacado | body/md/strong | primario |
| Sección | Título de sección | heading/md | primario |
| Modal y bottom sheet | Título | heading/lg | primario |
| Modal y bottom sheet | Cuerpo | body/md/default | secundario |
| Toast y snackbar | Mensaje | body/md/default | sobre fondo oscuro |
| Badge y contador | Número | body/sm/strong | según estado |
| Estado vacío | Título | heading/md | primario |
| Estado vacío | Explicación | body/md/default | secundario |
| Documento oficial | Antetítulo | overline/default | secundario |
| Campo OTP | Dígitos | otp/default | primario |
| Ficha técnica | VIN, placa | code/md | primario |
| Pie legal | Nota | body/sm/default | terciario |

Dos reglas transversales: el texto de un botón siempre es Bold, nunca Regular, y la tab activa se distingue por peso y color a la vez, no solo por color.

### 05 Cómo combinar

- **Jerarquía con color, no con peso.** Entre dos textos del mismo tamaño, el principal va en color primario y el secundario en color secundario. El peso se reserva para lo que de verdad manda: títulos, botones, cifras. Si todo es Bold, nada lo es.
- **Un solo nivel de énfasis.** Dentro de un párrafo se resalta con strong una palabra o un dato, no una frase. Nunca se combinan strong, mayúsculas y color en la misma palabra.
- **Mayúsculas solo en overline.** Nunca en títulos, botones ni párrafos. El overline ya trae el tracking de +8 % que las mayúsculas pequeñas necesitan.
- **Enlaces.** Dentro de un párrafo: body/*/strong, color de enlace y subrayado (WCAG 1.4.1). Aislado, como "Ver todos": body/md/strong con color de enlace y sin subrayado. Un enlace nunca es la acción principal: eso es un botón.
- **Light y Bold no van juntos en la misma línea.** El contraste entre 300 y 600 es demasiado fuerte. Junto a display/lg-light va body Regular o amount con color secundario.
- **Cifra y unidad.** Siempre juntas, la cifra en amount y la unidad en unit, con un espacio y alineadas por la línea base. amount/hero con unit/md, amount/md con unit/sm.
- **Una pantalla, un heading/lg.** Debajo, heading/md para secciones y heading/sm para tarjetas. Si una pantalla no tiene secciones, las tarjetas llevan heading/sm igual.
- **Textos largos.** Kia Signature es más ancha que Roboto: se prueba con el texto real más largo, no con "Lorem ipsum". Se trunca con puntos suspensivos solo en texto de lectura, nunca en cifras ni identificadores.

### 06 Números y unidades

Kia Signature no trae numerales tabulares: cada dígito tiene un ancho distinto y el "1" deja mucho aire a la derecha. Eso afecta a tres sitios de KIA y cada uno tiene su regla.

- **Presión de neumáticos y cifras que cambian en vivo.** La cifra va en amount/hero o amount/lg y la unidad en unit/md. El componente reserva un ancho mínimo por dígito para que "32 psi" y "31 psi" no muevan la unidad de sitio. Las cuatro ruedas comparten el mismo ancho de cifra.
- **Columnas de números.** Precios, kilómetros y fechas en una lista o en el detalle de la orden se alinean a la derecha, siempre.
- **OTP.** otp/default con una caja por dígito. La caja fija el ancho, así que el espaciado desigual de los dígitos no se nota.
- **Identificadores.** VIN, placa y cualquier código que la persona copie o compare van en code/* (IBM Plex Mono). En Kia Signature la "I", la "l" y el "1" son casi iguales.
- **Formato.** Punto para los miles, coma para los decimales, un espacio entre cifra y unidad: 1.250 km · 32 psi · 2,4 bar · 78 %. El dinero lleva el símbolo dentro del amount, no en unit: $ 189.000. Si el producto se lanza en más de un país, se confirma con cada mercado.

| Qué | Estilo | Ejemplo |
|---|---|---|
| Presión destacada | amount/hero + unit/md | 32 psi |
| Presión por rueda | amount/lg + unit/md | 31 psi |
| Batería | display/lg + unit/md | 78 % |
| Kilometraje en ficha | amount/md + unit/sm | 24.380 km |
| Precio en lista | amount/sm, alineado a la derecha | $ 189.000 |
| Fecha en texto | body/md/default | 14 de noviembre de 2026 |
| Fecha corta | body/sm/default | 14/11/2026 |
| Hora | body/sm/default | 14:30 |
| Clave de un solo uso | otp/default | 4 8 2 9 1 5 |
| VIN | code/md | KNAE35LC9M6012345 |

### 07 Accesibilidad

**Escalado del texto del teléfono.** Al dejar SF Pro y Roboto se pierde el escalado automático, y KIA lo implementa de forma explícita: en iOS cada estilo va envuelto en UIFontMetrics sobre su estilo Dynamic Type equivalente; en Android, tamaños e interlineados en sp. Toda pantalla se prueba al 150 % y al 200 % de texto, y ningún contenedor de texto tiene alto fijo.

| Estilo de KIA | Dynamic Type (iOS) | Escala |
|---|---|---|
| display/lg · amount/hero | .largeTitle | Con tope: no pasa del 130 % |
| heading/lg · amount/lg · otp | .title1 | Con tope: no pasa del 130 % |
| heading/md | .title2 | Sin tope |
| heading/sm | .title3 | Sin tope |
| body/lg/* · amount/md · code/md | .headline · .body | Sin tope |
| body/md/* · amount/sm · unit/md · code/sm | .subheadline | Sin tope |
| body/sm/* · unit/sm · code/xs | .footnote | Sin tope |
| caption/sm/* · overline | .caption2 | Sin tope |

**Contraste.** Light tiene un trazo fino y pierde contraste en modo oscuro y sobre fondos de color; por eso solo existe a 24 y 32 px. Regular a 10 px (caption) necesita contraste 4,5:1 igual que el cuerpo. El Bold real de la fuente es un 600: no se compensa con un peso falso ni con sombra.

**Tamaño mínimo.** 12 px para cualquier cosa que se lea; 10 px solo en etiquetas y antetítulos. Se comprueba en un Android de gama baja antes de cerrar un componente.

**Color solo no basta.** La tab activa, el enlace dentro de un párrafo y la salida de dinero se marcan también con peso, subrayado o signo.

**Mayúsculas.** Los lectores de pantalla leen bien los overlines cortos; un párrafo en mayúsculas puede leerse letra a letra.

### 08 Lo que no se hace

Los errores que más se repiten al migrar desde SF Pro y Roboto, y cómo se corrigen.

| No se hace | Por qué | Se hace |
|---|---|---|
| Light por debajo de 24 px | Pierde contraste, sobre todo en fondo oscuro | body Regular con color secundario |
| Agrandar body para simular un título | Rompe la jerarquía y el ritmo de interlineado | heading/sm o heading/md |
| Un Bold "más fuerte" con peso 700 | La fuente solo trae 600; el sistema fabrica una negrita sintética | Aceptar el 600; la jerarquía la da el tamaño |
| Ajustar el tracking a mano en un título | Ya va en el estilo (−2 % y −1 %) | Usar el estilo tal cual |
| Apretar el cuerpo con tracking negativo | A 14–16 px se ve apretado | Cuerpo siempre a 0 |
| Títulos o botones en mayúsculas | Gritan y se leen peor | Mayúsculas solo en overline |
| Más de un heading/lg por pantalla | Dos títulos de pantalla compiten | Uno; el resto son heading/md |
| Enlace solo por color dentro de un párrafo | No cumple WCAG 1.4.1 | Strong + color de enlace + subrayado |
| Cifra y unidad del mismo tamaño y peso | No se distingue qué es dato y qué es unidad | amount + unit, la unidad más pequeña y Bold |
| Centrar una columna de precios | Los dígitos miden distinto y bailan | Alinear a la derecha |
| Cortar una cifra o un identificador con puntos suspensivos | Deja de significar algo | Reducir un paso de tamaño o pasar a dos líneas |
| VIN o placa en Kia Signature | "I", "l" y "1" se confunden | code/* en IBM Plex Mono |
| Titular con "Tó", "Tú", "Té", "Vó" o "Yó" sin revisar | La fuente no tiene kerning en vocales minúsculas con tilde | Revisar a mano en display y heading/lg |
| Probar con "Lorem ipsum" | Kia Signature es más ancha que Roboto; lo que cabía ya no cabe | Probar con el texto real más largo |
| Alto fijo en un contenedor de texto | Con texto ampliado se corta | Alto automático y pruebas al 200 % |
| Un estilo nuevo "solo para esta pantalla" | Vuelven los 71 estilos de hoy | Elegir el más cercano por función; si falta de verdad, proponerlo al DS |

### 09 Referencia de tokens

Variables de la colección Typography. Los estilos de texto text/* las usan para familia, peso, tamaño e interlineado. El tracking va en % dentro de cada estilo porque Figma aplica las variables de tracking en px; las variables font/letter-spacing/* quedan como referencia para código y no aparecen en los selectores.

*(La tabla de esta sección de la página coincide con las variables; se reproduce íntegra en el índice de tokens de abajo.)*

---

## 2. Índice de tokens

### 2.1 Colección `Typography` — variables (modo único `Default`)

No hay modos adicionales. Solo las 4 variables `font/style/*` son alias; el resto son valores directos.

#### font/family

| Token | Tipo | Alias | Valor | Descripción |
|---|---|---|---|---|
| font/family/text | STRING | — | Kia Signature | Cuerpo, etiquetas y datos |
| font/family/display | STRING | — | Kia Signature | Títulos y cifras grandes |
| font/family/mono | STRING | — | IBM Plex Mono | Solo text/code/* |

#### font/weight (primitivos de peso)

| Token | Tipo | Alias | Valor | Descripción |
|---|---|---|---|---|
| font/weight/light | STRING | — | Light | 300 |
| font/weight/regular | STRING | — | Regular | 400 |
| font/weight/bold | STRING | — | Bold | 600 — peso real del archivo |

#### font/style (semánticos de peso)

| Token | Tipo | Alias | Valor resuelto | Descripción |
|---|---|---|---|---|
| font/style/light | STRING | → font/weight/light | Light | Peso de marca, solo a 24 px o más |
| font/style/regular | STRING | → font/weight/regular | Regular | Lectura |
| font/style/emphasis | STRING | → font/weight/bold | Bold | Jerarquía y acción |
| font/style/bold | STRING | → font/weight/bold | Bold | Solo text/unit/* |

#### font/size (px)

| Token | Tipo | Valor | Descripción |
|---|---|---|---|
| font/size/display/lg | FLOAT | 32 | — |
| font/size/heading/lg | FLOAT | 24 | — |
| font/size/heading/md | FLOAT | 20 | — |
| font/size/heading/sm | FLOAT | 18 | — |
| font/size/body/lg | FLOAT | 16 | — |
| font/size/body/md | FLOAT | 14 | — |
| font/size/body/sm | FLOAT | 12 | — |
| font/size/caption/sm | FLOAT | 10 | — |
| font/size/overline | FLOAT | 10 | — |
| font/size/amount/hero | FLOAT | 32 | — |
| font/size/amount/lg | FLOAT | 24 | — |
| font/size/amount/md | FLOAT | 16 | — |
| font/size/amount/sm | FLOAT | 14 | — |
| font/size/unit/md | FLOAT | 14 | — |
| font/size/unit/sm | FLOAT | 12 | — |
| font/size/otp | FLOAT | 24 | — |
| font/size/code/md | FLOAT | 16 | — |
| font/size/code/sm | FLOAT | 14 | — |
| font/size/code/xs | FLOAT | 12 | — |

#### font/line-height (px)

| Token | Tipo | Valor | Descripción |
|---|---|---|---|
| font/line-height/16 | FLOAT | 16 | — |
| font/line-height/20 | FLOAT | 20 | — |
| font/line-height/24 | FLOAT | 24 | — |
| font/line-height/28 | FLOAT | 28 | — |
| font/line-height/32 | FLOAT | 32 | — |
| font/line-height/40 | FLOAT | 40 | — |

#### font/letter-spacing (%, sin scopes: solo referencia para código)

Todas comparten la coletilla: *"Valor en %. Figma aplica las variables de tracking en px, por eso los estilos de texto llevan el % directo y esta variable es la referencia para código."*

| Token | Tipo | Valor | Descripción |
|---|---|---|---|
| font/letter-spacing/tight | FLOAT | -2 | Display y amount/hero a 32 px |
| font/letter-spacing/snug | FLOAT | -1 | Títulos y cifras de 18 a 24 px |
| font/letter-spacing/none | FLOAT | 0 | Cuerpo |
| font/letter-spacing/loose | FLOAT | 1.5 | Caption a 10 px |
| font/letter-spacing/wide | FLOAT | 8 | Overline y OTP |

### 2.2 Estilos de texto `text/*` — variables enlazadas

Tracking en % fijado dentro del estilo (no enlazado). `textCase` es `ORIGINAL` salvo donde se indica.

| Estilo | Familia → variable | Peso → variable | Tamaño → variable | Interlineado → variable | Tracking | Descripción del estilo |
|---|---|---|---|---|---|---|
| text/display/lg | Kia Signature → family/display | Bold → style/emphasis | 32 → size/display/lg | 40 → line-height/40 | −2 % | Contadores y KPIs grandes |
| text/display/lg-light | Kia Signature → family/display | Light → style/light | 32 → size/display/lg | 40 → line-height/40 | −2 % | Nombre del modelo, % batería, saludo hero |
| text/heading/lg | Kia Signature → family/display | Bold → style/emphasis | 24 → size/heading/lg | 32 → line-height/32 | −1 % | Títulos de pantalla y modales |
| text/heading/lg-light | Kia Signature → family/display | Light → style/light | 24 → size/heading/lg | 32 → line-height/32 | −1 % | Saludo o hero secundario |
| text/heading/md | Kia Signature → family/display | Bold → style/emphasis | 20 → size/heading/md | 28 → line-height/28 | −1 % | Títulos de sección |
| text/heading/sm | Kia Signature → family/display | Bold → style/emphasis | 18 → size/heading/sm | 24 → line-height/24 | −1 % | Títulos de tarjeta y cabecera |
| text/body/lg/default | Kia Signature → family/text | Regular → style/regular | 16 → size/body/lg | 24 → line-height/24 | 0 % | Datos principales, inputs |
| text/body/lg/strong | Kia Signature → family/text | Bold → style/emphasis | 16 → size/body/lg | 24 → line-height/24 | 0 % | Botones, valor destacado |
| text/body/md/default | Kia Signature → family/text | Regular → style/regular | 14 → size/body/md | 20 → line-height/20 | 0 % | Texto base y descripciones |
| text/body/md/strong | Kia Signature → family/text | Bold → style/emphasis | 14 → size/body/md | 20 → line-height/20 | 0 % | Énfasis en cuerpo, valor destacado en fila |
| text/body/sm/default | Kia Signature → family/text | Regular → style/regular | 12 → size/body/sm | 16 → line-height/16 | 0 % | Metadatos, filas de detalle, precios en lista |
| text/body/sm/strong | Kia Signature → family/text | Bold → style/emphasis | 12 → size/body/sm | 16 → line-height/16 | 0 % | Dato destacado en fila |
| text/caption/sm/default | Kia Signature → family/text | Regular → style/regular | 10 → size/caption/sm | 16 → line-height/16 | +1,5 % | Etiquetas de campo, tab bar inactiva |
| text/caption/sm/strong | Kia Signature → family/text | Bold → style/emphasis | 10 → size/caption/sm | 16 → line-height/16 | +1,5 % | Tab bar activa, ayuda destacada |
| text/overline/default | Kia Signature → family/text | Bold → style/emphasis | 10 → size/overline | 16 → line-height/16 | +8 % · **UPPER** | Antetítulo en mayúsculas |
| text/amount/hero | Kia Signature → family/display | Bold → style/emphasis | 32 → size/amount/hero | 40 → line-height/40 | −2 % | Presión del neumático en la tarjeta del vehículo |
| text/amount/lg | Kia Signature → family/display | Bold → style/emphasis | 24 → size/amount/lg | 32 → line-height/32 | −1 % | Presión por rueda |
| text/amount/md | Kia Signature → family/text | Regular → style/regular | 16 → size/amount/md | 24 → line-height/24 | 0 % | Cifra en fila o ficha |
| text/amount/sm | Kia Signature → family/text | Regular → style/regular | 14 → size/amount/sm | 20 → line-height/20 | 0 % | Cifra en lista |
| text/unit/md | Kia Signature → family/text | Bold → style/bold | 14 → size/unit/md | 20 → line-height/20 | 0 % | Unidad junto a amount hero y lg |
| text/unit/sm | Kia Signature → family/text | Bold → style/bold | 12 → size/unit/sm | 16 → line-height/16 | 0 % | Unidad junto a amount md y sm |
| text/otp/default | Kia Signature → family/text | Bold → style/emphasis | 24 → size/otp | 32 → line-height/32 | +8 % | Clave de un solo uso, un dígito por caja |
| text/code/md | IBM Plex Mono → family/mono | Regular → style/regular | 16 → size/code/md | 24 → line-height/24 | 0 % | Código e identificadores (VIN) |
| text/code/sm | IBM Plex Mono → family/mono | Regular → style/regular | 14 → size/code/sm | 20 → line-height/20 | 0 % | Código en fila |
| text/code/xs | IBM Plex Mono → family/mono | Regular → style/regular | 12 → size/code/xs | 16 → line-height/16 | 0 % | Código en metadatos |

---

## 3. Reglas para la IA

1. **Elige el estilo por función, nunca por tamaño.** Título de pantalla/modal → `text/heading/lg`; sección → `heading/md`; tarjeta → `heading/sm`; párrafo → `body/md/default`. Si un componente no está en la tabla de la sección 04, usa el más parecido por función.
2. **Usa siempre un estilo `text/*` completo**; no compongas familia, peso, tamaño ni tracking sueltos ni ajustes el tracking a mano. Nunca crees un estilo nuevo "para esta pantalla".
3. **Jerarquía secundaria = color, no peso.** Para bajar protagonismo usa color secundario/terciario con Regular. Nunca uses Light por debajo de 24 px (solo existen `display/lg-light` y `heading/lg-light`), y nunca pongas Light y Bold en la misma línea.
4. **Límites de tamaño:** nada que se lea por debajo de 12 px (`body/sm`). 10 px (`caption`, `overline`) solo para etiquetas, tab bar y antetítulos, nunca para información necesaria para decidir.
5. **Una pantalla = un solo `heading/lg`** y como máximo un `display`.
6. **Botones siempre en Bold:** `body/lg/strong` (normal) o `body/md/strong` (pequeño/chip). Sin mayúsculas: las mayúsculas solo existen en `overline/default`.
7. **Cifras:** número en `amount/*` + unidad en `unit/*` (Bold, más pequeña), con espacio y alineadas a la línea base: `hero`/`lg` → `unit/md`; `md`/`sm` → `unit/sm`. El símbolo de dinero va dentro del amount. Columnas numéricas alineadas a la derecha. Nunca truncar cifras ni identificadores con "…".
8. **Formato es-CO:** punto para miles, coma para decimales, espacio antes de la unidad (`1.250 km`, `2,4 bar`, `$ 189.000`).
9. **Identificadores (VIN, placa, orden larga) → `text/code/*`** (IBM Plex Mono); OTP → `text/otp/default` con una caja por dígito.
10. **Enlaces:** en párrafo `body/*/strong` + color de enlace + subrayado; aislado `body/md/strong` + color de enlace sin subrayado. **Accesibilidad:** escalar con UIFontMetrics (iOS) / sp (Android); sin alto fijo en contenedores de texto; `display/lg`, `amount/hero`, `heading/lg`, `amount/lg` y `otp` con tope del 130 %.

---

## 4. Inconsistencias

Las variables y estilos de Figma son la fuente de verdad. Diferencias detectadas:

1. **Batería: ¿Light o Bold?** La introducción (01, peso Light) dice que Light es para el "porcentaje de batería", y la descripción del estilo `text/display/lg-light` dice "Nombre del modelo, % batería, saludo hero". Pero la tabla por componente (04) y la de formato (06) asignan batería a `display/lg` (Bold) + `unit/md`, y el ejemplo "78 %" de la escala (02) está en `display/lg`. Además, si fuese Light + `unit/md` (Bold) violaría la regla "Light y Bold no van juntos en la misma línea". **Hay que decidir y corregir uno de los dos lados.**
2. **Precios en lista.** La descripción del estilo `text/body/sm/default` incluye "precios en lista", pero la página (04 y 06) dice que el precio en lista es `amount/sm` (14 px). La descripción del estilo parece un resto anterior.
3. **Color del caption.** En 03 el rol caption va "Siempre en color secundario", pero en 04 la tab activa (`caption/sm/strong`) va en color **primario**. Contradicción menor de redacción.
4. **Tabla Dynamic Type incompleta.** No menciona explícitamente `display/lg-light`, `heading/lg-light` ni `caption` vs. `overline` por variante; se infiere que heredan la fila de su estilo base, pero no está escrito.

Sin diferencias de valor: los 40 tokens de la tabla "09 Referencia de tokens" coinciden con las variables en nombre y valor, y las 25 especificaciones de la sección 02 coinciden con los estilos de texto (tamaño, interlineado, peso, tracking).

---

## 5. Verificación de lectura

- **Textos de la página:** 550 nodos de texto en el frame `Typography — Kia App`, 0 ocultos; todos leídos (secciones Header y 01–09). Los ejemplos de muestra de la escala (p. ej. "Mis servicios", "482915") se incluyen en la tabla de la sección 02. No hubo frames ilegibles.
- **Variables:** colección `Typography` = 40 en Figma / 40 en este documento (3 family + 3 weight + 4 style + 19 size + 6 line-height + 5 letter-spacing).
- **Estilos de texto:** 25 `text/*` en Figma / 25 en este documento.
- **Colecciones no incluidas:** `platform` (2 variables: `platform/size/target/min`, `platform/size/field/height`) no es tipográfica; corresponde a Sizing.
