<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  isRequired: boolean
}>()

const value = defineModel<string>({ default: '' })
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <UTextarea class="w-full" :modelValue="value || ''" @update:modelValue="value = $event" />
    </UFormField>
  </div>
</template>
