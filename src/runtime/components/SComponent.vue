<script lang="ts" setup>
import { computed } from 'vue'

type Properties = {
  properties?: { [key: string]: unknown }
}

export type SComponentProps = {
  id: string
  title?: string
  renderer?: string
  type: string
  properties?: Properties
  enum?: string[]
  description?: string
  jsonSchemaPath: string
  validateFields: (fields: string[]) => Promise<boolean>
}

const props = defineProps<SComponentProps>()
const value = defineModel<unknown>({ required: true, default: '' })

const options = computed(() => ({
  ...props,
  jsonSchemaPath: `${props.id}${props.jsonSchemaPath}`
}))
</script>

<template>
  <div class="s-form-group">
    <component
      v-bind="options"
      :is="typeof renderer === 'string' ? renderer : renderer.name"
      v-if="renderer"
      v-model="value"
    />

    <SInputField v-else-if="type === 'string'" v-bind="options" v-model="value" />
    <SToggle v-else-if="type === 'boolean'" v-bind="options" v-model="value" />
    <SObject v-else-if="type === 'object'" v-bind="options" v-model="value" />
    <div v-else>else</div>
  </div>
</template>
