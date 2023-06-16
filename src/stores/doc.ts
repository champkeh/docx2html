import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { downloadBlob } from '@/utils/file'
import type { IDocItem } from './types'

export const useDocStore = defineStore('doc', () => {
  const docs = reactive<IDocItem[]>([])

  /**
   * 导出 html 文件
   */
  function exportHtml(doc: IDocItem) {
    if (!doc.html) return

    const blob = new Blob([doc.html], { type: 'text/html' })
    downloadBlob(blob, doc.file.name.replace(/\.docx?$/, '.html'))
  }

  function exportAll() {
    docs.forEach((doc) => exportHtml(doc))
  }

  return {
    docs,
    exportHtml,
    exportAll
  }
})
