<script lang="ts" setup>
const props = defineProps<{
  id: string
  properties: {
    title: string
    enum: string[]
  }
}>()

const value = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <UFormGroup
      :label="props.properties.title"
      :name="props.id"
    >
      <USelect
        v-model="value"
        placeholder="select size"
        :options="props.properties.enum"
      />
    </UFormGroup>
  </div>
</template>
