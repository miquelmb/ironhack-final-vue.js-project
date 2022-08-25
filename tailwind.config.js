/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px'
  },
  theme: {
    fontFamily: {
      'dosis': ['Dosis', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'postItsBackground': "url('https://res.cloudinary.com/mmabof89/image/upload/v1661421787/Ironhack%20Final%20Project/post-it-2382319_2_dcewgk.png')"
      },
      colors: {
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
}