# Kia — Spinner (Core components)

- **Archivo de Figma:** KIA Core Componentes (`rVdetvqgPFzRluJ86eTEju`)
- **Página:** Spinner (frames «Spinner» = documentación de diseño, «Spinner · Dev» = contrato de desarrollo)
- **Componente:** component set `Spinner` (`2:3977`), 9 variantes, ejes `appearance` y `size`
- **Fecha de lectura:** 2026-10-27
- **Código:** `src/components/Spinner/` · Storybook: `Components/Spinner`

> Indicador de carga indeterminado. Se usa cuando la espera es corta y no se sabe cuánto va a durar. Con Reduce Motion el giro se detiene y el arco queda quieto. Nunca mostrar un importe a medio cargar: usar Skeleton para datos financieros.

---

## 1. Diseño

### 01 Matriz de variantes (9)

Las columnas son `appearance` (brand · primary · on-brand), las filas `size` (lg · md · sm), anidadas en ese orden.

| size | Token | px | Grosor del arco |
|---|---|---|---|
| lg | size/icon/lg | 32 | 3,2 (10% del diámetro) |
| md | size/icon/md | 24 | 2,4 |
| sm | size/icon/sm | 16 | 1,6 |

Cada variante son dos elipses: `track` (anillo completo) e `indicator` (arco de ~100°, de −90° a +10°). El grosor sale del `innerRadius` 0,8 de la elipse.

| appearance | Indicador | Pista |
|---|---|---|
| brand | `component/spinner/indicator/brand` → `color/fill/action/primary/default` | `component/spinner/track/default` → `color/border/subtle` |
| primary | `component/spinner/indicator/default` → `color/icon/default` | `component/spinner/track/default` → `color/border/subtle` |
| on-brand | `component/spinner/indicator/on-brand` → `color/text/on-fill` | `component/spinner/track/on-brand` → `alpha/white/30` |

Los `component/spinner/*` son aliases de FoundatiosKia (colección Semantic, modos light y dark). Se crearon el 2026-10-27 porque la librería no tenía tokens de componente.

### 02 Ejes de variante (2)

1. **appearance** — brand · primary · on-brand (se elige por la superficie, no por gusto)
2. **size** — lg · md · sm

### 03 Antes de usarlo

Indicador de carga indeterminado. La rotación se implementa en código con `motion/duration/extra-long`: en el hilo nativo en iOS y Android, en JS en web. Con Reduce Motion el giro se detiene y el arco queda quieto. Nunca mostrar un importe a medio cargar: usar Skeleton para datos financieros.

### 04 Buenas prácticas (2 pares)

1. **Spinner o Skeleton.** ✅ Spinner cuando no se sabe qué forma va a tener: una acción en curso. ❌ Un spinner para contenido que ya se sabe cómo es: ahí va Skeleton.
2. **La apariencia sigue a la superficie.** ✅ on-brand cuando gira sobre un fondo de marca. ❌ La apariencia de página sobre una superficie oscura: se apaga.

---

## 2. Contrato de desarrollo («Spinner · Dev»)

### 01 Firma de código

```ts
type SpinnerAppearance = 'brand' | 'primary' | 'on-brand'
type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  appearance?: SpinnerAppearance   // 'brand'
  size?: SpinnerSize               // 'md'
  label?: string                   // lo que anuncia el lector; por defecto "Cargando"
}
```

### 02 Props públicas

| Prop | Tipo | Default | Property de Figma | Nota |
|---|---|---|---|---|
| appearance | 'brand' · 'primary' · 'on-brand' | 'brand' | appearance (VARIANT) | Se elige por la superficie sobre la que se monta, no por gusto. |
| size | 'sm' · 'md' · 'lg' | 'md' | size (VARIANT) | Mismos valores que el eje. En Figma van de mayor a menor. |
| label | string | "Cargando" | ninguna | Divergencia: la accesibilidad no se puede modelar en Figma. Es el `accessibilityLabel`. |

### 03 Instancias anidadas (ninguna)

El Spinner no tiene instancias anidadas: es un arco que gira. Lo usan por dentro el Button y los campos, y casi nunca va suelto. La pregunta que este contrato contesta es cuánto puede durar: si la espera se puede medir, el componente correcto es ProgressBar.

### 04 Quién decide cada propiedad

