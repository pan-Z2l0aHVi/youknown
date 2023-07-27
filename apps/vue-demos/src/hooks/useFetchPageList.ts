import { Ref, ref, watch } from 'vue'
import useIntersection from './useIntersection'

interface PageListOptions {
	initialPage?: number
	initialPageSize: number
	loadingRef: Ref<HTMLElement | null>
	observerInit?: () => IntersectionObserverInit
}

export default function useFetchPageList<
	T extends () => Promise<{
		list: unknown[]
		total: number
	}>
>(fetcher: T, options: PageListOptions) {
	type PromiseValueType<T> = T extends Promise<infer R> ? R : never
	type Result = PromiseValueType<ReturnType<T>>
	type List = Result['list']

	const { initialPage = 1, initialPageSize, loadingRef, observerInit } = options
	const isEnd = ref(false)
	const page = ref(initialPage)
	const pageSize = ref(initialPageSize)
	const list: Ref<List> = ref([])
	const total = ref(0)
	let fetchCount = 0 //  处理请求时序问题

	const resetListData = () => {
		isEnd.value = false
		page.value = initialPage
		pageSize.value = initialPageSize
		list.value = []
		total.value = 0
	}
	const updateListData = async () => {
		if (isEnd.value) {
			return
		}
		const currentCount = fetchCount

		const data = await fetcher()
		if (currentCount !== fetchCount) {
			return
		}
		fetchCount++

		if (data.list.length < pageSize.value) {
			isEnd.value = true
		}
		list.value.push(...data.list)
		total.value = data.total
		page.value++
	}

	const isIntersection = useIntersection(loadingRef, observerInit)
	watch(
		isIntersection,
		val => {
			if (val) {
				updateListData()
			}
		},
		{
			immediate: true
		}
	)

	return {
		isEnd,
		page,
		pageSize,
		list,
		total,
		resetListData,
		updateListData
	}
}
