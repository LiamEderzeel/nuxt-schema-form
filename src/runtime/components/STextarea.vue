<script lang="ts" setup>
const props = defineProps<{
  id: string
  title: string
  description: string
}>()

const value = defineModel<string | number>({ required: true })
</script>

<template>
  <div>
    <UFormGroup :label="props.title || id" :description="props.description" :name="props.id">
      <UTextarea v-model="value" v-bind="properties" />
    </UFormGroup>
  </div>
</template>
