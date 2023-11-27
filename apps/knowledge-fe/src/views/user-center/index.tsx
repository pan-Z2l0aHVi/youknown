import { useEffect, useState } from 'react'
import { TbUserCheck, TbUserEdit } from 'react-icons/tb'
import { useSearchParams } from 'react-router-dom'

import { follow_user, get_profile, unfollow_user, update_profile } from '@/apis/user'
import Header from '@/app/components/header'
import { useUserStore } from '@/stores'
import { format_time, parse_file_size_mb } from '@/utils'
import { upload_cloudflare_r2 } from '@/utils/cloudflare-r2'
import { with_api } from '@/utils/request'
import { useBoolean, useFetch } from '@youknown/react-hook/src'
import { AspectRatio, Button, Divider, Image, Input, Loading, Space, Toast, Upload } from '@youknown/react-ui/src'
import { cls } from '@youknown/utils/src'
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri'

export default function UserCenter() {
	const profile = useUserStore(state => state.profile)
	const set_profile = useUserStore(state => state.set_profile)
	const [search_params] = useSearchParams()
	const target_user_id = search_params.get('target_user_id') ?? ''
	const is_self = !target_user_id || target_user_id === profile?.user_id
	const { data: target_user_info } = useFetch(get_profile, {
		ready: !is_self,
		params: [{ user_id: target_user_id }]
	})
	const user_info = is_self ? profile : target_user_info
	const [is_edit, { setTrue: start_edit, setFalse: stop_edit }] = useBoolean(false)
	const [updating_avatar, set_updating_avatar] = useState('')
	const [follow_loading, set_follow_loading] = useState(false)
	const [unfollow_loading, set_unfollow_loading] = useState(false)

	const upload_cover = (file: File) =>
		new Promise<string>((resolve, reject) => {
			if (parse_file_size_mb(file) > 1) {
				reject('Exceed the size limit')
				Toast.warning({ content: '图像大小不能超过1M' })
				return
			}
			upload_cloudflare_r2(file, {
				complete(url) {
					resolve(url)
					set_updating_avatar(url)
				},
				error(err) {
					Toast.error({ content: '图片上传失败' })
					reject(err)
				}
			})
		})

	const [nickname_val, set_nickname_val] = useState('')

	const { nickname = '', avatar = '' } = user_info ?? {}
	useEffect(() => {
		if (is_edit) {
			set_nickname_val(nickname ?? '')
			set_updating_avatar(avatar ?? '')
		}
	}, [avatar, is_edit, nickname])

	const [saving, set_saving] = useState(false)
	const handle_save_profile = async () => {
		set_saving(true)
		const [err, new_profile] = await with_api(update_profile)({
			nickname: nickname_val,
			avatar: updating_avatar
		})
		set_saving(false)
		if (err) {
			return
		}
		Toast.success({ content: '个人资料已更新' })
		set_profile(new_profile)
		stop_edit()
	}

	const handle_follow_user = async () => {
		const target_user_id = user_info?.user_id
		if (!target_user_id) {
			return
		}
		set_follow_loading(true)
		const [err, new_profile] = await with_api(follow_user)({
			user_id: target_user_id
		})
		if (err) {
			return
		}
		set_follow_loading(false)
		Toast.success({ content: '关注成功' })
		set_profile(new_profile)
	}

	const handle_unfollow_user = async () => {
		const target_user_id = user_info?.user_id
		if (!target_user_id) {
			return
		}
		set_unfollow_loading(true)
		const [err, new_profile] = await with_api(unfollow_user)({
			user_id: target_user_id
		})
		set_unfollow_loading(false)
		if (err) {
			return
		}
		Toast.success({ content: '取消关注成功' })
		set_profile(new_profile)
	}

	const header = (
		<Header heading="个人主页">
			{is_self &&
				(is_edit ? (
					<Space>
						<Button onClick={stop_edit}>取消</Button>
						<Button primary prefixIcon={<TbUserCheck />} loading={saving} onClick={handle_save_profile}>
							保存
						</Button>
					</Space>
				) : (
					<Button prefixIcon={<TbUserEdit />} onClick={start_edit}>
						编辑资料
					</Button>
				))}
		</Header>
	)

	const banner = (
		<Loading className="w-100%!" spinning={!user_info}>
			<AspectRatio ratio={0.2}>
				<div
					className={cls(
						'relative w-100% h-100%',
						'after:content-empty after:absolute after:top-0 after:left-0 after:w-100% after:h-100%',
						'after:backdrop-blur-2xl'
					)}
				>
					<Image className="w-100% h-100%" src={user_info?.avatar ?? ''} />
				</div>
			</AspectRatio>
		</Loading>
	)

	const is_followed = profile?.followed_user_ids.includes(user_info?.user_id ?? '')
	const follow_btn = !is_self && user_info && (
		<>
			{is_followed ? (
				<Button
					className="absolute! top--45px right-0"
					prefixIcon={<RiUserUnfollowLine className="text-14px" />}
					loading={unfollow_loading}
					onClick={handle_unfollow_user}
				>
					取消关注
				</Button>
			) : (
				<Button
					className="absolute! top--45px right-0"
					prefixIcon={<RiUserFollowLine className="text-14px" />}
					loading={follow_loading}
					primary
					onClick={handle_follow_user}
				>
					关注
				</Button>
			)}
		</>
	)

	return (
		<>
			{header}
			{banner}

			<div className="relative p-32px max-w-720px m-[0_auto]">
				{follow_btn}

				{is_edit ? (
					<Upload className="absolute! top--45px" circle action={upload_cover} />
				) : (
					<Image
						className="absolute top--45px w-90px h-90px rd-full bg-bg-2 shadow-shadow-l"
						src={user_info?.avatar ?? ''}
					/>
				)}
				{is_edit ? (
					<Input className="mt-24px" value={nickname_val} onChange={set_nickname_val} />
				) : (
					<div className="text-22px line-height-32px font-600 mt-24px">{user_info?.nickname ?? '123123'}</div>
				)}
				<div className="text-12px color-text-3 mt-8px">
					加入时间：{format_time(user_info?.creation_time ?? '')}
				</div>
				<Divider />
			</div>
		</>
	)
}
