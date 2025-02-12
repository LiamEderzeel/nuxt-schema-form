import type { UnpluginOptions } from 'unplugin'
import type { ModuleOptions } from '../module'

/**
 * This plugin injects Nuxt Schema From configuration into the runtime build so Nuxt Schema From components can
 * access it.
 */
export default function AppConfigPlugin(_options: ModuleOptions, appConfig: Record<string, unknown>) {
  return {
    name: 'nuxt:schema-form:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:nuxt-schema-form-app-config'
      }
    },
    loadInclude: id => id === 'virtual:nuxt-schema-form-app-config',
    load() {
      return `
          export default ${JSON.stringify(appConfig)}
        `
    }
  } satisfies UnpluginOptions
}
