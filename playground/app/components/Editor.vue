<script lang="ts" setup>
// import formSchema from '@/assets/schema.json'
import { Draft2019 } from 'json-schema-library'
import { computed } from 'vue'
import type { editor } from 'monaco-editor'
type IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions

const props = defineProps<{
  schema: Record<string, unknown>
}>()

const colorMode = useColorMode()
const schemaString = ref(JSON.stringify(props.schema, null, 2))
const error = ref()
const schemaObject = ref(new Draft2019(JSON.parse(schemaString.value)))
const schema2 = ref(schemaObject.value.rootSchema)
const state = ref(schemaObject.value.getTemplate())

const monacoOptions = computed(
  (): IStandaloneEditorConstructionOptions => ({
    minimap: { enabled: false },
    theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs-light',
    contextmenu: false,
    lineNumbers: 'off',
    scrollBeyondLastLine: false
  })
)
</script>

<template>
  <div class="w-full gap-10 flex">
    <div
      class="w-1/2 h-[80vh] rounded-md ring-1 focus:ring-2 ring-neutral-300 dark:ring-gray-700 overflow-hidden shadow-sm"
    >
      <MonacoEditor v-model="schemaString" :options="monacoOptions" lang="json" class="h-full rounded-md" />
      <UFormField :error="error">
        <UTextarea v-model="schemaString" :rows="25" class="w-full" />
      </UFormField>
    </div>
    <div class="w-1/2">
      <SForm v-if="schema2 && error == null" v-model="state" :schema="schema2" @submit="onSubmit">
        <template #submit>
          {{ undefined }}
        </template>
      </SForm>
    </div>
  </div>
</template>
