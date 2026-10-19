<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'
import type { CustomValidation } from '#schema-form-types'

const props = defineProps<{
  schema: Record<string, unknown>
  options?: { customValidation?: CustomValidation[] }
}>()

const schemaString = ref(JSON.stringify(props.schema, null, 2))
const error = ref<string>()

const schemaObject = ref(compileSchema(JSON.parse(schemaString.value)))
const schema2 = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())

watch(schemaString, value => {
  try {
    schemaObject.value = compileSchema(JSON.parse(value))
    schema2.value = schemaObject.value.schema
    state.value = schemaObject.value.getData(state.value)
    error.value = undefined
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})

const toast = useToast()

const onSubmit = (value: any) => {
  if (value == null) return

  console.log(JSON.stringify(value, null, 2))
  toast.add({
    title: 'Form submitted',
    description: 'All fields passed validation. The value is logged in the console.',
    icon: 'i-lucide-circle-check',
    color: 'success'
  })
}
</script>

<template>
  <div class="w-full gap-10 flex">
    <div class="w-1/2 flex flex-col gap-2">
      <div
        class="h-[80vh] rounded-md bg-default ring ring-inset focus-within:ring-2 overflow-hidden transition-colors"
        :class="error ? 'ring-error' : 'ring-accented focus-within:ring-primary'"
      >
        <CodeEditor v-model="schemaString" class="h-full" />
      </div>
      <p v-if="error" class="text-sm text-error">{{ error }}</p>
    </div>
    <div class="w-1/2">
      <SForm v-if="schema2 && error == null" v-model="state" :schema="schema2" :options="options" @submit="onSubmit">
        <template #submit>
          {{ undefined }}
        </template>
      </SForm>
    </div>
  </div>
</template>
