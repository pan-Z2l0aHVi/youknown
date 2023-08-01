import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loading } from '@youknown/react-ui/src'
import { send_to_opener_window_cancel, send_to_opener_window_ok } from '@/utils/correspond'
import { login } from '@/apis/user'
import { set_local_token } from '@/utils/local'

export default function LoginSuccess() {
	const [search_params, set_search_params] = useSearchParams()

	useEffect(() => {
		const beforeunload_handler = () => {
			send_to_opener_window_cancel()
		}
		window.addEventListener('beforeunload', beforeunload_handler)
		return () => {
			window.removeEventListener('beforeunload', beforeunload_handler)
		}
	}, [])

	useEffect(() => {
		const state = search_params.get('state')
		if (state) {
			set_search_params(pre => {
				pre.delete('state')
				return pre
			})
		}
		const code = search_params.get('code')
		if (code) {
			set_search_params(pre => {
				pre.delete('code')
				return pre
			})
			login({ type: 1, code })
				.then(({ token }) => {
					set_local_token(token)
					send_to_opener_window_ok(token)
				})
				.catch(() => {
					send_to_opener_window_cancel()
				})
				.finally(() => {
					window.close()
				})
		}
	}, [search_params, set_search_params])

	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center">
			<Loading spinning size="large" />
			<h2 className="mt-24px">正在登录...</h2>
		</div>
	)
}
