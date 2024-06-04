import './transition-view.scss'

import { storage } from '@youknown/utils/src'
import { Children, cloneElement, createRef, MutableRefObject, ReactNode, Ref, useMemo, useRef } from 'react'
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const PAGE_STACK_KEY = 'react_page_stack'
const pageStack: string[] = storage.session.get(PAGE_STACK_KEY) ?? []

// 解决移动端某些机型或浏览器自带页面滑动动画冲突
let needAnimation = true
const delayResetNeedAnimation = () => {
  // 延后重置控制参数
  setTimeout(() => {
    needAnimation = true
  }, 16) // 通常 16ms
}
window.addEventListener('touchstart', () => {
  needAnimation = true
})
window.addEventListener('touchmove', () => {
  needAnimation = false
})
window.addEventListener('touchend', delayResetNeedAnimation)

enum Action {
  Pop = 'POP',
  Push = 'PUSH',
  Replace = 'REPLACE'
}
interface TransitionViewProps {
  children?: ReactNode
}
export default function TransitionView(props: TransitionViewProps) {
  const { children } = props
  const hasChildren = Children.count(children) > 0
  const location = useLocation()
  const { pathname, state } = location
  const key = pathname
  const instant = !!state?.instant
  const fullPath = `${location.pathname}${location.search}${location.hash}`
  const action = useNavigationType()
  const outlet = useOutlet()

  // https://github.com/reactjs/react-transition-group/issues/668
  const nodeMapRef = useRef<Record<string, Ref<HTMLElement>>>({})
  if (!nodeMapRef.current[key]) {
    nodeMapRef.current[key] = createRef()
  }

  const transitionName = useMemo(() => {
    let result = ''
    if (instant) {
      pageStack.push(fullPath)
      result = ''
    }
    // Init
    else if (!pageStack.length) {
      pageStack.push(fullPath)
      result = ''
    }
    // Refresh
    else if (pageStack[pageStack.length - 1] === fullPath) {
      result = ''
    }
    // Back
    else if (action === Action.Pop && pageStack[pageStack.length - 2] === fullPath) {
      if (needAnimation) {
        result = 'slide-back'
      }
      pageStack.pop()
    }
    // Forward
    else {
      pageStack.push(fullPath)
      result = 'slide-forward'
    }
    storage.session.set(PAGE_STACK_KEY, pageStack)
    return result
  }, [action, fullPath, instant])

  return (
    <TransitionGroup
      // https://github.com/reactjs/react-transition-group/issues/182
      childFactory={child =>
        cloneElement(child, {
          classNames: transitionName
        })
      }
    >
      <CSSTransition key={key} nodeRef={nodeMapRef.current[key]} timeout={300} unmountOnExit>
        <div
          ref={node => {
            const nodeRef = nodeMapRef.current[key] as MutableRefObject<HTMLDivElement | null>
            if (nodeRef) {
              nodeRef.current = node
            }
          }}
        >
          {hasChildren ? children : outlet}
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
