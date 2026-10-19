<script lang="ts" setup>
import SComponent from './Component.vue'
import convertToYup from '@ederzeel/json-schema-yup-transformer'
import type { JsonSchema } from 'json-schema-library'
import { computed, ref } from 'vue'
import type { Config } from '@ederzeel/json-schema-yup-transformer'
import type { CustomValidation } from '#schema-form-types'
import { getCustomValidationErrors } from '../utils/validation'

const props = defineProps<{
  schema: JsonSchema
  options?: { customValidation?: CustomValidation[]; jsonSchemaYupTransfromer?: Config }
}>()

const value = defineModel<Record<string, unknown>>({ required: true })
const formRef = ref()

const emit = defineEmits(['submit'])

async function onSubmit(_event: unknown) {
  emit('submit', value.value)
}

const formValidationSchema = computed(() => {
  return convertToYup(props.schema, props?.options?.jsonSchemaYupTransfromer ?? {})
})

// UForm runs this alongside the schema, so custom checks also block submit and show live errors
const validateCustom = (state: Record<string, unknown>) =>
  getCustomValidationErrors(props.options?.customValidation, state)

const validateFields = async (fields: string[]) => {
  let allValid = true
  for (const field of fields) {
    try {
      if (!(await formRef.value.validate({ name: field, silent: true }))) {
        allValid = false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  }

  return allValid
}

const submit = () => {
  formRef.value.submit()
}

defineExpose({
  submit
})
const isHidden = ref(false)
const setHidden = (value: boolean) => (isHidden.value = value)
</script>

<template>
  <div>
    <!-- {{ formRef ? formRef.errors : undefined }} -->
    <div id="test-teleport" class="top-0 w-full h-full">
      <UForm
        class="overflow-auto"
        ref="formRef"
        :state="value"
        :schema="formValidationSchema"
        :validate="validateCustom"
        autocomplete="on"
        @submit="onSubmit"
        v-show="!isHidden"
      >
        <SComponent
          v-model="value"
          v-bind="schema"
          :validate-fields="validateFields"
          :setHidden="setHidden"
          @submit="submit"
          :isRequired="true"
        />
        <slot />

        <div class="mt-4 flex gap-2 justify-end">
          <slot name="submit">
            <UButton class="btn mt-4" type="submit"> Submit </UButton>
          </slot>
        </div>
      </UForm>
    </div>
  </div>
</template>
