import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#eefcff',
          100: '#d5f7ff',
          500: '#0ea5c6',
          600: '#0784a5',
          700: '#086982',
          900: '#083344'
        },
        lagoon: '#14b8a6',
        sand: '#f5efe4',
        graphite: '#10222b',
        coral: '#ff7a59'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(8, 51, 68, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
