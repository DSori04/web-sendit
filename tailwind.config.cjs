/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    "./src/**/*.jsx",
    "./src/**/*.js",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'gray1' : '#EDEDED',
      'purple1' : '#7903C1',
      'purple2' : '#E4B8FF',
      'red1' : '#FF0000',
      'gray2' : '#4A4A4A'
    },
    fontFamily: {
      'main' : 'Montserrat',
      'numbers' : 'IBM Plex Mono'
    },
    extend: {},
  },
  plugins: [],
}
