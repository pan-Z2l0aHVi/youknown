import { useContextMenu } from '@youknown/react-hook/src'

import ContextMenu from './context-menu'

const ExportContextMenu = ContextMenu as typeof ContextMenu & {
	useContextMenu: typeof useContextMenu
}
ExportContextMenu.useContextMenu = useContextMenu
export default ExportContextMenu
