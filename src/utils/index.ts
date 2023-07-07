import {IDocItem} from "@/stores/types";
import {options} from "@/stores/options";

export function sleep(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

/**
 * 渲染 docx 文档
 * @param doc
 * @param hintCls
 */
export function renderDoc(doc: IDocItem, hintCls?: string) {
    const bodyContainer = document.createElement('div')
    const styleContainer = document.createElement('div')
    return window.docx
        .renderAsync(doc.file, bodyContainer, styleContainer, {
            ...options,
            className: hintCls || doc.className
        })
        .then(async () => {
            // 这里最好等待一段时间，让文档中的资源加载完成
            await sleep(100)

            return [bodyContainer, styleContainer]
        })
}

export function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}
