type Validator = (value: string) => Promise<string | void>

export const validateRequired = (): Validator => async value => {
	if (value.trim() === '') {
		return Promise.reject('必填项')
	}
}

export const validateMaxLength =
	(max: number): Validator =>
	async value => {
		if (value.length > max) {
			return Promise.reject(`长度不能超过${max}字`)
		}
	}

export const validateAlphaNumeric = (): Validator => async (value: string) => {
	const regex = /^[A-Za-z0-9]+$/
	if (!regex.test(value)) {
		return Promise.reject('只能包含字母和数字')
	}
}

export const validatePhoneNumber = (): Validator => async (value: string) => {
	const regex = /^[1][3-9]\d{9}$/
	if (!regex.test(value)) {
		return Promise.reject('不是有效的手机号码')
	}
}
