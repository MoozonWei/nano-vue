/* eslint-disable no-console */
import { createApp, effectWatch, h, reactive, ref } from './index.js'

// ref
console.log('--- ref ---')
const a = ref(0)
let b
effectWatch(() => {
  b = a.value + 10
  console.log(b)
})
a.value = 100

// reactive
console.log('--- reactive ---')
const me = reactive({
  name: 'moozon',
  age: 24,
})
let age
effectWatch(() => {
  age = me.age * 2
  console.log(age)
})
me.age++

// vue3
const App = {
  // 使用虚拟节点渲染函数 h 构建 view
  render(context) {
    return h(
      'div',
      {
        id: 'vue-app',
        class: 'base-class',
      },
      [
        h(
          'p',
          {
            class: 'my-p',
          },
          'this is a paragraph 1',
        ),
        h(
          'span',
          {
            class: 'my-p',
          },
          'this is a span 1',
        ),
      ],
    )
  },
  setup() {
    // 创建响应式数据
    const state = reactive({
      count: 0,
    })
    const data = {
      state,
    }
    window.data = data
    return data
  },
}

createApp(App).mount('#app')
