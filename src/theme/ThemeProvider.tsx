import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { colors, space, textStyles, type Density, type ThemeName } from '../tokens/tokens';

type Theme = {
  name: ThemeName;
  density: Density;
  color: (typeof colors)[ThemeName];
  space: (typeof space)[Density];
  text: typeof textStyles;
};

const build = (name: ThemeName, density: Density): Theme => ({
  name,
  density,
  color: colors[name],
  space: space[density],
  text: textStyles,
});

const ThemeContext = createContext<Theme>(build('dark', 'regular'));

// La app solo tiene modo oscuro; light queda como reserva (ver kia-color-tokens.md).
export function ThemeProvider({
  theme = 'dark',
  density = 'regular',
  children,
}: {
  theme?: ThemeName;
  density?: Density;
  children: ReactNode;
}) {
  const value = useMemo(() => build(theme, density), [theme, density]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
