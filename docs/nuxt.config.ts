import pkg from '../package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@ederzeel/nuxt-schema-form', '@nuxt/ui', '@nuxt/content', '@nuxt/eslint',],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      githubLink: 'https://github.com/ederzeel/nuxt-form',
      version: pkg.version
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'js', 'ts', 'typescript', 'diff', 'vue', 'json', 'jsonc', 'yml', 'css', 'mdc']
        }
      }
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})
