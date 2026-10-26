import type { Preview } from '@storybook/react-native-web-vite';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { colors } from '../src/tokens/tokens';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema (la app solo usa dark)',
      toolbar: { title: 'Tema', icon: 'circlehollow', items: ['dark', 'light'], dynamicTitle: true },
    },
    density: {
      description: 'Densidad de pantalla (spacing)',
      toolbar: { title: 'Densidad', icon: 'mobile', items: ['compact', 'regular', 'expanded'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'dark', density: 'regular' },
  parameters: { layout: 'centered', backgrounds: { disable: true } },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme as 'dark' | 'light';
      return (
        <ThemeProvider theme={theme} density={ctx.globals.density}>
          <div style={{ background: colors[theme]['surface/base'], padding: 24 }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
