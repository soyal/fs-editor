/**
 * 处理strategy匹配到的图片
 */
import changeBlockType from './utils/change-block-type'
import { EditorState } from 'draft-js'

export default function handler(
  start,
  end,
  { entityKey, contentBlock, contentState, onChange, cb }
) {
  // cb(start, end)
  // console.log(contentState, entityKey)
  // setTimeout(() => {
  let nContentState = contentState.mergeEntityData(entityKey, {
    src: '//avatars1.githubusercontent.com/u/13882188?s=460&v=4'
  })

  nContentState = changeBlockType(contentBlock, nContentState, 'atomic')

  const nEditorState = EditorState.createWithContent(nContentState)
  onChange(nEditorState)
  // }, 1000)
}
