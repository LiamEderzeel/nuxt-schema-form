<script lang="ts" setup>
import SComponent from './SComponent.vue'

const props = defineProps<{
  id: string
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
    <h3>{{ props.properties.title }}</h3>

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
