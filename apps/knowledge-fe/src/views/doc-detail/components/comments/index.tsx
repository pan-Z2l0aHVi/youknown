import { Avatar, Button, Input, Space, Tooltip } from '@youknown/react-ui/src'
import { useState } from 'react'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { TbPhoto, TbSend } from 'react-icons/tb'

interface CommentsProps {
	doc_id: string
}

export default function Comments(props: CommentsProps) {
	const { doc_id } = props

	const [text, set_text] = useState('')

	return (
		<div className="w-720px p-[24px_0] m-[0_auto] m-b-120px">
			<div className="flex items-start">
				<Avatar className="m-r-16px" round src="" />
				<div className="flex-1 m-r-16px">
					<Input.Textarea
						className="w-100%!"
						bordered={false}
						autosize
						minRows={2}
						maxRows={4}
						placeholder="文明发言，理性讨论"
						value={text}
						onChange={val => {
							set_text(val as string)
						}}
					/>

					<div className="flex justify-between m-t-8px">
						<Space>
							<Tooltip title="添加表情">
								<Button square>
									<RiEmotionHappyLine className="text-16px color-text-2" />
								</Button>
							</Tooltip>
							<Tooltip title="添加图片">
								<Button square>
									<TbPhoto className="text-16px color-text-2" />
								</Button>
							</Tooltip>
						</Space>
						<Button primary icon={<TbSend className="text-16px" />}>
							发表
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
