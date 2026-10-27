# Kia — Button (Core components)

- **Archivo de Figma:** KIA Core Componentes (`rVdetvqgPFzRluJ86eTEju`)
- **Página:** Button (frames «Button» = documentación de diseño, «Button · Dev» = contrato de desarrollo)
- **Componente:** component set `Button KIA` (`5:16185`), 105 variantes, ejes `variant`, `appearance`, `size` y `state`
- **Base:** el Button de otro proyecto que estaba en esta página (312 variantes, iOS · Android · web). Se mantuvo el sistema (ejes, propiedades, reglas) y se simplificó para la app de Kia.
- **Fecha de lectura:** 2026-10-26
- **Código:** `src/components/Button/` · Storybook: `Components/Button`

> La acción. Todo lo que el usuario puede hacer en una pantalla pasa por acá: confirmar, cancelar, continuar, borrar. La intención la dice `variant`; el peso, `appearance`. Verde Kia, radio 16 y un vidrio verde para la acción que acompaña a la principal.

### Qué cambió frente a la referencia

| | Referencia | Kia app | Por qué |
|---|---|---|---|
| appearance | fill · soft · outline · ghost · on-inverse | fill · **glass** · outline · ghost | glass ocupa el lugar de soft: es la forma de la app (el vidrio se repite en tarjetas y contenedores). on-inverse no tenía consumidor. |
| size | lg · md · sm · xs | lg · md · sm | xs (24) quedaba a menos de la mitad del mínimo tocable y era para tablas densas, que la app no tiene. |
| state | default · hover · pressed · focus · disabled · loading | default · pressed · focus · disabled · loading | Es una app React Native: no hay puntero, no hay hover. |
| radio | píldora en iOS, 12 en Android y web | 16 en todas (`radius/action`) | Un solo radio para las tres plataformas: el token dejó de dividirse por plataforma. |
| glass | solo iOS | todas | El vidrio es la superficie de Kia, no un detalle de iOS. |
| Matriz | una por plataforma (3 × 104) | una sola (105) | Ninguna diferencia visual depende de la plataforma. |
| Color | `component/button/*` de otra librería | `component/button/*` de FoundatiosKia (27 aliases sobre `color/*`) | Mismo esquema que el Spinner. |

---

## 1. Diseño

### 01 Matriz de variantes (105)

Las columnas son `state`. Las filas son `variant · appearance · size`, anidadas en ese orden. Los bloques separados por más aire son cambios de `appearance`. La matriz se dibuja sobre una escena con manchas de color desenfocadas para que se vea qué toma el vidrio de lo que tiene detrás. Todo en modo dark (la app solo tiene oscuro).

`primary` tiene 4 apariencias × 3 tamaños × 5 estados = 60; `danger` tiene 3 × 3 × 5 = 45, porque no lleva glass.

| size | Alto | Padding horizontal | Texto | Icono | Spinner |
|---|---|---|---|---|---|
| lg | `size/control/height/lg` 56 | `space/inset/lg` 24 | `text/body/lg/strong` | `size/icon/md` 24 | md |
| md | `size/control/height/md` 44 | `space/inset/md` 16 | `text/body/md/strong` | `size/icon/md` 24 | sm |
| sm | `size/control/height/sm` 32 | `space/inline/md` 12 | `text/body/sm/strong` | `size/icon/sm` 16 | sm |

Comunes: radio `radius/action` 16, separación `space/inline/sm` 8, ancho mínimo `size/control/min-width` 64, borde `border/width/default` 1.

Cada pieza se pinta con un token `component/button/*` (alias en Semantic de FoundatiosKia). La tabla da el nombre sin el prefijo `component/button/` y, debajo, el semantic al que apunta.

