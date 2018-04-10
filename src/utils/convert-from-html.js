import { EditorState, Entity } from 'draft-js'

import { convertFromHTML } from 'draft-convert'

/**
 * 用于将后端传过来的html转换成editorState
 * 参见draft-conver https://github.com/HubSpot/draft-convert#convertfromhtml
 * @param String html html字符串
 * @return Object editorState draft-js的editorState
 */
export const convertFromHtml = html => {
  const contentState = convertFromHTML({
    htmlToEntity: (nodeName, node, createEntity) => {
      if (nodeName === 'img') {
        return createEntity('image', 'MUTABLE', {
          src: node.getAttribute('src')
        })
      }
    },

    htmlToBlock: (nodeName, node) => {
      if (nodeName === 'img') {
        return {
          type: 'atomic',
          data: {}
        }
      }
    }
  })(html)

  return EditorState.createWithContent(contentState)
}
