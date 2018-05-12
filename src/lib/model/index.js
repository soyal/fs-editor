/*
Get currentBlock in the editorState.
*/
export const getCurrentBlock = editorState => {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())
  return block
}