| variant · appearance | Fondo | Pressed | Borde | Texto e icono |
|---|---|---|---|---|
| primary · fill | `primary/bg` → `color/fill/action/primary/default` | `primary/bg-pressed` → `…/primary/pressed` | — | `primary/text` → `color/text/action/primary/default` |
| primary · glass | degradado `primary-glass/bg` → `primary-glass/bg-end` (`color/fill/action/primary/glass/default` → `…/gradient-end`) | + `primary-glass/bg-pressed` → `color/overlay/state/pressed` | `primary-glass/border` → `color/border/action/primary/glass/default` | `primary-glass/text` → `color/text/action/primary/glass/default` |
| primary · outline | — | `primary-outline/bg-pressed` → `color/fill/action/primary/outline/pressed` | `primary-outline/border` → `color/border/action/primary/outline/default` | `primary-outline/text` → `color/text/action/primary/outline/default` |
| primary · ghost | — | `primary-ghost/bg-pressed` → `color/fill/action/primary/ghost/pressed` | — | `primary-ghost/text` → `color/text/action/primary/ghost/default` |
| danger · fill | `danger/bg` → `color/fill/action/danger/default` | `danger/bg-pressed` → `…/danger/pressed` | — | `danger/text` → `color/text/action/danger/default` |
| danger · outline | — | `danger-outline/bg-pressed` → `color/overlay/state/pressed` | `danger-outline/border` → `color/border/action/danger/outline/default` | `danger-outline/text` → `color/text/action/danger/outline/default` |
| danger · ghost | — | `danger-ghost/bg-pressed` → `color/overlay/state/pressed` | — | `danger-ghost/text` → `color/text/action/danger/ghost/default` |
| disabled (todas) | `disabled/bg` → `color/fill/disabled` (ghost sin fondo) | — | `disabled/border` → `color/border/subtle` si tenía borde | `disabled/text` → `color/text/disabled` |
| focus (todas) | — | — | anillo `focus/ring` → `color/border/focus` | — |
| glass (efectos) | sombra `glass/shadow` → `color/elevation/raised/shadow-near` · brillo `glass/highlight` → `color/elevation/raised/inner-top` | | | |

**El vidrio (glass):** degradado vertical alpha-sage (luz desde arriba) + desenfoque del fondo `elevation/raised/glass-blur` (20) + sombra cercana `glass/shadow` (`near-y` 2, `near-blur` 4) + brillo interior arriba `glass/highlight` (`inner-top-y` 1, `inner-top-blur` 1). Es la receta de Raised de FoundatiosKia con el fondo propio del botón. En disabled el degradado pasa a `disabled/bg` plano y quedan solo el desenfoque y el borde `disabled/border`. En iOS y Android el desenfoque es el `BlurView` de `expo-blur`.

**Focus:** anillo `focus/ring` de `border/width/focus` (2), a 2 px del botón y con radio `radius/focus/action` 20, dibujado por fuera. **Loading:** label e iconos con opacidad 0 (el ancho no cambia) y un Spinner centrado: `on-brand` en fill, `primary` en glass, outline y en el ghost de danger, `brand` en el ghost de primary.

### 02 Ejes de variante (4)

1. **variant** — primary · danger
2. **appearance** — fill · glass · outline · ghost (danger: fill · outline · ghost)
3. **size** — lg · md · sm
4. **state** — default · pressed · focus · disabled · loading

### 03 Propiedades (3)

1. **label** — text · por defecto «Etiqueta»
2. **showLeadingIcon** — boolean · por defecto false (la instancia `leadingIcon` está expuesta para elegir el glifo)
3. **showTrailingIcon** — boolean · por defecto false (ídem `trailingIcon`)

### 04 Cuándo usar cada «appearance» (4)

Las cuatro pesan distinto. En una pantalla se ordenan de mayor a menor, y no conviene poner dos del mismo peso compitiendo por la misma decisión.

1. **fill** — La acción principal de la pantalla, en el verde Kia. Una sola por vista: si hay dos rellenos compitiendo, ninguno se lee como el principal.
2. **glass** — Una acción importante que no es la principal: «Gestionar mi Kia» al lado de «Reservar servicio». Es vidrio verde: toma el tono de lo que tiene detrás, así que funciona igual sobre la base, sobre un mapa o sobre la foto del vehículo. Solo primary.
3. **outline** — Una alternativa clara al lado de la acción principal, como «Cancelar». El contorno blanco la delimita sin sumar otra mancha de color.
4. **ghost** — La de menor peso. Para lo que está siempre disponible y rara vez se usa: volver, ver más, omitir.

