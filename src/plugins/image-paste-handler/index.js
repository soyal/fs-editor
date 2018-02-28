import imageUrlStrategy from './strategy'
import decorateComponentWithProps from 'decorate-component-with-props'
import ImageBlock from './image-block'
import ImageUpload from './image-upload'

/**
 * image paste handler
 */
export default (config = {}) => {
  let ImageComponent = ImageBlock
  if (config.decorator) {
    ImageComponent = config.decorator(ImageBlock)
  }
  const theme = config.theme || {}

  const ThemedImage = decorateComponentWithProps(ImageComponent, { theme })

  return {
    // handle single image paste and insert image by tool click
    blockRendererFn: (block, { getEditorState }) => {
      console.log('block render type', block.getType())
      if (block.getType() === 'atomic') {
        const key = block.getEntityAt(0)
        if (!key) {
          return null
        }
        const contentState = getEditorState().getCurrentContent()
        const entity = contentState.getEntity(key)
        if (!entity) return null

        const type = entity.getType().toLowerCase()
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: false
          }
        }

        return null
      }
    },

    // handle text-image pasted
    // decorators: [
    //   {
    //     strategy: imageUrlStrategy,
    //     component: ImageUpload
    //   }
    // ]
  }
}
