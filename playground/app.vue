<template>
  <div>
    <SForm
      v-if="schema"
      v-model="state"
      :schema="schema"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import formSchema from '@/assets/schema.json'
import { Draft2019 } from 'json-schema-library'

const parsedSchema = new Draft2019(formSchema)

const schema = ref(parsedSchema.rootSchema)
const state = ref(parsedSchema.getTemplate())

const onSubmit = (value: unknown) => {
  console.log(value)
}
</script>
