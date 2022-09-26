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
        'art': '#d1f7c4',
        'application': '#d1f7c4',
        'augmented-reality': '#d1f7c4',
        'commercial': '#fee2d5',
        'experiment': '#d1f7c4',
        'video-mapping': '#ffdce5',
        'led-screen': '#fee2d5',
        'city': '#d1f7c4',
        'robot': '#d0f0fd',
        'sound': '#ffdaf6',
        'mars': '#d1f7c4',
        'meditation': '#ffdce5',
        'interactive-map': '#ede2fe',
        'picture': '#ffdaf6',
        'maps': '#ffeab6',
        'museum': '#fee2d5',
        'paris': '#ffdce5',
        'immersive-room': '#ffdaf6',
        'festival': '#ffeab6',
        'interactive-space': '#ffeab6',
        'gaming': '#c2f5e9',
        'bus': '#fee2d5',
        'interactive-bus': '#fee2d5',
        'artist': '#c2f5e9',
        'interactive-picture': '#eee',
        'teamlab': '#fee2d5'
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
  ]
}
