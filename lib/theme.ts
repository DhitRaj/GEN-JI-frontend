export type ThemeId = 'light' | 'midnight' | 'dawn' | 'forest';

export type ThemeOption = {
  id: ThemeId;
  name: string;
  mode: 'light' | 'dark';
  preview: string;
};

export const THEME_STORAGE_KEY = 'genji-theme';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'light',
    name: 'Arctic Light',
    mode: 'light',
    preview: 'linear-gradient(135deg, #eef4ff 0%, #dbeafe 45%, #bfdbfe 100%)',
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    mode: 'dark',
    preview: 'linear-gradient(135deg, #050b16 0%, #0a1220 48%, #0d1729 100%)',
  },
  {
    id: 'dawn',
    name: 'Solar Dawn',
    mode: 'light',
    preview: 'linear-gradient(135deg, #fff7ed 0%, #ffe7d6 48%, #ffd9e4 100%)',
  },
  {
    id: 'forest',
    name: 'Forest Glass',
    mode: 'dark',
    preview: 'linear-gradient(135deg, #071a14 0%, #0c241c 55%, #123127 100%)',
  },
];

export const DEFAULT_THEME_ID: ThemeId = 'light';

export function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEME_OPTIONS.some((theme) => theme.id === value);
}

export function resolveThemeId(value: string | null | undefined): ThemeId {
  if (!value) {
    return DEFAULT_THEME_ID;
  }

  return isThemeId(value) ? value : DEFAULT_THEME_ID;
}

export function getThemeOption(themeId: ThemeId): ThemeOption {
  return THEME_OPTIONS.find((theme) => theme.id === themeId) || THEME_OPTIONS[0];
}

export function setThemeOnDocument(themeId: ThemeId) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const theme = getThemeOption(themeId);

  root.setAttribute('data-theme', themeId);
  root.classList.toggle('dark', theme.mode === 'dark');
}

export function applyThemeToDocument(themeId: ThemeId) {
  setThemeOnDocument(themeId);
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
}
