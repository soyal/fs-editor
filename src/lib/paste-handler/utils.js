import { EditorState, Modifier } from 'draft-js'
import config from 'config.js'
/**
 * 合并entityData
 * @param {ContentState} contentState
 * @param {Array<Object>} datas [{entityKey: string, data: object}]
 * @return {ContentState}
 */
export function mergeEntitDatas(contentState, datas) {
  let nContentState
  datas.forEach(_data => {
    const { entityKey, data } = _data
    nContentState = contentState.mergeEntityData(entityKey, data)
  })

  return nContentState
}

/**
 * 将contentState插入editorState
 * @param {EditorState} originEditorState
 * @param {ContentState} insertContentState
 */
export function insertContent(originEditorState, insertContentState) {
  const nContentState = Modifier.replaceWithFragment(
    originEditorState.getCurrentContent(),
    originEditorState.getSelection(),
    insertContentState.blockMap
  )

  let result = EditorState.createWithContent(nContentState)
  return EditorState.moveFocusToEnd(result)
}

export function handleOnImagePaste(entityKey, entity, onImagePaste) {
  const urlPro = onImagePaste(entity.getData().src)

  // 判断onImagePaste是否返回Promise
  if (typeof urlPro.then !== 'function') {
    throw new Error(
      `you should return Promise in props onImagePaste, but got ${typeof urlPro}`
    )
  }

  return urlPro.then(({ success, result }) => {
    if (!result || success === undefined) {
      throw new Error(
        `props onImagePaste expect you return Promise, and the promise resolve a data:Object like {success: true, result: 'http://example.com/image'}`
      )
    }

    const _data = {
      entityKey: entityKey
    }
    if(!success) {
      _data.data = {
        src: config.errorImage
      }
    } else {
      _data.data = {
        src: result
      }
    }
    return _data
  })
}
