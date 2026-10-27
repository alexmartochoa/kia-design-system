# Kia — Skeleton (Core components)

- **Archivo de Figma:** KIA Core Componentes (`rVdetvqgPFzRluJ86eTEju`)
- **Página:** Skeleton (frames «Skeleton» = documentación de diseño, «Skeleton · Dev» = contrato de desarrollo)
- **Componente:** component set `Skeleton` (`2:4419`), 9 variantes, ejes `shape` y `size`
- **Fecha de lectura:** 2026-10-27
- **Código:** `src/components/Skeleton/` · Storybook: `Components/Skeleton`

> El lugar reservado de lo que todavía no llegó. Tiene la forma del contenido que viene, así la pantalla no salta cuando el dato aparece.

---

## 1. Diseño

### 01 Matriz de variantes (9)

Las columnas son `shape` (text · block · circle), las filas `size`. `size` significa algo distinto en cada forma.

| shape | Qué hace `size` | lg · md · sm | Token |
|---|---|---|---|
| text | Altura de línea de la rampa que reemplaza | 24 · 20 · 16 | `font/line-height/24` · `20` · `16` |
| block | Radio; alto y ancho los pone el layout | 16 · 12 · 8 (alto 96 por defecto) | `radius/surface/lg` · `md` · `sm` |
| circle | Diámetro del avatar | 56 · 40 · 32 | `component/avatar/size/lg` · `md` · `sm` |

Todas llevan un `sheen`: una banda con degradado (`component/skeleton/sheen-edge` → `component/skeleton/highlight` → `sheen-edge`) sobre `component/skeleton/bg`. En Figma es una foto: el barrido lo anima el código.

| Token de componente | Apunta a |
|---|---|
| `component/skeleton/bg` | `color/fill/disabled` |
| `component/skeleton/highlight` | `color/overlay/state/hover` |
| `component/skeleton/sheen-edge` | blanco transparente |
| `component/avatar/size/sm · md · lg` | 32 · 40 · 56 (colección `size`) |

Los `component/*` son tokens nuevos de FoundatiosKia (2026-10-27). Las alturas del `text` pasaron de 24 · 21 · 18 a 24 · 20 · 16 para atarlas a `font/line-height/*`.

### 02 Ejes de variante (2)

1. **shape** — text · block · circle
2. **size** — lg · md · sm

### 03 Antes de usarlo

Skeleton va cuando se sabe qué forma va a tener el contenido; Spinner cuando no. Para datos financieros va Skeleton: nunca mostrar un importe a medio cargar. El barrido lo anima el código, no Figma. Con reduced-motion se apaga y queda la base quieta, nunca parpadeo. El contenedor lleva `busy` y se reemplaza por el contenido real, no se apila encima.

### 04 Buenas prácticas (1 par)

1. **Imitá la forma de lo que viene.** ✅ El esqueleto reserva el lugar exacto: círculo, título y línea de apoyo. ❌ Un bloque gris genérico: la pantalla salta cuando llega el dato.

---

## 2. Contrato de desarrollo («Skeleton · Dev»)

### 01 Firma de código

```ts
type SkeletonShape = 'text' | 'block' | 'circle'
type SkeletonSize  = 'sm' | 'md' | 'lg'

interface SkeletonProps {
  shape?: SkeletonShape        // 'text'
  size?: SkeletonSize          // 'md'
  lines?: number               // solo con shape='text'; 1
  width?: DimensionValue       // '100%'; en circle lo fija el diámetro
  label?: string               // lo que anuncia el lector; "Cargando"
  style?: StyleProp<ViewStyle> // alto y posición que pone el layout
}
```

### 02 Props públicas

| Prop | Tipo | Default | Property de Figma | Nota |
|---|---|---|---|---|
| shape | 'text' · 'block' · 'circle' | 'text' | shape (VARIANT) | Mismos valores que el eje. |
| size | 'sm' · 'md' · 'lg' | 'md' | size (VARIANT) | Mismos valores que el eje. |
| lines | number | 1 | ninguna | Divergencia: en Figma se dibujan apilando instancias. En código es un número. La última línea mide 70% cuando hay varias. |
| width | DimensionValue | 100% | ninguna | Divergencia: el ancho tiene que imitar al contenido real, y eso no se modela con un eje. |
| label | string | "Cargando" | ninguna | Divergencia: la accesibilidad no se puede modelar en Figma. Se anuncia una sola vez, en el contenedor. |
| style | StyleProp\<ViewStyle\> | — | ninguna | Divergencia: Figma no tiene prop de layout. En código posiciona la forma y, en block, fija el alto. |

### 03 Instancias anidadas (ninguna)

El Skeleton no tiene instancias anidadas: es una forma con un brillo que recorre. Lo que no se puede modelar con dos ejes es la forma del contenido que viene, y esa la sabe la pantalla. Por eso `lines` y `width` no existen en Figma: en el archivo se dibujan apilando y estirando instancias a mano.

### 04 Quién decide cada propiedad

