# Kia — IconButton (Core components)

- **Archivo de Figma:** KIA Core Componentes (`rVdetvqgPFzRluJ86eTEju`)
- **Página:** IconButton (frames «IconButton» `5:18328` = documentación de diseño, «IconButton · Dev» `5:18877` = contrato de desarrollo)
- **Componente:** component set `IconButton` (`5:18348`), 160 variantes, ejes `appearance` (8), `size` (4) y `state` (5)
- **Fecha de lectura:** 2026-10-26
- **Código:** `src/components/IconButton/` · Storybook: `Components/IconButton`

> La misma acción que Button, sin etiqueta. Solo cuando el glifo es inequívoco o no hay espacio para texto; si hay duda de qué hace, lleva etiqueta y es Button. Siempre un círculo (`radius/pill`) y siempre un icono de KIA Icons.

### Qué cambió frente a la referencia

| | Referencia | Kia app | Por qué |
|---|---|---|---|
| appearance | brand · neutral · ghost · veil · on-scene · on-media · on-inverse | Figma: las siete + **glass**. Código: **brand · glass · ghost** | glass es el pedido (el vidrio del Button en círculo). Las otras cinco no tienen token en FoundatiosKia y no se programaron: ver divergencia #2. |
| icono | hay que entrar a la instancia anidada | la instancia `Icon` anidada está **expuesta** en el set | El selector de KIA Icons aparece en el panel del IconButton. |
| radio | `radius/action/icon` | `radius/pill` (foco `radius/focus/pill`) | Círculo, como decidió Design Lead. Distinto del 16 del Button. |
| tokens | `component/iconbutton/*` de otra librería | `color/*` semantic de FoundatiosKia (en código, los aliases `component/button/*`) | Mismos tokens que Button; no se crearon tokens nuevos. |

---

## 1. Diseño

### 01 Matriz de variantes (160)
Columnas = `state`; filas = `appearance · size`. Bloques en el orden brand, glass, neutral, ghost, veil, on-scene, on-media, on-inverse. La matriz va en dark (`Semantic=dark`) sobre `color/surface/base`, con una escena de manchas detrás del glass.

### 02 Ejes
| Eje | Valores | Código |
|---|---|---|
| appearance | brand · glass · neutral · ghost · veil · on-scene · on-media · on-inverse | brand · glass · ghost |
| size | lg 56 · md 44 · sm 32 · xs 24 | lg · md · sm (xs solo Figma) |
| state | default · hover · pressed · focus · disabled | default · pressed · focus · disabled (sin hover: no hay puntero) |

### 03 Propiedades
Ninguna propia. La instancia `Icon` anidada está expuesta: su `icon` (INSTANCE_SWAP, 33 preferidos de KIA Icons) se cambia desde el panel del IconButton. El `size` del Icon lo decide el IconButton.

