<script lang="ts" setup>
import { computed } from 'vue'

type Properties = {
  properties?: { [key: string]: unknown }
}

export type SComponentProps = {
  id?: string
  title?: string
  renderer?: string
  type: string
  properties?: Properties
  enum?: string[]
  enum_titles?: string[]
  format?: string
  description?: string
  jsonSchemaPath?: string
  required?: string[]
  isRequired: boolean
  validateFields?: (fields: string[]) => Promise<boolean>
}

const props = withDefaults(defineProps<SComponentProps>(), { id: '', jsonSchemaPath: 'test' })
const value = defineModel<unknown>({ required: true, default: '' })

const options = computed(() => ({
  ...props,
  jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`
}))
</script>

<template>
  <div class="s-form-group">
    <component
      v-bind="options"
      :is="typeof renderer === 'string' ? renderer : undefined"
      v-if="renderer"
      v-model="value"
    />

    <SDate v-else-if="type === 'string' && format === 'full-date'" v-bind="options" v-model="value" />
    <SInputField v-else-if="type === 'string'" v-bind="options" v-model="value" />
    <SToggle v-else-if="type === 'boolean'" v-bind="options" v-model="value" />
    <SObject v-else-if="type === 'object'" v-bind="options" v-model="value" />
    <div v-else>else</div>
  </div>
</template>
