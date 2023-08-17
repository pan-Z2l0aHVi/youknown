import { delay } from '@youknown/utils/src'

import { AppDispatch, AppGetState } from '../'
import { hide_progress, set_progress_per, show_progress } from './slice'

export const start_progress = () => async (dispatch: AppDispatch, getState: AppGetState) => {
	const roll_delay = () => {
		const duration = Math.random() * 1500 + 500
		return delay(duration)
	}
	const roll_step = async () => {
		const { progress_per, progress_visible } = getState().ui
		const next_per = Math.min(progress_per + Math.round(Math.random() * 20))
		if (next_per > 95 || !progress_visible) {
			return
		}
		dispatch(set_progress_per(next_per))
		await roll_delay()
		roll_step()
	}
	dispatch(set_progress_per(0))
	dispatch(show_progress())
	await delay(0) // Prevent batching update
	roll_step()
}

let timer = 0
export const stop_progress = () => (dispatch: AppDispatch) =>
	new Promise(resolve => {
		dispatch(set_progress_per(100))
		clearTimeout(timer)
		timer = window.setTimeout(() => {
			dispatch(hide_progress())
			resolve(timer)
		}, 300)
	})
