<template>
  <div class="bg-#fff min-h-[calc(100vh-48px)]">
    <h1 class="mt-0 text-center">List</h1>
    <van-list>
      <van-cell class="text-center" v-for="item in 10" :key="item" :title="`Item ${item}`" clickable to="detail" />
    </van-list>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
