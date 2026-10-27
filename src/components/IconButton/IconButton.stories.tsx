import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { IconButton, IconButtonView, type IconButtonAppearance, type IconButtonSize, type IconButtonState } from './IconButton';
import { useTheme } from '../../theme/ThemeProvider';

const appearances: IconButtonAppearance[] = ['brand', 'glass', 'ghost'];
const sizes: IconButtonSize[] = ['lg', 'md', 'sm'];
const states: IconButtonState[] = ['default', 'pressed', 'focus', 'disabled'];
const icons = ['x-mark', 'search', 'notification-01', 'setting-01', 'download', 'location-10', 'ev-charging', 'car-05'] as const;

/** Fondo con color y luz para que el vidrio tenga algo que desenfocar (como un mapa o una foto del vehículo). */
const scenery =
  'radial-gradient(circle at 15% 20%, #5D7D2B 0, transparent 35%), radial-gradient(circle at 85% 70%, #417297 0, transparent 40%), radial-gradient(circle at 55% 40%, #D99139 0, transparent 22%), #05141F';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { icon: 'x-mark', label: 'Cerrar aviso', appearance: 'brand', size: 'md', disabled: false },
  argTypes: {
    icon: { control: 'select', options: icons },
    appearance: { control: 'inline-radio', options: appearances },
    size: { control: 'inline-radio', options: sizes },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Botón real: pressed y focus responden al puntero y al teclado (Tab). */
export const Playground: Story = {};

/** El vidrio necesita algo detrás: sobre un fondo plano se lee como un círculo gris. */
export const Glass: Story = {
  args: { appearance: 'glass', icon: 'ev-charging', label: 'Cargar ahora' },
  decorators: [
    (Story) => (
      <div style={{ background: scenery, width: 320, height: 200, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

/** Los tres pesos, de más a menos: brand (una por zona), glass y ghost. */
export const Hierarchy: Story = {
  render: () => (
    <div style={{ background: scenery, padding: 48, borderRadius: 16 }}>
      <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
        <IconButton icon="download" label="Descargar" appearance="brand" size="lg" />
        <IconButton icon="car-05" label="Mi vehículo" appearance="glass" size="lg" />
        <IconButton icon="search" label="Buscar" appearance="ghost" size="lg" />
      </View>
    </div>
  ),
};

/** Matriz completa: columnas = state; filas = appearance · size. */
export const Matrix: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    const { color, text } = useTheme();
    const caption = [text['caption/sm/default'], { color: color['text/tertiary'] }];
    return (
      <div style={{ background: scenery, padding: 32, width: 560 }}>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 24, paddingLeft: 136 }}>
            {states.map((s) => (
              <Text key={s} style={[caption, { width: 72 }]}>{s}</Text>
            ))}
          </View>
          {appearances.map((appearance) => (
            <View key={appearance} style={{ gap: 12, paddingVertical: 8 }}>
              {sizes.map((size) => (
                <View key={size} style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                  <Text style={[caption, { width: 112 }]}>{`${appearance} · ${size}`}</Text>
                  {states.map((state) => (
                    <View key={state} style={{ width: 72, alignItems: 'flex-start', padding: 4 }}>
                      <IconButtonView icon={args.icon} label={args.label} appearance={appearance} size={size} state={state} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </div>
    );
  },
};

/** Catálogo: cualquier glifo de KIA Icons sirve; el nombre accesible lo pone `label`, no el dibujo. */
export const Icons: Story = {
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, maxWidth: 480 }}>
      {icons.map((icon) => (
        <IconButton key={icon} icon={icon} label={icon} appearance={args.appearance} size={args.size} />
      ))}
    </View>
  ),
};
