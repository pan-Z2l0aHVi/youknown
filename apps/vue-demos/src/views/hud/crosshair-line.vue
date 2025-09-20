<template>
  <div ref="containerRef" class="absolute">
    <div
      class="absolute left-50% top-50% translate-y--50%"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <div
        :class="[lineCls, bdCls]"
        :style="{
          backgroundColor,
          borderColor,
          borderWidth,
          transform: `translateX(${spread}px)`,
          transitionDuration: transition
        }"
      ></div>
    </div>

    <div
      class="absolute right-50% top-50% translate-y--50%"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <div
        :class="[lineCls, bdCls]"
        :style="{
          backgroundColor,
          borderColor,
          borderWidth,
          transform: `translateX(${-spread}px)`,
          transitionDuration: transition
        }"
      ></div>
    </div>

    <div
      class="absolute left-50% top-50% translate-x--50%"
      :style="{
        width: `${height}px`,
        height: `${width}px`
      }"
    >
      <div
        :class="[lineCls, bdCls]"
        :style="{
          backgroundColor,
          borderColor,
          borderWidth,
          transform: `translateY(${spread}px)`,
          transitionDuration: transition
        }"
      ></div>
    </div>

    <div
      class="absolute left-50% bottom-50% translate-x--50%"
      :style="{
        width: `${height}px`,
        height: `${width}px`
      }"
    >
      <div
        :class="[lineCls, bdCls]"
        :style="{
          backgroundColor,
          borderColor,
          borderWidth,
          transform: `translateY(${-spread}px)`,
          transitionDuration: transition
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    backgroundColor?: string
    borderWidth?: string
    borderColor?: string
    width?: number
    height?: number
    spread?: number
    round?: boolean
    transition?: string
  }>(),
  {
    width: 12,
    height: 4,
    backgroundColor: '#fff',
    borderWidth: '1px',
    borderColor: 'rgb(0,0,0,1)',
    spread: 0,
    round: false
  }
)

const bdCls = 'box-border b-solid'
const lineCls = computed(
  () =>
    `w-100% h-100% ${props.transition ? 'transition-transform transition-ease-out' : ''} ${props.round ? 'rd-full' : ''}`
)

const containerRef = ref<HTMLDivElement>()
defineExpose({ containerRef })
</script>

<style scoped></style>
