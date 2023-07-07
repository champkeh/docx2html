import { reactive } from 'vue'

const defaultOptions = {
  ignoreHeight: true,
  ignoreWidth: false,
  ignoreFonts: false,
  breakPages: true,
  debug: true,
  experimental: false,
  // className: 'docx',
  inWrapper: true,
  trimXmlDeclaration: true,
  ignoreLastRenderedPageBreak: true,
  renderHeaders: false,
  renderFooters: false,
  renderFootnotes: false,
  renderEndnotes: false,
  useBase64URL: true,
  useMathMLPolyfill: false,
  renderChanges: false,
  showChanges: false
}

export const options = reactive(defaultOptions)
