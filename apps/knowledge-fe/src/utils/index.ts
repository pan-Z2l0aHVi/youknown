import dayjs from 'dayjs'

import { QS, storage, uuid } from '@youknown/utils/src'

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
	const date = dayjs(timing)
	if (!date.isValid()) {
		return String(timing)
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
	if (date.isSame(now, 'year')) {
		return date.format(`${t('time.month_date')} ${formatter}`)
	}
	return date.format(`${t('time.year_date')} ${formatter}`)
}

export function format_file_size(size: number) {
	if (size > 1024 * 1024) {
		return `${parse_file_size_mb(size).toFixed(1)} MB`
	}
	return `${parse_file_size_kb(size).toFixed(1)} KB`
}

export function parse_file_size_kb(size: number) {
	const fileSizeInBytes = size
	return fileSizeInBytes / 1024
}

export function parse_file_size_mb(size: number) {
	const fileSizeInKB = parse_file_size_kb(size)
	return fileSizeInKB / 1024
}

let langs_ready = false
export async function initHlsLangs() {
	if (langs_ready) {
		return
	}
	const { loadLanguages } = await import('@youknown/react-rte/src/utils/load-langs')
	await loadLanguages()
	langs_ready = true
}
