/* eslint-disable no-console */
import { effectWatch, reactive, ref } from './index.js'

console.log('--- ref ---')
const a = ref(0)
let b
effectWatch(() => {
  b = a.value + 10
  console.log(b)
})
a.value = 100

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
