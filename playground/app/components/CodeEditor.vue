<script lang="ts" setup>
import { basicSetup } from 'codemirror'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { nuxtUiTheme } from '~/utils/codemirror-theme'

const model = defineModel<string>({ required: true })

const colorMode = useColorMode()
const container = ref<HTMLElement>()
const darkMode = new Compartment()
let view: EditorView | undefined

// Colors come from CSS variables; this only tells CodeMirror's base styles which mode is active.
const darkModeExtension = () => EditorView.darkTheme.of(colorMode.value === 'dark')

onMounted(() => {
  view = new EditorView({
    parent: container.value,
    state: EditorState.create({
      doc: model.value,
      extensions: [
        basicSetup,
        json(),
        linter(jsonParseLinter()),
        lintGutter(),
        nuxtUiTheme,
        darkMode.of(darkModeExtension()),
        EditorView.updateListener.of(update => {
          if (update.docChanged) model.value = update.state.doc.toString()
        })
      ]
    })
  })
})

watch(model, value => {
  if (view == null || value === view.state.doc.toString()) return
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } })
})

watch(
  () => colorMode.value,
  () => view?.dispatch({ effects: darkMode.reconfigure(darkModeExtension()) })
)

onBeforeUnmount(() => view?.destroy())
</script>

<template>
  <div ref="container" />
</template>
