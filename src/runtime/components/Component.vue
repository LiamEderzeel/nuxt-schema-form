<script lang="ts" setup>
import { h, resolveComponent } from 'vue'
import SObject from './Object.vue'
import SDate from './Date.vue'
import SToggle from './Toggle.vue'
import SArray from './Array.vue'
import SInputNumber from './InputNumber.vue'
import SInputField from './InputField.vue'
import SSelect from './Select.vue'
import type { PropertiesType } from '../types'
import type { TableColumn } from '@nuxt/ui'

type Properties = {
  properties?: { [key: string]: unknown }
}

export type SComponentProps = {
  id?: string
  title?: string
  renderer?: string
  type?: string | unknown[]
  properties?: Properties
  enum?: string[]
  enum_titles?: string[]
  format?: string
  description?: string
  placeholder?: string
  jsonSchemaPath?: string
  required?: string[]
  isRequired: boolean
  items?: PropertiesType
  edit?: boolean
  minItems?: number
  maxItems?: number
  minimum?: number
  maximum?: number
  editInline?: boolean
  columns?: TableColumn<{}>[]
  validateFields?: (fields: string[]) => Promise<boolean>
  setHidden?: (value: boolean) => void
}

const props = withDefaults(defineProps<SComponentProps>(), { id: '', jsonSchemaPath: '' })
const value = defineModel<unknown>({ required: true })
const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit')
}

const Render = () => {
  const { type: t, renderer, format } = props
  const type = Array.isArray(t) ? t[0] : t
  if (type == null || (renderer != null && renderer === 'none')) {
    return undefined
  } else if (renderer) {
    return h(resolveComponent(renderer), {
      ...props,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      onSubmit,
      // is: typeof renderer === 'string' ? renderer : undefined,
      modelValue: value.value,
      'onUpdate:modelValue': (v: unknown) => {
        value.value = v
      }
    })
  } else if (type === 'string') {
    const { enum: eenum } = props
    if (format === 'full-date') {
      return h(SDate, {
        id: props.id,
        title: props.title,
        description: props.description,
        type: props.type,
        isRequired: props.isRequired,
        jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
        modelValue: value.value as string,
        'onUpdate:modelValue': (v: string) => {
          value.value = v
        }
      })
    } else if (eenum) {
      return h(SSelect, {
        id: props.id,
        title: props.title,
        description: props.description,
        enum: eenum,
        enum_titles: props.enum_titles,
        isRequired: props.isRequired,
        jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
        modelValue: value.value as string,
        'onUpdate:modelValue': (v: string) => {
          value.value = v
        }
      })
    } else {
      return h(SInputField, {
        id: props.id,
        title: props.title,
        description: props.description,
        isRequired: props.isRequired,
        type,
        jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
        modelValue: value.value as string,
        'onUpdate:modelValue': (v: string) => {
          value.value = v
        }
      })
    }
  } else if (type === 'number' || type === 'integer') {
    return h(SInputNumber, {
      id: props.id,
      title: props.title,
      description: props.description,
      type,
      isRequired: props.isRequired,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      modelValue: value.value as number,
      'onUpdate:modelValue': (v: number) => {
        value.value = v
      }
    })
  } else if (type === 'boolean') {
    return h(SToggle, {
      id: props.id,
      title: props.title,
      description: props.description,
      isRequired: props.isRequired,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      modelValue: value.value as boolean,
      'onUpdate:modelValue': (v: boolean) => {
        value.value = v
      }
    })
  } else if (type === 'object') {
    if (!props.properties) throw new Error('object is missing properties')
    if (!props.required) throw new Error('object is missing required')

    return h(SObject, {
      id: props.id,
      title: props.title,
      description: props.description,
      properties: props.properties,
      required: props.required,
      isRequired: props.isRequired,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      onSubmit,
      setHidden: props.setHidden,
      modelValue: value.value as Record<string, unknown>,
      'onUpdate:modelValue': (v: Record<string, unknown>) => {
        value.value = v
      }
    })
  } else if (type === 'array') {
    if (!props.items) throw new Error('array has no items')

    return h(SArray, {
      id: props.id,
      title: props.title,
      description: props.description,
      items: props.items,
      isRequired: props.isRequired,
      minItems: props.minItems,
      maxItems: props.maxItems,
      edit: props.edit,
      columns: props.columns,
      editInline: props.editInline,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      onSubmit,
      setHidden: props.setHidden,
      modelValue: value.value as unknown[],
      'onUpdate:modelValue': (v: unknown) => {
        value.value = v as unknown[]
      }
    })
  }
  return undefined
}
</script>

<template>
  <div class="s-form-group">
    <Render />
  </div>
</template>
