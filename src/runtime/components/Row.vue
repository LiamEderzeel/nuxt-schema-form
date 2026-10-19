<script lang="ts" setup>
// Deprecated: wrapping fields in an SRow object nests their data. Use `layout` on the parent object instead.
import SComponent from './Component.vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  properties: PropertiesType
  modelValue: Record<string, unknown>
  required: string[]
  isRequired: boolean
}>()

type PropertiesType = {
  [key: string]: Record<string, unknown>
}
const emit = defineEmits(['update:modelValue'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div class="flex flex-row gap-4 justify-stretch">
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <SComponent v-for="[key, options] of Object.entries(properties)" :id="id.length <= 0 ? `${key}` : `${id}.${key}`"
      :key="key" :model-value="modelValue[key]"
      :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${key}` : `${jsonSchemaPath}.properties.${key}`"
      v-bind="options" :isRequired="required.includes(key)" class="flex flex-col flex-1"
      @update:model-value="(event: unknown) => onInput(event, key)" />
  </div>
</template>
