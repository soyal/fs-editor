import React from 'react'
import FsEditor from '../dist/fs-editor'

let myEditorState
const IsEmpty = () => {
  return (
    <div>
      <FsEditor imageMIME={['image/png', 'image/jpeg', 'image/gif']}
        onImageInsert={(file, base64, insertImage) => {
          insertImage(base64)
        }}
        onChange={(editorState) => {
          myEditorState = editorState
        }}></FsEditor>

        <button onClick={() => {
          const isEmpty = FsEditor.utils.isEmpty(myEditorState)
          alert('为空？' + isEmpty)
        }}>验证是否为空</button>
    </div>
  )
}

export default IsEmpty