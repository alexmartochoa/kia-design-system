import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Spinner, type SpinnerAppearance, type SpinnerSize } from './Spinner';
import { useTheme } from '../../theme/ThemeProvider';

const appearances: SpinnerAppearance[] = ['brand', 'primary', 'on-brand'];
const sizes: SpinnerSize[] = ['lg', 'md', 'sm'];

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: { appearance: 'brand', size: 'md', label: 'Cargando' },
  argTypes: {
    appearance: { control: 'select', options: appearances },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Matriz de variantes: columnas appearance, filas size (16 · 24 · 32 = size/icon/sm · md · lg). */
export const Matrix: Story = {
  render: (args) => {
    const { color } = useTheme();
    return (
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {appearances.map((appearance) => (
          <View
            key={appearance}
            style={{
              alignItems: 'center',
              gap: 24,
              padding: 16,
              borderRadius: 12,
              // on-brand solo existe sobre la escena de marca.
              backgroundColor: appearance === 'on-brand' ? color['fill/action/primary/default'] : 'transparent',
            }}
          >
            <Text style={{ color: color['text/secondary'], fontSize: 12 }}>{appearance}</Text>
            {sizes.map((size) => (
              <Spinner key={size} {...args} appearance={appearance} size={size} />
            ))}
          </View>
        ))}
      </View>
    );
  },
};

/** La apariencia sigue a la superficie: on-brand sobre fondo de marca (✅); la de página sobre una superficie oscura se apaga (❌). */
export const OnSurfaces: Story = {
  render: (args) => {
    const { color } = useTheme();
    const tile = (bg: string, appearance: SpinnerAppearance, caption: string, ok: boolean) => (
      <View style={{ alignItems: 'center', gap: 12 }}>
        <View style={{ width: 96, height: 96, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
          <Spinner {...args} appearance={appearance} />
        </View>
        <Text style={{ color: ok ? color['text/success'] : color['text/danger'], fontSize: 12 }}>{ok ? '✓' : '✕'} {caption}</Text>
      </View>
    );
    return (
      <View style={{ flexDirection: 'row', gap: 32 }}>
        {tile(color['fill/action/primary/default'], 'on-brand', 'on-brand sobre marca', true)}
        {tile(color['surface/inverse'], 'primary', 'de página sobre oscuro', false)}
      </View>
    );
  },
};
