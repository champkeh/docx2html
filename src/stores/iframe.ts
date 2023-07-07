import {getType} from "@/utils";

export class IFrame {
    // 类的所有实例
    private static instances: Map<string, IFrame> = new Map()

    private readonly iframeEl?: HTMLIFrameElement


    /**
     * 私有构造器，确保不会被外部调用
     * @param iframe
     * @private
     */
    private constructor(iframe: HTMLIFrameElement) {
        this.iframeEl = iframe

        this.initialize()
    }

    /**
     * 查询类实例，确保每个实例只会初始化一次
     * @param id
     * @param reset
     */
    static query(id: string, reset: boolean = false): IFrame {
        const instance = this.instances.get(id)
        if (instance) {
            if (reset) {
                instance.initialize()
            }
            return instance
        }

        const iframe = document.querySelector(`iframe#${id}`) as HTMLIFrameElement
        if (!iframe) {
            throw new Error(`当前页面不存在id为"${id}"的iframe元素`)
        }
        const newInstance = new IFrame(iframe)
        this.instances.set(id, newInstance)
        return newInstance
    }

    static destroy(id: string) {
        this.instances.delete(id)
    }

    private get head() {
        return this.iframeEl!.contentDocument!.head
    }

    private get body() {
        return this.iframeEl!.contentDocument!.body
    }

    initialize() {
        this.reset()
    }

    reset() {
        this.head.innerHTML = ''
        this.body.innerHTML = ''
    }


    /**
     * 对应文档的媒体查询样式
     * @param className 文档的className
     * @param minWidth 配置媒体查询的 min-width
     */
    mediaQueryStyle(className: string, minWidth: string) {
        return `
@media screen and (max-width: ${minWidth}) {
    .${className}-wrapper {
        padding: 0 !important;
        background: transparent !important;
    }
    .${className} {
        width: 100% !important;
        padding: 30px !important;
        box-shadow: none !important;
    }
}
`
    }

    /**
     * 加入媒体查询样式
     * @param className
     * @param minWidth
     */
    appendMediaQueryStyle(className: string, minWidth = '860px') {
        const styleContainer = document.createElement('div')
        styleContainer.appendChild(document.createComment('响应式布局样式'))
        const style = document.createElement('style')
        style.innerHTML = this.mediaQueryStyle(className, minWidth)
        styleContainer.appendChild(style)

        this.append(styleContainer.childNodes, 'head')
    }

    appendElemsToHead(elems: ChildNode[]) {
        elems.forEach(elem => this.appendElemToHead(elem))
    }

    appendElemToHead(elem: ChildNode) {
        this.head.appendChild(elem)
    }

    appendElemsToBody(elems: ChildNode[]) {
        elems.forEach(elem => this.appendElemToBody(elem))
    }

    appendElemToBody(elem: ChildNode) {
        this.body.appendChild(elem)
    }

    append(elems: ChildNode | NodeListOf<ChildNode>, to: 'head' | 'body' = 'body') {
        const nodes: ChildNode[] = []
        if (isNodeList(elems)) {
            elems.forEach(elem => nodes.push(elem))
        } else {
            nodes.push(elems)
        }
        switch (to) {
            case 'head':
                this.appendElemsToHead(nodes)
                break
            case 'body':
                this.appendElemsToBody(nodes)
                break
        }
    }

    appendStyleText(css: string) {
        const style = document.createElement('style')
        style.innerHTML = css
        this.append(style, 'head')
    }



    /**
     * 输出 iframe 的 innerHTML
     * @param {string} title 文档的title
     * @return {string}
     */
    output(title = '') {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover"/>
    <title>${title}</title>
    ${this.head.innerHTML}
</head>
<body>
${this.body.innerHTML}
</body>
</html>
`
    }
}

function isNodeList(node: ChildNode | NodeListOf<ChildNode>): node is NodeListOf<ChildNode> {
    return getType(node) === 'NodeList'
}
