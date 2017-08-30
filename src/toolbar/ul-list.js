import React from 'react'

let UlList = ({onClick}) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <svg viewBox="0 0 18 18">
        <line className="fs-editor-stroke" x1="6" x2="15" y1="4" y2="4"></line> 
        <line className="fs-editor-stroke" x1="6" x2="15" y1="9" y2="9"></line> 
        <line className="fs-editor-stroke" x1="6" x2="15" y1="14" y2="14"></line> 
        <line className="fs-editor-stroke" x1="3" x2="3" y1="4" y2="4"></line> 
        <line className="fs-editor-stroke" x1="3" x2="3" y1="9" y2="9"></line> 
        <line className="fs-editor-stroke" x1="3" x2="3" y1="14" y2="14"></line>
      </svg>
    </button>
  )
}

export default UlList