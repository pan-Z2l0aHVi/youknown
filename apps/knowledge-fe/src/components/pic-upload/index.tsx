import { ComponentProps, useState } from 'react'

import { IMAGE_ACCEPT } from '@/consts'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { Image, Progress, Upload } from '@youknown/react-ui/src'

interface PicUploadProps {
	value?: string
	onChange?: (value: string) => void
	uploading: boolean
	set_uploading: (uploading: boolean) => void
}
export default function PicUpload(props: PicUploadProps) {
	const { value = '', onChange, uploading, set_uploading } = props

	const [progress, set_progress] = useState(0)
	type UploadFile = Required<ComponentProps<typeof Upload>>['value']
	const [file_list, set_file_list] = useState<UploadFile>([])
	const preview_url = file_list[file_list.length - 1]?.previewURL ?? ''

	const upload_cover = (file: File) =>
		new Promise<string>(async (resolve, reject) => {
			set_uploading(true)
			try {
				const { compressImage } = await import('@youknown/img-wasm/src')
				const compressed_file = await compressImage(file, 1600, 1200)
				upload_cloudflare_r2(compressed_file, {
					progress(progress) {
						set_progress(progress.percent)
					},
					complete(url) {
						set_uploading(false)
						set_progress(0)
						onChange?.(url)
						resolve(url)
					},
					error(err) {
						set_uploading(false)
						set_progress(0)
						reject(err)
					}
				})
			} catch (err) {
				reject(err)
				set_uploading(false)
				set_progress(0)
			}
		})

	return (
		<Upload accept={IMAGE_ACCEPT} action={upload_cover} value={file_list} onChange={set_file_list}>
			<div className="relative flex items-center justify-center w-200px h-120px">
				{uploading ? (
					<>
						{preview_url && <Image className="w-100% h-100% opacity-40" src={preview_url} />}
						<Progress.Circle
							className="absolute! left-50% top-50% translate-x--50% translate-y--50%"
							defaultMolecule={0}
							molecule={progress}
						/>
					</>
				) : (
					value && <Image className="w-100% h-100%" src={value} />
				)}
			</div>
		</Upload>
	)
}
