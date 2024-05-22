import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
}

const pageStack: string[] = []

router.beforeEach((to, from, next) => {
  if (!pageStack.length) {
    // Init
    pageStack.push(to.fullPath)
    to.meta.transitionName = ''
  } else if (pageStack[pageStack.length - 2] === to.fullPath) {
    // Back
    if (!(isIOS() && isMobileDevice())) {
      to.meta.transitionName = 'slide-back'
    }
    pageStack.pop()
  } else {
    // Forward
    pageStack.push(to.fullPath)
    to.meta.transitionName = 'slide-forward'
  }
  console.log('to.meta.transitionName', to.meta.transitionName)
  // to.meta.transitionName = 'slide-right'
  next()
})

export default router
