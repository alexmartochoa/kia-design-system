# Motion — Kia App (tokens y criterio de diseño)

- **Archivo de Figma:** FoundatiosKia (`FCrL9DSEDaT0EgGg5y3aJ5`)
- **Página:** Motion · frame de documentación `Motion — Kia App` (node `53:3511`)
- **Fecha de lectura:** 2026-10-26
- **Encabezado de la página:** "KIA DS · Foundations · Motion | Oct 23, 2026 · @Alejandro"
- **Fuente de verdad de valores:** las variables de Figma (colección `Motion`).

> La página también contiene 8 frames de pantallas de la app (`home`, `Gestionar mi kia`, `home + modal`, `Con pago a través de Kia pay` y sus versiones `· Semantic`). Son mockups de UI, no documentación de motion; su texto no se incluye aquí.

---

## 1. Documentación de la página

### Encabezado
MOTION
KIA DS · Foundations · Motion   |   Oct 23, 2026 · @Alejandro

### Cómo leer el motion
El movimiento tiene ritmo propio: pocas duraciones y pocas curvas. Rápido para lo chico, algo más largo para lo que ocupa toda la pantalla.

Hoy la app tiene poco motion (la entrada del carro, una hoja que se desliza). Esta página queda como base para lo que venga.

En esta página: 01 Duraciones · 02 Permanencia · 03 Las curvas · 04 En la app Kia · 05 Buenas prácticas · 06 Referencia de tokens

Notas:
- Nombre: motion/{tipo}/{paso}, con tipo = duration, dwell o easing. En código: var(--motion-duration-short).
- Colección: Motion, un solo modo (Default). Las duraciones y permanencias van en milisegundos; las curvas, como texto cubic-bezier.
- Las variables no tienen alcance de capa: Figma no aplica tiempos ni curvas a propiedades, así que no aparecen en los selectores. Se leen desde aquí y desde Dev Mode.
- Esta página manda: si un valor de código no coincide, vale el de aquí.

### 01 Duraciones — 5 pasos
De lo más rápido a lo más lento. Cuanto más grande el cambio en pantalla, un poco más larga la animación. Extra-long es solo para que un gráfico o un dato protagonista se dibuje a la vista, nunca para controles.

Escala visual: micro 100 ms · short 200 ms · medium 250 ms · long 400 ms · extra-long 700 ms

| Token | Valor | Uso |
|---|---|---|
| motion/duration/micro | 100 ms | Micro-interacciones: un check, un switch. |
| motion/duration/short | 200 ms | Lo de siempre: menús, tooltips. |
| motion/duration/medium | 250 ms | Cambios más grandes: hojas, transiciones. |
| motion/duration/long | 400 ms | Pantalla completa: entrar o salir de una vista. |
| motion/duration/extra-long | 700 ms | Gráficos y datos protagonistas que se dibujan. |

### 02 Permanencia — 3 pasos
Cuánto se queda en pantalla algo que se va solo.

No es animación: el movimiento se apaga con Reduce Motion, el contador nunca.

| Token | Valor | Uso |
|---|---|---|
| motion/dwell/short | 4 s | Confirmación sin acción, que nadie tiene que responder. |
| motion/dwell/default | 6 s | Lo de siempre: el Snackbar. El contador arranca al montar y no se reinicia. |
| motion/dwell/long | 10 s | Cuando el mensaje trae acción: leer, decidir y llegar al control. Si no alcanza, el patrón es Alert. |

### 03 Las curvas — 4 curvas
La curva define cómo arranca y frena el movimiento. Cada una para un momento.

| Curva | Valor | Descripción | Token |
|---|---|---|---|
| standard | cubic-bezier(0.2, 0, 0, 1) | Lo general, entra y sale. | motion/easing/standard |
| enter | cubic-bezier(0, 0, 0.2, 1) | Algo que aparece: frena suave. | motion/easing/enter |
| exit | cubic-bezier(0.4, 0, 1, 1) | Algo que se va: acelera al salir. | motion/easing/exit |
| emphasized | cubic-bezier(0.05, 0.7, 0.1, 1) | Momentos con más carácter. | motion/easing/emphasized |

### 04 En la app Kia — Base · por validar
Cómo se aplican los tokens a lo que la app ya mueve hoy. Cuando aparezca un movimiento nuevo, se agrega aquí antes de pasar a desarrollo.

