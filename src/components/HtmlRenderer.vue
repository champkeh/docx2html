<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
  html: string
}>()

const elRef = ref<HTMLElement>()
onMounted(() => {
  const shadow = elRef.value?.attachShadow({ mode: 'open' })
  shadow.innerHTML = props.html
})
</script>

<template>
  <article class="w-100" ref="elRef"></article>
</template>
