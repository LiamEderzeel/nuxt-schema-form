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
import type { FormError } from '@nuxt/ui'
import { formErrorsInjectionKey } from '#ui/composables/useFormField'

const props = defineProps<{
  id: string
  title?: string
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
const emit = defineEmits(['update:modelValue', 'submit'])
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

const formErrors = inject<Ref<FormError[]> | null>(formErrorsInjectionKey, null)

const hasStepError = (key: string) => {
  const stepPath = props.id ? `${props.id}.${key}` : key
  return !!formErrors?.value.some(error => error.name === stepPath || error.name?.startsWith(`${stepPath}.`))
}

const validatedSteps = ref(new Set<number>())

const steps = computed(() => {
  return children.value.map((x, i) => {
    const error = hasStepError(x[0])
    return {
      ...x[1],
      step: i,
      error,
      validated: validatedSteps.value.has(i) && !error
    }
  })
})

const validateStep = async (index: number) => {
  const [key, schema] = children.value[index]
  const valid = await props.validateFields(getChildFieldIds(key, schema))
  if (valid) {
    validatedSteps.value.add(index)
  } else {
    validatedSteps.value.delete(index)
  }
  return valid
}

// Moving forward, by the next button or by clicking a step, may not skip a step with errors
const goToStep = async (target: number | undefined) => {
  if (target === undefined) return

  for (let index = stage.value; index < target; index++) {
    if (!(await validateStep(index))) {
      stage.value = index
      return
    }
  }

  stage.value = target
}

const onNext = async () => {
  // Check every step before submitting, so each step shows whether it's valid, not just the last one
  if (stage.value === steps.value.length - 1) {
    for (const [, , index] of children.value) {
      await validateStep(index)
    }
    emit('submit')
    return
  }

  await goToStep(stage.value + 1)
}
</script>

<template>
  <div class="stepper-container mt-8">
    <!-- {{ formErrors }} -->
    <!-- {{ `${children[stage][0]}` }} -->
    <!-- {{ formErrors?.find((error) => error.path.includes(`${children[stage][0]}`)) }} -->
    <h1 v-if="props.title" class="mb-8 text-4xl leading-none tracking-tight">
      {{ props.title }}
    </h1>

    <div class="stepper">
      <StepperRoot :model-value="stage" class="flex gap-2 w-full" @update:model-value="goToStep">
        <StepperItem
          v-for="item in steps"
          :key="item.step"
          class="w-full flex justify-center gap-2 cursor-pointer group relative px-4"
          :data-error="item.error ? 'error' : undefined"
          :data-validated="item.validated ? 'true' : undefined"
          :step="item.step"
        >
          <StepperTrigger
            class="inline-flex border-2 items-center justify-center rounded-full w-10 h-10 shrink-0 transition-shadow border-accented text-muted group-data-[state=active]:text-highlighted group-data-[state=active]:ring-4 group-data-[state=active]:border-(--ui-text-muted) group-data-[state=active]:ring-(--ui-text-muted)/25 group-data-[validated=true]:border-primary! group-data-[validated=true]:text-primary! group-data-[validated=true]:ring-primary/30! group-data-[error=error]:text-error! group-data-[error=error]:border-error! group-data-[error=error]:ring-error/30! group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
            class="absolute text-center top-full left-0 w-full mt-2 text-muted group-data-[state=active]:text-highlighted group-data-[disabled]:opacity-50 group-data-[error=error]:text-error!"
          >
            <StepperTitle class="font-medium group-data-[state=active]:font-semibold">
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
          :is-required="required.includes(key)"
          @update:model-value="event => onInput(event, key)"
        />
      </section>
    </div>

    <slot name="submit">
      <UButton @click="onNext">
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
