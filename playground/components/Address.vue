<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
  properties: PropertiesType
  jsonSchemaPath: string
}>()
type Default = {
  id: string
  title?: string
  description?: string
  type: string
}

type PropertiesType = {
  street: Default
  number: Default
  unit: Default
  zipCode: Default
  country: Default
  [key: string]: unknown
}

const value = defineModel<string>({ required: true })

const options = computed(() => ({
  ...props,
  jsonSchemaPath: `${props.id}${props.jsonSchemaPath}`
}))

const emit = defineEmits(['update:modelValue'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div>
    <div class="flex flex-row gap-4">
      <SInputField
        v-bind="{ ...properties.street, jsonSchemaPath: `${props.id}${props.jsonSchemaPath}` }"
        v-model="value"
        @update:model-value="event => onInput(event, 'address')"
        class="flex flex-col flex-4"
      />
      <SInputField
        v-bind="{ ...properties.number, jsonSchemaPath: `${props.id}${props.jsonSchemaPath}` }"
        v-model="value"
        @update:model-value="event => onInput(event, 'number')"
        class="flex flex-col flex-1"
      />
      <SInputField
        v-bind="{ ...properties.unit, jsonSchemaPath: `${props.id}${props.jsonSchemaPath}` }"
        v-model="value"
        @update:model-value="event => onInput(event, 'unit')"
        class="flex flex-col flex-1"
      />
    </div>
    <div class="flex flex-row gap-4">
      <SInputField
        v-bind="{ ...properties.zipCode, jsonSchemaPath: `${props.id}${props.jsonSchemaPath}` }"
        v-model="value"
        @update:model-value="event => onInput(event, 'zipCode')"
        class="flex flex-col flex-2"
      />
      <SInputField
        v-bind="{ ...properties.city, jsonSchemaPath: `${props.id}${props.jsonSchemaPath}` }"
        v-model="value"
        @update:model-value="event => onInput(event, 'city')"
        class="flex flex-col flex-1"
      />
    </div>
  </div>
</template>
