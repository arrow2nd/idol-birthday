/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sub: '#707070',
        imas: '#ff74b8',
        back: '#fff0db'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake', 'forest'],
    darkTheme: 'forest'
  }
}
