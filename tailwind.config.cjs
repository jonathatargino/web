/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      }
    },
    screens: {
      'mobm': {'min': '375px'},
      'mob': {'min': '480px'},
      'sm': {'min': '640px'},
      'md': {'min': '768px'},
      'lg': {'min': '1024px'},
      'xl': {'min': '1280px'},
      '2xl': {'min': '1536px'},
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocompatible: true}),
  ],
}
