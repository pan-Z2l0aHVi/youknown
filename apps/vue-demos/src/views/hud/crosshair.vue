<template>
  <div class="flex items-center justify-center">
    <n-icon v-if="disabled" class="block" size="20px" color="yellow">
      <ReForbidLine />
    </n-icon>

    <template v-else>
      <div
        class="box-border b-solid"
        :class="[round && 'rd-full']"
        :style="{
          backgroundColor,
          borderWidth,
          borderColor,
          width: `${dot}px`,
          height: `${dot}px`
        }"
      ></div>
      <transition name="fade">
        <CrosshairLine
          v-show="aiming"
          class="transition-opacity"
          :round="round"
          :background-color="backgroundColor"
          :border-width="borderWidth"
          :border-color="borderColor"
          :width="crossWidth"
          :height="crossHeight"
          :spread="spread"
          transition="50ms"
        />
      </transition>
      <CrosshairLine
        ref="indicatorRef"
        v-show="indicatorVisible"
        class="animate-hitting rotate-45"
        :background-color="isHeadsShot ? 'red' : backgroundColor"
        border-width="0"
        :width="16"
        :height="2"
        :spread="indicatorSpread"
        :transition="`${INDICATOR_MOTION_DURATION}ms`"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ReForbidLine } from '@kalimahapps/vue-icons'
import { useEventListener, useMagicKeys } from '@vueuse/core'

import CrosshairLine from './crosshair-line.vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    dot?: number
    crossWidth?: number
    crossHeight?: number
    round?: boolean
    backgroundColor?: string
    borderWidth?: string
    borderColor?: string
    isJumping?: boolean
    isHeadsShot?: boolean
  }>(),
  {
    disabled: false,
    dot: 4,
    crossWidth: 12,
    crossHeight: 4,
    round: false,
    backgroundColor: '#fff',
    borderWidth: '1px',
    borderColor: 'rgb(0,0,0,0.6)',
    isJumping: false,
    isHeadsShot: false
  }
)
const INITIAL_SPREAD = 10
const spread = ref(INITIAL_SPREAD)
const aiming = ref(false)

const INDICATOR_MOTION_DURATION = 100
const INDICATOR_DEFAULT_SPREAD = 16
const indicatorVisible = ref(false)
const indicatorSpread = ref(INDICATOR_DEFAULT_SPREAD)

const { w, a, s, d } = useMagicKeys()
const shooting = ref(false)

watchEffect(() => {
  if (props.disabled) {
    shooting.value = false
  }
})

// FIXME: 模拟击杀反馈
let killTimer = 0
watchEffect(() => {
  if (shooting.value) {
    const TTK = 4000
    clearTimeout(killTimer)
    killTimer = window.setTimeout(() => {
      indicatorSpread.value = 3 * INDICATOR_DEFAULT_SPREAD
      setTimeout(() => {
        indicatorVisible.value = false
        indicatorSpread.value = INDICATOR_DEFAULT_SPREAD
      }, INDICATOR_MOTION_DURATION)
    }, Math.random() * TTK)
  }
})

// 阻止默认右键菜单
useEventListener(document, 'contextmenu', e => e.preventDefault())
// 鼠标右键开始瞄准
useEventListener(document, 'mousedown', e => {
  if (e.button === 0) {
    if (aiming.value) {
      shooting.value = true
      indicatorVisible.value = true
    }
  } else if (e.button === 2) {
    aiming.value = true
  }
})
// 鼠标右键取消瞄准
useEventListener(document, 'mouseup', e => {
  if (e.button === 0) {
    shooting.value = false
    indicatorVisible.value = false
  } else if (e.button === 2) {
    aiming.value = false
  }
})

watchEffect(() => {
  let aimMagnify = 1
  let moveMagnify = 1
  let jumpMagnify = 1
  let shotMagnify = 1

  if (aiming.value) {
    aimMagnify = 0.5
  }
  if ([w, a, s, d].some(item => item.value)) {
    moveMagnify = 1.5
  }
  if (props.isJumping) {
    jumpMagnify = 3
  }
  if (shooting.value) {
    shotMagnify = 2.5
  }
  spread.value = INITIAL_SPREAD * aimMagnify * moveMagnify * jumpMagnify * shotMagnify
})

const indicatorRef = ref<{ containerRef: HTMLDivElement }>()
const setRandomAngle = () => {
  const randomAngle = 45 + (Math.random() - 0.5) * 30 // 随机角度
  indicatorRef.value?.containerRef.style.setProperty('--angle', `${randomAngle}deg`)
}

watchEffect(() => {
  if (indicatorRef.value?.containerRef) {
    setRandomAngle()
    indicatorRef.value.containerRef.addEventListener('animationiteration', setRandomAngle)
  }
})
</script>

<style scoped lang="scss">
@keyframes rotate-random {
  100% {
    transform: rotate(var(--angle));
  }
}

.animate-hitting {
  animation: rotate-random 50ms infinite alternate;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
