/**
 * 基础示例
 */
import React from 'react'
import FsEditor from '../src/index'

const Basic = () => {
  return (
    <div>
      <FsEditor height="600px"
        imageMIME={['image/png', 'image/jpeg', 'image/gif']}
        onImageInsert={(base64, insertImage) => {
          insertImage(base64)
        }}></FsEditor>
    </div>
  )
}

export default Basic