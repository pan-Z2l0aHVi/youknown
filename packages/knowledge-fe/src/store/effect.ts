import { delay } from '@youknown/utils/src'
import store from './index'
import { hide_progress, set_progress_per, show_progress } from './ui'
const { getState, dispatch } = store

export const start_progress = () => async () => {
	const rollDelay = () => {
		const duration = Math.random() * 1500 + 500
		return delay(duration)
	}
	const rollStep = async () => {
		const { progress_per, progress_visible } = getState().ui
		const nextPer = Math.min(progress_per + Math.round(Math.random() * 20))
		if (nextPer > 95 || !progress_visible) return
		dispatch(set_progress_per(nextPer))
		await rollDelay()
		rollStep()
	}
	dispatch(set_progress_per(0))
	dispatch(show_progress())
	await delay(0) // prevent batching update
	rollStep()
}

let timer = 0
export const stop_progress = () => () =>
	new Promise(resolve => {
		dispatch(set_progress_per(100))
		clearTimeout(timer)
		timer = window.setTimeout(() => {
			dispatch(hide_progress())
			resolve(timer)
		}, 300)
	})
