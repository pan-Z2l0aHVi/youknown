import { MutableRefObject, SetStateAction, useState } from 'react'

import { is, microDefer, omit } from '@youknown/utils/src'

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
			if (page <= initialPage) {
				setData(data)
			} else if (!noMore) {
				setData(p => [...p, ...data] as T)
			}
			if (data.length < pageSize) {
				setNoMore(true)
			} else {
				setPage(p => p + 1)
			}
		}
	})
	const { run, ...rest } = omit(fetchResult, 'data', 'mutate')
	const loadMore = useEvent(run)

	const changePageSize = useEvent((arg: SetStateAction<number>) => {
		setPageSize(arg)
	})

	const reload = useEvent(() => {
		setPage(initialPage)
		setPageSize(initialPageSize)
		setNoMore(false)
		setData(p => p.slice(0, initialPageSize) as T)
		const root = opts.observerInit?.root
		if (root instanceof HTMLElement) {
			root.scrollTo(0, 0)
		}
		microDefer(() => {
			loadMore()
		})
	})

	return {
		data,
		page,
		pageSize,
		changePageSize,
		reload,
		mutate: setData,
		noMore,
		loadMore,
		...rest
	}
}
