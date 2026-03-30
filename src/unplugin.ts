import { fileURLToPath } from 'node:url'

import { join, normalize } from 'pathe'
import { createUnplugin } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import { defu } from 'defu'

import { defaultOptions } from './defaults'
import type { ModuleOptions } from './module'

import AppConfigPlugin from './plugins/app-config'
import ComponentImportPlugin from './plugins/components'
import NuxtEnvironmentPlugin from './plugins/nuxt-environment'

export interface NuxtSchemaFormOptions extends Omit<ModuleOptions, 'fonts' | 'colorMode'> {
  schemaForm?: object
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

export const NuxtSchemaFormPlugin = createUnplugin<NuxtSchemaFormOptions | undefined>((_options = {}, meta) => {
  const options = defu(_options, { fonts: false, devtools: { enabled: false } }, defaultOptions)

  const appConfig = { schemaForm: options.schemaForm }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    NuxtEnvironmentPlugin(),
    ...ComponentImportPlugin(meta.framework, options),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    (AutoImport as any)[meta.framework]({ dts: true, dirs: [join(runtimeDir, 'composables')] }),
    // tailwind(),
    // PluginsPlugin(options),
    // TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig)
  ]
})
