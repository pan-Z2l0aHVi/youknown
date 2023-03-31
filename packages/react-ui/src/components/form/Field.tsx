import React, {
	Children,
	cloneElement,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	LabelHTMLAttributes,
	useContext
} from 'react'
import { useUpdate, Form, FieldController } from '@youknown/react-hook/src'
import { cls } from '@youknown/utils/src'
import { UI_PREFIX } from '../../constants'
import { FormContext, FormCtx } from './FormCtx'
import './field.scss'

interface FieldProps
	extends Omit<LabelHTMLAttributes<HTMLLabelElement> & HTMLAttributes<HTMLDivElement>, 'form'>,
		Partial<FormContext> {
	label?: string
	labelText?: string
	form?: Form
}

const Field = forwardRef<HTMLLabelElement & HTMLDivElement, FieldProps>((props, propRef) => {
	const { className, children, form, label, labelText, labelWidth, labelAlign, labelSuffix, ...rest } = props

	const formCtx = useContext(FormCtx)
	const update = useUpdate()

	const labelAttrs = {
		width: labelWidth ?? formCtx.labelWidth ?? 200,
		align: labelAlign ?? formCtx.labelAlign ?? 'left',
		suffix: labelSuffix ?? formCtx.labelSuffix ?? ''
	}
	const prefixCls = `${UI_PREFIX}-field`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-align-${labelAttrs.align}`)

	const _form = form ?? formCtx.form
	if (!_form || !label)
		return (
			<div ref={propRef} className={wrapCls} {...rest}>
				<label className={`${prefixCls}-label`} style={{ width: labelAttrs.width }}>
					{labelText}
					{labelAttrs.suffix}
				</label>
				<div className={`${prefixCls}-control`}>
					<div className={`${prefixCls}-control-inner`}>{children}</div>
				</div>
			</div>
		)

	const child = Children.only(children)
	const controllerProps = _form.subscribe(label, {
		onChange() {
			update()
		}
	})

	return (
		<div ref={propRef} className={wrapCls} {...rest}>
			<label className={`${prefixCls}-label`} style={{ width: labelAttrs.width }}>
				{labelText}
				{labelAttrs.suffix}
			</label>
			<div className={`${prefixCls}-control`}>
				<div className={`${prefixCls}-control-inner`}>
					{isValidElement(child) && cloneElement(child, controllerProps)}
				</div>
				{/* <div className={`${prefixCls}-message`}>is required</div> */}
			</div>
		</div>
	)
})
Field.displayName = 'Field'
export default Field
