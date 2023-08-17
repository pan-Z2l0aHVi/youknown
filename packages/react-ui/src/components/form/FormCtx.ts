import { createContext } from 'react'

import { Form } from '@youknown/react-hook/src'

export interface FormContext {
	form: Form
	labelWidth: string
	labelAlign: 'top' | 'left' | 'right'
	labelSuffix: string
}
export const FormCtx = createContext<Partial<FormContext>>({})
