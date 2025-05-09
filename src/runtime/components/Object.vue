<script lang="ts" setup>
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
const emit = defineEmits(['update:modelValue', 'submit'])
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
      :isRequired="required.includes(key)"
      class="mt-4"
      @update:model-value="(event: unknown) => onInput(event, key)"
      @submit="() => emit('submit')"
    />
  </div>
</template>