| Dueño | En el Spinner |
|---|---|
| público | No hay instancias anidadas: no hay nada heredado que exponer. |
| fijo | Nada congelado. Cambiarlo de verdad es un cambio de contrato con revisión de Design Lead y Tech Lead. |
| derivado | El grosor del arco y su radio salen del eje `size`. |
| plataforma | Ninguna: un solo `Spinner.tsx` sirve a web y app. El arco es un `View` con borde, sin react-native-svg. Lo que cambia es el driver de la animación, no el dibujo. |

### 05 Diferencias por plataforma

| | web (Storybook · RN Web) | iOS · Android | Por qué |
|---|---|---|---|
| La animación | `Animated`, `useNativeDriver: false` | `Animated`, `useNativeDriver: true` | Mismo motor y mismo token: `motion/duration/extra-long` (700 ms por vuelta, lineal). En web no existe el driver nativo y corre en JS. |
| Reduce Motion | el giro se detiene y el arco queda | igual | WCAG 2.3.3. Se lee con `AccessibilityInfo.isReduceMotionEnabled` y `reduceMotionChanged`, igual en las dos. |
| A11y | `role="progressbar"` + `aria-live="polite"` + `aria-busy` | `accessibilityRole="progressbar"` + `accessibilityState` busy + `accessibilityLiveRegion="polite"` | Quien no ve el giro tiene que enterarse de que hay una espera. `accessibilityLiveRegion` solo lo respeta Android; en iOS el lector anuncia el label al enfocar. |
| Dónde vive | dentro del control que espera | igual | Un spinner suelto en medio de la pantalla no dice qué se está esperando. |

### 06 Estados, tokens y a11y

- **Estados:** ninguno: está o no está. Lo único que cambia es la apariencia, y la decide la superficie.
- **Tokens (10):** `component/spinner/indicator/brand` · `component/spinner/indicator/default` · `component/spinner/indicator/on-brand` · `component/spinner/track/default` · `component/spinner/track/on-brand` · `radius/pill` · `size/icon/lg` · `size/icon/md` · `size/icon/sm` · `motion/duration/extra-long` (solo código).
- **Cómo se resuelven en código:** los `component/*` de color no se exportan a `tokens.ts` (solo lo hacen los de `color/*`). `Spinner.tsx` pinta con el semantic al que apunta cada uno (`appearanceTokens`), y los tamaños salen de `variables.size['size/icon/*']`.
- **Text styles:** ninguno.
- **A11y:** `progressbar` con live region `polite` y `busy`. Con Reduce Motion el arco queda quieto: no desaparece, dejar de moverse no es dejar de informar. En esperas largas va acompañado de una frase.

### 07 Divergencias y decisiones abiertas (4)

| # | Qué | Quién lo cierra |
|---|---|---|
| 1 | `label` no existe como property en Figma. Es una divergencia missing-in-figma y necesita firma para dejar de ser deuda. | Design Lead + Tech Lead. |
| 2 | El eje `appearance` tiene on-brand pero no on-inverse ni on-media. Un spinner sobre la barra del Snackbar o sobre una imagen no tiene apariencia hoy. | Design Lead. |
| 3 | No hay umbral escrito de cuándo un spinner pasa a ser Skeleton o ProgressBar. Sin ese número, cada pantalla lo resuelve distinto. | Design Lead + producto. |
| 4 | El arco mide ~100° en Figma y 90° en código: se dibuja con el borde superior de un `View`, el único arco que corre igual en web y app sin react-native-svg. Si el diseño exige el arco exacto, hay que sumar react-native-svg con un archivo por plataforma, como el Icon. | Design Lead + Tech Lead. |

### 08 Antes de implementarlo

- Vive dentro del control que espera (Button, campo) y casi nunca suelto.
- Con Reduce Motion el giro se detiene y el arco queda quieto.
- Si la espera se puede medir, es un ProgressBar. Un indeterminado largo se lee como algo colgado.
- `progressbar` con live region `polite`: quien no ve el giro tiene que enterarse de que hay una espera.
- La apariencia se elige por la superficie: brand sobre página, on-brand sobre la escena de marca.

---

## 3. Estado de la implementación

- **Código:** `src/components/Spinner/Spinner.tsx` (un solo archivo para web y app), `Spinner.stories.tsx` (Playground, Matrix, OnSurfaces) y `Spinner.mdx`. Hook compartido `src/theme/useReduceMotion.ts`.
- **Verificado:** typecheck y build de Storybook; las historias se vieron renderizadas en web. **No se ha probado en dispositivo ni simulador** (iOS · Android).
- **Storybook:** `Components/Spinner` → `?path=/docs/components-spinner--docs` y `?path=/story/components-spinner--playground`, que son los links de los botones «Ver en Storybook» de Figma.
