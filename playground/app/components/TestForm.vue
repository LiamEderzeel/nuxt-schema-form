<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[800px]">
      <SForm v-if="schema" v-model="state" :schema="schema" @submit="onSubmit">
        <template #submit>
          {{ undefined }}
        </template>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type JsonSchema } from 'json-schema-library'
const props = defineProps<{
  state: { [key: string]: unknown }
  schema: JsonSchema
}>()
const state = ref(props.state)

const toast = useToast()

const onSubmit = (value: unknown) => {
  console.log(value)
  toast.add({
    title: 'Form submitted',
    description: 'All fields passed validation. The value is logged in the console.',
    icon: 'i-lucide-circle-check',
    color: 'success'
  })
}
</script>
