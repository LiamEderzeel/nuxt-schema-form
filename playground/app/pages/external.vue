<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

import formSchema from '@/assets/schema-basic.json'
// import formSchema from '@/assets/schema-basic.json'

const formRef = ref()

const schemaObject = ref(new Draft2019(formSchema))
const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())

const submit = () => {
  formRef.value.submit()
}
</script>

<template>
  <div>
    <SForm v-if="schema" ref="formRef" v-model="state" :schema="schema">
      <template #submit>
        {{ undefined }}
      </template>
    </SForm>
    <UButton @click="submit"> Submit </UButton>
  </div>
</template>
