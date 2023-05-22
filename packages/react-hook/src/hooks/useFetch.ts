import { PromiseFnResult } from '@youknown/utils/src'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatestRef } from './useLatestRef'

type Request = (...args: any[]) => Promise<any>
interface Options<T extends Request> {
	initialData: PromiseFnResult<T>
	manual?: boolean
	ready?: boolean
	loadingDelay?: number
	refreshDeps?: any[]
	params?: Parameters<T>
	onSuccess?(res: PromiseFnResult<T>): void
	onError?(err: any): void
}

export function useFetch<T extends Request, S extends Options<T>>(fetcher: T, opts: S) {
	const { manual = false, ready = true, loadingDelay = 0, refreshDeps = [] } = opts
	const fetcherRef = useLatestRef(fetcher)
	const optsRef = useLatestRef(opts)
	const _refreshDeps = manual ? [] : refreshDeps

	const [data, setData] = useState(optsRef.current.initialData)
	const [error, setError] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const fetchCount = useRef(0)

	const run = useCallback(() => {
		if (!ready) return

		const preCount = fetchCount.current
		const { onSuccess, onError, params = [] } = optsRef.current
		setError(null)
		const loadingTimer = setTimeout(() => {
			setLoading(true)
		}, loadingDelay)

		fetcherRef
			.current(...params)
			.then((res: PromiseFnResult<T>) => {
				if (fetchCount.current !== preCount) return
				onSuccess?.(res)
				setData(res)
			})
			.catch((err: PromiseFnResult<T>) => {
				if (fetchCount.current !== preCount) return
				onError?.(err)
				setError(err)
			})
			.finally(() => {
				if (fetchCount.current !== preCount) return
				clearTimeout(loadingTimer)
				setLoading(false)
			})
	}, [fetcherRef, loadingDelay, optsRef, ready])

	useEffect(
		() => {
			if (!manual) {
				run()
			}
			return () => {
				fetchCount.current += 1
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[manual, run, ..._refreshDeps]
	)

	return { data, error, loading, run, mutate: setData }
}
