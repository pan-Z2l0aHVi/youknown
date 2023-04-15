import { Net } from '@youknown/utils/src'

export const net = Net.create().use(async (ctx, next) => {
	await next()
})
