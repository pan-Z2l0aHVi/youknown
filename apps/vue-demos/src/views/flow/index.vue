<template>
  <div ref="containerRef" :style="{ height: containerHeight }">
    <div
      class="relative mx-auto"
      :style="{
        width: `${cardContainerW}px`,
        height: `${cardContainerH}px`
      }"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="absolute rd-10px cursor-pointer"
        :style="{
          width: `${CARD_W}px`,
          height: `${item.height}px`,
          'background-color': item.bg,
          top: `${item.top}px`,
          left: `${item.left}px`
        }"
        @click="e => handleSelectCard(e, item)"
      ></div>
    </div>

    <div>123123123</div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="detailVisible" class="z-2000 fixed inset-0 bg-[rgb(0,0,0,0.4)]"></div>
      </Transition>
      <div v-if="visibleDelayed" class="z-2000 fixed inset-0" @click.self="detailVisible = false">
        <div
          v-if="detailRect"
          class="absolute rd-10px bg-#fff transition-all-500 transition-ease-out"
          :style="{
            width: `${detailRect.width}px`,
            height: `${detailRect.height}px`,
            top: `${detailRect.top}px`,
            left: `${detailRect.left}px`,
            'background-color': selection.bg
          }"
        ></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const CARD_W = 150
const GAP = 20

function getRandomHexColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
function getRandomHeight() {
  return 120 + Math.random() * 80
}

const containerRef = ref<HTMLDivElement>()
const track = ref<number[]>([])

const containerHeight = computed(() => `${Math.max(...track.value)}px`)

let count = 100
interface Item {
  id: number
  bg: string
  height: number
  top?: number
  left?: number
}
const list = ref<Item[]>(
  Array(32)
    .fill(0)
    .map(() => ({
      id: count++,
      bg: getRandomHexColor(),
      height: getRandomHeight()
    }))
)

const trackList = ref<number[]>([])

const computeMasonry = () => {
  if (containerRef.value) {
    const { width } = containerRef.value.getBoundingClientRect()
    trackList.value = Array(Math.floor((width + GAP) / (CARD_W + GAP))).fill(0)
    list.value = list.value.map(item => {
      let lowestIndex = 0
      let lowestHeight = trackList.value[lowestIndex]
      trackList.value.forEach((height, index) => {
        if (lowestHeight > height) {
          lowestHeight = height
          lowestIndex = index
        }
      })
      const top = trackList.value[lowestIndex]
      const left = lowestIndex * (CARD_W + GAP)
      trackList.value[lowestIndex] += item.height + GAP

      return {
        ...item,
        top,
        left
      }
    })
    track.value = trackList.value
  }
}

const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    nextTick(() => {
      computeMasonry()
    })
  }
})
onMounted(() => {
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  if (containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
  }
})

const router = useRouter()
const route = useRoute()
// 可根据id参数判断是否新页面直接打开
// 从不同数据来源获取详情
// 省略后续流程...
const id = route.params.id
const selection = ref()
const detailVisible = ref(false)
const detailRect = ref<Partial<DOMRect>>()

const fromRect = ref<DOMRect>()
const toRect = computed(() => {
  if (!fromRect.value) {
    return
  }
  const PD = 20
  let width: number
  let height: number
  const aspectRatio = fromRect.value.width / fromRect.value.height
  if (aspectRatio > 1) {
    width = window.innerWidth - 2 * PD
    height = width / aspectRatio
  } else {
    height = window.innerHeight - 2 * PD
    width = height * aspectRatio
  }
  const top = (window.innerHeight - height) / 2
  const left = (window.innerWidth - width) / 2
  return {
    width,
    height,
    left,
    top
  }
})

const cardContainerW = computed(() => {
  const len = trackList.value.length
  return CARD_W * len + GAP * (len - 1)
})
const cardContainerH = computed(() => {
  return Math.max(...trackList.value) - GAP
})

const handleSelectCard = (e: MouseEvent, item: Item) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  selection.value = item
  fromRect.value = rect
  detailVisible.value = true
  router.push(`/flow/${item.id}`)
}

const disableWheel = (e: WheelEvent) => {
  e.preventDefault()
}
watch(
  detailVisible,
  val => {
    if (val) {
      window.addEventListener('wheel', disableWheel, {
        passive: false
      })
    } else {
      window.removeEventListener('wheel', disableWheel)
    }
  },
  {
    immediate: true
  }
)

const enter = () => {
  detailRect.value = fromRect.value
  requestAnimationFrame(() => {
    detailRect.value = toRect.value
  })
}
const exit = () => {
  detailRect.value = toRect.value
  requestAnimationFrame(() => {
    detailRect.value = fromRect.value
  })
}
const visibleDelayed = ref(false)
watch(detailVisible, val => {
  if (!val) {
    setTimeout(() => {
      visibleDelayed.value = val
    }, 500)
    exit()
  } else {
    visibleDelayed.value = val
    enter()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
