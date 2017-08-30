/**
 * underline按钮
 */
import React from 'react'

let Underline = ({onClick}) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <svg viewBox="0 0 18 18"> 
        <path className="fs-editor-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path> 
        <rect className="fs-editor-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
      </svg>
    </button>
  )
}

export default Underline