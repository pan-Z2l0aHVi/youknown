import { useEffect, useState } from 'react'
import { FiDownloadCloud } from 'react-icons/fi'
import { LuHeart, LuHeartOff } from 'react-icons/lu'
import { RxDotsHorizontal } from 'react-icons/rx'
import { TbEyeCheck, TbPhotoSearch } from 'react-icons/tb'

import { cancel_collect_wallpaper, collect_wallpaper } from '@/apis/user'
import { Wallpaper } from '@/apis/wallpaper'
import { useModalStore, useUserStore } from '@/stores'
import { find_wallpaper_seen, insert_wallpaper_seen } from '@/utils/idb'
import { with_api } from '@/utils/request'
import { useBoolean, useContextMenu, useFetch } from '@youknown/react-hook/src'
import { ContextMenu, Dropdown, Image, Motion, Toast, Tooltip } from '@youknown/react-ui/src'
import { cls, downloadFile, is } from '@youknown/utils/src'

interface WallpaperCardProps {
	className?: string
	wallpaper: Wallpaper
	on_removed?: () => void
	search_similar?: () => void
}

export default function WallpaperCard(props: WallpaperCardProps) {
	const { className, wallpaper, on_removed, search_similar } = props

	const has_login = useUserStore(state => state.has_login)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const [hovered, { setTrue: start_hover, setFalse: stop_hover }] = useBoolean(false)
	const [more_open, { setBool: set_more_open }] = useBoolean(false)
	const [img_loaded, { setTrue: set_img_loaded }] = useBoolean(false)
	const { data: seen, run: get_seen } = useFetch(find_wallpaper_seen, {
		params: [wallpaper.id]
	})
	const wallpaper_collected = wallpaper.collected
	const [collected, set_collected] = useState(wallpaper_collected)
	useEffect(() => {
		set_collected(wallpaper_collected)
	}, [wallpaper_collected])

	const add_to_collection = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		const [err] = await with_api(collect_wallpaper)({
			wallpaper
		})
		if (err) {
			return
		}
		Toast.success({ content: '收藏成功' })
		set_collected(true)
	}
	const remove_from_collection = async () => {
		if (!has_login) {
			open_login_modal()
			return
		}
		const [err] = await with_api(cancel_collect_wallpaper)({
			wallpaper_id: wallpaper.id
		})
		if (err) {
			return
		}
		Toast.success({ content: '取消收藏成功' })
		set_collected(false)
		on_removed?.()
	}

	const toast_download_err = () => {
		Toast.error({
			content: '下载失败，请查看原图并右键保存'
		})
	}
	const handle_download = () => {
		downloadFile(wallpaper.path, wallpaper.id).catch(() => {
			toast_download_err()
		})
	}

	const preview_picture = async () => {
		Image.preview({
			url: wallpaper.path,
			downloadFileName: wallpaper.id,
			onDownloadError() {
				toast_download_err()
			},
			async onLoad() {
				await insert_wallpaper_seen(wallpaper.id)
				get_seen()
			}
		})
	}
	const is_sketchy = wallpaper.purity === 'sketchy'
	const is_nsfw = wallpaper.purity === 'nsfw'

	const ctx_menu = useContextMenu()

	const get_dropdown_menu = (is_context_menu = false) => {
		return (
			<Dropdown.Menu
				className="w-120px"
				onClick={stop_hover}
				closeAfterItemClick
				closeDropdown={is_context_menu ? ctx_menu.closeContextMenu : undefined}
			>
				<Dropdown.Item prefix={<FiDownloadCloud className="text-16px" />} onClick={handle_download}>
					<span>下载原图</span>
				</Dropdown.Item>

				{is.function(search_similar) && (
					<Dropdown.Item prefix={<TbPhotoSearch className="text-16px" />} onClick={search_similar}>
						<span>查找相似</span>
					</Dropdown.Item>
				)}

				{collected ? (
					<Dropdown.Item
						prefix={<LuHeartOff className="text-16px color-danger" />}
						onClick={remove_from_collection}
					>
						<span className="color-danger">取消收藏</span>
					</Dropdown.Item>
				) : (
					<Dropdown.Item prefix={<LuHeart className="text-16px" />} onClick={add_to_collection}>
						<span>收藏</span>
					</Dropdown.Item>
				)}
			</Dropdown.Menu>
		)
	}

	return (
		<>
			<figure
				className={cls(
					'relative before:rd-radius-m',
					'before:content-empty before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0',
					{
						'before:b-2 before:b-solid before:b-yellow': is_sketchy,
						'before:b-2 before:b-solid before:b-red': is_nsfw
					},
					className
				)}
				onMouseEnter={start_hover}
				onMouseLeave={stop_hover}
				onContextMenu={ctx_menu.onContextMenu}
			>
				<Image
					className={cls('rd-radius-m shadow-shadow-s select-none bg-bg-2 b-bd-line b-1')}
					style={{
						width: 320,
						height: 320 * (1 / Number(wallpaper.ratio))
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
							content={get_dropdown_menu()}
							onOpenChange={set_more_open}
						>
							<Motion.Fade in={hovered || more_open}>
								<div
									className={cls(
										'absolute bottom-8px right-8px',
										'rd-full bg-[rgba(120,120,120,0.4)] backdrop-blur-xl [@media(hover:hover)]-hover-bg-primary',
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

			<ContextMenu {...ctx_menu.contextMenuProps}>{get_dropdown_menu(true)}</ContextMenu>
		</>
	)
}
