import { QS, uuid } from '@youknown/utils/src'
import { open_login_window } from './correspond'

export const go_github_login = async () => {
	const url = QS.stringify({
		base: 'https://github.com/login/oauth/authorize',
		query: {
			client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
			state: uuid(),
			redirect_uri: 'http://127.0.0.1:5173/login-success'
		}
	})
	await open_login_window<string>(url)
}
