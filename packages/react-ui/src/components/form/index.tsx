import { FormEvent, FormHTMLAttributes, forwardRef } from 'react'
import { cls, omit } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import './form.scss'
import { FormContext, FormCtx } from './FormCtx'
import { useForm, Form as FormType } from '@youknown/react-hook/src'
import Field from './Field'

interface FormProps extends FormHTMLAttributes<HTMLFormElement>, Omit<Partial<FormContext>, 'labelAlign'> {
	form: FormType
	layout?: 'horizontal' | 'vertical' | 'inline'
}

const Form = forwardRef<HTMLFormElement, FormProps>((props, propRef) => {
	const {
		className,
		children,
		layout = 'horizontal',
		form,
		labelSuffix,
		onSubmit,
		...rest
	} = omit(props, 'labelWidth')
	let { labelWidth } = props

	const prefixCls = `${UI_PREFIX}-form`

	let labelAlign: FormContext['labelAlign'] | undefined
	if (layout === 'horizontal') {
		labelAlign = 'right'
	} else if (layout === 'vertical') {
		labelAlign = 'top'
	} else if (layout === 'inline') {
		labelWidth = 'unset'
		labelAlign = 'left'
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		onSubmit?.(e)
		form.onSubmit(e)
	}

	return (
		<FormCtx.Provider
			value={{
				form,
				labelWidth,
				labelSuffix,
				labelAlign
			}}
		>
			<form
				ref={propRef}
				className={cls(className, prefixCls, `${prefixCls}-${layout}`)}
				onSubmit={handleSubmit}
				{...rest}
			>
				{children}
			</form>
		</FormCtx.Provider>
	)
})
Form.displayName = 'Form'

const ExportForm = Form as typeof Form & {
	Field: typeof Field
	useForm: typeof useForm
}
ExportForm.Field = Field
ExportForm.useForm = useForm
export default ExportForm
