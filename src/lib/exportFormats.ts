import { ThemeConfig } from '../types/theme';

export const exportAsJS = (config: ThemeConfig): string => {
  return `export const getThemeConfig = () => {
  return ${JSON.stringify(
    {
      theme: config.theme,
      colors: config.colors,
      typography: config.typography,
      spacing: config.spacing,
      borderRadius: config.borderRadius,
      shadowIntensity: config.shadowIntensity,
      fontFamily: config.fontFamily,
      componentSize: config.componentSize,
      animationSpeed: config.animationSpeed,
      contrast: config.contrast,
      layoutWidth: config.layoutWidth,
    },
    null,
    2
  )};
};`;
};

export const exportAsCSS = (config: ThemeConfig): string => {
  return `:root {
  /* Colors */
  --color-primary: ${config.colors.primary};
  --color-secondary: ${config.colors.secondary};
  --color-accent: ${config.colors.accent};
  
  /* Typography */
  --typography-scale: ${config.typography};
  --font-family: ${getFontFamilyValue(config.fontFamily)};
  
  /* Spacing */
  --spacing-scale: ${config.spacing};
  
  /* Components */
  --border-radius: ${getBorderRadiusValue(config.borderRadius)};
  --shadow-intensity: ${config.shadowIntensity};
  --component-size: ${config.componentSize};
  --animation-duration: ${getAnimationDuration(config.animationSpeed)};
  --contrast-level: ${config.contrast};
  --layout-width: ${getLayoutWidth(config.layoutWidth)};
}`;
};

export const exportAsTokens = (config: ThemeConfig): string => {
  return JSON.stringify(
    {
      colors: {
        primary: { value: config.colors.primary },
        secondary: { value: config.colors.secondary },
        accent: { value: config.colors.accent },
      },
      typography: {
        scale: { value: config.typography },
        family: { value: config.fontFamily },
      },
      spacing: {
        scale: { value: config.spacing },
      },
      components: {
        borderRadius: { value: config.borderRadius },
        shadow: { value: config.shadowIntensity },
        size: { value: config.componentSize },
      },
      animation: {
        speed: { value: config.animationSpeed },
      },
      accessibility: {
        contrast: { value: config.contrast },
      },
      layout: {
        width: { value: config.layoutWidth },
      },
    },
    null,
    2
  );
};

export const exportAsTailwind = (config: ThemeConfig): string => {
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${config.colors.primary}',
        secondary: '${config.colors.secondary}',
        accent: '${config.colors.accent}',
      },
      borderRadius: {
        DEFAULT: '${getBorderRadiusValue(config.borderRadius)}',
      },
      spacing: {
        DEFAULT: '${getSpacingValue(config.spacing)}',
      },
      fontFamily: {
        DEFAULT: '${getFontFamilyValue(config.fontFamily)}',
      },
      transitionDuration: {
        DEFAULT: '${getAnimationDuration(config.animationSpeed)}',
      },
    },
  },
};`;
};

// Helper functions
const getFontFamilyValue = (family: string): string => {
  const familyMap: Record<string, string> = {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif',
    mono: 'Fira Code, monospace',
  };
  return familyMap[family] || familyMap.sans;
};

const getBorderRadiusValue = (radius: string): string => {
  const radiusMap: Record<string, string> = {
    sharp: '0px',
    mild: '0.375rem',
    rounded: '0.75rem',
    full: '999px',
  };
  return radiusMap[radius] || radiusMap.mild;
};

const getSpacingValue = (spacing: string): string => {
  const spacingMap: Record<string, string> = {
    compact: '0.75rem',
    default: '1rem',
    spacious: '1.5rem',
  };
  return spacingMap[spacing] || spacingMap.default;
};

const getAnimationDuration = (speed: string): string => {
  const speedMap: Record<string, string> = {
    slow: '400ms',
    normal: '200ms',
    fast: '100ms',
  };
  return speedMap[speed] || speedMap.normal;
};

const getLayoutWidth = (width: string): string => {
  const widthMap: Record<string, string> = {
    compact: '80rem',
    standard: '100rem',
    wide: '120rem',
  };
  return widthMap[width] || widthMap.standard;
};
