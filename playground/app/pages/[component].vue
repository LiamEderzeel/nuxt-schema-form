<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'

const route = useRoute()
const { default: formSchema } = await import(`../assets/schema-${route.params.component}.json`, {
  assert: { type: 'json' }
})

const schemaObject = ref(new Draft2019(formSchema))

const schema = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema" />
  </div>
</template>
