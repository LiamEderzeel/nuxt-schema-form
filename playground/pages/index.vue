<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1200px] p-10">
      <div class="pb-10 flex place-content-between">
        <h1>Demo</h1>
        <ColorMode />
      </div>
      <Editor :schema="schema" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorMode from '@/components/ColorMode.vue'
import formSchema from '@/assets/schema.json'

const schema = ref(formSchema)

const onSubmit = (value: unknown) => {
  console.log(value)
}
</script>
