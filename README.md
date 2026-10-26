# KIA Design System · Storybook

Storybook (React Native Web + Vite) del design system de la app KIA.

```bash
npm install
npm run storybook        # regenera tokens y abre http://localhost:6006
npm run build-storybook  # build estático en storybook-static/
```

## Cómo está armado
- `foundations/`: `kia-*-tokens.md` y `kia-foundations-variables.json`, fuente de verdad (exportados de Figma `FoundatiosKia`).
- `scripts/build-tokens.mjs`: lee los `.md` y genera `src/tokens/tokens.ts` (para RN) y `tokens.data.json` (para docs). No editar a mano.
- `src/theme/ThemeProvider.tsx`: `useTheme()` → `color`, `space`, `text` según tema y densidad.
- `src/foundations/*.mdx`: páginas de Foundations (Color, Spacing, Typography, Radius, Sizing, Elevation, Motion, More y el explorador de variables).
- `src/components/<Nombre>/`: un componente RN + su `.stories.tsx` (ver `Button`).
- `.storybook/preview-head.html`: reemplazar los sustitutos de fuente por Kia Signature / IBM Plex Mono.
