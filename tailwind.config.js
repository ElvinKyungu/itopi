/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    //"./nuxt.config.{js,ts}",
  ],

  media: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 2s',
        'fade-out-background': 'fade-out-background 2s forwards',
        'pulse-once': 'pulse-once .5s',
        'ping-once': 'ping-once .5s ease-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out-background': {
          '0%': { 'background-color': 'rgb(241 245 249)' },
          '100%': { 'background-color': 'transparent' },
        },
        'pulse-once': {
          '0%': { opacity: 0 },
          '100%': {opacity: 1 },
        },
        'ping-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.5)'}
        },
      },
      colors: {
        'art': '#F1BDE6',
        'interactive-space': '#FFECCF',
        'application': '#FFD8CF',
        'augmented-reality': '#D6FFCF',
        'commercial': '#FECFFF',
        'experiment': '#DFB8FF',
        'video-mapping': '#CFE8FF',
        'led-screen': '#CFFFF6',
        'application': '#33FFBD',
        'city': '#F56C06',
        'robot': '#23B0CA',
        'sound': '#EFF506',
        'mars': '#F5063E',
        'meditation': '#1C06F5',
        'festival': '#06F56F',
        'interactive-map': '#068CF5',
        'picture': '#F58506',
        'maps': '#76F506',
        'museum': '#06E9F5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(
            theme('bgGradientDeg', {}),
              {
                45: '45deg',
              }
          )
        }
       )
    }),
    require('@tailwindcss/line-clamp'),
  ],
}
