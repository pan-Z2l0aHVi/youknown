import './collapse.scss'

import { Children, cloneElement, ComponentProps, ForwardedRef, forwardRef, HTMLAttributes, isValidElement } from 'react'

import { useControllable } from '@youknown/react-hook/src'
import { cls, is, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import CollapsePanel from './CollapsePanel'

interface CollapseProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	accordion?: boolean
	defaultActives?: T[]
	actives?: T[]
	onChange?: (actives: T[]) => void
}

const Collapse = <T extends string | number>(props: CollapseProps<T>, propRef: ForwardedRef<HTMLDivElement>) => {
	const { className, children, accordion = false, ...rest } = omit(props, 'defaultActives', 'actives', 'onChange')
	const [actives, setActives] = useControllable<T[]>(props, {
		defaultValue: [],
		defaultValuePropName: 'defaultActives',
		valuePropName: 'actives'
	})

	const prefixCls = `${UI_PREFIX}-collapse`

	return (
		<div ref={propRef} className={cls(className, prefixCls)} {...rest}>
			{Children.map(children, child => {
				if (!isValidElement<ComponentProps<typeof CollapsePanel>>(child)) return child

				const itemKey = child.props.itemKey as T
				if (is.undefined(itemKey)) return child

				return cloneElement<ComponentProps<typeof CollapsePanel>>(child, {
					expend: actives.includes(itemKey),
					onChange(expend) {
						let nextActives = actives
						if (expend) {
							nextActives = accordion ? [itemKey] : [...actives, itemKey]
						} else {
							nextActives = actives.filter(active => active !== itemKey)
						}
						setActives(nextActives)
					}
				})
			})}
		</div>
	)
}
Collapse.displayName = 'Collapse'

const RefCollapse = forwardRef(Collapse)
const ExportCollapse = RefCollapse as typeof RefCollapse & {
	Panel: typeof CollapsePanel
}
ExportCollapse.Panel = CollapsePanel

export default ExportCollapse
