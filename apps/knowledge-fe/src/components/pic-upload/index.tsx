import { useState } from 'react'

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
		<Upload action={upload_cover} defaultValue={[]}>
			<div className="flex items-center justify-center w-200px h-120px">
				{uploading ? (
					<Progress.Circle defaultMolecule={0} molecule={progress} />
				) : (
					value && <img className="w-100% h-100% object-cover" src={value} />
				)}
			</div>
		</Upload>
	)
}