| Momento | Duración | Curva | Nota |
|---|---|---|---|
| El carro entra en la home | duration/long · 400 ms | easing/emphasized | Es el protagonista de la pantalla: entra con carácter y frena suave. |
| Cambiar de vehículo (deslizar entre carros) | duration/medium · 250 ms | easing/standard | El que sale y el que entra se mueven juntos, en la misma dirección. |
| Hoja o modal que sube | duration/medium · 250 ms | easing/enter | Se desliza desde abajo y frena al llegar. |
| Hoja o modal que se cierra | duration/short · 200 ms | easing/exit | Salir un paso más rápido que entrar: lo que se va no hace esperar. |
| Cambio de vista completa | duration/long · 400 ms | easing/standard | Entrar o salir de una pantalla. |
| Menú, tooltip | duration/short · 200 ms | easing/standard | — |
| Switch, check | duration/micro · 100 ms | easing/standard | — |
| Snackbar | duration/short · 200 ms | enter al aparecer · exit al irse | Se queda motion/dwell/default (6 s); 10 s si trae acción. |
| Gráfico o dato protagonista | duration/extra-long · 700 ms | easing/enter | Solo datos que se dibujan (consumo, batería). Nunca controles. |

### 05 Buenas prácticas — Do · Don’t
Reglas cortas para que el movimiento ayude y no moleste.

**Do**
- Rápido para lo chico, un poco más para lo grande.
- Usar la curva que corresponde a entrar o salir.
- Respetar «reducir movimiento» del sistema.

**Don’t**
- Animaciones largas que hacen esperar.
- Rebotes o efectos llamativos sin motivo.
- Mover muchas cosas a la vez.

### 06 Referencia de tokens — 12 tokens · colección Motion
Duraciones, permanencias y curvas, con su nombre y para qué sirven.

| Variable en Figma | Código | Valor | Para qué sirve |
|---|---|---|---|
| motion/duration/micro | var(--motion-duration-micro) | 100 ms | Micro-interacción |
| motion/duration/short | var(--motion-duration-short) | 200 ms | Menús, tooltips |
| motion/duration/medium | var(--motion-duration-medium) | 250 ms | Hojas, transiciones |
| motion/duration/long | var(--motion-duration-long) | 400 ms | Pantalla completa |
| motion/duration/extra-long | var(--motion-duration-extra-long) | 700 ms | Entrada de un gráfico |
| motion/dwell/short | var(--motion-dwell-short) | 4000 ms | Efímero sin acción |
| motion/dwell/default | var(--motion-dwell-default) | 6000 ms | Base: el Snackbar |
| motion/dwell/long | var(--motion-dwell-long) | 10000 ms | Efímero con acción |
| motion/easing/standard | var(--motion-easing-standard) | cubic-bezier(0.2, 0, 0, 1) | Movimiento general |
| motion/easing/enter | var(--motion-easing-enter) | cubic-bezier(0, 0, 0.2, 1) | Algo que aparece |
| motion/easing/exit | var(--motion-easing-exit) | cubic-bezier(0.4, 0, 1, 1) | Algo que se va |
| motion/easing/emphasized | var(--motion-easing-emphasized) | cubic-bezier(0.05, 0.7, 0.1, 1) | Momento destacado |

---

## 2. Índice de tokens

### Colección `Motion` — 12 variables · 1 modo (`Default`)
Ninguna variable es alias (todas son valores directos; no hay colección de primitivos para Motion). `scopes` vacío en todas (no aparecen en selectores de Figma). `codeSyntax` definido solo para WEB.

**Grupo `motion/duration`** (tipo FLOAT, milisegundos)

| Token | Alias | Valor (Default) | Descripción en Figma |
|---|---|---|---|
| motion/duration/micro | — | 100 | 100 ms · Micro-interacción: un check, un switch. |
| motion/duration/short | — | 200 | 200 ms · Lo de siempre: menús, tooltips. |
| motion/duration/medium | — | 250 | 250 ms · Cambios más grandes: hojas, transiciones. |
| motion/duration/long | — | 400 | 400 ms · Pantalla completa: entrar o salir de una vista. |
| motion/duration/extra-long | — | 700 | 700 ms · Gráficos y datos protagonistas que se dibujan. Nunca para controles. |

**Grupo `motion/dwell`** (tipo FLOAT, milisegundos)

