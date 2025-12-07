<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="z-2000 fixed left-0 top-0 right-0 bottom-0 w-100vw h-100vh flex"
      @mousedown.stop
      @mouseup.stop
    >
      <div class="flex-1 h-100%"></div>
      <div
        class="flex w-48% h-100% box-border backdrop-blur bg-[rgb(0,0,0,0.2)] animate-slide-in-right animate-duration-200ms animate-ease-in-out"
      >
        <div class="h-100% ml-20px">
          <div class="color-#fff text-16px font-500 mt-10px">附近</div>
          <div class="grid grid-cols-5 gap-5px">
            <div v-for="n in 56" :key="n" class="flex items-center justify-center w-40px h-40px bg-sky"></div>
          </div>
        </div>

        <div class="flex-1 h-100% ml-20px pl-20px bg-[rgb(0,0,0,0.2)]">
          <div class="color-#fff text-16px font-500 mt-10px">装备</div>
          <div class="flex gap-10px">
            <div class="" v-for="n in 2" :key="n">
              <div class="flex justify-center items-center h-100px bg-amber"></div>
              <div class="grid grid-cols-6 mt-5px gap-5px">
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">枪口</div>
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">战术</div>
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">握把</div>
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">瞄具</div>
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">供弹</div>
                <div class="flex items-center justify-center w-40px h-40px text-12px color-#fff bg-sky">枪托</div>
              </div>
            </div>
          </div>

          <div class="color-#fff text-16px font-500 mt-10px">口袋</div>
          <div class="grid grid-cols-6 gap-5px w-max">
            <div v-for="n in 18" :key="n" class="flex items-center justify-center w-40px h-40px bg-sky"></div>
          </div>

          <div class="color-#fff text-16px font-500 mt-10px">背包</div>
          <div class="grid grid-cols-8 gap-5px w-max">
            <div v-for="n in 56" :key="n" class="flex items-center justify-center w-40px h-40px bg-sky"></div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const visible = ref(false)

useEventListener(document, 'keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault()
    visible.value = !visible.value
  }
})
</script>

<style lang="scss" scoped>
// @keyframes slid {

// }
</style>
