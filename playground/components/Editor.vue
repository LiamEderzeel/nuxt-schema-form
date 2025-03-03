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
const schema = ref(schemaObject.value.rootSchema)
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
      class="w-1/2 h-[80vh] rounded-md ring-1 focus:ring-2 ring-gray-300 dark:ring-gray-700 overflow-hidden shadow-sm"
    >
      <MonacoEditor v-model="schemaString" :options="monacoOptions" lang="json" class="h-full rounded-md" />
      <!-- <UFormGroup :error="error"> -->
      <!--   <UTextarea v-model="schemaString" @update:model-value="onUpdate" :rows="25" class="w-full" /> -->
      <!-- </UFormGroup> -->
    </div>
    <div class="w-1/2">
      <SForm v-if="schema && error == null" v-model="state" :schema="schema">
        <template #submit>
          {{ undefined }}
        </template>
      </SForm>
    </div>
  </div>
</template>
