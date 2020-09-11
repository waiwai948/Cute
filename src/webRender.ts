import {
  mountLabel,
  mountText,
  mountComponent,
  mountPortal,
  mountFragment,
} from './mountType'
import { VNode, vElement } from './tsType'

function webRender(newNode: VNode, container: vElement): void {
  // 第一次之后会把vnode挂载到container上
  const oldNode = container.vnode
  if (!oldNode) {
    // 没有旧节点，直接挂载新的节点
    mount(newNode, container)
  } else {
    if (newNode) {
      // 有旧，有新，进行比较patch
      patch(newNode, oldNode, container)
    } else {
      // 无新，有旧，进行删除，dom api
      container.removeChild(oldNode.el)
    }
  }
  // 最后给container 绑定vnode
  container.vnode = newNode
}

// 挂载函数
export function mount(newNode: VNode, container: vElement): void {
  const { type } = newNode
  const reg = /^[A-Z]+$/
  if (typeof type === 'string' && !reg.test(type)) {
    // 挂载普通标签
    mountLabel(newNode, container)
  } else if (typeof type === 'string') {
    // 挂载组件
    mountComponent(newNode, container)
  } else if (type === null) {
    // 挂载文本
    mountText(newNode, container)
  } else if (type === Symbol.for('react.portal')) {
    // 挂载portal
    mountPortal(newNode, container)
  } else if (type === Symbol.for('react.fragment')) {
    // 挂载fragment
    mountFragment(newNode, container)
  }
}

// 补丁函数
function patch(newNode: VNode, oldNode: VNode, container: vElement): void {}

export default webRender