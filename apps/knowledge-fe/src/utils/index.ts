import dayjs from 'dayjs'

import { Toast } from '@youknown/react-ui/src'
import { is, QS, storage, uuid } from '@youknown/utils/src'

import { open_login_window } from './correspond'

export const go_github_login = async () => {
	const state = uuid()
	storage.session.set('state', state)
	const url = QS.stringify({
		base: 'https://github.com/login/oauth/authorize',
		query: {
			client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
			redirect_uri: `${location.origin}/login-success`,
			state
		}
	})
	try {
		await open_login_window<string>(url)
		Toast.success({ content: '授权登陆成功' })
	} catch (error) {
		Toast.error({ content: '授权登陆失败' })
	}
}

export const format_time = (timing: number | string): string => {
	let date: dayjs.Dayjs
	if (is.number(timing)) {
		date = dayjs(timing)
	} else if (is.string(timing)) {
		date = dayjs(timing)
	} else {
		return timing
	}
	const now = dayjs()
	const formatter = 'HH:mm' // 时间格式，可以根据需要修改

	if (date.isSame(now, 'day')) {
		return `今天 ${date.format(formatter)}`
	}
	if (date.isSame(now.subtract(1, 'day'), 'day')) {
		return `昨天 ${date.format(formatter)}`
	}
	if (date.isSame(now.subtract(2, 'day'), 'day')) {
		return `前天 ${date.format(formatter)}`
	}
	if (date.diff(now, 'year') > 1) {
		return date.format(`YYYY年MM月DD日 ${formatter}`)
	}
	return date.format(`MM月DD日 ${formatter}`)
}
