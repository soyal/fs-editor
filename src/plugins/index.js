import createImagePlugin from './image-paste-handler'
import { composeDecorators } from 'draft-js-plugins-editor'
import createFocusPlugin from 'draft-js-focus-plugin'

export default () => {
  const focusPlugin = createFocusPlugin()
  const decorator = composeDecorators(focusPlugin.decorator)
  const imgPastePlugin = createImagePlugin({ decorator })
  return [focusPlugin, imgPastePlugin]
}
