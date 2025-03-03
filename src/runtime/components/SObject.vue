<script lang="ts" setup>
import SComponent from './SComponent.vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  properties: PropertiesType
  modelValue: Record<string, unknown>
}>()

type PropertiesType = {
  [key: string]: unknown
}
const emit = defineEmits(['update:modelValue'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div>
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <SComponent
      v-for="[key, options] of Object.entries(properties)"
      :id="id.length <= 0 ? `${key}` : `${id}.${key}`"
      :key="key"
      :model-value="modelValue[key]"
      :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${key}` : `${jsonSchemaPath}.properties.${key}`"
      v-bind="options"
      @update:model-value="event => onInput(event, key)"
    />
  </div>
</template>
