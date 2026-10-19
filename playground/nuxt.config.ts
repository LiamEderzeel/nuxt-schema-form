// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@ederzeel/nuxt-schema-form', '@nuxt/ui', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    optimizeDeps: {
      include: ['@internationalized/date', 'reka-ui'],
    }
  },

  components: {
    global: true,
    dirs: ['@/components']
  },

  compatibilityDate: '2025-10-02'
})
