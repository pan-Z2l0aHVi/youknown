import { ComponentProps, useState } from 'react'

import { upload_file } from '@/utils/qiniu'
import { useBoolean } from '@youknown/react-hook/src'
import { Progress, Upload } from '@youknown/react-ui/src'

interface PicUploadProps {
	value?: string
	onChange?: (value: string) => void
}
export default function PicUpload(props: PicUploadProps) {
	const { value = '', onChange } = props

	const [uploading, { setTrue: start_uploading, setFalse: stop_uploading }] = useBoolean(false)
	const [progress, set_progress] = useState(0)
	type UploadFile = Required<ComponentProps<typeof Upload>>['value']
	const [file_list, set_file_list] = useState<UploadFile>([])
	const preview_url = file_list[file_list.length - 1]?.previewURL ?? ''

	const upload_cover = (file: File) => {
		return new Promise<string>((resolve, reject) => {
			start_uploading()
			upload_file(file, {
				progress(progress) {
					set_progress(progress.total.percent)
				},
				complete(url) {
					resolve(url)
					stop_uploading()
					set_progress(0)
					onChange?.(url)
				},
				error(err) {
					reject(err)
					stop_uploading()
					set_progress(0)
				}
			})
		})
	}

	return (
		<Upload action={upload_cover} value={file_list} onChange={set_file_list}>
			<div className="relative flex items-center justify-center w-200px h-120px">
				{uploading ? (
					<>
						{preview_url && <img className="w-100% h-100% object-cover opacity-40" src={preview_url} />}
						<Progress.Circle
							className="absolute! left-50% top-50% translate-x--50% translate-y--50%"
							defaultMolecule={0}
							molecule={progress}
						/>
					</>
				) : (
					value && <img className="w-100% h-100% object-cover" src={value} />
				)}
			</div>
		</Upload>
	)
}
