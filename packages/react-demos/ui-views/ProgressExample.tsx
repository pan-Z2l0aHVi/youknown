import React, { useState } from 'react'
import { Space, Progress, Button, Divider } from '@youknown/react-ui/src'
import { TbMinus, TbPlus } from 'react-icons/tb'

export default () => {
	const [percent, setPercent] = useState(70)

	const operationEle = (
		<Space>
			<Button
				circle
				disabled={percent <= 0}
				onClick={() => {
					setPercent(p => p - 5)
				}}
			>
				<TbMinus />
			</Button>
			<Button
				circle
				disabled={percent >= 100}
				onClick={() => {
					setPercent(p => p + 5)
				}}
			>
				<TbPlus />
			</Button>
		</Space>
	)

	return (
		<div style={{ padding: 24 }}>
			<h1>Progress</h1>
			<Divider />
			{operationEle}
			<br />
			<Space direction="vertical" style={{ width: 400 }}>
				<Progress size="small" defaultPercent={70} percent={percent} />
				<Progress size="medium" defaultPercent={70} percent={percent} />
				<Progress size="large" defaultPercent={70} percent={percent} />
				<Progress suffix="/100" defaultPercent={70} percent={percent} />
				<Progress format={null} defaultPercent={70} percent={percent} suffix="/100" />
				<Progress
					format={({ countUpRef }) => (
						<span style={{ color: 'purple' }}>
							<span ref={countUpRef}></span>/100
						</span>
					)}
					defaultPercent={70}
					percent={percent}
					suffix={null}
				/>
			</Space>
			<Divider />
			{operationEle}
			<br />
			<Space size="large" style={{ height: 200 }}>
				<Progress direction="vertical" size="small" defaultPercent={70} percent={percent} />
				<Progress direction="vertical" size="medium" defaultPercent={70} percent={percent} />
				<Progress direction="vertical" size="large" defaultPercent={70} percent={percent} />
			</Space>
			<Divider />
			<Space size="large">
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} round={false} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} format={null} />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70} molecule={percent} suffix="/100" />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle defaultMolecule={70 * 5} molecule={percent * 5} denominator={500} suffix="/500" />
					{operationEle}
				</Space>
				<Space direction="vertical">
					<Progress.Circle
						defaultMolecule={70}
						molecule={percent}
						suffix={null}
						format={({ countUpRef }) => (
							<div style={{ color: 'purple', fontSize: 16 }}>
								<span ref={countUpRef}></span>
								<span>/100</span>
							</div>
						)}
					/>
					{operationEle}
				</Space>
			</Space>
			<Divider />
			<Space size="large">
				<Progress.Circle size="small" molecule={percent} />
				<Progress.Circle size="medium" molecule={percent} />
				<Progress.Circle size="large" molecule={percent} />
			</Space>
		</div>
	)
}
