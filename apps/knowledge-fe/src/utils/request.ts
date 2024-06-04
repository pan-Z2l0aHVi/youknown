import { Toast } from '@youknown/react-ui/src'
import type { ArgumentType } from '@youknown/utils/src'
import { headers2Obj, Net } from '@youknown/utils/src'

import { B_CODE } from '@/consts'
import { useModalStore, useUserStore } from '@/stores'
import { get_local_token } from '@/utils/local'

const { t } = await import('i18next')

interface Cause {
  code: number
  data: unknown
  msg: string
}

export class NetFetchError extends Error {
  public cause: Cause
  constructor(cause: Cause) {
    super('Net fetch error', {
      cause
    })
    this.cause = cause
  }
}

interface CancelListItem {
  key: string
  controller: AbortController
}
let cancel_list: CancelListItem[] = []

export const cancel_requests = (pathname: string) => {
  const next_cancel_list: CancelListItem[] = []
  cancel_list.forEach(item => {
    const { key, controller } = item
    if (key === pathname) {
      next_cancel_list.push(item)
    } else {
      controller.abort()
    }
  })
  return next_cancel_list
}

export const net = Net.create({
  timeout: import.meta.env.DEV ? 30000 : 10000
})
  .use(async (ctx, next) => {
    const token = get_local_token()
    if (token) {
      const headers = new Headers(ctx.req.configure.headers)
      headers.append('Authorization', token)
      ctx.req.configure.headers = headers2Obj(headers)
    }
    await next()
  })
  .use(async (ctx, next) => {
    const global: boolean = ctx.req.configure?.global ?? false
    if (global) {
      await next()
    } else {
      const controller = new AbortController()
      ctx.req.configure.signal = controller.signal
      const request_key = location.pathname
      cancel_list.push({ key: request_key, controller })
      await next()
      cancel_list = cancel_list.filter(item => item.key === request_key)
    }
  })
  .use(async (ctx, next) => {
    const silent: boolean = ctx.req.configure?.silent ?? false

    await next()

    if (ctx.err) {
      if (ctx.err.name === 'AbortError') {
        return
      }
      Toast.error(t('network.error'))
      return
    }
    switch (ctx.data?.code) {
      case B_CODE.SUCCESS:
        ctx.data = ctx.data.data
        break

      case B_CODE.NOT_AUTH:
        ctx.err = new NetFetchError(ctx.data)
        useUserStore.getState().do_logout()
        Toast.error(t('login.no_auth'))
        useModalStore.getState().open_login_modal()
        break

      default:
        ctx.err = new NetFetchError(ctx.data)
        if (!silent && ctx.data.msg) {
          Toast.error(ctx.data.msg)
        }
        break
    }
  })

export const with_api =
  <T extends (...args: any[]) => Promise<any>>(fetcher: T) =>
  async (...args: ArgumentType<T>[]): Promise<[null, Awaited<ReturnType<T>>] | [NetFetchError, null]> => {
    try {
      const res: Awaited<ReturnType<T>> = await fetcher(...args)
      return [null, res]
    } catch (err) {
      return [err as NetFetchError, null]
    }
  }
