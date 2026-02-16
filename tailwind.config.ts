import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: '#faf5eb',
        cream: '#f5e8d3',
        'ink-brown': '#3a2a1a',
        burgundy: '#5c2d41',
        ochre: '#8b5a2b',
        forest: '#4a7043',
        rust: '#a0522d',
        'warm-border': '#d4c4a8',
        espresso: '#1a130d',
        'dark-leather': '#2a1f16',
        'dark-panel': '#352a20',
        'amber-glow': '#c9956b',
        'candle-text': '#e8d5b0',
      },
      fontFamily: {
        'special-elite': ['"Special Elite"', '"Courier New"', 'Courier', 'monospace'],
        lora: ['Lora', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '820px',
        wide: '1100px',
      },
      boxShadow: {
        book: '2px 4px 8px rgba(0,0,0,0.15)',
        'book-hover': '5px 10px 20px rgba(0,0,0,0.25)',
        page: '0 1px 3px rgba(0,0,0,0.08), 0 6px 14px rgba(0,0,0,0.1)',
        shelf: '0 6px 16px rgba(0,0,0,0.35), inset 0 -2px 4px rgba(0,0,0,0.15)',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(-50%, -50%)' },
          '50%': { transform: 'translate(-50%, calc(-50% - 12px))' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.55s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
