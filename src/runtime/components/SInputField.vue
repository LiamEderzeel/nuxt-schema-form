<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
}>()

const value = defineModel<string | number>({ required: true })
</script>

<template>
  <div>
    <UFormGroup :label="props.title || id" :description="props.description" :name="props.id">
      <UInput v-model="value" :type="props.type" />
    </UFormGroup>
  </div>
</template>
