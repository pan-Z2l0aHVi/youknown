import './collapse.scss'

import { Children, cloneElement, ComponentProps, forwardRef, HTMLAttributes, isValidElement } from 'react'

import { useControllable } from '@youknown/react-hook/src'
import { cls, is, omit } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import CollapsePanel from './CollapsePanel'

interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	accordion?: boolean
	defaultActives?: (string | number)[]
	actives?: (string | number)[]
	onChange?: (actives: (string | number)[]) => void
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, propRef) => {
	const { className, children, accordion = false, ...rest } = omit(props, 'defaultActives', 'actives', 'onChange')
	const [actives, setActives] = useControllable<(string | number)[]>(props, {
		defaultValue: [],
		defaultValuePropName: 'defaultActives',
		valuePropName: 'actives'
	})

	const prefixCls = `${UI_PREFIX}-collapse`

	return (
		<div ref={propRef} className={cls(className, prefixCls)} {...rest}>
			{Children.map(children, child => {
				if (!isValidElement<ComponentProps<typeof CollapsePanel>>(child)) return child

				const { itemKey } = child.props
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
})
Collapse.displayName = 'Collapse'

const ExportCollapse = Collapse as typeof Collapse & {
	Panel: typeof CollapsePanel
}
ExportCollapse.Panel = CollapsePanel

export default ExportCollapse
