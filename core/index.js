import { Ref, effectWatch, reactive, ref } from './reactivity/index.js'
import { h } from './h.js'
import { diff, mountElement } from './renderer/index.js'

// 仿照 vue3
export function createApp(rootComponent) {
  return {
    mount(rootContainerQuery) {
      const rootContainerElement = document.querySelector(rootContainerQuery)
      const context = rootComponent.setup()
      let isMounted = false
      let prevAppVnode

      effectWatch(() => {
        // 下面的 appVDom 是 h 函数的返回值，即 vnode
        const appVnode = rootComponent.render(context)
        if (!isMounted) {
          mountElement(appVnode, rootContainerElement)
          isMounted = true
        }
        else { diff(prevAppVnode, appVnode) }

        prevAppVnode = appVnode
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
  diff,
  mountElement,
}
