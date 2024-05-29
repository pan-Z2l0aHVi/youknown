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
  <TransitionRouterView />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import TransitionRouterView from '@/components/TransitionRouterView.vue'
import { navTabRoutes } from '@/router/routes'

const route = useRoute()
const router = useRouter()
const tabList = ref(navTabRoutes)
const active = ref(0)
watchEffect(() => {
  const routeName = route.name
  if (routeName) {
    active.value = tabList.value.findIndex(tab => routeName.startsWith(tab.name))
  }
})
</script>

<style lang="scss" scoped></style>
