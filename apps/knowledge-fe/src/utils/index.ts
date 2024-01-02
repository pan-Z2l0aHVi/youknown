import dayjs from 'dayjs'

import { is, QS, storage, uuid } from '@youknown/utils/src'

import { open_login_window } from './correspond'

const { t } = await import('i18next')

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
	await open_login_window<string>(url)
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
	const formatter = 'HH:mm'

	if (date.isSame(now, 'day')) {
		return `${t('time.today')} ${date.format(formatter)}`
	}
	if (date.isSame(now.subtract(1, 'day'), 'day')) {
		return `${t('time.yesterday')} ${date.format(formatter)}`
	}
	if (date.isSame(now.subtract(2, 'day'), 'day')) {
		return `${t('time.before_yesterday')} ${date.format(formatter)}`
	}
	if (date.diff(now, 'year') > 1) {
		return date.format(`${t('time.year_date')} ${formatter}`)
	}
	return date.format(`${t('time.month_date')} ${formatter}`)
}

export function parse_file_size_kb(file: File) {
	const fileSizeInBytes = file.size
	return fileSizeInBytes / 1024
}

export function parse_file_size_mb(file: File) {
	const fileSizeInKB = parse_file_size_kb(file)
	return fileSizeInKB / 1024
}

let langs_ready = false
export async function initHlsLangs() {
	if (langs_ready) {
		return
	}
	const { loadLanguages } = await import('@youknown/react-rte/src')
	await loadLanguages()
	langs_ready = true
}
