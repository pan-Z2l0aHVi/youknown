import { Net } from '@youknown/utils/src'

export const net = Net.create({
	baseURL: 'http://localhost:8080'
}).use(async (ctx, next) => {
	await next()
	console.log('net data', ctx.data)
	if (ctx.err) {
	} else {
		if (ctx.data?.code === 0) {
			ctx.data = ctx.data.data
		} else {
			ctx.err = ctx.data
		}
	}
})
