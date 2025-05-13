<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  items: {
    id: string
    enum: string[]
    enum_titles?: string[]
  }
  modelValue: string[]
  isRequired: boolean
  minItems?: number
  maxItems?: number
  edit?: boolean
  editInline?: boolean
}>()

const options = computed(() =>
  props.items.enum.map((x, i) => ({ label: props?.items.enum_titles?.[i] ?? x, value: x }))
)

const value = defineModel<string[]>({ required: true })
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <USelect
        v-model="value"
        placeholder="select size"
        :items="options"
        multiple
        value-attribute="value"
        option-attribute="key"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
