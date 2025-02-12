import type { UnpluginOptions } from 'unplugin'
import type { ModuleOptions } from '../module'

/**
 * This plugin injects Nuxt UI configuration into the runtime build so Nuxt UI components can
 * access it.
 */
export default function AppConfigPlugin(_options: ModuleOptions, appConfig: Record<string, unknown>) {
  return {
    name: 'nuxt:ui:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:nuxt-ui-app-config'
      }
    },
    loadInclude: id => id === 'virtual:nuxt-ui-app-config',
    load() {
      return `
          export default ${JSON.stringify(appConfig)}
        `
    }
  } satisfies UnpluginOptions
}
