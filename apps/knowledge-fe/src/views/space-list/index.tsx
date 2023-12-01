import { useState } from 'react'
import { TbFolderPlus } from 'react-icons/tb'

import Header from '@/app/components/header'
import { useModalStore, useSpaceStore, useUserStore } from '@/stores'
import { with_api } from '@/utils/request'
import { useBoolean } from '@youknown/react-hook/src'
import { Button, Toast } from '@youknown/react-ui/src'

import SpaceCard from './components/space-card'
import SpaceOptionsModal from './components/space-options-modal'
import { GoInbox } from 'react-icons/go'

export default function SpaceList() {
	const has_login = useUserStore(state => state.has_login)
	const open_login_modal = useModalStore(state => state.open_login_modal)
	const space_list = useSpaceStore(state => state.space_list)
	const create_space = useSpaceStore(state => state.create_space)
	const update_space = useSpaceStore(state => state.update_space)
	const [options_modal_open, { setTrue: show_options_modal, setFalse: hide_options_modal }] = useBoolean(false)
	const [modal_space_id, set_modal_space_id] = useState('')

	const create_new_space = async (name: string, desc: string) => {
		const [err] = await with_api(create_space)(name, desc)
		if (err) {
			return
		}
		Toast.success({ content: '保存成功' })
		hide_options_modal()
	}

	const update_doc_space = async (name: string, desc: string) => {
		const [err] = await with_api(update_space)(modal_space_id, name, desc)
		if (err) {
			return
		}
		hide_options_modal()
	}

	const spaces_ele = space_list.map(space => {
		return (
			<SpaceCard
				key={space.space_id}
				info={space}
				on_edit={() => {
					set_modal_space_id(space.space_id)
					show_options_modal()
				}}
			/>
		)
	})

	return (
		<>
			<Header heading="我的知识库">
				<Button
					primary
					prefixIcon={<TbFolderPlus className="text-16px" />}
					onClick={() => {
						if (!has_login) {
							open_login_modal()
							return
						}
						set_modal_space_id('')
						show_options_modal()
					}}
				>
					新建空间
				</Button>
			</Header>

			{space_list.length ? (
				<div className="grid grid-cols-[repeat(auto-fill,400px)] gap-16px justify-center p-[16px_32px_32px_32px]">
					{spaces_ele}
				</div>
			) : (
				<div className="flex flex-col items-center color-text-3 mt-40px">
					<GoInbox className="text-32px mb-16px" />
					<div>空空如也，快来创建你的专属知识空间吧~</div>
				</div>
			)}

			<SpaceOptionsModal
				open={options_modal_open}
				hide_modal={hide_options_modal}
				space_id={modal_space_id}
				on_save={async (name, desc) => {
					const is_edit = !!modal_space_id
					if (is_edit) {
						await update_doc_space(name, desc)
					} else {
						await create_new_space(name, desc)
					}
				}}
			/>
		</>
	)
}
