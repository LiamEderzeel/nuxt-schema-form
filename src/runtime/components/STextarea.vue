<script lang="ts" setup>
import type { JsonSchema } from 'json-schema-library'

const props = defineProps<{
  id: string
  properties: JsonSchema
}>()

const value = defineModel<string | number>({ required: true })
</script>

<template>
  <div>
    <UFormGroup
      :label="props.properties.title"
      :name="props.id"
    >
      <UInput
        v-model="value"
        :type="props.properties.type"
      />
      <UTextarea
        v-model="value"
        v-bind="properties"
      />
    </UFormGroup>
  </div>
</template>
