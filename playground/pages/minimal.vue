<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

const schemaObject = ref(
  new Draft2019({
    title: 'From',
    description: 'A minimal form example',
    type: 'object',
    required: ['firstname'],
    properties: {
      firstname: {
        title: 'Firstname',
        description: 'Firstname field for submitting a first name',
        type: 'string',
        default: ''
      }
    }
  })
)

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema"> </SForm>
  </div>
</template>
