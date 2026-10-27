import type { ReactElement } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Skeleton, type SkeletonShape, type SkeletonSize } from './Skeleton';
import { useTheme } from '../../theme/ThemeProvider';

const variablesCircle = { lg: 56, md: 40, sm: 32 } as const; // component/avatar/size/*
const shapes: SkeletonShape[] = ['text', 'block', 'circle'];
const sizes: SkeletonSize[] = ['lg', 'md', 'sm'];

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { shape: 'text', size: 'md', lines: 1, label: 'Cargando' },
  argTypes: {
    shape: { control: 'inline-radio', options: shapes },
    size: { control: 'inline-radio', options: sizes },
    lines: { control: { type: 'number', min: 1, max: 6 } },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

const frame = [(Story: () => ReactElement) => <View style={{ width: 280 }}><Story /></View>];

export const Playground: Story = { decorators: frame };

/** Matriz de variantes: columnas shape, filas size. `size` significa algo distinto en cada forma. */
export const Matrix: Story = {
  render: (args) => {
    const { color } = useTheme();
    return (
      <View style={{ width: 520, gap: 24 }}>
        {sizes.map((size) => (
          <View key={size} style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <Text style={{ width: 24, color: color['text/secondary'], fontSize: 12 }}>{size}</Text>
            {shapes.map((shape) => (
              <View key={shape} style={{ width: shape === 'circle' ? variablesCircle[size] : 160, flexShrink: 0 }}>
                <Skeleton {...args} shape={shape} size={size} />
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  },
};

/** `lines` y `width` no existen en Figma: son la forma del contenido, y la sabe la pantalla. */
export const Paragraph: Story = { decorators: frame, args: { shape: 'text', size: 'md', lines: 3 } };

/** Imitá la forma de lo que viene: círculo + título + línea de apoyo. */
export const ListItem: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, width: 320 }}>
      <Skeleton shape="circle" size="md" label="Cargando contacto" />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton shape="text" size="md" width="60%" label="" />
        <Skeleton shape="text" size="sm" width="90%" label="" />
      </View>
    </View>
  ),
};
