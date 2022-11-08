/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Baloo 2', cursive"
      },
      colors: {
        primary: '#FD9595',
        secondary: '#FFF5F4',
        "dark-1" : '#6C3030',
        "dark-2" : '#B59392'
      }
    },
  },
  plugins: [],
}