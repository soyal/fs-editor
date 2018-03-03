import { convertFromHtml } from '../../utils/convert-from-html'
import { insertContent, mergeEntitDatas, handleOnImagePaste } from './utils'
import { EditorState } from 'draft-js'
import config from 'config.js'

/**
 * 处理粘贴事件
 * @param {EditorState} editorState 粘贴前的editorState
 */
export default (
  text,
  html,
  { setEditorState, getEditorState, onImagePaste }
) => {
  const fragmentState = convertFromHtml(html)
  // 粘贴的blockMap
  let fragmentContent = fragmentState.getCurrentContent()
  const fragmentBlockMap = fragmentContent.blockMap

  const allPromises = []
  const currentDatas = []

  fragmentBlockMap.forEach(block => {
    const entityKey = block.getEntityAt(0)
    if (!entityKey) return
    const entity = fragmentContent.getEntity(entityKey)

    if (entity.getType() === 'image') {
      // 设置loading图
      currentDatas.push({
        entityKey,
        data: { src: config.loadingImage }
      })

      // 粘贴的图片，会在所有完成处理后统一进行替换
      allPromises.push(handleOnImagePaste(entityKey, entity, onImagePaste))
    }
  })

  if (currentDatas.length > 0) {
    fragmentContent = mergeEntitDatas(fragmentContent, currentDatas)
  }

  // 等待promise resolve 然后替换entityData
  if (allPromises.length > 0) {
    Promise.all(allPromises).then(datas => {
      const resolvedContent = mergeEntitDatas(
        getEditorState().getCurrentContent(),
        datas
      )
      setEditorState(EditorState.createWithContent(resolvedContent))
    })
  }

  // 将paste的内容插入原本的内容
  const nEditorState = insertContent(getEditorState(), fragmentContent)

  setEditorState(nEditorState)
}
