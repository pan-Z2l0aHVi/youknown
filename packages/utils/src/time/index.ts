/**
 * 防抖
 */
export function debounce<F extends (...args: any) => void>(fn: F, wait = 0): (...args: Parameters<F>) => void {
	let timer = 0
	return function (...args) {
		if (!wait) {
			fn.apply(this, args)
			return
		}
		if (!timer) {
			fn.apply(this, args)
			clearTimeout(timer)
			timer = window.setTimeout(() => {
				timer = 0
			}, wait)
		} else {
			clearTimeout(timer)
			timer = window.setTimeout(() => {
				fn.apply(this, args)
				timer = window.setTimeout(() => {
					timer = 0
				}, wait)
			}, wait)
		}
	}
}

/**
 * 节流
 */
export function throttle<F extends (...args: any) => void>(fn: F, wait = 0): (...args: Parameters<F>) => void {
	let lastTime = new Date().getTime()
	return function (...args) {
		if (!wait) {
			fn.apply(this, args)
			return
		}
		const now = new Date().getTime()
		if (now - lastTime > wait) {
			lastTime = now
			fn.apply(this, args)
		}
	}
}

/**
 * 延时
 */
export function delay(duration = 0): Promise<void> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration)
	})
}
