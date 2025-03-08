<script lang="ts" setup>
import { computed, defineEmits } from 'vue'

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
  items?: { [key: string]: unknown }
  validateFields?: (fields: string[]) => Promise<boolean>
}

const props = withDefaults(defineProps<SComponentProps>(), { id: '', jsonSchemaPath: '' })
const value = defineModel<unknown>({ required: true, default: '' })
const emit = defineEmits(['submit'])

const options = computed(() => ({
  ...props,
  jsonSchemaPath: `${props.jsonSchemaPath}.${props.id}`
}))
const onSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="s-form-group">
    <component v-if="renderer" v-bind="options" v-model="value"
      :is="typeof renderer === 'string' ? renderer : undefined" @submit="onSubmit" />

    <SDate v-else-if="type === 'string' && format === 'full-date'" v-bind="options" v-model="value" />
    <SInputField v-else-if="type === 'string'" v-bind="options" v-model="value" />
    <SToggle v-else-if="type === 'boolean'" v-bind="options" v-model="value" />
    <SObject v-else-if="type === 'object'" v-bind="options" v-model="value" @submit="onSubmit" />
    <SArray v-else-if="type === 'array'" v-bind="options" v-model="value" />
    <div v-else>else</div>
  </div>
</template>
