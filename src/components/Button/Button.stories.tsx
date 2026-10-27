import { Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Button, ButtonView, type ButtonAppearance, type ButtonSize, type ButtonState, type ButtonVariant } from './Button';
import { useTheme } from '../../theme/ThemeProvider';

const variants: ButtonVariant[] = ['primary', 'danger'];
const appearances: ButtonAppearance[] = ['fill', 'glass', 'outline', 'ghost'];
const sizes: ButtonSize[] = ['lg', 'md', 'sm'];
const states: ButtonState[] = ['default', 'pressed', 'focus', 'disabled', 'loading'];

/** Fondo con color y luz para que el vidrio tenga algo que desenfocar (como un mapa o una foto del vehículo). */
const scenery =
  'radial-gradient(circle at 15% 20%, #5D7D2B 0, transparent 35%), radial-gradient(circle at 85% 70%, #417297 0, transparent 40%), radial-gradient(circle at 55% 40%, #D99139 0, transparent 22%), #05141F';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { label: 'Reservar servicio', variant: 'primary', appearance: 'fill', size: 'md', disabled: false, loading: false },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    appearance: { control: 'inline-radio', options: appearances },
    size: { control: 'inline-radio', options: sizes },
    leadingIcon: { control: 'select', options: [undefined, 'car-05', 'ev-charging', 'location-10', 'download'] },
    trailingIcon: { control: 'select', options: [undefined, 'car-05', 'ev-charging', 'location-10', 'download'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Botón real: pressed y focus responden al puntero y al teclado (Tab). */
export const Playground: Story = {};

export const Glass: Story = {
  args: { appearance: 'glass', leadingIcon: 'ev-charging' },
  decorators: [(Story) => <div style={{ background: scenery, padding: 48, borderRadius: 16 }}><Story /></div>],
};

/** Buenas prácticas 01 y 05: una sola acción principal (fill); el peso se baja con la apariencia, no con la variante. */
export const Hierarchy: Story = {
  render: () => (
    <div style={{ background: scenery, padding: 48, borderRadius: 16 }}>
      <View style={{ gap: 12, width: 280 }}>
        <Button label="Reservar servicio" appearance="fill" size="lg" />
        <Button label="Gestionar mi Kia" appearance="glass" size="lg" leadingIcon="car-05" />
        <Button label="Cancelar" appearance="outline" size="lg" />
        <Button label="Ver más" appearance="ghost" size="md" />
      </View>
    </div>
  ),
};

/** Matriz completa: columnas = state; filas = variant · appearance · size. danger no tiene glass. */
export const Matrix: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    const { color, text } = useTheme();
    const caption = [text['caption/sm/default'], { color: color['text/tertiary'] }];
    return (
      <div style={{ background: scenery, padding: 32 }}>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 24, paddingLeft: 160 }}>
            {states.map((s) => (
              <Text key={s} style={[caption, { width: 180 }]}>{s}</Text>
            ))}
          </View>
          {variants.map((variant) =>
            appearances
              .filter((a) => !(variant === 'danger' && a === 'glass'))
              .map((appearance) => (
                <View key={variant + appearance} style={{ gap: 12, paddingVertical: 8 }}>
                  {sizes.map((size) => (
                    <View key={size} style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                      <Text style={[caption, { width: 136 }]}>{`${variant} · ${appearance} · ${size}`}</Text>
                      {states.map((state) => (
                        <View key={state} style={{ width: 180, alignItems: 'flex-start' }}>
                          <ButtonView {...args} label="Etiqueta" variant={variant} appearance={appearance} size={size} state={state} />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )),
          )}
        </View>
      </div>
    );
  },
};
