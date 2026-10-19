<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

import formSchema from '@/assets/schema-hot2.json'
import type { CustomValidation } from '#schema-form/components/SForm.vue'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(compileSchema(formSchema))

const schema = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())
// const state = ref({})

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Permission is required',
    validate: (state): boolean => state.misc.permission == true
  },
  {
    field: 'misc.days',
    message: 'Select exactly 3 days',
    validate: (state): boolean => {
      return state.misc.days.length === 3
    }
  }
]

const options = {
  customValidation
}

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

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema" :options="options" @submit="onSubmit">
      <template #submit>
        {{ undefined }}
      </template>
    </SForm>
  </div>
</template>
