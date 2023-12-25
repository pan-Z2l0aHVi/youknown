import { crop } from './crop'
import Image from './Image'
import ImageCropper from './ImageCropper'
import ImagePreview from './ImagePreview'
import { preview } from './preview'

interface ImageCommand {
	preview: typeof preview
	ImagePreview: typeof ImagePreview
	crop: typeof crop
	ImageCropper: typeof ImageCropper
}
const ExportImage = Image as typeof Image & ImageCommand
ExportImage.preview = preview
ExportImage.ImagePreview = ImagePreview
ExportImage.crop = crop
ExportImage.ImageCropper = ImageCropper
export default ExportImage
