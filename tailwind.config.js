/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake', 'forest'],
    darkTheme: 'forest'
  }
}
