import { useTheme } from '../../theme/ThemeProvider';
import { variables } from '../../tokens/variables';

/** Radio del botón y de su anillo de foco: radius/action (16) y radius/focus/action (20), iguales en iOS, Android y web. */
export const useButtonRadius = () => {
  const { density } = useTheme();
  return {
    radius: variables.radius['radius/action'][density],
    focusRadius: variables.radius['radius/focus/action'][density],
  };
};

/**
 * Intensidad de expo-blur (1–100) para el vidrio nativo. Sale de elevation/raised/glass-blur (20, el radio de
 * backdrop-filter en web) × 2: las dos escalas no son la misma, el factor está calibrado a ojo y hay que
 * confirmarlo en dispositivo. En Android expo-blur además divide por blurReductionFactor (4 por defecto).
 */
export const GLASS_INTENSITY = Math.min(100, variables.semantic['elevation/raised/glass-blur'].dark * 2);

export type GlassLayerProps = {
  /** Relleno plano en vez del degradado (disabled: el vidrio deja de sugerir volumen). */
  flat?: string;
};
