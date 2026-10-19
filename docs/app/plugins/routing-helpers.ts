import { mapContentNavigation } from "@nuxt/ui/runtime/utils/content.js";
import type { ContentNavigationItem } from "@nuxt/content";

export default defineNuxtPlugin(async () => {
  const { data: navigation } = await useAsyncData(
    "navigation",
    () => queryCollectionNavigation("docs"),
  );
  const docsNavigation = computed<ContentNavigationItem[]>(
    () =>
      (mapContentNavigation(navigation.value || []).at(0)?.children ?? []) as ContentNavigationItem[],
  );

  return {
    provide: {
      docsNavigation,
    },
  };
});
