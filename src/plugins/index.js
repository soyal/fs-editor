import createImagePasteHandlerPlugin from './image-paste-handler'
import { composeDecorators } from 'draft-js-plugins-editor'
import createFocusPlugin from 'draft-js-focus-plugin'

export default tools => {
  const focusPlugin = createFocusPlugin()
  const decorator = composeDecorators(focusPlugin.decorator)
  const imgPastePlugin = createImagePasteHandlerPlugin({ decorator, ...tools })
  return [focusPlugin, imgPastePlugin]
}
