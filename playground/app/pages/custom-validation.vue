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
import formSchema from '@/assets/schema.json'
import type { CustomValidation } from '#schema-form/components/SForm.vue'
import { Draft2019 } from 'json-schema-library'
import type { Config } from 'json-schema-yup-transformer'

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())

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
    name: 'misc.permission',
    message: 'Toestemming is verplicht',
    validate: (state): boolean => state.misc.permission == true
  }
]

const options = {
  jsonSchemaYupTransfromer,
  customValidation
}

const onSubmit = (value: unknown) => {
  console.log(value)
}
</script>
