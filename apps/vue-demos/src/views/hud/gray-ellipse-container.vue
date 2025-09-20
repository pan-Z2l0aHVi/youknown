<template>
  <div class="gray-ellipse-container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.gray-ellipse-container {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;

    /* 超出的边距 */
    top: -20px;
    right: -40px;
    bottom: -20px;
    left: -40px;

    /* 黑灰色渐变 - 从深灰到透明 */
    background: radial-gradient(
      ellipse 200% 100% at center,
      rgb(0, 0, 0, 0.4) 0%,
      /* 中心深灰色 */ rgb(50, 50, 50, 0.2) 50%,
      /* 中间过渡灰 */ rgb(100, 100, 100, 0) 75%
    );

    /* 边缘透明 */
    filter: blur(40px);
  }
}
</style>
