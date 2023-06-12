import { Tooltip } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { useContext } from 'react'
import { TbH1, TbH2, TbH3, TbH4, TbH5, TbH6 } from 'react-icons/tb'
import './index.scss'
import { UI_EDITOR_PREFIX } from '../../constants'
import ToolbarContext from '../../contexts/editorContext'

interface HeadingProps {
	level: 1 | 2 | 3 | 4 | 5 | 6
}

export default function Heading(props: HeadingProps) {
	const { level } = props
	const { editor } = useContext(ToolbarContext)
	const iconEle = {
		1: <TbH1 />,
		2: <TbH2 />,
		3: <TbH3 />,
		4: <TbH4 />,
		5: <TbH5 />,
		6: <TbH6 />
	}[level]
	const prefixCls = `${UI_EDITOR_PREFIX}-heading-btn`
	return (
		<Tooltip placement="bottom" title={`标题 ${level}`}>
			<div
				className={cls(prefixCls, {
					active: editor.isActive('heading', { level }),
					disabled: !editor.can().toggleHeading({ level })
				})}
				onClick={() => {
					editor.chain().focus().toggleHeading({ level }).run()
				}}
			>
				{iconEle}
			</div>
		</Tooltip>
	)
}
