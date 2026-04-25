export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  theme: string;
  colors: ThemeColors;
  typography: string;
  spacing: string;
  borderRadius: string;
  shadowIntensity: string;
  fontFamily: string;
  componentSize: string;
  animationSpeed: string;
  contrast: string;
  layoutWidth: string;
  exportedAt?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description?: string;
  colors: ThemeColors;
  typography: { fontSize: string };
  spacing: string;
  borderRadius?: string;
  shadowIntensity?: string;
  fontFamily?: string;
  componentSize?: string;
  animationSpeed?: string;
  contrast?: string;
  layoutWidth?: string;
}

export type ExportFormat = 'js' | 'css' | 'tokens' | 'tailwind';
