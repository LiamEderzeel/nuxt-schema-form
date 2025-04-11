<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

import formSchema from '@/assets/schema-numbers.json'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema"/>
  </div>
</template>
