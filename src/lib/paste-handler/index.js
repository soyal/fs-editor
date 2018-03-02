import { convertFromHtml } from '../../utils/convert-from-html'
import { Modifier, EditorState } from 'draft-js'
import config from 'config.js'

/**
 * 处理粘贴事件
 * @param {EditorState} editorState 粘贴前的editorState
 */
export default (text, html, { setEditorState, getEditorState }) => {
  const nEditorState = convertFromHtml(html)
  // 粘贴的blockMap
  let _contentState = nEditorState.getCurrentContent()
  const blockMap = _contentState.blockMap

  const allPromises = []
  blockMap.forEach(block => {
    const entityKey = block.getEntityAt(0)
    if (!entityKey) return
    const entity = _contentState.getEntity(entityKey)
    if (entity.getType() === 'image') {
      // 设置loading图
      _contentState = _contentState.mergeEntityData(entityKey, {
        src: config.loadingImage
      })
      allPromises.push(
        new Promise(resolve => {
          setTimeout(() => {
            resolve(entityKey, {
              src: 'https://avatars1.githubusercontent.com/u/13882188?s=460&v=4'
            })
          }, 1000)
        })
      )
    }
  })
  Promise.all(allPromises).then(datas => {
    // todo
  })

  const editorState = getEditorState()
  const newState = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    blockMap
  )

  setEditorState(EditorState.push(editorState, newState))
}

/**
 * 合并entityData
 * @param {Array<Object>} datas
 * @return {ContentState}
 */
function mergeEntitDatas(datas, { getEditorState }) {

}
