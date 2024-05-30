<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { storage } from '@youknown/utils/src'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// 解决移动端某些机型或浏览器自带页面滑动动画冲突
let needAnimation = true
const delayReset = () => {
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
window.addEventListener('touchend', delayReset)

const PAGE_STACK_KEY = 'vue_page_stack'
const pageStack: string[] = storage.session.get(PAGE_STACK_KEY) ?? []
const transitionName = ref('')

watch(
  () => route.fullPath,
  fullPath => {
    // Init
    if (!pageStack.length) {
      pageStack.push(fullPath)
      transitionName.value = ''
    }
    // Refresh
    else if (pageStack[pageStack.length - 1] === fullPath) {
      transitionName.value = ''
    }
    // Back
    else if (pageStack[pageStack.length - 2] === fullPath) {
      if (needAnimation) {
        transitionName.value = 'slide-back'
      }
      pageStack.pop()
    }
    // Forward
    else {
      pageStack.push(fullPath)
      transitionName.value = 'slide-forward'
    }
    storage.session.set(PAGE_STACK_KEY, pageStack)
  }
)
</script>

<style lang="scss" scoped>
$page-shadow: -4px 0 24px -4px rgba(0, 0, 0, 0.1);
$bezier: cubic-bezier(0.25, 0.1, 0.25, 1);

@mixin active-transition {
  pointer-events: none;
  transition:
    transform 0.3s $bezier,
    filter 0.3s $bezier;
  /* 确保旧页面在新页面滑入后才消失 */
  position: absolute;
  width: 100%;
}

.slide-forward {
  &-enter-active,
  &-leave-active {
    @include active-transition;
  }

  &-enter-active {
    box-shadow: $page-shadow;
  }

  &-enter-from {
    transform: translateX(100%);
  }

  &-enter-to {
    transform: translateX(0);
  }

  &-leave-from {
    transform: translateX(0);
    filter: brightness(1);
  }

  &-leave-to {
    transform: translateX(-40%);
    filter: brightness(0.95);
  }
}

.slide-back {
  &-enter-active,
  &-leave-active {
    @include active-transition;
  }

  &-leave-active {
    z-index: 1;
    box-shadow: $page-shadow;
  }

  &-enter-from {
    transform: translateX(-40%);
    filter: brightness(0.95);
  }

  &-enter-to {
    transform: translateX(0);
    filter: brightness(1);
  }

  &-leave-from {
    transform: translateX(0%);
  }

  &-leave-to {
    transform: translateX(100%);
  }
}
</style>
