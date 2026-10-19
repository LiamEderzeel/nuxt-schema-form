<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/types'

const props = defineProps<{ links?: NavigationMenuItem[] }>()

const appConfig = useAppConfig()
const config = useRuntimeConfig()
const { $docsNavigation } = useNuxtApp()
</script>

<template>
  <UHeader :menu="{ shouldScaleBackground: true }">
    <template #left>
      <NuxtLink
to="/"
        class="flex items-center gap-2 font-bold text-xl text-(--ui-text-highlighted) min-w-0 focus-visible:outline-(--ui-primary) shrink-0">
        <LogoComponent class="h-6 shrink-0" />
      </NuxtLink>
      <UBadge :label="`v${config.public.version}`" variant="subtle" size="sm" class="font-semibold rounded-full" />
    </template>

    <UNavigationMenu class="z-10" :items="links" variant="link" />

    <template #right>
      <!-- <UTooltip text="Search" :kbds="['meta', 'K']"> -->
      <UContentSearchButton :label="null" />
      <!-- </UTooltip> -->

      <UColorModeButton />

      <template v-if="appConfig.header?.links">
        <UButton
v-for="(link, index) of appConfig.header.links" :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }" />
      </template>
    </template>

    <template #body>
      <UNavigationMenu orientation="vertical" :items="links" class="-mx-2.5" />

      <USeparator type="dashed" class="mt-4 mb-6" />

      <UContentNavigation
:navigation="$docsNavigation" highlight
        :ui="{ linkTrailingBadge: 'font-semibold uppercase' }">
        <template #link-title="{ link }">
          <span class="inline-flex items-center gap-0.5">
            {{ link.title }}
          </span>
        </template>
      </UContentNavigation>
    </template>
  </UHeader>
</template>
