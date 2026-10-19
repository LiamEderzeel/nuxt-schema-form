import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags } from '@lezer/highlight'

// Built on Nuxt UI's CSS variables, so it follows the color mode and app.config colors.
const selection = 'color-mix(in oklab, var(--ui-primary) 20%, transparent)'

const editorTheme = EditorView.theme({
  '&': {
    height: '100%',
    color: 'var(--ui-text)',
    backgroundColor: 'var(--ui-bg)',
    fontSize: '0.875rem'
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { overflow: 'auto', fontFamily: 'var(--font-mono)', lineHeight: '1.6' },
  '.cm-content': { caretColor: 'var(--ui-primary)', paddingBlock: '0.5rem' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--ui-primary)', borderLeftWidth: '2px' },
  '.cm-selectionBackground, &.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: selection },
  '.cm-activeLine': { backgroundColor: 'var(--ui-bg-muted)' },
  '.cm-selectionMatch': { backgroundColor: selection },
  '&.cm-focused .cm-matchingBracket': {
    backgroundColor: 'transparent',
    outline: '1px solid var(--ui-primary)',
    borderRadius: '2px'
  },
  '&.cm-focused .cm-nonmatchingBracket': { outline: '1px solid var(--ui-error)' },
  '.cm-gutters': {
    color: 'var(--ui-text-dimmed)',
    backgroundColor: 'var(--ui-bg)',
    border: 'none'
  },
  '.cm-activeLineGutter': { color: 'var(--ui-text-highlighted)', backgroundColor: 'var(--ui-bg-muted)' },
  '.cm-foldPlaceholder': {
    color: 'var(--ui-text-muted)',
    backgroundColor: 'var(--ui-bg-elevated)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'var(--ui-radius)'
  },
  '.cm-tooltip': {
    color: 'var(--ui-text)',
    backgroundColor: 'var(--ui-bg)',
    border: '1px solid var(--ui-border)',
    borderRadius: 'calc(var(--ui-radius) * 1.5)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    overflow: 'hidden'
  },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    color: 'var(--ui-text-highlighted)',
    backgroundColor: 'var(--ui-bg-elevated)'
  },
  '.cm-diagnostic': { borderLeftWidth: '3px', padding: '0.25rem 0.5rem' },
  '.cm-diagnostic-error': { borderLeftColor: 'var(--ui-error)' },
  '.cm-lintRange-error': {
    backgroundImage: 'none',
    textDecoration: 'underline wavy var(--ui-error)',
    textUnderlineOffset: '3px'
  },
  '.cm-panels': { color: 'var(--ui-text)', backgroundColor: 'var(--ui-bg-muted)' },
  '.cm-panels.cm-panels-top': { borderBottom: '1px solid var(--ui-border)' },
  '.cm-panels.cm-panels-bottom': { borderTop: '1px solid var(--ui-border)' },
  '.cm-searchMatch': { backgroundColor: 'color-mix(in oklab, var(--ui-warning) 25%, transparent)' },
  '.cm-searchMatch.cm-searchMatch-selected': { backgroundColor: selection }
})

const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: 'var(--ui-primary)' },
  { tag: tags.string, color: 'var(--ui-chart-2)' },
  { tag: tags.number, color: 'var(--ui-chart-4)' },
  { tag: [tags.bool, tags.null], color: 'var(--ui-chart-3)' },
  { tag: [tags.separator, tags.squareBracket, tags.brace], color: 'var(--ui-text-dimmed)' },
  { tag: tags.invalid, color: 'var(--ui-error)' }
])

export const nuxtUiTheme = [editorTheme, syntaxHighlighting(highlightStyle)]
