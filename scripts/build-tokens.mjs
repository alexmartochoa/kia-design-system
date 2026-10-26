// Lee los kia-*-tokens.md de la raíz y genera:
//   src/tokens/tokens.data.json  -> datos crudos (los usan las páginas de docs)
//   src/tokens/tokens.ts    -> objetos tipados para React Native
// Los .md son la fuente de verdad: no edites los archivos generados.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8').split('\n');
const cells = (line) =>
  line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
const rows = (lines) => lines.filter((l) => l.trim().startsWith('|')).map(cells);
const unq = (s) => s.replace(/`/g, '');
const HEX = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/;
const num = (s) => parseFloat(s.replace('−', '-').replace(',', '.').replace('+', ''));

// ---------- Color ----------
const STEPS = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '975'];
const color = { ramps: [], alpha: [], static: [], semantic: [] };
for (const c of rows(read('kia-color-tokens.md'))) {
  const name = unq(c[0]);
  if (c.length === 15 && /^[a-z]+$/.test(name) && c.slice(2).every((h) => HEX.test(h))) {
    color.ramps.push({ name, role: c[1], steps: Object.fromEntries(STEPS.map((s, i) => [s, c[i + 2]])) });
  } else if (/^alpha\//.test(name) && HEX.test(c[1])) {
    color.alpha.push({ name, value: c[1], opacity: c[2], usage: c[3] });
  } else if (/^static\//.test(name) && HEX.test(c[1])) {
    color.static.push({ name, value: c[1], opacity: c[2], usage: c[3] });
  } else if (/^color\//.test(name) && c[1]?.includes('→')) {
    const hex = (s) => s.split('→')[1].trim();
    color.semantic.push({
      name,
      group: name.split('/')[1],
      dark: hex(c[1]),
      light: hex(c[2]),
      darkRef: c[1].split('→')[0].trim(),
      lightRef: c[2].split('→')[0].trim(),
      description: c[3] ?? '',
    });
  }
}

// ---------- Spacing ----------
const spacing = { scale: [], roles: {} };
for (const c of rows(read('kia-spacing-tokens.md'))) {
  const name = unq(c[0]);
  let m;
  if ((m = name.match(/^space\/scale\/(\d+)$/)) && /px$/.test(c[1])) {
    spacing.scale.push({ name, value: +m[1] });
  } else if ((m = name.match(/^space\/(\w+)\/(\w+)$/)) && m[1] !== 'scale' && c.length === 4) {
    const px = (s) => +s.match(/\((\d+)\)/)[1];
    (spacing.roles[m[1]] ??= []).push({ name, key: m[2], compact: px(c[1]), regular: px(c[2]), expanded: px(c[3]) });
  }
}

// ---------- Typography ----------
const WEIGHT = { Light: '300', Regular: '400', Bold: '600' };
const typo = { family: {}, weight: WEIGHT, size: {}, lineHeight: {}, letterSpacing: {}, styles: [] };
for (const c of rows(read('kia-typography-tokens.md'))) {
  const name = unq(c[0]);
  if (/^font\/family\//.test(name)) typo.family[name.split('/')[2]] = c[3];
  else if (/^font\/size\//.test(name)) typo.size[name.replace('font/size/', '')] = +c[2];
  else if (/^font\/line-height\//.test(name)) typo.lineHeight[name.split('/')[2]] = +c[2];
  else if (/^font\/letter-spacing\//.test(name)) typo.letterSpacing[name.split('/')[2]] = +c[2];
  else if (/^text\//.test(name) && c.length >= 7) {
    const left = (s) => s.split('→')[0].trim();
    const right = (s) => s.split('→')[1].trim();
    typo.styles.push({
      name,
      family: right(c[1]).replace('family/', ''),
      fontFamily: left(c[1]),
      weight: WEIGHT[left(c[2])],
      size: num(left(c[3])),
      lineHeight: num(left(c[4])),
      tracking: num(c[5]),
      upper: /UPPER/.test(c[5]),
      description: c[6],
    });
  }
}

// ---------- Validación mínima ----------
const expect = { ramps: 12, semantic: 81, scale: 15, styles: 25 };
const got = { ramps: color.ramps.length, semantic: color.semantic.length, scale: spacing.scale.length, styles: typo.styles.length };
for (const k of Object.keys(expect)) {
  if (got[k] !== expect[k]) console.warn(`⚠ ${k}: esperaba ${expect[k]} y leí ${got[k]}`);
}
console.log('Tokens leídos:', got, `alpha=${color.alpha.length} static=${color.static.length}`);

// ---------- Salida ----------
const out = join(root, 'src/tokens');
mkdirSync(out, { recursive: true });
const data = { color, spacing, typography: typo };
writeFileSync(join(out, 'tokens.data.json'), JSON.stringify(data, null, 2) + '\n');

// tokens.ts para RN: colores resueltos por tema, spacing por densidad, estilos de texto
const obj = (entries) => '{\n' + entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n') + '\n}';

const prim = {};
for (const r of color.ramps) for (const s of STEPS) prim[`${r.name}/${s}`] = r.steps[s];
for (const a of [...color.alpha, ...color.static]) prim[a.name] = a.value;

const dark = color.semantic.map((t) => [t.name.replace(/^color\//, ''), t.dark]);
const light = color.semantic.map((t) => [t.name.replace(/^color\//, ''), t.light]);

const density = (d) =>
  Object.values(spacing.roles).flat().map((t) => [t.name.replace(/^space\//, ''), t[d]]);

const styles = typo.styles.map((s) => [
  s.name.replace(/^text\//, ''),
  {
    fontFamily: s.fontFamily,
    fontWeight: s.weight,
    fontSize: s.size,
    lineHeight: s.lineHeight,
    // RN usa px: el tracking del Figma está en %
    letterSpacing: +((s.tracking / 100) * s.size).toFixed(2),
    ...(s.upper ? { textTransform: 'uppercase' } : {}),
  },
]);

const ts = `// GENERADO por scripts/build-tokens.mjs desde los kia-*-tokens.md. No editar a mano.
import type { TextStyle } from 'react-native';

/** Primitivos: rampas, alpha y static. Clave = nombre de Figma (p. ej. "forest/600"). */
export const primitives = ${obj(Object.entries(prim))} as const;

/** Colores semánticos por tema. Clave sin el prefijo "color/" (p. ej. "surface/base"). */
export const colors = {
  dark: ${obj(dark).replace(/\n/g, '\n  ')},
  light: ${obj(light).replace(/\n/g, '\n  ')},
} as const;

export type ColorToken = keyof typeof colors.dark;
export type ThemeName = keyof typeof colors;

/** Escala base de spacing (px). */
export const spaceScale = ${obj(spacing.scale.map((s) => [s.name.replace('space/scale/', ''), s.value]))} as const;

/** Roles de spacing (inset, stack, inline, gutter) por densidad de pantalla. */
export const space = {
  compact: ${obj(density('compact')).replace(/\n/g, '\n  ')},
  regular: ${obj(density('regular')).replace(/\n/g, '\n  ')},
  expanded: ${obj(density('expanded')).replace(/\n/g, '\n  ')},
} as const;

export type SpaceToken = keyof typeof space.regular;
export type Density = keyof typeof space;

/**
 * Estilos de texto text/*. Las fuentes "Kia Signature" e "IBM Plex Mono" hay que
 * cargarlas en la app (expo-font o linking nativo); en Storybook cae a la fuente del sistema.
 */
export const textStyles = ${obj(styles)} as const satisfies Record<string, TextStyle>;

export type TextStyleToken = keyof typeof textStyles;
`;
writeFileSync(join(out, 'tokens.ts'), ts);
console.log('Generado src/tokens/tokens.data.json y tokens.ts');
