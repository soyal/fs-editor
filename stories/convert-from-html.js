/**
 * 还原html
 */
import React from 'react'
import FsEditor from '../src/index'

const Basic = () => {
  const html = '<p>this is a p tag</p>'
  return (
    <div>
      <FsEditor height="600px"
        value={FsEditor.utils.convertFromHtml(html)}
        onImageInsert={(file, base64, insertImage) => {
          insertImage(base64)
        }}></FsEditor>
    </div>
  )
}

export default Basic