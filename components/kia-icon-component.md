# Kia — Icon (Core components)

- **Archivo de Figma:** KIA Core Componentes (`rVdetvqgPFzRluJ86eTEju`)
- **Página:** Icon (frames «Icon» = documentación de diseño, «Icon · Dev» = contrato de desarrollo)
- **Componente:** component set `Icon` (`1:534`), 6 variantes, eje `size`
- **Fecha de lectura:** 2026-10-26
- **Código:** `src/components/Icon/` · Storybook: `Components/Icon`

> Contenedor por el que pasa todo icono del sistema. Fija el tamaño desde una sola variante bindeada a `size/icon/*`, y el glifo entra por la propiedad `icon`. Ningún componente de Core instancia un icono directo: todos instancian este.

---

## 1. Diseño

### 01 Matriz de variantes (6)

El único eje es `size`. Cada paso bindea width y height a `size/icon/*`, así que el tamaño lo decide el token y no la instancia. El glifo no es una variante: entra por la propiedad `icon`.

| Variante | Token | px |
|---|---|---|
| `size=2xs` | size/icon/2xs | 8 |
| `size=xs` | size/icon/xs | 12 |
| `size=sm` | size/icon/sm | 16 |
| `size=md` | size/icon/md | 24 |
| `size=lg` | size/icon/lg | 32 |
| `size=xl` | size/icon/xl | 40 |

En Figma el eje va de mayor a menor (xl → 2xs), igual que todos los ejes de talla del archivo. La variante por defecto del component set es `2xs`.

### 02 Ejes de variante (1)

1. **size** — xl · lg · md · sm · xs · 2xs

### 03 Propiedades (1)

1. **icon** — INSTANCE_SWAP · por defecto `icon/placeholder` (`image-01`) · los glifos de la librería KIA aparecen primero en el panel (32 valores preferidos).

### 04 Cuándo usar cada «size»

El paso no se elige por gusto: lo decide el contexto. Si dudas entre dos, `sm` resuelve el 80% de los casos.

| size | px | Uso |
|---|---|---|
| xl | 40 | Ilustrativo, no funcional. Cabecera de un modal o de una pantalla de resultado. Si lo estás usando dentro de un control, el tamaño está mal. |
| lg | 32 | Iconos de estado que ocupan el centro de un bloque vacío: el alert-triangle de Image en error, el glifo de un empty state. |
| md | 24 | Iconos que se leen solos, sin texto pegado al lado: el chevron de Select en lg, el icono de Snackbar, el trailing de ListItem. |
| sm | 16 | El tamaño por defecto del sistema y el más usado con diferencia. Iconos dentro de controles: Button, LinkButton, TextField, Select, Tag, Tab. |
| xs | 12 | Acompaña texto chico: el check de Checkbox y ChoiceBox, los indicadores de MenuItem. Al lado de un cuerpo de 12 o 14. |
| 2xs | 8 | Solo para el punto del Radio en size=sm. No es un icono: es una marca. No usarlo para glifos con dibujo, que a ese tamaño se vuelven una mancha. |

### 05 Antes de usarlo

- **El tamaño no se toca a mano.** Cada variante tiene width y height bindeados a `size/icon/*`. Si redimensionas la instancia, el bindeo se rompe y el icono deja de responder al token. Se cambia con `size`, nunca arrastrando el nodo.
- **El glifo se elige adentro.** En los componentes de Core, Icon entra como instancia anidada expuesta: en Button verás leadingIcon → icon. Los slots de significado fijo (el check de Checkbox, el alert-triangle de Image en error, los de Step, Alert y Snackbar) no están expuestos a propósito, para que nadie los reemplace por error.
- **No es Icon container ni Avatar.** El glifo del avatar está atado a `component/avatar/size/glyph/*`, que escala con el avatar y no con esta escala. Avatar y MerchantAvatar quedan fuera de este componente.

### 06 Buenas prácticas

