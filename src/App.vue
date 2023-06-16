<script setup>
import Header from "./components/Header.vue";
import {ref} from 'vue'
import {downloadBlob} from "./utils/file.js";
import Renderer from "./components/Renderer.vue";

const _containerRef = ref()
const _html = ref()

function onRender(file, options) {
  window.docx.renderAsync(file, _containerRef.value, null, options).then(() => {
    let html = _containerRef.value.innerHTML

    // 对渲染出的 html 进行自定义修改
    html = `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
${html}`
    _html.value = html
  })
}

function onExport(filename = 'index.html') {
  const blob = new Blob([_html.value], {type: 'text/html'})
  downloadBlob(blob, filename)
}

</script>

<template>
  <Header @render="onRender" @export="onExport" />
  <div class="flex-grow-1 d-flex flex-row overflow-auto">
    <Renderer v-if="_html" :html="_html" />
  </div>
  <div class="visually-hidden" ref="_containerRef"></div>
</template>
