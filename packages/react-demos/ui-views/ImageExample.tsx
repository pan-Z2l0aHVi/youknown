import { Divider, Image } from '@youknown/react-ui/src'

export default () => {
	const picSrc = 'https://iph.href.lu/879x400'
	return (
		<div style={{ padding: 24 }}>
			<h1>Image</h1>
			<Divider />
			<Image src={picSrc} width="300px" />
			<Divider />
			<Image src={picSrc} width="300px" scaleRange={[0.5, 1, 2]} />
			<Divider />
			<Image toolbarVisible={false} src={picSrc} width="300px" />
			<Divider />
			<Image detailDisabled src={picSrc} width="300px" />
		</div>
	)
}
