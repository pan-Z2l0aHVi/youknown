const MSG_EVENT = {
	WINDOW_CANCEL: 'window_cancel',
	WINDOW_OK: 'window_ok'
}

export function open_login_window<T>(url: string) {
	return new Promise<T>((resolve, reject) => {
		const new_window = window.open(url, '_blank', 'width=800,height=600')
		const msg_handler = (event: MessageEvent) => {
			if (event.source !== new_window) {
				return
			}
			console.log('event.data', event.data)

			switch (event.data.type) {
				case MSG_EVENT.WINDOW_CANCEL:
					reject(event.data.payload)
					window.removeEventListener('message', msg_handler)
					break

				case MSG_EVENT.WINDOW_OK:
					resolve(event.data.payload)
					window.removeEventListener('message', msg_handler)
					break

				default:
					break
			}
		}
		window.addEventListener('message', msg_handler)
	})
}

export function send_to_opener_window_ok<T>(payload?: T) {
	window.opener?.postMessage({
		type: MSG_EVENT.WINDOW_OK,
		payload
	})
}

export function send_to_opener_window_cancel<T>(payload?: T) {
	window.opener?.postMessage({
		type: MSG_EVENT.WINDOW_CANCEL,
		payload
	})
}
