<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

import formSchema from '@/assets/schema-basic.json'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(compileSchema(formSchema))

const schema = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema" />
  </div>
</template>
