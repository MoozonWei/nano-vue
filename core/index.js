import { Ref, effectWatch, reactive, ref } from './reactivity/index.js'
// 仿照 vue3
export function createApp(rootComponent) {
  return {
    mount(rootContainerQuery) {
      const rootContainerElement = document.querySelector(rootContainerQuery)
      const context = rootComponent.setup()
      effectWatch(() => {
        rootContainerElement.innerText = ''
        const appElement = rootComponent.render(context)
        rootContainerElement.append(appElement)
      })
    },
  }
}

export {
  Ref,
  effectWatch,
  reactive,
  ref,
}