### 05 Cuándo usar cada «variant» (2)

La variante dice qué tan grave es lo que va a pasar, no cuánto pesa el botón. Se elige antes que la apariencia.

1. **primary** — Lo que el usuario vino a hacer: reservar, confirmar, pagar. Es la variante por defecto: la jerarquía se baja con la apariencia, no cambiando de variante.
2. **danger** — Borra, desvincula un vehículo o hace algo difícil de deshacer. Nunca como acción principal de un flujo, y nunca en glass: una acción destructiva no se presenta como un botón glass.

### 06 Antes de usarlo

- **Dos ejes independientes:** `variant` dice la intención (primary, danger) y `appearance` la forma (fill, glass, outline, ghost), de más peso a menos. Una acción secundaria no cambia de variante: baja de apariencia.
- **Escala de alto compartida con los campos:** sm 32 · md 44 · lg 56, los mismos `size/control/height/*`, para que un botón y un campo del mismo tamaño midan igual en la misma fila.
- **sm (32) queda bajo el mínimo tocable** (`size/target/min` 48): en código el área la completa el `hitSlop`, no la caja visual. Es para acciones dentro de una tarjeta, nunca para la acción principal.
- **El icono no escala 1:1 con el control:** sm usa `size/icon/sm` (16); md y lg comparten `size/icon/md` (24) porque la escala no tiene paso de 20.
- **El vidrio necesita algo detrás.** Sobre una foto clara o un mapa, debajo del botón va el velo que pide FoundatiosKia para que el texto mantenga el contraste.
- **El anillo de foco va por fuera** y ningún contenedor puede recortarlo: el componente no recorta su contenido (`clipsContent` apagado).

### 07 Buenas prácticas (5 pares)

1. **Jerarquía.** ✅ Bajar el peso con la apariencia: la alternativa va glass u outline. ❌ Cambiar de variant para bajar jerarquía: danger no es el segundo botón.
2. **Etiqueta.** ✅ Un verbo que diga qué va a pasar cuando lo toquen. ❌ Etiquetas largas, sustantivos sueltos o signos de puntuación.
3. **Iconos.** ✅ Un icono, y solo si aclara la acción. ❌ Encender el icono de adelante y el de atrás a la vez.
4. **Tamaño.** ✅ md o lg para la acción principal de la pantalla. ❌ sm (32) como acción principal: es para acciones dentro de una tarjeta.
5. **Glass.** ✅ glass junto al fill, sobre la escena, un mapa o una foto: toma el tono de lo que tiene detrás. ❌ Dos glass y ningún fill: sin una acción principal, ninguna se lee como el camino.

---

## 2. Contrato de desarrollo («Button · Dev»)

### 01 Firma de código

```ts
type ButtonVariant    = 'primary' | 'danger'
type ButtonAppearance = 'fill' | 'glass' | 'outline' | 'ghost'
type ButtonSize       = 'lg' | 'md' | 'sm'
type ButtonState      = 'default' | 'pressed' | 'focus' | 'disabled' | 'loading'

interface ButtonProps {
  label: string
  onPress?: () => void
  variant?: ButtonVariant        // 'primary'
  appearance?: ButtonAppearance  // 'fill' · danger + glass cae a outline
  size?: ButtonSize              // 'md'
  leadingIcon?: IconName
  trailingIcon?: IconName
  disabled?: boolean             // false
  loading?: boolean              // false · state=loading en Figma
}
```

`ButtonView` (misma API sin `onPress`/`disabled`/`loading`, más `state`) es la caja visual sin interacción. La usa `Button` por dentro y Storybook para congelar pressed y focus. No es para pantallas.

### 02 Props públicas (9)

