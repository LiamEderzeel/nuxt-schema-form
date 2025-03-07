<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] p-10">
      <div class="pb-10 flex place-content-between">
        <h1>Demo</h1>
        <ColorMode />
      </div>
      <SForm v-if="schema" v-model="state" :schema="schema" :custom-validation="customValidation" @submit="onSubmit">
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

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Toestemming is verplicht',
    validate: (state): boolean => state.misc.permission == true
  }
]

const onSubmit = (value: unknown) => {
  console.log(value)
}
</script>
