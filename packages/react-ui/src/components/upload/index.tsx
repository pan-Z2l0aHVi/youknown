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
	previewURL?: string
	status?: 'success' | 'error' | 'uploading'
}

export interface UploadFile extends File, UploadAttr {}

interface UploadProps extends Omit<LabelHTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	disabled?: boolean
	defaultValue?: UploadFile[]
	value?: UploadFile[]
	onChange?: (value: UploadFile[]) => void
	accept?: InputHTMLAttributes<HTMLInputElement>['accept']
	multiple?: InputHTMLAttributes<HTMLInputElement>['multiple']
	action?: (file: File) => Promise<string>
	circle?: boolean
	headless?: boolean
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
		headless = false,
		...rest
	} = omit(props, 'value', 'onChange', 'defaultValue')

	const innerRef = useRef<HTMLInputElement>(null)
	const fileInputRef = useComposeRef(innerRef, propRef)
	const [uploading, setUploading] = useState(false)
	const [fileList, setFileList] = useControllable<UploadFile[]>(props, {
		defaultValue: []
	})

	const doUpload = (file: UploadFile) => {
		file.previewURL = URL.createObjectURL(file)
		setFileList(p => [...p, file])
		setUploading(true)
		action(file)
			.then(url => {
				setFileList(p =>
					p.map(item => {
						if (item.uid === file.uid) {
							file.url = url
							file.status = 'success'
							return file
						}
						return item
					})
				)
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

		const fileArr = Array.from(files).map<UploadFile>(file =>
			Object.assign(file, {
				status: 'uploading' as UploadAttr['status'],
				uid: uuid(),
				url: '',
				previewURL: ''
			})
		)
		fileArr.forEach(doUpload)
	}

	const lastFile = fileList?.[fileList.length - 1]
	const lastPicURL = lastFile?.url ?? ''
	const lastPreviewURL = lastFile?.previewURL ?? ''
	const prefixCls = `${UI_PREFIX}-upload`

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-headless`]: headless,
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
			{headless ? (
				children
			) : (
				<>
					<TbPlus className={`${prefixCls}-plus-icon`} />
					{children || (
						<div className={`${prefixCls}-thumb-default`}>
							{(lastPreviewURL || lastPicURL) && (
								<Loading spinning={uploading} className={`${prefixCls}-thumb-default-loading`}>
									<img className={cls(`${prefixCls}-thumb`)} src={lastPreviewURL || lastPicURL} />
								</Loading>
							)}
						</div>
					)}
				</>
			)}
		</label>
	)
}
Upload.displayName = 'Upload'
const RefUpload = forwardRef(Upload)
export default RefUpload
