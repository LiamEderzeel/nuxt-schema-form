<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const appConfig = useAppConfig()
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`)

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: `${useRuntimeConfig().app.baseURL}favicon.ico` }],
  style: [{ innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 }]
})

// useSeoMeta({
//   titleTemplate: `%s - ${appConfig.seo.siteName}`,
//   ogSiteName: appConfig.seo.siteName,
//   twitterCard: 'summary_large_image'
// })

// Search
const { data: files } = useAsyncData('/api/search.json', () => queryCollectionSearchSections('docs'), { server: false })

const docsNavigation = useNuxtApp().$docsNavigation

// // Header
const route = useRoute()
const links = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: `/docs/getting-started`,
    icon: 'i-lucide-book-open',
    active: route.path.startsWith('/docs')
  },
  {
    label: 'Demo',
    to: '/demo',
    icon: 'i-lucide-play',
    active: route.path.startsWith('/demo')
  }
  // {
  //   label: 'Roadmap',
  //   to: '/roadmap',
  //   icon: 'i-heroicons-map'
  // }
])
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <HeaderComponent :links="links" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <FooterComponent />
    
    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="docsNavigation" :multiple="true" :kbds="['meta', 'K']" />
    </ClientOnly>
  </UApp>
</template>
