<script lang="ts" setup>
import { h } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { PropertiesType } from '../types'
import SObject from './array/ArrayObject.vue'
import SMultiSelect from './MultiSelect.vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  items: PropertiesType
  isRequired: boolean
  minItems?: number
  maxItems?: number
  edit?: boolean
  columns?: TableColumn<{}>[]
  editInline?: boolean
  modelValue: unknown[]
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const Renderer = () => {
  if (props.items.type === 'object') {
    return h(SObject, {
      ...props,
      required: props.items.required,
      isRequired: props.isRequired,
      modelValue: props.modelValue as Record<string, unknown>[],
      'onUpdate:modelValue': (v: Record<string, unknown>[]) => {
        emit('update:modelValue', v)
      }
    })
  } else if (props.items.type === 'string' && props.items.enum) {
    return h(SMultiSelect, {
      ...props,
      items: props.items as unknown as {
        id: string
        enum: string[]
        enum_titles?: string[]
      },
      isRequired: props.isRequired,
      modelValue: props.modelValue as string[],
      'onUpdate:modelValue': (v: string[]) => {
        emit('update:modelValue', v)
      }
    })
  }
}
</script>

<template>
  <div>
    <Renderer />
  </div>
</template>
