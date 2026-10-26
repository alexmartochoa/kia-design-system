// Lee foundations/kia-foundations-variables.json (export W3C de Figma, todas las colecciones) y genera:
//   src/tokens/variables.data.json -> todas las variables no-color, con alias resueltos por modo
//   src/tokens/variables.ts        -> variables[colección]['ruta/del/token'][modo] para RN
// Los colores ya los cubre build-tokens.mjs (con descripciones de los .md).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(join(root, 'foundations/kia-foundations-variables.json'), 'utf8'));
const EXT = 'figma-console-mcp';

const lookup = (ref) => {
  const [collection, ...path] = ref.replace(/[{}]/g, '').split('.');
  let node = src[collection];
  for (const p of path) node = node?.[p];
  return { collection, path, node };
};

const modeValue = (node, mode, depth = 0) => {
  if (depth > 8) throw new Error('alias circular');
  const synced = node.$extensions?.[EXT]?.lastSyncedValue;
  const entry = synced?.[mode] ?? (synced ? Object.values(synced)[0] : undefined);
  if (entry && 'literal' in entry) return entry.literal;
  const ref = entry?.reference ?? (typeof node.$value === 'string' && node.$value.startsWith('{') ? node.$value : null);
  if (ref) {
    const target = lookup(ref).node;
    if (!target) throw new Error(`alias roto: ${ref}`);
    return modeValue(target, mode, depth + 1);
  }
  return node.$value;
};

const vars = [];
const walk = (collection, node, path) => {
  if ('$value' in node) {
    const ext = node.$extensions?.[EXT];
    const modes = Object.keys(ext?.lastSyncedValue ?? { Default: 1 });
    vars.push({
      collection,
      name: path.join('/'),
      type: node.$type,
      description: node.$description ?? '',
      alias: typeof node.$value === 'string' && node.$value.startsWith('{') ? node.$value.replace(/[{}]/g, '') : undefined,
      values: Object.fromEntries(modes.map((m) => [m, modeValue(node, m)])),
    });
    return;
  }
  for (const [k, v] of Object.entries(node)) if (k[0] !== '$' && typeof v === 'object') walk(collection, v, [...path, k]);
};
for (const [collection, tree] of Object.entries(src)) if (collection[0] !== '$') walk(collection, tree, []);

const nonColor = vars.filter((v) => v.type !== 'color');
const out = join(root, 'src/tokens');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'variables.data.json'), JSON.stringify(nonColor, null, 2) + '\n');

const byCollection = {};
for (const v of nonColor) (byCollection[v.collection] ??= {})[v.name] = v.values;
const ts = `// GENERADO por scripts/build-variables.mjs desde foundations/kia-foundations-variables.json. No editar a mano.
// Uso: variables.radius['action/ios'].regular · variables.motion['duration/medium'].Default
// Motion: duraciones en ms; easing como string cubic-bezier (en RN usar Easing.bezier).
export const variables = ${JSON.stringify(byCollection, null, 2)} as const;

export type VariableCollection = keyof typeof variables;
`;
writeFileSync(join(out, 'variables.ts'), ts);

const counts = Object.fromEntries(Object.entries(byCollection).map(([k, v]) => [k, Object.keys(v).length]));
console.log(`Variables totales: ${vars.length} (color: ${vars.length - nonColor.length}, otras: ${nonColor.length})`, counts);
