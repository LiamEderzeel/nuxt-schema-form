<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] p-10">
      <div class="pb-10 flex place-content-between">
        <h1>Demo</h1>
        <ColorMode />
      </div>
      <Editor :schema="schema" :options="{ customValidation }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorMode from '@/components/ColorMode.vue'
import formSchema from '@/assets/schema.json'
import type { CustomValidation } from '#schema-form-types'

const schema = ref(formSchema)

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Permission is required',
    validate: (state: { misc: { permission?: boolean } }) => state.misc?.permission === true
  }
]
</script>
