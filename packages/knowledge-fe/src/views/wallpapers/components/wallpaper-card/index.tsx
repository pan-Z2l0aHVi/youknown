import { useBoolean } from '@youknown/react-hook/src'
import { Dropdown, Image, Motion, Toast } from '@youknown/react-ui/src'
import { cls, downloadFile } from '@youknown/utils/src'
import { useState } from 'react'
import { RxDotsHorizontal } from 'react-icons/rx'

interface WallpaperCardProps {
	thumb_url: string
	detail_url: string
	ratio: number
	resolution_x: number
	resolution_y: number
}

export default function WallpaperCard(props: WallpaperCardProps) {
	const { detail_url, thumb_url, ratio, resolution_x, resolution_y } = props

	const [hovered, { setTrue: start_hover, setFalse: stop_hover }] = useBoolean(false)
	const [more_open, { setBool: set_more_open }] = useBoolean(false)
	const [img_loaded, { setTrue: set_img_loaded }] = useBoolean(false)
	const [img_detail_open, set_img_detail_open] = useState(false)

	const toast_download_err = () => {
		Toast.show({
			title: '下载失败，请查看原图并手动右键保存'
		})
	}
	const handle_download = () => {
		downloadFile(detail_url, 'wallpaper').catch(() => {
			toast_download_err()
		})
	}

	return (
		<div className="relative" onMouseEnter={start_hover} onMouseLeave={stop_hover}>
			<Image
				className="b-rd-radius-m shadow-shadow-l select-none bg-bg-2 b-bd-line b-1"
				style={{
					width: 240,
					height: 240 * ratio
				}}
				open={img_detail_open}
				onOpenChange={set_img_detail_open}
				src={thumb_url}
				detailSrc={detail_url}
				loading="lazy"
				onLoad={set_img_loaded}
				onDownloadError={toast_download_err}
			/>

			{img_loaded && (
				<>
					<Motion.Fade in={hovered && !more_open}>
						<div
							className={cls(
								'absolute bottom-8px left-8px',
								'b-rd-round bg-[rgba(120,120,120,0.4)] backdrop-blur-lg',
								'flex items-center h-24px leading-none p-l-6px p-r-6px text-12px color-#fff',
								'pointer-events-none'
							)}
						>
							{resolution_x} X {resolution_y}
						</div>
					</Motion.Fade>

					<Dropdown
						trigger="click"
						spacing={4}
						content={
							<Dropdown.Menu className="w-112px" onClick={stop_hover}>
								<Dropdown.Item
									closeAfterItemClick
									onClick={() => {
										set_img_detail_open(true)
									}}
								>
									<span>查看原图</span>
								</Dropdown.Item>
								<Dropdown.Item closeAfterItemClick>
									<span>收藏</span>
								</Dropdown.Item>
								<Dropdown.Item closeAfterItemClick onClick={handle_download}>
									<span>下载</span>
								</Dropdown.Item>
							</Dropdown.Menu>
						}
						onOpenChange={set_more_open}
					>
						<Motion.Fade in={hovered || more_open}>
							<div
								className={cls(
									'absolute bottom-8px right-8px',
									'b-rd-round bg-[rgba(120,120,120,0.4)] backdrop-blur-lg hover-bg-primary',
									'flex items-center justify-center w-24px h-24px cursor-pointer select-none'
								)}
								onClick={start_hover}
							>
								<RxDotsHorizontal className="color-#fff text-16px" />
							</div>
						</Motion.Fade>
					</Dropdown>
				</>
			)}
		</div>
	)
}
