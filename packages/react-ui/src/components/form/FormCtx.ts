import { Form } from '@youknown/react-hook/src'
import { createContext } from 'react'

export interface FormContext {
	form: Form
	labelWidth: string
	labelAlign: 'top' | 'left' | 'right'
	labelSuffix: string
}
export const FormCtx = createContext<Partial<FormContext>>({})
