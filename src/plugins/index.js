import createImagePlugin from './image-plugin'
import { composeDecorators } from 'draft-js-plugins-editor'
import createFocusPlugin from 'draft-js-focus-plugin'
import 'draft-js-focus-plugin/lib/plugin.css'
import createLinkifyPlugin from './link'

export default () => {
  const focusPlugin = createFocusPlugin()
  const linkPlugin = createLinkifyPlugin()
  const decorator = composeDecorators(focusPlugin.decorator)
  const imgPastePlugin = createImagePlugin({
    decorator
  })
  
  return [focusPlugin, imgPastePlugin, linkPlugin]
}
