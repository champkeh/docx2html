import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { downloadHtml, htmlTransformer, mergeHtml, uploadFile } from '@/utils/file'
import type { IDocItem } from './types'
import type { Ref } from 'vue'

export const useDocStore = defineStore('doc', () => {
  const docs = reactive<IDocItem[]>([])

  /**
   * 合并导出
   */
  function mergeExport() {
    const html = mergeHtml(htmls.value, 'ShadowDOM合并导出')
    downloadHtml(html)
  }

  /**
   * 文档对应的 html 数组
   */
  const htmls: Ref<string[]> = computed(() =>
    docs.filter((doc) => !!doc.html).map((doc) => htmlTransformer(doc.html!))
  )

  /**
   * 文档大小
   */
  const size = computed(() => {
    if (htmls.value.length === 0) return 'null'
    const html = mergeHtml(htmls.value, 'ShadowDOM合并导出')

    const bytes = html.length
    if (bytes < 10 ** 3) {
      return `${bytes}字节`
    } else if (bytes < 10 ** 6) {
      return `${Math.floor(bytes / 10 ** 3)}kb`
    } else if (bytes < 10 ** 9) {
      return `${(bytes / 10 ** 6).toFixed(1)}Mb`
    } else {
      return `${(bytes / 10 ** 9).toFixed(1)}Gb`
    }
  })

  /**
   * 已完成选择的 docs
   */
  const renderedDocs: Ref<IDocItem[]> = computed(() => docs.filter((doc) => !!doc.html))

  /**
   * 预览，上传到七牛云
   */
  function preview() {
    const token = import.meta.env.VITE_QINIU_TOKEN
    const html = mergeHtml(htmls.value, 'ShadowDOM合并导出')
    const file = new File([html], 'ShadowDOM合并导出.html', { type: 'text/html' })
    return uploadFile(file, token)
  }

  return {
    docs,
    renderedDocs,
    mergeExport,
    htmls,
    size,
    preview
  }
})