| Prop | Tipo | Default | Property de Figma | Nota |
|---|---|---|---|---|
| label | string | — | label (TEXT) | Requerida. Dice la acción, no la confirmación. También es el `accessibilityLabel`. |
| onPress | () => void | — | ninguna (comportamiento) | Regla general de la guía: los callbacks no existen en Figma y no cuentan como divergencia. |
| variant | 'primary' · 'danger' | 'primary' | variant (VARIANT) | Se elige antes que la apariencia. |
| appearance | 'fill' · 'glass' · 'outline' · 'ghost' | 'fill' | appearance (VARIANT) | danger no tiene glass: si llega `danger` + `glass`, se dibuja outline. |
| size | 'lg' · 'md' · 'sm' | 'md' | size (VARIANT) | En Figma el eje va de mayor a menor. |
| leadingIcon | IconName | — | showLeadingIcon (BOOLEAN) + leadingIcon › icon | La presencia del nombre sustituye al booleano. |
| trailingIcon | IconName | — | showTrailingIcon (BOOLEAN) + trailingIcon › icon | Ídem. |
| disabled | boolean | false | state=disabled (VARIANT) | El único valor del eje state que sí es prop pública, junto con loading. |
| loading | boolean | false | state=loading (VARIANT) | El contenido queda invisible (el ancho no cambia) y un Spinner centrado ocupa el medio. No responde al toque. |

### 03 Instancias anidadas (3 instancias · 2 props)

El Button tiene dos instancias de Icon, una a cada lado del label, y un Spinner que solo aparece en loading. En Figma cada una muestra su API entera; acá está cuál de todas llega a código.

**leadingIcon / trailingIcon** — Icon · el size lo decide el Button

| Propiedad | ¿Va a código? | Qué pasa con ella |
|---|---|---|
| (que exista) | Sí | Lo decide la presencia de `leadingIcon` / `trailingIcon`. En Figma hace falta además prender `showLeadingIcon` / `showTrailingIcon`. |
| icon | Sí | Es el nombre del glifo, del catálogo de la página Icon (`IconName`). |
| size | No | Lo decide el size del Button: md y lg usan 24, sm usa 16. |
| color | No | Lo hereda del texto de la apariencia y el estado. Un icono con color propio adentro del botón rompe el disabled. |

**spinner** — Spinner · solo en state=loading

| Propiedad | ¿Va a código? | Qué pasa con ella |
|---|---|---|
| appearance | No | Sale de la apariencia: `on-brand` en fill, `primary` en glass y outline, `brand` en el ghost de primary, `primary` en el ghost de danger. |
| size | No | md en lg, sm en md y sm. |
| label | No | El Spinner anuncia el mismo `label` del botón. |

De los dos Icon se usa una sola cosa, el glifo. Prender `showLeadingIcon` sin elegir glifo describe algo que en código no existe.

### 04 Quién decide cada propiedad

| Dueño | En el Button |
|---|---|
| público | `leadingIcon` y `trailingIcon`, que son el glifo de cada Icon anidado. Y `disabled` y `loading`, los dos valores del eje state que sí son props. |
| fijo | Nada congelado. Cambiarlo de verdad es un cambio de contrato con revisión de Design Lead y Tech Lead. |
| derivado | El size de los Icon y del Spinner sale del size del Button; su color y la apariencia del Spinner, de la apariencia y el estado. pressed y focus salen de la interacción. |
| plataforma | La capa de vidrio: `GlassLayer.tsx` (iOS · Android, expo-blur + react-native-svg) y `GlassLayer.web.tsx` (CSS). La resuelve el build por extensión de archivo, no quien llama. |

### 05 Diferencias por plataforma (5)

| | web (Storybook · RN Web) | iOS · Android | Por qué |
|---|---|---|---|
| Glass | degradado CSS + `backdrop-filter: blur(20px)` | `BlurView` de `expo-blur` + degradado con react-native-svg. En Android con `experimentalBlurMethod="dimezisBlurView"` | En native el desenfoque necesita una vista nativa. Sin el método experimental, Android dibuja solo una capa semitransparente. Ver divergencia #3. |
| focus | anillo al recibir foco | anillo solo con teclado externo o lector que mueva el foco | El anillo sale de `onFocus`/`onBlur` del `Pressable`. En web se apaga el outline del navegador para no duplicarlo. |
| Área tocable | 48 con `hitSlop` en sm | igual | `size/control/height/sm` = 32 está bajo el mínimo. Los 48 los da `size/target/min`, no el alto del botón. |
| Tipografía | px de RN Web | sp / dp | En RN el texto escala con el ajuste del sistema. |
| El label | el botón crece o el texto va a dos líneas | igual | El alto es `minHeight`, no fijo: al 200 % de font scale no se solapa. |

