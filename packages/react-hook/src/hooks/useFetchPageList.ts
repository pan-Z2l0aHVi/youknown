import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useIntersection } from './useIntersection'
import { useLatestRef } from './useLatestRef'

interface PageListOptions {
	initialPageSize: number
	loadingRef: MutableRefObject<HTMLElement>
	observerInit?: IntersectionObserverInit
}

export function useFetchPageList<
	T extends () => Promise<{
		list: any[]
		total: number
	}>
>(fetcher: T, options: PageListOptions) {
	type PromiseValueType<T> = T extends Promise<infer R> ? R : never
	type Result = PromiseValueType<ReturnType<typeof fetcher>>
	type List = Result['list']

	const fetcherRef = useLatestRef(fetcher)
	const optionsRef = useLatestRef(options)
	const [isEnd, setIsEnd] = useState(false)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(optionsRef.current.initialPageSize)
	const [list, setList] = useState<List>([])
	const [total, setTotal] = useState(0)
	const fetchCount = useRef(0) //  处理请求时序问题

	const resetListData = () => {
		setIsEnd(false)
		setPage(1)
		setPageSize(optionsRef.current.initialPageSize)
		setList([])
		setTotal(0)
	}
	const updateListData = useCallback(async () => {
		if ((page - 1) * pageSize > total) {
			return
		}
		const currentCount = fetchCount.current
		const data = await fetcherRef.current()
		if (currentCount !== fetchCount.current) {
			return
		}
		fetchCount.current++

		if (page === 1) {
			setList(data.list)
		} else {
			setList(p => [...p, ...data.list])
			if (data.list.length < pageSize) {
				setIsEnd(true)
			}
		}
		setTotal(data.total)
		setPage(p => p + 1)
	}, [fetcherRef, page, pageSize, total])

	const isIntersection = useIntersection(optionsRef.current.loadingRef, optionsRef.current.observerInit)
	useEffect(() => {
		if (isIntersection) {
			updateListData()
		}
	}, [isIntersection, updateListData])

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
