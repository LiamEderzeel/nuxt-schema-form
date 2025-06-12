<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

import formSchema from '@/assets/schema-arrayt.json'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(compileSchema(formSchema))

const schema = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())
</script>

<template>
  <div class="w-full p-10 flex justify-center">
    <UCard class="w-full max-w-[1200px] p-10">
      <SForm v-if="schema" v-model="state" :schema="schema" />
    </UCard>
  </div>
</template>
