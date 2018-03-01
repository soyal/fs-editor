import createImagePasteHandlerPlugin from './image-paste-handler'
import { composeDecorators } from 'draft-js-plugins-editor'
import createFocusPlugin from 'draft-js-focus-plugin'

const focusPlugin = createFocusPlugin()
const decorator = composeDecorators(focusPlugin.decorator)
const imgPastePlugin = createImagePasteHandlerPlugin({ decorator })

export default [focusPlugin, imgPastePlugin]
