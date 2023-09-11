import { confirm } from './confirm'
import Dialog from './Dialog'

interface DialogCommand {
	confirm: typeof confirm
}
const ExportDialog = Dialog as typeof Dialog & DialogCommand
ExportDialog.confirm = confirm
export default ExportDialog
