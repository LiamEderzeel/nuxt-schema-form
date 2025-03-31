// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["../src/module", "@nuxt/ui", "@nuxt/eslint", "nuxt-monaco-editor"],

  css: ["~/assets/css/main.css"],

  components: {
    global: true,
    dirs: ["@/components"],
  },
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});

