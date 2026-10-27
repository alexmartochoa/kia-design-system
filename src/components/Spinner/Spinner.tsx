import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useReduceMotion } from '../../theme/useReduceMotion';
import { primitives } from '../../tokens/tokens';
import { variables } from '../../tokens/variables';

export type SpinnerAppearance = 'brand' | 'primary' | 'on-brand';
export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = {
  /** Figma: appearance (VARIANT). Se elige por la superficie sobre la que se monta, no por gusto. */
  appearance?: SpinnerAppearance;
  /** Figma: size (VARIANT). Usa size/icon/sm · md · lg (16 · 24 · 32). */
  size?: SpinnerSize;
  /** Lo que anuncia el lector de pantalla. Solo en código (divergencia: Figma no modela accesibilidad). */
  label?: string;
};

/** Grosor del arco = 10% del diámetro: es el innerRadius 0.8 del arco en Figma. */
const THICKNESS_RATIO = 0.1;

/**
 * Qué token semantic de FoundatiosKia pinta cada pieza. La clave en Figma es component/spinner/*;
 * en código se resuelve directo al semantic al que apunta (los component/* de color no se exportan a tokens.ts).
 */
const appearanceTokens = {
  brand: { indicator: 'fill/action/primary/default', track: 'border/subtle' }, // indicator/brand · track/default
  primary: { indicator: 'icon/default', track: 'border/subtle' }, // indicator/default · track/default
  'on-brand': { indicator: 'text/on-fill', track: 'alpha/white/30' }, // indicator/on-brand · track/on-brand
} as const;

/** Indicador de carga indeterminado. Vive dentro del control que espera (Button, campos), casi nunca suelto. */
export function Spinner({ appearance = 'brand', size = 'md', label = 'Cargando' }: SpinnerProps) {
  const { color } = useTheme();
  const reduceMotion = useReduceMotion();
  const spin = useRef(new Animated.Value(0)).current;

  const px = variables.size[`size/icon/${size}`].default;
  const thickness = px * THICKNESS_RATIO;
  const tokens = appearanceTokens[appearance];
  const indicator = color[tokens.indicator as keyof typeof color];
  const track = tokens.track === 'alpha/white/30' ? primitives['alpha/white/30'] : color[tokens.track as keyof typeof color];
  const duration = variables.motion['motion/duration/extra-long'].Default;

  useEffect(() => {
    if (reduceMotion) {
      spin.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, duration, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityLiveRegion="polite"
      accessibilityState={{ busy: true }}
      style={{ width: px, height: px }}
    >
      <Animated.View
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: thickness,
          borderColor: track,
          borderTopColor: indicator,
          transform: [{ rotate }],
        }}
      />
    </View>
  );
}
