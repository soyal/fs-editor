/**
 * 基础示例
 */
import React from 'react'
import FsEditor from '../src/index'

import './demo.css'

const Basic = () => {
  return (
    <div>
      <h2>基础</h2>
      <FsEditor height="600px"
        imageMIME={['image/png', 'image/jpeg', 'image/gif']}
        onImageInsert={(file, base64, insertImage) => {
          insertImage(base64)
        }}></FsEditor>
    </div>
  )
}

export default Basic