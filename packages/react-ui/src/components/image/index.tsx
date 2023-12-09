import { clip } from './clip'
import Image from './Image'
import ImageClip from './ImageClip'
import ImagePreview from './ImagePreview'
import { preview } from './preview'

interface DialogCommand {
	preview: typeof preview
	ImagePreview: typeof ImagePreview
	clip: typeof clip
	ImageClip: typeof ImageClip
}
const ExportImage = Image as typeof Image & DialogCommand
ExportImage.preview = preview
ExportImage.ImagePreview = ImagePreview
ExportImage.clip = clip
ExportImage.ImageClip = ImageClip
export default ExportImage
