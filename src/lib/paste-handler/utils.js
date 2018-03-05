import { EditorState, Modifier, Entity } from 'draft-js'
/**
 * 合并entityData
 * @param {ContentState} contentState
 * @param {Array<Object>} datas [{entityKey: string, data: object}]
 * @return {ContentState}
 */
export function mergeEntityDatas(contentState, datas) {
  let nContentState
  datas.forEach(_data => {
    const { entityKey, data } = _data
    nContentState = contentState.mergeEntityData(entityKey, data)
  })

  return nContentState
}

export function updateEntityDatas(datas) {
  datas.forEach(_data => {
    const { entityKey, data } = _data
    Entity.mergeData(entityKey, data)
  })
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

  return EditorState.push(originEditorState, nContentState, 'insert-fragment')
  // return EditorState.moveFocusToEnd(result)
}

export function handleOnImagePaste(
  entityKey,
  entity,
  onImagePaste,
  { errorImage }
) {
  const urlPro = Promise.resolve(onImagePaste(entity.getData().src))

  return urlPro.then(({ success, result }) => {
    if (success === undefined) {
      throw new Error(
        `props onImagePaste expect you return Promise, and the promise resolve a data:Object like {success: true, result: 'http://example.com/image'}`
      )
    }

    const _data = {
      entityKey: entityKey
    }
    if (!success) {
      _data.data = {
        src: errorImage
      }
    } else {
      _data.data = {
        src: result
      }
    }
    return _data
  })
}
