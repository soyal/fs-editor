import { composeDecorators } from 'draft-js-plugins-editor'
import createImagePlugin from 'draft-js-image-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'

const focusPlugin = createFocusPlugin()
const decorator = composeDecorators(
  focusPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator })

export default imagePlugin