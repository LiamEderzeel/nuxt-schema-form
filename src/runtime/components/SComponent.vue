<script lang="ts" setup>
import { computed } from 'vue'

type Properties = {
  properties: { type: string, [key: string]: any }
  [key: string]: any
}

export type SComponentProps = {
  id: string
  properties: Properties
  jsonSchemaPath: string
}

const props = defineProps<SComponentProps>()
const value = defineModel<any>({ required: true })

const options = computed(() => ({
  id: props.id,
  label: props.properties.label,
  properties: props.properties,
  jsonSchemaPath: props.jsonSchemaPath
}))

const properties = computed(() => {
  if (props.properties == null) throw new Error('properties not set')
  return props.properties
})
</script>

<template>
  <div class="s-form-group">
    <component
      v-bind="options"
      :is="typeof properties.renderer === 'string' ? properties.renderer : properties.renderer.name"
      v-if="properties.renderer"
      v-model="value"
    />

    <SInputField
      v-else-if="properties.type === 'string'"
      v-bind="options"
      v-model="value"
    />
    <SToggle
      v-else-if="properties.type === 'boolean'"
      v-bind="options"
      v-model="value"
    />
    <SObject
      v-else-if="properties.type === 'object'"
      v-bind="options"
      v-model="value"
    />
  </div>
</template>
