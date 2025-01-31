import { createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit'
import { defaultOptions } from './defaults'

// export type * from './runtime/types'

export interface ModuleOptions {
  /**
   * Prefix for components
   * @defaultValue `S`
   * @link https://ui3.nuxt.dev/getting-started/installation/nuxt#prefix
   */
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'SchemaForm',
    configKey: 'schemaForm',
    compatibility: {
      nuxt: '>=3.13.1'
    },
    docs: 'https://ui3.nuxt.dev/getting-started/installation/nuxt'
  },
  defaults: defaultOptions,
  async setup(options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false
    })
  }
})
