import { MutableRefObject, SetStateAction, useState } from 'react'

import { is, omit } from '@youknown/utils/src'

import { useCreation } from './useCreation'
import { useEvent } from './useEvent'
import { FetchOptions, useFetch } from './useFetch'
import { useIntersection } from './useIntersection'

interface InfinityOptions<T, S> extends FetchOptions<T, S> {
	initialPage?: number
	initialPageSize?: number
	target?: MutableRefObject<HTMLElement | null>
	observerInit?: IntersectionObserverInit
}

export function useInfinity<T extends any[], S extends any[]>(
	fetcher: (...args: S) => Promise<T>,
	opts: InfinityOptions<T, S> = {}
) {
	const initialPage = useCreation(() => opts.initialPage ?? 1)
	const initialPageSize = useCreation(() => opts.initialPageSize ?? 10)
	const [page, setPage] = useState(initialPage)
	const [pageSize, setPageSize] = useState(initialPageSize)
	const [noMore, setNoMore] = useState(false)
	const [data, setData] = useState([] as unknown as T)

	const isIntersecting = useIntersection(opts.target, opts.observerInit)
	let { ready = true } = opts
	if (!is.undefined(opts.target)) {
		ready = ready && isIntersecting
	}
	const fetchOpts = omit(opts, 'initialPage', 'initialPageSize', 'target', 'observerInit', 'ready')
	const fetchResult = useFetch(fetcher, {
		...fetchOpts,
		ready,
		onSuccess(data, params) {
			fetchOpts.onSuccess?.(data, params)
			setData(p => {
				if (page <= initialPage) {
					return data
				}
				return [...p, ...data] as T
			})
			setPage(p => p + 1)
			if (data.length < pageSize) {
				setNoMore(true)
			}
		}
	})
	const { run, ...rest } = omit(fetchResult, 'data', 'mutate')
	const loadMore = useEvent(run)

	const changePageSize = useEvent((arg: SetStateAction<number>) => {
		setPageSize(arg)
	})

	const reset = useEvent(() => {
		setPage(initialPage)
		setPageSize(initialPageSize)
		setNoMore(false)
		setData(p => p.slice(0, initialPageSize) as T)
		const root = opts.observerInit?.root
		if (root instanceof HTMLElement) {
			root.scrollTo(0, 0)
		}
		setTimeout(() => {
			loadMore()
		})
	})

	return {
		data,
		page,
		pageSize,
		changePageSize,
		reset,
		mutate: setData,
		noMore,
		loadMore,
		...rest
	}
}
