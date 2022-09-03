/* eslint-disable no-console */
import { createApp } from './core/index.js'
import { effectWatch, reactive, ref } from './index.js'

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
  // 构建 view
  render(context) {
    // 创建视图
    const div = document.createElement('div')
    div.innerText = context.state.count

    return div
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
