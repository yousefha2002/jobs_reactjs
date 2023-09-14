/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      container:{
        center:true
      },
      colors:{
        Primary:"#d6293e",
        Gray:"#545454",
        bgGray:"#f5f5f5",
        bgPrimary:"#d6293e1a"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

