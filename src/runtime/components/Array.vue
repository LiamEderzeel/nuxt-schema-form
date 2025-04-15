<script lang="ts" setup>
import { Draft2019 } from 'json-schema-library'
import SComponent from './Component.vue'
import { ref, computed } from 'vue'

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  items: PropertiesType
  modelValue: unknown[]
  isRequired: boolean
  minItems?: number
  maxItems?: number
  edit?: boolean
  columns?: ColumnItem[]
  editInline?: boolean
}>()

type ColumnItem = {
  key: string
  label?: string
  class?: string
}

type PropertiesType = {
  properties: {
    [key: string]: unknown
  }
  [key: string]: unknown
}
const emit = defineEmits(['update:modelValue', 'submit'])
const onInput = (value: unknown, index: number) => {
  props.modelValue[index] = value
  emit('update:modelValue', props.modelValue)
}

const schemaObject = ref(new Draft2019(props.items))

const values = computed(() => {
  if (props.modelValue.length > 0) {
    return props.modelValue.map((x, i) => ({ ...x, __id: i }))
  } else if (props.minItems && props.minItems > 0) {
    const template = schemaObject.value.getTemplate()
    return [...Array(props.minItems)].map((_, i) => ({ ...template, __id: i }))
  }

  return []
})

const add = () => {
  emit('update:modelValue', [...props.modelValue, schemaObject.value.getTemplate()])
}

const remove = (index: number) => {
  const res = props.modelValue.splice(index, 1)
  emit('update:modelValue', res)
}

const massRemove = () => {
  let res = props.modelValue
  for (const index of selectedRows.value.map(x => x.__id)) {
    res.splice(index, 1)
  }

  emit('update:modelValue', res)
}

const model = ref({
  open: false,
  index: 0
})

const open = (index: number) => {
  model.value = { open: true, index: index }
}

const actions = (i: number) => [
  [
    {
      label: 'edit',
      click: () => open(i)
    }
  ],
  [
    {
      label: 'delete',
      click: () => {
        remove(i)
        selectedRows.value = []
      }
    }
  ]
]

const massActions = [
  [
    {
      label: 'delete',
      click: () => {
        massRemove()
        selectedRows.value = []
      }
    }
  ]
]

const columns = computed(() => {
  const columns = props.columns ?? []

  if (props.items.type === 'object') {
    for (const column of Object.keys(props?.items?.properties).map(x => ({ key: x, label: x }))) {
      columns.push(column)
    }
  }

  if (props.edit) {
    columns.push({
      key: 'actions',
      class: 'w-2'
    })
  }

  return columns
})

const selectedRows = ref([])

const todoStatus = [
  {
    key: 'uncompleted',
    label: 'In Progress',
    value: false
  },
  {
    key: 'completed',
    label: 'Completed',
    value: true
  }
]

const expand = ref({
  openedRows: [],
  row: null
})

const options = computed(() => {
  const res = {}
  if (props.edit) {
    res.modelValue = selectedRows.value
    res['onUpdate:modelValue'] = value => (selectedRows.value = value)
  }
  if (props.editInline) {
    res.expand = expand.value
    res['update:expand'] = value => (expand.value = value)
  }
  return res
})
</script>

<template>
  <div>
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <div>
      <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex gap-1.5 items-center">
          <UButton v-if="edit" :disabled="maxItems && values.length >= maxItems" @click="add" icon="i-heroicons-plus"
            trailing color="neutral" size="xs" />
        </div>
        <div class="flex gap-1.5 items-center">
          <UDropdownMenu v-if="selectedRows.length > 0" :items="massActions">
            <UButton icon="i-heroicons-chevron-down" trailing color="neutral" size="xs"> Action </UButton>
          </UDropdownMenu>
        </div>
      </div>
      <UTable v-bind="options" by="__id" :rows="values" :columns="columns">
        <template #name-data="{ row }">
          <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
            row.name
            }}</span>
        </template>

        <template #expand="{ row, index }">
          <div class="p-4">
            <SComponent :id="id.length <= 0 ? `${index}` : `${id}[${index}].${items.id}`" :model-value="row"
              :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${index}` : `${jsonSchemaPath}[${index}]`"
              v-bind="items" :isRequired="false" class="mt-4" @update:model-value="event => onInput(event, index)"
              @submit="() => emit('submit')" />
          </div>
        </template>

        <template #actions-data="{ index }">
          <UDropdownMenu :items="actions(index)">
            <UButton color="neutral" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdownMenu>
        </template>
      </UTable>
    </div>
    <UModal v-model:open="model.open">
      <UCard>
        <SComponent :id="id.length <= 0 ? `${model.index}` : `${id}[0].${items.id}`" :model-value="values[model.index]"
          :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${model.index}` : `${jsonSchemaPath}[${model.index}]`
            " v-bind="items" :isRequired="false" class="mt-4" @update:model-value="event => onInput(event, model.index)"
          @submit="() => emit('submit')" />
        <template #footer>
          <UButton>Save</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
