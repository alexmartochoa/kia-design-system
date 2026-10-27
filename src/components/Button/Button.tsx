import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { componentColors, variables } from '../../tokens/variables';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/glyphs';
import { Spinner, type SpinnerAppearance } from '../Spinner/Spinner';
import { GlassLayer } from './GlassLayer';
import { useButtonRadius } from './shared';

export type ButtonVariant = 'primary' | 'danger';
export type ButtonAppearance = 'fill' | 'glass' | 'outline' | 'ghost';
export type ButtonSize = 'lg' | 'md' | 'sm';
/** Estado visual. Solo disabled y loading son props: pressed y focus salen de la interacción. */
export type ButtonState = 'default' | 'pressed' | 'focus' | 'disabled' | 'loading';

export type ButtonProps = {
  /** Requerida. Dice la acción, no la confirmación: "Pagar", no "Aceptar". */
  label: string;
  onPress?: () => void;
  /** Qué tan grave es lo que pasa. Se elige antes que la apariencia. */
  variant?: ButtonVariant;
  /** Cuánto pesa el botón en la pantalla: fill > glass > outline > ghost. */
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  disabled?: boolean;
  /** El contenido queda invisible (el ancho no cambia) y un Spinner ocupa el centro. */
  loading?: boolean;
};

/** Separación entre el borde del botón y el anillo de foco, para que el anillo no toque el relleno. */
const FOCUS_GAP = 2;

const sizes = {
  lg: { height: 'size/control/height/lg', padX: 'inset/lg', text: 'body/lg/strong', icon: 'md', spinner: 'md' },
  md: { height: 'size/control/height/md', padX: 'inset/md', text: 'body/md/strong', icon: 'md', spinner: 'sm' },
  sm: { height: 'size/control/height/sm', padX: 'inline/md', text: 'body/sm/strong', icon: 'sm', spinner: 'sm' },
} as const;

type Recipe = {
  bg?: string;
  bgPressed?: string;
  border?: string;
  text: string;
  spinner: SpinnerAppearance;
};

/**
 * Qué token component/button/* pinta cada pieza, por variant · appearance (sin el prefijo component/button/).
 * Son aliases de FoundatiosKia sobre los color/* semantic; salen de componentColors en tokens/variables.ts.
 */
const recipes = {
  primary: {
    fill: { bg: 'primary/bg', bgPressed: 'primary/bg-pressed', text: 'primary/text', spinner: 'on-brand' },
    glass: { bgPressed: 'primary-glass/bg-pressed', border: 'primary-glass/border', text: 'primary-glass/text', spinner: 'primary' },
    outline: { bgPressed: 'primary-outline/bg-pressed', border: 'primary-outline/border', text: 'primary-outline/text', spinner: 'primary' },
    ghost: { bgPressed: 'primary-ghost/bg-pressed', text: 'primary-ghost/text', spinner: 'brand' },
  },
  danger: {
    fill: { bg: 'danger/bg', bgPressed: 'danger/bg-pressed', text: 'danger/text', spinner: 'on-brand' },
    outline: { bgPressed: 'danger-outline/bg-pressed', border: 'danger-outline/border', text: 'danger-outline/text', spinner: 'primary' },
    ghost: { bgPressed: 'danger-ghost/bg-pressed', text: 'danger-ghost/text', spinner: 'primary' },
  },
} as const satisfies Record<ButtonVariant, Partial<Record<ButtonAppearance, Recipe>>>;

/** Una acción destructiva nunca se presenta como glass (kia-color-tokens.md): cae a outline. */
const resolveAppearance = (variant: ButtonVariant, appearance: ButtonAppearance) =>
  variant === 'danger' && appearance === 'glass' ? 'outline' : appearance;

type ButtonToken = keyof (typeof componentColors)['dark'] extends `component/button/${infer K}` ? K : never;

type ButtonViewProps = Omit<ButtonProps, 'onPress' | 'disabled' | 'loading'> & { state?: ButtonState };

/**
 * La caja visual del botón para un estado dado. Button la usa con el estado real;
 * Storybook la usa para mostrar estados que no se pueden congelar con el puntero (pressed, focus).
 */
