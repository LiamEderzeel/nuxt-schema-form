<script lang="ts" setup>
const value = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="value" type="text" />
</template>
