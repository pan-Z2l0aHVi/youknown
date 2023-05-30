<template>
	<div class="page-wrapper">
		<h3 class="header">总共：{{ total }}</h3>
		<div class="list-container" ref="containerRef">
			<div class="list-item" v-for="item in list" :key="item.id">
				{{ item.content }}
			</div>
			<div v-if="isEnd" class="loading-text">——到底了——</div>
			<div v-else ref="loadingRef" class="loading-text">加载中...</div>
		</div>
		<div class="other-container">others</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchList } from '@/utils/fakeApi'
import usePageList from '@/hooks/usePageList'

const loadingRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const fetcher = () => {
	const params = {
		page: page.value,
		page_size: pageSize.value
	}
	return fetchList(params).then(res => {
		if (res.code === 0) {
			return {
				list: res.data.list,
				total: res.data.total
			}
		}
		return Promise.reject()
	})
}

const { isEnd, page, pageSize, list, total } = usePageList(fetcher, {
	initialPageSize: 20,
	loadingRef,
	observerInit() {
		return {
			root: null,
			rootMargin: '0px 0px 240px 0px'
		}
	}
})
</script>

<style scope lang="scss">
.list-container {
	padding: 16px;

	.list-item {
		display: flex;
		align-items: center;
		min-height: 64px;
		font-size: 18px;
		color: #333;

		& + .list-item {
			border-top: 1px solid #eee;
		}
	}

	.loading-text {
		text-align: center;
		color: #666;
	}
}

.page-wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.header {
	text-align: center;
}

.other-container {
	height: 200px;
	background: lightcyan;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
