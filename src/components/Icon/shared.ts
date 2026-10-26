import { variables } from '../../tokens/variables';

export type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  /** Glifo del catálogo. Figma: icon (INSTANCE_SWAP). */
  name: import('./glyphs').IconName;
  /** Figma: size (VARIANT). El tamaño sale de size/icon/*, nunca de un número suelto. */
  size?: IconSize;
  /** Hex del tema (token semantic). Por defecto `icon/default`. Solo en código: en Figma lo pinta quien instancia. */
  color?: string;
  /** Si falta, el icono es decorativo y va oculto al lector de pantalla. Debe decir la acción o el dato ("Cerrar"), no el dibujo. */
  label?: string;
};

/** Medida en dp del paso de size/icon/*. */
export const iconPx = (size: IconSize) => variables.size[`size/icon/${size}`].default;
