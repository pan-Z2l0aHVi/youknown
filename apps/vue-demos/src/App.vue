<template>
  <div v-if="route.name?.startsWith('route-transition')" class="z-20 sticky top-0 w-100% h-48px bg-#eee">
    <div class="absolute left-10px top-10px">
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      <span class="color-blue text-20px" @click="router.back"><</span>
      <span class="color-blue text-20px ml-40px" @click="router.forward">></span>
    </div>
  </div>
  <header v-else class="z-20 sticky top-0 w-100% h-48px bg-#fff">
    <van-tabs v-if="route.name" v-model:active="active" swipeable>
      <van-tab v-for="tab in tabList" :key="tab.name" :title="tab.meta.title" :to="tab.path"></van-tab>
    </van-tabs>
  </header>
  <router-view v-slot="{ Component }">
    <transition :name="route.meta.transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { navTabRoutes } from '@/router/routes'

const route = useRoute()
const router = useRouter()
const tabList = ref(navTabRoutes)
const active = ref(0)
watchEffect(() => {
  const routeName = route.name
  if (routeName) {
    active.value = tabList.value.findIndex(tab => {
      console.log('tab: ', routeName, tab.name)
      return routeName.startsWith(tab.name)
    })
  }
})
</script>

<style lang="scss" scoped>
$page-shadow: 0 0 24px -12px rgba(0, 0, 0, 0.1);
$bezier: cubic-bezier(0.25, 0.1, 0.25, 1);
@mixin active-transition {
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
    transform: translateX(-20%);
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
    transform: translateX(-20%);
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
