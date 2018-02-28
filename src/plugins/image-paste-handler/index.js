import imageUrlStrategy from './strategy'
import ImageUpload from './image-upload'
import MediaBlock from './media-block'
/**
 * image paste handler
 */
const createImagePasteHandler = (config = {}) => {
  return {
    blockRendererFn: block => {
      const blockType = block.getType()

      if (blockType === 'atomic') {
        return {
          component: MediaBlock,
          editable: false
        }
      }
    },

    decorators: [
      {
        strategy: imageUrlStrategy,
        component: ImageUpload
      }
    ]
  }
}

export default createImagePasteHandler()