// diff 算法
// n1: old, n2: new
export function diff(n1, n2) {
  const oldDom = n1.realDomElement
  n2.realDomElement = oldDom
  // 改变分为三个部分：tag, props, children

  // tag
  if (n1.tag !== n2.tag) { oldDom.replaceWith(document.createElement(n2.tag)) }
  else {
    // props: 增删改
    const { props: oldProps } = n1
    const { props: newProps } = n2
    // 增, 改
    if (newProps && oldProps) {
      for (const key in newProps) {
        const oldVal = oldProps[key]
        const newVal = newProps[key]

        if (oldVal !== newVal)
          oldDom.setAttribute(key, newVal)
      }
    }
    // 删
    if (oldProps) {
      for (const key in oldProps) {
        if (!newProps[key])
          oldDom.removeAttribute(key)
      }
    }

    // children -> 暂时用暴力解法
    const { children: oldChildren } = n1
    const { children: newChildren } = n2

    if (Array.isArray(newChildren)) {
      if (Array.isArray(oldChildren)) {
        // old: array, new: array
        const commonLength = Math.min(oldChildren.length, newChildren.length)
        for (let i = 0; i < commonLength; i++) {
          const oldVnode = oldChildren[i]
          const newVnode = newChildren[i]
          diff(oldVnode, newVnode)
        }

        if (newChildren.length > commonLength) {
          // 创建新节点
          for (let i = commonLength; i < newChildren.length; i++) {
            const newVnode = newChildren[i]
            mountElement(newVnode, oldDom)
          }
        }

        if (oldChildren.length > commonLength) {
          // 删除冗余节点
          for (let i = commonLength; i < oldChildren.length; i++) {
            const oldVnode = oldChildren[i]
            oldVnode.realDomElement.remove()
          }
        }
      }
      else {
        // old: string, new: array
        oldDom.innerText = ''
        mountElement(n2, oldDom.parent)
      }
    }
    else {
      if (Array.isArray(oldChildren)) {
        // old: array, new: string
        oldDom.innerHTML = `${newChildren}`
      }
      else {
        // old: string, new: string
        if (newChildren !== oldChildren)
          oldDom.innerText = newChildren
      }
    }
  }
}

// VDom -> real Dom
export function mountElement(vnode, container) {
  // vnode 有三个部分：tag, props, children
  const { tag, props, children } = vnode

  // tag
  const nodeElement = document.createElement(tag)
  vnode.realDomElement = nodeElement

  // props
  if (props) {
    for (const key in props) {
      const value = props[key]
      nodeElement.setAttribute(key, value)
    }
  }
  // children
  // 1. 可以接收一个 string，即文本节点
  // 2. 可以接收一个数组
  if (Array.isArray(children)) {
    children.forEach((vnode) => {
      mountElement(vnode, nodeElement)
    })
  }
  else {
    const textNode = document.createTextNode(children)
    nodeElement.append(textNode)
  }

  // 将 vnode 转化后的 real node 插入到容器 container 中
  container.append(nodeElement)
}
