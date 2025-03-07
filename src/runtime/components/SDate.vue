<script lang="ts" setup>
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import DatePicker from './DatePicker.vue'
const props = defineProps<{
  id: string
  title?: string
  description?: string
  type: string
  isRequired: boolean
}>()

const value = defineModel<string>({ required: true })
const date = ref(new Date(value.value))
</script>

<template>
  <div>
    <UFormGroup
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

        <template #panel="{ close }">
          <DatePicker v-model="date" is-required @close="close" />
        </template>
      </UPopover>
    </UFormGroup>
  </div>
</template>
