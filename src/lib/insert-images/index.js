/**
 * 插入复数图片
 */
import { EditorState, RichUtils } from 'draft-js'
import uploadImage from './upload-image'
import insertImage from './insert-image'
import { isImage } from 'utils/common'
import { mergeEntityDatas } from 'lib/paste-handler/utils'
import config from 'config.js'

export default (files, { getEditorState, setEditorState, onImageInsert, option }) => {
  files = Array.prototype.slice.call(files)

  const promises = []
  let eState = null
  files.forEach(async file => {
    if(!isImage(file)) return 
    const data1 = insertImage(eState || getEditorState(), config.loadingImage)
    // promises[data1.entityKey] = uploadImage(file, onImageInsert, option)
    promises.push({
      entityKey: data1.entityKey,
      promise: uploadImage(file, onImageInsert, option)
    })

    eState = data1.editorState
  })

  if(!eState) return

  setEditorState(eState)

  const allPro = promises.map(item => {
    return item.promise
  })
  // 统一替换插入的图片
  Promise.all(allPro).then(urls => {
    const datas = []
    for(let i=0, len=urls.length; i< len; i++) {
      datas.push({
        entityKey: promises[i].entityKey,
        data: {
          src: urls[i]
        }
      })
    }
    const _eState = getEditorState()
    const nContentState = mergeEntityDatas(_eState.getCurrentContent(), datas)
    let _nState = EditorState.push(
      _eState,
      nContentState,
      'apply-entity'
    )

    _nState = RichUtils.insertSoftNewline(_nState)
    setEditorState(_nState)
  })
}

