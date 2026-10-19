<script lang="ts" setup>
import formSchema from '~/assets/demo-schema.json'

useSeoMeta({ title: 'Demo' })
</script>

<template>
  <UMain>
    <UContainer class="py-10">
      <UPageHeader
        title="Demo"
        description="Edit the JSON schema on the left and the form on the right updates as you type."
        class="mb-10"
      />
      <ClientOnly>
        <DemoEditor :schema="formSchema" />
      </ClientOnly>
    </UContainer>
  </UMain>
</template>
