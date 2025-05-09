<script lang="ts" setup>
import { h, resolveComponent } from 'vue'
import SObject from './Object.vue'
import SDate from './Date.vue'
import SToggle from './Toggle.vue'
import SArray from './Array.vue'
import SInputNumber from './InputNumber.vue'
import SInputField from './InputField.vue'
import type { PropertiesType } from '../types'
import type { TableColumn } from '@nuxt/ui'

type Properties = {
  properties?: { [key: string]: unknown }
}

export type SComponentProps = {
  id?: string
  title?: string
  renderer?: string
  type?: string
  properties?: Properties
  enum?: string[]
  enum_titles?: string[]
  format?: string
  description?: string
  jsonSchemaPath?: string
  required?: string[]
  isRequired: boolean
  items?: PropertiesType[]
  edit?: boolean
  minItems?: number
  maxItems?: number
  editInline?: boolean
  columns?: TableColumn<{}>[]
  validateFields?: (fields: string[]) => Promise<boolean>
}

const props = withDefaults(defineProps<SComponentProps>(), { id: '', jsonSchemaPath: '' })
const value = defineModel<unknown>({ required: true })
const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit')
}

const Render = () => {
  const { type, renderer, format } = props
  if (type == null || (renderer != null && renderer === 'none')) {
    return undefined
  } else if (renderer) {
    return h(resolveComponent(renderer), {
      ...props,
      jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`,
      // is: typeof renderer === 'string' ? renderer : undefined,
      modelValue: value.value,
      'onUpdate:modelValue': (v: unknown) => {
        value.value = v
      }
    })
  } else if (type === 'string') {
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
    } else {
      return h(SInputField, {
        id: props.id,
        title: props.title,
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
      modelValue: value.value as Record<string, unknown>[],
      'onUpdate:modelValue': (v: string) => {
        value.value = v
      }
    })
  }
  return undefined
}
</script>

<template>
  <div class="s-form-group">
    <Render />

    <!--<template v-if="renderer != null && renderer === 'none'">{{ undefined }}</template>
    <component
      v-else-if="renderer"
      v-bind="options"
      v-model="value"
      :is="typeof renderer === 'string' ? renderer : undefined"
      @submit="onSubmit"
    />

    <SDate v-else-if="type === 'string' && format === 'full-date'" v-bind="options" v-model="value" />
    <SInputNumber v-else-if="type === 'number' || type === 'integer'" v-bind="options" v-model="value" />
    <SInputField v-else-if="type === 'string'" v-bind="options" v-model="value" />
    <SToggle v-else-if="type === 'boolean'" v-bind="options" v-model="value" />
    <SObject v-else-if="type === 'object'" v-bind="options" v-model="value" @submit="onSubmit" />
    <SArray v-else-if="type === 'array'" v-bind="options" v-model="value" />
    <div v-else>else</div>-->
  </div>
</template>
