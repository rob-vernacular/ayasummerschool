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
        ocean: '#1B6CA8',
        sky: '#4FC3F7',
        sand: '#FFF8E7',
        coral: '#FF6B6B',
        gold: '#FFD700',
        grass: '#56C271',
        midnight: '#0D1B2A',
        cloud: '#FFFFFF',
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
