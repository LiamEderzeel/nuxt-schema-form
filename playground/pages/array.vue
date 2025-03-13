<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

import formSchema from '@/assets/schema-array.json'
// import formSchema from '@/assets/schema-basic.json'

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())
</script>

<template>
  <div class="w-full pt-10 flex justify-center">
    <UCard class="w-full max-w-[1200px] p-10">
      <SForm v-if="schema" v-model="state" :schema="schema"> </SForm>
    </UCard>
  </div>
</template>
