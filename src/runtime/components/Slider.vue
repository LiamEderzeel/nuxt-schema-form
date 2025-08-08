<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
  minimum?: number
  maximum?: number
  isRequired: boolean
}>()

const value = defineModel<number>({ required: true, default: 0 })
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <USlider class="mt-2" :min="props.minimum" :max="props.maximum" :step="1" v-model="value" tooltip />
    </UFormField>
  </div>
</template>
