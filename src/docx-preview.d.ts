declare interface Options {
  inWrapper: boolean
  ignoreWidth: boolean
  ignoreHeight: boolean
  ignoreFonts: boolean
  breakPages: boolean
  debug: boolean
  experimental: boolean
  className: string
  trimXmlDeclaration: boolean
  renderHeaders: boolean
  renderFooters: boolean
  renderFootnotes: boolean
  renderEndnotes: boolean
  ignoreLastRenderedPageBreak: boolean
  useBase64URL: boolean
  useMathMLPolyfill: boolean
  renderChanges: boolean
}

declare interface DocxPreview {
  renderAsync: (
    data: Blob | any,
    bodyContainer: HTMLElement,
    styleContainer?: HTMLElement | null,
    options?: Partial<Options>
  ) => Promise<any>
}

declare interface Window {
  docx: DocxPreview
}
