import { Form, Space, Switch } from '@youknown/react-ui/src'
import { cls, is } from '@youknown/utils/src'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { set_dark_theme, set_hue, set_radius } from '@/store/ui'

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
const hue_options = ['#007aff', '#af52de', '#ff2d55', '#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#8e8e93']

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
								'relative w-64px h-64px b-rd-radius-m overflow-hidden bg-bg-3',
								'before:absolute before:right--42% before:bottom--36% before:w-100% before:h-100% before:content-empty',
								'before:b-t-1 before:b-l-1 before:b-bd-line before:b-solid before:shadow-shadow-m before:bg-bg-1',
								style.id === 1 && 'before:b-rd-3px',
								style.id === 2 && 'before:b-rd-6px',
								style.id === 3 && 'before:b-rd-9px',
								value.id === style.id
									? 'b-1 b-solid b-primary shadow-[0_0_0_1px_var(--ui-color-primary)]'
									: 'b-1 b-solid b-bd-line'
							)}
						></div>
						<div className="color-text-2 m-t-4px">{style.desc}</div>
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
							'relative w-24px h-24px b-rd-round b-1 b-solid b-[rgba(0,0,0,0.1)] cursor-pointer',
							'm-b-4px m-t-4px',
							'before:absolute before:top-6px before:left-6px before:w-10px before:h-10px before:b-rd-round before:content-empty',
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
	const dispatch = useAppDispatch()
	const is_dark_theme = useAppSelector(state => state.ui.is_dark_theme)
	const primary_color = useAppSelector(state => state.ui.primary_color)
	const radius = useAppSelector(state => state.ui.radius)

	const form = Form.useForm({
		defaultState: {
			style: style_options.find(opt => is.array.equal(opt.radius, radius)) as StyleItem,
			hue: primary_color,
			is_dark: is_dark_theme
		},
		onStateChange(org) {
			const state = form.getState()

			switch (org.label) {
				case 'style':
					dispatch(set_radius(state.style.radius))
					break

				case 'hue':
					dispatch(set_hue(state.hue))
					break

				case 'is_dark':
					dispatch(set_dark_theme(state.is_dark))
					break

				default:
					break
			}
		}
	})

	return (
		<div className="w-480px h-560px max-w-[calc(100vw-32px)] p-24px">
			<Form form={form} labelWidth="108px">
				<Form.Field label="style" labelText="界面风格">
					<RadiusStyle />
				</Form.Field>
				<Form.Field label="hue" labelText="主色调">
					<Hue />
				</Form.Field>
				<Form.Field label="is_dark" labelText="夜间模式">
					<Switch />
				</Form.Field>
			</Form>
		</div>
	)
}
