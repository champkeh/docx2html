<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useDocStore } from '@/stores/doc'
import { options } from '@/stores/options'
import type { IDocItem } from '@/stores/types'
import HtmlRenderer from '@/components/HtmlRenderer.vue'

const docStore = useDocStore()

watch([() => options, () => docStore.docs], () => render(), { deep: true })

const loading = ref(false)
async function render() {
  loading.value = true
  const docs = docStore.docs
  for (const doc of docs) {
    doc.html = await renderFile(doc)
  }
  loading.value = false
}

const _tmpContainerRef = ref<HTMLElement | null>(null)

function renderFile(doc: IDocItem) {
  return window.docx
    .renderAsync(doc.file, _tmpContainerRef.value!, null, {
      ...options
    })
    .then(() => {
      return _tmpContainerRef.value!.innerHTML
    })
}
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column align-items-center overflow-auto">
    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <HtmlRenderer v-for="doc in docStore.renderedDocs" :key="doc.id" :html="doc.html!" />
  </div>
  <div class="visually-hidden" ref="_tmpContainerRef"></div>
</template>
