/**
 * 设置标题
 */
import React from 'react'

let Heading1 = ({ onClick }) => {
  return (
    <button className="fs-editor-toolbar-button" 
      onClick={onClick}
      style={{position: 'relative', top: '-1px'}}>
      <svg viewBox="0 0 1024 1024">
        <path className="fs-editor-fill" d="M221.71 212.871l49.255 0 49.755 0 0 300.016 381.611 0L702.331 212.871l49.255 0 49.755 0 0 731.382-49.26 0-49.75 0L702.331 600.452 320.721 600.452l0 343.801-49.257 0L221.71 944.253 221.71 212.871z"></path>
      </svg>
    </button>
  )
}

export default Heading1