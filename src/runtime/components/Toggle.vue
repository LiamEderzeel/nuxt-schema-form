<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  isRequired: boolean
}>()

const value = defineModel<boolean>({ required: true })
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <USwitch v-model="value" />
    </UFormField>
  </div>
</template>
