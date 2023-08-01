import { B_CODE } from '@/consts'
import { get_local_token } from '@/utils/local'
import store from '@/store'
import { do_logout } from '@/store/user'
import { Net, headers2Obj } from '@youknown/utils/src'

export const net = Net.create()
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
				ctx.err = ctx.data
				store.dispatch(do_logout())
				break

			default:
				ctx.err = ctx.data
				break
		}
	})
