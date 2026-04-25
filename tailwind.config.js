/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        border: 'var(--border)',
        input: 'var(--border-strong)',
        ring: 'var(--primary)',
        primary: 'var(--primary)',
        'primary-foreground': '#ffffff',
        secondary: 'var(--surface)',
        'secondary-foreground': 'var(--text)',
        muted: 'var(--surface-strong)',
        'muted-foreground': 'var(--muted)',
        accent: 'var(--surface)',
        'accent-foreground': 'var(--text)',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        card: 'var(--surface)',
        'card-foreground': 'var(--text)',
        popover: 'var(--surface)',
        'popover-foreground': 'var(--text)',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)',
        default: '0 5px 15px rgba(0,0,0,0.05)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
