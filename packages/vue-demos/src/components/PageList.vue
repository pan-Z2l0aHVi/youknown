<template>
	<div class="page-wrapper">
		<van-cell class="total-switch-cell" center title="With total">
			<template #right-icon>
				<van-switch v-model="withTotal" size="24" @change="scrollTop" />
			</template>
		</van-cell>
		<h3 v-if="withTotal" class="total">总共：{{ total }}</h3>
		<div class="list-container">
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
import { ref, watch } from 'vue'
import { fetchList, fetchListWithTotal } from '@/utils/fakeApi'
import useFetchPageList from '@/hooks/usePageList'

const loadingRef = ref<HTMLElement | null>(null)
const withTotal = ref(false)

const listWithTotalFetcher = () => {
	const params = {
		page: page.value,
		page_size: pageSize.value
	}
	return fetchListWithTotal(params).then(res => {
		if (res.code === 0) {
			return {
				list: res.data.list,
				total: res.data.total
			}
		}
		return Promise.reject()
	})
}
const listFetcher = () => {
	const params = {
		page: page.value,
		page_size: pageSize.value
	}
	return fetchList(params).then(res => {
		if (res.code === 0) {
			return {
				list: res.data,
				total: Infinity
			}
		}
		return Promise.reject()
	})
}

const fetcher = () => (withTotal.value ? listWithTotalFetcher() : listFetcher())

const { isEnd, page, pageSize, list, total, resetListData } = useFetchPageList(fetcher, {
	initialPageSize: 20,
	loadingRef,
	observerInit() {
		return {
			root: null,
			rootMargin: '0px 0px 240px 0px'
		}
	}
})
watch(withTotal, () => {
	resetListData()
})

const scrollTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}
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

.total-switch-cell {
	position: sticky;
	top: 48px;
}
.total {
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
