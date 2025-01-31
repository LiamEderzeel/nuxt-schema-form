<script lang="ts" setup>
import SComponent from './SComponent.vue'

const props = defineProps<{
  id: string
  jsonSchemaPath: string
  properties: PropertiesType
  modelValue: Record<string, unknown>
}>()

type PropertiesType = {
  properties: {
    [key: string]: {
      [key: string]: unknown
    }
  }
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
      v-for="[key, options] of Object.entries(properties.properties)"
      :id="`${id}.${key}`"
      :key="key"
      :model-value="modelValue[key]"
      :json-schema-path="`${jsonSchemaPath}.properties.${key}`"
      :properties="options"
      @update:model-value="event => onInput(event, key)"
    />
  </div>
</template>
