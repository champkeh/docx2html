import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { uploadFile } from '@/utils/file'
import {IFrame} from "@/stores/iframe"
import type { IDocItem } from './types'

export const useDocStore = defineStore('DocStore', () => {
  const docs = reactive<IDocItem[]>([])


  /**
   * 预览，上传到七牛云
   */
  function preview() {
    // todo: 调用接口获取token
    const token = import.meta.env.VITE_QINIU_TOKEN

    const iframe = IFrame.query('iframe')
    // 取第一个文档的title
    const title = docStore.docs[0].file.name
    const html = iframe.output(title)

    const file = new File([html], title, { type: 'text/html' })
    return uploadFile(file, token)
  }

  return {
    docs,
    preview
  }
})