### 06 Estados, tokens y a11y

- **Estados:** default · pressed · focus · disabled · loading. Solo disabled y loading son props: pressed y focus se derivan de la interacción. Sin hover: no hay puntero.
- **Tokens (54, bindeados en Figma):** `border/width/default` · `border/width/focus` · `component/button/danger-ghost/bg-pressed` · `component/button/danger-ghost/text` · `component/button/danger-outline/bg-pressed` · `component/button/danger-outline/border` · `component/button/danger-outline/text` · `component/button/danger/bg` · `component/button/danger/bg-pressed` · `component/button/danger/text` · `component/button/disabled/bg` · `component/button/disabled/border` · `component/button/disabled/text` · `component/button/focus/ring` · `component/button/glass/highlight` · `component/button/glass/shadow` · `component/button/primary-ghost/bg-pressed` · `component/button/primary-ghost/text` · `component/button/primary-glass/bg` · `component/button/primary-glass/bg-end` · `component/button/primary-glass/bg-pressed` · `component/button/primary-glass/border` · `component/button/primary-glass/text` · `component/button/primary-outline/bg-pressed` · `component/button/primary-outline/border` · `component/button/primary-outline/text` · `component/button/primary/bg` · `component/button/primary/bg-pressed` · `component/button/primary/text` · `elevation/raised/glass-blur` · `elevation/raised/inner-top-blur` · `elevation/raised/inner-top-y` · `elevation/raised/near-blur` · `elevation/raised/near-y` · `font/family/text` · `font/line-height/16` · `font/line-height/20` · `font/line-height/24` · `font/size/body/lg` · `font/size/body/md` · `font/size/body/sm` · `font/style/emphasis` · `radius/action` · `radius/focus/action` · `size/control/height/lg` · `size/control/height/md` · `size/control/height/sm` · `size/control/min-width` · `size/icon/md` · `size/icon/sm` · `space/inline/md` · `space/inline/sm` · `space/inset/lg` · `space/inset/md`. Los 27 de color son `component/button/*` (aliases sobre `color/*`; el destino de cada uno está en la tabla de la sección 01). Solo código: `size/target/min` (hitSlop).
- **Text styles:** `text/body/lg/strong` · `text/body/md/strong` · `text/body/sm/strong`.
- **Cómo se resuelven en código:** colores con `componentColors[tema]['component/button/…']` (`tokens/variables.ts`, generado por `build-variables.mjs` desde el JSON de FoundatiosKia), en la tabla `recipes` de `Button.tsx`; alturas, ancho mínimo y target con `variables.size[...]`; radios con `variables.radius['radius/action' | 'radius/focus/action'][density]` (`useButtonRadius` en `shared.ts`); padding y separación con `useTheme().space[...]`; bordes, blur y sombras con `variables.semantic[...]`; texto con `useTheme().text[...]`.
- **A11y:**
  - `accessibilityRole="button"`, `accessibilityLabel` = `label`, `accessibilityState` con `disabled` y `busy` (loading).
  - El anillo de foco se dibuja por fuera y ningún contenedor puede recortarlo.
  - En sm el alto es 32: el área de 48 la da el `hitSlop`, no la caja visual.
  - En loading el Spinner anuncia el mismo label; el botón no responde.
  - El label dice la acción, no la confirmación: «Pagar», no «Aceptar».
  - glass, outline y ghost tienen que leerse sobre la base y sobre el glass de las tarjetas; sobre fotos claras, con el velo de FoundatiosKia debajo.

### 07 Divergencias y decisiones abiertas (1 abierta, 2 resueltas)

