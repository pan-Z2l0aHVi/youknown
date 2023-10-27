import { RxDotsHorizontal } from 'react-icons/rx'
import { TbEyeCheck } from 'react-icons/tb'

import { Wallpaper } from '@/apis/wallpaper'
import { useBoolean, useFetch } from '@youknown/react-hook/src'
import { Dropdown, Image, Motion, Toast, Tooltip } from '@youknown/react-ui/src'
import { cls, downloadFile } from '@youknown/utils/src'
import { find_wallpaper_seen, insert_wallpaper_seen } from '@/utils/idb'

interface WallpaperCardProps {
	wallpaper: Wallpaper
	search_similar: () => void
}

export default function WallpaperCard(props: WallpaperCardProps) {
	const { wallpaper, search_similar } = props

	const [hovered, { setTrue: start_hover, setFalse: stop_hover }] = useBoolean(false)
	const [more_open, { setBool: set_more_open }] = useBoolean(false)
	const [img_loaded, { setTrue: set_img_loaded }] = useBoolean(false)
	const { data: seen } = useFetch(find_wallpaper_seen, {
		params: [wallpaper.id]
	})

	const toast_download_err = () => {
		Toast.error({
			content: '下载失败，请查看原图并右键保存'
		})
	}
	const handle_download = () => {
		downloadFile(wallpaper.path, 'wallpaper').catch(() => {
			toast_download_err()
		})
	}

	const preview_picture = () => {
		Image.preview({
			url: wallpaper.path,
			onDownloadError() {
				toast_download_err()
			}
		})
		insert_wallpaper_seen(wallpaper.id)
	}
	const is_sketchy = wallpaper.purity === 'sketchy'

	return (
		<figure
			className={cls(
				'relative before:b-solid before:rd-radius-m',
				'before:content-empty before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0',
				is_sketchy
					? 'before:b-3 before:b-[rgb(255,200,64)] before:shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]'
					: 'before:b-bd-line before:b-1'
			)}
			onMouseEnter={start_hover}
			onMouseLeave={stop_hover}
		>
			<img
				className={cls('rd-radius-m shadow-shadow-l select-none bg-bg-2 b-bd-line b-1')}
				style={{
					width: 240,
					height: 240 * (1 / Number(wallpaper.ratio))
				}}
				src={wallpaper.thumbs.original}
				loading="lazy"
				onLoad={set_img_loaded}
				onClick={preview_picture}
			/>

			{seen && (
				<Tooltip placement="bottom" title="看过">
					<div
						className={cls(
							'absolute top-8px right-8px flex items-center justify-center',
							'leading-none w-24px h-24px rd-full bg-[rgba(120,120,120,0.4)] backdrop-blur-xl'
						)}
					>
						<TbEyeCheck className="text-16px color-#fff" />
					</div>
				</Tooltip>
			)}

			{img_loaded && (
				<>
					<Motion.Fade in={hovered && !more_open}>
						<div
							className={cls(
								'absolute bottom-8px left-8px',
								'rd-full bg-[rgba(120,120,120,0.4)] backdrop-blur-xl',
								'flex items-center h-24px leading-none pl-6px pr-6px text-12px color-#fff',
								'pointer-events-none'
							)}
						>
							{wallpaper.dimension_x} X {wallpaper.dimension_y}
						</div>
					</Motion.Fade>

					<Dropdown
						trigger="click"
						spacing={4}
						content={
							<Dropdown.Menu className="w-112px" onClick={stop_hover} closeAfterItemClick>
								<Dropdown.Item onClick={handle_download}>
									<span>下载</span>
								</Dropdown.Item>
								<Dropdown.Item>
									<span>收藏</span>
								</Dropdown.Item>
								<Dropdown.Item onClick={search_similar}>
									<span>查找相似</span>
								</Dropdown.Item>
							</Dropdown.Menu>
						}
						onOpenChange={set_more_open}
					>
						<Motion.Fade in={hovered || more_open}>
							<div
								className={cls(
									'absolute bottom-8px right-8px',
									'rd-full bg-[rgba(120,120,120,0.4)] backdrop-blur-xl hover-bg-primary',
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
		</figure>
	)
}
