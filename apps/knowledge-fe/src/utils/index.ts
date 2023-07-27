import { B_CODE } from '@/consts'
import { get_local_token, remove_local_token } from '@/libs/local'
import { Net, QS, headers2Obj, uuid } from '@youknown/utils/src'

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
				remove_local_token()
				break

			default:
				ctx.err = ctx.data
				break
		}
	})

export const go_github_login = () => {
	const url = QS.stringify({
		base: `https://github.com/login/oauth/authorize`,
		query: {
			client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
			state: uuid(),
			redirect_uri: 'http://127.0.0.1:5173/browse'
		}
	})
	location.href = url
}
