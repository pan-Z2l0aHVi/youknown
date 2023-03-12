import React from 'react'
import Header from '@/app/components/header'
import { Input } from '@youknown/react-ui/src'
import { TbSearch } from 'react-icons/tb'

export default function History() {
	return (
		<>
			<Header heading="足迹">
				<Input prefix={<TbSearch />} placeholder="搜记录" />
			</Header>

			<div className="p-32px"></div>
		</>
	)
}
