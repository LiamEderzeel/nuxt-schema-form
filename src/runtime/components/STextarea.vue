<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  isRequired: boolean
}>()

const value = defineModel<string | number>({ required: true })
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <UTextarea v-model="value" class="w-full" />
    </UFormField>
  </div>
</template>
