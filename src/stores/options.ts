import { reactive } from 'vue'

const defaultOptions = {
  ignoreHeight: false,
  ignoreWidth: false,
  ignoreFonts: false,
  breakPages: true,
  debug: true,
  experimental: true,
  // className: 'docx',
  inWrapper: true,
  trimXmlDeclaration: true,
  ignoreLastRenderedPageBreak: true,
  renderHeaders: true,
  renderFooters: true,
  renderFootnotes: true,
  renderEndnotes: true,
  useBase64URL: false,
  useMathMLPolyfill: false,
  renderChanges: false,
  showChanges: false
}

export const options = reactive(defaultOptions)
