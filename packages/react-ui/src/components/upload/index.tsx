import './upload.scss'

import {
	ChangeEventHandler,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	useRef,
	useState
} from 'react'
import { TbPlus } from 'react-icons/tb'

import { useComposeRef, useControllable } from '@youknown/react-hook/src'
import { cls, omit, uuid } from '@youknown/utils/src'

import { UI_PREFIX } from '../../constants'
import Loading from '../loading'

interface UploadAttr {
	uid: string | number
	url?: string
	status?: 'success' | 'error' | 'uploading'
}

interface UploadFile extends File, UploadAttr {}

interface UploadProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	disabled?: boolean
	defaultValue?: UploadFile[]
	value?: UploadFile[]
	onChange?: (value: UploadFile[]) => void
	accept?: InputHTMLAttributes<HTMLInputElement>['accept']
	multiple?: InputHTMLAttributes<HTMLInputElement>['multiple']
	action?: (file: File) => Promise<string>
	circle?: boolean
}

const Upload = (props: UploadProps, propRef: ForwardedRef<HTMLInputElement>) => {
	const {
		className,
		children,
		disabled = false,
		accept,
		multiple,
		action = async () => '',
		circle = false,
		...rest
	} = omit(props, 'value', 'onChange', 'defaultValue')

	const innerRef = useRef<HTMLInputElement>(null)
	const fileInputRef = useComposeRef(innerRef, propRef)
	const [uploading, setUploading] = useState(false)
	const [fileList, setFileList] = useControllable<UploadFile[]>(props, {
		defaultValue: []
	})

	const doUpload = (file: UploadFile) => {
		setUploading(true)
		action(file)
			.then(url => {
				file.url = url
				file.status = 'success'
				setFileList(p => [...p, file])
			})
			.catch(() => {
				file.status = 'error'
			})
			.finally(() => {
				setUploading(false)
			})
	}

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
		fileArr.forEach(doUpload)
	}

	const picURL = fileList?.[0]?.url
	const prefixCls = `${UI_PREFIX}-upload`

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-circle`]: circle
			})}
			{...rest}
		>
			<input
				className={`${prefixCls}-inner`}
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				accept={accept}
				disabled={disabled}
				onChange={handleChange}
			/>
			{!uploading && !picURL && <TbPlus className={`${prefixCls}-plus-icon`} />}
			{children || (
				<>
					<div className={`${prefixCls}-thumb-default`}>
						{uploading ? (
							<Loading spinning />
						) : (
							<>{picURL && <img className={cls(`${prefixCls}-thumb`)} src={picURL} />}</>
						)}
					</div>
				</>
			)}
		</label>
	)
}
Upload.displayName = 'Upload'
const RefUpload = forwardRef(Upload)
export default RefUpload
