/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'apresentation': "url('/img/background-apresentation.png')",
      },
      screens: {
        'md': {'max': '768px'},
      },
    },
  },
  plugins: [],
}
