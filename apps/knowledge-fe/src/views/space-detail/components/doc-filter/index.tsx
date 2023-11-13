import { FormInstance } from '@youknown/react-hook/src'
import { Button, Form, Input, Select, Space } from '@youknown/react-ui/src'

interface DocFilterProps {
	form: FormInstance
	loading: boolean
	on_cancel: () => void
}
export default function DocFilter(props: DocFilterProps) {
	const { form, loading, on_cancel } = props

	return (
		<div className="p-[32px_24px_32px_16px]">
			<Form form={form} labelWidth={120}>
				<Form.Field label="keywords" labelText="关键词">
					<Input placeholder="请输入" />
				</Form.Field>
				<Form.Field label="sort_by" labelText="排序方式">
					<Select
						className="w-160px!"
						options={[
							{
								label: '编辑日期',
								value: 'update_time'
							},
							{
								label: '创建日期',
								value: 'creation_time'
							}
						]}
					/>
				</Form.Field>
				<Form.Field label="sort_type" labelText="顺序">
					<Select
						className="w-200px!"
						options={[
							{
								label: '最新的排在前',
								value: 'desc'
							},
							{
								label: '最旧的排在前',
								value: 'asc'
							}
						]}
					/>
				</Form.Field>
				<Form.Field labelText=" ">
					<Space>
						<Button className="min-w-80px" onClick={on_cancel}>
							取消
						</Button>
						<Button className="min-w-80px" type="submit" primary loading={loading}>
							筛选
						</Button>
					</Space>
				</Form.Field>
			</Form>
		</div>
	)
}
