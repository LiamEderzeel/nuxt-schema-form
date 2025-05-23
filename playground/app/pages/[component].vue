<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

const route = useRoute()
const { default: formSchema } = await import(`../assets/schema-${route.params.component}.json`, {
  assert: { type: 'json' }
})

const schemaObject = ref(compileSchema(formSchema))
const schema = ref(schemaObject.value.schema)
const state = ref({})

console.log(state.value)

const onSubmit = (value: unknown) => {
  console.log(value)
}
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema" @submit="onSubmit" />
  </div>
</template>
