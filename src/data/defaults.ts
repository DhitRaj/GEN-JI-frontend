import { ThemeConfig } from '../types/theme';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  id: 'default-' + Date.now(),
  name: 'Midnight Blue',
  theme: 'midnight',
  colors: {
    primary: '#8a5cf6',
    secondary: '#5b6cf7',
    accent: '#06b6d4',
  },
  typography: 'sm',
  spacing: 'compact',
  borderRadius: 'mild',
  shadowIntensity: 'bold',
  fontFamily: 'sans',
  componentSize: 'md',
  animationSpeed: 'normal',
  contrast: 'normal',
  layoutWidth: 'standard',
  exportedAt: new Date().toISOString(),
};
