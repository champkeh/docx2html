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
  async function preview() {
    // 调用接口获取token
    const {data: token} = await fetch("https://apix.deno.dev/api/qiniu/token").then(resp => resp.json())
    const iframe = IFrame.query('iframe')
    // 取第一个文档的title
    const title = docs[0].file.name
    const html = iframe.output(title)
    const file = new File([html], title, { type: 'text/html' })

    return uploadFile(file, token)
  }

  return {
    docs,
    preview
  }
})
