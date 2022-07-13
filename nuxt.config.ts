import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});