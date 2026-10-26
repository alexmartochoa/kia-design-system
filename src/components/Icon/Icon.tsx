import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeProvider';
import { glyphs } from './glyphs';
import { iconPx, type IconProps } from './shared';

export type { IconProps, IconSize } from './shared';

/**
 * iOS · Android (react-native-svg, tamaño en dp). La versión web es Icon.web.tsx: el build
 * elige por extensión de archivo, no por prop. Contrato: components/kia-icon-component.md.
 */
export function Icon({ name, size = 'md', color, label }: IconProps) {
  const theme = useTheme();
  const px = iconPx(size);
  const fill = color ?? theme.color['icon/default'];
  const a11y = label
    ? ({ accessible: true, accessibilityRole: 'image', accessibilityLabel: label } as const)
    : ({ accessible: false, accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' } as const);

  return (
    <Svg width={px} height={px} viewBox="0 0 24 24" fill="none" {...a11y}>
      <Path d={glyphs[name]} fill={fill} />
    </Svg>
  );
}
