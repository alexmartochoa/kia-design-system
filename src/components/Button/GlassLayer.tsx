import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeProvider';
import { componentColors } from '../../tokens/variables';
import { GLASS_INTENSITY, useButtonRadius, type GlassLayerProps } from './shared';

/**
 * iOS · Android. Vidrio verde: desenfoque del fondo (expo-blur) + degradado alpha-sage (luz desde arriba).
 * La versión web es GlassLayer.web.tsx. En Android el blur necesita experimentalBlurMethod: sin él,
 * expo-blur dibuja solo una capa semitransparente y el vidrio no desenfoca.
 */
export function GlassLayer({ flat, radius: radiusProp }: GlassLayerProps) {
  const { name } = useTheme();
  const buttonRadius = useButtonRadius().radius;
  const radius = radiusProp ?? buttonRadius;
  const color = componentColors[name];
  return (
    // El recorte va en este View: el BlurView de Android no respeta borderRadius por sí solo.
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden' }]}>
      <BlurView
        intensity={GLASS_INTENSITY}
        tint="default"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      {flat ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: flat }]} />
      ) : (
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="kia-button-glass" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color['component/button/primary-glass/bg']} />
              <Stop offset="1" stopColor={color['component/button/primary-glass/bg-end']} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#kia-button-glass)" />
        </Svg>
      )}
    </View>
  );
}
