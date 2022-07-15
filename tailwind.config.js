/** @type {import('tailwindcss').Config} */
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
    extend: {
      animation: {
        'fade-in': 'fade-in 2s',
        'fade-out-background': 'fade-out-background 2s forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out-background': {
          '0%': { 'background-color': 'rgb(241 245 249)' },
          '100%': { 'background-color': 'transparent' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
