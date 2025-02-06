<script lang="ts" setup>
const props = defineProps<{
  id: string
  title: string
  description: string
  enum: string[]
}>()

const value = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <UFormGroup :label="props.title || id" :description="props.description" :name="props.id">
      <USelect v-model="value" placeholder="select size" :options="props.enum" />
    </UFormGroup>
  </div>
</template>