1. **Un tamaño por fila.** ✅ Los iconos de una misma fila comparten size: la línea de base no salta. ❌ Mezclar tamaños en la misma fila, o redimensionar la instancia a mano.

---

## 2. Contrato de desarrollo («Icon · Dev»)

> Qué del componente llega a código y con qué nombre. Es el acuerdo entre Figma y código del Icon, incluida la parte que Figma no sabe expresar.

### 01 Firma de código

```ts
type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface IconProps {
  name: IconName        // del catálogo de la librería (página _Iconos)
  size?: IconSize       // 'md'
  color?: string        // token semantic; por defecto hereda del contexto
  label?: string        // si falta, el icono es decorativo (aria-hidden)
}
```

### 02 Props públicas

| Prop | Tipo | Default | Property de Figma | Nota |
|---|---|---|---|---|
| name | IconName | — | icon (INSTANCE_SWAP) | Requerida. El catálogo vive en la página `_Iconos`. |
| size | '2xs' · 'xs' · 'sm' · 'md' · 'lg' · 'xl' | 'md' | size (VARIANT) | Mismos valores que el eje. En Figma van de mayor a menor. |
| color | string (token) | hereda | ninguna | Divergencia: en Figma el color lo pinta quien instancia. En código es prop, y solo acepta tokens semantic. |
| label | string | — | ninguna | Divergencia: la accesibilidad no se puede modelar en Figma. Sin label el icono es decorativo. |

### 03 Instancias anidadas (1 instancia · 1 prop)

El Icon tiene una sola instancia adentro, y es el glifo mismo: el hueco de instance swap por el que entra cualquier icono del catálogo.

