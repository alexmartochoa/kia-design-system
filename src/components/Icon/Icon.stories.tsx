import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Icon, type IconSize } from './Icon';
import { useTheme } from '../../theme/ThemeProvider';

const sizes: IconSize[] = ['xl', 'lg', 'md', 'sm', 'xs', '2xs'];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'image-01', size: 'md' },
  argTypes: {
    size: { control: 'select', options: sizes },
    name: { control: 'select', options: ['image-01'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Matriz de variantes: xl 40 · lg 32 · md 24 · sm 16 · xs 12 · 2xs 8 (size/icon/*). */
export const Sizes: Story = {
  render: (args) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      {sizes.map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </View>
  ),
};

/** El color sale de un token semantic del tema, nunca de un hex suelto. */
export const Colors: Story = {
  render: (args) => {
    const { color } = useTheme();
    const tokens = ['icon/default', 'icon/subtle', 'icon/highlight', 'icon/success', 'icon/warning', 'icon/danger', 'icon/info'] as const;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
        {tokens.map((t) => (
          <Icon key={t} {...args} size="lg" color={color[t]} />
        ))}
      </View>
    );
  },
};

/** Con `label` el icono se anuncia ("Cerrar"); sin él es decorativo y va oculto al lector. */
export const WithLabel: Story = { args: { size: 'lg', label: 'Imagen del vehículo' } };
