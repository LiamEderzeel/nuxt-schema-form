<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] p-10">
      <div class="pb-10 flex place-content-between">
        <h1>Demo</h1>
        <ColorMode />
      </div>
      <SForm v-if="schema" v-model="state" :schema="schema" :options="options" @submit="onSubmit">
        <template #submit>
          {{ undefined }}
        </template>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorMode from '@/components/ColorMode.vue'
import formSchema from '@/assets/schema-custom-validation.json'
import type { CustomValidation } from '#schema-form/components/SForm.vue'
import { compileSchema } from 'json-schema-library'
import type { Config } from '@ederzeel/json-schema-yup-transformer'

const schemaObject = ref(compileSchema(formSchema))

const schema = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())

const jsonSchemaYupTransfromer: Config = {
  errors: {
    defaults: {
      format: ([_key, { title, format }]) => `${title} heeft een ongeldig ${format} formaat`,
      required: ([_key, { title }]) => `${title} is verplicht`
    }
  }
}

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Toestemming is verplicht',
    validate: (state): boolean => state.misc.permission == true
  }
]

const options = {
  jsonSchemaYupTransfromer,
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
