import React, { useState } from 'react'
import { Divider, Space, Switch } from '@youknown/react-ui/src'

export default () => {
	const [checked, setChecked] = useState<boolean>(false)
	return (
		<div style={{ padding: 24 }}>
			<h1>Switch</h1>
			<Divider />
			<Space>
				<Switch defaultValue={true} />
				<Switch
					value={checked}
					onChange={checked => {
						if (typeof checked === 'boolean') setChecked(checked)
					}}
				/>
				<Switch disabled defaultValue={true} />
				<Switch disabled />
			</Space>
			<Divider />
			<Space>
				<Switch size="small" />
				<Switch size="medium" />
				<Switch size="large" />
			</Space>
		</div>
	)
}