| Dueño | En el Skeleton |
|---|---|
| público | No hay instancias anidadas: no hay nada heredado que exponer. |
| fijo | Nada congelado. Cambiarlo de verdad es un cambio de contrato con revisión de Design Lead y Tech Lead. |
| derivado | El radio sale del eje `shape` y la altura del eje `size`. |
| plataforma | Ninguna: la forma es la misma en las dos plataformas. Lo que cambia es el driver con que se anima el brillo. |

### 05 Diferencias por plataforma

| | web (Storybook · RN Web) | iOS · Android | Por qué |
|---|---|---|---|
| El brillo | `Animated` · translateX · `useNativeDriver: false` | `Animated` · translateX · `useNativeDriver: true` | Mismo motor y mismo token: 2 × `motion/duration/extra-long` (1,4 s por barrido). Es una banda plana de `overlay/state/hover`, sin degradado, para no sumar una dependencia. |
| Reduce Motion | el brillo se detiene y queda la forma | igual | WCAG 2.3.3. Se lee con `AccessibilityInfo`. La forma sigue diciendo que algo está por llegar. |
| A11y | `aria-hidden` en las formas; `role="progressbar"` + `aria-live="polite"` + `aria-busy` en el contenedor | `accessibilityElementsHidden` en las formas; `accessibilityRole="progressbar"` + `accessibilityState` busy + live region en el contenedor | Anunciar cada barra gris es ruido. Lo que se anuncia es «cargando», una vez. |
| Ancho | % del contenedor | % del contenedor o dp (DimensionValue) | Un skeleton de ancho fijo miente sobre el contenido que viene. |

### 06 Estados, tokens y a11y

- **Estados:** ninguno: está mientras no hay dato y desaparece cuando llega. No se toca, no recibe foco.
- **Tokens (14):** `component/avatar/size/lg` · `component/avatar/size/md` · `component/avatar/size/sm` · `component/skeleton/bg` · `component/skeleton/highlight` · `component/skeleton/sheen-edge` · `font/line-height/16` · `font/line-height/20` · `font/line-height/24` · `motion/duration/extra-long` (solo código) · `radius/pill` · `radius/surface/lg` · `radius/surface/md` · `radius/surface/sm`.
- **Cómo se resuelven en código:** `bg` y `highlight` salen de `colors` (`fill/disabled`, `overlay/state/hover`); alturas, avatares y radios de `variables` (`typography`, `size`, `radius` según la densidad del tema). `sheen-edge` no se usa en código porque el brillo es plano.
- **Text styles:** ninguno.
- **A11y:** las formas van ocultas al lector; el contenedor anuncia «Cargando» una vez. El skeleton reemplaza a lo que todavía no llegó, nunca tapa contenido que ya está. Si la pantalla salta cuando llega el dato, el skeleton tenía la forma equivocada.

### 07 Divergencias y decisiones abiertas (5)

| # | Qué | Quién lo cierra |
|---|---|---|
| 1 | `lines` y `width` no existen en Figma y no pueden existir: son la forma del contenido, que la sabe la pantalla. Son dos divergencias missing-in-figma y necesitan firma. | Design Lead + Tech Lead. |
| 2 | No hay umbral escrito de cuándo se usa Skeleton y cuándo Spinner. La regla razonable —skeleton si sabés la forma de lo que viene, spinner si no— no está en ningún lado. | Design Lead. |
| 3 | El componente no declara duración máxima. Un skeleton que se queda diez segundos es indistinguible de una pantalla rota. | Design Lead + producto. |
| 4 | El brillo es una banda plana en código y un degradado en Figma. Igualarlo exige una dependencia de gradiente (expo-linear-gradient o react-native-linear-gradient) que el proyecto todavía no tiene. | Tech Lead. |
| 5 | `shape=block` tiene alto 96 en Figma y en código, sin token. En una pantalla real el alto lo pone el layout vía `style`; el 96 es solo el valor por defecto. | Design Lead. |

### 08 Antes de implementarlo

- Tiene la forma del contenido que viene. Si la pantalla salta cuando aparece el dato, la forma estaba mal: es un fallo de estabilidad visual.
- `lines` y `width` no salen de Figma: son props, y las dos que más se van a usar.
- Las formas van ocultas al lector. Lo que se anuncia es «cargando», una vez, en el contenedor.
- Con Reduce Motion el brillo se detiene y queda la forma.
- Skeleton si sabés la forma de lo que viene; Spinner si no. Un skeleton genérico es un spinner caro.

---

## 3. Estado de la implementación

- **Código:** `src/components/Skeleton/Skeleton.tsx` (un solo archivo para web y app), `Skeleton.stories.tsx` (Playground, Matrix, Paragraph, ListItem) y `Skeleton.mdx`. Comparte `src/theme/useReduceMotion.ts` con el Spinner.
- **Tokens nuevos:** `component/avatar/size/*` se exportó a `variables.ts` (colección `size`). Los `component/skeleton/*` de color no entran a `tokens.ts`.
- **Verificado:** typecheck y build de Storybook; las historias se vieron renderizadas en web. **No se ha probado en dispositivo ni simulador** (iOS · Android).
- **Storybook:** `Components/Skeleton` → `?path=/docs/components-skeleton--docs` y `?path=/story/components-skeleton--playground`.
