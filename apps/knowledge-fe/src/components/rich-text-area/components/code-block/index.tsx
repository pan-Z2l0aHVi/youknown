import copy from 'copy-to-clipboard'
import hljs from 'highlight.js/lib/core'
import { HTMLAttributes, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineContentCopy } from 'react-icons/md'
import { TbCaretDownFilled } from 'react-icons/tb'

import { initHlsLangs } from '@/utils'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Collapse, Space, Toast } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
	language?: string
	code?: string
}
export default function CodeBlock(props: CodeBlockProps) {
	const { className, language = '', code = '', ...rest } = props

	const { t } = useTranslation()
	const [expand, { setReverse: toggle_expand }] = useBoolean(false)

	useLayoutEffect(() => {
		if (expand) {
			initHlsLangs().then(() => {
				hljs.highlightAll()
			})
		}
	}, [expand, language])

	const action_bar = (
		<div className={cls('flex justify-between items-center p-4px')}>
			<Space align="center" size="small">
				<Button size="small" text square onClick={toggle_expand}>
					<TbCaretDownFilled
						className="color-text-2"
						style={{ transform: `rotate(${expand ? -180 : 0}deg)` }}
					/>
				</Button>
				<span className="color-text-3 text-12px">{language}</span>
			</Space>
			<Button
				size="small"
				text
				prefixIcon={<MdOutlineContentCopy className="color-text-3" />}
				onClick={() => {
					copy(code)
					Toast.success(t('code.copy.success'))
				}}
			>
				<span className="text-12px color-text-3">{t('code.copy.text')}</span>
			</Button>
		</div>
	)

	return (
		<div className={cls('bg-bg-1 b-1 b-solid b-divider rd-radius-m overflow-hidden', className)} {...rest}>
			<Collapse.Panel bordered={false} custom={action_bar} expand={expand}>
				<pre className="m-0 b-0!">
					<code className="bg-bg-1!">{code}</code>
				</pre>
			</Collapse.Panel>
		</div>
	)
}
