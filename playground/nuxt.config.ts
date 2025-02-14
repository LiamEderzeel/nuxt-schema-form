// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["../src/module", "@nuxt/ui", "nuxt-monaco-editor"],
  components: {
    global: true,
    dirs: ["@/components"],
  },
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  compatibilityDate: "2025-01-31",
});
