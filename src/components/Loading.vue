<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <div
    v-if="show"
    class="position-fixed start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-secondary bg-opacity-10"
  >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
