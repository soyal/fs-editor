import decorateComponentWithProps from 'decorate-component-with-props'
import ImageComponent from './image-block'

const defaultTheme = {
  image: {}
}

export default (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme
  let Image = config.imageComponent || ImageComponent
  if (config.decorator) {
    Image = config.decorator(Image)
  }
  const ThemedImage = decorateComponentWithProps(Image, { theme })
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent()
        const entity = block.getEntityAt(0)
        if (!entity) return null
        const type = contentState.getEntity(entity).getType().toLowerCase()
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: true
          }
        }
        return null
      }

      return null
    }
  }
}

export const Image = ImageComponent