| Token | Alias | Valor (Default) | Descripción en Figma |
|---|---|---|---|
| motion/dwell/short | — | 4000 | 4 s · Confirmación sin acción. No es animación: no se apaga con Reduce Motion. |
| motion/dwell/default | — | 6000 | 6 s · Base: el Snackbar. El contador arranca al montar y no se reinicia. |
| motion/dwell/long | — | 10000 | 10 s · Mensaje con acción. Si no alcanza, el patrón es Alert. |

**Grupo `motion/easing`** (tipo STRING)

| Token | Alias | Valor (Default) | Descripción en Figma |
|---|---|---|---|
| motion/easing/standard | — | cubic-bezier(0.2, 0, 0, 1) | Lo general, entra y sale. |
| motion/easing/enter | — | cubic-bezier(0, 0, 0.2, 1) | Algo que aparece: frena suave. |
| motion/easing/exit | — | cubic-bezier(0.4, 0, 1, 1) | Algo que se va: acelera al salir. |
| motion/easing/emphasized | — | cubic-bezier(0.05, 0.7, 0.1, 1) | Momentos con más carácter. |

Sintaxis de código (WEB): `var(--motion-{tipo}-{paso})`, p. ej. `var(--motion-duration-short)`.

---

## 3. Reglas para la IA

1. Nunca escribas duraciones ni curvas a mano: usa siempre `var(--motion-duration-*)`, `var(--motion-dwell-*)` y `var(--motion-easing-*)`.
2. Elige la duración por tamaño del cambio: micro (check, switch) → short (menús, tooltips) → medium (hojas, transiciones) → long (pantalla completa) → extra-long (solo gráficos o datos protagonistas que se dibujan).
3. `motion/duration/extra-long` jamás en controles; solo en datos que se dibujan (consumo, batería).
4. Elige la curva por dirección: `enter` para lo que aparece, `exit` para lo que se va, `standard` para lo general, `emphasized` solo para momentos con carácter (p. ej. el carro entrando en la home).
5. Salir es un paso más rápido que entrar: una hoja/modal que sube usa medium + enter; al cerrarse usa short + exit.
6. Snackbar: duration/short con enter al aparecer y exit al irse; permanencia `dwell/default` (6 s), `dwell/short` (4 s) si es confirmación sin acción, `dwell/long` (10 s) si trae acción. Si 10 s no alcanza, usa Alert, no alargues el dwell.
7. El contador de dwell arranca al montar y no se reinicia; no se desactiva con Reduce Motion (las animaciones sí).
8. Respeta «reducir movimiento» del sistema: apaga duraciones/curvas, nunca el dwell.
9. Evita animaciones largas, rebotes sin motivo y mover muchas cosas a la vez.
10. Si necesitas un movimiento que no está en la tabla "04 En la app Kia" (marcada "Base · por validar"), no lo inventes: agrégalo primero a la documentación.

---

## 4. Inconsistencias

Entre el texto de la página y las variables **no se encontraron diferencias de valores**: los 12 tokens, sus valores, el conteo (5 + 3 + 4 = 12) y los nombres coinciden. Variables = fuente de verdad. Observaciones menores:

- Unidades: el texto muestra dwell en segundos (4 s, 6 s, 10 s) en las secciones 02 y 04, y en la referencia (06) en ms (4000, 6000, 10000). Equivalentes; la variable guarda milisegundos.
- La tabla "04 En la app Kia" nombra los tokens sin prefijo (`duration/long`, `easing/emphasized`); el nombre real es `motion/duration/long`, etc.
- Las descripciones de las variables no siempre repiten el texto de la página: `motion/duration/extra-long` incluye "Nunca para controles" y `motion/dwell/short` incluye "no se apaga con Reduce Motion", frases que en la página aparecen en párrafos de sección. `motion/duration/extra-long` se describe como "Entrada de un gráfico" en 06 y "Gráficos y datos protagonistas que se dibujan" en 01 (mismo sentido).
- La nota de la página "Esta página manda: si un valor de código no coincide, vale el de aquí" coincide con los valores de las variables; para esta tarea ambos concuerdan.
- Solo existe `codeSyntax` WEB; no hay sintaxis para iOS ni Android aunque la colección `platform` las contempla.
- No hay modos adicionales (solo `Default`): no existe variación por plataforma ni por tamaño de pantalla.
