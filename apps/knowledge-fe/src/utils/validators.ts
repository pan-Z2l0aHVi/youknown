const { t } = await import('i18next')

type Validator = (value: string) => Promise<string | void>

export const validateRequired = (): Validator => async value => {
	if (value.trim() === '') {
		return Promise.reject(t('validate.required'))
	}
}

export const validateMaxLength =
	(max: number): Validator =>
	async value => {
		if (value.length > max) {
			return Promise.reject(t('validate.max_len', { max }))
		}
	}

export const validateAlphaNumeric = (): Validator => async (value: string) => {
	const regex = /^[A-Za-z0-9]+$/
	if (!regex.test(value)) {
		return Promise.reject(t('validate.letters_and_numbers'))
	}
}

export const validateCNPhoneNumber = (): Validator => async (value: string) => {
	const regex = /^[1][3-9]\d{9}$/
	if (!regex.test(value)) {
		return Promise.reject(t('validate.phone'))
	}
}
