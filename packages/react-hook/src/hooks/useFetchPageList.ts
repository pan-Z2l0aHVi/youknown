import { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useIntersection } from './useIntersection'
import { useLatestRef } from './useLatestRef'
import { PromiseFnResult } from '@youknown/utils/src'

type Fetcher = () => Promise<{
	list: unknown[]
	total: number
}>

interface PageListOptions<T extends Fetcher> {
	initialPage?: number
	initialPageSize: number
	ready?: boolean
	loadingDelay?: number
	loadingRef: RefObject<HTMLElement>
	observerInit?: IntersectionObserverInit
	onSuccess?(res: PromiseFnResult<T>): void
	onError?(err: any): void
}

export function useFetchPageList<T extends Fetcher>(fetcher: T, opts: PageListOptions<T>) {
	type Result = PromiseFnResult<T>

	const { initialPage = 1, initialPageSize, ready = true, loadingDelay = 0 } = opts
	const fetcherRef = useLatestRef(fetcher)
	const optsRef = useLatestRef(opts)

	const [isEnd, setIsEnd] = useState(false)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(initialPage)
	const [pageSize, setPageSize] = useState(initialPageSize)
	const [list, setList] = useState<Result['list']>([])
	const [total, setTotal] = useState(0)
	const fetchCount = useRef(0) //  处理请求时序问题

	const resetListData = useCallback(() => {
		fetchCount.current++
		setIsEnd(false)
		setLoading(false)
		setPage(initialPage)
		setPageSize(initialPageSize)
		setList([])
		setTotal(0)
	}, [initialPage, initialPageSize])

	const updateListData = useCallback(() => {
		if (isEnd) {
			return
		}
		const currentCount = fetchCount.current
		const loadingTimer = setTimeout(() => {
			setLoading(true)
		}, loadingDelay)
		fetcherRef
			.current()
			.then(data => {
				if (currentCount !== fetchCount.current) {
					return
				}
				fetchCount.current++

				optsRef.current.onSuccess?.(data as Result)
				if (data.list.length < pageSize) {
					setIsEnd(true)
				}
				setList(p => [...p, ...data.list])
				setTotal(data.total)
				setPage(p => p + 1)
			})
			.catch(err => {
				optsRef.current.onError?.(err)
			})
			.finally(() => {
				clearTimeout(loadingTimer)
				setLoading(false)
			})
	}, [fetcherRef, isEnd, loadingDelay, optsRef, pageSize])

	const { loadingRef, observerInit } = optsRef.current
	const isIntersection = useIntersection(loadingRef, observerInit)
	useLayoutEffect(() => {
		// FIXME: 调用resetListData导致页面布局发生变化，可能会额外触发无效请求。
		if (isIntersection && ready) {
			updateListData()
		}
	}, [isIntersection, ready, updateListData])

	return {
		isEnd,
		loading,
		page,
		pageSize,
		list,
		total,
		resetListData,
		updateListData
	}
}
