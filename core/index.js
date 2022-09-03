import { Ref, effectWatch, reactive, ref } from './reactivity/index.js'
import { h } from './h.js'
import { mountElement } from './renderer/index.js'
// 仿照 vue3
export function createApp(rootComponent) {
  return {
    mount(rootContainerQuery) {
      const rootContainerElement = document.querySelector(rootContainerQuery)
      const context = rootComponent.setup()
      effectWatch(() => {
        rootContainerElement.innerText = ''
        // 下面的 appVDom 是 h 函数的返回值，即 vnode
        const appVnode = rootComponent.render(context)
        // eslint-disable-next-line no-console
        console.log(appVnode)
        mountElement(appVnode, rootContainerElement)
      })
    },
  }
}

export {
  Ref,
  effectWatch,
  reactive,
  ref,
  h,
  mountElement,
}
