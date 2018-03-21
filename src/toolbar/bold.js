/**
 * bold按钮
 */
import React from 'react'

let Bold = ({ onClick }) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <svg viewBox="0 0 18 18">
        <path
          className="fs-editor-stroke"
          d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
        />
        <path
          className="fs-editor-stroke"
          d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
        />
      </svg>
    </button>
  )
}

export default Bold
