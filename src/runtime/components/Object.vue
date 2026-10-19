<script lang="ts" setup>
import { computed } from 'vue'
import SComponent from './Component.vue'
import type { Layout } from '../types'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  properties: PropertiesType
  modelValue: Record<string, unknown>
  required?: string[]
  layout?: Layout
  isRequired: boolean
  setHidden?: (value: boolean) => void
}>()

type PropertiesType = {
  [key: string]: Record<string, unknown>
}
type Row = { key: string; fields: string[]; columns: string }

const emit = defineEmits(['update:modelValue', 'submit'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

// Rows follow `layout`; properties it doesn't mention are appended as full-width rows.
const rows = computed((): Row[] => {
  const placed = new Set<string>()
  const result: Row[] = []

  for (const entry of props.layout ?? []) {
    const fields: string[] = []
    const widths: number[] = []
    for (const field of Array.isArray(entry) ? entry : [entry]) {
      const { key, width = 1 } = typeof field === 'string' ? { key: field } : field
      if (!(key in props.properties) || placed.has(key)) {
        if (import.meta.dev) console.warn(`[schema-form] layout: ignoring unknown or duplicate property "${key}"`)
        continue
      }
      placed.add(key)
      fields.push(key)
      widths.push(width)
    }
    if (fields.length > 0) {
      result.push({ key: fields.join(','), fields, columns: widths.map(w => `minmax(0, ${w}fr)`).join(' ') })
    }
  }

  for (const key of Object.keys(props.properties)) {
    if (!placed.has(key)) result.push({ key, fields: [key], columns: 'minmax(0, 1fr)' })
  }

  return result
})
</script>

<template>
  <div>
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <div
      v-for="row of rows"
      :key="row.key"
      class="mt-4 grid gap-4 sm:grid-cols-[var(--s-row-columns)]"
      :style="{ '--s-row-columns': row.columns }"
    >
      <SComponent
        v-for="key of row.fields"
        :id="id.length <= 0 ? `${key}` : `${id}.${key}`"
        :key="key"
        :model-value="modelValue[key]"
        :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${key}` : `${jsonSchemaPath}.properties.${key}`"
        v-bind="properties[key]"
        :isRequired="required ? required.includes(key) : false"
        :setHidden="setHidden"
        @update:model-value="(event: unknown) => onInput(event, key)"
        @submit="() => emit('submit')"
      />
    </div>
  </div>
</template>
