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
    <div
      class="relative h-100% flex"
      :style="{
        gap: `${gap}px`
      }"
    >
      <div v-for="n in chunkNum" :key="n" class="flex-1 overflow-hidden relative" :style="{ borderRadius }">
        <div
          v-if="resourceBar.indicator"
          class="absolute left-0 top-0 box-border h-100% bg-emerald motion-breath"
          :style="{
            transform: `translateX(-${formatLeft(n)}px)`,
            width: `${indicatorWidth}px`,
            borderRadius
          }"
        ></div>
        <div
          class="absolute left-0 top-0 box-border h-100% bg-#ccc transition-width duration-1000 transition-ease-linear"
          :style="{
            transform: `translateX(-${formatLeft(n)}px)`,
            width: `${valueWidth}px`,
            borderRadius
          }"
        ></div>
        <div
          v-if="n <= currentChunk"
          class="absolute left-0 top-0 box-border h-100%"
          :class="[armorColorCls]"
          :style="{
            transform: `translateX(-${formatLeft(n)}px)`,
            width: `${valueWidth}px`,
            borderRadius
          }"
        ></div>
      </div>
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
    chunkNum?: number
    gap?: number

    max?: number
    autoRegenRate?: number
    autoRegenCD?: number
  }>(),
  {
    padding: 1,
    width: 200,
    height: 10,
    borderRadius: 0,
    chunkNum: 1,
    gap: 1,

    max: 100,
    autoRegenRate: 0,
    autoRegenCD: 0
  }
)
const emits = defineEmits<{
  (e: 'full'): void
  (e: 'empty'): void
}>()

const AR_COLOR_MAP: Record<number, string> = {
  1: 'bg-green',
  2: 'bg-blue',
  3: 'bg-purple',
  4: 'bg-yellow',
  5: 'bg-red'
}
const armorColorCls = computed(() => AR_COLOR_MAP[props.chunkNum] ?? AR_COLOR_MAP[5])

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

// 单个区块的最大值
const chunkValue = computed(() => props.max / props.chunkNum)
// 浮标所在区块
const currentChunk = computed(() => Math.ceil(resourceBar.value / chunkValue.value))

const formatLeft = (n: number) => (n - 1) * ((props.width - 2 * props.padding + props.gap) / props.chunkNum)
const formatWidth = (val: number) => (val / props.max) * (props.width - 2 * props.padding)
const valueWidth = computed(() => formatWidth(resourceBar.value))
const indicatorWidth = computed(() => formatWidth(resourceBar.value + resourceBar.indicator))

defineExpose({
  resourceBar
})

export interface ArmorBarExposed {
  resourceBar: Reactive<ResourceBar>
}
</script>

<style scoped lang="scss">
@use './motions.scss' as *;
</style>
