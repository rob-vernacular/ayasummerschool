/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        'ocean-deep':  '#0D47A1',
        ocean:         '#1B6CA8',
        'ocean-mid':   '#2196F3',
        'ocean-light': '#4FC3F7',
        sky:           '#4FC3F7',
        'sky-soft':    '#87CEEB',
        'sky-pale':    '#C8E6F5',
        sand:          '#FFF8E7',
        'sand-warm':   '#F5DEB3',
        'sand-dark':   '#D4A853',
        cream:         '#FFF8E7',
        coral:         '#FF6B6B',
        'coral-dark':  '#E53935',
        gold:          '#FFD700',
        'gold-dark':   '#FFA000',
        grass:         '#56C271',
        'grass-dark':  '#2E7D32',
        purple:        '#7B1FA2',
        'purple-deep': '#4A148C',
        midnight:      '#0D1B2A',
        cloud:         '#FFFFFF',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
