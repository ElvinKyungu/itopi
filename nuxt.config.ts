import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  ssr: false,
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
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        rel: 'stylesheet',
      },
    ],
  },
});