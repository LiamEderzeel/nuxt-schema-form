<script lang="ts" setup>
import SComponent from './SComponent.vue'
import convertToYup from 'json-schema-yup-transformer'
import type { JsonSchema } from 'json-schema-library'
import { computed, ref } from 'vue'

const props = defineProps<{ schema: JsonSchema }>()

const value = defineModel<Record<string, unknown>>({ required: true })
const formRef = ref(null)

const emit = defineEmits(['submit'])

async function onSubmit(_event: unknown) {
  emit('submit', value.value)
}

const formValidationSchema = computed(() => convertToYup(props.schema))

const validateFields = async (fields: string[]) => {
  let allValid = true
  for (const field of fields) {
    if (!(await formRef.value?.validate(field, { silent: true }))) {
      allValid = false
    }
  }

  return allValid
}
</script>

<template>
  <div>
    <UForm
      ref="formRef"
      :state="value"
      :schema="formValidationSchema"
      autocomplete="on"
      @submit="onSubmit"
    >
      <SComponent
        v-model="value"
        v-bind="schema"
        :validate-fields="validateFields"
      />
      <slot />

      <slot name="submit">
        <UButton
          class="btn"
          type="submit"
        >
          Submit
        </UButton>
      </slot>
    </UForm>
  </div>
</template>