### 04 Cuándo usar cada «appearance»
- **brand** — La acción principal en formato icono. Una por zona.
- **glass** — Importante pero no la principal, sobre una escena, un mapa o una foto del vehículo. Toma el tono de lo que tiene detrás.
- **ghost** — Lo siempre disponible y rara vez usado: la X de cerrar, volver. Sobre una superficie conocida y tranquila.
- neutral · veil · on-scene · on-media · on-inverse — solo en Figma, con tokens del sistema anterior (divergencia #2).

### Medidas y tokens (lo bindeado en Figma)
- **Caja:** `size/control/height/{lg,md,sm}` (xs sigue con el token viejo, sin equivalente Kia). **Radio:** `radius/pill`; anillo de foco `radius/focus/pill`.
- **Glifo:** `size/icon/lg` 32 · `md` 24 · `sm` 16 (xs también 16). Va atado en la instancia, no en el principal.
- **brand:** `color/fill/action/primary/default` · `…/pressed` · glifo `color/text/action/primary/default`.
- **glass:** degradado `color/fill/action/primary/glass/default` → `…/glass/gradient-end`, borde `color/border/action/primary/glass/default`, blur `elevation/raised/glass-blur`, sombra `color/elevation/raised/shadow-near` (`near-y`, `near-blur`), brillo `color/elevation/raised/inner-top` (`inner-top-y`, `inner-top-blur`), glifo `color/text/action/primary/glass/default`, pressed `color/overlay/state/pressed`.
- **ghost:** pressed `color/fill/action/primary/ghost/pressed`, glifo `color/text/action/primary/ghost/default`.
- **disabled:** `color/fill/disabled`, borde `color/border/subtle` (`border/width/default`) y glifo `color/text/disabled`; en ghost solo el glifo; en glass relleno plano y se conserva el blur.
- **Foco:** `color/border/focus` de `border/width/focus` (2), a 2 px.
- **Hover (solo Figma):** relleno por defecto + `color/overlay/state/pressed` al 50 % (brand, glass) o `ghost/pressed` al 50 % (ghost). Provisional: Button no tiene hover.

---

## 2. Contrato de desarrollo (espejo del frame «IconButton · Dev»)

### 01 Firma
```ts
type IconButtonAppearance = 'brand' | 'glass' | 'ghost'
type IconButtonSize = 'lg' | 'md' | 'sm'

interface IconButtonProps {
  icon: IconName                     // KIA Icons; requerida
  label: string                      // obligatoria: no hay texto visible
  onPress?: () => void
  appearance?: IconButtonAppearance  // 'brand'
  size?: IconButtonSize              // 'md'
  disabled?: boolean                 // false
}
```

### 02 Props públicas
| Prop | Tipo | Default | Property de Figma | Nota |
|---|---|---|---|---|
| icon | IconName | — | `icon` de la instancia Icon anidada | Requerida. Cualquier glifo del catálogo. |
| label | string | — | ninguna | Divergencia. Nombre accesible; dice la acción, no el dibujo. |
| onPress | () => void | — | ninguna | Divergencia: Figma no modela comportamiento. |
| appearance | 'brand' · 'glass' · 'ghost' | 'brand' | appearance (VARIANT) | Figma tiene cinco más. |
| size | 'lg' · 'md' · 'sm' | 'md' | size (VARIANT) | En Figma va de mayor a menor; xs solo Figma. |
| disabled | boolean | false | state=disabled (VARIANT) | Único valor de `state` que es prop pública. |

### 03 Instancias anidadas
Una: `Icon`. Público: el glifo (`icon`). Derivado: `size` (lg→`lg`, md→`md`, sm→`sm`) y `color` (de appearance y estado). Fijo: nada.

### 04 Quién decide cada propiedad
| público | fijo | derivado | plataforma |
|---|---|---|---|
| icon, label, onPress, appearance, size, disabled | nada (cambiar algo congelado es un cambio de contrato con revisión de Design Lead y Tech Lead) | tamaño y color del Icon; pressed y focus (salen de la interacción) | la capa de vidrio: `GlassLayer.tsx` (iOS · Android) y `GlassLayer.web.tsx` (CSS), compartida con Button |

### 05 Diferencias por plataforma
| | web | iOS · Android | Por qué |
|---|---|---|---|
| hover | no hay en código | no existe | No hay puntero en una app. |
| Área tocable | `hitSlop` hasta 48 | igual | md 44 y sm 32 quedan bajo `size/target/min`. |
| Nombre accesible | `aria-label` (lo genera react-native-web de `accessibilityLabel`) | `accessibilityLabel` | Sin texto visible. |
| Glass | degradado CSS + `backdrop-filter: blur(20px)` | degradado react-native-svg + `BlurView` de `expo-blur` | Mismo vidrio que Button. El blur nativo no se probó en dispositivo. |

### 06 Estados, tokens y a11y
- **Estados:** default · pressed · focus · disabled. Solo disabled es prop.
- **Tokens:** los de la sección «Medidas y tokens» más, **solo código**, `size/target/min` (hitSlop). En código se leen como `component/button/*` (`primary/bg`, `primary/bg-pressed`, `primary/text`, `primary-glass/*`, `primary-ghost/*`, `disabled/*`, `focus/ring`, `glass/shadow`, `glass/highlight`) y `radius/pill`, `radius/focus/pill` de `variables.radius`.
- **Text styles:** ninguno.
- **A11y:** `accessibilityRole="button"`, `accessibilityLabel={label}`, `accessibilityState={{ disabled }}`; el Icon interno es decorativo (`importantForAccessibility="no-hide-descendants"`). Sin movimiento propio: no aplica Reduce Motion.

### 07 Divergencias y decisiones abiertas
| # | Qué | Quién lo cierra |
|---|---|---|
| 1 | El selector de Figma ofrece 33 iconos preferidos y el catálogo de código tiene 50. | Design Lead |
| 2 | neutral, veil, on-scene, on-media y on-inverse siguen en Figma con tokens `component/iconbutton/*` del sistema anterior y no están en código. Decidir si se migran (crear tokens) o se retiran. En dark, veil casi no se ve. | Design Lead |
| 3 | xs (24) y hover existen en Figma y no en código; xs no tiene token `size/control/height/xs` en Kia. | Design Lead + Tech Lead |
| 4 | `label`, `onPress`, `disabled` no existen como properties en Figma. | Design Lead + Tech Lead |
| 5 | El blur nativo del glass depende de `expo-blur` (igual que Button #3). | Tech Lead |
| 6 | El hitSlop para md y sm no está escrito como regla general de la app. | Design Lead + Tech Lead |

### 08 Antes de implementarlo
- Sin `label` el control es mudo: es la prop más importante y la única que Figma no puede pedir.
- El glifo se elige en la instancia anidada; en código es `icon`, requerida.
- md (44) y sm (32) están bajo el mínimo tocable de 48: el área la da el `hitSlop`.
- glass necesita algo detrás: sobre un fondo plano se lee como un círculo gris.
- En web, el vidrio es un `div` absoluto: el glifo va dentro de un `View` para quedar por encima del blur.
- El anillo de foco va por fuera y ningún contenedor puede recortarlo.

---

## 3. Estado de la implementación

- **Código:** `src/components/IconButton/IconButton.tsx` (`IconButton` + `IconButtonView`), `IconButton.stories.tsx` (Playground, Glass, Hierarchy, Matrix, Icons) y `IconButton.mdx`. Reutiliza `GlassLayer` de Button, al que se le añadió una prop opcional `radius`.
- **Figma:** set `IconButton` (`5:18348`). brand, glass y ghost, las medidas, el radio y el icono van con tokens de FoundatiosKia. Documentación (frames de diseño y Dev) migrada: header y etiquetas locales, text styles Kia, índice enlazado a cada sección y «Ver en Storybook» a `Components/IconButton`.
- **Verificado:** typecheck; Storybook en web (matriz, glass, iconos, sin errores de consola).
- **Pendiente:** iOS y Android (nada se probó en dispositivo, incluido el blur nativo); los links «Ver en Storybook» de Figma solo cargan tras publicar el Storybook (push a `main`); tokens de las otras cinco apariencias.
