/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBlack: '#0B0C10',
        blue: '#1F2883',
        lightGray: '#C5C6C7',
        teal: '#66FCF1',
        green: '#45A29E',
      },
    },
  },
  plugins: [],
};
