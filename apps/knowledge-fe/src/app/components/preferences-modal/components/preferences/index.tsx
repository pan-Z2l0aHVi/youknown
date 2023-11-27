import { THEME, useUIStore } from '@/stores'
import { Form, Select, Space } from '@youknown/react-ui/src'
import { cls, is } from '@youknown/utils/src'

const style_options: StyleItem[] = [
	{
		id: 1,
		radius: [0, 0, 0],
		desc: '直角'
	},
	{
		id: 2,
		radius: [2, 4, 6],
		desc: '圆角'
	},
	{
		id: 3,
		radius: [4, 8, 12],
		desc: '大圆角'
	}
]
const hue_options = ['#007aff', '#af52de', '#e55b9d', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#8e8e93']

interface StyleItem {
	id: 1 | 2 | 3
	radius: [number, number, number]
	desc: string
}
interface RadiusStyleProps {
	value?: StyleItem
	onChange?: (value: StyleItem) => void
}
function RadiusStyle(props: RadiusStyleProps) {
	const { value, onChange } = props
	if (value == null) return null

	return (
		<Space>
			{style_options.map(style => {
				const handleSelect = () => {
					onChange?.(style)
				}
				return (
					<div key={style.id} className="select-none cursor-pointer" onClick={handleSelect}>
						<div
							className={cls(
								'relative w-64px h-64px rd-radius-m overflow-hidden bg-bg-3',
								'before:absolute before:right--42% before:bottom--36% before:w-100% before:h-100% before:content-empty',
								'before:b-t-1 before:b-l-1 before:b-bd-line before:b-solid before:shadow-shadow-m before:bg-bg-1',
								style.id === 1 && 'before:rd-3px',
								style.id === 2 && 'before:rd-6px',
								style.id === 3 && 'before:rd-9px',
								value.id === style.id
									? 'b-1 b-solid b-primary shadow-[0_0_0_1px_var(--ui-color-primary)]'
									: 'b-1 b-solid b-bd-line'
							)}
						></div>
						<div className="color-text-2 mt-4px">{style.desc}</div>
					</div>
				)
			})}
		</Space>
	)
}

interface HueProps {
	value?: string
	onChange?: (value: string) => void
}
function Hue(props: HueProps) {
	const { value, onChange } = props
	if (value == null) return null

	return (
		<Space className="flex-wrap!">
			{hue_options.map(color => {
				const handleSelect = () => {
					onChange?.(color)
				}
				return (
					<div
						key={color}
						className={cls(
							'relative w-24px h-24px rd-full b-1 b-solid b-[rgba(0,0,0,0.1)] cursor-pointer',
							'mb-4px mt-4px',
							'before:absolute before:top-6px before:left-6px before:w-10px before:h-10px before:rd-full before:content-empty',
							value === color && 'before:bg-#fff before:shadow-shadow-s'
						)}
						style={{ backgroundColor: color }}
						onClick={handleSelect}
					></div>
				)
			})}
		</Space>
	)
}

export default function Preferences() {
	const theme = useUIStore(state => state.theme)
	const primary_color = useUIStore(state => state.primary_color)
	const radius = useUIStore(state => state.radius)
	const set_radius = useUIStore(state => state.set_radius)
	const set_hue = useUIStore(state => state.set_hue)
	const set_dark_theme = useUIStore(state => state.set_dark_theme)

	const form = Form.useForm({
		defaultState: {
			style: style_options.find(opt => is.array.equal(opt.radius, radius)) as StyleItem,
			hue: primary_color,
			theme
		},
		onStateChange(org) {
			const state = form.getState()

			switch (org.label) {
				case 'style':
					set_radius(state.style.radius)
					break

				case 'hue':
					set_hue(state.hue)
					break

				case 'theme':
					set_dark_theme(state.theme)
					break

				default:
					break
			}
		}
	})

	return (
		<Form className="w-480px h-480px max-w-[calc(100vw-32px)] p-24px" form={form} labelWidth={108}>
			<Form.Field label="style" labelText="界面风格">
				<RadiusStyle />
			</Form.Field>
			<Form.Field label="hue" labelText="色调">
				<Hue />
			</Form.Field>
			<Form.Field label="theme" labelText="主题">
				<Select
					options={[
						{
							label: '浅色',
							value: THEME.LIGHT
						},
						{
							label: '深色',
							value: THEME.DARK
						},
						{
							label: '跟随系统',
							value: THEME.SYSTEM
						}
					]}
				/>
			</Form.Field>
		</Form>
	)
}
