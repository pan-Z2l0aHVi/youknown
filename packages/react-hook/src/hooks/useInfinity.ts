import { checkElementInContainer, is, omit } from '@youknown/utils/src'
import type { MutableRefObject, SetStateAction } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import { useEvent } from './useEvent'
import type { FetchOptions } from './useFetch'
import { useFetch } from './useFetch'
import { useIntersection } from './useIntersection'

const overReact18 = Number(ReactDOM.version?.split('.')[0]) > 17
const flushSync = overReact18 ? ReactDOM.flushSync : (fn: () => void) => fn()

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
  const [initialPage] = useState(() => opts.initialPage ?? 1)
  const [initialPageSize] = useState(() => opts.initialPageSize ?? 10)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [noMore, setNoMore] = useState(false)

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
      const noMoreData = !data.length
      flushSync(() => {
        setNoMore(noMoreData)
        if (page <= 1) {
          setData(data)
        } else if (!noMoreData) {
          setData(p => [...p, ...data] as T)
        }
        if (!noMoreData) {
          setPage(p => p + 1)
        }
      })
      // 拉取数据未填满屏幕时，继续拉取下一页
      const loadScreenData = () => {
        if (!noMoreData && opts.target) {
          const targetEle = opts.target?.current
          const container = (opts.observerInit?.root as HTMLElement) ?? null
          const rootMargin = opts.observerInit?.rootMargin
          if (targetEle) {
            const notEnough = checkElementInContainer(targetEle, container, rootMargin)
            if (notEnough) {
              loadMore()
            }
          }
        }
      }
      if (overReact18) {
        loadScreenData()
      } else {
        setTimeout(loadScreenData)
      }
    }
  })
  const [data, setData] = useState(fetchResult.data ?? [])
  const { run, ...rest } = omit(fetchResult, 'data', 'mutate')
  const loadMore = useEvent(run)
  const changePage = useEvent((arg: SetStateAction<number>) => {
    if (is.function(arg)) {
      setPage(p => {
        const next = arg(p)
        return Math.max(1, next)
      })
    } else {
      setPage(Math.max(1, arg))
    }
  })
  const changePageSize = useEvent((arg: SetStateAction<number>) => {
    setPageSize(arg)
  })

  const reset = useEvent(() => {
    setPage(1)
    setPageSize(initialPageSize)
    setNoMore(false)
  })

  const reload = useEvent(async () => {
    // Warning: flushSync was called from inside a lifecycle method.
    // React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.
    await Promise.resolve()
    flushSync(() => {
      reset()
      setData(p => {
        return (p?.slice(0, initialPageSize) ?? []) as T
      })
    })

    const resetScroll = () => {
      const root = opts.observerInit?.root
      if (root instanceof HTMLElement) {
        root.scrollTo(0, 0)
      }
    }
    if (overReact18) {
      resetScroll()
      await loadMore()
    } else {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          resetScroll()
          loadMore().then(resolve).catch(reject)
        })
      })
    }
  })

  return {
    data,
    page,
    pageSize,
    changePage,
    changePageSize,
    reload,
    reset,
    mutate: setData,
    noMore,
    loadMore,
    ...rest
  }
}
