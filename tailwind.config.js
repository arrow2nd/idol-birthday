/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#1c1c1c',
        sub: '#707070',
        imas: '#ff74b8',
        back: '#ebf7ff'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
