// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  components: {
    global: true,
    dirs: ['@/components']
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-31'
})
