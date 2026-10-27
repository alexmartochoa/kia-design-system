import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useReduceMotion } from '../../theme/useReduceMotion';
import { variables } from '../../tokens/variables';

export type SkeletonShape = 'text' | 'block' | 'circle';
export type SkeletonSize = 'sm' | 'md' | 'lg';

export type SkeletonProps = {
  /** Figma: shape (VARIANT). La forma del contenido que viene. */
  shape?: SkeletonShape;
  /** Figma: size (VARIANT). En text es la altura de línea; en circle el diámetro del avatar; en block el radio. */
  size?: SkeletonSize;
  /** Solo con shape='text'. Solo en código: en Figma se apilan instancias. */
  lines?: number;
  /** Ancho de la forma. Solo en código: tiene que imitar al contenido real. En circle lo fija el diámetro. */
  width?: DimensionValue;
  /** Lo que anuncia el lector de pantalla, una sola vez, en el contenedor. */
  label?: string;
  /** Alto/posición que pone el layout (en block el alto lo decide la pantalla). */
  style?: StyleProp<ViewStyle>;
};

/** Alto por defecto de shape='block' (Figma: 96). No hay token todavía: ver «Divergencias» del contrato. */
const BLOCK_HEIGHT = 96;
/** Ancho de la banda de brillo respecto de la forma (Figma: 52 de 200). */
const SHEEN_RATIO = 0.26;
/** La última línea de un texto de varias líneas es más corta, como un párrafo real. */
const LAST_LINE_WIDTH = '70%';

/** Marcador de posición de lo que todavía no llegó. Tiene la forma del contenido para que la pantalla no salte. */
export function Skeleton({ shape = 'text', size = 'md', lines = 1, width = '100%', label = 'Cargando', style }: SkeletonProps) {
  const { color, space, density } = useTheme();
  const reduceMotion = useReduceMotion();
  const pill = variables.radius['radius/pill'][density];

  const lineHeight = { lg: 'font/line-height/24', md: 'font/line-height/20', sm: 'font/line-height/16' } as const;
  const text = { height: variables.typography[lineHeight[size]].Default, radius: pill };
  const circle = variables.size[`component/avatar/size/${size}`].default;
  const blockRadius = variables.radius[`radius/surface/${size}`][density];

  const base = color['fill/disabled']; // component/skeleton/bg
  const highlight = color['overlay/state/hover']; // component/skeleton/highlight

  const count = shape === 'text' ? Math.max(1, Math.floor(lines)) : 1;
  const stack = (
    <View style={{ gap: space['stack/sm'] }}>
      {Array.from({ length: count }, (_, i) => {
        const last = count > 1 && i === count - 1;
        const dims: ViewStyle =
          shape === 'circle'
            ? { width: circle, height: circle, borderRadius: circle / 2 }
            : shape === 'block'
              ? { width: '100%', height: BLOCK_HEIGHT, borderRadius: blockRadius }
              : { width: last ? LAST_LINE_WIDTH : '100%', height: text.height, borderRadius: text.radius };
        return <Shape key={i} dims={dims} base={base} highlight={highlight} reduceMotion={reduceMotion} />;
      })}
    </View>
  );

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityLiveRegion="polite"
      accessibilityState={{ busy: true }}
      importantForAccessibility="yes"
      style={[{ width: shape === 'circle' ? circle : width }, style]}
    >
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {stack}
      </View>
    </View>
  );
}

function Shape({ dims, base, highlight, reduceMotion }: { dims: ViewStyle; base: string; highlight: string; reduceMotion: boolean }) {
  const sweep = useRef(new Animated.Value(0)).current;
  const [w, setW] = useState(0);
  const duration = variables.motion['motion/duration/extra-long'].Default * 2;

  useEffect(() => {
    if (reduceMotion || !w) {
      sweep.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration, easing: Easing.inOut(Easing.ease), useNativeDriver: Platform.OS !== 'web' }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, w, duration, sweep]);

  const band = w * SHEEN_RATIO;
  const translateX = sweep.interpolate({ inputRange: [0, 1], outputRange: [-band, w] });

  return (
    <View onLayout={(e) => setW(e.nativeEvent.layout.width)} style={[{ backgroundColor: base, overflow: 'hidden' }, dims]}>
      {!reduceMotion && w > 0 && (
        <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, width: band, backgroundColor: highlight, transform: [{ translateX }] }} />
      )}
    </View>
  );
}
