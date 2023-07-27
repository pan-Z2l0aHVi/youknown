import { Button, Divider, Space, Switch, Tooltip } from '@youknown/react-ui/src'
import { TbCheck, TbSearch, TbX } from 'react-icons/tb'

export default () => {
	const ceilStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
	return (
		<div className="p-24px">
			<h1>Tooltip</h1>
			<Divider />
			<div className="grid grid-cols-[repeat(3,160px)] grid-rows-[repeat(5,auto)] gap-12px justify-center justify-items-center">
				<Tooltip placement="top-start" title="Top start">
					<Button style={ceilStyle}>Top start</Button>
				</Tooltip>
				<Tooltip placement="top" title="Top">
					<Button style={ceilStyle}>Top</Button>
				</Tooltip>
				<Tooltip placement="top-end" title="Top end">
					<Button style={ceilStyle}>Top end</Button>
				</Tooltip>
				<Tooltip placement="left-start" title="Left start">
					<Button style={ceilStyle}>Left start</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-start" title="Right start">
					<Button style={ceilStyle}>Right start</Button>
				</Tooltip>
				<Tooltip placement="left" title="Left">
					<Button style={ceilStyle}>Left</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right" title="Right">
					<Button style={ceilStyle}>Right</Button>
				</Tooltip>
				<Tooltip placement="left-end" title="Left end">
					<Button style={ceilStyle}>Left end</Button>
				</Tooltip>
				<div style={ceilStyle}></div>
				<Tooltip placement="right-end" title="Right end">
					<Button style={ceilStyle}>Right end</Button>
				</Tooltip>
				<Tooltip placement="bottom-start" title="Bottom start">
					<Button style={ceilStyle}>Bottom start</Button>
				</Tooltip>
				<Tooltip placement="bottom" title="Bottom">
					<Button style={ceilStyle}>Bottom</Button>
				</Tooltip>
				<Tooltip placement="bottom-end" title="Bottom end">
					<Button style={ceilStyle}>Bottom end</Button>
				</Tooltip>
			</div>
			<Divider />
			<Space size="large">
				<Tooltip title="Icon tooltip">
					<Button circle>
						<TbSearch />
					</Button>
				</Tooltip>
				<Tooltip title="Button tooltip">
					<Button primary>Primary button</Button>
				</Tooltip>
				<Tooltip title="Switch tooltip">
					<Switch />
				</Tooltip>
				<Tooltip title="Tooltip">
					<span>Text or anything</span>
				</Tooltip>
			</Space>
			<Divider />
			<Space size="large">
				<Tooltip title="Dark tooltip">
					<Button>Dark</Button>
				</Tooltip>
				<Tooltip light title="Light tooltip">
					<Button>Light</Button>
				</Tooltip>
			</Space>
			<Divider />
			<Space>
				<Tooltip title="Enabled">
					<Button icon={<TbCheck />}>Enabled</Button>
				</Tooltip>
				<Tooltip title="Disabled" disabled>
					<Button icon={<TbX />}>Disabled</Button>
				</Tooltip>
			</Space>
		</div>
	)
}
