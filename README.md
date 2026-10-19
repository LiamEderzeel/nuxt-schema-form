# Nuxt Schema Form

Runtime form generation for Nuxt apps. Describe a form as JSON Schema and get the fields, validation and layout at runtime, rendered with Nuxt UI components.

- 📖 [Documentation](https://liamederzeel.github.io/nuxt-schema-form/docs/getting-started)
- ▶️ [Live demo](https://liamederzeel.github.io/nuxt-schema-form/demo): edit a schema and watch the form update as you type

## 🚀 Usage

### Install

1. Install the `@ederzeel/nuxt-schema-form` module in your project:

```bash
npx nuxi module add @ederzeel/nuxt-schema-form
```

2. Import the module's styles in your main CSS file, after Nuxt UI:

```css
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@ederzeel/nuxt-schema-form';
```

### Generate a form

```vue
<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'

const schemaObject = ref(
  compileSchema({
    title: 'Form',
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

const schema = ref(schemaObject.value.schema)
const state = ref(schemaObject.value.getData())
</script>

<template>
  <div>
    <SForm v-if="schema" v-model="state" :schema="schema" />
  </div>
</template>
```

See the [documentation](https://liamederzeel.github.io/nuxt-schema-form/docs/getting-started) for validation, layouts and custom renderers.
