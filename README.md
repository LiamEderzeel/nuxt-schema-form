# Nuxt Schema Form

Runtime form generation for Nuxt apps.

## 🚀 Usage

### Install

1. Install the `@ederzeel/nuxt-schema-form` module to your project

`$ npx nuxi module add @ederzeel/nuxt-schema-form`

### Usage

```ts
<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

const schemaObject = ref(
  compileSchema({
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

const schema = ref(schemaObject.value.getNode().node.schema)
const state = ref(schemaObject.value.getData())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema"> </SForm>
  </div>
</template>
```
