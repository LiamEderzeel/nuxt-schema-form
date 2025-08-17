<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  isRequired: boolean
}>()

const df = new DateFormatter('nl-NL', { dateStyle: 'medium' })

const value = defineModel<string>({ required: true, default: new Date().toISOString() })
const valueDate = new Date(value.value)
const date = ref(new CalendarDate(valueDate.getFullYear(), valueDate.getMonth() + 1, valueDate.getDate()))

watch(date, () => {
  value.value = date.value.toDate(getLocalTimeZone()).toISOString()
})
const open = ref(false)
</script>

<template>
  <div>
    <UFormField
      :label="props.title || id"
      :hint="!props.isRequired ? 'optional' : undefined"
      :description="props.description"
      :name="props.id"
    >
      <UPopover v-model:open="open">
        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar" class="w-full" @click="() => (open = true)">
          {{ value ? df.format(date.toDate(getLocalTimeZone())) : 'Select a date' }}
        </UButton>

        <template #content>
          <UCalendar v-model="date" class="p-2" @update:modelValue="() => (open = false)" />
        </template>
      </UPopover>
    </UFormField>
  </div>
</template>
