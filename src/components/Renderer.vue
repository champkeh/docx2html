<script setup>
defineProps({
  html: {
    type: String
  }
})
</script>

<template>
  <iframe class="flex-grow-1" frameborder="0" :srcdoc="html"></iframe>
</template>
