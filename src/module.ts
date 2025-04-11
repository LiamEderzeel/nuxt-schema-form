import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
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
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.options.alias['#schema-form'] = resolve('./runtime')
    nuxt.options.alias['#schema-form-types'] = resolve('./runtime/types')

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false
    })

    // optimize deps
    nuxt.options.vite ??= {}
    nuxt.options.vite.optimizeDeps ??= {}
    nuxt.options.vite.optimizeDeps.include ??= []
    nuxt.options.vite.optimizeDeps.include.push('json-schema-library')
    nuxt.options.vite.optimizeDeps.include.push('json-schema-yup-transformer')
    nuxt.options.build.transpile.push('json-schema-library')
  }
})
