/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sub: '#707070',
        imas: '#ff74b8',
        back: '#f1f5f8'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false
  }
}
