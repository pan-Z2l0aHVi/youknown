import { createContext } from 'react'

import { FormInstance } from '@youknown/react-hook/src'

export interface FormContext {
	form: FormInstance
	labelWidth: string | number
	labelAlign: 'top' | 'left' | 'right'
	labelSuffix: string
}
export const FormCtx = createContext<Partial<FormContext>>({})
