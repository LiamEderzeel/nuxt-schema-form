<script lang="ts" setup>
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
  isRequired: boolean
}>()

const value = defineModel<number>({ required: true, default: 0 })
</script>

<template>
  <div>
    <UFormField :label="props.title || id" :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description" :name="props.id">
      <UInputNumber v-model="value" class="w-full" orientation="vertical" :stepSnapping="props.type === 'number'"
        :format-options="{
          minimumFractionDigits: props.type === 'number' ? 1 : undefined
        }" />
    </UFormField>
  </div>
</template>
