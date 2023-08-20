import { ChangeEvent, FormEventHandler, useRef, useState } from 'react'

import { is, ValueOf } from '@youknown/utils/src'

import { useCreation } from './useCreation'
import { useEvent } from './useEvent'

interface State {
	[key: string]: any
}
interface FieldOptions<S> {
	onChange?(arg: ValueOf<S> | controllerChangeEvent): void
}
interface Field<S> {
	label: keyof S
	options: FieldOptions<S>
}
type controllerChangeEvent = ChangeEvent<HTMLSelectElement | HTMLInputElement>
interface Options<S> {
	defaultState: S
	onFulfilled?(state: S): void
	onFailed?(): void
	onStateChange?(org: Field<S>): void
}
interface FieldController<S = any> {
	defaultValue?: ValueOf<S>
	value?: ValueOf<S>
	onChange(arg: ValueOf<S> | controllerChangeEvent): void
}
export interface Form<S = any> {
	submit(): void
	getState(): S
	setState(state: Partial<S>): void
	onSubmit: FormEventHandler<Element>
	subscribe(label: Field<S>['label'], options?: Field<S>['options']): FieldController<S>
	unsubscribe(label: string): void
	reset(): void
}

export function useForm<S extends State>(opts: Options<S>): Form<S> {
	const defaultState = useCreation(() => opts.defaultState)
	// shallow copy
	const state = useRef<S>({ ...defaultState })
	const fields = useRef<Field<S>[]>([])
	const controllerMap = useRef<Partial<Record<Field<S>['label'], any>>>({})

	const getState = useEvent(() => state.current)

	const setState = useEvent((newState: Partial<S>) => {
		fields.current.forEach(field => {
			Object.entries(newState).forEach(([key, value]) => {
				if (key === field.label) {
					const controller = controllerMap.current[key]
					controller?.onChange(value)
				}
			})
		})
	})

	const reset = useEvent(() => {
		setState(defaultState)
	})

	const submit = useEvent(() => {
		opts.onFulfilled?.(state.current)
	})

	const onSubmit: FormEventHandler = useEvent(event => {
		event.preventDefault()
		event.stopPropagation()
		submit()
	})

	const subscribe = useEvent((label: Field<S>['label'], options: Field<S>['options']) => {
		const field: Field<S> = { label, options }
		fields.current.push(field)
		const controller: FieldController<S> = {
			onChange(arg) {
				let val = arg
				if ((arg as controllerChangeEvent)?.nativeEvent instanceof Event)
					val = (arg as controllerChangeEvent).target.value as ValueOf<S>

				state.current[label] = val as ValueOf<S>
				opts.onStateChange?.(field)
				options.onChange?.(val)
			}
		}

		if (is.undefined(state.current[label])) {
			controller.defaultValue = defaultState[label]
		} else {
			controller.value = state.current[label]
		}
		controllerMap.current[label] = controller
		return controller
	})

	const unsubscribe = useEvent((label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
		delete controllerMap.current[label]
	})

	const [form] = useState({
		submit,
		getState,
		setState,
		onSubmit,
		subscribe,
		unsubscribe,
		reset
	})
	return form
}
