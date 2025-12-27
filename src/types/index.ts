/**
 * @runwell/brand-kit
 * Design kit for Runwell Systems
 */

export type Brand = 'external' | 'internal';
export type Mode = 'light' | 'dark';

// Core token types
export interface SpacingTokens {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
}

export interface FontSizeTokens {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
}

export interface FontWeightTokens {
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface FontFamilyTokens {
  sans: string;
  mono: string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ShadowTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// External brand (M3 Teal) semantic colors
export interface ExternalSemanticColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceContainer: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  outline: string;
  outlineVariant: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  info: string;
  onInfo: string;
  scrim: string;
  shadow: string;
}

// Internal brand (Purple) semantic colors
export interface InternalSemanticColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  onAccent: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceElevated: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  borderFocus: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  error: string;
  onError: string;
  info: string;
  onInfo: string;
}

// Tonal palette (for external brand)
export interface TonalPalette {
  0?: string;
  10?: string;
  20?: string;
  30?: string;
  40?: string;
  50?: string;
  60?: string;
  70?: string;
  80?: string;
  90?: string;
  95?: string;
  99?: string;
  100?: string;
}

export interface ExternalPalettes {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
  error: TonalPalette;
}

// Scale palette (for internal brand)
export interface ScalePalette {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
}

export interface InternalPalettes {
  brand: ScalePalette;
  accent: ScalePalette;
  slate: ScalePalette;
  success: Partial<ScalePalette>;
  warning: Partial<ScalePalette>;
  error: Partial<ScalePalette>;
  info: Partial<ScalePalette>;
}

// Full token sets
export interface CoreTokens {
  spacing: SpacingTokens;
  fontSize: FontSizeTokens;
  fontWeight: FontWeightTokens;
  fontFamily: FontFamilyTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
}

export interface ExternalTokens extends CoreTokens {
  palette: ExternalPalettes;
  color: ExternalSemanticColors;
}

export interface InternalTokens extends CoreTokens {
  palette: InternalPalettes;
  color: InternalSemanticColors;
  gradient: {
    brand: string;
    brandHover: string;
    dark: string;
    text: string;
  };
}

export type BrandTokens<B extends Brand> = B extends 'external' ? ExternalTokens : InternalTokens;
