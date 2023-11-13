import { useState } from 'react'

import { get_space_info } from '@/apis/space'
import { validateMaxLength, validateRequired } from '@/utils/validators'
import { useFetch } from '@youknown/react-hook/src'
import { Button, Form, Input, Loading, Space } from '@youknown/react-ui/src'

const SPACE_NAME_MAX_LEN = 15
const SPACE_DESC_MAX_LEN = 120

interface SpaceOptionsProps {
	hide_modal: () => void
	space_id?: string
	on_save: (name: string, desc: string) => Promise<void>
}
export default function SpaceOptions(props: SpaceOptionsProps) {
	const { hide_modal, space_id, on_save } = props
	const is_edit = !!space_id
	const [saving, set_saving] = useState(false)
	const form = Form.useForm({
		defaultState: {
			name: '',
			desc: ''
		},
		async onFulfilled(state) {
			set_saving(true)
			await on_save(state.name, state.desc)
			set_saving(false)
		}
	})
	const { loading } = useFetch(get_space_info, {
		ready: is_edit,
		params: [{ space_id: space_id! }],
		onSuccess(data) {
			form.setState({
				name: data.name,
				desc: data.desc
			})
		}
	})

	return (
		<Loading spinning={loading}>
			<Form className="w-392px p-24px" form={form} labelWidth={80}>
				<Form.Field
					label="name"
					labelText="空间名称"
					validators={[validateRequired(), validateMaxLength(SPACE_NAME_MAX_LEN)]}
				>
					<Input className="w-100%!" />
				</Form.Field>
				<Form.Field
					label="desc"
					labelText="简介"
					validators={[validateRequired(), validateMaxLength(SPACE_DESC_MAX_LEN)]}
				>
					<Input.Textarea className="w-100%!" autosize maxRows={4} />
				</Form.Field>
				<Form.Field className="mb-0!" labelText=" ">
					<Space>
						<Button className="min-w-80px" onClick={hide_modal}>
							取消
						</Button>
						<Button className="min-w-80px" type="submit" primary loading={saving}>
							{is_edit ? '保存' : '创建'}
						</Button>
					</Space>
				</Form.Field>
			</Form>
		</Loading>
	)
}
