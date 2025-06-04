<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
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
      <UInput v-model="value" :type="props.type" class="w-full" />
    </UFormField>
  </div>
</template>
