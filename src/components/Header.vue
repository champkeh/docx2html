<script setup>
import {reactive, watch, ref} from "vue";

const emit = defineEmits(['render', 'export'])
let _file = ref()

function onFileChange(e) {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  let [file] = files
  _file.value = file

  emit('render', _file.value, options)
}

const defaultOptions = {
  // enables rendering of wrapper around document content
  inWrapper: true,

  // disables rendering width of page
  ignoreWidth: false,

  // disables rendering height of page
  ignoreHeight: false,

  // disables fonts rendering
  ignoreFonts: false,

  // enables page breaking on page breaks
  breakPages: true,

  // disables page breaking on lastRenderedPageBreak elements
  ignoreLastRenderedPageBreak: true,

  // enables experimental features (tab stops calculation)
  experimental: false,

  // if true, xml declaration will be removed from xml documents before parsing
  trimXmlDeclaration: true,

  // if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
  useBase64URL: false,

  // includes MathML polyfills for chrome, edge, etc.
  useMathMLPolyfill: false,

  // enables experimental rendering of document changes (inserions/deletions)
  showChanges: false,

  // enables additional logging
  debug: false,
}

const options = reactive(defaultOptions)

watch(options, (newOptions) => {
  if (_file.value) {
    emit('render', _file.value, newOptions)
  }
})

function exportFile() {
  const filename = _file.value.name.replace(/\.docx?$/i, '.html')
  emit('export', filename)
}
</script>

<template>
  <div class="hstack p-2 gap-2 bg-light">
    <input type="file" @change="onFileChange" class="form-control" accept=".docx" style="width: 50ch">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Options
      </button>
      <ul class="dropdown-menu">
        <li v-for="(_, k) of options" :key="k">
          <div class="dropdown-item">
            <div class="form-check">
              <label class="form-check-name">
                <input type="checkbox" v-model="options[k]" class="form-check-input"> {{ k }}
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex-grow-1"></div>
    <button class="btn btn-success px-4" :disabled="!_file" @click="exportFile">Export</button>
  </div>
</template>
