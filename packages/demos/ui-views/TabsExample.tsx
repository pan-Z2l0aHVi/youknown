import React, { useEffect, useState } from 'react'
import { Divider, Radio, Space, Tabs } from '@youknown/react-ui/src'

export default () => {
	const [tabsType, setTabsType] = useState<'line' | 'round' | 'segment'>('line')
	const [tabsSize, setTabsSize] = useState<'small' | 'medium' | 'large'>('medium')
	const [tabsValue, setTabsValue] = useState<'a' | 'b' | 'c'>('a')
	useEffect(() => {
		setTimeout(() => {
			setTabsValue('c')
		}, 3000)
	}, [])

	return (
		<div style={{ padding: 24 }}>
			<h1>Tabs</h1>
			<Space>
				<Radio.Group
					type="tab"
					value={tabsType}
					onChange={value => {
						setTabsType(value as any)
					}}
				>
					<Radio label="line">Line</Radio>
					<Radio label="round">Round</Radio>
					<Radio label="segment">Button</Radio>
				</Radio.Group>
				<Radio.Group
					type="tab"
					value={tabsSize}
					onChange={value => {
						setTabsSize(value as any)
					}}
				>
					<Radio label="small">Small</Radio>
					<Radio label="medium">Medium</Radio>
					<Radio label="large">Large</Radio>
				</Radio.Group>
			</Space>
			<Divider />
			<Tabs type={tabsType} size={tabsSize}>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
			<Divider />
			<Tabs lazyLoad>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
			<Divider />
			<Tabs value={tabsValue} onChange={setTabsValue as any}>
				<Tabs.Panel name="a" tab="Tab A">
					aaa
				</Tabs.Panel>
				<Tabs.Panel name="b" tab="Tab B">
					bbb
				</Tabs.Panel>
				<Tabs.Panel name="c" tab="Tab C">
					ccc
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}
