<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useDocStore } from '@/stores/doc'
import { options } from '@/stores/options'
import type { IDocItem } from '@/stores/types'

const docStore = useDocStore()

watch(
  () => options,
  () => {
    render()
  },
  {
    deep: true
  }
)
watch(
  () => docStore.docs,
  () => {
    render()
  },
  { deep: true }
)

async function render() {
  const docs = docStore.docs
  for (const doc of docs) {
    doc.html = await renderFile(doc)
  }
}

const _tmpContainerRef = ref<HTMLElement | null>(null)

function renderFile(doc: IDocItem) {
  return window.docx.renderAsync(doc.file, _tmpContainerRef.value!, null, options).then(() => {
    return _tmpContainerRef.value!.innerHTML
  })
}
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column overflow-auto">
    <iframe
      v-for="doc in docStore.docs"
      :key="doc.id"
      class="flex-grow-1"
      frameborder="0"
      :srcdoc="doc.html"
    ></iframe>
  </div>
  <div class="visually-hidden" ref="_tmpContainerRef"></div>
</template>
