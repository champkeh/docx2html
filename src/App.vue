<script lang="ts" setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <iframe id="iframe" frameborder="0"></iframe>
</template>

<style>
#iframe {
  flex: 1;
  width: 100%;
}
</style>
