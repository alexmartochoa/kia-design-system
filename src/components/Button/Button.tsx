import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonProps = {
  label: string;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  onPress?: () => void;
};

/** Ejemplo mínimo de componente KIA: solo consume tokens, nunca hex sueltos. */
export function Button({ label, variant = 'primary', disabled, onPress }: ButtonProps) {
  const { color, space, text } = useTheme();
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          paddingHorizontal: space['inset/xl'],
          paddingVertical: space['inset/md'],
          backgroundColor: primary ? color['fill/action/primary/default'] : 'transparent',
          borderColor: color['border/action/primary/outline/default'],
          borderWidth: primary ? 0 : 1,
          opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          text['body/lg/strong'],
          { color: primary ? color['text/on-fill'] : color['text/primary'] },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
});
