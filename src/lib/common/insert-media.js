import { EditorState, AtomicBlockUtils } from 'draft-js'

/**
 * @return {EditorState}
 */
export default (editorState, type, url) => {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {
    src: url
  })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  })

  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    ' '
  )

  return {
    editorState: newState,
    entityKey
  }
}
