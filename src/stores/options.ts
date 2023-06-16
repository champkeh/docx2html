import { reactive } from 'vue'

const defaultOptions = {
  // enables rendering of wrapper around document content
  inWrapper: true,

  // disables rendering width of page
  ignoreWidth: false,

  // disables rendering height of page
  ignoreHeight: false,

  // disables fonts rendering
  ignoreFonts: false,

  // enables page breaking on page breaks
  breakPages: true,

  // disables page breaking on lastRenderedPageBreak elements
  ignoreLastRenderedPageBreak: true,

  // enables experimental features (tab stops calculation)
  experimental: false,

  // if true, xml declaration will be removed from xml documents before parsing
  trimXmlDeclaration: true,

  // if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
  useBase64URL: false,

  // includes MathML polyfills for chrome, edge, etc.
  useMathMLPolyfill: false,

  // enables experimental rendering of document changes (inserions/deletions)
  showChanges: false,

  // enables additional logging
  debug: false
}

export const options = reactive(defaultOptions)
