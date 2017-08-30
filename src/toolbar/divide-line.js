/**
 * 分割线
 */
import React from 'react'

let DivideLine = ({onClick}) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <i className="iconfont icon-zhankai fs-editor-fill"
      style={{fontSize: '14px'}}></i>
    </button>
  )
}

export default DivideLine