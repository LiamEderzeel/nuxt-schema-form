<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
  properties: PropertiesType
  jsonSchemaPath: string
  required: string[]
  isRequired: boolean
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
  city: Default
  [key: string]: unknown
}

const value = defineModel<{ street: string; number: string; unit: string; zipCode: string; city: string }>({
  required: true
})

const emit = defineEmits(['update:modelValue'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div>
    <div class="flex flex-row gap-4">
      <SInputField v-bind="{
        ...properties.street,
        id: `${id}.street`,
        jsonSchemaPath: `${props.jsonSchemaPath}.properties.street`
      }" v-model="value.street" @update:model-value="event => onInput(event, 'street')"
        :isRequired="required.includes('street')" class="flex flex-col flex-4" />
      <SInputField v-bind="{
        ...properties.number,
        id: `${id}.number`,
        jsonSchemaPath: `${props.jsonSchemaPath}.properties.number`
      }" v-model="value.number" @update:model-value="event => onInput(event, 'number')"
        :isRequired="required.includes('number')" class="flex flex-col flex-1" />
      <SInputField
        v-bind="{ ...properties.unit, id: `${id}.unit`, jsonSchemaPath: `${props.jsonSchemaPath}.properties.unit` }"
        v-model="value.unit" @update:model-value="event => onInput(event, 'unit')"
        :isRequired="required.includes('unit')" class="flex flex-col flex-1" />
    </div>
    <div class="flex flex-row gap-4">
      <SInputField v-bind="{
        ...properties.zipCode,
        id: `${id}.zipCode`,
        jsonSchemaPath: `${props.jsonSchemaPath}.properties.zipCode`
      }" v-model="value.zipCode" @update:model-value="event => onInput(event, 'zipCode')"
        :isRequired="required.includes('zipCode')" class="flex flex-col flex-2" />
      <SInputField
        v-bind="{ ...properties.city, id: `${id}.city`, jsonSchemaPath: `${props.jsonSchemaPath}.properties.city` }"
        v-model="value.city" @update:model-value="event => onInput(event, 'city')"
        :isRequired="required.includes('city')" class="flex flex-col flex-1" />
    </div>
  </div>
</template>
