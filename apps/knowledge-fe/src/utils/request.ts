import { B_CODE } from '@/consts'
import store from '@/store'
import { do_logout } from '@/store/user'
import { get_local_token } from '@/utils/local'
import { headers2Obj, Net } from '@youknown/utils/src'

interface Cause {
	code: number
	data: any
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

export const net = Net.create({
	timeout: 10000
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
		await next()
		if (ctx.err) {
			return
		}
		switch (ctx.data?.code) {
			case B_CODE.SUCCESS:
				ctx.data = ctx.data.data
				break

			case B_CODE.NOT_AUTH:
				ctx.err = new NetFetchError(ctx.data)
				store.dispatch(do_logout())
				break

			default:
				ctx.err = new NetFetchError(ctx.data)
				break
		}
	})
