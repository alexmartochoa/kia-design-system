import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { componentColors, variables } from '../../tokens/variables';
import { GlassLayer } from '../Button/GlassLayer';
import { Icon, type IconSize } from '../Icon/Icon';
import type { IconName } from '../Icon/glyphs';

/** Cuánto pesa el botón: brand (relleno de marca) > glass (vidrio verde) > ghost (sin fondo). */
export type IconButtonAppearance = 'brand' | 'glass' | 'ghost';
export type IconButtonSize = 'lg' | 'md' | 'sm';
/** Estado visual. Solo disabled es prop: pressed y focus salen de la interacción. */
export type IconButtonState = 'default' | 'pressed' | 'focus' | 'disabled';

export type IconButtonProps = {
  /** Requerida. Glifo del catálogo de KIA Icons (property `icon` de la instancia Icon anidada en Figma). */
  icon: IconName;
  /** Requerida. Dice la acción, no el dibujo: «Cerrar aviso», no «equis». No existe en Figma. */
  label: string;
  onPress?: () => void;
  /** appearance (VARIANT). */
  appearance?: IconButtonAppearance;
  /** size (VARIANT). */
  size?: IconButtonSize;
  /** state=disabled (VARIANT). */
  disabled?: boolean;
};

/** Separación entre el borde del botón y el anillo de foco, para que el anillo no toque el relleno. */
const FOCUS_GAP = 2;

/** El glifo no escala 1:1 con el control: lg 32, md 24, sm 16 (size/icon/*). */
const sizes: Record<IconButtonSize, { box: 'size/control/height/lg' | 'size/control/height/md' | 'size/control/height/sm'; icon: IconSize }> = {
  lg: { box: 'size/control/height/lg', icon: 'lg' },
  md: { box: 'size/control/height/md', icon: 'md' },
  sm: { box: 'size/control/height/sm', icon: 'sm' },
};

/**
 * Qué token component/button/* pinta cada pieza (sin el prefijo). Son los mismos aliases que usa Button:
 * en Figma el IconButton los enlaza directo a los color/* semantic a los que apuntan.
 */
const recipes = {
  brand: { bg: 'primary/bg', bgPressed: 'primary/bg-pressed', text: 'primary/text' },
  glass: { bgPressed: 'primary-glass/bg-pressed', border: 'primary-glass/border', text: 'primary-glass/text' },
  ghost: { bgPressed: 'primary-ghost/bg-pressed', text: 'primary-ghost/text' },
} as const satisfies Record<IconButtonAppearance, { bg?: string; bgPressed: string; border?: string; text: string }>;

type ButtonToken = keyof (typeof componentColors)['dark'] extends `component/button/${infer K}` ? K : never;

type IconButtonViewProps = Omit<IconButtonProps, 'onPress' | 'disabled'> & { state?: IconButtonState };

/**
 * La caja visual del botón para un estado dado. IconButton la usa con el estado real;
 * Storybook la usa para mostrar estados que no se pueden congelar con el puntero (pressed, focus).
 */
export function IconButtonView({ icon, appearance = 'brand', size = 'md', state = 'default' }: IconButtonViewProps) {
  const { name, density } = useTheme();
  const recipe: { bg?: string; bgPressed: string; border?: string; text: string } = recipes[appearance];
  const s = sizes[size];
  const tokens = componentColors[name];
  const c = (t?: string) => (t ? tokens[`component/button/${t as ButtonToken}`] : undefined);

  const disabled = state === 'disabled';
  const pressed = state === 'pressed';
  const glass = appearance === 'glass';
  const ghost = appearance === 'ghost';

  const radius = variables.radius['radius/pill'][density];
  const focusRadius = variables.radius['radius/focus/pill'][density];
  const box = variables.size[s.box].default;
  const focusWidth = variables.semantic['border/width/focus'].dark;
  const ring = FOCUS_GAP + focusWidth;

  const bg = disabled ? (ghost ? undefined : c('disabled/bg')) : pressed && !glass ? c(recipe.bgPressed) : c(recipe.bg);
  const border = disabled ? (ghost ? undefined : c('disabled/border')) : c(recipe.border);
  const fg = (disabled ? c('disabled/text') : c(recipe.text))!;

  const glassShadow =
    glass && !disabled
      ? {
          boxShadow: [
            `0px ${variables.semantic['elevation/raised/near-y'].dark}px ${variables.semantic['elevation/raised/near-blur'].dark}px ${c('glass/shadow')}`,
            `inset 0px ${variables.semantic['elevation/raised/inner-top-y'].dark}px ${variables.semantic['elevation/raised/inner-top-blur'].dark}px ${c('glass/highlight')}`,
          ].join(', '),
        }
      : null;

  return (
    <View
      style={[
        styles.base,
        {
          width: box,
          height: box,
          borderRadius: radius,
          backgroundColor: bg,
          borderColor: border ?? 'transparent',
          borderWidth: border ? variables.semantic['border/width/default'].dark : 0,
        },
        glassShadow,
      ]}
    >
      {glass && <GlassLayer radius={radius} flat={disabled ? c('disabled/bg') : undefined} />}
      {glass && pressed && (
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden', backgroundColor: c(recipe.bgPressed) }]} />
      )}
      {/* El View posiciona el glifo por encima de la capa de vidrio: en web el svg suelto quedaría debajo del blur. */}
      <View>
        <Icon name={icon} size={s.icon} color={fg} />
      </View>
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

/** Botón de solo icono KIA para React Native. Contrato: components/kia-iconbutton-component.md. */
export function IconButton({ onPress, disabled, size = 'md', ...rest }: IconButtonProps) {
  const [focused, setFocused] = useState(false);
  const box = variables.size[sizes[size].box].default;
  const target = variables.size['size/target/min'].default;
  // sm (32) y md (44) quedan bajo el mínimo tocable: los 48 los da el hitSlop, no la caja.
  const slop = Math.max(0, (target - box) / 2);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rest.label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hitSlop={{ top: slop, bottom: slop, left: slop, right: slop }}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <IconButtonView {...rest} size={size} state={disabled ? 'disabled' : pressed ? 'pressed' : focused ? 'focus' : 'default'} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // El foco lo dibuja IconButtonView: se apaga el outline del navegador para no duplicarlo.
  pressable: { alignSelf: 'flex-start', ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null) },
  base: { alignItems: 'center', justifyContent: 'center' },
});