| # | Qué | Quién lo cierra |
|---|---|---|
| 1 | **Resuelto el 2026-10-26: radio con token.** `radius/action` (16, alias de `radius/scale/xl`) y `radius/focus/action` (20) son un solo token para iOS, Android y web; se borraron los `/ios`, `/android` y `/web`, que nadie usaba. El set (105 variantes y 21 anillos de foco) y el código los usan. | Ya decidido. Queda declarado. |
| 2 | **Resuelto el 2026-10-26: tokens `component/button/*`.** 27 aliases en Semantic de FoundatiosKia sobre los `color/*`, igual que el Spinner. El código los lee de `componentColors` (`tokens/variables.ts`), que ahora genera `build-variables.mjs`. | Ya decidido. Queda declarado. |
| 3 | **Blur nativo sin probar en dispositivo.** `GlassLayer.tsx` usa `expo-blur` (`BlurView`), con `experimentalBlurMethod="dimezisBlurView"` en Android, que expo-blur marca como experimental y puede costar rendimiento. La intensidad (`GLASS_INTENSITY` = 40) sale de `elevation/raised/glass-blur` × 2, calibrada a ojo: hay que compararla con Figma en iOS y en un Android de gama media. | Tech Lead. |

`onPress` ya no figura acá: por la regla general de la guía, las props de comportamiento no existen en Figma y no son divergencia.

### 08 Antes de implementarlo

- De los cinco valores del eje state, solo disabled y loading son props. pressed y focus se derivan de la interacción y no se exponen.
- danger + glass no existe: el código lo dibuja como outline. No lo pidas.
- El icono no es un booleano. En Figma hay `showLeadingIcon` más el hueco; en código la prop es el nombre del glifo y su presencia lo dibuja.
- En sm el alto es 32, bajo el mínimo tocable. Los 48 los pone el `hitSlop`; no agregues padding alrededor.
- El anillo de foco va por fuera: el `Pressable` no puede ir dentro de un contenedor con `overflow: 'hidden'` pegado al borde.
- Con loading el botón no responde ni cambia de ancho. No sumes un Spinner aparte al lado del botón.
- El vidrio solo se ve como vidrio si hay algo detrás. En pantallas planas se lee como un botón tenue: es lo esperado.
- **La app tiene que tener `expo-blur` instalado**, aunque no sea una app Expo. En React Native sin Expo: `npx install-expo-modules@latest` (una vez, agrega el soporte de módulos de Expo), luego `npx expo install expo-blur` y `cd ios && pod install`. Con RN 0.81 la versión es la del SDK 54 (`expo-blur ~15.0.8`). En Android se recompila la app; no hace falta configuración extra.

---

## 3. Estado de la implementación

- **Código:** `src/components/Button/Button.tsx` (`Button` + `ButtonView`), `GlassLayer.tsx` (iOS · Android, react-native-svg), `GlassLayer.web.tsx` (CSS), `shared.ts` (`useButtonRadius`), `Button.stories.tsx` (Playground, Glass, Hierarchy, Matrix) y `Button.mdx`. La capa de vidrio se divide por extensión porque react-native-svg no corre en el Storybook web, igual que el Icon.
- **Figma:** component set `Button KIA` (`5:16185`) en el frame de diseño. Tokens de FoundatiosKia en modo dark: todos los colores son `component/button/*` (también el degradado del glass, por parada, y el trazo de los iconos anidados, que toma el token de texto de cada variante). Los frames «Button» y «Button · Dev» se adaptaron desde los de la referencia (misma estructura de secciones): header y etiquetas do/don't locales, buenas prácticas con instancias de `Button KIA`, índice enlazado a cada sección y «Ver en Storybook» a `Components/Button`.
- **Referencia archivada:** las tres matrices del Button anterior (set `Button`, 312 variantes) y el frame «Button · Platforms» quedaron en el frame «Button · Referencia (otro proyecto)», debajo de los dos frames, sin re-enlazar: siguen usando la otra librería. Se pueden borrar cuando se confirme que nada los usa.
- **Inventario final (frames «Button» y «Button · Dev»):** cero instancias remotas; variables solo de Semantic, Typography, Spacing, Radius y size; text styles solo `text/*` de FoundatiosKia; links solo a nodos de este archivo y al Storybook de Kia.
- **Verificado:** typecheck y build de Storybook; las cuatro historias se vieron renderizadas en web; foco con teclado en el Playground. **No se ha probado en dispositivo ni simulador** (iOS · Android).
- **Storybook:** `Components/Button` → `?path=/docs/components-button--docs` y `?path=/story/components-button--playground`, que son los links de los botones «Ver en Storybook» de Figma.
