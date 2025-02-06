<script lang="ts" setup>
const props = defineProps<{
  id: string
  title: string
  description: string
}>()

const value = defineModel<boolean>({ required: true })
</script>

<template>
  <div>
    <UFormGroup :label="props.title || id" :description="props.description" :name="props.id">
      <UToggle v-model="value" />
    </UFormGroup>
  </div>
</template>
