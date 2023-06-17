<template>
	<div class="tab-bar">
		<div class="h-1000px">112213</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
const getAppEle = () => {
	return document.getElementById('app')
}

onMounted(() => {
	const app = getAppEle()
	app?.style.setProperty('height', '100vh')
	app?.style.setProperty('overflow-y', 'auto')
	document.body.style.setProperty('overflow', 'hidden')
})
onUnmounted(() => {
	const app = getAppEle()
	app?.style.removeProperty('height')
	app?.style.removeProperty('overflow-y')
	document.body.style.removeProperty('overflow')
})
</script>

<style scoped lang="scss">
.tab-bar {
}
</style>
