/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          text: '#0f172a',
          primary: '#2563eb',
          border: '#e5e7eb',
          card: '#f9fafb',
        },
        dark: {
          bg: '#0b0f19',
          text: '#e5e7eb',
          primary: '#3b82f6',
          card: '#111827',
          border: '#1f2937',
        },
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
