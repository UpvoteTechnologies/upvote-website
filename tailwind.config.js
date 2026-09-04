/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      // Upvote 2.0 design system — warm paper neutrals, fixed brand greens.
      colors: {
        paper: {
          DEFAULT: '#FAF8F1',
          2: '#F4F1E7',
          3: '#F1EEE3',
        },
        line: {
          DEFAULT: '#EFEADD',
          2: '#E7E2D4',
        },
        ink: {
          DEFAULT: '#22301F',
          2: '#4A4E42',
          3: '#5C6157',
        },
        muted: {
          DEFAULT: '#75705F',
          2: '#8A8577',
          3: '#A39D8C',
          4: '#B3AD9C',
        },
        brand: {
          DEFAULT: '#1F7A4E',
          dark: '#1D4D36',
          deep: '#175E3B',
          mint: '#9FE3BE',
          soft: '#E7F1EB',
          tint: '#E7F7EE',
          score: '#159259',
        },
        footer: {
          DEFAULT: '#16241B',
          text: '#B9C4BC',
          muted: '#8FA396',
          faint: '#5F7367',
        },
      },
      boxShadow: {
        'btn-inset': 'inset 0 -3px 0 rgba(0,0,0,.16)',
        'btn-inset-lg': 'inset 0 -4px 0 rgba(0,0,0,.16)',
        phone: '0 44px 80px -30px rgba(34,48,31,.5), inset 0 0 0 2px #2A2822',
      },
      maxWidth: {
        site: '1180px',
      },
    },
  },
  plugins: [],
};
