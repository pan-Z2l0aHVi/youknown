import { useRef } from 'react'
import { PiTrashSimpleBold } from 'react-icons/pi'
import { TbPhotoPlus } from 'react-icons/tb'

import { Doc, update_doc } from '@/apis/doc'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Loading, Space, Toast, Upload } from '@youknown/react-ui/src'

interface CoverUploadProps {
	doc_id: string
	on_updated: (doc: Doc) => void
	cover?: string
}
export default function CoverUpload(props: CoverUploadProps) {
	const { cover, doc_id, on_updated } = props

	const [updating, { setTrue: start_updating, setFalse: stop_updating }] = useBoolean(false)
	const save_doc_cover = async (cover_url: string) => {
		try {
			const res = await update_doc({
				doc_id,
				cover: cover_url
			})
			on_updated(res)
		} catch (error) {
			console.error('error: ', error)
		}
	}

	const upload_cover = (file: File) =>
		new Promise<string>((resolve, reject) => {
			start_updating()
			upload_cloudflare_r2(file, {
				complete(url) {
					save_doc_cover(url).finally(() => {
						stop_updating()
					})
					resolve(url)
				},
				error(err) {
					Toast.error({ content: '图片上传失败' })
					stop_updating()
					reject(err)
				}
			})
		})

	const upload_ref = useRef<HTMLInputElement>(null)

	return (
		<Loading className="w-100%!" spinning={updating}>
			{cover ? (
				<div className="group relative">
					<img className="w-100% max-h-30vh min-h-40px object-cover rd-radius-m" src={cover} />
					<Space className="group-hover-display-flex! display-none! absolute right-16px bottom-16px">
						<Upload ref={upload_ref} headless action={upload_cover}>
							<Button
								prefixIcon={<TbPhotoPlus />}
								onClick={() => {
									upload_ref.current?.click()
								}}
							>
								修改封面
							</Button>
						</Upload>
						<Button
							prefixIcon={<PiTrashSimpleBold />}
							onClick={() => {
								save_doc_cover('')
							}}
						>
							移除封面
						</Button>
					</Space>
				</div>
			) : (
				<Upload headless action={upload_cover}>
					<div className="flex items-center w-max p-[4px_12px] ml-16px bg-bg-2 rd-full color-text-2 hover-color-primary">
						<TbPhotoPlus className="mr-8px text-16px" />
						添加封面
					</div>
				</Upload>
			)}
		</Loading>
	)
}
