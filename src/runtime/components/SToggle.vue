<script lang="ts" setup>
import type { JsonSchema } from 'json-schema-library'

const props = defineProps<{
  id: string
  properties: JsonSchema
}>()

const value = defineModel<boolean>({ required: true })
</script>

<template>
  <div>
    <UFormGroup
      :label="props.properties.title || id"
      :name="props.id"
    >
      <UToggle v-model="value" />
    </UFormGroup>
  </div>
</template>
