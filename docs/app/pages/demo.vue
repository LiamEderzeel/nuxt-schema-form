<script lang="ts" setup>
import formSchema from '~/assets/demo-schema.json'
import type { CustomValidation } from '#schema-form-types'

useSeoMeta({ title: 'Demo' })

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Toestemming is verplicht',
    validate: (state: { misc: { permission?: boolean } }) => state.misc?.permission === true
  }
]
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
        <DemoEditor :schema="formSchema" :options="{ customValidation }" />
      </ClientOnly>
    </UContainer>
  </UMain>
</template>
