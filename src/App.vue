<script lang="ts" setup>
import Header from './components/Header.vue'
import DocList from "@/components/DocList.vue";
</script>

<template>
  <Header/>
  <div class="flex-grow-1 d-flex">
    <DocList/>
    <iframe class="flex-grow-1" id="iframe" frameborder="0"></iframe>
  </div>
</template>
