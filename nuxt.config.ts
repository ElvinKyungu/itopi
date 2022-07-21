import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  css: [
    "~/assets/css/tailwind.css",
  ],
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
  meta: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0',
        rel: 'stylesheet',
      },
    ],
  },
});