<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'
import SComponent from './SComponent.vue'
import { ref, computed } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  items: PropertiesType
  modelValue: unknown[]
  isRequired: boolean
  minItems?: number
  maxItems?: number
}>()

type PropertiesType = {
  [key: string]: unknown
}
const emit = defineEmits(['update:modelValue', 'submit'])
const onInput = (value: unknown, index: number) => {
  props.modelValue[index] = value
  emit('update:modelValue', props.modelValue)
}

const values = computed(() => {
  if (props.modelValue.length > 0) {
    return props.modelValue
  } else if (props.minItems > 0) {
    const schemaObject = ref(new Draft2019(props.items))

    const template = schemaObject.value.getTemplate()
    return [...Array(props.minItems)].map(_ => template)
  }

  return []
})
</script>

<template>
  <div>
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <div>
      <SComponent v-for="(value, i) of modelValue" :id="id.length <= 0 ? `${i}` : `${id}[0].${items.id}`" :key="i"
        :model-value="value"
        :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${i}` : `${jsonSchemaPath}[${i}]`" v-bind="items"
        :isRequired="false" class="mt-4" @update:model-value="event => onInput(event, i)"
        @submit="() => emit('submit')" />
    </div>
  </div>
</template>
