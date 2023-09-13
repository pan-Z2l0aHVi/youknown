import Image from './Image'
import { preview } from './preview'

interface DialogCommand {
	preview: typeof preview
}
const ExportImage = Image as typeof Image & DialogCommand
ExportImage.preview = preview
export default ExportImage
