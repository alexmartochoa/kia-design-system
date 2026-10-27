import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Icon, type IconSize } from './Icon';
import { glyphs, type IconName } from './glyphs';
import { useTheme } from '../../theme/ThemeProvider';

const sizes: IconSize[] = ['xl', 'lg', 'md', 'sm', 'xs', '2xs'];
const names = Object.keys(glyphs) as IconName[];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'search', size: 'md' },
  argTypes: {
    size: { control: 'select', options: sizes },
    name: { control: 'select', options: names },
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

/** Catálogo completo (`IconName`). El nombre es el del componente `icon/<nombre>` en el archivo KIA Icons. */
export const Catalog: Story = {
  render: (args) => {
    const { color } = useTheme();
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
        {names.map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: 8, width: 112 }}>
            <Icon {...args} name={name} size="md" />
            <Text style={{ fontSize: 11, textAlign: 'center', color: color['text/secondary'] }}>{name}</Text>
          </View>
        ))}
      </View>
    );
  },
};
