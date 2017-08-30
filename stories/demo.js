/**
 * 基础示例
 */
import React from 'react'
import FsEditor from '../src/index'

const Basic = () => {
  return (
    <div>
      <FsEditor onImageInsert={(base64, insertImage) => {
        debugger
      }}></FsEditor>
    </div>
  )
}

export default Basic