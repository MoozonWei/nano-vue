// --------------- ref -------------------
// 设置中间变量
let currentEffect

export class Ref {
  constructor(val) {
    this.effects = new Set()
    this._val = val
  }

  get value() {
    this.depend()
    return this._val
  }

  set value(newVal) {
    this._val = newVal
    this.notice()
  }

  // 收集依赖
  depend() {
    if (currentEffect)
      this.effects.add(currentEffect)
  }

  // 触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect()
    })
  }
}

// 收集依赖
export function effectWatch(effect) {
  currentEffect = effect
  effect()
  currentEffect = null
}

export function ref(value) {
  return new Ref(value)
}

// ------------- reactive ----------------
const targetsMap = new Map()

function getKeyRef(target, key) {
  let refsMap = targetsMap.get(target)
  if (!refsMap) {
    refsMap = new Map()
    targetsMap.set(target, refsMap)
  }
  let keyRef = refsMap.get(key)
  if (!keyRef) {
    keyRef = ref()
    refsMap.set(key, keyRef)
  }
  return keyRef
}

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // 依赖收集
      const keyRef = getKeyRef(target, key)
      keyRef.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      // 触发依赖
      const keyRef = getKeyRef(target, key)
      const result = Reflect.set(target, key, value)
      keyRef.notice()
      return result
    },
  })
}
