// Bloques de documentación (DOM). Leen tokens.data.json, generado desde los .md.
import tokens from '../tokens/tokens.data.json';

const { color, spacing, typography } = tokens;
const mono = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12 } as const;
const checker =
  'repeating-conic-gradient(#8883 0% 25%, transparent 0% 50%) 50% / 12px 12px';

const Swatch = ({ value, size = 32 }: { value: string; size?: number }) => (
  <span style={{ display: 'inline-block', width: size, height: size, borderRadius: 6, background: checker, border: '1px solid #8884', verticalAlign: 'middle', overflow: 'hidden' }}>
    <span style={{ display: 'block', width: '100%', height: '100%', background: value }} />
  </span>
);

const Table = ({ head, children }: { head: string[]; children: React.ReactNode }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
    <thead>
      <tr>{head.map((h) => <th key={h} style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #8886' }}>{h}</th>)}</tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
const td = { padding: '6px 8px', borderBottom: '1px solid #8883', verticalAlign: 'middle' } as const;

export const ColorRamps = () => (
  <div style={{ display: 'grid', gap: 20 }}>
    {color.ramps.map((r) => (
      <div key={r.name}>
        <div style={{ marginBottom: 6 }}><b>{r.name}</b> <span style={{ opacity: 0.7 }}>· {r.role}</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gap: 4 }}>
          {Object.entries(r.steps).map(([step, hex]) => (
            <div key={step} title={`${r.name}/${step} ${hex}`}>
              <div style={{ height: 40, borderRadius: 6, background: hex, border: '1px solid #8884' }} />
              <div style={{ ...mono, fontSize: 10, marginTop: 2 }}>{step}</div>
              <div style={{ ...mono, fontSize: 9, opacity: 0.7 }}>{hex}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const AlphaTable = () => (
  <Table head={['', 'Token', 'Valor', 'Opacidad', 'Uso']}>
    {[...color.alpha, ...color.static].map((a) => (
      <tr key={a.name}>
        <td style={td}><Swatch value={a.value} /></td>
        <td style={{ ...td, ...mono }}>{a.name}</td>
        <td style={{ ...td, ...mono }}>{a.value}</td>
        <td style={td}>{a.opacity}</td>
        <td style={td}>{a.usage}</td>
      </tr>
    ))}
  </Table>
);

export const SemanticTable = ({ group }: { group: string }) => (
  <Table head={['Token', 'Dark', 'Light', 'Descripción']}>
    {color.semantic.filter((t) => t.group === group).map((t) => (
      <tr key={t.name}>
        <td style={{ ...td, ...mono }}>{t.name}</td>
        <td style={td}><Swatch value={t.dark} size={22} /> <span style={mono}>{t.darkRef}</span></td>
        <td style={td}><Swatch value={t.light} size={22} /> <span style={mono}>{t.lightRef}</span></td>
        <td style={td}>{t.description}</td>
      </tr>
    ))}
  </Table>
);

export const semanticGroups = [...new Set(color.semantic.map((t) => t.group))];

export const SpaceScale = () => (
  <Table head={['Token', 'px', '']}>
    {spacing.scale.map((s) => (
      <tr key={s.name}>
        <td style={{ ...td, ...mono }}>{s.name}</td>
        <td style={td}>{s.value}</td>
        <td style={td}><span style={{ display: 'inline-block', height: 12, width: s.value, background: '#8FB162', borderRadius: 2 }} /></td>
      </tr>
    ))}
  </Table>
);

export const SpaceRoles = ({ role }: { role: keyof typeof spacing.roles }) => (
  <Table head={['Token', 'compact', 'regular', 'expanded']}>
    {spacing.roles[role].map((t) => (
      <tr key={t.name}>
        <td style={{ ...td, ...mono }}>{t.name}</td>
        {(['compact', 'regular', 'expanded'] as const).map((d) => (
          <td key={d} style={td}>
            {t[d]} px <span style={{ display: 'inline-block', height: 10, width: t[d], background: '#72A2C8', borderRadius: 2, marginLeft: 6 }} />
          </td>
        ))}
      </tr>
    ))}
  </Table>
);

export const TypeScale = () => (
  <Table head={['Estilo', 'Especificación', 'Ejemplo']}>
    {typography.styles.map((s) => (
      <tr key={s.name}>
        <td style={{ ...td, ...mono }}>{s.name}</td>
        <td style={td}>{s.size}/{s.lineHeight} · {s.fontFamily} {s.weight} · {s.tracking}%<br /><span style={{ opacity: 0.7 }}>{s.description}</span></td>
        <td style={td}>
          <span style={{ fontFamily: s.family === 'mono' ? 'ui-monospace, Menlo, monospace' : 'system-ui, sans-serif', fontWeight: Number(s.weight), fontSize: s.size, lineHeight: `${s.lineHeight}px`, letterSpacing: `${s.tracking / 100}em`, textTransform: s.upper ? 'uppercase' : 'none' }}>
            {s.upper ? 'Antetítulo' : s.name.includes('amount') ? '2,4' : s.name.includes('otp') ? '4 8 2 9' : 'Kia EV2 · 78 %'}
          </span>
        </td>
      </tr>
    ))}
  </Table>
);

// ---------- Variables no-color (variables.data.json) ----------
import { useState } from 'react';
import variablesData from '../tokens/variables.data.json';

type Variable = (typeof variablesData)[number];

const preview = (v: Variable, value: unknown) => {
  const n = Number(value);
  const isNum = typeof value === 'number';
  if (v.collection.startsWith('radius') && isNum)
    return <span style={{ display: 'inline-block', width: 28, height: 28, border: '2px solid #72A2C8', borderRadius: Math.min(n, 14), verticalAlign: 'middle', marginLeft: 6 }} />;
  if ((v.collection === 'size' || v.collection === 'border-primitives') && isNum)
    return <span style={{ display: 'inline-block', height: v.collection === 'size' ? 8 : Math.max(n, 1), width: v.collection === 'size' ? Math.min(n, 120) : 48, background: '#8FB162', borderRadius: 2, verticalAlign: 'middle', marginLeft: 6 }} />;
  if (v.type === 'duration' && isNum)
    return <span style={{ display: 'inline-block', height: 8, width: n / 5, background: '#F3C300', borderRadius: 2, verticalAlign: 'middle', marginLeft: 6 }} />;
  return null;
};

export const VariableTable = ({ collection, prefix = '' }: { collection: string; prefix?: string }) => {
  const list = variablesData.filter((v) => v.collection === collection && v.name.startsWith(prefix));
  const modes = [...new Set(list.flatMap((v) => Object.keys(v.values)))];
  return (
    <Table head={['Token', ...modes, 'Descripción']}>
      {list.map((v) => (
        <tr key={v.name}>
          <td style={{ ...td, ...mono }}>{v.name}{v.alias && <div style={{ opacity: 0.6, fontSize: 10 }}>→ {v.alias}</div>}</td>
          {modes.map((m) => {
            const val = (v.values as Record<string, unknown>)[m];
            return <td key={m} style={{ ...td, ...mono }}>{val === undefined ? '—' : String(val)}{preview(v, val)}</td>;
          })}
          <td style={td}>{v.description}</td>
        </tr>
      ))}
    </Table>
  );
};

export const VariablesExplorer = () => {
  const collections = [...new Set(variablesData.map((v) => v.collection))];
  const [col, setCol] = useState(collections[0]);
  const [q, setQ] = useState('');
  const shown = variablesData.filter((v) => v.collection === col && v.name.includes(q.trim()));
  const modes = [...new Set(shown.flatMap((v) => Object.keys(v.values)))];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <select value={col} onChange={(e) => setCol(e.target.value)} style={{ padding: 6 }}>
          {collections.map((c) => <option key={c} value={c}>{c} ({variablesData.filter((v) => v.collection === c).length})</option>)}
        </select>
        <input placeholder="Filtrar por nombre…" value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: 6, flex: 1, minWidth: 160 }} />
      </div>
      <Table head={['Token', 'Tipo', ...modes, 'Descripción']}>
        {shown.map((v) => (
          <tr key={v.name}>
            <td style={{ ...td, ...mono }}>{v.name}</td>
            <td style={td}>{v.type}</td>
            {modes.map((m) => <td key={m} style={{ ...td, ...mono }}>{String((v.values as Record<string, unknown>)[m] ?? '—')}</td>)}
            <td style={td}>{v.description}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
