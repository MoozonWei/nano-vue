// VDom -> real Dom
export function mountElement(vnode, container) {
  // vnode 有三个部分：tag, props, children
  const { tag, props, children } = vnode

  // tag
  const nodeElement = document.createElement(tag)

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
