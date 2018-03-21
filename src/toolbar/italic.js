/**
 * italic按钮
 */
import React from 'react'

let Italic = ({ onClick }) => {
  return (
    <button className="fs-editor-toolbar-button" onClick={onClick}>
      <svg viewBox="0 0 18 18">
        <line className="fs-editor-stroke" x1="7" x2="13" y1="4" y2="4" />
        <line className="fs-editor-stroke" x1="5" x2="11" y1="14" y2="14" />
        <line className="fs-editor-stroke" x1="8" x2="10" y1="14" y2="4" />
      </svg>
    </button>
  )
}

export default Italic
