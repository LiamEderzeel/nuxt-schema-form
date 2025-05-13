<script lang="ts" setup>
import SComponent from './Component.vue'
import convertToYup from 'json-schema-yup-transformer'
import type { JsonSchema } from 'json-schema-library'
import { computed, ref } from 'vue'
import type { Config } from 'json-schema-yup-transformer'
import type { CustomValidation } from '#schema-form-types'

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

  if (props?.options?.customValidation) {
    for (const { field, message, validate } of props.options.customValidation) {
      if (!fields.includes(field)) continue
      if (!validate(value.value)) {
        const errors = [{ name: field, message }]
        formRef.value.setErrors(errors, field)
        allValid = false
      }
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
</script>

<template>
  <div>
    <!-- {{ formRef ? formRef.errors : undefined }} -->
    <UForm ref="formRef" :state="value" :schema="formValidationSchema" autocomplete="on" @submit="onSubmit">
      <SComponent v-model="value" v-bind="schema" :validate-fields="validateFields" @submit="submit"
        :isRequired="true" />
      <slot />

      <slot name="submit">
        <UButton class="btn mt-4" type="submit"> Submit </UButton>
      </slot>
    </UForm>
  </div>
</template>
