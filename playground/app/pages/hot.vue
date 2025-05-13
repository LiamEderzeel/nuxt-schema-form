<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

import formSchema from '@/assets/hot.json'
import type { CustomValidation } from '#schema-form/components/SForm.vue'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())

const customValidation: CustomValidation[] = [
  {
    field: 'misc.permission',
    message: 'Toestemming is verplicht',
    validate: (state): boolean => state.misc.permission == true
  },
  {
    field: 'misc.days',
    message: '3 dagen is verplicht',
    validate: (state): boolean => {
      return state.misc.days.length === 3
    }
  }
]

const options = {
  customValidation
}

const onSubmit = (value: unknown) => {
  console.log(value)
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
