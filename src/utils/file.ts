import * as qiniu from 'qiniu-js'

/**
 * 下载文件
 * @param {Blob} blob 文件对象
 * @param {string} name 文件名
 */
export function downloadBlob(blob: Blob, name = 'file.txt') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob)

  // Create a link element
  const link = document.createElement('a')

  // Set link's href to point to the Blob URL
  link.href = blobUrl
  link.download = name

  // Append link to the body
  document.body.appendChild(link)

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  // Remove link from body
  document.body.removeChild(link)
}

/**
 * 下载 html 内容
 * @param html html内容
 * @param filename 文件名
 */
export function downloadHtml(html: string, filename = 'index.html') {
  const blob = new Blob([html], { type: 'text/html' })
  downloadBlob(blob, filename)
}


/**
 * 上传文件到七牛云
 * @param file
 * @param token
 */
export function uploadFile(file: File, token: string): Promise<{ key: string; hash: string }> {
  return new Promise((resolve, reject) => {
    const observable = qiniu.upload(file, null, token)
    observable.subscribe({
      error(err) {
        reject(err)
      },
      complete(res) {
        resolve(res)
      }
    })
  })
}