export function ButtonView({
  label,
  variant = 'primary',
  appearance = 'fill',
  size = 'md',
  leadingIcon,
  trailingIcon,
  state = 'default',
}: ButtonViewProps) {
  const { name, space, text } = useTheme();
  const { radius, focusRadius } = useButtonRadius();
  const look = resolveAppearance(variant, appearance);
  const recipe: Recipe = (recipes[variant] as Record<string, Recipe>)[look];
  const s = sizes[size];
  const tokens = componentColors[name];
  const c = (t?: string) => (t ? tokens[`component/button/${t as ButtonToken}`] : undefined);

  const disabled = state === 'disabled';
  const pressed = state === 'pressed';
  const glass = look === 'glass';

  const bg = disabled
    ? look === 'ghost'
      ? undefined
      : c('disabled/bg')
    : pressed && !glass
      ? c(recipe.bgPressed)
      : c(recipe.bg);
  const border = disabled ? (recipe.border ? c('disabled/border') : undefined) : c(recipe.border);
  const fg = (disabled ? c('disabled/text') : c(recipe.text))!;
  const height = variables.size[s.height].default;
  const focusWidth = variables.semantic['border/width/focus'].dark;
  const ring = FOCUS_GAP + focusWidth;

  const glassShadow = glass && !disabled
    ? {
        boxShadow: [
          `0px ${variables.semantic['elevation/raised/near-y'].dark}px ${variables.semantic['elevation/raised/near-blur'].dark}px ${c('glass/shadow')}`,
          `inset 0px ${variables.semantic['elevation/raised/inner-top-y'].dark}px ${variables.semantic['elevation/raised/inner-top-blur'].dark}px ${c('glass/highlight')}`,
        ].join(', '),
      }
    : null;

  const content: ReactNode = (
    <View style={[styles.content, { gap: space['inline/sm'], opacity: state === 'loading' ? 0 : 1 }]}>
      {leadingIcon && <Icon name={leadingIcon} size={s.icon} color={fg} />}
      <Text style={[text[s.text], { color: fg, textAlign: 'center' }]}>{label}</Text>
      {trailingIcon && <Icon name={trailingIcon} size={s.icon} color={fg} />}
    </View>
  );

  return (
    <View
      style={[
        styles.base,
        {
          minHeight: height,
          borderRadius: radius,
          minWidth: variables.size['size/control/min-width'].default,
          paddingHorizontal: space[s.padX],
          backgroundColor: bg,
          borderColor: border ?? 'transparent',
          borderWidth: border ? variables.semantic['border/width/default'].dark : 0,
        },
        glassShadow,
      ]}
    >
      {glass && <GlassLayer flat={disabled ? c('disabled/bg') : undefined} />}
      {glass && pressed && (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden', backgroundColor: c(recipe.bgPressed) }]} />
      )}
      {content}
      {state === 'loading' && (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.center]}>
          <Spinner appearance={recipe.spinner} size={s.spinner} label={label} />
        </View>
      )}
      {state === 'focus' && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -ring,
            left: -ring,
            right: -ring,
            bottom: -ring,
            borderRadius: focusRadius,
            borderWidth: focusWidth,
            borderColor: c('focus/ring'),
          }}
        />
      )}
    </View>
  );
}

/** Botón de acción KIA para React Native. Contrato: components/kia-button-component.md. */
export function Button({ onPress, disabled, loading, size = 'md', ...rest }: ButtonProps) {
  const [focused, setFocused] = useState(false);
  const height = variables.size[sizes[size].height].default;
  const target = variables.size['size/target/min'].default;
  // El alto visual de sm (32) queda bajo el mínimo tocable: los 48 los da el hitSlop, no la caja.
  const slop = Math.max(0, (target - height) / 2);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rest.label}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hitSlop={{ top: slop, bottom: slop }}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <ButtonView
          {...rest}
          size={size}
          state={disabled ? 'disabled' : loading ? 'loading' : pressed ? 'pressed' : focused ? 'focus' : 'default'}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // El foco lo dibuja ButtonView: se apaga el outline del navegador para no duplicarlo.
  pressable: { alignSelf: 'flex-start', ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null) },
  base: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
});
