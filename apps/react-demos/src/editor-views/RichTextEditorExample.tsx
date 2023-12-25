import { useEffect } from 'react'

import {
	Blockquote,
	Bold,
	BulletList,
	Code,
	CodeBlock,
	Heading,
	Highlight,
	HorizontalRule,
	Image,
	Italic,
	Link,
	loadLanguages,
	OrderedList,
	RTE,
	Strike,
	Table,
	TextAlign,
	TextColor,
	Underline
} from '@youknown/react-rte/src'
import { Divider } from '@youknown/react-ui/src'
import { delay } from '@youknown/utils/src'

let index = -1
export default () => {
	const editor = RTE.use({
		extensions: [
			Heading,
			Bold,
			Strike,
			Italic,
			Underline,
			Code,
			Link,
			TextColor,
			Highlight,
			TextAlign,
			Blockquote,
			Image.configure({
				onCustomUpload: async () => {
					await delay(Math.random() * 3000)
					index++
					const imgList = [
						'http://jdvip-management.ac010.cn/uploads/attachment/20211101/10472062598268f11c2c4c48944cf8bc.png',
						'http://pic.5tu.cn/uploads/allimg/2010/pic_5tu_big_202009292005352919.jpg',
						'http://jdvip-management.ac010.cn/uploads/attachment/20211101/9eb077548fa6404ba0dd4e704ef196d5.gif'
					]
					if (index > imgList.length - 1) {
						index = 0
					}
					return {
						src: imgList[index]
					}
				}
			}),
			Table,
			BulletList,
			OrderedList,
			CodeBlock,
			HorizontalRule
		],
		placeholder: '请输入',
		content: '```javascript'
	})

	useEffect(() => {
		;(async () => {
			loadLanguages()
		})()
	}, [])

	return (
		<>
			<RTE.Menu editor={editor} />
			<Divider size="small" />
			<RTE.Content editor={editor} />
		</>
	)
}
