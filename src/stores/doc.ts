import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { htmlTransformer, mergeHtml, uploadFile } from '@/utils/file'
import type { IDocItem } from './types'
import type { Ref } from 'vue'

export const useDocStore = defineStore('DocStore', () => {
  const docs = reactive<IDocItem[]>([])

  /**
   * 文档对应的 html 数组
   */
  const htmls: Ref<string[]> = computed(() =>
    docs.filter((doc) => !!doc.html).map((doc) => htmlTransformer(doc.html!, doc))
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
    htmls,
    size,
    preview
  }
})
