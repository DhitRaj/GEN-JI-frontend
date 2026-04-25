'use client';

import { useState, useCallback } from 'react';
import { ThemeConfig, ThemeColors } from '../types/theme';
import { DEFAULT_THEME_CONFIG } from '../data/defaults';
import { PRESETS } from '../data/presets';

export const useThemeBuilder = () => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);

  const updateColors = useCallback((colors: Partial<ThemeColors>) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  }, []);

  const updateThemeProperty = useCallback((key: keyof Omit<ThemeConfig, 'id' | 'name' | 'colors' | 'exportedAt'>, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setConfig(prev => ({
        ...prev,
        name: preset.name,
        theme: presetId,
        colors: preset.colors,
        typography: preset.typography.fontSize,
        spacing: preset.spacing,
        borderRadius: preset.borderRadius || 'mild',
        shadowIntensity: preset.shadowIntensity || 'medium',
        fontFamily: preset.fontFamily || 'sans',
        componentSize: preset.componentSize || 'md',
        animationSpeed: preset.animationSpeed || 'normal',
        contrast: preset.contrast || 'normal',
        layoutWidth: preset.layoutWidth || 'standard',
      }));
    }
  }, []);

  const resetTheme = useCallback(() => {
    setConfig(DEFAULT_THEME_CONFIG);
  }, []);

  const updateThemeName = useCallback((name: string) => {
    setConfig(prev => ({ ...prev, name }));
  }, []);

  return {
    config,
    updateColors,
    updateThemeProperty,
    applyPreset,
    resetTheme,
    updateThemeName,
  };
};
