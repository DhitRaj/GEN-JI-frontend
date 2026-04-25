import { ThemePreset } from '../types/theme';

export const PRESETS: ThemePreset[] = [
  {
    id: 'midnight',
    name: 'Midnight Blue',
    description: 'Premium dark direction for SaaS, agency, and tech-first brands.',
    colors: { primary: '#8a5cf6', secondary: '#5b6cf7', accent: '#06b6d4' },
    typography: { fontSize: 'sm' },
    spacing: 'compact',
    borderRadius: 'mild',
    shadowIntensity: 'bold',
    fontFamily: 'sans',
    componentSize: 'md',
    animationSpeed: 'normal',
    contrast: 'high',
    layoutWidth: 'standard',
  },
  {
    id: 'earth',
    name: 'Earth Studio',
    description: 'Warm editorial vibe ideal for storytelling-led and boutique brands.',
    colors: { primary: '#2e7d32', secondary: '#8b6f47', accent: '#d4a574' },
    typography: { fontSize: 'lg' },
    spacing: 'spacious',
    borderRadius: 'rounded',
    shadowIntensity: 'medium',
    fontFamily: 'serif',
    componentSize: 'lg',
    animationSpeed: 'slow',
    contrast: 'normal',
    layoutWidth: 'compact',
  },
  {
    id: 'neo-brutal',
    name: 'Neo Brutal Grid',
    description: 'Bold high-contrast system with sharper edges and punchy visual hierarchy.',
    colors: { primary: '#111827', secondary: '#f3f4f6', accent: '#f59e0b' },
    typography: { fontSize: 'base' },
    spacing: 'default',
    borderRadius: 'sharp',
    shadowIntensity: 'none',
    fontFamily: 'mono',
    componentSize: 'md',
    animationSpeed: 'fast',
    contrast: 'high',
    layoutWidth: 'wide',
  },
  {
    id: 'aurora-glass',
    name: 'Aurora Glass',
    description: 'Soft futuristic gradient palette for modern product showcases.',
    colors: { primary: '#7c3aed', secondary: '#dbeafe', accent: '#22d3ee' },
    typography: { fontSize: 'sm' },
    spacing: 'default',
    borderRadius: 'full',
    shadowIntensity: 'subtle',
    fontFamily: 'sans',
    componentSize: 'sm',
    animationSpeed: 'slow',
    contrast: 'normal',
    layoutWidth: 'standard',
  },
  {
    id: 'arctic-light',
    name: 'Arctic Light',
    description: 'Clean enterprise look with high readability and calm spacing.',
    colors: { primary: '#2563eb', secondary: '#e2e8f0', accent: '#14b8a6' },
    typography: { fontSize: 'base' },
    spacing: 'spacious',
    borderRadius: 'mild',
    shadowIntensity: 'subtle',
    fontFamily: 'sans',
    componentSize: 'lg',
    animationSpeed: 'normal',
    contrast: 'normal',
    layoutWidth: 'wide',
  },
  {
    id: 'night-editorial',
    name: 'Night Editorial',
    description: 'Dark magazine-inspired aesthetic for creative portfolios and studios.',
    colors: { primary: '#fb7185', secondary: '#1f2937', accent: '#fde047' },
    typography: { fontSize: 'sm' },
    spacing: 'compact',
    borderRadius: 'rounded',
    shadowIntensity: 'bold',
    fontFamily: 'serif',
    componentSize: 'md',
    animationSpeed: 'fast',
    contrast: 'high',
    layoutWidth: 'compact',
  },
];

export const TYPOGRAPHY_OPTIONS = [
  { id: 'sm', label: 'Compact', size: '0.875rem' },
  { id: 'base', label: 'Default', size: '1rem' },
  { id: 'lg', label: 'Large', size: '1.125rem' },
];

export const SPACING_OPTIONS = [
  { id: 'compact', label: 'Compact', gap: '0.75rem' },
  { id: 'default', label: 'Default', gap: '1rem' },
  { id: 'spacious', label: 'Spacious', gap: '1.5rem' },
];

export const BORDER_RADIUS_OPTIONS = [
  { id: 'sharp', label: 'Sharp', radius: '0px' },
  { id: 'mild', label: 'Mild', radius: '0.375rem' },
  { id: 'rounded', label: 'Rounded', radius: '0.75rem' },
  { id: 'full', label: 'Full', radius: '999px' },
];

export const SHADOW_OPTIONS = [
  { id: 'none', label: 'None', shadow: 'none' },
  { id: 'subtle', label: 'Subtle', shadow: '0 1px 2px rgba(0, 0, 0, 0.05)' },
  { id: 'medium', label: 'Medium', shadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  { id: 'bold', label: 'Bold', shadow: '0 10px 25px rgba(0, 0, 0, 0.15)' },
];

export const FONT_FAMILY_OPTIONS = [
  { id: 'sans', label: 'Sans Serif', font: 'system-ui, -apple-system, sans-serif' },
  { id: 'serif', label: 'Serif', font: 'Georgia, serif' },
  { id: 'mono', label: 'Monospace', font: 'Fira Code, monospace' },
];

export const COMPONENT_SIZE_OPTIONS = [
  { id: 'sm', label: 'Small', size: '0.75rem' },
  { id: 'md', label: 'Medium', size: '1rem' },
  { id: 'lg', label: 'Large', size: '1.25rem' },
];

export const ANIMATION_OPTIONS = [
  { id: 'slow', label: 'Slow', duration: '400ms' },
  { id: 'normal', label: 'Normal', duration: '200ms' },
  { id: 'fast', label: 'Fast', duration: '100ms' },
];

export const CONTRAST_OPTIONS = [
  { id: 'normal', label: 'Normal', contrast: '1' },
  { id: 'high', label: 'High', contrast: '1.5' },
];

export const LAYOUT_OPTIONS = [
  { id: 'compact', label: 'Compact', width: '80rem' },
  { id: 'standard', label: 'Standard', width: '100rem' },
  { id: 'wide', label: 'Wide', width: '120rem' },
];
