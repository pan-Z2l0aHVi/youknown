<template>
  <div
    class="box-border bg-[rgb(0,0,0,.2)] backdrop-blur"
    :style="{
      padding: `${padding}px`,
      width: `${width}px`,
      height: `${height}px`,
      borderRadius
    }"
  >
    <div class="relative h-100%">
      <div
        v-if="resourceBar.indicator"
        class="absolute left-0 top-0 box-border h-100% bg-emerald motion-breath"
        :style="{
          width: formatWidth((resourceBar.value + resourceBar.indicator) / max),
          borderRadius
        }"
      ></div>
      <div
        class="absolute left-0 top-0 box-border h-100% bg-orange transition-width duration-1000 transition-ease-linear"
        :style="{
          width: formatWidth(resourceBar.value / max),
          borderRadius
        }"
      ></div>
      <div
        class="absolute left-0 top-0 bg-amber box-border h-100%"
        :style="{
          width: formatWidth(resourceBar.value / max),
          borderRadius
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { ResourceBar } from '@youknown/game-hud/src/resource-bar'
import { useResourceBar } from '@youknown/game-hud/src/use-vue-resource-bar'
import { Reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    padding?: number
    width?: number
    height?: number
    borderRadius?: number | string

    max?: number
    autoRegenRate?: number
    autoRegenCD?: number
  }>(),
  {
    padding: 1,
    width: 200,
    height: 6,
    borderRadius: 0,

    max: 100,
    autoRegenRate: 0,
    autoRegenCD: 0
  }
)
const emits = defineEmits<{
  (e: 'full'): void
  (e: 'empty'): void
}>()

const running = defineModel('running', { default: false })
const climbing = defineModel('climbing', { default: false })

const resourceBar = useResourceBar({
  max: toRef(() => props.max),
  autoRegenRate: toRef(() => props.autoRegenRate),
  autoRegenCD: toRef(() => props.autoRegenCD),
  onFull() {
    emits('full')
  },
  onEmpty() {
    running.value = false
    emits('empty')
  }
})

const formatWidth = (val: number) => `${val * 100}%`

const toggleRunning = useThrottleFn(() => {
  running.value = !running.value
  if (!running.value) {
    resourceBar.dot(2, Infinity, () => !running.value)
  }
}, 200)

const climb = (duration: number) => {
  if (climbing.value) {
    return
  }
  climbing.value = true
  resourceBar.dec(20)
  setTimeout(() => {
    climbing.value = false
  }, duration)
}

defineExpose({
  resourceBar,
  running,
  toggleRunning,
  climb
})

export interface StaminaBarExposed {
  resourceBar: Reactive<ResourceBar>
  running: boolean
  toggleRunning: () => void
  climb: (duration: number) => void
}
</script>

<style scoped lang="scss">
@use './motions.scss' as *;
</style>
