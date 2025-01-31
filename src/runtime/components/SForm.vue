<script lang="ts" setup>
import SComponent from './SComponent.vue'
import convertToYup from 'json-schema-yup-transformer'
import type { JsonSchema } from 'json-schema-library'
import { computed } from 'vue'

const props = defineProps<{ schema: JsonSchema }>()

const value = defineModel<Record<string, unknown>>({ required: true })

const emit = defineEmits(['submit'])

async function onSubmit(_event: unknown) {
  emit('submit', value.value)
}

const formValidationSchema = computed(() => convertToYup(props.schema))
</script>

<template>
  <UForm
    :state="value"
    :schema="formValidationSchema"
    autocomplete="on"
    @submit="onSubmit"
  >
    <SComponent
      v-for="(properties, id) of props.schema.properties"
      :id="id.toString()"
      :key="id"
      v-model="value[id]"
      :path="`.${id}`"
      :properties="properties"
      :json-schema-path="`properties.${id}`"
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
</template>
