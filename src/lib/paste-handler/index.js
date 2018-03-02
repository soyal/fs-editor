import { convertFromHtml } from '../../utils/convert-from-html'
import { Modifier, EditorState } from 'draft-js'

/**
 * 处理粘贴事件
 * @param {EditorState} editorState 粘贴前的editorState
 */
export default (text, html, editorState, {onChange}) => {
  const nEditorState = convertFromHtml(html)
  // 粘贴的blockMap
  let _contentState = nEditorState.getCurrentContent()
  const blockMap = _contentState.blockMap

  blockMap.forEach(block => {
    const entityKey = block.getEntityAt(0)
    if (!entityKey) return
    const entity = _contentState.getEntity(entityKey)
    if (entity.getType() === 'image') {
      _contentState = _contentState.mergeEntityData(entityKey, {
        src: 'https://avatars1.githubusercontent.com/u/13882188?s=460&v=4'
      })
    }
  })

  const newState = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    blockMap
  )
  
  onChange(EditorState.push(editorState, newState))
}
