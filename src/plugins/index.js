import createImagePlugin from './image-paste-handler'
import { composeDecorators } from 'draft-js-plugins-editor'
import createFocusPlugin from 'draft-js-focus-plugin'
import createLinkifyPlugin from './link'
// import createLinkifyPlugin from 'draft-js-linkify-plugin';

export default () => {
  const focusPlugin = createFocusPlugin()
  // const linkPlugin = createLinkPlugin();
  const linkPlugin = createLinkifyPlugin()
  const decorator = composeDecorators(focusPlugin.decorator)
  const imgPastePlugin = createImagePlugin({
    decorator
  })
  // return [linkPlugin]
  return [focusPlugin, imgPastePlugin, linkPlugin]
}
