import { useTheme } from '../../theme/ThemeProvider';
import { glyphs } from './glyphs';
import { iconPx, type IconProps } from './shared';

export type { IconProps, IconSize } from './shared';

/**
 * Web: SVG inline con tamaño en rem (respeta el tamaño de fuente del navegador, WCAG 1.4.4).
 * react-native-svg no corre sobre react-native-web, por eso hay un archivo por plataforma.
 */
export function Icon({ name, size = 'md', color, label }: IconProps) {
  const theme = useTheme();
  const rem = `${iconPx(size) / 16}rem`;
  const fill = color ?? theme.color['icon/default'];
  const a11y = label
    ? ({ role: 'img', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <svg width={rem} height={rem} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} {...a11y}>
      <path d={glyphs[name]} fill={fill} />
    </svg>
  );
}
