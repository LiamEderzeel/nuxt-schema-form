<script lang="ts" setup>
// import { SComponent } from 'nuxt-schema-form'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from 'reka-ui'

export interface FormError<T extends string = string> {
  path: T
  message: string
}

const props = defineProps<{
  id: string
  title: string
  jsonSchemaPath: string
  validateFields: (fields: string[]) => Promise<boolean>
  properties: { [key: string]: PropertiesType }
  modelValue: Record<string, unknown>
  required: string[]
  isRequired: boolean
}>()

type PropertiesType = {
  title: string
  description: string
  type: string
  properties: PropertiesType
  icon: string
  // [key: string]: unknown
}
const emit = defineEmits(['update:modelValue'])
const onInput = (value: unknown, key: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const stage = ref(0)
const children = computed(() => Object.entries(props.properties).map((x, i) => [x[0], x[1], i] as const))

type ChildIdsKeys = {
  properties?: ChildIdsKeys
}
const getChildFieldIds = (id: string, schema: ChildIdsKeys) => {
  const children: string[] = []
  if (schema.properties == null) return children
  for (const [key, child] of Object.entries(schema.properties)) {
    if (child.properties != null) {
      const childIds = getChildFieldIds(key, child).map(x => `${id}.${x}`)
      children.push(...childIds)
    } else {
      children.push(`${id}.${key}`)
    }
  }

  return children
}

const formErrors = inject<Ref<FormError[]> | null>('form-errors', null)

const steps = computed(() =>
  children.value.map((x, i) => ({
    ...x[1],
    step: i,
    error: formErrors?.value.find(error => error.path.includes(`${x[0]}`))
  }))
)

const onNext = async () => {
  const child = children.value[stage.value]
  if (!(await props.validateFields(getChildFieldIds(child[0], child[1])))) return
  if (stage.value < steps.value.length) stage.value++
}
</script>

<template>
  <div class="stepper-container">
    <!-- {{ formErrors }} -->
    <!-- {{ `${children[stage][0]}` }} -->
    <!-- {{ formErrors?.find((error) => error.path.includes(`${children[stage][0]}`)) }} -->
    <h1 class="mb-8 text-4xl leading-none tracking-tight">
      {{ props.title }}
    </h1>

    <div class="stepper">
      <StepperRoot v-model="stage" class="flex gap-2 w-full">
        <StepperItem
          v-for="item in steps"
          :key="item.step"
          class="w-full flex justify-center gap-2 cursor-pointer group relative px-4"
          :data-error="item.error ? 'error' : undefined"
          :step="item.step"
        >
          <StepperTrigger
            class="inline-flex border-2 shadow-sm items-center text-primary-500 border-primary-500 group-data-[error=error]:text-red-500 group-data-[error=error]:border-red-500 group-data-[state=inactive]:border-gray-200 group-data-[state=inactive]:text-stone-700 group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed justify-center rounded-full w-10 h-10 shrink-0 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          >
            <StepperIndicator class="flex">
              <UIcon
                :name="item.icon ?? 'lucide:check'"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
              />
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="item.step !== steps[steps.length - 1].step"
            class="absolute block top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full bg-stone-300/50 shrink-0"
          />

          <div
            class="absolute text-center top-full left-0 w-full mt-2 text-stone-700 dark:text-white group-data-[disabled]:opacity-50"
          >
            <StepperTitle class="font-medium">
              {{ item.title }}
            </StepperTitle>
            <StepperDescription class="hidden sm:block text-xs">
              {{ item.description }}
            </StepperDescription>
          </div>
        </StepperItem>
      </StepperRoot>
    </div>
    <div class="stepper-content">
      <section v-for="[key, options, index] of children" v-show="stage == index" :key="key">
        <SComponent
          :id="id.length <= 0 ? `${key}` : `${id}.${key}`"
          :key="key"
          :model-value="modelValue[key]"
          :json-schema-path="jsonSchemaPath?.length <= 0 ? `properties.${key}` : `${jsonSchemaPath}.properties.${key}`"
          v-bind="options"
          :isRequired="required.includes(key)"
          @update:model-value="event => onInput(event, key)"
        />
      </section>
    </div>

    <slot name="submit">
      <UButton :type="stage == steps.length - 1 ? 'submit' : undefined" @click="onNext">
        {{ stage != steps.length - 1 ? 'Next' : 'Submit' }}
      </UButton>
    </slot>
  </div>
</template>

<style lang="css">
.stepper {
  width: 100%;
  height: 6em;
  padding-bottom: 1em;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
}

.stepper-container {
  padding-bottom: 1em;
}

.stepper-content {
  padding-bottom: 1em;
}
</style>
