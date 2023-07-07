<script lang="ts" setup>
import {v4 as uuid} from 'uuid'
import {useDocStore} from '@/stores/doc'
import {options} from '@/stores/options'
import {ref} from 'vue'
import {renderDoc} from "@/utils";
import {IFrame} from "@/stores/iframe";
import {downloadHtml} from "@/utils/file";

const docStore = useDocStore()

/**
 * 添加文档
 */
function onFileChange(e: any) {
  const files: FileList = e.target.files || e.dataTransfer.files
  docStore.docs.push(
      ...Array.from(files).map((file) => {
        const id = uuid().replace(/[^a-zA-Z0-9]/g, '')
        return {
          id: id,
          file,
          className: 'docx-' + id
        }
      })
  )
}

/**
 * 重新渲染
 */
async function reload() {
  const iframe = IFrame.query('iframe', true)

  for (let i = 0, l = docStore.docs.length; i < l; i++) {
    const doc = docStore.docs[i]
    const className = `docx-${i}`
    const [body, style] = await renderDoc(doc, className)

    // 样式
    iframe.appendComment(doc.file.name, 'head')
    iframe.appendMediaQueryStyle(className)
    iframe.append(style.childNodes, 'head')

    // 文档
    iframe.appendComment(doc.file.name, 'body')
    iframe.append(body.childNodes, 'body')
  }
}

/**
 * 导出成 html 文件
 */
function exportToHtml() {
  const iframe = IFrame.query('iframe')
  // 取第一个文档的title
  const title = docStore.docs[0].file.name
  downloadHtml(iframe.output(title), 'index.html')
}

const loading = ref(false)
const url = ref('')
const modalIsOpen = ref(false)

/**
 * 手机预览
 */
function preview() {
  loading.value = true
  docStore
      .preview()
      .then((res) => {
        url.value = import.meta.env.VITE_DOMAIN + res.key
        modalIsOpen.value = true
      })
      .catch((e) => {
        alert(e.message)
      })
      .finally(() => {
        loading.value = false
      })
}
</script>

<template>
  <div class="hstack p-2 gap-2 bg-light">
    <input
        type="file"
        @change="onFileChange"
        class="form-control"
        accept=".docx"
        multiple
        style="width: 50ch"
    />
    <div class="dropdown">
      <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
      >
        Options
      </button>
      <ul class="dropdown-menu">
        <li v-for="(_, k) of options" :key="k">
          <div class="dropdown-item">
            <div class="form-check">
              <label class="form-check-name">
                <input type="checkbox" v-model="options[k]" class="form-check-input"/>
                {{ k }}
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex-grow-1"></div>
    <button
        class="btn btn-success px-4"
        :disabled="docStore.docs.length === 0"
        @click="reload"
    >
      Reload
    </button>
    <button
        class="btn btn-success px-4"
        :disabled="docStore.docs.length === 0"
        @click="exportToHtml"
    >
      Export
    </button>
    <button
        class="btn btn-secondary px-4"
        :disabled="docStore.docs.length === 0 || loading"
        @click="preview"
    >
      <span
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
      ></span>
      Preview
    </button>
  </div>
</template>
