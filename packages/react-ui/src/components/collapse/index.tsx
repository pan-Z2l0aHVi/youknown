import { cls, is } from '@youknown/utils/src'
import {
	Children,
	cloneElement,
	ComponentProps,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	useEffect,
	useState
} from 'react'
import { UI_PREFIX } from '../../constants'
import './collapse.scss'
import CollapsePanel from './CollapsePanel'

interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	accordion?: boolean
	defaultActives?: (string | number)[]
	actives?: (string | number)[]
	onChange?: (actives: (string | number)[]) => void
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, propRef) => {
	const { className, children, accordion = false, defaultActives = [], actives, onChange, ...rest } = props
	const [_actives, _setActives] = useState<(string | number)[]>(defaultActives)

	useEffect(() => {
		const isControlled = !is.undefined(actives)
		if (isControlled) _setActives(actives)
	}, [actives])

	const prefixCls = `${UI_PREFIX}-collapse`

	return (
		<div ref={propRef} className={cls(className, prefixCls)} {...rest}>
			{Children.map(children, child => {
				if (!isValidElement<ComponentProps<typeof CollapsePanel>>(child)) return child

				const { itemKey } = child.props
				if (is.undefined(itemKey)) return child

				return cloneElement<ComponentProps<typeof CollapsePanel>>(child, {
					expend: _actives.includes(itemKey),
					onChange(expend) {
						let nextActives = _actives
						if (expend) {
							nextActives = accordion ? [itemKey] : [..._actives, itemKey]
						} else {
							nextActives = _actives.filter(active => active !== itemKey)
						}
						_setActives(nextActives)
						onChange?.(nextActives)
					}
				})
			})}
		</div>
	)
})

const ExportCollapse = Collapse as typeof Collapse & {
	Panel: typeof CollapsePanel
}
ExportCollapse.Panel = CollapsePanel

export default ExportCollapse
