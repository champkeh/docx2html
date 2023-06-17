import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { downloadHtml, htmlTransformer, mergeHtml } from '@/utils/file'
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
   * 已完成选择的 docs
   */
  const renderedDocs: Ref<IDocItem[]> = computed(() => docs.filter((doc) => !!doc.html))

  return {
    docs,
    renderedDocs,
    mergeExport,
    htmls
  }
})
