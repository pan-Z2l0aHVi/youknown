import { Net, QS, headers2Obj, uuid } from '@youknown/utils/src'

export const net = Net.create()
	.use(async (ctx, next) => {
		const headers = new Headers(ctx.req.configure.headers)
		headers.append('token', 'aaaaa')
		ctx.req.configure.headers = headers2Obj(headers)
		await next()
	})
	.use(async (ctx, next) => {
		await next()
		console.log('net data', ctx.data)
		if (!ctx.err) {
			if (ctx.data?.code === 0) {
				ctx.data = ctx.data.data
			} else {
				ctx.err = ctx.data
			}
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
