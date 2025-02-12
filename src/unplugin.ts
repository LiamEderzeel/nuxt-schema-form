import { fileURLToPath } from 'node:url'

import { join, normalize } from 'pathe'
import { createUnplugin } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import { defu } from 'defu'
// import tailwind from '@tailwindcss/vite'
// import type colors from 'tailwindcss/colors'

// import type * as ui from '#build/ui'

import { defaultOptions } from './defaults'
import type { ModuleOptions } from './module'

// import TemplatePlugin from './plugins/templates'
// import PluginsPlugin from './plugins/plugins'
import AppConfigPlugin from './plugins/app-config'
import ComponentImportPlugin from './plugins/components'
import NuxtEnvironmentPlugin from './plugins/nuxt-environment'

// import type { DeepPartial } from './runtime/types/utils'

// type AppConfigUI = DeepPartial<typeof ui>

export interface NuxtUIOptions extends Omit<ModuleOptions, 'fonts' | 'colorMode'> {
  ui?: object
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

export const NuxtUIPlugin = createUnplugin<NuxtUIOptions | undefined>((_options = {}, meta) => {
  const options = defu(_options, { fonts: false, devtools: { enabled: false } }, defaultOptions)

  const appConfig = { ui: options.ui }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [
    NuxtEnvironmentPlugin(),
    ...ComponentImportPlugin(meta.framework, options),
    AutoImport[meta.framework]({ dts: true, dirs: [join(runtimeDir, 'composables')] }),
    // tailwind(),
    // PluginsPlugin(options),
    // TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig)
  ]
})
