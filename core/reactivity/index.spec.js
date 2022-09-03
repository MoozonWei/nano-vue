/* eslint-disable no-console */
import { expect, test } from 'vitest'
import { effectWatch, reactive, ref } from './index.js'

test('ref', () => {
  const a = ref(10)
  let b
  effectWatch(() => {
    b = a.value + 10
    console.log(b)
  })
  expect(b).toBe(20)

  a.value = 100
  expect(b).toBe(110)

  a.value = 200
  expect(b).toBe(210)
})

test('reactive', () => {
  const pEle = {
    name: 'p',
    children: 'hello this is a paragraph',
  }
  const divEle = reactive({
    name: 'div',
    children: [
      pEle,
    ],
  })

  let divEleName
  effectWatch(() => {
    divEleName = divEle.name
    console.log(`divEle set name to: ${divEleName}`)
  })

  divEle.name = 'section'
  expect(divEleName).toBe('section')
})
