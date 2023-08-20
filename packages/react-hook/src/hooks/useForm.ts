import { ChangeEvent, FormEventHandler, useCallback, useRef, useState } from 'react'

import { is, ValueOf } from '@youknown/utils/src'

import { useLatestRef } from './useLatestRef'

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

export function useForm<S extends State>(options: Options<S>): Form<S> {
	const opts = useLatestRef(options)

	const state = useRef<S>(opts.current.defaultState)
	const fields = useRef<Field<S>[]>([])
	const controllerMap = useRef<Partial<Record<Field<S>['label'], any>>>({})

	const getState = useCallback(() => state.current, [])

	const setState = useCallback((newState: Partial<S>) => {
		fields.current.forEach(field => {
			Object.entries(newState).forEach(([key, value]) => {
				if (key === field.label) {
					const controller = controllerMap.current[key]
					controller?.onChange(value)
				}
			})
		})
	}, [])

	const reset = useCallback(() => {
		setState(opts.current.defaultState)
	}, [opts, setState])

	const submit = useCallback(() => {
		opts.current.onFulfilled?.(state.current)
	}, [opts])

	const onSubmit: FormEventHandler = useCallback(
		event => {
			event.preventDefault()
			event.stopPropagation()
			submit()
		},
		[submit]
	)

	const subscribe = useCallback(
		(label: Field<S>['label'], options: Field<S>['options']) => {
			const field: Field<S> = { label, options }
			fields.current.push(field)
			const controller: FieldController<S> = {
				onChange(arg) {
					let val = arg
					if ((arg as controllerChangeEvent)?.nativeEvent instanceof Event)
						val = (arg as controllerChangeEvent).target.value as ValueOf<S>

					state.current[label] = val as ValueOf<S>
					opts.current.onStateChange?.(field)
					options.onChange?.(val)
				}
			}

			if (is.undefined(state.current[label])) {
				controller.defaultValue = opts.current.defaultState[label]
			} else {
				controller.value = state.current[label]
			}
			controllerMap.current[label] = controller
			return controller
		},
		[opts]
	)
	const unsubscribe = useCallback((label: string) => {
		fields.current = fields.current.filter(field => field.label !== label)
		delete controllerMap.current[label]
	}, [])

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
