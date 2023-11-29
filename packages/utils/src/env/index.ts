export function checkMobile(): boolean {
	const ua = navigator.userAgent.toLocaleLowerCase()
	return !!ua.match(/(android, iphone, ipod, ipad, symbianos, windows phone)/i)
}

export function checkAppleMobile(): boolean {
	const ua = navigator.userAgent
	return !!ua.match(/(iPhone|iPad|iPod|iOS)/i)
}

export function checkAndroidMobile(): boolean {
	const ua = navigator.userAgent
	return !!ua.match(/(Android)/i)
}

export function checkPWA(): boolean {
	return window.matchMedia('(display-mode: standalone)').matches
}

export function checkHoverSupported(): boolean {
	return window.matchMedia('(hover: hover)').matches
}
