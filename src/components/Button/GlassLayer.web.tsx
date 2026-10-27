import { useTheme } from '../../theme/ThemeProvider';
import { componentColors, variables } from '../../tokens/variables';
import { useButtonRadius, type GlassLayerProps } from './shared';

/** Web. Mismo vidrio que GlassLayer.tsx, con CSS: degradado + backdrop-filter con elevation/raised/glass-blur. */
export function GlassLayer({ flat, radius: radiusProp }: GlassLayerProps) {
  const { name } = useTheme();
  const color = componentColors[name];
  const buttonRadius = useButtonRadius().radius;
  const radius = radiusProp ?? buttonRadius;
  const blur = `blur(${variables.semantic['elevation/raised/glass-blur'].dark}px)`;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: radius,
        pointerEvents: 'none',
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        background:
          flat ??
          `linear-gradient(180deg, ${color['component/button/primary-glass/bg']}, ${color['component/button/primary-glass/bg-end']})`,
      }}
    />
  );
}
