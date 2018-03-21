/**
 * editorState转换纯文本
 */
export const stateToText = editorState => {
  if (!editorState) return ''

  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockMap()
  let text = ''
  block.forEach(contentBlock => {
    text += ' ' + contentBlock.getText()
  })

  return text
}
