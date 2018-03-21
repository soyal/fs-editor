/**
 * 验证内容是否为空
 */
export const isEmpty = editorState => {
  const contentState = editorState.getCurrentContent()
  const blockArray = contentState.getBlocksAsArray()

  // 只要有一个block不为空 || 有多媒体(blocktype === 'atomic')，就是非空状态
  let isNotEmpty = blockArray.some(block => {
    return block.getText().trim().length > 0 || block.getType() === 'atomic'
  })

  return !isNotEmpty
}
