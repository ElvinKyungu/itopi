import { defineNuxtPlugin } from "#app";
import VueFathom from "@ubclaunchpad/vue-fathom";
 
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueFathom, {
    siteID: import.meta.env.VITE_FATHOM_ID,
    settings: {
      spa: "history",
    },
  })
})