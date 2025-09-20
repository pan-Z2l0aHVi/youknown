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
        v-if="fullMax > max"
        class="absolute right-0 top-0 box-border h-100% bg-#ccc"
        :style="{
          width: formatWidth((fullMax - max) / fullMax),
          borderRadius
        }"
      ></div>
      <div
        v-if="resourceBar.indicator"
        class="absolute left-0 top-0 box-border h-100% bg-emerald motion-breath"
        :style="{
          width: formatWidth(((resourceBar.value + resourceBar.indicator) / max) * (max / fullMax)),
          borderRadius
        }"
      ></div>
      <div
        class="absolute left-0 top-0 box-border h-100% bg-red transition-width duration-1000 transition-ease-linear"
        :style="{
          width: formatWidth((resourceBar.value / max) * (max / fullMax)),
          borderRadius
        }"
      ></div>
      <div
        class="absolute left-0 top-0 box-border h-100% bg-#fff"
        :style="{
          width: formatWidth((resourceBar.value / max) * (max / fullMax)),
          borderRadius
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ResourceBar } from '@youknown/game-hud/src/resource-bar'
import { useResourceBar } from '@youknown/game-hud/src/use-vue-resource-bar'
import { Reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    padding?: number
    width?: number
    height?: number
    borderRadius?: number | string

    fullMax?: number
    max?: number
    autoRegenRate?: number
    autoRegenCD?: number
  }>(),
  {
    padding: 1,
    width: 200,
    height: 16,
    borderRadius: 0,

    fullMax: 100,
    max: 100,
    autoRegenRate: 0,
    autoRegenCD: 0
  }
)

const emits = defineEmits<{
  (e: 'full'): void
  (e: 'empty'): void
}>()

const resourceBar = useResourceBar({
  max: toRef(() => props.max),
  autoRegenRate: toRef(() => props.autoRegenRate),
  autoRegenCD: toRef(() => props.autoRegenCD),
  onFull() {
    emits('full')
  },
  onEmpty() {
    emits('empty')
  }
})

const formatWidth = (val: number) => `${val * 100}%`

defineExpose({
  resourceBar
})

export interface HealthBarExposed {
  resourceBar: Reactive<ResourceBar>
}
</script>

<style scoped lang="scss">
@use './motions.scss' as *;
</style>