| Propiedad | ¿Va a código? | Qué pasa con ella |
|---|---|---|
| (el glifo) | Sí | Es `name`. Entra por la propiedad icon, de tipo instance swap. |
| tamaño del glifo | No | Lo decide el eje size del padre, bindeado a size/icon/*. El glifo no trae tamaño propio. |
| color del glifo | No en Figma | Lo pinta quien instancia el Icon, bindeado a un token. En código es la prop `color`. |

Del Icon se usa una sola cosa, el glifo. El tamaño no se toca a mano y el color lo pone quien lo instancia, siempre con un token. Ningún componente de Core instancia un glifo directo: todos pasan por este Icon, y eso es lo que hace que cambiar un icono del catálogo se propague solo.

### 04 Quién decide cada propiedad

| Dueño | Significado | En el Icon |
|---|---|---|
| público | Es prop del padre y la pasa quien lo usa. | El glifo, que entra por la propiedad icon. |
| fijo | El padre la congela; cambiarla es cambio de contrato con revisión de Design Lead y Tech Lead. | El glifo no trae nada congelado: es un hueco vacío a propósito. |
| derivado | Sale de otra prop del padre. | El tamaño del glifo sale del eje size del padre. |
| plataforma | La resuelve el build por extensión de archivo. | Ninguna: el mismo glifo va en web y en app. |

### 05 Diferencias por plataforma

| | web | iOS · Android | Por qué |
|---|---|---|---|
| El glifo | el mismo SVG | el mismo SVG | Un icono no cambia entre plataformas. Si cambia, es otro icono. |
| Formato | SVG inline o sprite | react-native-svg | El exporter emite el mismo path; cambia el envoltorio. |
| Tamaño | rem, no px | dp | Con px, el ajuste de tamaño de fuente del navegador no hace nada: falla WCAG 1.4.4. |
| Decorativo | aria-hidden="true" | accessibilityElementsHidden / importantForAccessibility="no" | Un icono decorativo que se anuncia es ruido en el lector de pantalla. |

### 06 Estados, tokens y a11y

- **Estados:** el Icon no tiene estados y no debería tenerlos. No es un control: no se toca, no recibe foco y no cambia con la interacción. Lo que cambia de color en hover o pressed es el control que lo aloja.
- **Tokens (7):** `color/icon/default` · `size/icon/2xs` · `size/icon/lg` · `size/icon/md` · `size/icon/sm` · `size/icon/xl` · `size/icon/xs`
- **Text styles:** ninguno; el componente no tiene texto propio.
- **A11y:**
  - Sin label el icono es decorativo y va oculto al lector de pantalla.
  - Con label, el label reemplaza al icono en el anuncio y tiene que decir la acción o el dato, no el dibujo: «Cerrar», no «equis».
  - El icono nunca informa solo: el color y la forma acompañan al texto, no lo reemplazan.
  - El área tocable no la da el icono. Los 48 de `size/target/min` los pone el control que lo aloja.

### 07 Divergencias y decisiones abiertas (3)

| # | Qué | Quién lo cierra |
|---|---|---|
| 1 | `color` y `label` no existen como property en Figma: el color lo pinta quien instancia y la accesibilidad no se puede modelar en el archivo. Son dos divergencias missing-in-figma y necesitan firma para dejar de ser deuda. | Design Lead + Tech Lead. Gobernanza de KIA DS. |
| 2 | La escala de iconos no tiene paso de 20. Por eso hay componentes que usan el mismo paso para dos tallas suyas: LinkButton md y sm comparten 16, Button md y lg comparten 24. No es un problema del Icon, pero el contrato de esos dos tiene que decirlo y hoy no lo dice. | Design Lead. Decidir si entra size/icon/20 o si el solape se declara y punto. |
| 3 | El catálogo no está versionado. Agregar, renombrar o borrar un glifo cambia la unión IconName y hoy no hay proceso: se hace y se avisa por chat. | Design Lead + Tech Lead. Material de gobernanza de KIA DS. |

### 08 Antes de implementarlo

- Ningún componente de Core instancia un glifo directo: todos instancian este Icon. Es lo que hace que el tamaño salga de un solo lugar y que cambiar un glifo del catálogo se propague.
- El color no es una prop de Figma: lo pinta quien instancia, bindeado a un token. En código sí es prop, y solo acepta tokens semantic — un hex suelto rompe los modos de ese icono (dark y, en reserva, light).
- El tamaño va bindeado a size/icon/*, nunca escrito a mano. Un icono con ancho y alto fijos no responde al token.
- Sin label el icono es decorativo y va oculto al lector. Con label, el label dice la acción o el dato: «Cerrar», no «equis».
- El Icon no da área tocable. Los 48 de size/target/min los pone el control que lo aloja — un IconButton, no el Icon.
- El eje size va de mayor a menor (xl → 2xs) en Figma. En código la unión se escribe al revés por convención de lectura; los valores son los mismos.

---

## 3. Estado de la implementación

- **Catálogo de glifos:** 50 glifos nuevos desde la sección «KIA Icons» del archivo KIA Icons (`2Vlipdh8xHM1WZgOete5xq`), registrados en `src/components/Icon/glyphs.ts` (más el placeholder `image-01`). El `name` es el del componente `icon/<nombre>` sin el prefijo. Son iconos de trazo (1 px) convertidos a contorno relleno, porque `<Icon>` pinta con `fill`: si un icono cambia en Figma hay que volver a exportarlo. `icon/windmill` medía 30×30 en Figma y se centró en 24×24 sin escalar. La página `_Iconos` de la librería KIA sigue sin ser accesible desde «KIA Core Componentes», así que no hay equivalencia 1:1 con esos 32 componentes.
- `color` por defecto es `icon/default` del tema (no «hereda del contexto» como dice el contrato: no hay contexto de color en el theme todavía).
- **React Native:** `Icon.tsx` es la versión iOS/Android (react-native-svg, dp, props de accesibilidad nativas) e `Icon.web.tsx` la web (SVG inline en rem, `aria-*`). Se separan por extensión de archivo como pide el contrato, porque `react-native-svg` no corre sobre `react-native-web` (importa `TurboModuleRegistry`). Verificado en web (Storybook); la versión nativa pasa typecheck pero **no se ha probado en dispositivo/simulador**.
