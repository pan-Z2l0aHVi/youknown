import { useComposeRef } from '@youknown/react-hook/src'
import { cls, is, uuid } from '@youknown/utils/src'
import {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	useEffect,
	useRef,
	useState
} from 'react'
import { UI_PREFIX } from '../../constants'
import './upload.scss'

interface UploadAttr {
	uid: string | number
	url?: string
	status?: 'success' | 'error' | 'uploading'
}

interface UploadFile extends File, UploadAttr {}

interface UploadProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	defaultValue?: UploadFile[]
	value?: UploadFile[]
	onChange?: (value: UploadFile[]) => void
	accept?: InputHTMLAttributes<HTMLInputElement>['accept']
	action?: (file: File) => Promise<string>
}

const Upload = forwardRef<HTMLInputElement, UploadProps>((props, propRef) => {
	const {
		className,
		size = 'medium',
		disabled = false,
		defaultValue,
		value = [],
		onChange,
		accept,
		action = async () => '',
		...rest
	} = props

	const isControlled = is.undefined(defaultValue)
	const innerRef = useRef<HTMLInputElement>(null)
	const fileInputRef = useComposeRef(innerRef, propRef)
	const defaultFileList = isControlled ? value : defaultValue ?? []
	const [fileList, setFileList] = useState(defaultFileList)

	useEffect(() => {
		if (isControlled) setFileList(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { files } = event.target
		if (!files || !files.length) return

		const fileArr = Array.from(files).map(file =>
			Object.assign(file, {
				status: 'uploading' as UploadAttr['status'],
				uid: uuid(),
				url: ''
			})
		)
		fileArr.forEach(file => {
			action(file)
				.then(url => {
					file.url = url
					file.status = 'success'
					setFileList(p => {
						// const nextFileList = [...p, file]
						// setTimeout(() => {
						// 	onChange?.(nextFileList)
						// })
						return [...p, file]
					})
					onChange?.([...fileList, file])
				})
				.catch(() => {
					file.status = 'error'
				})
		})
	}

	const picURL = value?.[0]?.url
	const prefixCls = `${UI_PREFIX}-upload`

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled
			})}
			{...rest}
		>
			<input
				className={`${prefixCls}-inner`}
				ref={fileInputRef}
				type="file"
				accept={accept}
				disabled={disabled}
				onChange={handleChange}
			/>
			{picURL && <img className={cls(`${prefixCls}-thumb`)} src={picURL} />}
		</label>
	)
})
Upload.displayName = 'Upload'
export default Upload
