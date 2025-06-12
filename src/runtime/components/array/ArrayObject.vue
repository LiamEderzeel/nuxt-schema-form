<script lang="ts" setup>
import { compileSchema } from 'json-schema-library'
import SComponent from '../Component.vue'
import { ref, toRaw, computed, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { PropertiesType } from '../../types'

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const props = defineProps<{
  id: string
  title?: string
  description?: string
  jsonSchemaPath: string
  items: PropertiesType
  modelValue: Record<string, unknown>[]
  isRequired: boolean
  minItems?: number
  maxItems?: number
  edit?: boolean
  columns?: TableColumn<{}>[]
  editInline?: boolean
  required?: string[]
  setHidden?: (value: boolean) => void
}>()
const emit = defineEmits(['update:modelValue', 'submit'])

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

const selectedRows = ref<{ __id: any }[]>([])
const schemaObject = ref(compileSchema(props.items))
const model = ref<{ index: number; value: Record<string, unknown> | undefined }>({
  index: 0,
  value: undefined
})
const expand = ref({
  openedRows: [],
  row: null
})

const values = computed(() => {
  if (props.modelValue.length > 0) {
    return toRaw(props.modelValue).map((x, i) => ({ ...x, __id: i }))
  } else if (props.minItems && props.minItems > 0) {
    const template = schemaObject.value.getData()
    return [...Array(props.minItems)].map((_, i) => ({ ...template, __id: i }))
  }

  return []
})

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

const geneateColumnsFromSchema = (items: PropertiesType): TableColumn<{}>[] => {
  if (!items.properties) return []
  const res: TableColumn<{}>[] = (Object.entries(items.properties) as [string, PropertiesType][]).map(
    ([key, value]): TableColumn<{}, unknown[]> => {
      if (value.type === 'array') {
        return {
          header: value.title || key,
          accessorKey: key,
          cell: ({ getValue }) => {
            return getValue().length
          }
        }
      }
      return {
        header: value.title || key,
        accessorKey: key
      }
    }
  ) as TableColumn<{}>[]

  return res
}

const columns = computed<TableColumn<{}>[]>(() => {
  const columns = props.columns ? Array.from(props.columns) : geneateColumnsFromSchema(props.items)

  if (props.editInline) {
    columns.unshift({
      id: 'expand',
      cell: ({ row }) =>
        h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          icon: 'i-lucide-chevron-down',
          square: true,
          'aria-label': 'Expand',
          ui: {
            leadingIcon: ['transition-transform', row.getIsExpanded() ? 'duration-200 rotate-180' : '']
          },
          onClick: () => row.toggleExpanded()
        })
    })
  }

  if (props.edit) {
    columns.push({
      id: 'actions',
      rowClass: 'text-right',
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-right' },
          h(
            UDropdownMenu,
            {
              content: {
                align: 'end'
              },
              items: getRowItems(row),
              'aria-label': 'Actions dropdown'
            },
            () =>
              h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                class: 'ml-auto',
                'aria-label': 'Actions dropdown'
              })
          )
        )
      }
    })
  }

  return columns
})

function getRowItems(row: Row<{}>) {
  return [
    {
      label: 'edit',
      onSelect: () => open(row.index)
    },
    {
      label: 'delete',
      onSelect: () => {
        remove(row.index)
        selectedRows.value = []
      }
    }
  ]
}

const options = computed(() => {
  let res: {
    modelValue?: any
    'onUpdate:modelValue'?: (v: any) => void
    expand?: {
      openedRows: any[]
      row: null
    }
    'update:expand'?: (v: any) => void
  } = {}

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

const open = (index: number) => {
  if (props.setHidden) props.setHidden(true)
  model.value = { index: index, value: JSON.parse(JSON.stringify(values.value[index])) }
}

const onInput = (value: Record<string, unknown>, index: number) => {
  const res = JSON.parse(JSON.stringify(props.modelValue))
  res[index] = value
  emit('update:modelValue', res)
}

const add = () => {
  emit('update:modelValue', [...props.modelValue, schemaObject.value.getData()])
}

const remove = (index: number) => {
  props.modelValue.splice(index, 1)
  emit('update:modelValue', props.modelValue)
}

const massRemove = () => {
  let res = props.modelValue
  for (const index of selectedRows.value.map(x => x.__id)) {
    res.splice(index, 1)
  }

  emit('update:modelValue', res)
}

const setHiddenSelf = (value: boolean) => (hidden.value = value)
const hidden = ref(false)
</script>

<template>
  <div>
    <h2 v-if="props.title" class="mb-4 text-2xl leading-none tracking-tight">{{ props.title }}</h2>
    <p v-if="props.description" class="mb-4">{{ props.description }}</p>

    <div>
      <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex gap-1.5 items-center">
          <UButton
            v-if="edit"
            :disabled="maxItems && values.length >= maxItems"
            @click="add"
            icon="i-heroicons-plus"
            trailing
            color="neutral"
            size="xs"
          />
        </div>
        <div class="flex gap-1.5 items-center">
          <UDropdownMenu v-if="selectedRows.length > 0" :items="massActions">
            <UButton icon="i-heroicons-chevron-down" trailing color="neutral" size="xs"> Action </UButton>
          </UDropdownMenu>
        </div>
      </div>
      <UTable v-bind="options" by="__id" :data="values" :columns="columns" class="flex-1">
        <template #expanded="{ row }">
          <div class="p-4">
            <SComponent
              :id="id.length <= 0 ? `${row.index}` : `${id}[${row.index}]`"
              :model-value="row.original"
              :json-schema-path="
                jsonSchemaPath?.length <= 0 ? `properties.${row.index}` : `${jsonSchemaPath}[${row.index}]`
              "
              v-bind="items"
              :isRequired="false"
              class="mt-4"
              @update:model-value="(event: Record<string, unknown>) => onInput(event, row.index)"
              @submit="() => emit('submit')"
            />
          </div>
        </template>
      </UTable>
    </div>
    <Teleport to="#test-teleport">
      <div v-if="model.value" v-show="!hidden" class="overflow-auto bg-white" style="background-color: white">
        <SComponent
          :id="id.length <= 0 ? `${model.index}` : `${id}[0]`"
          :model-value="model.value"
          :json-schema-path="
            jsonSchemaPath?.length <= 0 ? `properties.${model.index}` : `${jsonSchemaPath}[${model.index}]`
          "
          v-bind="items"
          :isRequired="false"
          class="mt-4"
          :setHidden="setHiddenSelf"
          @update:model-value="(event: Record<string, unknown>) => (model.value = event)"
          @submit="() => emit('submit')"
        />
        <div class="mt-4 flex gap-2 justify-end">
          <UButton
            @click="
              () => {
                if (model.value) onInput(model.value, model.index)
                if (props.setHidden) props.setHidden(false)
                model.value = undefined
              }
            "
            >Save</UButton
          >
          <UButton
            variant="outline"
            @click="
              () => {
                if (props.setHidden) props.setHidden(false)
                model.value = undefined
              }
            "
            >Cancle</UButton
          >
        </div>
      </div>
    </Teleport>
  </div>
</template>
